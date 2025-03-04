import Link from 'next/link';

// import Nav from './components/_components/nav';
import Navbars from '@/components/layouts/medicine-layout/navbar';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex h-screen w-full flex-col">
      {/* <Nav /> */}
      <Navbars />
      <main className="flex flex-1 justify-center overflow-hidden">
        {children}
      </main>
      <footer className="flex w-full items-center justify-center py-3">
        <Link
          className="flex items-center gap-1 text-current"
          href="https://www.facebook.com/people/A-I-SMART-TECH/61559957321400"
          title="AI Smart Tech Fanpage"
          target="_blank"
          rel="noopener noreferrer" // เพิ่มเพื่อความปลอดภัย
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">A I Smart Tech</p>
        </Link>
      </footer>
    </div>
  );
}
