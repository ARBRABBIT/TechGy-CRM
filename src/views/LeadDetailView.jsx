import React, { useState } from 'react';
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
  onNavigateToAccount 
}) {
  const [newNote, setNewNote] = useState('');
  const [notesList, setNotesList] = useState(
    lead.notes ? lead.notes.split('\n').filter(Boolean) : ['Initial lead inquiry received via website.']
  );

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
            title="Return to Leads Directory"
          >
            Leads
          </span>
          <ChevronRight size={14} />
          <span style={{ color: '#063669', fontWeight: 700 }}>
            {lead.leadName} ({lead.company})
          </span>
        </nav>

        <button className="btn-secondary" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ArrowLeft size={16} /> Back to Leads
        </button>
      </div>

      {/* 2. Top Banner Summary Header */}
      <div className="dashboard-banner" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="banner-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>{lead.leadName}</h2>
            <span className={`status-chip ${lead.status.toLowerCase()}`} style={{ fontSize: '0.8rem' }}>
              {lead.status}
            </span>
            {lead.isOverdue && (
              <span className="status-chip overdue" style={{ fontSize: '0.75rem' }}>
                <AlertTriangle size={12} /> OVERDUE FOLLOW-UP
              </span>
            )}
          </div>
          <p style={{ margin: 0 }}>
            {lead.designation} at <strong style={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onNavigateToAccount(lead.company)}>{lead.company}</strong> • Owner: {lead.leadOwner}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', zIndex: 2, flexWrap: 'wrap' }}>
          <button 
            className="btn-primary" 
            style={{ background: '#FFFFFF', color: '#063669', borderColor: '#FFFFFF', fontWeight: 700 }}
            onClick={() => onQuickAction('convertOpportunity', lead)}
          >
            <TrendingUp size={16} /> Convert to Opportunity
          </button>
          <button 
            className="btn-secondary"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
            onClick={() => onQuickAction('addNote', lead)}
          >
            <Plus size={16} /> Add Note
          </button>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Left Column - Main Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Key Contact Information Card */}
          <div className="section-card">
            <div className="section-header">
              <h3 className="section-title">Lead Contact Information</h3>
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

          {/* Sales Pipeline Progression Progress Bar */}
          <div className="section-card">
            <div className="section-header">
              <h3 className="section-title">Sales Pipeline Stage Progress</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginTop: '0.5rem' }}>
              {stages.map((stg, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div key={stg} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: isPassed ? '#063669' : '#E0E6EE',
                      marginBottom: '0.5rem',
                      transition: 'all 0.3s'
                    }} />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: isCurrent ? 700 : 500,
                      color: isPassed ? '#063669' : '#557396'
                    }}>
                      {stg}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes & Requirements History */}
          <div className="section-card">
            <div className="section-header">
              <h3 className="section-title">Notes & Logged Requirements</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
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

            {/* Append New Note Form */}
            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.75rem' }}>
              <input 
                type="text"
                className="form-input"
                placeholder="Type a quick note or meeting update..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                <Send size={15} /> Add Note
              </button>
            </form>
          </div>
        </div>

        {/* Right Sidebar Column - Quick Actions & Lead Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Quick Actions Panel */}
          <div className="section-card">
            <h3 className="section-title" style={{ marginBottom: '1rem' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button 
                className="btn-secondary" 
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => onQuickAction('call', lead)}
              >
                <Phone size={16} /> Log Phone Call
              </button>
              <button 
                className="btn-secondary" 
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => onQuickAction('email', lead)}
              >
                <Mail size={16} /> Log Email Sent
              </button>
              <button 
                className="btn-secondary" 
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={() => onQuickAction('sms', lead)}
              >
                <MessageSquare size={16} /> Log WhatsApp / SMS
              </button>
              <button 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'flex-start', marginTop: '0.5rem' }}
                onClick={() => onQuickAction('convertOpportunity', lead)}
              >
                <TrendingUp size={16} /> Convert to Opportunity
              </button>
            </div>
          </div>

          {/* Account Summary Widget */}
          <div className="section-card">
            <h3 className="section-title" style={{ marginBottom: '0.75rem' }}>Company Account</h3>
            <div style={{ background: '#F9F9F9', border: '1px solid #E0E6EE', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Building2 size={18} style={{ color: '#063669' }} />
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#063669' }}>{lead.company}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#557396', margin: '0 0 0.75rem 0' }}>
                View full enterprise account profile, linked deals, proposals, and contacts.
              </p>
              <button 
                className="btn-secondary" 
                style={{ width: '100%', fontSize: '0.8rem' }}
                onClick={() => onNavigateToAccount(lead.company)}
              >
                Inspect Account Profile <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
