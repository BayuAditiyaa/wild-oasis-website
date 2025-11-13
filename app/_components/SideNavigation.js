"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "@/app/_components/SignOutButton";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathName = usePathname();

  return (
    // NAV CONTAINER:
    // Mobile (default): Bilah navigasi bawah yang fixed
    // Desktop (md:): Sidebar statis di samping
    <nav className="fixed bottom-0 left-0 w-full bg-primary-950 border-t border-primary-800 z-50
                   md:static md:w-full md:h-full md:border-r md:border-t-0 md:bg-transparent">
      
      {/* UL CONTAINER: */}
      {/* Mobile (default): Horizontal, rata tengah */}
      {/* Desktop (md:): Vertikal, tinggi penuh, gap */}
      <ul className="flex justify-around items-center p-2.5
                     md:flex-col md:gap-2 md:h-full md:text-lg md:p-0 md:pt-6">
        
        {/* Nav Links (dari mapping) */}
        {navLinks.map((link) => (
          <li key={link.name} className="md:w-full">
            {/* LINK: */}
            {/* Mobile (default): Flex-col (ikon di atas teks), teks kecil */}
            {/* Desktop (md:): Flex-row (ikon di samping teks), teks lebih besar */}
            <Link
              className={`flex flex-col items-center gap-1 p-2 font-semibold transition-colors text-primary-200 hover:text-primary-100 rounded-md
                          md:flex-row md:gap-4 md:px-5 md:py-3 md:w-full md:hover:bg-primary-900
                          ${
                            // Logika Active State:
                            // Menyorot teks di mobile, memberi background di desktop
                            pathName === link.href 
                              ? "text-accent-500 md:bg-primary-800 md:text-primary-100" 
                              : ""
                          }`}
              href={link.href}
            >
              {link.icon}
              {/* Teks: Ukuran font responsif */}
              <span className="text-xs md:text-base">{link.name}</span>
            </Link>
          </li>
        ))}

        {/* Tombol Sign Out */}
        {/* Mobile (default): Menjadi item ke-4 di bilah bawah */}
        {/* Desktop (md:): Mendorong ke bagian bawah sidebar */}
        <li className="md:mt-auto md:w-full">
          {/* Kita perlu membuat SignOutButton juga responsif */}
          {/* Saya akan membungkusnya dengan style yang mirip dengan link lain */}
          <div className="flex flex-col items-center gap-1 p-2 text-primary-200 md:flex-row md:gap-4 md:px-5 md:py-3 md:w-full">
            <SignOutButton />
          </div>
        </li>
      </ul>
    </nav>
  );
}


export default SideNavigation;
