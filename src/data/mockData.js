// TechGy Internal CRM Mock Data Store
// Color System: Primary Deep Navy #063669 & Off-White #F9F9F9

export const INITIAL_OWNERS = [
  'All Owners',
  'Rajesh Sharma',
  'Priya Patel',
  'Amit Verma',
  'Ananya Rao',
  'Vikram Malhotra'
];

export const INITIAL_DATE_FILTERS = [
  'This Month',
  'This Quarter',
  'FY 2025-26',
  'All Time'
];

export const LEAD_SOURCES = [
  'Website',
  'Inbound Call',
  'Referral',
  'LinkedIn',
  'Campaign',
  'Partner'
];

export const REVENUE_DATA = {
  Monthly: {
    revenue: '₹14,25,000',
    quarterly: '₹48,50,000',
    fy: '₹1,82,00,000',
    trend: [
      { period: 'Week 1', revenue: 280000, target: 300000 },
      { period: 'Week 2', revenue: 350000, target: 320000 },
      { period: 'Week 3', revenue: 415000, target: 350000 },
      { period: 'Week 4', revenue: 380000, target: 360000 },
    ]
  },
  Quarterly: {
    revenue: '₹48,50,000',
    quarterly: '₹48,50,000',
    fy: '₹1,82,00,000',
    trend: [
      { period: 'Q1', revenue: 3900000, target: 4000000 },
      { period: 'Q2', revenue: 4400000, target: 4200000 },
      { period: 'Q3', revenue: 4850000, target: 4500000 },
      { period: 'Q4 (Est)', revenue: 5050000, target: 4800000 },
    ]
  },
  FY: {
    revenue: '₹1,82,00,000',
    quarterly: '₹48,50,000',
    fy: '₹1,82,00,000',
    trend: [
      { period: '2022-23', revenue: 11000000, target: 10000000 },
      { period: '2023-24', revenue: 14500000, target: 13000000 },
      { period: '2024-25', revenue: 16800000, target: 16000000 },
      { period: '2025-26', revenue: 18200000, target: 17500000 },
    ]
  }
};

export const SOURCE_MIX_DATA = [
  { name: 'Website', count: 48, percentage: 37.5, color: '#063669' },
  { name: 'Referral', count: 32, percentage: 25.0, color: '#1A4F85' },
  { name: 'LinkedIn', count: 24, percentage: 18.75, color: '#2F69A1' },
  { name: 'Inbound Call', count: 12, percentage: 9.38, color: '#4C83BD' },
  { name: 'Campaign', count: 8, percentage: 6.25, color: '#6E9ED9' },
  { name: 'Partner', count: 4, percentage: 3.12, color: '#95B8E6' }
];

export const INITIAL_ACCOUNTS = [
  {
    id: 'ACC-101',
    companyName: 'Tata Consultancy Tech Ltd',
    industry: 'Enterprise Software',
    companySize: '500-1000 employees',
    website: 'www.tatatech.co.in',
    location: 'Mumbai, MH',
    accountOwner: 'Rajesh Sharma',
    estimatedAccountValue: '₹1,80,00,000',
    leadsCount: 3,
    contactsCount: 4,
    oppsCount: 2,
    proposalsCount: 2
  },
  {
    id: 'ACC-102',
    companyName: 'Reliance Cloud Solutions',
    industry: 'Cloud Infrastructure',
    companySize: '1000+ employees',
    website: 'www.reliancecloud.in',
    location: 'Bengaluru, KA',
    accountOwner: 'Priya Patel',
    estimatedAccountValue: '₹3,20,00,000',
    leadsCount: 2,
    contactsCount: 3,
    oppsCount: 1,
    proposalsCount: 1
  },
  {
    id: 'ACC-103',
    companyName: 'Infosys Digital Systems',
    industry: 'Healthcare IT',
    companySize: '250-500 employees',
    website: 'www.infosysdigital.co.in',
    location: 'Hyderabad, TS',
    accountOwner: 'Amit Verma',
    estimatedAccountValue: '₹1,40,00,000',
    leadsCount: 4,
    contactsCount: 5,
    oppsCount: 2,
    proposalsCount: 1
  },
  {
    id: 'ACC-104',
    companyName: 'HDFC Fintech Dynamics',
    industry: 'Financial Services',
    companySize: '100-250 employees',
    website: 'www.hdfcfintech.in',
    location: 'Delhi NCR',
    accountOwner: 'Ananya Rao',
    estimatedAccountValue: '₹95,00,000',
    leadsCount: 2,
    contactsCount: 2,
    oppsCount: 1,
    proposalsCount: 1
  },
  {
    id: 'ACC-105',
    companyName: 'Mahindra Supply Chain Logistics',
    industry: 'Supply Chain',
    companySize: '50-100 employees',
    website: 'www.mahindralogistics.co.in',
    location: 'Pune, MH',
    accountOwner: 'Vikram Malhotra',
    estimatedAccountValue: '₹75,00,000',
    leadsCount: 1,
    contactsCount: 2,
    oppsCount: 1,
    proposalsCount: 0
  }
];

