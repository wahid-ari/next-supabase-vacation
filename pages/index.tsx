import ImageBanner from '@/components/card/ImageBanner';
import FrontLayout from '@/components/front/FrontLayout';

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
  //       description="Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia."
  //     >
  //       <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
  //     </FrontLayout>
  //   );
  // }

  return (
    <FrontLayout
      title='Home - MyVacation'
      description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
    ></FrontLayout>
  );
}
