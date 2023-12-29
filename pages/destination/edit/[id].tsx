import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Check, ChevronsUpDown } from 'lucide-react';
import ReactSelect from 'react-select';
import { mutate } from 'swr';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { useCategoriesData, useDestinationData, useIslandsData, useProvincesData } from '@/libs/swr';
import { cn } from '@/libs/utils';
import useToast from '@/hooks/use-hot-toast';

import { Button } from '@/components/ui/Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/Command';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

import Layout from '@/components/layout/Layout';
import Shimmer from '@/components/systems/Shimmer';
import Tabs from '@/components/systems/Tabs';
import Title from '@/components/systems/Title';

// Destination.auth = true;

export default function Destination() {
  const router = useRouter();
  const id = router.query?.id as string;
  const { data, error } = useDestinationData(id);
  const { data: category, error: errorCategory } = useCategoriesData();
  const { data: province, error: errorProvince } = useProvincesData();
  const { data: island, error: errorIsland } = useIslandsData();
  const { updateToast, pushToast, dismissToast } = useToast();
  const [editItem, setEditItem] = useState({
    name: '',
    location: '',
    image_url: '',
    header_image_url: '',
    video_url: '',
    description: ``,
    content: ``,
    province_id: undefined,
    island_id: undefined,
  });
  const [marker, setMarker] = useState([-2.3723687086440504, 113.11523437500001]);
  const [dataReady, setDataReady] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [comboboxValue, setComboboxValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const [listOfCategory, setListOfCategory] = useState();

  useEffect(() => {
    if (data) {
      setEditItem({
        name: data?.name,
        location: data?.location,
        image_url: data?.image_url,
        header_image_url: data?.header_image_url,
        video_url: data?.video_url,
        description: data?.description,
        content: data?.content,
        province_id: data?.vacation_province?.id,
        island_id: data?.vacation_island?.id,
      });
      if (data?.latlng != null) setMarker(data?.latlng);
      setComboboxValue(data?.vacation_province?.slug);
      setDataReady(true);
    }
  }, [data]);

  // convert category data from db (id, name) to match with react-select requirement (value, label)
  // set current destination category
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
    // list current destination category
    if (data && category) {
      let destinationCurrentCategory = [];
      for (const destinationCategory of data?.category_array) {
        for (const item of category) {
          if (item.id == destinationCategory.id) {
            destinationCurrentCategory.push({
              value: item.id,
              label: item.name,
            });
          }
        }
      }
      // @ts-ignore
      setSelectedCategory(destinationCurrentCategory);
    }
  }, [data, category]);

  // if user selecting category, set category to editItem
  useEffect(() => {
    // FIX error use if here to fix data missing when reopening edit page
    if (selectedCategory) {
      // @ts-ignore
      setEditItem({ ...editItem, category: selectedCategory });
    }
  }, [selectedCategory]);

  async function handleEdit(e: any) {
    e.preventDefault();
    const toastId = pushToast({
      message: 'Updating destination',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/destination`, {
        id: id,
        ...editItem,
        latlng: marker,
      });
      if (res.status == 201) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/destination`);
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/destination?id=${id}`);
        router.push('/destination');
      }
    } catch (error) {
      console.error(error);
      if (Array.isArray(error?.response?.data?.message)) {
        const errors = [...error?.response?.data?.message].reverse();
        // show all error
        dismissToast();
        errors.forEach((item: any) => {
          pushToast({ message: item?.message, isError: true });
        });
        // only show one error
        // errors.map((item: any) => {
        //   updateToast({ toastId, message: item?.message, isError: true });
        // })
      } else {
        updateToast({ toastId, message: error?.response?.data?.message, isError: true });
      }
    }
  }

  const ReactLeaflet = useMemo(
    () =>
      dynamic(() => import('@/components/custom/Map'), {
        ssr: false,
        loading: () => (
          <Shimmer>
            <div className='h-80 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>
        ),
      }),
    // FIX error use depedency here to fix react leaflet maps not center
    [dataReady],
  );

  const ReactQuill = useMemo(
    () =>
      dynamic(
        () => {
          return import('react-quill');
        },
        {
          ssr: false,
          loading: () => (
            <Shimmer>
              <div className='h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='mt-4 h-40 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
          ),
        },
      ),
    // FIX error use depedency here to fix data missing when reopening edit page
    [dataReady],
  );

  // TODO Docs https://github.com/quilljs/quill/issues/2044#issuecomment-603630374
  // TODO Docs https://stackoverflow.com/questions/59602182/quill-add-image-url-instead-of-uploading-it
  function imageHandler() {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
    tooltip.save = function () {
      const range = this.quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        this.quill.insertEmbed(range.index, 'image', value, 'user');
      }
    };
    tooltip.hide = function () {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
      tooltip.hide();
    };
    tooltip.edit('image');
    tooltip.textbox.placeholder = 'Image URL';
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
          [{ script: 'sub' }, { script: 'super' }],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  if (error || errorIsland || errorProvince || errorCategory) {
    return (
      <Layout title='Edit Destination - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`Edit ${data?.name} - MyVacation`} description={`Edit ${data?.name} - MyVacation`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Edit {data?.name}</Title>
      </div>

      {data ? (
        <form onSubmit={handleEdit}>
          <div className='mb-4 grid grid-cols-1 gap-4 gap-x-8 md:grid-cols-2'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  type='text'
                  name='name'
                  value={editItem?.name}
                  onChange={(e: any) => setEditItem((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder='Destination Name'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='image_url'>Image URL</Label>
                <Input
                  id='image_url'
                  type='text'
                  name='image_url'
                  value={editItem?.image_url}
                  onChange={(e) => setEditItem((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder='Image URL'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='header_image_url'>Header Image URL</Label>
                <Input
                  id='header_image_url'
                  type='text'
                  name='header_image_url'
                  value={editItem?.header_image_url}
                  onChange={(e) => setEditItem((prev) => ({ ...prev, header_image_url: e.target.value }))}
                  placeholder='Header Image URL'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  name='description'
                  value={editItem?.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  placeholder='Destination Description'
                  className='min-h-[120px]'
                />
              </div>
            </div>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='video_url'>Video URL</Label>
                <Input
                  id='video_url'
                  type='text'
                  name='video_url'
                  value={editItem?.video_url}
                  onChange={(e) => setEditItem((prev) => ({ ...prev, video_url: e.target.value }))}
                  placeholder='Video URL'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  type='text'
                  name='location'
                  value={editItem?.location}
                  onChange={(e: any) => setEditItem((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder='Location'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='select_province'>Province</Label>
                {province ? (
                  <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-label='combobox'
                        aria-expanded={openCombobox}
                        className='h-10 w-full justify-between px-3 font-normal'
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
                                    const findProvinceId = province?.find((prov: any) => prov.slug === currentValue)
                                      ?.id;
                                    setEditItem((prev) => ({ ...prev, province_id: findProvinceId }));
                                    setOpenCombobox(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4 text-emerald-600',
                                      comboboxValue === prov.slug ? 'opacity-100' : 'opacity-0',
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
                <Label htmlFor='select_island'>Island</Label>
                {island ? (
                  <Select
                    // FIX this Select component, , Type 'number' is not assignable to type 'string'.
                    // @ts-ignore
                    value={editItem?.island_id}
                    onValueChange={(e) => setEditItem((prev) => ({ ...prev, island_id: Number(e) }))}
                  >
                    <SelectTrigger id='select_island' aria-label='select island'>
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
          <div>
            <Label htmlFor='content'>Content</Label>
            <Tabs items={['Editor', 'Preview']}>
              <Tabs.panel>
                <ReactQuill
                  id='content'
                  theme='snow'
                  placeholder='Destination Content'
                  onChange={(e) => setEditItem({ ...editItem, content: e })}
                  modules={modules}
                  value={editItem?.content}
                />
              </Tabs.panel>
              <Tabs.panel>
                {editItem?.content != '' && editItem?.content != '<p><br></p>' && (
                  <div
                    className={cn(
                      'ql-editor !prose !max-w-none !p-0 dark:!prose-invert prose-video:!w-96',
                      'prose-img:mx-auto prose-img:h-64 prose-img:rounded prose-img:object-center',
                      'prose-img:w-full prose-img:!max-w-2xl prose-img:sm:h-72 prose-img:md:h-96',
                      '!prose-blue prose-a:!font-normal prose-blockquote:!my-3',
                    )}
                    dangerouslySetInnerHTML={{ __html: editItem?.content }}
                  />
                )}
              </Tabs.panel>
            </Tabs>
          </div>
          <div className='mt-2 space-y-2'>
            <Label htmlFor='content'>Location</Label>
            <ReactLeaflet name={editItem.name} marker={marker} setMarker={setMarker} enableEdit enableSearch />
          </div>

          <Button type='submit' variant='success' className='mt-4 w-full'>
            Save changes
          </Button>
        </form>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
            <div>
              {[...Array(3).keys()].map((_, i) => (
                <Shimmer key={i} className='mb-4 p-2'>
                  <div className='mb-2 h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                </Shimmer>
              ))}

              <Shimmer className='mb-4 p-2'>
                <div className='mb-2 h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-[106px] rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              </Shimmer>
            </div>
            <div>
              {[...Array(5).keys()].map((_, i) => (
                <Shimmer key={i} className='mb-4 p-2'>
                  <div className='mb-2 h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                </Shimmer>
              ))}
            </div>
          </div>
          <Shimmer className='mb-4 p-2'>
            <div className='mb-2 h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>
          <Shimmer className='mb-4 p-2'>
            <div className='h-40 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>
        </>
      )}
    </Layout>
  );
}
