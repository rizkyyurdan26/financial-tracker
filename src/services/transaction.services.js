import api from "./api";

export const transactionService = {
  async getAll() {
    const res = await api.get("/rest/v1/transactions?select=*");
    return res.data;
  },
  async create(payload) {
    const res = await api.post("/rest/v1/transactions", payload);
    return res.data;
  },
  async delete(id) {
    const res = await api.delete(`/rest/v1/transactions?id=eq.${id}`);
    return res.data;
  },
  async edit(id, payload) {
    const res = await api.patch(`/rest/v1/transactions?id=eq.${id}`, payload, {
      headers: {
        Prefer: "return=representation",
      },
    });

    return res.data;
  },
};
