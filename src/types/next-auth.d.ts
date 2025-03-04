import type { UserRole } from '@/libs/enum';

declare module 'next-auth' {
  type Session = {
    user: {
      role: UserRole;
      routes: [];
      menu: [];
      config: [];
      tokek: string;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    };
  };
  type User = {
    role: UserRole;
    routes: [];
    menu: [];
    config: [];
    tokek: string;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  };
}

declare module 'next-auth/jwt' {
  type JWT = {
    user: {
      role: UserRole;
      routes: [];
      menu: [];
      config: [];
      tokek: string;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    };
  };
  type User = {
    role: UserRole;
    routes: [];
    menu: [];
    config: [];
    tokek: string;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  };
}
