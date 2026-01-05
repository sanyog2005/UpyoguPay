export const MOCK_TRANSACTIONS = [
  { id: 'TXN_1001', date: '2023-10-24', amount: '₹1,200.00', method: 'UPI', status: 'Success', customer: 'john@example.com' },
  { id: 'TXN_1002', date: '2023-10-24', amount: '₹4,500.00', method: 'Credit Card', status: 'Pending', customer: 'alice@corp.com' },
  { id: 'TXN_1003', date: '2023-10-23', amount: '₹850.00', method: 'Wallet', status: 'Failed', customer: 'bob@test.in' },
];

export const MOCK_MERCHANTS = [
  { id: 1, name: "TechRetail Pvt Ltd", email: "contact@techretail.com", status: "Pending", kycDoc: "Submitted" },
  { id: 2, name: "Fresh Foods", email: "billing@freshfoods.in", status: "Active", kycDoc: "Verified" },
];