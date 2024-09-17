'use client';
import React from 'react';
import { useContext } from 'react';
import { SortContext } from './context/SortContext';
import { BadgeButton } from './components/badge';

const FilterCategories = () => {

    const sortContext = useContext(SortContext);
  if (!sortContext) {
    // Handle the case where the context is not defined
    // This could be returning a fallback component, throwing an error, etc.
    return null;
  }
  const { sortCategories } = sortContext;

  return (
    <><div className="flex md:w-1/2 xl:w-1/2">
      <p className="text-white">Categories:</p>
      {sortCategories.map((category, index) => (
        <BadgeButton color="zinc" key={index}>{category}</BadgeButton>
      ))}
    </div></>
  );
}

export { FilterCategories };