export const INITIAL_LEADS = [
  {
    id: 'LD-201',
    leadName: 'Aarav Sharma',
    phoneNumber: '+91 98765 43210',
    emailId: 'aarav.sharma@tatatech.co.in',
    company: 'Tata Consultancy Tech Ltd',
    designation: 'VP of Technology',
    leadSource: 'Website',
    status: 'Qualified',
    leadOwner: 'Rajesh Sharma',
    priority: 'High',
    createdDate: '2026-08-10',
    lastActivity: 'Call completed on Aug 28, discussed CRM migration',
    nextFollowup: '2026-09-01 15:30',
    dueToday: true,
    isOverdue: false,
    notes: 'Looking to transition from legacy CRM to unified solution by Q4. Budget approved.',
    nextAction: 'Schedule technical demo call with solution engineering team'
  },
  {
    id: 'LD-202',
    leadName: 'Ananya Patel',
    phoneNumber: '+91 98123 45678',
    emailId: 'ananya.patel@reliancecloud.in',
    company: 'Reliance Cloud Solutions',
    designation: 'Director of Procurement',
    leadSource: 'Referral',
    status: 'Discussion',
    leadOwner: 'Priya Patel',
    priority: 'High',
    createdDate: '2026-08-05',
    lastActivity: 'Proposal sent on Aug 25, pending executive review',
    nextFollowup: '2026-08-30 11:00', // Overdue
    dueToday: false,
    isOverdue: true,
    notes: 'Referred by executive board member. Requires custom SLA terms in proposal.',
    nextAction: 'Send revised commercial terms document and follow up on procurement timeline'
  },
  {
    id: 'LD-203',
    leadName: 'Rohan Verma',
    phoneNumber: '+91 97654 32109',
    emailId: 'rohan.verma@infosysdigital.co.in',
    company: 'Infosys Digital Systems',
    designation: 'Chief Technology Officer',
    leadSource: 'Inbound Call',
    status: 'New',
    leadOwner: 'Amit Verma',
    priority: 'Medium',
    createdDate: '2026-08-28',
    lastActivity: 'Inbound inquiry received regarding security compliance',
    nextFollowup: '2026-09-01 16:00',
    dueToday: true,
    isOverdue: false,
    notes: 'Interested in enterprise security module. Needs documentation on data encryption.',
    nextAction: 'Send security whitepaper and schedule discovery meeting'
  },
  {
    id: 'LD-204',
    leadName: 'Pooja Iyer',
    phoneNumber: '+91 96543 21098',
    emailId: 'pooja.iyer@hdfcfintech.in',
    company: 'HDFC Fintech Dynamics',
    designation: 'Head of Operations',
    leadSource: 'LinkedIn',
    status: 'Proposal',
    leadOwner: 'Ananya Rao',
    priority: 'High',
    createdDate: '2026-07-20',
    lastActivity: 'Demo completed on Aug 22, proposal presented',
    nextFollowup: '2026-08-29 14:00', // Overdue
    dueToday: false,
    isOverdue: true,
    notes: 'Proposal PR-404 sent for ₹95 Lakhs annual license. Needs review with CFO.',
    nextAction: 'Call CFO directly to negotiate final payment milestones'
  },
  {
    id: 'LD-205',
    leadName: 'Karan Mehta',
    phoneNumber: '+91 95432 10987',
    emailId: 'karan.mehta@mahindralogistics.co.in',
    company: 'Mahindra Supply Chain Logistics',
    designation: 'IT Director',
    leadSource: 'Campaign',
    status: 'Contacted',
    leadOwner: 'Vikram Malhotra',
    priority: 'Low',
    createdDate: '2026-08-15',
    lastActivity: 'Intro email sent on Aug 18, opened twice',
    nextFollowup: '2026-08-27 10:00', // Overdue
    dueToday: false,
    isOverdue: true,
    notes: 'Downloaded whitepaper from summer marketing campaign.',
    nextAction: 'Send follow-up email offering tailored solution overview'
  },
  {
    id: 'LD-206',
    leadName: 'Sneha Kulkarni',
    phoneNumber: '+91 94321 09876',
    emailId: 'sneha.k@tatatech.co.in',
    company: 'Tata Consultancy Tech Ltd',
    designation: 'Sales Operations Manager',
    leadSource: 'Website',
    status: 'Qualified',
    leadOwner: 'Rajesh Sharma',
    priority: 'Medium',
    createdDate: '2026-08-22',
    lastActivity: 'Discovery call held on Aug 26',
    nextFollowup: '2026-09-01 17:00',
    dueToday: true,
    isOverdue: false,
    notes: 'Evaluator for lead management workflow.',
    nextAction: 'Confirm scope for sales team seat count'
  },
  {
    id: 'LD-207',
    leadName: 'Aditya Joshi',
    phoneNumber: '+91 93210 98765',
    emailId: 'aditya.joshi@reliancecloud.in',
    company: 'Reliance Cloud Solutions',
    designation: 'VP of Product',
    leadSource: 'Partner',
    status: 'Negotiation',
    leadOwner: 'Priya Patel',
    priority: 'High',
    createdDate: '2026-08-01',
    lastActivity: 'Contract revision meeting on Aug 27',
    nextFollowup: '2026-08-28 15:00', // Overdue
    dueToday: false,
    isOverdue: true,
    notes: 'Negotiating multi-year discount structure.',
    nextAction: 'Send updated contract draft with approved 5% volume discount'
  }
];

