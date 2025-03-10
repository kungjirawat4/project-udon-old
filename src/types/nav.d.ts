import type { Icons } from 'react-toastify';

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
};

export type NavItemWithChildren = {
  items: NavItemWithChildren[];
} & NavItem;

export type MainNavItem = {} & NavItem;

export type SidebarNavItem = {} & NavItemWithChildren;
