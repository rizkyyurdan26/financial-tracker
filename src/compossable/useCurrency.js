// src/composables/useCurrency.js
export const useCurrency = () => ({
  format: (v) =>
    v?.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }) || "Rp0",
});

export const calculatePercent = (current, last) => {
  if (!last) return 0;
  return (((current - last) / last) * 100).toFixed(1);
};