export const INITIAL_OPPORTUNITIES = [
  {
    id: 'OPP-301',
    accountName: 'Tata Consultancy Tech Ltd',
    opportunityName: 'Tata Tech CRM Enterprise License Expansion',
    score: 85,
    visualLevel: 'High',
    estimatedValue: '₹1,80,00,000',
    probability: '80%',
    expectedClosureDate: '2026-09-30',
    currentStage: 'Proposal',
    owner: 'Rajesh Sharma'
  },
  {
    id: 'OPP-302',
    accountName: 'Reliance Cloud Solutions',
    opportunityName: 'Reliance Cloud Multi-Region Rollout',
    score: 92,
    visualLevel: 'High',
    estimatedValue: '₹3,20,00,000',
    probability: '90%',
    expectedClosureDate: '2026-09-15',
    currentStage: 'Negotiation',
    owner: 'Priya Patel'
  },
  {
    id: 'OPP-303',
    accountName: 'Infosys Digital Systems',
    opportunityName: 'Infosys Digital Secure Workspace',
    score: 65,
    visualLevel: 'Medium',
    estimatedValue: '₹1,40,00,000',
    probability: '60%',
    expectedClosureDate: '2026-10-15',
    currentStage: 'Discussion',
    owner: 'Amit Verma'
  },
  {
    id: 'OPP-304',
    accountName: 'HDFC Fintech Dynamics',
    opportunityName: 'HDFC Core Analytics Integration',
    score: 74,
    visualLevel: 'Medium',
    estimatedValue: '₹95,00,000',
    probability: '75%',
    expectedClosureDate: '2026-09-25',
    currentStage: 'Qualified',
    owner: 'Ananya Rao'
  },
  {
    id: 'OPP-305',
    accountName: 'Mahindra Supply Chain Logistics',
    opportunityName: 'Mahindra Supply Chain Portal',
    score: 40,
    visualLevel: 'Low',
    estimatedValue: '₹75,00,000',
    probability: '30%',
    expectedClosureDate: '2026-11-30',
    currentStage: 'New',
    owner: 'Vikram Malhotra'
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-501',
    type: 'Call',
    date: '2026-09-01 10:30 AM',
    duration: '25 mins',
    owner: 'Rajesh Sharma',
    company: 'Tata Consultancy Tech Ltd',
    lead: 'Aarav Sharma',
    outcome: 'Connected - Positive',
    notes: 'Reviewed technical requirements for API integrations. Aarav requested formal proposal update.',
    status: 'Completed',
    isOverdue: false
  },
  {
    id: 'ACT-502',
    type: 'Follow-up',
    date: '2026-08-30 11:00 AM',
    dueTime: '2026-08-30 11:00',
    owner: 'Priya Patel',
    company: 'Reliance Cloud Solutions',
    lead: 'Ananya Patel',
    priority: 'High',
    status: 'Pending',
    reminder: '15 mins before',
    notes: 'Follow up on procurement SLA terms document sent last Friday.',
    isOverdue: true
  },
  {
    id: 'ACT-503',
    type: 'Email',
    date: '2026-09-01 09:15 AM',
    subject: 'Security Whitepaper & Compliance Specs',
    owner: 'Amit Verma',
    company: 'Infosys Digital Systems',
    lead: 'Rohan Verma',
    summary: 'Sent complete security compliance certification documents and data encryption standards.',
    status: 'Sent',
    isOverdue: false
  },
  {
    id: 'ACT-504',
    type: 'SMS / WhatsApp',
    date: '2026-08-29 02:00 PM',
    owner: 'Ananya Rao',
    company: 'HDFC Fintech Dynamics',
    lead: 'Pooja Iyer',
    status: 'Delivered',
    shortPreview: 'Hi Pooja, let me know if you received the updated proposal PR-404 for CFO review.',
    isOverdue: true
  },
  {
    id: 'ACT-505',
    type: 'Meeting',
    date: '2026-09-01 02:00 PM',
    attendees: 'Priya Patel, Aditya Joshi, CFO Team',
    owner: 'Priya Patel',
    company: 'Reliance Cloud Solutions',
    lead: 'Aditya Joshi',
    meetingNotes: 'Review multi-year license volume discount terms and SLA guarantees.',
    nextAction: 'Issue finalized contract for digital signature',
    status: 'Scheduled',
    isOverdue: false
  },
  {
    id: 'ACT-506',
    type: 'Follow-up',
    date: '2026-08-27 10:00 AM',
    dueTime: '2026-08-27 10:00',
    owner: 'Vikram Malhotra',
    company: 'Mahindra Supply Chain Logistics',
    lead: 'Karan Mehta',
    priority: 'Low',
    status: 'Pending',
    reminder: '1 hour before',
    notes: 'Check if Karan reviewed whitepaper and wants a 15-min discovery chat.',
    isOverdue: true
  }
];

