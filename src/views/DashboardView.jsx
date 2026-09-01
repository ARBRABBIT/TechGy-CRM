import React, { useState, useEffect } from 'react';
import { 
  IndianRupee, 
  TrendingUp, 
  Users, 
  Building2, 
  AlertTriangle, 
  CheckSquare,
  Clock,
  ArrowUpRight,
  Filter,
  PieChart as PieIcon,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { REVENUE_DATA, INITIAL_OWNERS, INITIAL_DATE_FILTERS } from '../data/mockData';

export default function DashboardView({ 
  leads = [], 
  accounts = [], 
  activities = [], 
  selectedOwnerFilter = 'All Owners', 
  selectedDateFilter = 'This Month',
  onNavigateToLeads,
  onNavigateToAccounts,
  onNavigateToActivities,
  onSelectLead
}) {
  const [revenueToggle, setRevenueToggle] = useState('Monthly');
  
  // Dedicated Marketing Card Filter States (As mandated in PDF: "filters by date and owner")
  const [marketingDateFilter, setMarketingDateFilter] = useState(selectedDateFilter);
  const [marketingOwnerFilter, setMarketingOwnerFilter] = useState(selectedOwnerFilter);

  // Sync global header date filter changes directly to revenue chart toggle & card states!
  useEffect(() => {
    if (selectedDateFilter === 'This Month') {
      setRevenueToggle('Monthly');
      setMarketingDateFilter('This Month');
    } else if (selectedDateFilter === 'This Quarter') {
      setRevenueToggle('Quarterly');
      setMarketingDateFilter('This Quarter');
    } else if (selectedDateFilter === 'FY 2025-26') {
      setRevenueToggle('FY');
      setMarketingDateFilter('FY 2025-26');
    } else if (selectedDateFilter === 'All Time') {
      setRevenueToggle('FY');
      setMarketingDateFilter('All Time');
    }
  }, [selectedDateFilter]);

  // Sync global owner filter changes
  useEffect(() => {
    setMarketingOwnerFilter(selectedOwnerFilter);
  }, [selectedOwnerFilter]);

  // Filter leads/activities dynamically based on global owner filter & date filter
  const isDateMatch = (dateStr) => {
    if (!dateStr || selectedDateFilter === 'All Time') return true;
    const d = dateStr.toLowerCase();
    if (selectedDateFilter === 'This Month') return d.includes('2026-08') || d.includes('2026-09') || d.includes('aug') || d.includes('sep');
    if (selectedDateFilter === 'This Quarter') return d.includes('2026-07') || d.includes('2026-08') || d.includes('2026-09') || d.includes('q3');
    if (selectedDateFilter === 'FY 2025-26') return d.includes('2025') || d.includes('2026');
    return true;
  };

  const filteredLeads = leads.filter(l => {
    const matchOwner = selectedOwnerFilter === 'All Owners' || l.leadOwner === selectedOwnerFilter;
    const matchDate = isDateMatch(l.createdDate) || isDateMatch(l.nextFollowup);
    return matchOwner && matchDate;
  });
  
  const filteredAccounts = accounts.filter(a =>
    selectedOwnerFilter === 'All Owners' || a.accountOwner === selectedOwnerFilter
  );

  const filteredActivities = activities.filter(act => {
    const matchOwner = selectedOwnerFilter === 'All Owners' || act.owner === selectedOwnerFilter;
    const matchDate = isDateMatch(act.date);
    return matchOwner && matchDate;
  });

  // Compute live counters
  const totalCompanies = filteredAccounts.length;
  const totalLeadsCount = filteredLeads.length;
  const overdueLeadsCount = filteredLeads.filter(l => l.isOverdue).length;
  const todayFollowupsCount = filteredActivities.filter(a => a.type === 'Follow-up' && !a.isOverdue).length;

  // Active revenue data based on toggle
  const currentRevObj = REVENUE_DATA[revenueToggle] || REVENUE_DATA.Monthly;

  // Filter follow-up action items (Overdue + Today items)
  const followUpActions = filteredLeads
    .filter(l => l.isOverdue || l.dueToday)
    .sort((a, b) => (a.isOverdue ? -1 : 1));

  // Y-axis tick formatter for Indian numbers (Lakhs & Crores)
  const formatYAxis = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
    return `₹${val}`;
  };

  // Dynamic Marketing Lead Source Mix calculation based on Marketing Card Filters (Date & Owner)
  const leadsForMarketing = leads.filter(lead => {
    if (marketingOwnerFilter !== 'All Owners' && lead.leadOwner !== marketingOwnerFilter) {
      return false;
    }
    if (marketingDateFilter !== 'All Time') {
      const d = (lead.createdDate || '').toLowerCase();
      if (marketingDateFilter === 'This Month' && !(d.includes('2026-08') || d.includes('2026-09'))) return false;
      if (marketingDateFilter === 'This Quarter' && !(d.includes('2026-07') || d.includes('2026-08') || d.includes('2026-09'))) return false;
    }
    return true;
  });

  const sourceCounts = {
    Website: 0,
    Referral: 0,
    LinkedIn: 0,
    'Inbound Call': 0,
    Campaign: 0,
    Partner: 0
  };

  leadsForMarketing.forEach(lead => {
    if (sourceCounts[lead.leadSource] !== undefined) {
      sourceCounts[lead.leadSource] += 1;
    }
  });

  const colors = {
    Website: '#063669',
    Referral: '#1A4F85',
    LinkedIn: '#2F69A1',
    'Inbound Call': '#4C83BD',
    Campaign: '#6E9ED9',
    Partner: '#95B8E6'
  };

  const dynamicSourceMixData = Object.keys(sourceCounts).map(source => ({
    name: source,
    count: sourceCounts[source],
    color: colors[source]
  }));

  const marketingTotalLeads = leadsForMarketing.length;

  return (
    <div className="dashboard-view">
      {/* Management Snapshot Header Banner */}
      <div className="dashboard-banner">
        <div className="banner-text">
          <h2>Management Snapshot</h2>
          <p>
            Answering: How much revenue do we have? Where are leads coming from? What needs action today?
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', zIndex: 2 }}>
          <span className="counter-badge tasks" style={{ background: '#084482', color: '#FFFFFF', border: '1px solid #1A4F85', fontWeight: 600 }}>
            {selectedOwnerFilter}
          </span>
          <span className="counter-badge tasks" style={{ background: '#084482', color: '#FFFFFF', border: '1px solid #1A4F85', fontWeight: 600 }}>
            {selectedDateFilter}
          </span>
        </div>
      </div>

      {/* Top 3 Revenue KPI Cards */}
      <div className="revenue-grid">
        <div 
          className="kpi-card"
          onClick={() => onNavigateToLeads()}
          title="Click to view revenue records in Leads"
        >
          <div className="kpi-header">
            <span className="kpi-title">Monthly Revenue</span>
            <div className="kpi-icon-wrap">
              <IndianRupee size={18} />
            </div>
          </div>
          <div className="kpi-value">{REVENUE_DATA.Monthly.revenue}</div>
          <div className="kpi-subtext">
            <span className="badge-success"><ArrowUpRight size={14} /> +12.4%</span> vs last month
          </div>
        </div>

        <div 
          className="kpi-card"
          onClick={() => onNavigateToLeads()}
          title="Click to view quarterly revenue details"
        >
          <div className="kpi-header">
            <span className="kpi-title">Quarterly Revenue</span>
            <div className="kpi-icon-wrap">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="kpi-value">{REVENUE_DATA.Quarterly.revenue}</div>
          <div className="kpi-subtext">
            <span className="badge-success"><ArrowUpRight size={14} /> +8.2%</span> vs Q2 target
          </div>
        </div>

        <div 
          className="kpi-card"
          onClick={() => onNavigateToLeads()}
          title="Click to view Financial Year revenue details"
        >
          <div className="kpi-header">
            <span className="kpi-title">FY Revenue</span>
            <div className="kpi-icon-wrap">
              <IndianRupee size={18} />
            </div>
          </div>
          <div className="kpi-value">{REVENUE_DATA.FY.revenue}</div>
          <div className="kpi-subtext">
            <span style={{ color: '#557396' }}>Target: ₹2,00,00,000</span>
          </div>
        </div>
      </div>

      {/* Dual Charts Section: Revenue Trend Line + Marketing Lead Source Mix Donut */}
      <div className="charts-grid">
        {/* Revenue Trend Line Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Revenue Trend ({revenueToggle})</h3>
              <div style={{ fontSize: '0.775rem', color: '#557396' }}>
                Revenue movement across selected period: {selectedDateFilter}
              </div>
            </div>
            {/* Monthly / Quarterly / FY toggle switch */}
            <div className="toggle-group">
              {['Monthly', 'Quarterly', 'FY'].map((t) => (
                <button
                  key={t}
                  className={`toggle-btn ${revenueToggle === t ? 'active' : ''}`}
                  onClick={() => setRevenueToggle(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentRevObj.trend} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E6EE" />
                <XAxis dataKey="period" stroke="#557396" fontSize={12} />
                <YAxis stroke="#557396" fontSize={12} tickFormatter={formatYAxis} />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#063669', borderRadius: '8px', color: 'white', border: 'none' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#063669" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: '#063669', strokeWidth: 2, stroke: '#FFFFFF' }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#557396" 
                  strokeWidth={2} 
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Marketing Lead Source Mix Donut Chart - PDF Required Card Filters: Date & Owner */}
        <div className="chart-card">
          <div className="chart-header" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 className="chart-title">Marketing</h3>
              <div style={{ fontSize: '0.75rem', color: '#557396' }}>
                Lead Source / Acquisition Mix
              </div>
            </div>
            
            {/* Card Specific Filters: Date & Owner */}
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <select
                className="select-filter"
                style={{ padding: '0.2rem 0.45rem', fontSize: '0.725rem', height: '28px' }}
                value={marketingDateFilter}
                onChange={(e) => setMarketingDateFilter(e.target.value)}
                title="Filter Marketing by Date"
              >
                {INITIAL_DATE_FILTERS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                className="select-filter"
                style={{ padding: '0.2rem 0.45rem', fontSize: '0.725rem', height: '28px' }}
                value={marketingOwnerFilter}
                onChange={(e) => setMarketingOwnerFilter(e.target.value)}
                title="Filter Marketing by Owner"
              >
                {INITIAL_OWNERS.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="chart-container" style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dynamicSourceMixData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                  onClick={(data) => {
                    onNavigateToLeads(data.name);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {dynamicSourceMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} leads`, name]}
                  contentStyle={{ backgroundColor: '#063669', borderRadius: '8px', color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#063669' }}>{marketingTotalLeads}</div>
              <div style={{ fontSize: '0.65rem', color: '#557396', textTransform: 'uppercase' }}>Leads</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
            {dynamicSourceMixData.map((item) => (
              <div 
                key={item.name} 
                onClick={() => onNavigateToLeads(item.name)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color, border: '1px solid #E0E6EE' }} />
                <span style={{ color: '#063669' }}>{item.name}: <strong>{item.count}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead & Follow-up Summary: 4 KPI Counters Block */}
      <div className="counters-grid">
        <div 
          className="counter-card"
          onClick={() => onNavigateToAccounts()}
          title="Clicking opens Accounts list"
        >
          <div>
            <div className="counter-title">Companies</div>
            <div className="counter-value">{totalCompanies}</div>
          </div>
          <span className="counter-badge total">TOTAL</span>
        </div>

        <div 
          className="counter-card"
          onClick={() => onNavigateToLeads()}
          title="Clicking opens Leads list"
        >
          <div>
            <div className="counter-title">No. of Leads</div>
            <div className="counter-value">{totalLeadsCount}</div>
          </div>
          <span className="counter-badge total">TOTAL</span>
        </div>

        {/* OVERDUE LEADS - Alert Counter in Minimal #063669 & #F9F9F9 */}
        <div 
          className="counter-card alert-card"
          onClick={() => onNavigateToLeads('OVERDUE')}
          title="Clicking opens Leads filtered strictly to overdue records"
        >
          <div>
            <div className="counter-title">Overdue Leads</div>
            <div className="counter-value">{overdueLeadsCount}</div>
          </div>
          <span className="counter-badge alert">ALERT</span>
        </div>

        <div 
          className="counter-card"
          onClick={() => onNavigateToActivities()}
          title="Clicking opens Today's Follow-ups in Activities"
        >
          <div>
            <div className="counter-title">Today's Follow-ups</div>
            <div className="counter-value">{todayFollowupsCount}</div>
          </div>
          <span className="counter-badge tasks">TASKS</span>
        </div>
      </div>

      {/* Follow-up Action List Section */}
      <div className="section-card">
        <div className="section-header">
          <div>
            <h3 className="section-title">Follow-up Action List</h3>
            <div style={{ fontSize: '0.8rem', color: '#557396' }}>
              Today's follow-ups and overdue activities requiring immediate sales action.
            </div>
          </div>
          <button className="btn-secondary" onClick={() => onNavigateToLeads()}>
            View All Leads <ChevronRight size={16} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="action-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Lead</th>
                <th>Owner</th>
                <th>Due Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {followUpActions.map((item) => (
                <tr 
                  key={item.id} 
                  className={item.isOverdue ? 'overdue-row' : ''}
                  onClick={() => onSelectLead(item)}
                >
                  <td style={{ fontWeight: 600 }}>{item.company}</td>
                  <td>{item.leadName}</td>
                  <td>{item.leadOwner}</td>
                  <td>
                    <span style={{ 
                      color: '#063669', 
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Clock size={13} /> {item.nextFollowup}
                    </span>
                  </td>
                  <td>
                    <span className={`status-chip ${item.isOverdue ? 'overdue' : item.status.toLowerCase()}`}>
                      {item.isOverdue ? 'OVERDUE' : item.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-secondary"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLead(item);
                      }}
                    >
                      Inspect Next Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
