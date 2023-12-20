import { PlusCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea';
import { Separator } from '@/components/ui/Separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

import { AlbumArtwork } from '@/components/example/music/AlbumArtwork';
import { listenNowAlbums, madeForYouAlbums, playlists } from '@/components/example/music/data';
import { Menu } from '@/components/example/music/Menu';
import { PodcastEmptyPlaceholder } from '@/components/example/music/PodcastEmptyPlaceholder';
import { Sidebar } from '@/components/example/music/Sidebar';

export default function MusicPage() {
  return (
    <div className='rounded-md border dark:border-neutral-700'>
      <Menu />
      <div className='border-t dark:border-t-neutral-700'>
        <div className='bg-background'>
          <div className='grid md:grid-cols-6 xl:grid-cols-5'>
            <Sidebar playlists={playlists} className='hidden md:col-span-2 md:block xl:col-span-1' />
            <div className='col-span-6 overflow-hidden md:col-span-4 md:border-l xl:col-span-4 dark:md:border-l-neutral-700'>
              <div className='h-full p-4 md:p-6'>
                <Tabs defaultValue='music' className='h-full space-y-6'>
                  <div className='space-between flex flex-wrap-reverse items-center gap-3'>
                    <TabsList className='mr-auto'>
                      <TabsTrigger value='music' className='relative'>
                        Music
                      </TabsTrigger>
                      <TabsTrigger value='podcasts'>Podcasts</TabsTrigger>
                      <TabsTrigger value='live' disabled className='hidden sm:block'>
                        Live
                      </TabsTrigger>
                    </TabsList>
                    <div className='ml-auto'>
                      <Button>
                        <PlusCircleIcon className='mr-2 h-4 w-4' />
                        Add music
                      </Button>
                    </div>
                  </div>
                  <TabsContent value='music' className='border-none p-0 outline-none'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>Listen Now</h2>
                        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                          Top picks for you. Updated daily.
                        </p>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <div className='relative'>
                      <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                          {listenNowAlbums.map((album) => (
                            <AlbumArtwork
                              key={album.name}
                              album={album}
                              className='w-[250px]'
                              aspectRatio='portrait'
                              width={250}
                              height={330}
                            />
                          ))}
                        </div>
                        <ScrollBar orientation='horizontal' />
                      </ScrollArea>
                    </div>
                    <div className='mt-6 space-y-1'>
                      <h2 className='text-2xl font-semibold tracking-tight'>Made for You</h2>
                      <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                        Your personal playlists. Updated daily.
                      </p>
                    </div>
                    <Separator className='my-4' />
                    <div className='relative'>
                      <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                          {madeForYouAlbums.map((album) => (
                            <AlbumArtwork
                              key={album.name}
                              album={album}
                              className='w-[150px]'
                              aspectRatio='square'
                              width={150}
                              height={150}
                            />
                          ))}
                        </div>
                        <ScrollBar orientation='horizontal' />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                  <TabsContent value='podcasts' className='h-full flex-col border-none p-0 data-[state=active]:flex'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>New Episodes</h2>
                        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                          Your favorite podcasts. Updated daily.
                        </p>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <PodcastEmptyPlaceholder />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
