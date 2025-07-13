-- Initial Authentication and User Management System for GrowBeyondHub
-- Migration: 20241216120000_initial_auth_system.sql

-- 1. Create custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'agency_owner', 'agency_manager', 'content_creator', 'client_viewer');
CREATE TYPE public.subscription_status AS ENUM ('trial', 'active', 'expired', 'cancelled');

-- 2. Create user_profiles table (Critical intermediary for PostgREST compatibility)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'content_creator'::public.user_role,
    avatar_url TEXT,
    phone TEXT,
    timezone TEXT DEFAULT 'UTC',
    subscription_status public.subscription_status DEFAULT 'trial'::public.subscription_status,
    subscription_ends_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create agencies table
CREATE TABLE public.agencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    website_url TEXT,
    logo_url TEXT,
    owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    subscription_plan TEXT DEFAULT 'starter',
    max_team_members INTEGER DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create agency_members table (many-to-many relationship)
CREATE TABLE public.agency_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    role public.user_role DEFAULT 'content_creator'::public.user_role,
    invited_by UUID REFERENCES public.user_profiles(id),
    invited_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    joined_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(agency_id, user_id)
);

-- 5. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_agencies_owner_id ON public.agencies(owner_id);
CREATE INDEX idx_agency_members_agency_id ON public.agency_members(agency_id);
CREATE INDEX idx_agency_members_user_id ON public.agency_members(user_id);

-- 6. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_members ENABLE ROW LEVEL SECURITY;

-- 7. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.is_agency_owner(agency_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.agencies a
    WHERE a.id = agency_uuid AND a.owner_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.is_agency_member(agency_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.agency_members am
    WHERE am.agency_id = agency_uuid 
    AND am.user_id = auth.uid() 
    AND am.is_active = true
)
$$;

CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role::TEXT = required_role
)
$$;

-- 8. Automatic profile creation function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'content_creator')::public.user_role
  );
  RETURN NEW;
END;
$$;

-- 9. Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Update timestamp function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 11. Apply update triggers
CREATE TRIGGER trigger_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_agencies_updated_at
    BEFORE UPDATE ON public.agencies
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 12. RLS Policies
-- User profiles: users can view own profile, admins can view all
CREATE POLICY "users_view_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id OR public.has_role('admin'));

CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Agencies: owners manage agencies, members can view
CREATE POLICY "agency_owners_manage_agencies"
ON public.agencies
FOR ALL
TO authenticated
USING (public.is_agency_owner(id))
WITH CHECK (public.is_agency_owner(id));

CREATE POLICY "agency_members_view_agencies"
ON public.agencies
FOR SELECT
TO authenticated
USING (public.is_agency_member(id));

-- Agency members: owners manage memberships, members view own membership
CREATE POLICY "agency_owners_manage_members"
ON public.agency_members
FOR ALL
TO authenticated
USING (public.is_agency_owner(agency_id))
WITH CHECK (public.is_agency_owner(agency_id));

CREATE POLICY "members_view_own_membership"
ON public.agency_members
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- 13. Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    agency_owner_uuid UUID := gen_random_uuid();
    creator_uuid UUID := gen_random_uuid();
    agency_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@growbeyondhub.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "System Admin", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (agency_owner_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'owner@creativehub.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Creative Hub Owner", "role": "agency_owner"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (creator_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'creator@creativehub.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Content Creator", "role": "content_creator"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create sample agency
    INSERT INTO public.agencies (id, name, description, owner_id, subscription_plan, max_team_members)
    VALUES
        (agency_uuid, 'Creative Hub Agency', 'Full-service digital marketing agency specializing in content creation and social media management', agency_owner_uuid, 'professional', 15);

    -- Create agency memberships
    INSERT INTO public.agency_members (agency_id, user_id, role, joined_at)
    VALUES
        (agency_uuid, agency_owner_uuid, 'agency_owner'::public.user_role, now()),
        (agency_uuid, creator_uuid, 'content_creator'::public.user_role, now());

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error during mock data creation: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error during mock data creation: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error during mock data creation: %', SQLERRM;
END $$;

-- 14. Cleanup function for development
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    test_user_ids UUID[];
BEGIN
    -- Get test user IDs
    SELECT ARRAY_AGG(id) INTO test_user_ids
    FROM auth.users
    WHERE email LIKE '%@growbeyondhub.com' OR email LIKE '%@creativehub.com';

    -- Delete in dependency order
    DELETE FROM public.agency_members WHERE user_id = ANY(test_user_ids);
    DELETE FROM public.agencies WHERE owner_id = ANY(test_user_ids);
    DELETE FROM public.user_profiles WHERE id = ANY(test_user_ids);
    DELETE FROM auth.users WHERE id = ANY(test_user_ids);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;