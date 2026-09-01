import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Clock, Calendar, ChevronRight } from 'lucide-react';

export default function ActivitiesView({ activities = [], searchQuery = '', selectedDateFilter = 'This Month' }) {
  const [activeTab, setActiveTab] = useState('All');

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

        <div className="timeline">
          {filteredActivities.map((act) => (
            <div key={act.id} className="timeline-item">
              <div className="timeline-icon">
                {getIcon(act.type)}
              </div>
              <div className="timeline-card" style={act.isOverdue ? { borderLeft: '3px solid #063669', backgroundColor: '#F9F9F9' } : {}}>
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
