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
import ProfileView from './views/ProfileView';

// Initial Mock Data
import {
  INITIAL_LEADS,
  INITIAL_ACCOUNTS,
  INITIAL_ACTIVITIES,
  INITIAL_OPPORTUNITIES,
  INITIAL_PROPOSALS,
  INITIAL_CONTACTS,
  INITIAL_NOTIFICATIONS
} from './data/mockData';
import { Bell } from 'lucide-react';

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
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toastMessage, setToastMessage] = useState(null);

  // Dedicated Full Page Selection States (Replaces side drawers)
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [fromDashboard, setFromDashboard] = useState(false);

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalInitialType, setModalInitialType] = useState('createLead');

  // Interactive View Filter State
  const [leadsSourceFilter, setLeadsSourceFilter] = useState('');
  const [leadsOverdueOnly, setLeadsOverdueOnly] = useState(false);
  const [activitiesInitialTab, setActivitiesInitialTab] = useState('All');

  const handleOpenProfile = () => {
    setSelectedLead(null);
    setSelectedAccount(null);
    setIsProfileActive(true);
    setFromDashboard(false);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const pushNotification = (title, message, category = 'Lead', targetModule = 'leads') => {
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      category,
      isRead: false,
      priority: 'Normal',
      targetModule
    };
    setNotifications(prev => [newNotif, ...prev]);
    triggerToast(`${title}: ${message}`);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    triggerToast('All notifications marked as read');
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    triggerToast('All notifications cleared');
  };

  const handleSelectNotification = (notif) => {
    setSelectedLead(null);
    setSelectedAccount(null);
    setIsProfileActive(false);
    setFromDashboard(false);
    if (notif.targetModule) {
      setActiveModule(notif.targetModule);
    }
  };

  // Cross-Navigation Handlers (Dashboard Interactions)
  const handleNavigateToLeads = (source = '', overdue = false) => {
    setSelectedLead(null);
    setSelectedAccount(null);
    setIsProfileActive(false);
    setFromDashboard(true);
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
    setIsProfileActive(false);
    setFromDashboard(true);
    setActiveModule('accounts');
  };

  const handleNavigateToActivities = (tab = 'Follow-up') => {
    setSelectedLead(null);
    setSelectedAccount(null);
    setIsProfileActive(false);
    setFromDashboard(true);
    setActivitiesInitialTab(tab);
    setActiveModule('activities');
  };

  const handleSelectModule = (mod) => {
    setSelectedLead(null);
    setSelectedAccount(null);
    setIsProfileActive(false);
    setFromDashboard(false);
    setActivitiesInitialTab('All');
    setActiveModule(mod);
  };

  // Universal Search Result Navigation Handler
  const handleSelectSearchResult = (category, item) => {
    setIsProfileActive(false);
    setFromDashboard(false);
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
      pushNotification('Opportunity Converted', `Lead "${lead.leadName}" (${lead.company}) converted to Opportunity!`, 'Opportunity', 'opportunities');
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
      setIsProfileActive(false);
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
      pushNotification('New Lead Created', `Lead "${formData.leadName}" created for ${formData.company}`, 'Lead', 'leads');

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
    } else if (type === 'addNote') {
      const noteText = formData.notes || 'Note added to lead record';
      const targetLead = selectedLead || leads[0];
      if (targetLead) {
        const updatedNotes = `${targetLead.notes || ''}\n• ${noteText}`;
        const updatedLeads = leads.map(l => l.id === targetLead.id ? { ...l, notes: updatedNotes } : l);
        setLeads(updatedLeads);
        if (selectedLead && selectedLead.id === targetLead.id) {
          setSelectedLead({ ...selectedLead, notes: updatedNotes });
        }
        pushNotification('Note Added', `Added note to lead ${targetLead.leadName}`, 'Lead', 'leads');
      }
    } else if (type === 'assignOwner' && selectedLead) {
      const updatedLeads = leads.map(l => l.id === selectedLead.id ? { ...l, leadOwner: formData.owner } : l);
      setLeads(updatedLeads);
      if (selectedLead) {
        setSelectedLead({ ...selectedLead, leadOwner: formData.owner });
      }
      pushNotification('Owner Reassigned', `Assigned ${selectedLead.leadName} to ${formData.owner}`, 'Lead', 'leads');
    }
  };

  // Generate unique view key to trigger smooth CSS page transition keyframes on every page change
  const currentViewKey = isProfileActive
    ? 'user-profile'
    : selectedLead
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
        onOpenProfile={handleOpenProfile}
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
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAllNotifications}
          onSelectNotification={handleSelectNotification}
          onOpenProfile={handleOpenProfile}
        />

        {/* 3. Main Page Content with Keyed Dynamic Transition */}
        <main className="content-body" key={currentViewKey}>
          {/* User Profile View */}
          {isProfileActive ? (
            <ProfileView
              onBack={() => setIsProfileActive(false)}
              onNavigateHome={() => {
                setIsProfileActive(false);
                setActiveModule('dashboard');
              }}
              leads={leads}
              accounts={accounts}
              opportunities={opportunities}
              onSelectLead={(lead) => {
                setIsProfileActive(false);
                setSelectedLead(lead);
              }}
              onSelectAccount={(acc) => {
                setIsProfileActive(false);
                setSelectedAccount(acc);
                setActiveModule('accounts');
              }}
            />
          ) : selectedLead ? (
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
            /* Main Dashboard & Standard Section Modules */
            <>
              {activeModule === 'dashboard' && (
                <DashboardView
                  leads={leads}
                  accounts={accounts}
                  activities={activities}
                  onNavigateToLeads={handleNavigateToLeads}
                  onNavigateToAccounts={handleNavigateToAccounts}
                  onNavigateToActivities={handleNavigateToActivities}
                  onSelectLead={(lead) => {
                    setSelectedAccount(null);
                    setSelectedLead(lead);
                  }}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                  selectedOwnerFilter={selectedOwnerFilter}
                />
              )}

              {activeModule === 'leads' && (
                <LeadsView
                  leads={leads}
                  onSelectLead={(lead) => {
                    setSelectedAccount(null);
                    setSelectedLead(lead);
                  }}
                  onOpenCreateModal={() => {
                    setModalInitialType('createLead');
                    setIsCreateModalOpen(true);
                  }}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                  selectedOwnerFilter={selectedOwnerFilter}
                  sourceFilter={leadsSourceFilter}
                  overdueOnlyFilter={leadsOverdueOnly}
                  onClearFilters={() => {
                    setLeadsSourceFilter('');
                    setLeadsOverdueOnly(false);
                  }}
                  fromDashboard={fromDashboard}
                  onBackToDashboard={() => {
                    setFromDashboard(false);
                    setActiveModule('dashboard');
                  }}
                />
              )}

              {activeModule === 'accounts' && (
                <AccountsView
                  accounts={accounts}
                  onSelectAccount={(acc) => {
                    setSelectedLead(null);
                    setSelectedAccount(acc);
                  }}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                  selectedOwnerFilter={selectedOwnerFilter}
                  fromDashboard={fromDashboard}
                  onBackToDashboard={() => {
                    setFromDashboard(false);
                    setActiveModule('dashboard');
                  }}
                />
              )}

              {activeModule === 'opportunities' && (
                <OpportunitiesView
                  opportunities={opportunities}
                  onUpdateOpportunityStage={(oppId, newStage) => {
                    setOpportunities(prev => prev.map(o => o.id === oppId ? { ...o, currentStage: newStage } : o));
                    const targetOpp = opportunities.find(o => o.id === oppId);
                    if (targetOpp) {
                      pushNotification('Stage Updated', `Moved "${targetOpp.opportunityName}" to ${newStage}`, 'Opportunity', 'opportunities');
                    }
                  }}
                  onSelectAccount={(companyName) => {
                    const fullAcc = accounts.find(a => a.companyName.toLowerCase() === companyName.toLowerCase());
                    if (fullAcc) {
                      setSelectedLead(null);
                      setSelectedAccount(fullAcc);
                      setActiveModule('accounts');
                    }
                  }}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                  selectedOwnerFilter={selectedOwnerFilter}
                  onOpenCreateModal={(type = 'createLead') => {
                    setModalInitialType(type);
                    setIsCreateModalOpen(true);
                  }}
                />
              )}

              {activeModule === 'activities' && (
                <ActivitiesView
                  activities={activities}
                  searchQuery={searchQuery}
                  selectedDateFilter={selectedDateFilter}
                  fromDashboard={fromDashboard}
                  onBackToDashboard={() => {
                    setFromDashboard(false);
                    setActiveModule('dashboard');
                  }}
                  initialTab={activitiesInitialTab}
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

      {/* Toast Banner Container */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast-banner">
            <Bell size={18} />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
