'use client';
import { useState } from 'react';
import { SortContext } from './context/SortContext';

interface SortProviderProps {
  children: React.ReactNode;
  adminUsers: string[]; // Adjust this type if necessary
}

export const SortProvider: React.FC<SortProviderProps> = ({ children, adminUsers }) => {

        const [sortOption, setSortOption] = useState('new');
        const [sortCategories, setCategories] = useState(['All']);
        const [sortStatuses, setStatuses] = useState(['All']);


    
        return (
            <SortContext.Provider value={{ sortOption, setSortOption, sortCategories, setCategories, sortStatuses, setStatuses, adminUsers }}>
                {children}
            </SortContext.Provider>
        );
    };
  