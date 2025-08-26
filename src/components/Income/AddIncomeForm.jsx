import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddIncomeMutation } from "../../features/income/incomeApi";

function AddIncomeForm({ onClose }) {
  const [addIncome, { isLoading }] = useAddIncomeMutation();
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: new Date().toISOString().split('T')[0] // Default to today's date
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.source.trim()) newErrors.source = 'Source is required';
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount))) {  // Fixed NaN check
      newErrors.amount = 'Amount must be a number';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await addIncome({
        source: formData.source,
        amount: parseFloat(formData.amount),
        date: formData.date
      }).unwrap();
      
      onClose(); // Close the dialog after successful submission
      
      // Reset form
      setFormData({
        source: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
      });

    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Add Income</DialogTitle>
        <hr />
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-3">
          <Label htmlFor="source">Income Source</Label>
          <Input
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Salary, Freelance, etc."
          />
          {errors.source && <p className="text-red-500 text-sm">{errors.source}</p>}
        </div>
        
        <div className="grid gap-3">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
      </div>
      <DialogFooter>
        <Button 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Income'}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default AddIncomeForm;