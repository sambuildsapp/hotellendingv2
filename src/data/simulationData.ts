// Hotel Downtown - 180-key full-service hotel
export const hotelData = {
    name: 'Hotel Downtown',
    location: 'Downtown Financial District',
    keys: 180,
    type: 'Full-Service',
    segments: ['Rooms', 'Food & Beverage', 'Events', 'Rooftop Bar'],
    controller: {
        name: 'Sarah Chen',
        email: 'sarah.chen@hoteldowntown.com',
        title: 'Hotel Controller',
    },
};

// Loan agreement details
export const loanData = {
    loanId: 'LN-2024-0847',
    principal: 12500000,
    rate: 6.25,
    term: '10 Years',
    monthlyDebtService: 142000,
    covenants: {
        minDSCR: 1.25,
        maxLTV: 0.75,
    },
};

// January P&L (messy format as submitted by borrower)
export const januaryPL = {
    period: 'January 2026',
    lineItems: [
        { category: 'Room Revenue', amount: 485000, usaliCode: '4100', confidence: 99 },
        { category: 'F&B - Restaurant', amount: 125000, usaliCode: '4200', confidence: 98 },
        { category: 'F&B - Rooftop Bar', amount: 98000, usaliCode: '4200', confidence: 98 },
        { category: 'Banquet/Events', amount: 67000, usaliCode: '4300', confidence: 97 },
        { category: 'Spa Revenue', amount: 23000, usaliCode: '4400', confidence: 96 },
        { category: 'Other Income', amount: 12000, usaliCode: '4900', confidence: 94 },
        // Expenses
        { category: 'Rooms Payroll', amount: -89000, usaliCode: '5100', confidence: 98 },
        { category: 'Guest Transport - Van Fuel', amount: -3200, usaliCode: '5100', confidence: 97, note: 'Mapped to Rooms Expense' },
        { category: 'Housekeeping Supplies', amount: -18500, usaliCode: '5100', confidence: 99 },
        { category: 'F&B Cost of Sales', amount: -67000, usaliCode: '5200', confidence: 98 },
        { category: 'F&B Payroll', amount: -52000, usaliCode: '5200', confidence: 98 },
        { category: 'Party Supplies', amount: -4800, usaliCode: null, confidence: 82, needsReview: true, note: 'Flagged for human review' },
        { category: 'Uniform Cleaning', amount: -6200, usaliCode: '5100', confidence: 95, note: 'Mapped to Housekeeping' },
        { category: 'A&G Expenses', amount: -45000, usaliCode: '6000', confidence: 99 },
        { category: 'Marketing', amount: -28000, usaliCode: '6100', confidence: 98 },
        { category: 'Utilities', amount: -34000, usaliCode: '6200', confidence: 99 },
        { category: 'Property Tax', amount: -22000, usaliCode: '6300', confidence: 99 },
        { category: 'Insurance', amount: -18000, usaliCode: '6400', confidence: 99 },
        { category: 'Management Fee', amount: -24300, usaliCode: '6500', confidence: 99 },
    ],
    totalRevenue: 810000,
    totalExpenses: -412000,
    noi: 398000,
    grossOperatingProfit: 398000,
};

// Bank transaction data (for verification)
export const bankData = {
    period: 'January 2026',
    accountName: 'Hotel Downtown Operating Account',
    bankName: 'First National Bank',
    totalDeposits: 794200, // Within 2% of reported revenue
    depositBreakdown: [
        { date: '2026-01-05', amount: 98500, description: 'Credit Card Settlement - Rooms' },
        { date: '2026-01-08', amount: 145000, description: 'Wire - Group Block Payment' },
        { date: '2026-01-12', amount: 87300, description: 'Credit Card Settlement - F&B' },
        { date: '2026-01-15', amount: 112000, description: 'Credit Card Settlement - Rooms' },
        { date: '2026-01-19', amount: 67000, description: 'Wire - Corporate Event Deposit' },
        { date: '2026-01-22', amount: 95400, description: 'Credit Card Settlement - Mixed' },
        { date: '2026-01-26', amount: 102000, description: 'Credit Card Settlement - Rooms' },
        { date: '2026-01-31', amount: 87000, description: 'Month-end Settlement' },
    ],
    variance: {
        reported: 810000,
        bankDeposits: 794200,
        difference: 15800,
        percentVariance: 1.95,
        status: 'WITHIN_TOLERANCE',
        note: 'Variance due to timing of credit card settlements (2-3 day lag)',
    },
};