export const INITIAL_PROPOSALS = [
  {
    id: 'PR-401',
    proposalId: 'PR-2026-001',
    company: 'Tata Consultancy Tech Ltd',
    opportunity: 'Tata Tech CRM Enterprise License Expansion',
    proposalDate: '2026-08-20',
    proposalValue: '₹1,80,00,000',
    estimatedAccountWorth: '₹2,20,00,000',
    status: 'Negotiation',
    validityDate: '2026-09-30',
    owner: 'Rajesh Sharma',
    notes: 'Includes 100 user seats, custom API connectors, and 24/7 dedicated support SLA.'
  },
  {
    id: 'PR-402',
    proposalId: 'PR-2026-002',
    company: 'Reliance Cloud Solutions',
    opportunity: 'Reliance Cloud Multi-Region Rollout',
    proposalDate: '2026-08-15',
    proposalValue: '₹3,20,00,000',
    estimatedAccountWorth: '₹4,00,00,000',
    status: 'Sent',
    validityDate: '2026-09-15',
    owner: 'Priya Patel',
    notes: 'Enterprise multi-region cloud deployment package.'
  },
  {
    id: 'PR-403',
    proposalId: 'PR-2026-003',
    company: 'Infosys Digital Systems',
    opportunity: 'Infosys Digital Secure Workspace',
    proposalDate: '2026-08-25',
    proposalValue: '₹1,40,00,000',
    estimatedAccountWorth: '₹1,60,00,000',
    status: 'Viewed',
    validityDate: '2026-10-15',
    owner: 'Amit Verma',
    notes: 'Enterprise cloud instance with dedicated hardware isolation.'
  },
  {
    id: 'PR-404',
    proposalId: 'PR-2026-004',
    company: 'HDFC Fintech Dynamics',
    opportunity: 'HDFC Core Analytics Integration',
    proposalDate: '2026-08-22',
    proposalValue: '₹95,00,000',
    estimatedAccountWorth: '₹1,10,00,000',
    status: 'Draft',
    validityDate: '2026-09-25',
    owner: 'Ananya Rao',
    notes: 'Standard annual subscription + analytics add-on module.'
  }
];

