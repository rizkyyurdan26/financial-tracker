// src/data/dummy.js
export const dummyData = [
  {
    id: 1,
    text: "Total Balance",
    current_month: 24563.00,
    last_month: 23950.00,
    icon: "ic:outline-account-balance-wallet",
    iconClass: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 2,
    text: "Income",
    current_month: 8350.00,
    last_month: 7435.00,
    icon: "ic:baseline-trending-up",
    iconClass: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    text: "Expenses",
    current_month: 3280.50,
    last_month: 3424.00, // Bulan lalu lebih besar, berarti pengeluaran bulan ini turun (bagus)
    icon: "ic:baseline-trending-down",
    iconClass: "bg-red-100 text-red-600",
  },
  {
    id: 4,
    text: "Savings",
    current_month: 5069.50,
    last_month: 4690.00,
    icon: "material-symbols:account-balance-rounded",
    iconClass: "bg-blue-100 text-blue-600",
  }
];