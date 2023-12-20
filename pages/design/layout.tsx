import Link from 'next/link';
import {
  ContainerIcon,
  ExternalLinkIcon,
  LayersIcon,
  LayoutDashboardIcon,
  LayoutPanelLeftIcon,
  LogInIcon,
  LogOutIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';

import { useMounted } from '@/hooks/use-mounted';

import Breadcrumb from '@/components/layout/Breadcrumb';
import Layout from '@/components/layout/Layout';
import Menu from '@/components/layout/Menu';
import NavAccordion from '@/components/layout/NavAccordion';
import Navbar from '@/components/layout/Navbar';
import NavLink from '@/components/layout/NavLink';
import Sidebar from '@/components/layout/Sidebar';
import ThemeChanger from '@/components/layout/ThemeChanger';
import Text from '@/components/systems/Text';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

export default function Example() {
  const { theme } = useTheme();
  const mounted = useMounted();
  const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

  return (
    <Layout title='Layout - MyVacation' description='Example Layout - MyVacation'>
      <div className='relative'>
        <Title>Layout</Title>
        <span className='absolute left-[85px] top-1 flex h-5 w-5 animate-bounce items-center justify-center'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
        </span>
      </div>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 sm:columns-3 dark:text-sky-500'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#breadcrumb'>
              Breadcrumb
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#nav-accordion'>
              NavAccordion
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#nav-link'>
              NavLink
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#nav-link-external'>
              NavLink.external
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#nav-link-login'>
              NavLink.login
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#nav-link-logout'>
              NavLink.logout
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#menu'>
              Menu
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#theme-changer'>
              ThemeChanger
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#navbar'>
              Navbar
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#layout'>
              Layout
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#sidebar'>
              Sidebar
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper id='breadcrumb' name='Breadcrumb' noChildren noClassName>
        <Breadcrumb data-testid='breadcrumb' />
      </Wrapper>

      <Wrapper id='nav-accordion' name='NavAccordion' props={['title', 'routeName', 'icon']} noClassName>
        <div className='w-64'>
          <NavAccordion
            data-testid='nav-accordion'
            title='Design'
            routeName='design'
            icon={<LayoutPanelLeftIcon className='h-4 w-4' />}
          >
            <NavLink
              data-testid='nav-accordion-link'
              href='/design/component'
              icon={<LayersIcon className='h-4 w-4' />}
            >
              Component
            </NavLink>
            <NavLink href='/design/layout' className='mt-1.5' icon={<LayoutDashboardIcon className='h-4 w-4' />}>
              Layout
            </NavLink>
          </NavAccordion>
        </div>
      </Wrapper>

      <Wrapper id='nav-link' name='NavLink' props={['href', 'icon', 'isHome']}>
        <div className='w-64'>
          <NavLink
            data-testid='nav-link'
            href='/design/layout'
            className='mt-1.5'
            icon={<ContainerIcon className='h-4 w-4' />}
          >
            Layout
          </NavLink>
        </div>
      </Wrapper>

      <Wrapper id='nav-link-external' name='NavLink.external' props={['href', 'icon']}>
        <div className='w-64'>
          <NavLink.external
            data-testid='nav-link-external'
            href='https://github.com'
            icon={<ExternalLinkIcon className='h-4 w-4' />}
          >
            External
          </NavLink.external>
        </div>
      </Wrapper>

      <Wrapper id='nav-link-login' name='NavLink.login' props={['href', 'icon']}>
        <div className='w-64'>
          <NavLink.login data-testid='nav-link-login' href='/login' icon={<LogInIcon className='h-4 w-4' />}>
            Login
          </NavLink.login>
        </div>
      </Wrapper>

      <Wrapper id='nav-link-logout' name='NavLink.logout' props={['href', 'icon']}>
        <div className='w-64'>
          <NavLink.logout data-testid='nav-link-logout' href='/logout' icon={<LogOutIcon className='h-4 w-4' />}>
            Logout
          </NavLink.logout>
        </div>
      </Wrapper>

      <Wrapper id='theme-changer' name='ThemeChanger' noChildren noClassName>
        <ThemeChanger data-testid='theme-changer' border />
        {mounted ? (
          <Text data-testid='theme-changer-value' className='mt-2'>
            {theme}
          </Text>
        ) : null}
      </Wrapper>

      <Wrapper id='menu' name='Menu' noChildren>
        <div className='ml-16 flex'>
          <Menu data-testid='menu' />
        </div>
      </Wrapper>

      <Wrapper id='navbar' name='Navbar' noChildren>
        <Navbar data-testid='navbar' className='!z-0 lg:!flex' />
        <Text className='mt-4 !text-red-600'>Navbar should visible only in small to medium screen</Text>
        <Text className='!text-red-600'>
          we pass className={"'"}flex{"'"} to Navbar here only for test purpose
        </Text>
      </Wrapper>

      <Wrapper id='layout' name='Layout' noClassName props={['title', 'description', 'prefetch']}>
        <Layout data-testid='layout' title='Layout - MyVacation' demo={true}>
          <Title>Content</Title>
        </Layout>
        <Text className='mt-4 !text-red-600'>we pass prop demo=true to Layout here only for test purpose</Text>
      </Wrapper>

      <Wrapper id='sidebar' name='Sidebar' noChildren>
        <div className='overflow-hidden'>
          <Sidebar data-testid='sidebar' className='!z-0 !flex !w-auto' />
        </div>
      </Wrapper>
    </Layout>
  );
}
