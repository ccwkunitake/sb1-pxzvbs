import React from 'react';
import { Package } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Package className="w-8 h-8 text-yellow-600" />
      <h1 className="text-2xl font-bold text-gray-800">ヤマト運輸荷物追跡</h1>
    </div>
  );
}