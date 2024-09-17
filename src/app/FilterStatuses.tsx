'use client';
import React from 'react';
import { useContext } from 'react';
import { SortContext } from './context/SortContext';
import { BadgeButton } from './components/badge';

const FilterStatuses = () => {

    const sortContext = useContext(SortContext);
  if (!sortContext) {
    // Handle the case where the context is not defined
    // This could be returning a fallback component, throwing an error, etc.
    return null;
  }
  const { sortStatuses } = sortContext;

  return (
    <div className="flex md:w-1/2 xl:w-1/2">
      <p className="text-white">Statuses:</p>
      {sortStatuses.map((status, index) => (
        <BadgeButton key={index}>{status}</BadgeButton>
      ))}
    </div>
  );
}

export { FilterStatuses };