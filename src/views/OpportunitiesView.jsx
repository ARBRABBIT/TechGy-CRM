import React from 'react';
import { TrendingUp, ShieldCheck, ChevronRight } from 'lucide-react';

export default function OpportunitiesView({ opportunities = [], searchQuery = '', selectedDateFilter = 'This Month' }) {
  const q = searchQuery.toLowerCase().trim();
  const filteredOpps = opportunities.filter(o =>
    !q ||
    o.opportunityName.toLowerCase().includes(q) ||
    o.accountName.toLowerCase().includes(q) ||
    o.owner.toLowerCase().includes(q) ||
    o.currentStage.toLowerCase().includes(q)
  );

  return (
    <div className="opportunities-view">
      <div className="dashboard-banner">
        <div className="banner-text">
          <h2>04 Opportunities Pipeline</h2>
          <p>Scored deals (0-100), expected closure dates, probability & stage progression</p>
        </div>
        <span className="counter-badge tasks" style={{ background: '#084482', color: '#FFFFFF', border: '1px solid #1A4F85', fontWeight: 600, zIndex: 2 }}>
          {filteredOpps.length} Opportunities Listed
        </span>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h3 className="section-title">Deal Pipeline & Opportunity Score</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="action-table">
            <thead>
              <tr>
                <th>Opportunity Name</th>
                <th>Account</th>
                <th>Score (0-100)</th>
                <th>Est. Value</th>
                <th>Probability</th>
                <th>Expected Closure</th>
                <th>Stage</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {filteredOpps.map((opp) => (
                <tr key={opp.id}>
                  <td style={{ fontWeight: 600 }}>{opp.opportunityName}</td>
                  <td>{opp.accountName}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        fontWeight: 700,
                        color: opp.score >= 80 ? '#063669' : opp.score >= 60 ? '#084482' : '#557396'
                      }}>
                        {opp.score}
                      </span>
                      <span className={`status-chip ${opp.score >= 80 ? 'qualified' : opp.score >= 60 ? 'discussion' : 'new'}`} style={{ fontSize: '0.65rem' }}>
                        {opp.visualLevel}
                      </span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700 }}>{opp.estimatedValue}</td>
                  <td>{opp.probability}</td>
                  <td>{opp.expectedClosureDate}</td>
                  <td>
                    <span className="status-chip proposal">
                      {opp.currentStage}
                    </span>
                  </td>
                  <td>{opp.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