// STR (Smith Travel Research) market data
export const strData = {
    period: 'January 2026',
    property: {
        occupancy: 72.4,
        adr: 189.50,
        revpar: 137.20,
    },
    compSet: {
        occupancy: 68.2,
        adr: 175.00,
        revpar: 119.35,
    },
    index: {
        occupancy: 106.2, // Property / CompSet * 100
        adr: 108.3,
        revpar: 115.0,
    },
    marketTrend: 'Outperforming',
    note: 'Hotel Downtown outperforming comp set across all metrics',
};

// DSCR Calculation
export const dscrCalculation = {
    noi: 398000, // Monthly NOI from P&L
    annualizedNOI: 4776000, // Projected annual
    annualDebtService: 1704000, // 142,000 * 12
    dscr: 2.80, // Monthly DSCR (for display)
    actualDSCR: 1.40, // Based on Jan NOI vs Jan debt service
    covenantMin: 1.25,
    status: 'PASS',
    cushion: '12%', // Above minimum
};

// Portfolio summary for dashboard (10 hotels)
export const portfolioData = [
    { name: 'Hotel Downtown', status: 'verified', dscr: 1.40, riskScore: 'Low', alert: null },
    { name: 'Hotel Airport', status: 'review', dscr: 1.28, riskScore: 'Medium', alert: 'Classification review required' },
    { name: 'Hotel Beachside', status: 'alert', dscr: 1.52, riskScore: 'High', alert: 'Refund spike detected' },
    { name: 'Hotel Midtown', status: 'verified', dscr: 1.35, riskScore: 'Low', alert: null },
    { name: 'Hotel Riverside', status: 'verified', dscr: 1.48, riskScore: 'Low', alert: null },
    { name: 'Hotel Convention', status: 'verified', dscr: 1.31, riskScore: 'Low', alert: null },
    { name: 'Hotel Uptown', status: 'pending', dscr: null, riskScore: 'Pending', alert: 'Awaiting financials' },
    { name: 'Hotel Lakefront', status: 'verified', dscr: 1.44, riskScore: 'Low', alert: null },
    { name: 'Hotel Historic', status: 'verified', dscr: 1.22, riskScore: 'Medium', alert: 'DSCR below target' },
    { name: 'Hotel Suburban', status: 'verified', dscr: 1.38, riskScore: 'Low', alert: null },
];

// Dashboard statistics
export const dashboardStats = {
    totalProperties: 12,
    dataCollected: 10,
    lineItemsProcessed: 847,
    humanReviewRequired: 3,
    revenueVerified: 4200000,
    anomaliesDetected: 2,
    loansEvaluated: 10,
    covenantBreaches: 0,
};

// Email templates
export const emailTemplates = {
    initial: {
        to: 'sarah.chen@hoteldowntown.com',
        from: 'lending-intelligence@bank.com',
        subject: 'Action Required: January Financials – Hotel Downtown',
        body: `Hi Sarah,

I hope this message finds you well. As part of our monthly monitoring process, we kindly request the following documents for January 2026:

1. Monthly P&L Statement
2. STR Report (if available)

Please reply to this email with the attachments at your earliest convenience.

Thank you for your continued partnership.

Best regards,
Lending Intelligence System
First National Bank`,
        timestamp: '2026-02-05 09:00 AM',
    },
    followUp: {
        to: 'sarah.chen@hoteldowntown.com',
        from: 'lending-intelligence@bank.com',
        subject: 'Re: Action Required: January Financials – Hotel Downtown',
        body: `Hi Sarah,

Just checking this hit the top of your inbox. When you have a moment, please send over the January financials.

Thank you!

Best regards,
Lending Intelligence System`,
        timestamp: '2026-02-08 09:00 AM',
    },
    borrowerReply: {
        to: 'lending-intelligence@bank.com',
        from: 'sarah.chen@hoteldowntown.com',
        subject: 'Re: Action Required: January Financials – Hotel Downtown',
        body: `Hi,

Sorry for the delay - busy month! Please find attached:
- January P&L (our internal format, hope that's okay)
- STR report

Let me know if you need anything else.

Sarah Chen
Hotel Controller
Hotel Downtown`,
        attachments: ['January_2026_PL.xlsx', 'STR_Jan2026.pdf'],
        timestamp: '2026-02-09 02:34 PM',
    },
    thankYou: {
        to: 'sarah.chen@hoteldowntown.com',
        from: 'lending-intelligence@bank.com',
        subject: 'Re: Action Required: January Financials – Hotel Downtown',
        body: `Hi Sarah,

Thank you for sending the January financials. We've received both attachments and will process them shortly.

Best regards,
Lending Intelligence System`,
        timestamp: '2026-02-09 02:35 PM',
    },
};

