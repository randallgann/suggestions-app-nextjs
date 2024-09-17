'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from './button';
import { PlusIcon } from '@heroicons/react/16/solid'
import { Dialog, DialogActions, DialogBody, DialogTitle } from './dialog';
import { useState } from 'react'
import { 
    Field as HeadlessField,  
    Fieldset as HeadlessFieldset,
    Label as HeadlessLabel,
    RadioGroup as HeadlessRadioGroup,
    Legend as HeadlessLegend } from '@headlessui/react';
import { FieldGroup } from './fieldset';
import { Input } from './input';
import { Radio } from './radio';
import { categories } from '../constants/categories';


export default function SuggestButton() {
    const { user, isLoading } = useUser();
    const [title, setTitle] = useState('');
    let [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Movies');

    if (isLoading) return <div>Loading...</div>;

    const handleClick = () => {
        if (user) {
            setIsOpen(true);
        } else {
            window.location.href = '/api/auth/login';
        }
    };

    const handleSubmit = async () => {
        const suggestion = { title, author: user?.nickname, votes: [], category: [selectedCategory], suggestionstatus: 'Reviewing' }; // create a suggestion object
        console.log(user);
        console.log(user?.nickname);
        const response = await fetch('/api/addSuggestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(suggestion)
        });
        if (response.ok) {
            // handle successful response
            setIsOpen(false);
            window.location.reload();
        } else {
            // handle error response
            console.error('Failed to add suggestion');
        }
      };

    return (
    <>
        <Button className="h-12 rounded-lg font-bold px-5" color="teal" onClick={handleClick}>
            <PlusIcon />
            SUGGEST
        </Button>
        <Dialog open={isOpen} onClose={setIsOpen}>
            <DialogTitle>Suggest A Topic</DialogTitle>
            <DialogBody>
                <HeadlessFieldset>
                    <FieldGroup>
                        <HeadlessField>
                            <HeadlessLabel className="dark:text-white">Topic</HeadlessLabel>
                            <Input name="title" value={title} onChange={e => setTitle(e.target.value)}/>
                        </HeadlessField>
                        <HeadlessLegend className="text-base/6 font-medium sm:text-sm/6 dark:text-white">
                            Choose a category:
                        </HeadlessLegend>
                        <HeadlessRadioGroup name="category" defaultValue={'Movies'} className="mt-4 flex gap-6 sm:gap-8 flex-wrap" onChange={setSelectedCategory}>
                            {categories.map((category) => (
                                <HeadlessField key={category} className="flex items-center gap-2">
                                    <Radio value={category} />
                                    <HeadlessLabel className="select-none text-base/6 sm:text-sm/6 dark:text-white">{category}</HeadlessLabel>
                                </HeadlessField>
                            ))}
                        </HeadlessRadioGroup>
                    </FieldGroup>
                </HeadlessFieldset>
            </DialogBody>
            <DialogActions>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    </>
    );
}