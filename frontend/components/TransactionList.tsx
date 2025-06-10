"use client";
import { useEffect, useState } from "react";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  const deleteTransaction = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-2 mt-4">
      {transactions.map((t: any) => (
        <div key={t.id} className="border p-4 rounded flex justify-between">
          <div>
            <div className="font-bold">{t.description}</div>
            <div>
              ₹{t.amount} on {new Date(t.date).toLocaleDateString()} [
              {t.category}]
            </div>
          </div>
          <button
            onClick={() => deleteTransaction(t.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