// MCP Tool call examples
export const mcpCalls = {
    sendEmail: {
        tool: 'send_email',
        request: {
            to: 'sarah.chen@hoteldowntown.com',
            subject: 'Action Required: January Financials – Hotel Downtown',
            body: '...',
            attachments: [],
        },
        response: {
            status: 'sent',
            messageId: 'msg_a8f3b2c1',
            timestamp: '2026-02-05T09:00:00Z',
        },
    },
    getBankTransactions: {
        tool: 'get_bank_transactions',
        request: {
            accountId: 'acct_hotel_downtown_001',
            startDate: '2026-01-01',
            endDate: '2026-01-31',
        },
        response: {
            status: 'success',
            totalDeposits: 794200,
            transactionCount: 8,
            data: '...',
        },
    },
    getStrData: {
        tool: 'get_str_data',
        request: {
            propertyId: 'str_hd_180',
            period: '2026-01',
            includeCompSet: true,
        },
        response: {
            status: 'success',
            occupancy: 72.4,
            adr: 189.50,
            revpar: 137.20,
            compSetData: '...',
        },
    },
    readLoanAgreement: {
        tool: 'read_loan_agreement',
        request: {
            loanId: 'LN-2024-0847',
            query: 'minimum DSCR covenant requirement',
        },
        response: {
            status: 'success',
            excerpt: 'Section 7.2(a): Borrower shall maintain a minimum Debt Service Coverage Ratio of not less than 1.25x...',
            pageReference: 'Page 34, Section 7.2',
        },
    },
};

// Scene metadata
export const sceneMetadata = [
    { id: 1, title: 'The Trigger', subtitle: 'Collection Agent Activates', day: 'Day 1' },
    { id: 2, title: 'The Chase', subtitle: 'Follow-up & Response', day: 'Day 3-4' },
    { id: 3, title: 'The Brain', subtitle: 'Standardization Agent', day: 'Day 4' },
    { id: 4, title: 'The Auditor', subtitle: 'Verification Agent', day: 'Day 4' },
    { id: 5, title: 'The Watchdog', subtitle: 'Compliance Agent', day: 'Day 4' },
    { id: 6, title: 'The Dashboard', subtitle: 'Credit Officer View', day: 'Day 5' },
    { id: 7, title: 'The Contrast', subtitle: 'What This Replaced', day: '' },
    { id: 8, title: 'Thank You', subtitle: 'About the Creator', day: '' },
];

// Contrast data for final scene
export const contrastData = {
    before: [
        { metric: 'Time to Process', value: '3 weeks', icon: '⏰' },
        { metric: 'Manual Data Entry', value: 'Hours per property', icon: '⌨️' },
        { metric: 'Verification', value: 'None until audit', icon: '❌' },
        { metric: 'Anomaly Detection', value: 'After the fact', icon: '🔍' },
        { metric: 'Standardization', value: 'Inconsistent', icon: '📊' },
        { metric: 'Human Effort', value: '40+ hours/month', icon: '😓' },
    ],
    after: [
        { metric: 'Time to Process', value: '< 24 Hours', icon: '⚡' },
        { metric: 'Manual Data Entry', value: 'Zero', icon: '🤖' },
        { metric: 'Verification', value: 'Continuous', icon: '✅' },
        { metric: 'Anomaly Detection', value: 'Real-time', icon: '🚨' },
        { metric: 'Standardization', value: 'Automatic USALI', icon: '📋' },
        { metric: 'Human Effort', value: 'Focused on exceptions', icon: '🎯' },
    ],
};
