'use client';
import { SuggestionEntry } from './components/suggestion-entry';
import { useSort } from './hooks/useSort';

const useSortedSuggestions = (initialSuggestions: any[], sortOption: string, sortCategories: string[], sortStatuses: string[]) => {
    
        const sortedSuggestions = () => {
            // Ensure we don't mutate the original suggestions array
            let sorted = [...initialSuggestions];

            // Filter based on categories and statuses if arrays are not empty
            if (!sortCategories.includes('All')){
                sorted = sorted.filter(suggestion => suggestion.category.some((category: string) => sortCategories.includes(category)));
            }
            if (!sortStatuses.includes('All')) {
                sorted = sorted.filter(suggestion => sortStatuses.includes(suggestion.suggestionstatus));
            }

            sorted.sort((a, b) => {
                if (sortOption === 'new') {
                    return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
                } else if (sortOption === 'popular') {
                    return (b.votes ? b.votes.length : 0) - (a.votes ? a.votes.length : 0);
                }
                return 0;
            });
            return sorted;
        }
        return sortedSuggestions;
    };

export default function SortSuggestions( { initialSuggestions }: { initialSuggestions: any[] }) {

    const { sortOption, sortCategories, sortStatuses, adminUsers } = useSort();

    const sortedSuggestions = useSortedSuggestions(initialSuggestions, sortOption, sortCategories, sortStatuses)();

    return (
        <>
        {sortedSuggestions.map((suggestion: any) => (
            <SuggestionEntry 
                key={suggestion.id} 
                suggestion={suggestion}
                adminUsers={adminUsers} 
            />
        ))}
        </>
    )
}