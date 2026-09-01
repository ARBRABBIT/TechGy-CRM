import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import GlobalHeader from './components/GlobalHeader';
import CommonActionsModal from './components/CommonActionsModal';

// Views
import DashboardView from './views/DashboardView';
import LeadsView from './views/LeadsView';
import AccountsView from './views/AccountsView';
import OpportunitiesView from './views/OpportunitiesView';
import ActivitiesView from './views/ActivitiesView';
import ProposalsView from './views/ProposalsView';
import ContactsView from './views/ContactsView';

// Dedicated Full-Page Detail Views with Interactive Breadcrumb Navigation
import LeadDetailView from './views/LeadDetailView';
import AccountDetailView from './views/AccountDetailView';

// Initial Mock Data
import {
  INITIAL_LEADS,
  INITIAL_ACCOUNTS,
  INITIAL_ACTIVITIES,
  INITIAL_OPPORTUNITIES,
  INITIAL_PROPOSALS,
  INITIAL_CONTACTS
} from './data/mockData';

export default function App() {
  // Navigation & Collapsible Sidebar State
  const [activeModule, setActiveModule] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Global Header Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('This Month');
  const [selectedOwnerFilter, setSelectedOwnerFilter] = useState('All Owners');

  // Relational Data State
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);

  // Dedicated Full Page Selection States (Replaces side drawers)
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalInitialType, setModalInitialType] = useState('createLead');

  // Interactive View Filter State
  const [leadsSourceFilter, setLeadsSourceFilter] = useState('');
  const [leadsOverdueOnly, setLeadsOverdueOnly] = useState(false);

  // Cross-Navigation Handlers (Dashboard Interactions)
  const handleNavigateToLeads = (source = '', overdue = false) => {
    setSelectedLead(null);
    setSelectedAccount(null);
    if (source === 'OVERDUE') {
      setLeadsOverdueOnly(true);
      setLeadsSourceFilter('');
    } else {
      setLeadsSourceFilter(source);
      setLeadsOverdueOnly(overdue);
    }
    setActiveModule('leads');
  };

  const handleNavigateToAccounts = () => {
    setSelectedLead(null);
    setSelectedAccount(null);
    setActiveModule('accounts');
  };

  const handleNavigateToActivities = () => {
    setSelectedLead(null);
    setSelectedAccount(null);
    setActiveModule('activities');
  };

  const handleSelectModule = (mod) => {
    setSelectedLead(null);
    setSelectedAccount(null);
    setActiveModule(mod);
  };

  // Universal Search Result Navigation Handler
  const handleSelectSearchResult = (category, item) => {
    if (category === 'lead') {
      setSelectedAccount(null);
      setSelectedLead(item);
      setActiveModule('leads');
    } else if (category === 'account') {
      setSelectedLead(null);
      const fullAcc = accounts.find(a => a.companyName.toLowerCase() === item.companyName.toLowerCase()) || item;
      setSelectedAccount(fullAcc);
      setActiveModule('accounts');
    } else if (category === 'opportunity') {
      setSelectedLead(null);
      setSelectedAccount(null);
      setActiveModule('opportunities');
    } else if (category === 'proposal') {
      setSelectedLead(null);
      setSelectedAccount(null);
      setActiveModule('proposals');
    } else if (category === 'contact') {
      setSelectedLead(null);
      const parentAcc = accounts.find(a => a.companyName.toLowerCase() === item.company.toLowerCase());
      if (parentAcc) {
        setSelectedAccount(parentAcc);
      }
      setActiveModule('contacts');
    } else if (category === 'activity') {
      setSelectedLead(null);
      setSelectedAccount(null);
      setActiveModule('activities');
    }
  };

  // Quick Action Handler
  const handleQuickAction = (actionType, lead) => {
    if (actionType === 'convertOpportunity') {
      const newOpp = {
        id: `OPP-${Date.now()}`,
        accountName: lead.company,
        opportunityName: `${lead.company} CRM Expansion Opportunity`,
        score: 75,
        visualLevel: 'Medium',
        estimatedValue: '₹1,20,00,000',
        probability: '60%',
        expectedClosureDate: '2026-10-30',
        currentStage: 'Qualified',
        owner: lead.leadOwner
      };
      setOpportunities([newOpp, ...opportunities]);
      alert(`Lead "${lead.leadName}" successfully converted to Opportunity!`);
      setSelectedLead(null);
      setActiveModule('opportunities');
    } else {
      setModalInitialType(actionType === 'call' || actionType === 'email' || actionType === 'sms' ? 'addNote' : actionType);
      setIsCreateModalOpen(true);
    }
  };

  // Navigate directly from Lead to Account full page view
  const handleNavigateToCompanyAccount = (companyName) => {
    const parentAcc = accounts.find(a => a.companyName.toLowerCase() === companyName.toLowerCase());
    if (parentAcc) {
      setSelectedLead(null);
      setSelectedAccount(parentAcc);
      setActiveModule('accounts');
    } else {
      alert(`Account record for "${companyName}" not found.`);
    }
  };

  // Common Action Save Handler
  const handleSaveAction = (type, formData) => {
    if (type === 'createLead') {
      const newLeadObj = {
        id: `LD-${Date.now()}`,
        leadName: formData.leadName,
        phoneNumber: formData.phone || '+91 98765 00000',
        emailId: formData.email || 'lead@example.co.in',
        company: formData.company,
        designation: formData.designation || 'Manager',
        leadSource: formData.leadSource || 'Website',
        status: formData.status || 'New',
        leadOwner: formData.owner || 'Rajesh Sharma',
        priority: formData.priority || 'Medium',
        createdDate: new Date().toISOString().split('T')[0],
        lastActivity: 'New lead record created in CRM',
        nextFollowup: `${formData.dueDate} 10:00`,
        dueToday: true,
        isOverdue: false,
        notes: formData.notes || 'Created via Common Action workspace.',
        nextAction: formData.nextAction || 'Schedule introductory discovery call'
      };
      setLeads([newLeadObj, ...leads]);

      // Ensure Account exists
      const existingAcc = accounts.find(a => a.companyName.toLowerCase() === formData.company.toLowerCase());
      if (!existingAcc) {
        const newAcc = {
          id: `ACC-${Date.now()}`,
          companyName: formData.company,
          industry: 'Enterprise Technology',
          companySize: '100-500 employees',
          website: `www.${formData.company.toLowerCase().replace(/[^a-z]/g, '')}.co.in`,
          location: 'Mumbai, MH',
          accountOwner: formData.owner || 'Rajesh Sharma',
          estimatedAccountValue: '₹1,00,00,000',
          leadsCount: 1,
          contactsCount: 1,
          oppsCount: 0,
          proposalsCount: 0
        };
        setAccounts([newAcc, ...accounts]);
      }
    } else if (type === 'addNote' && selectedLead) {
      const updatedLeads = leads.map(l => l.id === selectedLead.id ? { ...l, notes: `${l.notes}\n• ${formData.notes}` } : l);
      setLeads(updatedLeads);
    } else if (type === 'assignOwner' && selectedLead) {
      const updatedLeads = leads.map(l => l.id === selectedLead.id ? { ...l, leadOwner: formData.owner } : l);
      setLeads(updatedLeads);
    }
  };

  // Generate unique view key to trigger smooth CSS page transition keyframes on every page change
  const currentViewKey = selectedLead
    ? `lead-detail-${selectedLead.id}`
    : selectedAccount
      ? `account-detail-${selectedAccount.id}`
      : `module-${activeModule}`;

  return (
    <div className="app-container">
      {/* 1. Fixed Left Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={handleSelectModule}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main App Section */}
      <div className={`main-wrapper ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* 2. Global Header with Live Universal Search */}
        <GlobalHeader
          activeModule={activeModule}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDateFilter={selectedDateFilter}
          setSelectedDateFilter={setSelectedDateFilter}
          selectedOwnerFilter={selectedOwnerFilter}
          setSelectedOwnerFilter={setSelectedOwnerFilter}
          setMobileOpen={setMobileOpen}
          onOpenCreateModal={(type = 'createLead') => {
            setModalInitialType(type);
            setIsCreateModalOpen(true);
          }}
          leads={leads}
          accounts={accounts}
          opportunities={opportunities}
          proposals={proposals}
          contacts={contacts}
          activities={activities}
          onSelectSearchResult={handleSelectSearchResult}
        />

        {/* 3. Main Page Content with Keyed Dynamic Transition */}
        <main className="content-body" key={currentViewKey}>
          {/* Full Page Lead Detail View with Breadcrumb Navigation */}
          {selectedLead ? (
            <LeadDetailView
              lead={selectedLead}
              onBack={() => setSelectedLead(null)}
              onNavigateHome={() => {
                setSelectedLead(null);
                setSelectedAccount(null);
                setActiveModule('dashboard');
              }}
              onQuickAction={handleQuickAction}
              onNavigateToAccount={handleNavigateToCompanyAccount}
            />
          ) : selectedAccount ? (
            /* Full Page Account Detail View with Breadcrumb Navigation */
            <AccountDetailView
              account={selectedAccount}
              onBack={() => setSelectedAccount(null)}
              onNavigateHome={() => {
                setSelectedLead(null);
                setSelectedAccount(null);
                setActiveModule('dashboard');
              }}
              leads={leads}
              activities={activities}
              contacts={contacts}
              opportunities={opportunities}
              proposals={proposals}
              onSelectLead={(l) => {
                setSelectedAccount(null);
                setSelectedLead(l);
                setActiveModule('leads');
              }}
              onOpenCreateModal={(type) => {
                setModalInitialType(type);
                setIsCreateModalOpen(true);
              }}
            />
          ) : (
            /* Standard Module Views */
            <>
              {activeModule === 'dashboard' && (
                <DashboardView
                  leads={leads}
                  accounts={accounts}
                  activities={activities}
                  selectedOwnerFilter={selectedOwnerFilter}
                  selectedDateFilter={selectedDateFilter}
                  onNavigateToLeads={handleNavigateToLeads}
                  onNavigateToAccounts={handleNavigateToAccounts}
                  onNavigateToActivities={handleNavigateToActivities}
                  onSelectLead={(lead) => setSelectedLead(lead)}
                />
              )}

              {activeModule === 'leads' && (
                <LeadsView
                  leads={leads}
                  onSelectLead={(lead) => setSelectedLead(lead)}
                  onOpenCreateModal={(type) => {
                    setModalInitialType(type);
                    setIsCreateModalOpen(true);
                  }}
                  initialFilterSource={leadsSourceFilter}
                  initialOverdueOnly={leadsOverdueOnly}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                />
              )}

              {activeModule === 'accounts' && (
                <AccountsView
                  accounts={accounts}
                  onSelectAccount={(acc) => {
                    const fullAcc = accounts.find(a => a.companyName.toLowerCase() === acc.companyName.toLowerCase()) || acc;
                    setSelectedAccount(fullAcc);
                  }}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                />
              )}

              {activeModule === 'opportunities' && (
                <OpportunitiesView
                  opportunities={opportunities}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                />
              )}

              {activeModule === 'activities' && (
                <ActivitiesView
                  activities={activities}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                />
              )}

              {activeModule === 'proposals' && (
                <ProposalsView
                  proposals={proposals}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                />
              )}

              {activeModule === 'contacts' && (
                <ContactsView
                  contacts={contacts}
                  onSelectAccount={(acc) => {
                    const fullAcc = accounts.find(a => a.companyName === acc.company);
                    if (fullAcc) setSelectedAccount(fullAcc);
                  }}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Common Create Modal */}
      <CommonActionsModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveAction}
        initialType={modalInitialType}
      />
    </div>
  );
}