export const INITIAL_CONTACTS = [
  {
    id: 'CON-601',
    name: 'Aarav Sharma',
    company: 'Tata Consultancy Tech Ltd',
    designation: 'VP of Technology',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@tatatech.co.in',
    location: 'Mumbai, MH',
    leadSource: 'Website',
    owner: 'Rajesh Sharma',
    relationshipStatus: 'Active Decision Maker',
    lastContacted: '2026-08-28'
  },
  {
    id: 'CON-602',
    name: 'Ananya Patel',
    company: 'Reliance Cloud Solutions',
    designation: 'Director of Procurement',
    phone: '+91 98123 45678',
    email: 'ananya.patel@reliancecloud.in',
    location: 'Bengaluru, KA',
    leadSource: 'Referral',
    owner: 'Priya Patel',
    relationshipStatus: 'Key Evaluator',
    lastContacted: '2026-08-25'
  },
  {
    id: 'CON-603',
    name: 'Rohan Verma',
    company: 'Infosys Digital Systems',
    designation: 'Chief Technology Officer',
    phone: '+91 97654 32109',
    email: 'rohan.verma@infosysdigital.co.in',
    location: 'Hyderabad, TS',
    leadSource: 'Inbound Call',
    owner: 'Amit Verma',
    relationshipStatus: 'Executive Sponsor',
    lastContacted: '2026-08-28'
  },
  {
    id: 'CON-604',
    name: 'Pooja Iyer',
    company: 'HDFC Fintech Dynamics',
    designation: 'Head of Operations',
    phone: '+91 96543 21098',
    email: 'pooja.iyer@hdfcfintech.in',
    location: 'Delhi NCR',
    leadSource: 'LinkedIn',
    owner: 'Ananya Rao',
    relationshipStatus: 'Operational Lead',
    lastContacted: '2026-08-22'
  },
  {
    id: 'CON-605',
    name: 'Karan Mehta',
    company: 'Mahindra Supply Chain Logistics',
    designation: 'IT Director',
    phone: '+91 95432 10987',
    email: 'karan.mehta@mahindralogistics.co.in',
    location: 'Pune, MH',
    leadSource: 'Campaign',
    owner: 'Vikram Malhotra',
    relationshipStatus: 'No Activity',
    lastContacted: 'None'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-1',
    title: 'Follow-up Overdue',
    message: 'Follow-up call with Vikram Malhotra (Tata Consultancy Tech Ltd) is 2 days overdue.',
    timestamp: '10 mins ago',
    category: 'Overdue',
    isRead: false,
    priority: 'High',
    targetModule: 'leads'
  },
  {
    id: 'NOTIF-2',
    title: 'Opportunity Won',
    message: 'Reliance Cloud Solutions accepted proposal #PR-902 (₹3.2 Cr) and moved to Won stage.',
    timestamp: '45 mins ago',
    category: 'Opportunity',
    isRead: false,
    priority: 'High',
    targetModule: 'opportunities'
  },
  {
    id: 'NOTIF-3',
    title: 'New Lead Assigned',
    message: 'Rajesh Sharma assigned a new lead: Infosys Enterprise Systems.',
    timestamp: '2 hours ago',
    category: 'Lead',
    isRead: false,
    priority: 'Normal',
    targetModule: 'leads'
  },
  {
    id: 'NOTIF-4',
    title: 'Activity Scheduled',
    message: 'Product demo meeting with Priya Patel scheduled for today at 3:30 PM.',
    timestamp: '3 hours ago',
    category: 'Activity',
    isRead: false,
    priority: 'Normal',
    targetModule: 'activities'
  },
  {
    id: 'NOTIF-5',
    title: 'Proposal Viewed',
    message: 'Mahindra Tech Solutions opened commercial proposal #PR-904.',
    timestamp: '5 hours ago',
    category: 'Proposal',
    isRead: false,
    priority: 'Normal',
    targetModule: 'proposals'
  },
  {
    id: 'NOTIF-6',
    title: 'New Contact Added',
    message: 'Siddharth Varma added as Key Decision Maker for Bharti Cloud Ltd.',
    timestamp: 'Yesterday',
    category: 'Contact',
    isRead: false,
    priority: 'Normal',
    targetModule: 'contacts'
  },
  {
    id: 'NOTIF-7',
    title: 'Inbound Web Inquiry',
    message: 'Aarav Mehta submitted a high-value inquiry from Website landing page.',
    timestamp: 'Yesterday',
    category: 'Lead',
    isRead: false,
    priority: 'Normal',
    targetModule: 'leads'
  }
];
