'use client';
import React, { useContext } from 'react';
import { Checkbox, CheckboxField } from './checkbox';
import { Label } from './fieldset';
import { SortContext } from '../context/SortContext';
import { statuses } from '../constants/statuses';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from './dropdown';
import { FilterStatuses } from '../FilterStatuses';

const Statuses = () => {

  const sortContext = useContext(SortContext);
  if (!sortContext) {
    // Handle the case where the context is not defined
    // This could be returning a fallback component, throwing an error, etc.
    return null;
  }
  const { sortStatuses, setStatuses } = sortContext;
  const checkbox_statuses = [...statuses];
  const dropdown_statuses = [...statuses];
  checkbox_statuses.unshift('All');
  dropdown_statuses.unshift('All');

  const handleCheckboxChange = (status: string) => (checked: boolean) => {
    let newStatuses;
    if (checked) {
      if (status === 'All') {
        newStatuses = ['All'];
      } else {
        newStatuses = [...sortStatuses, status];
        if (status !== 'All' && newStatuses.includes('All')) {
          newStatuses = newStatuses.filter(s => s !== 'All');
        }
      }
    } else {
      newStatuses = sortStatuses.filter(s => s !== status);
      if (newStatuses.length === 0) {
        newStatuses.push('All');
      }
    }

    setStatuses(newStatuses);
  };

  function handleStatusClick(status: string): void {
    let newStatuses;
    if (status === 'All') {
      newStatuses = ['All'];
    } else {
      if (sortStatuses.includes(status)) {
        newStatuses = sortStatuses.filter(item => item !== status);
      } else {
        newStatuses = [...sortStatuses, status];
      }
      if (newStatuses.includes('All')) {
        newStatuses = newStatuses.filter(s => s !== 'All');
      }
    }

    setStatuses(newStatuses);
  }

  return (
    <div className="m-4 statuses-bg rounded-lg p-4 categories">
      <div className='hidden md:block'>
      <span className="uppercase font-bold text-white">Status</span>
      {checkbox_statuses.map((status, index) => (
        <div key={index} className="mt-4">
          <CheckboxField>
          <Checkbox 
            name={status} 
            onChange={handleCheckboxChange(status)}
            checked={sortStatuses.includes(status)}
          />
          <p className="text-white">{status}</p>
          {/* <Label>{status}</Label> */}
        </CheckboxField>
        </div>
      ))}
      </div>
      <div className='md:hidden flex space-x-4'>
        <Dropdown>
          <DropdownButton color="teal">
            Status
          </DropdownButton>
          <DropdownMenu>
            {dropdown_statuses.map((status, index) => (
              <DropdownItem key={index} onClick={() => handleStatusClick(status)}>
                {status}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <FilterStatuses />
      </div>
    </div>
    
  );
};

export { Statuses };