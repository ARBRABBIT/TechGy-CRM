import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  ArrowLeft, 
  Building2, 
  Globe, 
  MapPin, 
  Users, 
  TrendingUp, 
  FileText, 
  Plus, 
  Phone, 
  Mail, 
  Clock, 
  IndianRupee 
} from 'lucide-react';

export default function AccountDetailView({ 
  account, 
  onBack, 
  onNavigateHome, 
  leads = [], 
  activities = [], 
  contacts = [], 
  opportunities = [], 
  proposals = [],
  onSelectLead,
  onOpenCreateModal 
}) {
  const [activeTab, setActiveTab] = useState('Leads');

  // Filter linked items
  const accountLeads = leads.filter(
    l => l.company && l.company.toLowerCase() === account.companyName.toLowerCase()
  );
  const accountOpps = opportunities.filter(
    o => o.accountName && o.accountName.toLowerCase() === account.companyName.toLowerCase()
  );
  const accountProposals = proposals.filter(
    p => p.company && p.company.toLowerCase() === account.companyName.toLowerCase()
  );
  const accountContacts = contacts.filter(
    c => c.company && c.company.toLowerCase() === account.companyName.toLowerCase()
  );

  return (
    <div className="account-detail-page">
      {/* 1. Breadcrumbs Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#557396' }}>
          <span 
            onClick={onNavigateHome} 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#063669' }}
            title="Go to Home Dashboard"
          >
            <Home size={15} /> Home
          </span>
          <ChevronRight size={14} />
          <span 
            onClick={onBack} 
            style={{ cursor: 'pointer', color: '#063669' }}
            title="Return to Accounts Directory"
          >
            Accounts
          </span>
          <ChevronRight size={14} />
          <span style={{ color: '#063669', fontWeight: 700 }}>
            {account.companyName}
          </span>
        </nav>

        <button className="btn-secondary" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ArrowLeft size={16} /> Back to Accounts
        </button>
      </div>

      {/* 2. Top Banner Header */}
      <div className="dashboard-banner" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="banner-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>{account.companyName}</h2>
            <span className="counter-badge tasks" style={{ background: '#084482', color: '#FFFFFF', border: '1px solid #1A4F85', fontWeight: 600 }}>
              Est. Worth {account.estimatedAccountValue}
            </span>
          </div>
          <p style={{ margin: 0 }}>
            {account.industry} • {account.companySize} • Owner: {account.accountOwner}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', zIndex: 2, flexWrap: 'wrap' }}>
          <button 
            className="btn-primary" 
            style={{ background: '#FFFFFF', color: '#063669', borderColor: '#FFFFFF', fontWeight: 700 }}
            onClick={() => onOpenCreateModal('createLead')}
          >
            <Plus size={16} /> Add Lead to Account
          </button>
        </div>
      </div>

      {/* 3. Top Metrics Row */}
      <div className="revenue-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Linked Leads</span>
            <div className="kpi-icon-wrap"><Users size={18} /></div>
          </div>
          <div className="kpi-value">{accountLeads.length}</div>
          <div className="kpi-subtext">Active prospects</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Opportunities</span>
            <div className="kpi-icon-wrap"><TrendingUp size={18} /></div>
          </div>
          <div className="kpi-value">{accountOpps.length}</div>
          <div className="kpi-subtext">Pipeline deals</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Proposals</span>
            <div className="kpi-icon-wrap"><FileText size={18} /></div>
          </div>
          <div className="kpi-value">{accountProposals.length}</div>
          <div className="kpi-subtext">Commercial offers</div>
        </div>
      </div>

      {/* 4. Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Account Profile Summary Card */}
          <div className="section-card">
            <div className="section-header">
              <h3 className="section-title">Company Profile</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="drawer-field-group">
                <div className="field-label">Company Name</div>
                <div className="field-value" style={{ fontWeight: 700, color: '#063669' }}>{account.companyName}</div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Industry</div>
                <div className="field-value">{account.industry}</div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Company Size</div>
                <div className="field-value">{account.companySize}</div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Estimated Account Value</div>
                <div className="field-value" style={{ fontWeight: 700, color: '#063669' }}>{account.estimatedAccountValue}</div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Website</div>
                <div className="field-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Globe size={14} style={{ color: '#557396' }} /> {account.website}
                </div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Location / Headquarters</div>
                <div className="field-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} style={{ color: '#557396' }} /> {account.location}
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Relational Data Tables */}
          <div className="section-card">
            <div className="tab-header">
              {['Leads', 'Opportunities', 'Proposals', 'Contacts'].map(tab => (
                <div 
                  key={tab} 
                  className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab} ({
                    tab === 'Leads' ? accountLeads.length :
                    tab === 'Opportunities' ? accountOpps.length :
                    tab === 'Proposals' ? accountProposals.length :
                    accountContacts.length
                  })
                </div>
              ))}
            </div>

            {/* Leads Tab */}
            {activeTab === 'Leads' && (
              <div style={{ overflowX: 'auto' }}>
                <table className="action-table">
                  <thead>
                    <tr>
                      <th>Lead Name</th>
                      <th>Designation</th>
                      <th>Source</th>
                      <th>Status</th>
                      <th>Next Follow-up</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountLeads.length === 0 ? (
                      <tr><td colSpan={6} style={{ textAlign: 'center', padding: '1.5rem', color: '#557396' }}>No leads linked to this account.</td></tr>
                    ) : (
                      accountLeads.map(l => (
                        <tr key={l.id} onClick={() => onSelectLead(l)}>
                          <td style={{ fontWeight: 700, color: '#063669' }}>{l.leadName}</td>
                          <td>{l.designation}</td>
                          <td><span className="status-chip new">{l.leadSource}</span></td>
                          <td><span className={`status-chip ${l.status.toLowerCase()}`}>{l.status}</span></td>
                          <td>{l.nextFollowup}</td>
                          <td>
                            <button className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.725rem' }}>
                              Inspect <ChevronRight size={12} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Opportunities Tab */}
            {activeTab === 'Opportunities' && (
              <div style={{ overflowX: 'auto' }}>
                <table className="action-table">
                  <thead>
                    <tr>
                      <th>Opportunity Name</th>
                      <th>Score</th>
                      <th>Est. Value</th>
                      <th>Probability</th>
                      <th>Stage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountOpps.length === 0 ? (
                      <tr><td colSpan={5} style={{ textAlign: 'center', padding: '1.5rem', color: '#557396' }}>No opportunities linked.</td></tr>
                    ) : (
                      accountOpps.map(o => (
                        <tr key={o.id}>
                          <td style={{ fontWeight: 600 }}>{o.opportunityName}</td>
                          <td style={{ fontWeight: 700 }}>{o.score}</td>
                          <td style={{ fontWeight: 700 }}>{o.estimatedValue}</td>
                          <td>{o.probability}</td>
                          <td><span className="status-chip proposal">{o.currentStage}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Proposals Tab */}
            {activeTab === 'Proposals' && (
              <div style={{ overflowX: 'auto' }}>
                <table className="action-table">
                  <thead>
                    <tr>
                      <th>Proposal ID</th>
                      <th>Value</th>
                      <th>Validity</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountProposals.length === 0 ? (
                      <tr><td colSpan={4} style={{ textAlign: 'center', padding: '1.5rem', color: '#557396' }}>No proposals linked.</td></tr>
                    ) : (
                      accountProposals.map(p => (
                        <tr key={p.id}>
                          <td style={{ fontWeight: 700, color: '#063669' }}>{p.proposalId}</td>
                          <td style={{ fontWeight: 700 }}>{p.proposalValue}</td>
                          <td>{p.validityDate}</td>
                          <td><span className={`status-chip ${p.status.toLowerCase()}`}>{p.status}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'Contacts' && (
              <div style={{ overflowX: 'auto' }}>
                <table className="action-table">
                  <thead>
                    <tr>
                      <th>Contact Name</th>
                      <th>Designation</th>
                      <th>Phone</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountContacts.length === 0 ? (
                      <tr><td colSpan={4} style={{ textAlign: 'center', padding: '1.5rem', color: '#557396' }}>No contacts linked.</td></tr>
                    ) : (
                      accountContacts.map(c => (
                        <tr key={c.id}>
                          <td style={{ fontWeight: 700, color: '#063669' }}>{c.name}</td>
                          <td>{c.designation}</td>
                          <td>{c.phone}</td>
                          <td>{c.email}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="section-card">
            <h3 className="section-title" style={{ marginBottom: '1rem' }}>Account Actions</h3>
            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => onOpenCreateModal('createLead')}
            >
              <Plus size={16} /> Create Lead for {account.companyName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
