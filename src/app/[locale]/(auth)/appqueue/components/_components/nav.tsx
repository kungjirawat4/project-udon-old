import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Image from 'next/image';

export default function Nav() {
  return (
    <Navbar position="static" className="w-full">
      <NavbarBrand>
        <Image
          src="/images/logo_udh.png"
          width={35}
          height={35}
          alt="Logo"
          className="size-8"
        />
        <div className="whitespace-nowrap">ospital</div>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {/* <NavbarItem>
          <Link color="foreground" href="../queue1.tsx">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

    </Navbar>

  );
}
