/* eslint-disable style/multiline-ternary */
'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import {
  AddNoteIcon,
} from '@/components/common/icons';
import { NextLink } from '@/components/common/link';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useDir } from '@/hooks/use-dir';

import { DarkModeSwitch } from './darkswitch';

const LogoutModal = dynamic(() => import('./logout-modal').then(mod => mod.LogoutModal), {
  ssr: false,
});

export default function UserNav() {
  const isLoggedIn: any = useCurrentUser();

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';
  const dir = useDir();
  return (
    <>
      <LogoutModal
        onClose={() => setLogoutModalOpen(false)}
        isOpen={isLogoutModalOpen}
      />
      {isLoggedIn
        ? (
            <Dropdown
              dir={dir}
              backdrop="blur"
              showArrow
              classNames={{
                base: 'before:bg-default-200', // change arrow background
                content:
            'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
              }}
            >
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: isLoggedIn.image as string,
                    size: 'sm',
                  }}
                  className="transition-transform"
                  description={isLoggedIn.bio}
                  name={isLoggedIn.name}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Custom item styles"
                disabledKeys={['profile']}
                className="p-3"
                itemClasses={{
                  base: [
                    'rounded-md',
                    'text-default-500',
                    'transition-opacity',
                    'data-[hover=true]:text-foreground',
                    'data-[hover=true]:bg-default-100',
                    'dark:data-[hover=true]:bg-default-50',
                    'data-[selectable=true]:focus:bg-default-50',
                    'data-[pressed=true]:opacity-70',
                    'data-[focus-visible=true]:ring-default-500',
                  ],
                }}
              >
                <DropdownSection aria-label="Profile & Actions" showDivider>
                  <DropdownItem
                    isReadOnly
                    key="user"
                    className="h-14 gap-2 opacity-100"
                  >
                    <User
                      name={isLoggedIn.name}
                      description={isLoggedIn.bio}
                      classNames={{
                        name: 'text-default-600',
                        description: 'text-default-500',
                      }}
                      avatarProps={{
                        size: 'sm',
                        src: isLoggedIn.image,
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem>
                    <div className="flex flex-col">
                      <NextLink
                        href="/account/profile"
                        className="flex justify-between"
                      >
                        <div className="mb-1 text-sm leading-none">โปรไฟล์</div>
                      </NextLink>
                      <div className="text-xs text-muted-foreground">
                        {isLoggedIn.email}
                      </div>
                    </div>
                  </DropdownItem>
                  {isLoggedIn.routes ? isLoggedIn.routes.map((item: any) => (
                    <DropdownItem
                      key={item.name}
                      shortcut="⌘N"
                      // description="Create a new file"
                      startContent={<AddNoteIcon className={iconClasses} />}
                    >
                      <NextLink
                        href={`${item.path}`}
                        className="flex justify-between"
                      >
                        {item.name}
                      </NextLink>

                    </DropdownItem>
                  )) : ''}

                  {/*  <DropdownItem
                    key="edit"
                    shortcut="⌘⇧E"
                    description="Allows you to edit the file"
                    startContent={<EditDocumentIcon className={iconClasses} />}
                  >
                    Edit file
                  </DropdownItem> */}

                </DropdownSection>
                <DropdownSection title="Danger zone">

                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    // shortcut="⌘⇧O"
                    // description="Log out now"
                    onClick={() => setLogoutModalOpen(true)}
                    // startContent={
                    //   <DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />
                    // }
                  >
                    ออกจากระบบ
                  </DropdownItem>
                </DropdownSection>
                <DropdownItem key="switch">
                  <DarkModeSwitch />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )
        : (
            <p>กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
          )}

    </>
  );
}
