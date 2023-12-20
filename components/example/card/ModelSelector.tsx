'use client';

import * as React from 'react';
import { PopoverProps } from '@radix-ui/react-popover';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/libs/utils';
import { useMutationObserver } from '@/hooks/use-mutation-observer';
import useWindowSize from '@/hooks/use-window-size';

import { Button } from '@/components/ui/Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/Command';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { Label } from '@/components/ui/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

const typesData = ['GPT-3', 'Codex'] as const;

type ModelType = (typeof typesData)[number];

interface Model {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: ModelType;
}

const modelsData: Model[] = [
  {
    id: 'c305f976-8e38-42b1-9fb7-d21b2e34f0da',
    name: 'text-davinci-003',
    description:
      'Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.',
    type: 'GPT-3',
  },
  {
    id: '464a47c3-7ab5-44d7-b669-f9cb5a9e8465',
    name: 'text-curie-001',
    description: 'Very capable, but faster and lower cost than Davinci.',
    type: 'GPT-3',
  },
  {
    id: 'b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb',
    name: 'code-davinci-002',
    description:
      'Most capable Codex model. Particularly good at translating natural language to code. In addition to completing code, also supports inserting completions within code.',
    type: 'Codex',
  },
  {
    id: 'bbd57291-4622-4a21-9eed-dd6bd786fdd1',
    name: 'code-cushman-001',
    description:
      'Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.',
    type: 'Codex',
  },
];

interface ModelSelectorProps extends PopoverProps {
  types?: readonly ModelType[];
  models?: Model[];
}

export function ModelSelector({ models = modelsData, types = typesData, ...props }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0]);
  const [peekedModel, setPeekedModel] = React.useState<Model>(models[0]);
  const { width } = useWindowSize();

  return (
    <div className='grid gap-2'>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor='model'>Model</Label>
        </HoverCardTrigger>
        <HoverCardContent align='start' className='w-[260px] text-sm' side={width < 1024 ? 'top' : 'left'}>
          The model which will generate the completion. Some models are suitable for natural language tasks, others
          specialize in code. Learn more.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            aria-label='Select a model'
            className='w-full justify-between'
          >
            {selectedModel ? selectedModel.name : 'Select a model...'}
            <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='end' className='w-[250px] p-0'>
          <HoverCard>
            <HoverCardContent side='left' align='start' forceMount className='hidden sm:block'>
              <div className='grid gap-2'>
                <h4 className='font-medium leading-none'>{peekedModel.name}</h4>
                <div className='text-sm text-neutral-600 dark:text-neutral-300'>{peekedModel.description}</div>
              </div>
            </HoverCardContent>
            <Command loop>
              <CommandList className='h-[var(--cmdk-list-height)] max-h-[400px]'>
                <CommandInput placeholder='Search Models...' />
                <CommandEmpty>No Models found.</CommandEmpty>
                <HoverCardTrigger />
                {types.map((type) => (
                  <CommandGroup key={type} heading={type}>
                    {models
                      .filter((model) => model.type === type)
                      .map((model) => (
                        <ModelItem
                          key={model.id}
                          model={model}
                          isSelected={selectedModel?.id === model.id}
                          onPeek={(model) => setPeekedModel(model)}
                          onSelect={() => {
                            setSelectedModel(model);
                            setOpen(false);
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface ModelItemProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: Model) => void;
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'aria-selected') {
          onPeek(model);
        }
      }
    }
  });

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className='aria-selected:text-primary-foreground aria-selected:bg-neutral-200'
    >
      {model.name}
      <CheckIcon className={cn('ml-auto size-4', isSelected ? 'text-emerald-600 opacity-100' : 'opacity-0')} />
    </CommandItem>
  );
}
