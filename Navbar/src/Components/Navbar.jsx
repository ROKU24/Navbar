import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const menuItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-300">Logo</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 
                  ${currentPath === item.href
                    ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
                    : 'text-gray-600 hover:text-indigo-600'
                  }
                  before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-indigo-600 
                  before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-300
                  ${currentPath !== item.href && 'hover:before:scale-x-100'}
                `}
              >
                {item.title}
              </a>
            ))}
            <button className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg transform hover:scale-105">
              <User size={18} />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none transition-all duration-300 transform hover:scale-110"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu with transitions */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <a
                key={item.title}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-102 
                  ${currentPath === item.href
                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                style={{
                  transitionDelay: `${index * 75}ms`
                }}
              >
                {item.title}
              </a>
            ))}
            <button className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md transition-all duration-300 w-full mt-4 hover:bg-indigo-700 hover:shadow-md transform hover:scale-102">
              <User size={18} />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;