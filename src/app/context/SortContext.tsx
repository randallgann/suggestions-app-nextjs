'use client';
import { createContext } from 'react';

interface SortContextType {
  sortOption: string;
  setSortOption: (sortOption: string) => void;
  sortCategories: string[];
  setCategories: (categories: string[]) => void;
  sortStatuses: string[];
  setStatuses: (statuses: string[]) => void;
  adminUsers: string[];
}

export const SortContext = createContext<SortContextType | undefined>(undefined);
