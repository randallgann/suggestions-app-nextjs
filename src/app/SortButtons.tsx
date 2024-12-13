'use client';
import { Button } from './components/button';
import { useSort } from './hooks/useSort';


export default function SortButtons(){

  const { sortOption, setSortOption } = useSort();

  return (
    <div className="flex">
      <Button
        flexGrow={true}
        color={`${sortOption === 'new' ? 'lime' : 'light'}`}
        onClick={() => setSortOption('new')}
        className="mr-2"
      >
             New     
      </Button>      
      <Button
        flexGrow={true}
        color={`${sortOption === 'popular' ? 'lime' : 'light'}`}
        onClick={() => setSortOption('popular')}
      >
             Popular     
      </Button>
    </div>
  );
}