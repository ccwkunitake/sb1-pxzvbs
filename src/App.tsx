import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TrackingForm } from './components/TrackingForm';
import { TrackingList } from './components/TrackingList';
import { TrackingItem } from './types';
import { openYamatoTracking, loadTrackingItems, saveTrackingItems } from './utils/tracking';

function App() {
  const [trackingItems, setTrackingItems] = useState<TrackingItem[]>([]);
  const [newNumber, setNewNumber] = useState('');
  const [newMemo, setNewMemo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTrackingItems(loadTrackingItems());
  }, []);

  const validateTrackingNumber = (number: string) => {
    if (!number.trim()) {
      return '送り状番号を入力してください';
    }
    if (!/^\d{12}$/.test(number)) {
      return '送り状番号は12桁の数字を入力してください';
    }
    if (trackingItems.some(item => item.number === number)) {
      return 'この送り状番号は既に登録されています';
    }
    return '';
  };

  const addTrackingNumber = () => {
    const validationError = validateTrackingNumber(newNumber);
    if (validationError) {
      setError(validationError);
      return;
    }

    const newItems = [
      ...trackingItems,
      {
        id: crypto.randomUUID(),
        number: newNumber,
        memo: newMemo,
        date: new Date().toLocaleDateString('ja-JP')
      }
    ];

    setTrackingItems(newItems);
    saveTrackingItems(newItems);
    setNewNumber('');
    setNewMemo('');
    setError('');
  };

  const removeItem = (id: string) => {
    const newItems = trackingItems.filter(item => item.id !== id);
    setTrackingItems(newItems);
    saveTrackingItems(newItems);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <Header />
        <TrackingForm
          newNumber={newNumber}
          newMemo={newMemo}
          error={error}
          onNumberChange={setNewNumber}
          onMemoChange={setNewMemo}
          onSubmit={addTrackingNumber}
        />
        <TrackingList
          items={trackingItems}
          onTrackingClick={openYamatoTracking}
          onRemove={removeItem}
        />
      </div>
    </div>
  );
}

export default App;