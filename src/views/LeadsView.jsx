import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Building2,
  Phone,
  Mail,
  Clock,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { LEAD_SOURCES, INITIAL_OWNERS } from '../data/mockData';

export default function LeadsView({
  leads = [],
  onSelectLead,
  onOpenCreateModal,
  initialFilterSource = '',
  initialOverdueOnly = false,
  searchQuery = ''
}) {
  const [localSearch, setLocalSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState(initialFilterSource);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [ownerFilter, setOwnerFilter] = useState('All Owners');
  const [overdueOnly, setOverdueOnly] = useState(initialOverdueOnly);

  const effectiveSearch = (searchQuery || localSearch).toLowerCase().trim();

  // Multi-field Lead filtering
  const filteredLeads = leads.filter((lead) => {
    // 1. Search Query
    if (effectiveSearch) {
      const matchName = lead.leadName.toLowerCase().includes(effectiveSearch);
      const matchCompany = lead.company.toLowerCase().includes(effectiveSearch);
      const matchEmail = lead.emailId.toLowerCase().includes(effectiveSearch);
      const matchPhone = lead.phoneNumber.toLowerCase().includes(effectiveSearch);
      const matchDesignation = lead.designation.toLowerCase().includes(effectiveSearch);
      if (!matchName && !matchCompany && !matchEmail && !matchPhone && !matchDesignation) {
        return false;
      }
    }

    // 2. Source Filter
    if (sourceFilter && lead.leadSource !== sourceFilter) {
      return false;
    }

    // 3. Status Filter
    if (statusFilter !== 'All Statuses' && lead.status !== statusFilter) {
      return false;
    }

    // 4. Owner Filter
    if (ownerFilter !== 'All Owners' && lead.leadOwner !== ownerFilter) {
      return false;
    }

    // 5. Overdue Only
    if (overdueOnly && !lead.isOverdue) {
      return false;
    }

    return true;
  });

  return (
    <div className="leads-view">
      {/* Banner */}
      <div className="dashboard-banner">
        <div className="banner-text">
          <h2>02 Leads Directory & Sales Pipeline</h2>
          <p>Full sales status tracking, follow-up scheduling & quick drawer inspection</p>
        </div>
        <button
          className="btn-primary"
          style={{ background: '#FFFFFF', color: '#063669', borderColor: '#FFFFFF', fontWeight: 700 }}
          onClick={() => onOpenCreateModal('createLead')}
        >
          <Plus size={16} /> Create New Lead
        </button>
      </div>

      {/* Filter & Control Bar */}
      <div className="section-card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Search Box */}
          <div className="search-box" style={{ width: '240px' }}>
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search leads..."
              value={localSearch || searchQuery}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Source Filter */}
            <select
              className="select-filter"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option value="">All Sources</option>
              {LEAD_SOURCES.map((src) => (
                <option key={src} value={src}>{src}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="select-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Statuses">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Discussion">Discussion</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
            </select>

            {/* Owner Filter */}
            <select
              className="select-filter"
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
            >
              {INITIAL_OWNERS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>

            {/* Overdue Alert Filter Toggle */}
            <button
              className={`btn-secondary ${overdueOnly ? 'active' : ''}`}
              style={overdueOnly ? { background: '#063669', color: 'white', borderColor: '#063669' } : {}}
              onClick={() => setOverdueOnly(!overdueOnly)}
            >
              <AlertTriangle size={14} /> Overdue Only ({leads.filter(l => l.isOverdue).length})
            </button>

            {/* Reset Filters */}
            {(sourceFilter || statusFilter !== 'All Statuses' || ownerFilter !== 'All Owners' || overdueOnly || localSearch) && (
              <button
                className="btn-secondary"
                style={{ fontSize: '0.75rem' }}
                onClick={() => {
                  setSourceFilter('');
                  setStatusFilter('All Statuses');
                  setOwnerFilter('All Owners');
                  setOverdueOnly(false);
                  setLocalSearch('');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Leads Main Table */}
      <div className="section-card">
        <div className="section-header">
          <h3 className="section-title">
            Lead Records ({filteredLeads.length})
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="action-table">
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Company</th>
                <th>Designation</th>
                <th>Lead Source</th>
                <th>Status</th>
                <th>Lead Owner</th>
                <th>Next Follow-up</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#557396' }}>
                    No leads found matching current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={lead.isOverdue ? 'overdue-row' : ''}
                    onClick={() => onSelectLead(lead)}
                  >
                    <td style={{ fontWeight: 700, color: '#063669' }}>
                      {lead.leadName}
                    </td>
                    <td style={{ fontWeight: 600 }}>{lead.company}</td>
                    <td>{lead.designation}</td>
                    <td>
                      <span className="status-chip new" style={{ fontSize: '0.7rem' }}>
                        {lead.leadSource}
                      </span>
                    </td>
                    <td>
                      <span className={`status-chip ${lead.status.toLowerCase()}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>{lead.leadOwner}</td>
                    <td>
                      <span style={{ color: lead.isOverdue ? '#063669' : '#063669', fontWeight: 600 }}>
                        <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                        {lead.nextFollowup}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-secondary"
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.725rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLead(lead);
                        }}
                      >
                        Inspect <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
