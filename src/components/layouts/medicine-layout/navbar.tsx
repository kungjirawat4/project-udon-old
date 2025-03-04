'use client';

import type { UrlObject } from 'node:url';

import {
  Link,
  link as linkStyles,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Tooltip,
} from '@nextui-org/react';
import clsx from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import { CommandMenu } from '@/components/layouts/home-layout/command-menu';
import { useCurrentUser } from '@/hooks/use-current-user';
import { siteConfig } from '@/utils/AppConfig';

import { Notifications } from './notifications';
import UserNav from './userNav';

export default function Navbars() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUser, setIsUser] = React.useState(false);

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

  const isUserLogin: any = useCurrentUser();
  const isLogo = isUserLogin?.hospital;

  React.useEffect(() => {
    setIsUser(isUserLogin);
  }, [isUserLogin, isUser]);
  return (
    <Navbar maxWidth="xl" position="sticky" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand className="mr-4">
          {isLogo
            ? (
                <>
                  <Image
                    src={isLogo.hospital_logo}
                    className="size-8"
                    width={35}
                    height={35}
                    alt="Logo"
                  />
                  <div className="whitespace-pre-line">ospital</div>
                </>
              )
            : (
                <>

                  <Image
                    src="/images/logo_udh.png"
                    width={35}
                    height={35}
                    alt="Logo"
                    className="size-8"
                  />
                  <div className="whitespace-nowrap">ospital</div>

                </>
              )}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden w-full gap-4 sm:flex" justify="center">
        <ul className="flex space-x-9 md:flex">
          {siteConfig.navItems.map(
            (item: {
              href: string | UrlObject;
              label: string;
              image: string;
            }) => (
              <NavbarItem key={item.href as string}>
                <Tooltip
                  showArrow
                  content={(
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        {item.label as string}
                      </div>
                      {/* <div className="text-tiny">
                        This is a custom tooltip content
                      </div> */}
                    </div>
                  )}
                >
                  <NextLink
                    className={clsx(
                      linkStyles({ color: 'foreground' }),
                      'data-[active=true]:font-medium data-[active=true]:text-primary',
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    <Image
                      src={item.image}
                      className="size-8"
                      width={35}
                      height={35}
                      alt={item.label as string}
                    />
                    {/* {item.label} */}
                  </NextLink>
                </Tooltip>
              </NavbarItem>
            ),
          )}
        </ul>
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {/* <Link href="#">Login</Link> */}
          <div className="flex items-center gap-2">
            <CommandMenu />
          </div>
        </NavbarItem>
        <NavbarItem>
          {/* <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button> */}
          {/* <ThemeSwitch /> */}
          <div className="flex items-center gap-4">
            <Notifications />
            <UserNav />
          </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <CommandMenu />
        {menuItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={

                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
