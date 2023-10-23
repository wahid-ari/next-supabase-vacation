import { useTheme } from 'next-themes';

import Layout from '@/components/layout/Layout';
import Text from '@/components/systems/Text';
import Title from '@/components/systems/Title';

// Setting.auth = true;

export default function Setting() {
  const { theme, setTheme } = useTheme();

  const handleDarkMode = () => {
    if (theme == 'light') {
      setTheme('dark');
    } else setTheme('light');
  };

  return (
    <Layout title='Setting - MyVacation' description='Setting - MyVacation'>
      <Title>Setting</Title>
      <Text className='mb-2 mt-4'>Dark Mode</Text>
      <div
        role='button'
        title='Change Theme'
        onClick={handleDarkMode}
        className='relative h-6 w-11 cursor-pointer rounded-full bg-neutral-300 transition-all dark:bg-sky-500 shadow-md'
      >
        <div className='absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all dark:left-6'></div>
      </div>
    </Layout>
  );
}
