import { defineStore } from "pinia";
import { useTransactionStore } from "./transaction.store";
import { computed } from "vue";

export const useDashboardStore = defineStore("dahsboard", () => {
  const store = useTransactionStore();
  const data = computed(() => store.transactions);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastYear = lastMonthDate.getFullYear();

  // Current Data
  const currentData = computed(() => {
    return data.value.filter((d) => {
      const txDate = new Date(d.date);
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    });
  });

  const currIncome = computed(() => {
    return currentData.value
      .filter((d) => d.type.toLowerCase() === "income")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
  });

  const currExpense = computed(() => {
    return currentData.value
      .filter((d) => d.type.toLowerCase() === "expense")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
  });

  // Last Month Data
  const lastMonthData = computed(() => {
    return data.value.filter((d) => {
      const txDate = new Date(d.date);

      return (
        txDate.getMonth() === lastMonth && txDate.getFullYear() === lastYear
      );
    });
  });

  const lastIncome = computed(() => {
    return lastMonthData.value
      .filter((d) => d.type?.toLowerCase() === "income")
      .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  });

  const lastExpense = computed(() => {
    return lastMonthData.value
      .filter((d) => d.type?.toLowerCase() === "expense")
      .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  });

  // Counted
  const totalIncome = computed(() => {
    const currTotalIncome = currIncome.value;

    let percentIncome = 0;
    if (lastIncome.value === 0) {
      percentIncome = currIncome.value > 0 ? 100 : 0;
    } else {
      percentIncome =
        ((currIncome.value - lastIncome.value) / lastIncome.value) * 100;
      percentIncome = Number(percentIncome.toFixed(2));
    }

    return { income: currTotalIncome, percent: percentIncome };
  });

  const totalExpense = computed(() => {
    const currTotalExpense = currExpense.value;
    let percentExpense = 0;
    if (lastExpense.value === 0) {
      percentExpense = currExpense > 0 ? 100 : 0;
    } else {
      percentExpense =
        ((currExpense.value - lastExpense.value) / lastExpense.value) * 100;
      percentExpense = Number(percentExpense.toFixed(2));
    }

    return {
      expense: currTotalExpense,
      percent: percentExpense,
    };
  });

  const totalBalance = computed(() => {
    const allIncome = data.value
      .filter((d) => d.type.toLowerCase() === "income")
      .reduce((acc, curr) => acc + Number(curr.amount) || 0, 0);
    const allExpense = data.value
      .filter((d) => d.type.toLowerCase() === "expense")
      .reduce((acc, curr) => acc + Number(curr.amount) || 0, 0);

    const allBalance = allIncome - allExpense;

    return {
      balance: allBalance,
      allIncome: allIncome,
      allExpense: allExpense,
    };
  });

  const saving = computed(() => {
    const currSaving = currIncome.value - currExpense.value;

    const lastSaving = lastIncome.value - lastExpense.value;

    let totalSaving = 0;
    if (lastSaving === 0) {
      totalSaving = currSaving > 0 ? 100 : 0;
    } else {
      totalSaving = ((currSaving - lastSaving) / lastSaving) * 100;
      totalSaving = Number(totalSaving.toFixed(2));
    }

    return { saving: currSaving, percent: totalSaving };
  });

  const allData = computed(() => {
    return [
      {
        id: 1,
        text: "Total Balance",
        span: "(All Time)",
        icon: "ic:outline-account-balance-wallet",
        iconClass: "bg-cyan-100 text-cyan-600",
        amount: totalBalance.value.balance,
      },
      {
        id: 2,
        text: "Total Income",
        span: "(All Time)",
        icon: "ic:baseline-arrow-upward",
        iconClass: "bg-emerald-100 text-emerald-600",
        amount: totalBalance.value.allIncome,
      },
      {
        id: 3,
        text: "Total Expense",
        span: "(All time)",
        icon: "ic:baseline-arrow-downward", 
        iconClass: "bg-rose-100 text-rose-600",
        amount: totalBalance.value.allExpense,
      },
      {
        id: 4,
        text: "Income",
        span: "(Current Month)",
        icon: "ic:baseline-trending-up",
        iconClass: "bg-green-100 text-green-600",
        amount: totalIncome.value.income,
        percent: totalIncome.value.percent,
      },
      {
        id: 5,
        text: "Expenses",
        span: "(Current Month)",
        icon: "ic:baseline-trending-down",
        iconClass: "bg-red-100 text-red-600",
        amount: totalExpense.value.expense,
        percent: totalExpense.value.percent,
      },
      {
        id: 6,
        text: "Savings",
        span: "(Current Month)",
        icon: "material-symbols:account-balance-rounded",
        iconClass: "bg-blue-100 text-blue-600",
        amount: saving.value.saving,
        percent: saving.value.percent,
      },
    ];
  });

  return { allData, data };
});
