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
  const portalRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const { isDarkMode } = useTheme();

  // Social media icons
  const FILTERED_SOCIAL_ICONS = [
    { Icon: FaTwitter, href: "https://twitter.com/BrokingSapphire" },
    { Icon: FaLinkedin, href: "https://linkedin.com/company/BrokingSapphire" },
    { Icon: FaInstagram, href: "https://instagram.com/BrokingSapphire" },
  ];

  // Navigation links
  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/trades/stocks", label: "Trades" },
    { href: "/watchlist", label: "Watchlist" },
    { href: "/order/queued", label: "Orders" },
    { href: "/holdings/equity", label: "Holdings" },
    { href: "/positions", label: "Positions" },
    { href: "/funds", label: "Funds" },
  ];

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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

  const isRouteActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
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
        (!portalRef.current || !portalRef.current.contains(target))
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
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      
      if (isMobile) {
        // For mobile, position dropdown below the profile pic, right-aligned to screen edge
        setDropdownPosition({
          top: rect.bottom + 8,
          left: Math.min(rect.left, window.innerWidth - 320 - 10), // Ensure it fits on screen
        });
      } else {
        // Desktop positioning
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.right - 320,
        });
      }
    }
  }, [showProfileMenu]);

  return (
    <>
      <nav className="fixed font-poppins w-full top-0 z-50 bg-white border-b-[2px] border-gray-200 dark:border-[#2f2f2f] px-[28px] dark:bg-[#121212]">
        <div className="w-full mx-auto flex items-center justify-between h-[56px]">
          {/* Desktop Layout - Keep exactly as is */}
          <div className="hidden lg:flex w-full items-center justify-between">
            {/* Left section with stock information - exactly 25% width */}
            <div className="w-[24%] h-full relative border-r-[0.5px]">
              <div className="pr-[28px] h-full flex items-center">
                <div className="flex items-center space-x-6 w-full">
                  <div className="flex pr-2 border-r flex-col">
                    <div className="flex items-center ">
                      <span className="text-xs font-medium text-black dark:text-white">Nifty 50</span>
                      <span className="ml-2 bg-red-100 p-1 rounded-sm text-[8px] text-red-500 dark:bg-red-900 dark:text-red-300">
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

            {/* Navigation Links - Center section */}
            <div className="flex-1 justify-start items-center pl-[14px]">
              <div className="flex items-center space-x-[20px]"> 
                {navLinks.map((link, idx) => { 
                  const isActive = isRouteActive(link.href); 
                  return ( 
                    <div key={link.href} className={`relative group w-[80px] text-center${link.label === 'Home' ? ' ml-1' : ''}`}> 
                      <Link 
                        href={link.href} 
                        className={`relative group text-sm font-normal py-1 transition-all duration-300 ${ 
                          isActive ? "text-[#1DB954] dark:text-[#22F07D]" : "text-gray-700 dark:text-white" 
                        } group-hover:text-[#1DB954] dark:group-hover:text-[#22F07D]`} 
                        onClick={() => setActiveLink(link.href)} 
                      > 
                        {link.label} 
                        <span 
                          className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-[2px] bg-[#1DB954] dark:bg-[#22F07D] transition-all duration-300 w-0 
                          ${isActive ? "w-[140%]" : ""} 
                          group-hover:w-[140%]`} 
                        ></span> 
                      </Link> 
                    </div> 
                  ); 
                })} 
              </div>
            </div>

            {/* Desktop Right Side Elements */}
            <div className="flex w-[25%] items-center justify-end relative dark:text-white">
              <div className="px-[28px] flex items-center space-x-3">
                <button className="text-gray-700 dark:text-white">
                  <BellDot color={isDarkMode ? '#9CA3AF' : 'black'} size={18} />
                </button>

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
                  {/* ProfileMenu Dropdown - Works for both desktop and mobile */}
                  {showProfileMenu && dropdownPosition && ReactDOM.createPortal(
                    <div
                      className="fixed z-[9999] shadow-2xl lg:shadow-xl"
                      style={{ 
                        top: dropdownPosition.top, 
                        left: dropdownPosition.left, 
                        minWidth: 320,
                        maxWidth: 'calc(100vw - 20px)' // Ensure it doesn't overflow on mobile
                      }}
                      ref={portalRef}
                    >
                      <ProfileMenu />
                    </div>,
                    document.body
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - New responsive design */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Left: Stock Information */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-xs font-medium text-black dark:text-white">Nifty 50</span>
                  <span className="ml-2 bg-red-100 p-1 rounded-sm text-[8px] text-red-500 dark:bg-red-900 dark:text-red-300">
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

            {/* Right: Profile, Bell, and Menu */}
            <div className="flex items-center space-x-3">
              {/* Bell Icon */}
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <BellDot color={isDarkMode ? '#9CA3AF' : 'black'} size={20} />
              </button>

              {/* Profile Picture */}
              <div 
                ref={profileRef}
                className="h-8 w-8 rounded-full overflow-hidden border border-gray-300 cursor-pointer"
                onClick={() => setShowProfileMenu((v) => !v)}
              >
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

              {/* Hamburger Menu */}
              <button
                className="flex flex-col space-y-1 cursor-pointer z-50 p-2"
                onClick={toggleSidebar}
                aria-label="Toggle mobile menu"
              >
                <span
                  className={`block h-0.5 w-5 bg-black dark:bg-white transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 bg-black dark:bg-white transition-opacity duration-300 ease-in-out ${
                    isSidebarOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 bg-black dark:bg-white transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </button>
            </div>
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

      {/* Mobile Sidebar - Improved Design */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-[#121212] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Image
                src="/globe.svg"
                alt="Sapphire Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="ml-2 font-semibold text-xl text-black dark:text-white">Sapphire</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
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



          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isRouteActive(link.href)
                      ? "bg-[#1DB954] dark:bg-[#22F07D] text-white dark:text-black shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    setActiveLink(link.href);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-300">
                <Image
                  src="/profile.svg"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/48";
                  }}
                />
              </div>
              <div className="ml-3">
                <p className="font-medium text-black dark:text-white">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">ID: SA12345</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-start space-x-6">
              {FILTERED_SOCIAL_ICONS.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-[#1DB954] dark:hover:text-[#22F07D] transition-colors duration-300"
                  aria-label={`Visit our ${Icon.name.replace("Fa", "")}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;