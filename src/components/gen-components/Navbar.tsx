"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BellDot, ChevronDown } from "lucide-react";
import ProfileMenu from '../profile/ProfileMenu';
import ReactDOM from 'react-dom';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null); // NEW: ref for portal container
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const { isDarkMode } = useTheme();

  // Social media icons - filtered to only Twitter, LinkedIn, and Instagram
  const FILTERED_SOCIAL_ICONS = [
    { Icon: FaTwitter, href: "https://twitter.com/BrokingSapphire" },
    { Icon: FaLinkedin, href: "https://linkedin.com/company/BrokingSapphire" },
    { Icon: FaInstagram, href: "https://instagram.com/BrokingSapphire" },
  ];

  // Main navigation links without sub-routes for Trade section
  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/trades/stocks", label: "Trades" },
    // { href: "/news", label: "News" },
    { href: "/watchlist", label: "Watchlist" },
    { href: "/order/queued", label: "Orders" },
    { href: "/holdings/equity", label: "Holdings" },
    { href: "/positions", label: "Positions" },
    { href: "/funds", label: "Funds" },
  ];

  useEffect(() => {
    // Set the active link based on the pathname
    // This will also handle setting active state for parent routes
    setActiveLink(pathname);
  }, [pathname]);

  // Close sidebar when pathname changes (user navigates)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Lock/unlock body scroll when sidebar is open/closed
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Function to check if a route is active, including child routes
  interface NavLink {
    href: string;
    label: string;
  }
  const isRouteActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    
    // Modified to properly handle both trades and holdings routes
    // Check if the current path starts with the href (parent route) OR
    // specially handle the "/trades" and "/holdings" routes to be active for any subpaths
    return pathname === href || 
           pathname.startsWith(`${href}/`) || 
           (href === "/trades/stocks" && pathname.startsWith("/trades/")) ||
           (href === "/holdings/equity" && pathname.startsWith("/holdings/")) ||
           (href === "/order/queued" && pathname.startsWith("/order/"));
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        profileRef.current &&
        !profileRef.current.contains(target) &&
        (!portalRef.current || !portalRef.current.contains(target)) // NEW: check portal
      ) {
        setShowProfileMenu(false);
      }
    }
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  // Calculate dropdown position when opening
  useEffect(() => {
    if (showProfileMenu && profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8, // 8px below the icon
        left: rect.right - 320, // align right edge, assuming menu width 320px
      });
    }
  }, [showProfileMenu]);

  return (
    <>
      <nav className="fixed font-poppins w-full top-0 z-50 bg-white dark:bg-[#181A20] border-b-[2px] border-gray-200 dark:border-[#23272F] px-[28px]">
        <div className="w-full mx-auto flex items-center justify-between h-[56px]">
          {/* Main single-row layout */}
          <div className="w-full  flex items-center justify-between">
            {/* Left section with stock information - exactly 25% width */}
            <div className="w-[24%] h-full relative border-r-[0.5px]">
              {/* Stock Information - 28px padding inside 25% */}
              <div className="pr-[28px] h-full flex items-center">
                <div className="flex items-center space-x-6 w-full">
                  <div className="flex pr-2 border-r flex-col">
                    <div className="flex items-center ">
                      <span className="text-xs font-medium text-black dark:text-white">Nifty 50</span>
                      <span className="ml-2 bg-red-100 dark:bg-red-900 p-1 rounded-sm text-[8px] text-red-500 dark:text-red-300">
                        Expiry Today
                      </span>
                    </div>
                    <div className="flex items-center mt-0.5">
                      <span className="text-[10px] font-semibold text-[#22F07D] dark:text-green-400">
                        +37.02 (+0.17%)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-black dark:text-white">Sensex</span>
                    <div className="flex items-center mt-0.5">
                      <span className="text-[10px] font-medium text-red-500 dark:text-red-400">
                        -27.43 (-0.38%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links - Center section takes remaining space */}
            <div className="hidden lg:flex flex-1 justify-start items-center pl-[14px]">
              <div className="flex items-center space-x-[5px]"> 
                {navLinks.map((link) => { 
                // Check if this is the active route or its child route 
                const isActive = isRouteActive(link.href); 
                
                return ( 
                <div key={link.href} className="relative group w-[80px] text-center"> 
                <Link 
                href={link.href} 
                className={`relative group text-sm font-normal py-1 transition-all duration-300 ${ 
                isActive ? "text-[#1DB954]" : "" 
                } group-hover:text-[#1DB954]`} 
                onClick={() => setActiveLink(link.href)} 
                > 
                {link.label} 
                
                {/* Green underline animation - consistent for both hover & active states */} 
                <span 
                className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-[2px] bg-[#1DB954] transition-all duration-300 w-0 
                ${isActive ? "w-[140%]" : ""} 
                group-hover:w-[140%]`} 
                ></span> 
                </Link> 
                </div> 
                ); 
                })} 
                </div>
            </div>

            {/* Desktop Right Side Elements - 25% width */}
            <div className="hidden lg:flex w-[25%] items-center justify-end relative dark:text-white">
              <div className="px-[28px] flex items-center space-x-3">
                {/* Notifications Bell Icon */}
                <button className="text-gray-700 dark:text-gray-200">
                  <BellDot color="black" size={18} />
                </button>

                {/* User Profile Avatar with Dropdown Arrow */}
                <div className="flex items-center relative" ref={profileRef}>
                  <div
                    className="h-6 w-6 cursor-pointer rounded-full overflow-hidden border border-gray-300"
                    onClick={() => setShowProfileMenu((v) => !v)}
                  >
                    <Image
                      src="/profile.svg"
                      alt="Profile"
                      width={24}
                      height={24}
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/24";
                      }}
                    />
                  </div>
                  <span className="ml-1 cursor-pointer" onClick={() => setShowProfileMenu((v) => !v)}>
                    <ChevronDown color={isDarkMode ? 'white' : 'black'} size={16} />
                  </span>
                  {/* ProfileMenu Dropdown (Portal, fixed position) */}
                  {showProfileMenu && dropdownPosition && ReactDOM.createPortal(
                    <div
                      className="fixed z-[1050] shadow-xl"
                      style={{ top: dropdownPosition.top, left: dropdownPosition.left, minWidth: 320 }}
                      ref={portalRef} // NEW: attach ref
                    >
                      <ProfileMenu />
                    </div>,
                    document.body
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex flex-col space-y-1 cursor-pointer z-50"
              onClick={toggleSidebar}
              aria-label="Toggle mobile menu"
            >
              <span
                className={`block h-0.5 w-5 bg-black transition-transform duration-300 ease-in-out ${
                  isSidebarOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-5 bg-black transition-opacity duration-300 ease-in-out ${
                  isSidebarOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-5 bg-black transition-transform duration-300 ease-in-out ${
                  isSidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full bg-gradient-to-br from-white to-gray-50 dark:from-[#181A20] dark:to-[#23272F] z-50 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16 pb-5 px-5">
          <div className="absolute backdrop-blur-md shadow-sm pb-2 top-4 right-5 flex items-center justify-between w-full">
            <div className="ml-8 items-center flex">
              <Image
                src="/globe.svg"
                alt="Sapphire Logo"
                width={80}
                height={80}
                className="w-8 h-8"
              />
              <p className="font-semibold text-xl text-black dark:text-white">Sapphire</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Stock Information for mobile */}
          <div className="mt-3 border-b border-gray-200 dark:border-[#23272F] pb-3">
            <div className="flex justify-between">
              {/* Nifty 50 */}
              <div className="flex flex-col">
                <span className="font-bold text-xs text-black dark:text-white">Nifty 50</span>
                <div className="flex items-center mt-1">
                  <span className="text-[10px] text-white bg-red-500 dark:bg-red-900 px-1 py-0.5 rounded-sm">
                    Expiry Today
                  </span>
                  <span className="ml-1 text-green-500 dark:text-green-400 text-[10px]">
                    +87.10 (0.10%)
                  </span>
                </div>
              </div>

              {/* Sensex */}
              <div className="flex flex-col">
                <span className="font-bold text-xs text-black dark:text-white">Sensex</span>
                <span className="text-red-500 dark:text-red-400 text-[10px] mt-1">
                  -87.10 (-0.10%)
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links - simplified without Sub-Routes */}
          <div className="flex flex-col space-y-5 mt-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium py-2 border-l-3 pl-3 transition-colors duration-200 ${isRouteActive(link.href) ? "border-[#1DB954] text-[#1DB954] dark:text-[#22F07D] dark:border-[#22F07D]" : "border-transparent hover:border-gray-300 hover:text-[#1DB954] dark:hover:text-[#22F07D] dark:hover:border-[#22F07D]"}`}
                onClick={() => {
                  setActiveLink(link.href);
                  setSidebarOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Profile Section */}
          <div className="mt-auto border-t border-gray-200 dark:border-[#23272F] pt-5 flex items-center">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-300">
              <Image
                src="/profile.svg"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/32";
                }}
              />
            </div>
            <div className="ml-2">
              <p className="font-medium text-xs text-black dark:text-white">John Doe</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-300">ID: SA12345</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {FILTERED_SOCIAL_ICONS.map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#1DB954] dark:text-gray-300 dark:hover:text-[#22F07D] transition-colors duration-300"
                aria-label={`Visit our ${Icon.name.replace("Fa", "")}`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;