import React from 'react';
import { Categories } from './components/categories'
import { Statuses } from './components/statuses';
import SuggestButton from './components/suggest-button';
import SortButtons from './SortButtons';
import { fetchSuggestions } from './api/fetchSuggestions';
import SortSuggestions from './SortSuggestions';
import { SortProvider } from './SortProvider';
import { FilterCategories } from './FilterCategories';
import { FilterStatuses } from './FilterStatuses';
import { fetchAdministrators } from './api/fetchAdministrators';


export default async function HomePage() {

  const initialSuggestions = await fetchSuggestions();
  const adminUsers = await fetchAdministrators();

  return (
    <>
    <SortProvider adminUsers={adminUsers}>
      <article className="page-bg prose lg:prose-xl mx-auto">
        <div className="mx-auto max-w-xl lg:max-w-7xl w-full">
        <h1 className="text-4xl text-center text-white font-mono font-bold underline decoration-wavy">TOPIC SUGGESTIONS</h1>
        <div className="flex justify-center mb-6 mt-6">
          <SuggestButton />
        </div>
        <div className="flex">
          <div className="suggestions-count md:w-1/3 text-white mt-5 px-8">
            <p>{initialSuggestions.length} Suggestions</p>
          </div>
          <div className="flex divide-x justify-center md:w-1/3 xl:w-2/5 px-2">
            <SortButtons />
            
          </div>
          <div className="hidden md:flex md:w-1/3 xl:w-2/5 px-2">
          <FilterCategories />
          <FilterStatuses />
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row">
          <div className="md:w-8/12 xl:w-9/12">
            <SortSuggestions initialSuggestions={initialSuggestions} />
          </div>
          <div className="md:w-4/12 xl:w-3/12">
            <Categories />
            <Statuses />
          </div>
        </div>
        </div>
      </article>
    </SortProvider>
    </>
  );
};

// Add this export to make the page dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0;