import { defineStore } from "pinia";
import { computed } from "vue";
import { useTransactionStore } from "./transaction.store";

export const useDashboardStore = defineStore("dashboard", () => {
  const transactionStore = useTransactionStore();

  // --- HELPER DATES ---
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);

  // Helper hitung total periodik
  const calculateTotal = (data, type, month, year, isCategory = false) => {
    return data
      .filter((t) => {
        const d = new Date(t.date);
        const matchDate = d.getMonth() === month && d.getFullYear() === year;
        const matchType = isCategory
          ? t.category?.toLowerCase() === type.toLowerCase()
          : t.type?.toLowerCase() === type.toLowerCase();
        return matchDate && matchType;
      })
      .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  const getPercent = (current, last) => {
    if (!last || last === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - last) / last) * 100);
  };

  const stats = computed(() => {
    const data = transactionStore.transactions;
    const lMonth = lastMonthDate.getMonth();
    const lYear = lastMonthDate.getFullYear();

    // Mapping data bulan ini vs bulan lalu
    const metrics = [
      { key: "balance", type: "income", typeEx: "expense" }, // Khusus balance nanti dihitung manual
      { key: "income", type: "income", isCat: false },
      { key: "expense", type: "expense", isCat: false },
      { key: "saving", type: "saving", isCat: true },
    ];

    const results = {};
    metrics.forEach((m) => {
      results[`${m.key}Cur`] = calculateTotal(
        data,
        m.type,
        currentMonth,
        currentYear,
        m.isCat,
      );
      results[`${m.key}Last`] = calculateTotal(
        data,
        m.type,
        lMonth,
        lYear,
        m.isCat,
      );
    });

    // Patch untuk expense (karena di DB kamu 'expense' pakai satuan)
    const expCur = calculateTotal(data, "expense", currentMonth, currentYear);
    const expLast = calculateTotal(data, "expense", lMonth, lYear);

    const balCur = results.incomeCur - expCur;
    const balLast = results.incomeLast - expLast;

    return [
      {
        id: 1,
        text: "Total Balance",
        amount: balCur,
        percent: getPercent(balCur, balLast),
        icon: "ic:outline-account-balance-wallet",
        iconClass: "bg-cyan-100 text-cyan-600",
      },
      {
        id: 2,
        text: "Income",
        amount: results.incomeCur,
        percent: getPercent(results.incomeCur, results.incomeLast),
        icon: "ic:baseline-trending-up",
        iconClass: "bg-green-100 text-green-600",
      },
      {
        id: 3,
        text: "Expenses",
        amount: expCur,
        percent: getPercent(expCur, expLast),
        icon: "ic:baseline-trending-down",
        iconClass: "bg-red-100 text-red-600",
      },
      {
        id: 4,
        text: "Savings",
        amount: results.savingCur,
        percent: getPercent(results.savingCur, results.savingLast),
        icon: "material-symbols:account-balance-rounded",
        iconClass: "bg-blue-100 text-blue-600",
      },
    ];
  });

  return { stats };
});
