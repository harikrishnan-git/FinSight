"use client";
import { useState } from "react";

export default function TransactionForm({ onSubmit }: any) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: "Food",
  });

  const categories = ["Food", "Rent", "Travel", "Other"];

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: any) => {
    e.preventDefault();
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
    });
    onSubmit();
    setForm({ amount: "", description: "", date: "", category: "Food" });
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        type="number"
        className="border p-2 w-full"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full"
        required
      />
      <input
        name="date"
        value={form.date}
        onChange={handleChange}
        type="date"
        className="border p-2 w-full"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Transaction
      </button>
    </form>
  );
}
