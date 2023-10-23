// import Link from 'next/link';
// import { useBooksData } from '@/libs/swr';
import FrontLayout from '@/components/front/FrontLayout';

// import Shimer from '@/components/systems/Shimer';

export default function Home() {
  // const { data, error } = useBooksData();
  // const movieWithBackdrop = data?.filter((item) => item.backdrop_url != null && item.backdrop_url != '');
  // // const fiveMovieWithBackdrop = movieWithBackdrop?.slice(0, 5);
  // const shuffledMovie = movieWithBackdrop?.sort(() => 0.5 - Math.random());
  // const fiveMovieWithBackdrop = shuffledMovie?.slice(0, 5);

  // if (error) {
  //   return (
  //     <FrontLayout
  //       title='Home - MyVacation'
  //       description="Find books you'll love, and keep track of the books you want to read. Be part of the largest community
  //         of book lovers on MyVacation"
  //     >
  //       <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
  //     </FrontLayout>
  //   );
  // }

  return (
    <FrontLayout
      title='Home - MyVacation'
      description="Find books you'll love, and keep track of the books you want to read. Be part of the largest community
        of book lovers on MyVacation"
    >
      <div className='py-8' />
    </FrontLayout>
  );
}
