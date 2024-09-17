import { UserProfile, useUser } from '@auth0/nextjs-auth0/client';
import { ChevronUpIcon, EllipsisHorizontalIcon } from '@heroicons/react/16/solid';
import { Dropdown, DropdownButton, DropdownHeading, DropdownItem, DropdownMenu, DropdownSection } from './dropdown';
import { Suggestion } from '../constants/types';

interface SuggestionEntryProps {
  suggestion: Suggestion;
  adminUsers: string[];
}

const handleDelete = async (id: string) => {
  const response = await fetch('/api/deleteSuggestion', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });
  if (response.ok) {
    // handle successful response
    window.location.reload(); // Refresh the homepage
  } else {
    // handle error response
    console.error('Failed to delete suggestion');
  }
};

const handleUpVote = async (id: string, nickname: string) => {
  const response = await fetch('/api/updateUpVote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, nickname })
  });
  if (response.ok) {
    // handle successful response
    window.location.reload(); // Refresh the homepage
  } else {
    // handle error response
    console.error('Failed to update upvote');
  }
};

const handleUpdateStatus = async (id: string, status: string) => {
  const response = await fetch('/api/updateStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, status })
  });
  if (response.ok) {
    // handle successful response
    window.location.reload(); // Refresh the homepage
  } else {
    // handle error response
    console.error('Failed to update status');
  }
};


const SuggestionEntry: React.FC<SuggestionEntryProps> = ({ suggestion, adminUsers }) => {
  const { user } = useUser();

  const isAdmin = user?.email ? adminUsers.includes(user.email) : false;

  return (
    <div className="grid grid-cols-[auto,1fr,auto] sm:grid-cols-[142px,1fr,45px] rounded-xl my-5 px-4" id={suggestion.id}>
      <div
        className={`text-center border-r rounded-tl-lg rounded-bl-lg flex flex-col justify-center font-montserrat font-bold text-base  min-h-[100px] sm:min-h-[142px] cursor-pointer ${(suggestion.votes && suggestion.votes.includes(user?.nickname || '')) || user?.nickname === suggestion.author ? 'upvote-selected-bg' : 'upvote-deselected-bg'} text-white`}
        onClick={() => {
           if (user && user?.nickname !== suggestion.author) { 
            handleUpVote(suggestion.id, user?.nickname || '');
           }
          }}>
        <div className="uppercase">{suggestion.votes ? suggestion.votes.length.toString() : '0'}</div>
        <ChevronUpIcon className="text-6xl" />
        <div className="uppercase p-2 sm:p-2.5 pl-3 sm:pl-5">UpVotes</div>
      </div>
      <div className="flex flex-col justify-between p-2.5 pl-5 suggestions-entry-bg">
        <div className="flex justify-between items-center">
          <div className="flex-grow pt-2.5 text-white font-extrabold text-lg tracking-wide">{suggestion.title}</div>
            {isAdmin && (
            <div>
              <Dropdown>
                <DropdownButton aria-label="Actions">
                  <EllipsisHorizontalIcon />
                    <DropdownMenu>
                      <DropdownSection aria-label="Delete">
                        <DropdownItem onClick={() => handleDelete(suggestion.id)}>Delete</DropdownItem>
                      </DropdownSection>
                      <DropdownSection aria-label="Set Status">
                        <DropdownHeading>Set Status</DropdownHeading>
                        <DropdownItem onClick={() => handleUpdateStatus(suggestion.id, 'Dismissed')}>Dismissed</DropdownItem>
                        <DropdownItem onClick={() => handleUpdateStatus(suggestion.id, 'Talked About')}>Talked About</DropdownItem>
                        <DropdownItem onClick={() => handleUpdateStatus(suggestion.id, 'Upcoming')}>Upcoming</DropdownItem>
                        <DropdownItem onClick={() => handleUpdateStatus(suggestion.id, 'Considering')}>Considering</DropdownItem>
                        <DropdownItem onClick={() => handleUpdateStatus(suggestion.id, 'Reviewing')}>Reviewing</DropdownItem>
                      </DropdownSection>
                    </DropdownMenu>
                </DropdownButton>
              </Dropdown>
            </div>
            )}
        </div>
        <div className="flex">
          <div className="uppercase text-white font-montserrat font-bold text-sm flex-grow flex items-end">{suggestion.category}</div>
        </div>
      </div>
      <div className={`rounded-br-lg rounded-tr-lg flex pt-4 pl-1 pb-4 pr-4 suggestions-entry-status-bg ${suggestion.suggestionstatus}`}>
        <div className="uppercase text-white [writing-mode:vertical-lr] p-1.25 text-center font-bold text-lg tracking-wide">{suggestion.suggestionstatus}</div>
      </div>
    </div>
  );
};

