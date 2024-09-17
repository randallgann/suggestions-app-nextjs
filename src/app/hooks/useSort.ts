'use client';
import { useContext } from 'react';
import { SortContext } from '../context/SortContext';

// Custom hook to use the sort context
export function useSort() {
    const context = useContext(SortContext);
    if (context === undefined) {
      throw new Error('useSort must be used within a SortProvider');
    }
    return context;
  }