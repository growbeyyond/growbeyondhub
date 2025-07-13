import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ClientSummaryCards from './components/ClientSummaryCards';
import ClientStatusChart from './components/ClientStatusChart';
import ClientFilters from './components/ClientFilters';
import ClientTable from './components/ClientTable';
import ClientDetailModal from './components/ClientDetailModal';
import BulkActionsBar from './components/BulkActionsBar';
import AddClientModal from './components/AddClientModal';

const ClientManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    planType: 'all',
    status: 'all',
    industry: 'all',
    dateRange: 'all'
  });

  // Mock client data
  const [clients, setClients] = useState([
    {
      id: 1,
      companyName: 'TechCorp Solutions',
      contactPerson: 'Michael Rodriguez',
      email: 'michael@techcorp.com',
      phone: '+1 (555) 123-4567',
      website: 'https://techcorp.com',
      industry: 'technology',
      planType: 'enterprise',
      monthlySpend: 8500,
      status: 'active',
      lastActivity: '2024-02-15',
      description: `TechCorp Solutions is a leading technology company specializing in enterprise software development and digital transformation services.\n\nThey provide cutting-edge solutions for Fortune 500 companies and have been our client for over 2 years.`
    },
    {
      id: 2,
      companyName: 'RetailPlus Inc',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@retailplus.com',
      phone: '+1 (555) 234-5678',
      website: 'https://retailplus.com',
      industry: 'retail',
      planType: 'professional',
      monthlySpend: 3200,
      status: 'active',
      lastActivity: '2024-02-14',
      description: `RetailPlus Inc is a rapidly growing e-commerce platform that connects local retailers with customers nationwide.\n\nThey focus on sustainable retail practices and community engagement.`
    },
    {
      id: 3,
      companyName: 'HealthFirst Medical',
      contactPerson: 'Dr. James Wilson',
      email: 'james@healthfirst.com',
      phone: '+1 (555) 345-6789',
      website: 'https://healthfirst.com',
      industry: 'healthcare',
      planType: 'professional',
      monthlySpend: 4500,
      status: 'active',
      lastActivity: '2024-02-13',
      description: `HealthFirst Medical is a comprehensive healthcare provider offering primary care, specialized treatments, and telemedicine services.\n\nThey serve over 50,000 patients across multiple locations.`
    },
    {
      id: 4,
      companyName: 'EcoGreen Energy',
      contactPerson: 'Lisa Chen',
      email: 'lisa@ecogreen.com',
      phone: '+1 (555) 456-7890',
      website: 'https://ecogreen.com',
      industry: 'energy',
      planType: 'starter',
      monthlySpend: 1200,
      status: 'pending',
      lastActivity: '2024-02-08',
      description: `EcoGreen Energy is a renewable energy company focused on solar and wind power solutions for residential and commercial clients.\n\nThey are committed to sustainable energy practices and environmental conservation.`
    },
    {
      id: 5,
      companyName: 'FinanceFlow Ltd',
      contactPerson: 'Robert Davis',
      email: 'robert@financeflow.com',
      phone: '+1 (555) 567-8901',
      website: 'https://financeflow.com',
      industry: 'finance',
      planType: 'enterprise',
      monthlySpend: 6800,
      status: 'active',
      lastActivity: '2024-02-12',
      description: `FinanceFlow Ltd provides comprehensive financial services including investment management, financial planning, and corporate finance solutions.\n\nThey manage over $2 billion in assets for their clients.`
    },
    {
      id: 6,
      companyName: 'EduTech Academy',
      contactPerson: 'Amanda Thompson',
      email: 'amanda@edutech.com',
      phone: '+1 (555) 678-9012',
      website: 'https://edutech.com',
      industry: 'education',
      planType: 'professional',
      monthlySpend: 2800,
      status: 'active',
      lastActivity: '2024-02-11',
      description: `EduTech Academy is an innovative online learning platform offering courses in technology, business, and creative arts.\n\nThey have over 100,000 active students worldwide.`
    },
    {
      id: 7,
      companyName: 'PropertyPro Realty',
      contactPerson: 'Mark Anderson',
      email: 'mark@propertypro.com',
      phone: '+1 (555) 789-0123',
      website: 'https://propertypro.com',
      industry: 'real-estate',
      planType: 'starter',
      monthlySpend: 950,
      status: 'inactive',
      lastActivity: '2024-01-28',
      description: `PropertyPro Realty is a full-service real estate agency specializing in residential and commercial properties.\n\nThey have been serving the local community for over 15 years.`
    },
    {
      id: 8,
      companyName: 'FoodieHub Restaurant',
      contactPerson: 'Chef Maria Garcia',
      email: 'maria@foodiehub.com',
      phone: '+1 (555) 890-1234',
      website: 'https://foodiehub.com',
      industry: 'other',
      planType: 'starter',
      monthlySpend: 750,
      status: 'paused',
      lastActivity: '2024-02-05',
      description: `FoodieHub Restaurant is a trendy dining establishment known for its fusion cuisine and exceptional customer experience.\n\nThey operate three locations and are planning expansion.`
    }
  ]);

  // Filter clients based on search and filters
  const filteredClients = clients.filter(client => {
    const matchesSearch = !searchQuery || 
      client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlan = filters.planType === 'all' || client.planType === filters.planType;
    const matchesStatus = filters.status === 'all' || client.status === filters.status;
    const matchesIndustry = filters.industry === 'all' || client.industry === filters.industry;

    return matchesSearch && matchesPlan && matchesStatus && matchesIndustry;
  });

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setIsDetailModalOpen(true);
  };

  const handleBulkAction = (actionId) => {
    console.log('Bulk action:', actionId, 'for clients:', selectedClients);
    
    switch (actionId) {
      case 'activate':
        setClients(prev => prev.map(client => 
          selectedClients.includes(client.id) 
            ? { ...client, status: 'active' }
            : client
        ));
        break;
      case 'deactivate':
        setClients(prev => prev.map(client => 
          selectedClients.includes(client.id) 
            ? { ...client, status: 'inactive' }
            : client
        ));
        break;
      case 'pause':
        setClients(prev => prev.map(client => 
          selectedClients.includes(client.id) 
            ? { ...client, status: 'paused' }
            : client
        ));
        break;
      case 'export':
        // Handle export logic
        console.log('Exporting client data...');
        break;
      case 'delete':
        setClients(prev => prev.filter(client => !selectedClients.includes(client.id)));
        break;
    }
    
    setSelectedClients([]);
  };

  const handleAddClient = (newClientData) => {
    const newClient = {
      ...newClientData,
      id: clients.length + 1,
      status: 'active',
      lastActivity: new Date().toISOString().split('T')[0]
    };
    
    setClients(prev => [...prev, newClient]);
    console.log('New client added:', newClient);
  };

  return (
    <>
      <Helmet>
        <title>Client Management - GrowBeyondHub</title>
        <meta name="description" content="Manage all your agency clients, track performance, and handle billing efficiently with GrowBeyondHub's comprehensive client management system." />
      </Helmet>

      <div className="min-h-screen bg-surface">
        <Header />
        <Sidebar />
        
        <main className="lg:ml-60 pt-16">
          <div className="p-6">
            <Breadcrumbs />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Client Management</h1>
                <p className="text-text-muted">
                  Manage your agency clients, track performance, and handle relationships efficiently
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconSize={16}
                  onClick={() => console.log('Export all clients')}
                >
                  Export All
                </Button>
                <Button
                  variant="primary"
                  iconName="Plus"
                  iconSize={16}
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Add Client
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-9 space-y-6">
                {/* Filters */}
                <ClientFilters
                  onFiltersChange={setFilters}
                  activeFilters={filters}
                />

                {/* Search Bar */}
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Icon 
                        name="Search" 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
                      />
                      <input
                        type="text"
                        placeholder="Search clients by name, contact, or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-md text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                      />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-muted">
                      <span>Showing {filteredClients.length} of {clients.length} clients</span>
                    </div>
                  </div>
                </div>

                {/* Client Table */}
                <ClientTable
                  clients={filteredClients}
                  onClientSelect={handleClientSelect}
                  onBulkAction={handleBulkAction}
                  selectedClients={selectedClients}
                  onSelectionChange={setSelectedClients}
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-3 space-y-6">
                <ClientSummaryCards />
                <ClientStatusChart />
              </div>
            </div>
          </div>
        </main>

        {/* Bulk Actions Bar */}
        <BulkActionsBar
          selectedCount={selectedClients.length}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedClients([])}
        />

        {/* Modals */}
        <ClientDetailModal
          client={selectedClient}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedClient(null);
          }}
        />

        <AddClientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddClient}
        />
      </div>
    </>
  );
};

export default ClientManagement;