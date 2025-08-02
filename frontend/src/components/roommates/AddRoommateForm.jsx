import React, { useState } from "react";
import { toast } from "react-toastify";

const AddRoommateForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: "", responsibility: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Roommate name is required");
      return;
    }

    if (typeof onAdd === "function") {
      onAdd({
        id: Date.now(),
        name: form.name.trim(),
        responsibility: form.responsibility.trim(),
      });
      toast.success("Roommate added!");
      setForm({ name: "", responsibility: "" });
    } else {
      toast.error("Add function not provided");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
      <input
        type="text"
        placeholder="Enter roommate name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        placeholder="Responsibility (optional)"
        value={form.responsibility}
        onChange={(e) => setForm({ ...form, responsibility: e.target.value })}
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Add
      </button>
    </form>
  );
};

export default AddRoommateForm;
