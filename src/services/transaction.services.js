import api from "./api";

export const transactionService = {
  async getAll() {
    const res = await api.get("/transactions?select=*");
    return res.data;
  },
  async create(payload){
    const res = await api.post("/transactions", payload)
    return res.data
  }
};
