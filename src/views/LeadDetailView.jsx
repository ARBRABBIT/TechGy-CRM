import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  Home,
  ArrowLeft,
  User,
  Building2,
  Phone,
  Mail,
  Clock,
  AlertTriangle,
  FileText,
  TrendingUp,
  Plus,
  CheckCircle2,
  Send,
  MessageSquare,
  DollarSign
} from 'lucide-react';

export default function LeadDetailView({
  lead,
  onBack,
  onNavigateHome,
  onQuickAction,
  onNavigateToAccount,
  navigationSource = 'leads',
  fromDashboard = false,
  onNavigateToActivities,
  onNavigateToProposals,
  onNavigateToContacts
}) {
  const [newNote, setNewNote] = useState('');
  const [notesList, setNotesList] = useState(
    lead.notes ? lead.notes.split('\n').filter(Boolean) : ['Initial lead inquiry received via website.']
  );

  useEffect(() => {
    if (lead.notes) {
      setNotesList(lead.notes.split('\n').filter(Boolean));
    }
  }, [lead.notes]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotesList([...notesList, `• ${newNote.trim()}`]);
    setNewNote('');
  };

  const stages = ['New', 'Contacted', 'Qualified', 'Discussion', 'Proposal', 'Negotiation'];
  const currentStageIndex = stages.indexOf(lead.status) !== -1 ? stages.indexOf(lead.status) : 0;

  return (
    <div className="lead-detail-page">
      {/* 1. Breadcrumbs Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#557396' }}>
          {navigationSource === 'contacts' ? (
            <>
              <span
                onClick={onNavigateToContacts || onBack}
                style={{ cursor: 'pointer', color: '#063669', fontWeight: 600 }}
                title="Return to Contacts Directory"
              >
                Contacts Directory
              </span>
              <ChevronRight size={14} />
              <span style={{ color: '#063669', fontWeight: 700 }}>
                {lead.leadName} ({lead.company})
              </span>
            </>
          ) : navigationSource === 'dashboard' ? (
            <>
              <span
                onClick={onNavigateHome}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#063669' }}
                title="Go to Dashboard"
              >
                Dashboard
              </span>
              <ChevronRight size={14} />
              <span style={{ color: '#063669', fontWeight: 700 }}>
                {lead.leadName} ({lead.company})
              </span>
            </>
          ) : navigationSource === 'activities' ? (
            <>
              <span
                onClick={onNavigateToActivities || onBack}
                style={{ cursor: 'pointer', color: '#063669', fontWeight: 600 }}
                title="Return to Activities & Engagement Timeline"
              >
                Activities & Engagement Timeline
              </span>
              <ChevronRight size={14} />
              <span style={{ color: '#063669', fontWeight: 700 }}>
                {lead.leadName} ({lead.company})
              </span>
            </>
          ) : navigationSource === 'proposals' ? (
            <>
              <span
                onClick={onNavigateToProposals || onBack}
                style={{ cursor: 'pointer', color: '#063669', fontWeight: 600 }}
                title="Return to Proposals & Commercial Worth"
              >
                Proposals & Commercial Worth
              </span>
              <ChevronRight size={14} />
              <span style={{ color: '#063669', fontWeight: 700 }}>
                {lead.leadName} ({lead.company})
              </span>
            </>
          ) : (
            <>
              {fromDashboard && (
                <>
                  <span
                    onClick={onNavigateHome}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#063669' }}
                    title="Go to Dashboard"
                  >
                    Dashboard
                  </span>
                  <ChevronRight size={14} />
                </>
              )}
              <span
                onClick={onBack}
                style={{ cursor: 'pointer', color: '#063669' }}
                title="Return to Leads Directory & Sales Pipeline"
              >
                Leads Directory & Sales Pipeline
              </span>
              <ChevronRight size={14} />
              <span style={{ color: '#063669', fontWeight: 700 }}>
                {lead.leadName} ({lead.company})
              </span>
            </>
          )}
        </nav>
      </div>

      {/* 2. Top Summary Header Card */}
      <div className="section-card" style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem 1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0, color: '#063669', fontWeight: 700 }}>{lead.leadName}</h2>
            <span className={`status-chip ${lead.status.toLowerCase()}`} style={{ fontSize: '0.8rem' }}>
              {lead.status}
            </span>
            {lead.isOverdue && (
              <span className="status-chip overdue" style={{ fontSize: '0.75rem' }}>
                <AlertTriangle size={12} /> OVERDUE FOLLOW-UP
              </span>
            )}
          </div>
          <p style={{ margin: 0, color: '#557396', fontSize: '0.875rem' }}>
            {lead.designation} at <strong style={{ color: '#063669', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onNavigateToAccount(lead.company)}>{lead.company}</strong> • Owner: {lead.leadOwner}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            onClick={() => onQuickAction('convertOpportunity', lead)}
          >
            <TrendingUp size={16} /> Convert to Opportunity
          </button>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        {/* Left Column - Main Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Key Contact Information Card */}
          <div className="section-card" style={{ marginBottom: 0 }}>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="section-title">Lead Contact Information</h3>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <button
                  className="icon-button"
                  title="Log Phone Call"
                  aria-label="Log Phone Call"
                  onClick={() => onQuickAction('call', lead)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E0E6EE', color: '#063669', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(6, 54, 105, 0.05)' }}
                >
                  <Phone size={15} />
                </button>

                <button
                  className="icon-button"
                  title="Log Email Sent"
                  aria-label="Log Email Sent"
                  onClick={() => onQuickAction('email', lead)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E0E6EE', color: '#063669', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(6, 54, 105, 0.05)' }}
                >
                  <Mail size={15} />
                </button>

                <button
                  className="icon-button"
                  title="Log WhatsApp / SMS"
                  aria-label="Log WhatsApp / SMS"
                  onClick={() => onQuickAction('sms', lead)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E0E6EE', color: '#063669', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(6, 54, 105, 0.05)' }}
                >
                  <MessageSquare size={15} />
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="drawer-field-group">
                <div className="field-label">Full Name</div>
                <div className="field-value" style={{ fontWeight: 700, color: '#063669' }}>{lead.leadName}</div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Company Account</div>
                <div
                  className="field-value"
                  style={{ fontWeight: 700, color: '#063669', textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => onNavigateToAccount(lead.company)}
                >
                  {lead.company}
                </div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Designation</div>
                <div className="field-value">{lead.designation}</div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Lead Source</div>
                <div className="field-value">
                  <span className="status-chip new">{lead.leadSource}</span>
                </div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Phone Number</div>
                <div className="field-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={14} style={{ color: '#557396' }} /> {lead.phoneNumber}
                </div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Email Address</div>
                <div className="field-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={14} style={{ color: '#557396' }} /> {lead.emailId}
                </div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Next Scheduled Follow-up</div>
                <div className="field-value" style={{ color: lead.isOverdue ? '#063669' : '#063669', fontWeight: 700 }}>
                  <Clock size={14} style={{ display: 'inline', marginRight: 4 }} />
                  {lead.nextFollowup}
                </div>
              </div>

              <div className="drawer-field-group">
                <div className="field-label">Assigned Owner</div>
                <div className="field-value" style={{ fontWeight: 600 }}>{lead.leadOwner}</div>
              </div>
            </div>
          </div>

          {/* Notes & Requirements History */}
          <div className="section-card" style={{ marginBottom: 0 }}>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className="section-title">Notes & Logged Requirements</h3>
              <button 
                className="btn-primary" 
                style={{ fontSize: '0.8rem', padding: '0.45rem 1.1rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
                onClick={() => onQuickAction('addNote', lead)}
              >
                <Plus size={15} /> Add Note
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: 0 }}>
              {notesList.map((noteItem, idx) => (
                <div key={idx} style={{
                  background: '#F9F9F9',
                  border: '1px solid #E0E6EE',
                  borderRadius: '8px',
                  padding: '0.875rem',
                  fontSize: '0.875rem',
                  color: '#063669'
                }}>
                  {noteItem}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column - Sales Pipeline Stage Progress Tracker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

          {/* Sales Pipeline Stage Progress Card */}
          <div className="section-card" style={{ marginBottom: 0 }}>
            <h3 className="section-title" style={{ marginBottom: '0.75rem' }}>Sales Pipeline Stage Progress</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {stages.map((stg, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div key={stg} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    backgroundColor: isCurrent ? '#063669' : isPassed ? '#F9F9F9' : '#FFFFFF',
                    border: isCurrent ? '1px solid #063669' : '1px solid #E0E6EE',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: isCurrent ? '#FFFFFF' : isPassed ? '#063669' : '#C0D0E0'
                      }} />
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: isCurrent ? 700 : 500,
                        color: isCurrent ? '#FFFFFF' : isPassed ? '#063669' : '#557396'
                      }}>
                        {stg}
                      </span>
                    </div>
                    {isCurrent && (
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        padding: '0.1rem 0.45rem',
                        borderRadius: '4px'
                      }}>
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
