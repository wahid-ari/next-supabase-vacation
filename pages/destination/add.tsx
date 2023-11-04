import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Check, ChevronsUpDown } from 'lucide-react';
import ReactSelect from 'react-select';
import { mutate } from 'swr';

import { useCategoriesData, useIslandsData, useProvincesData } from '@/libs/swr';
import { cn } from '@/libs/utils';
import useToast from '@/hooks/use-hot-toast';

import { Button } from '@/components/ui/Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/Command';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Text } from '@/components/ui/Text';
import { Textarea } from '@/components/ui/Textarea';

import Layout from '@/components/layout/Layout';
import Shimmer from '@/components/systems/Shimmer';
import Title from '@/components/systems/Title';

Destination.auth = true;

export default function Destination() {
  const router = useRouter();
  const { data: category, error: errorCategory } = useCategoriesData();
  const { data: province, error: errorProvince } = useProvincesData();
  const { data: island, error: errorIsland } = useIslandsData();
  const { updateToast, pushToast } = useToast();
  const [createItem, setCreateItem] = useState({
    name: '',
    location: '',
    image_url: '',
    header_image_url: '',
    video_url: '',
    description: '',
    content: '',
    province_id: undefined,
    island_id: undefined,
  });
  console.log(createItem);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [comboboxValue, setComboboxValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const [listOfCategory, setListOfCategory] = useState();

  // convert category data from db (id, name) to match with react-select requirement (value, label)
  useEffect(() => {
    if (category) {
      let listCategory = [];
      category?.forEach((item: any) => {
        listCategory.push({
          value: item.id,
          label: item.name,
        });
      });
      // @ts-ignore
      setListOfCategory(listCategory);
    }
  }, [category]);

  // if user selecting tags, set tags
  useEffect(() => {
    // @ts-ignore
    setCreateItem({ ...createItem, category: selectedCategory });
  }, [selectedCategory]);

  async function handleSave(e) {
    e.preventDefault();
    const toastId = pushToast({
      message: 'Creating book',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book`, createItem);
      if (res.status == 200) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book`);
        router.push('/book');
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    }
  }

  if (errorIsland || errorProvince || errorCategory) {
    return (
      <Layout title='Add Destination - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Create Destination - MyVacation' description='Create New Destination - MyVacation'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Create Destination</Title>
      </div>

      <form onSubmit={handleSave}>
        <div className='mb-4 gap-4 grid grid-cols-1 gap-x-8 md:grid-cols-2'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                type='text'
                name='name'
                value={createItem.name}
                onChange={(e: any) => setCreateItem((prev) => ({ ...prev, name: e.target.value }))}
                placeholder='Kuta Bali'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='image-url'>Image URL</Label>
              <Input
                id='image-url'
                type='text'
                name='image-url'
                value={createItem.image_url}
                onChange={(e) => setCreateItem((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder='https://images.unsplash.com/photo-1697299708650-e4d1ce150d38?auto=format&fit=crop&q=80&w=500'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='header-image-url'>Header Image URL</Label>
              <Input
                id='header-image-url'
                type='text'
                name='header-image-url'
                value={createItem.header_image_url}
                onChange={(e) => setCreateItem((prev) => ({ ...prev, header_image_url: e.target.value }))}
                placeholder='https://images.unsplash.com/photo-1697299708650-e4d1ce150d38?auto=format&fit=crop&q=80&w=500'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
                value={createItem.description}
                onChange={(e) => setCreateItem({ ...createItem, description: e.target.value })}
                placeholder='Destination Description'
                className='min-h-[120px]'
              />
            </div>
          </div>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='video-url'>Video URL</Label>
              <Input
                id='video-url'
                type='text'
                name='video-url'
                value={createItem.video_url}
                onChange={(e) => setCreateItem((prev) => ({ ...prev, video_url: e.target.value }))}
                placeholder='https://youtu.be/GfO-3Oir-qM'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='location'>Location</Label>
              <Input
                id='location'
                type='text'
                name='location'
                value={createItem.location}
                onChange={(e: any) => setCreateItem((prev) => ({ ...prev, location: e.target.value }))}
                placeholder='Kuta Bali'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='select-province'>Province</Label>
              {province ? (
                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      aria-label='combobox'
                      aria-expanded={openCombobox}
                      className='h-10 justify-between px-3 font-normal w-full'
                    >
                      {comboboxValue
                        ? province?.find((prov: any) => prov.slug === comboboxValue)?.name
                        : 'Select Province'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent noPortal className='w-64 p-0'>
                    <Command loop>
                      <CommandInput placeholder='Search Province' />
                      <CommandEmpty>No Province found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          <ScrollArea className='h-40'>
                            {province?.map((prov: any) => (
                              <CommandItem
                                key={prov.slug}
                                value={prov.slug}
                                onSelect={(currentValue) => {
                                  setComboboxValue(currentValue === comboboxValue ? '' : currentValue);
                                  const findProvinceId = province?.find((prov: any) => prov.slug === currentValue)?.id;
                                  setCreateItem((prev) => ({ ...prev, province_id: findProvinceId }));
                                  setOpenCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4 text-emerald-600',
                                    comboboxValue === prov.slug ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {prov.name}
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              ) : (
                <Shimmer className='h-10' />
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='select-island'>Island</Label>
              {island ? (
                <Select
                  value={createItem.island_id}
                  onValueChange={(e) => setCreateItem((prev) => ({ ...prev, island_id: Number(e) }))}
                >
                  <SelectTrigger id='select-island' aria-label='select-island'>
                    <SelectValue placeholder='Select Island' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <ScrollArea className='h-40'>
                        {island?.map((item: any) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Shimmer className='h-10' />
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
              {listOfCategory ? (
                <>
                  <ReactSelect
                    options={listOfCategory}
                    isMulti
                    noOptionsMessage={() => 'Not Found'}
                    value={selectedCategory}
                    // @ts-ignore
                    onChange={setSelectedCategory}
                    placeholder='Search and Select Category'
                    id='category'
                    name='category'
                    className='mb-4 rounded-md'
                    classNamePrefix='react-select'
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: `#0ea5e9`,
                        primary25: `#0ea5e9`,
                        primary50: `#0ea5e9`,
                        neutral40: `#EF4444`,
                      },
                    })}
                  />
                </>
              ) : (
                <Shimmer className='h-10' />
              )}
            </div>
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='content'>Content</Label>
          <Textarea
            id='content'
            name='content'
            value={createItem.content}
            onChange={(e) => setCreateItem({ ...createItem, content: e.target.value })}
            placeholder='Destination Content'
          />
        </div>

        <Button type='submit' variant='success' className='mt-4 w-full'>
          Save changes
        </Button>
      </form>
    </Layout>
  );
}
