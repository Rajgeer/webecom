import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { logout, selectCurrentToken } from '../../features/authSlice';
import Button from '../Button';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispath = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  // Handle scroll for shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <div className="max-h-screen">
    <nav className={`sticky top-0 z-50 bg-white/80 backdrop-blur-sm transition-shadow ${
      isScrolled ? 'shadow-md' : 'shadow-none'
    }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Logo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                Contact
              </NavLink>
              {token?(<Button
                variant='primary'
                size='medium'
                onClick={() => dispath(logout())}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >Logout</Button>):(<>
              <NavLink
                to="/login"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                Register
              </NavLink>
              </>)}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none"
              aria-label="Main menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={closeMobileMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={closeMobileMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;