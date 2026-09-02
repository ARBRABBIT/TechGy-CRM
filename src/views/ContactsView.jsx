import React, { useState } from 'react';
import { Contact, Search, Building2, Phone, Mail } from 'lucide-react';
import { isDateInFilter } from '../utils/dateUtils';

export default function ContactsView({ contacts = [], onSelectAccount, searchQuery = '', selectedDateFilter = 'This Month' }) {
  const [activePreset, setActivePreset] = useState('All Contacts');

  const q = searchQuery.toLowerCase().trim();

  const filteredContacts = contacts.filter(c => {
    if (activePreset === 'Recently Contacted' && c.lastContacted === 'None') return false;
    if (activePreset === 'No Activity' && c.relationshipStatus !== 'No Activity') return false;
    if (q) {
      const matchName = c.name.toLowerCase().includes(q);
      const matchCompany = c.company.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      const matchPhone = c.phone.toLowerCase().includes(q);
      const matchOwner = c.owner.toLowerCase().includes(q);
      if (!matchName && !matchCompany && !matchEmail && !matchPhone && !matchOwner) return false;
    }
    if (selectedDateFilter && selectedDateFilter !== 'All Time') {
      const matchesDate = isDateInFilter(c.createdDate || c.lastContacted, selectedDateFilter);
      if (!matchesDate) return false;
    }
    return true;
  });

  return (
    <div className="contacts-view">
      <div className="dashboard-banner">
        <div className="banner-text">
          <h2>Contacts Directory</h2>
          <p>Key client personnel directory, account linkages & engagement activity status</p>
        </div>
        <span className="counter-badge tasks" style={{ background: '#084482', color: '#FFFFFF', border: '1px solid #1A4F85', fontWeight: 600, zIndex: 2 }}>
          {filteredContacts.length} Contacts
        </span>
      </div>

      <div className="section-card">
        {/* Preset Views */}
        <div className="tab-header">
          {['All Contacts', 'By Account', 'By Owner', 'Recently Contacted', 'No Activity'].map(preset => (
            <div
              key={preset}
              className={`tab-item ${activePreset === preset ? 'active' : ''}`}
              onClick={() => setActivePreset(preset)}
            >
              {preset}
            </div>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="action-table">
            <thead>
              <tr>
                <th>Contact Name</th>
                <th>Company Account</th>
                <th>Designation</th>
                <th>Phone Number</th>
                <th>Email ID</th>
                <th>Location</th>
                <th>Owner</th>
                <th>Relationship Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((con) => (
                <tr key={con.id}>
                  <td style={{ fontWeight: 700, color: '#063669' }}>{con.name}</td>
                  <td>
                    <span
                      style={{ fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => onSelectAccount(con)}
                    >
                      {con.company}
                    </span>
                  </td>
                  <td>{con.designation}</td>
                  <td>{con.phone}</td>
                  <td>{con.email}</td>
                  <td>{con.location}</td>
                  <td>{con.owner}</td>
                  <td>
                    <span className={`status-chip ${con.relationshipStatus === 'No Activity' ? 'overdue' : 'new'}`}>
                      {con.relationshipStatus}
                    </span>
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
