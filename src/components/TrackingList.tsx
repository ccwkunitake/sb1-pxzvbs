import React from 'react';
import { Trash2 } from 'lucide-react';
import { TrackingItem } from '../types';

interface TrackingListProps {
  items: TrackingItem[];
  onTrackingClick: (number: string) => void;
  onRemove: (id: string) => void;
}

export function TrackingList({ items, onTrackingClick, onRemove }: TrackingListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-8 text-center text-gray-500">
          送り状番号が登録されていません
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <button
                  onClick={() => onTrackingClick(item.number)}
                  className="text-lg font-medium text-yellow-600 hover:text-yellow-800"
                >
                  {item.number}
                </button>
                <p className="text-sm text-gray-600">{item.memo}</p>
                <p className="text-xs text-gray-400">登録日: {item.date}</p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="p-2 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}