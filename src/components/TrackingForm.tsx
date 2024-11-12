import React from 'react';
import { Plus } from 'lucide-react';

interface TrackingFormProps {
  newNumber: string;
  newMemo: string;
  error: string;
  onNumberChange: (value: string) => void;
  onMemoChange: (value: string) => void;
  onSubmit: () => void;
}

export function TrackingForm({
  newNumber,
  newMemo,
  error,
  onNumberChange,
  onMemoChange,
  onSubmit
}: TrackingFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            送り状番号（12桁）
          </label>
          <input
            type="text"
            value={newNumber}
            onChange={(e) => onNumberChange(e.target.value.replace(/[^\d]/g, ''))}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123456789012"
            maxLength={12}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            メモ
          </label>
          <input
            type="text"
            value={newMemo}
            onChange={(e) => onMemoChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="商品名など"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!error}
          >
            <Plus className="w-4 h-4" />
            <span>追加</span>
          </button>
        </div>
      </div>
    </form>
  );
}