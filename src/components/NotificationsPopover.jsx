import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  UserPlus,
  Calendar,
  FileText,
  TrendingUp,
  X,
  CheckCheck,
  Trash2,
  ExternalLink
} from 'lucide-react';

export default function NotificationsPopover({
  isOpen,
  onClose,
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onNotificationClick
}) {
  const [activeTab, setActiveTab] = useState('All');
  const popoverRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'Unread') return !n.isRead;
    if (activeTab === 'Overdue') return n.category === 'Overdue' || n.priority === 'High';
    if (activeTab === 'Updates') return n.category === 'Lead' || n.category === 'Opportunity' || n.category === 'Proposal';
    return true;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Overdue':
        return <AlertTriangle size={16} style={{ color: '#DC2626' }} />;
      case 'Opportunity':
        return <TrendingUp size={16} style={{ color: '#059669' }} />;
      case 'Lead':
        return <UserPlus size={16} style={{ color: '#063669' }} />;
      case 'Activity':
        return <Calendar size={16} style={{ color: '#D97706' }} />;
      case 'Proposal':
        return <FileText size={16} style={{ color: '#2563EB' }} />;
      default:
        return <CheckCircle2 size={16} style={{ color: '#063669' }} />;
    }
  };

  const getCategoryBg = (category) => {
    switch (category) {
      case 'Overdue': return '#FEE2E2';
      case 'Opportunity': return '#D1FAE5';
      case 'Lead': return '#E0E6EE';
      case 'Activity': return '#FEF3C7';
      case 'Proposal': return '#DBEAFE';
      default: return '#F1F5F9';
    }
  };

  return (
    <div className="notifications-dropdown" ref={popoverRef}>
      {/* Header */}
      <div className="notifications-header">
        <div className="notifications-title">
          <Bell size={18} />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span style={{
              backgroundColor: '#063669',
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.15rem 0.55rem',
              borderRadius: '9999px'
            }}>
              {unreadCount} new
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="btn-secondary"
              style={{ fontSize: '0.7rem', padding: '0.25rem 0.65rem' }}
              title="Mark all as read"
            >
              <CheckCheck size={13} />
              <span>Mark Read</span>
            </button>
          )}
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#557396', padding: '0.2rem' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="notifications-tabs">
        {['All', 'Unread', 'Overdue', 'Updates'].map(tab => (
          <button
            key={tab}
            className={`notifications-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === 'Unread' && unreadCount > 0 && ` (${unreadCount})`}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div style={{ padding: '2rem 1.5rem', textAlign: 'center', color: '#557396', fontSize: '0.85rem' }}>
            <CheckCircle2 size={32} style={{ color: '#CBD5E1', marginBottom: '0.5rem', display: 'block', margin: '0 auto 0.5rem' }} />
            No notifications in "{activeTab}" category.
          </div>
        ) : (
          filteredNotifications.map(item => (
            <div
              key={item.id}
              className={`notification-item ${!item.isRead ? 'unread' : ''}`}
              onClick={() => {
                onMarkAsRead(item.id);
                if (onNotificationClick) onNotificationClick(item);
              }}
            >
              <div
                className="notification-icon-wrap"
                style={{ backgroundColor: getCategoryBg(item.category) }}
              >
                {getCategoryIcon(item.category)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                  <span style={{ fontSize: '0.825rem', fontWeight: item.isRead ? 600 : 700, color: '#063669' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                    {item.timestamp}
                  </span>
                </div>
                <div style={{ fontSize: '0.775rem', color: '#334155', lineHeight: 1.4 }}>
                  {item.message}
                </div>
              </div>
              {!item.isRead && (
                <div className="notification-unread-dot" title="Unread notification" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div style={{
          padding: '0.6rem 1.25rem',
          borderTop: '1px solid #F1F5F9',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={onClearAll}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              fontSize: '0.725rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Trash2 size={12} />
            <span>Clear all notifications</span>
          </button>
        </div>
      )}
    </div>
  );
}
