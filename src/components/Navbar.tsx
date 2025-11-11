import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";

import shoplogo from "../assets/shoplogo.png";
import NavItems from "../data/NavItems";

type Props = {};

const Navbar = (props: Props) => {
  const { pathname } = useLocation();
  const navigator = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [isTransparent, setTransparency] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check login status on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userData = localStorage.getItem("user");

    if (loggedIn && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // https://stackoverflow.com/questions/55360736/how-do-i-window-removeeventlistener-using-react-useeffect
  const onScroll = useCallback(() => {
    setTransparency(pathname === "/" && window.scrollY === 0);
    // Close dropdown on scroll
    setIsDropdownOpen(false);
  }, [pathname, setTransparency]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, setTransparency, isTransparent, onScroll]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    navigator("/");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed z-50 flex w-full flex-wrap items-center justify-between py-4 text-gray-200 transition-all duration-300 ${pathname === "/" && isTransparent
        ? "duration-150"
        : "bg-gray-900 shadow-lg"
        }`}
    >
      <div className="container-fluid flex w-full flex-wrap items-center justify-between px-6">
        <button
          className="navbar-toggler border-0 bg-transparent py-2 px-2.5 text-gray-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <GiHamburgerMenu className="scale-150" />
        </button>
        <div
          className="navbar-collapse collapse flex-grow items-center"
          id="navbarSupportedContent1"
        >
          <div className="flex flex-col lg:flex-row items-center">
            <img src={shoplogo} className="mr-2 w-8" alt="computer shop logo" />
            <Link className="pr-2 text-xl font-semibold text-white" to="/">
              Linh Kiện Điện Tử
            </Link>
          </div>
          {/* Left links */}
          <ul className="navbar-nav list-style-none mr-auto flex flex-col lg:flex-row items-center pl-0">
            {NavItems.map((obj, i) => (
              <li key={`Nav${i}`} className="nav-item p-2 opacity-70 hover:opacity-100 transition-opacity">
                <Link
                  to={obj.path}
                  className={`px-3 py-2 rounded-lg transition-colors ${pathname === obj.path
                    ? "bg-indigo-600 text-white"
                    : "text-gray-200 hover:bg-gray-700"
                    }`}
                >
                  {obj.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* Left links */}
        </div>
        {/*  Collapsible wrapper */}

        {/* Right elements - simplified for frontend only */}
        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="text-white opacity-60 hover:opacity-100 focus:opacity-100 transition-opacity"
          >
            Giỏ hàng
          </Link>

          {isLoggedIn && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center text-white opacity-60 hover:opacity-100 focus:opacity-100 transition-opacity"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="mr-1">{user.name}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Hồ sơ
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-white opacity-60 hover:opacity-100 focus:opacity-100 transition-opacity"
              >
                Đăng nhập
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
        {/* Right elements */}
      </div>
    </nav>
  );
};

export default Navbar;
