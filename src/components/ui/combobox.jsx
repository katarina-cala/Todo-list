import {useState} from 'react';
import * as React from 'react';

import {Button} from '../../components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../../components/ui/command';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../../components/ui/popover';

const tags = [
    {
        value: 'work',
        label: 'Work',
    },
    {
        value: 'school',
        label: 'School',
    },
    {
        value: 'personal',
        label: 'Personal',
    },
    {
        value: 'errands',
        label: 'Errands',
    },
    {
        value: 'miscellaneous',
        label: 'Miscellaneous',
    },
];

export function ComboBoxResponsive({
    selectedTag,
    setSelectedTag,
    newTag,
    setNewTag,
    customTags,
    setCustomTags,
}) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="custom"
                    className="w-35 h-8 justify-start text-black"
                >
                    {selectedTag ? <>{selectedTag.label}</> : <>+ Add tag</>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[175px] p-0" align="start">
                <StatusList
                    setOpen={setOpen}
                    setSelectedTag={setSelectedTag}
                    newTag={newTag}
                    setNewTag={setNewTag}
                    customTags={customTags}
                    setCustomTags={setCustomTags}
                />
            </PopoverContent>
        </Popover>
    );
}

function StatusList({
    setOpen,
    setSelectedTag,
    newTag,
    setNewTag,
    customTags,
    setCustomTags,
}) {
    const addCustomTag = () => {
        if (newTag.trim() === '') return;

        const customTag = {
            value: newTag.toLowerCase().replace(/\s+/g, '_'),
            label: newTag,
        };

        setCustomTags([...customTags, customTag]);
        setNewTag('');
    };

    const handleSelectTag = (value) => {
        const tag = [...tags, ...customTags].find((tag) => tag.value === value);
        setSelectedTag(tag || null);
        setOpen(false);
    };

    return (
        <div>
            <Command>
                <CommandInput placeholder="Filter status..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        {[...tags, ...customTags].map((tag) => (
                            <CommandItem
                                key={tag.value}
                                value={tag.value}
                                onSelect={() => {
                                    handleSelectTag(tag.value);
                                    setOpen(false);
                                }}
                            >
                                {tag.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
            <div className="flex flex-col gap-2 p-3 m-0.5 w-25">
                <input
                    className="p-2 shadow-xl text-xs"
                    type="text"
                    placeholder="Add a custom tag..."
                    value={newTag}
                    onChange={(event) => setNewTag(event.target.value)}
                />
                <button
                    className="p-1 rounded text-xs bg-[#7371fc] text-white hover:text-[#cdc1ff]"
                    onClick={addCustomTag}
                >
                    Add Tag
                </button>
            </div>
        </div>
    );
}