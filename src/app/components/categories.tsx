'use client';
import React from 'react';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from './dropdown';
import { CheckboxField, Checkbox } from './checkbox';
import { Label } from './fieldset';
import { useContext } from 'react';
import { SortContext } from '../context/SortContext';
import { categories } from '../constants/categories';
import { FilterCategories } from '../FilterCategories';

const Categories = () => {

  const sortContext = useContext(SortContext);
  if (!sortContext) {
    return null;
  }
  const { sortCategories, setCategories } = sortContext;
  const checkbox_categories = [...categories];
  const dropdown_categories = [...categories];
  checkbox_categories.unshift('All');
  dropdown_categories.unshift('All');

  const handleCheckboxChange = (category: string) => (checked: boolean) => {
    let newCategories;
    if (checked) {
      if (category === 'All') {
        newCategories = ['All'];
      } else {
        newCategories = [...sortCategories, category];
        if (newCategories.includes('All')) {
          newCategories = newCategories.filter(s => s !== 'All');
        }
      }
    } else {
      newCategories = sortCategories.filter(s => s !== category);
      if (newCategories.length === 0) {
        newCategories.push('All');
      }
    }

    setCategories(newCategories);
  };

  function handleCategoryClick(category: string): void {
    let newCategories;
    if (category === 'All') {
      newCategories = ['All'];
    } else {
      if (sortCategories.includes(category)) {
        newCategories = sortCategories.filter(item => item !== category);
      } else {
        newCategories = [...sortCategories, category];
      }
      if (newCategories.includes('All')) {
        newCategories = newCategories.filter(s => s !== 'All');
      }
    }

    setCategories(newCategories);
  }

  return (
    <div className="m-4 categories-bg rounded-lg p-4 categories">
      <div className='hidden md:block'>
      <span className="uppercase font-bold text-white text-lg">Category</span>
      {checkbox_categories.map((category, index) => (
        <div key={index} className="mt-4">
        <CheckboxField>
          <Checkbox 
            name={category} 
            onChange={handleCheckboxChange(category)}
            checked={sortCategories.includes(category)}
          />
          <p className='text-white'>{category}</p>
          {/* <Label className='text-white'>{category}</Label> */}
        </CheckboxField>
        </div>
      ))}
      </div>
      <div className='md:hidden flex space-x-4'>
        <Dropdown>
          <DropdownButton color="teal">
            Category
          </DropdownButton>
          <DropdownMenu>
            {dropdown_categories.map((category, index) => (
              <DropdownItem key={index} onClick={() => handleCategoryClick(category)}>
                {category}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <FilterCategories />
      </div>
    </div>
  );
};

export { Categories };