import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, CameraIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-2xl'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className={`p-2 rounded-full transition-colors duration-300 ${scrolled ? 'bg-black text-white' : 'bg-white/20 text-white'
                  }`}
              >
                <CameraIcon className="h-6 w-6" />
              </motion.div>
              <span className={`text-2xl font-bold transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'
                }`}>
                LENS<span className="text-amber-500">ART</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full ${isActive(item.href)
                  ? scrolled
                    ? 'text-white bg-black'
                    : 'text-black bg-white/90'
                  : scrolled
                    ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                    : 'text-white/80 hover:text-white hover:bg-white/20'
                  }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-full ${scrolled ? 'bg-black' : 'bg-white/90'
                      }`}
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors duration-300 ${scrolled
                ? 'text-gray-900 hover:bg-gray-100'
                : 'text-white hover:bg-white/20'
                }`}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50"
          >
            <div className="px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${isActive(item.href)
                    ? 'text-white bg-black'
                    : 'text-gray-700 hover:text-black hover:bg-gray-100'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;