export { SuggestionEntry };

{/* <div className="grid grid-cols-[142px,1fr,45px] rounded-xl my-5 px-4" id={suggestion.id}>
      <div
        className={`text-center border-r rounded-tl-lg rounded-bl-lg flex flex-col justify-center font-montserrat font-bold text-base min-h-[142px] cursor-pointer ${(suggestion.votes && suggestion.votes.includes(user?.nickname || '')) || user?.nickname === suggestion.author ? 'bg-teal-400' : 'bg-gray-500'} text-white`}
        onClick={() => {
           if (user && user?.nickname !== suggestion.author) { 
            handleUpVote(suggestion.id, user?.nickname || '');
           }
          }}>
        <div className="uppercase">{suggestion.votes ? suggestion.votes.length.toString() : '0'}</div>
        <ChevronUpIcon className="text-6xl" />
        <div className="uppercase">UpVotes</div>
      </div>
      <div className="flex flex-col justify-between p-2.5 pl-5 bg-sky-700">
        <div className="flex justify-between items-center">
          <div className="flex-grow pt-2.5 text-white font-extrabold text-lg tracking-wide">{suggestion.title}</div>
            {isAdmin && (
            <div>
              <Dropdown>
                <DropdownButton aria-label="Actions">
                  <EllipsisHorizontalIcon />
                    <DropdownMenu>
                      <DropdownSection aria-label="Delete">
                        <DropdownItem onClick={() => handleDelete(suggestion.id)}>Delete</DropdownItem>
                      </DropdownSection>
                      <DropdownSection aria-label="Set Status">
                        <DropdownHeading>Set Status</DropdownHeading>
                        <DropdownItem onClick={() => handleUpdateStatus(suggestion.id, 'Dismissed')}>Dismissed</DropdownItem>
                        <DropdownItem onClick={() => handleUpdateStatus(suggestion.id, 'Talked About')}>Talked About</DropdownItem>
                        <DropdownItem onClick={() => handleUpdateStatus(suggestion.id, 'Upcoming')}>Upcoming</DropdownItem>
                        <DropdownItem onClick={() => handleUpdateStatus(suggestion.id, 'Considering')}>Considering</DropdownItem>
                        <DropdownItem onClick={() => handleUpdateStatus(suggestion.id, 'Reviewing')}>Reviewing</DropdownItem>
                      </DropdownSection>
                    </DropdownMenu>
                </DropdownButton>
              </Dropdown>
            </div>
            )}
        </div>
        <div className="flex">
          <div className="uppercase text-white font-montserrat font-bold text-sm flex-grow flex items-end">{suggestion.category}</div>
        </div>
      </div>
      <div className={`rounded-br-lg rounded-tr-lg flex pt-4 pl-1 pb-4 pr-4 bg-yellow-500 ${suggestion.suggestionstatus}`}>
        <div className="uppercase text-white [writing-mode:vertical-lr] p-1.25 text-center font-bold text-lg tracking-wide">{suggestion.suggestionstatus}</div>
      </div>
    </div> */}