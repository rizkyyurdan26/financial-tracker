import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrencyStore = defineStore("currency", () => {
  const currency = ref("IDR");

  const format = (amount = 0) => {
    let locale = "id-ID";
    if (currency.value === "USD") locale = "en-US";
    if (currency.value === "EUR") locale = "de-DE";
    if (currency.value === "MYR") locale = "ms-MY";
    if (currency.value === "JPY") locale = "ja-JP";

    return amount.toLocaleString(locale, {
      style: "currency",
      currency: currency.value,
      minimumFractionDigits: 0,
    });
  };

  return { currency, format };
});
