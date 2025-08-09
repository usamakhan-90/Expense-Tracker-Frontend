// AddIncomeForm.jsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function AddIncomeForm({ onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    onClose(); // Close the dialog after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Add Income</DialogTitle>
        <hr />
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-3">
          <Label htmlFor="amount">Income Source</Label>
          <Input id="source" name="source" type="text" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="amount">Amount</Label>
          <Input id="description" name="description" />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" />
        </div>
        {/* Add more fields as needed */}
      </div>
      <DialogFooter>
        <Button type="submit">Add Income</Button>
      </DialogFooter>
    </form>
  );
}

export default AddIncomeForm;