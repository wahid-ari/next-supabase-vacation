import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

import { cn } from '@/libs/utils';

import Layout from '@/components/layout/Layout';
import Text from '@/components/systems/Text';
import Title from '@/components/systems/Title';

Setting.auth = true;

export default function Setting() {
  const { theme, setTheme } = useTheme();

  const handleDarkMode = () => {
    if (theme == 'light') {
      setTheme('dark');
    } else setTheme('light');
  };

  const [current, setCurrent] = useState(theme);
  useEffect(() => {
    setCurrent(theme);
  }, [theme]);

  return (
    <Layout title='Setting - MyVacation' description='Setting - MyVacation'>
      <Title>Setting</Title>
      <Text className='mb-2 mt-4'>Dark Mode</Text>
      {/* <div
        role='button'
        title='Change Theme'
        onClick={handleDarkMode}
        className='relative h-6 w-11 cursor-pointer rounded-full bg-neutral-300 shadow-md transition-all dark:bg-sky-500'
      >
        <div className='absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all dark:left-6'></div>
      </div> */}

      <motion.div
        className={cn(
          'relative h-[25px] w-[45px] cursor-pointer rounded-2xl focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900',
        )}
        style={{
          backgroundColor: 'rgba(120,120,128,.2)',
        }}
        animate={current}
        initial={true}
        // @ts-ignore
        onTapStart={handleDarkMode}
      >
        <motion.div
          className='h-full w-full rounded-full bg-sky-500'
          variants={{ light: { scale: 0 }, dark: { scale: 1 } }}
          transition={{ ease: 'easeInOut' }}
        />
        <motion.div
          className='absolute left-[3px] top-[3px] h-[18px] w-[18px] rounded-xl bg-white'
          style={{
            boxShadow: `0 0 0 0.5px rgba(0,0,0,.04), 
            0 3px 8px 0 rgba(0,0,0,.15), 
            0 3px 1px 0 rgba(0,0,0,.06)`,
          }}
          variants={{ light: { x: 1 }, dark: { x: 20 } }}
          // @ts-ignore
          transition={{
            ease: 'easeInOut',
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        />
      </motion.div>
    </Layout>
  );
}
