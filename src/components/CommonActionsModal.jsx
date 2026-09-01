import React, { useState } from 'react';
import { X, Plus, Edit2, UserPlus, CheckSquare, FileText, Calendar, Trash2 } from 'lucide-react';
import { INITIAL_OWNERS, LEAD_SOURCES } from '../data/mockData';

export default function CommonActionsModal({ isOpen, onClose, onSave, initialType = 'createLead' }) {
  const [actionType, setActionType] = useState(initialType);
  const [formData, setFormData] = useState({
    leadName: '',
    company: '',
    phone: '',
    email: '',
    designation: '',
    leadSource: 'Website',
    owner: 'Rajesh Sharma',
    status: 'New',
    priority: 'Medium',
    notes: '',
    nextAction: '',
    dueDate: '2026-09-02'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(actionType, formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#063669' }}>
            Common Action Workspace
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#557396' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Action Type Selector */}
            <div className="form-group">
              <label className="form-label">Select Action</label>
              <select 
                className="form-select" 
                value={actionType} 
                onChange={(e) => setActionType(e.target.value)}
              >
                <option value="createLead">Create New Lead</option>
                <option value="assignOwner">Assign Owner</option>
                <option value="changeStatus">Change Status</option>
                <option value="addNote">Add Note / Context</option>
                <option value="scheduleFollowup">Schedule Follow-up</option>
              </select>
            </div>

            {/* Dynamic Form Fields */}
            {actionType === 'createLead' && (
              <>
                <div className="form-group">
                  <label className="form-label">Lead Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. Vikram Malhotra"
                    value={formData.leadName}
                    onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Company Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      placeholder="e.g. Tata Consultancy Tech Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Designation</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. General Manager"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email ID</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="name@company.co.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Lead Source</label>
                    <select 
                      className="form-select"
                      value={formData.leadSource}
                      onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                    >
                      {LEAD_SOURCES.map(src => <option key={src} value={src}>{src}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Assign Owner</label>
                    <select 
                      className="form-select"
                      value={formData.owner}
                      onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    >
                      {INITIAL_OWNERS.filter(o => o !== 'All Owners').map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}

            {actionType === 'assignOwner' && (
              <div className="form-group">
                <label className="form-label">Select New Owner</label>
                <select 
                  className="form-select"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                >
                  {INITIAL_OWNERS.filter(o => o !== 'All Owners').map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            )}

            {actionType === 'changeStatus' && (
              <div className="form-group">
                <label className="form-label">New Status</label>
                <select 
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Discussion">Discussion</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            )}

            {actionType === 'addNote' && (
              <div className="form-group">
                <label className="form-label">Note / Requirement Context</label>
                <textarea 
                  className="form-textarea" 
                  rows={4} 
                  placeholder="Enter context, conversation summary or requirement notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            )}

            {actionType === 'scheduleFollowup' && (
              <>
                <div className="form-group">
                  <label className="form-label">Follow-up Date & Time</label>
                  <input 
                    type="datetime-local" 
                    className="form-input"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Next Action Description</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Call to discuss proposal approval"
                    value={formData.nextAction}
                    onChange={(e) => setFormData({ ...formData, nextAction: e.target.value })}
                  />
                </div>
              </>
            )}

          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Confirm Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
