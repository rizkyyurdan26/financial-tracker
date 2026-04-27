import api from "./api";

export const transactionService = {
  async getAll() {
    const res = await api.get("/transactions?select=*");
    return res.data;
  },
  async create(payload) {
    const res = await api.post("/transactions", payload);
    return res.data;
  },
  async delete(id) {
    const res = await api.delete(`/transactions?id=eq.${id}`);
    return res.data;
  },
  async edit(id, payload) {
    const res = await api.patch(`/transactions?id=eq.${id}`, payload, {
      headers: {
        Prefer: "return=representation",
      },
    });

    return res.data;
  },
};
