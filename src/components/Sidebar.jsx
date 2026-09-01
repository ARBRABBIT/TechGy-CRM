import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Contact,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const MODULES = [
  { id: 'dashboard', index: '01', title: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'leads', index: '02', title: 'Leads', icon: Users, badge: { text: '7 Alert', type: 'alert' } },
  { id: 'accounts', index: '03', title: 'Accounts', icon: Building2, badge: null },
  { id: 'opportunities', index: '04', title: 'Opportunities', icon: TrendingUp, badge: null },
  { id: 'activities', index: '05', title: 'Activities', icon: Calendar, badge: { text: '14 Tasks', type: 'tasks' } },
  { id: 'proposals', index: '06', title: 'Proposals', icon: FileText, badge: null },
  { id: 'contacts', index: '07', title: 'Contacts', icon: Contact, badge: null }
];

export default function Sidebar({ 
  activeModule, 
  setActiveModule, 
  mobileOpen, 
  setMobileOpen,
  isCollapsed,
  setIsCollapsed
}) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Sidebar Header - Clicking Logo Box Toggles Sidebar */}
      <div className="sidebar-header">
        <div 
          className="brand-container" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ cursor: 'pointer' }}
          title={isCollapsed ? "Click to expand sidebar" : "Click to collapse sidebar"}
        >
          {/* Logo Box with Hover Reveal Button */}
          <div className="brand-logo-wrapper">
            <div className="brand-logo" title="TechGy CRM">
              <ShieldCheck size={20} />
            </div>
            <button 
              className="sidebar-collapse-hover-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(!isCollapsed);
              }}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {!isCollapsed && (
            <div className="brand-text">
              <span className="brand-title">TechGy CRM</span>
              <div className="brand-subtitle">Internal Workspace</div>
            </div>
          )}
        </div>

        {mobileOpen && (
          <button 
            onClick={() => setMobileOpen(false)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation Menu (Module Item Clicks navigate; clicking between icons does NOT open sidebar) */}
      <nav className="sidebar-menu">
        {MODULES.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <div
              key={item.id}
              className={`menu-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveModule(item.id);
                setMobileOpen(false);
              }}
              title={isCollapsed ? `${item.index} ${item.title}` : undefined}
            >
              <div className="menu-left">
                {!isCollapsed && <span className="menu-index">{item.index}</span>}
                <Icon size={18} className="menu-icon" />
                {!isCollapsed && <span>{item.title}</span>}
              </div>
              {item.badge && (
                <span className={`menu-badge ${item.badge.type}`}>
                  {item.badge.text}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Empty space below icons (Clicking here opens/collapses sidebar) */}
      <div 
        className="sidebar-empty-click-area"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ flex: 1, cursor: 'pointer', minHeight: '40px' }}
        title={isCollapsed ? "Click empty space to expand sidebar" : "Click empty space to collapse sidebar"}
      />

      {/* User Profile Card in Sidebar */}
      {!isCollapsed ? (
        <div 
          className="sidebar-profile" 
          style={{
            padding: '1rem',
            borderTop: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'transparent',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(!isCollapsed);
          }}
          title="Click profile to toggle sidebar"
        >
          <div 
            className="avatar" 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#084482',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: 'none',
              flexShrink: 0
            }}
          >
            RS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Rajesh Sharma
            </span>
            <span style={{ fontSize: '0.725rem', color: '#D0DCEB', whiteSpace: 'nowrap' }}>
              Sales Director
            </span>
          </div>
        </div>
      ) : (
        <div 
          className="sidebar-profile collapsed" 
          style={{
            padding: '1rem 0',
            borderTop: 'none',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer'
          }} 
          title="Click profile to toggle sidebar"
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(!isCollapsed);
          }}
        >
          <div 
            className="avatar" 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#084482',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: 'none'
            }}
          >
            RS
          </div>
        </div>
      )}
    </aside>
  );
}
