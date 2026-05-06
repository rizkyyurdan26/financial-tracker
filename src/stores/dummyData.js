// src/data/dummy.js

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

// Tanggal bulan lalu untuk simulasi persentase naik/turun
const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);

export const dummyData = [
  // --- DATA BULAN INI ---
  {
    id: "d1",
    type: "income",
    category: "Salary",
    amount: 15000000,
    description: "Gaji Utama",
    date: new Date(currentYear, currentMonth, 15).toISOString()
  },
  {
    id: "d2",
    type: "expense",
    category: "Food",
    amount: 2000000,
    description: "Makan bulanan",
    date: new Date(currentYear, currentMonth, 10).toISOString()
  },
  {
    id: "d3",
    type: "expense",
    category: "Rent",
    amount: 1200000,
    description: "Bayar Kost",
    date: new Date(currentYear, currentMonth, 5).toISOString()
  },

  // --- DATA BULAN LALU (Agar persentase dashboard tidak 0%) ---
  {
    id: "d4",
    type: "income",
    category: "Salary",
    amount: 12000000,
    description: "Gaji Bulan Lalu",
    date: lastMonthDate.toISOString()
  },
  {
    id: "d5",
    type: "expense",
    category: "Food",
    amount: 2500000,
    description: "Makan Bulan Lalu",
    date: lastMonthDate.toISOString()
  },
  {
    id: "d6",
    type: "income",
    category: "Bonus",
    amount: 2000000,
    description: "Bonus Project",
    date: lastMonthDate.toISOString()
  }
];