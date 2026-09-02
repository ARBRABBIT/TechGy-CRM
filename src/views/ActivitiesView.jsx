import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, Clock, Calendar, ChevronRight } from 'lucide-react';
import { isDateInFilter } from '../utils/dateUtils';

export default function ActivitiesView({
  activities = [],
  searchQuery = '',
  selectedDateFilter = 'This Month',
  fromDashboard = false,
  onBackToDashboard,
  initialTab = 'All'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const q = searchQuery.toLowerCase().trim();

  const filteredActivities = activities.filter(act => {
    if (activeTab !== 'All' && act.type !== activeTab) return false;
    if (q) {
      const matchCompany = act.company && act.company.toLowerCase().includes(q);
      const matchLead = act.lead && act.lead.toLowerCase().includes(q);
      const matchNotes = act.notes && act.notes.toLowerCase().includes(q);
      const matchOwner = act.owner && act.owner.toLowerCase().includes(q);
      const matchType = act.type && act.type.toLowerCase().includes(q);
      if (!matchCompany && !matchLead && !matchNotes && !matchOwner && !matchType) return false;
    }
    if (selectedDateFilter && selectedDateFilter !== 'All Time') {
      const matchesDate = isDateInFilter(act.date || act.dueTime, selectedDateFilter);
      if (!matchesDate) return false;
    }
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'Call': return <Phone size={14} />;
      case 'Email': return <Mail size={14} />;
      case 'SMS / WhatsApp': return <MessageSquare size={14} />;
      case 'Follow-up': return <Clock size={14} />;
      case 'Meeting': return <Calendar size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="activities-view">
      {/* Conditional Breadcrumbs when redirected from Dashboard */}
      {fromDashboard && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#557396' }}>
            <span
              onClick={onBackToDashboard}
              style={{ cursor: 'pointer', color: '#063669' }}
              title="Go to Dashboard"
            >
              Dashboard
            </span>
            <ChevronRight size={14} />
            <span style={{ color: '#063669', fontWeight: 700 }}>
              Activities & Engagement Timeline
            </span>
          </nav>
        </div>
      )}
      <div className="dashboard-banner">
        <div className="banner-text">
          <h2>Activities & Engagement Timeline</h2>
          <p>Chronological interaction log: Calls, Emails, WhatsApp, Meetings & Overdue Follow-ups</p>
        </div>
        <span className="counter-badge tasks" style={{ background: '#084482', color: '#FFFFFF', border: '1px solid #1A4F85', fontWeight: 600, zIndex: 2 }}>
          {filteredActivities.length} Activity Logs
        </span>
      </div>

      <div className="section-card">
        <div className="tab-header">
          {['All', 'Call', 'Email', 'SMS / WhatsApp', 'Follow-up', 'Meeting'].map(tab => (
            <div
              key={tab}
              className={`tab-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="timeline" key={activeTab}>
          {filteredActivities.map((act) => (
            <div key={act.id} className="timeline-item">
              <div className="timeline-icon">
                {getIcon(act.type)}
              </div>
              <div
                className={`timeline-card ${act.isOverdue ? 'action-card' : ''}`}
                style={
                  act.isOverdue
                    ? { border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', borderRadius: '10px' }
                    : { border: 'none', backgroundColor: '#F9F9F9' }
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#063669' }}>{act.type}</span>
                    <span style={{ fontSize: '0.8rem', color: '#557396' }}>with</span>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{act.lead || act.company}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#557396', fontWeight: 500 }}>{act.date}</span>
                </div>

                <div style={{ fontSize: '0.825rem', color: '#063669', marginBottom: '0.35rem' }}>
                  {act.notes || act.summary || act.shortPreview || act.meetingNotes}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#557396' }}>
                  <span>Logged by: <strong>{act.owner}</strong></span>
                  <span className={`status-chip ${act.isOverdue ? 'overdue' : 'new'}`} style={{ fontSize: '0.65rem' }}>
                    {act.isOverdue ? 'OVERDUE ITEM' : act.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
