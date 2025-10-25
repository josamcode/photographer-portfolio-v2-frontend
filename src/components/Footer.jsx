import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  HashtagIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: CameraIcon },
    { name: 'Facebook', href: '#', icon: ChatBubbleLeftIcon },
    { name: 'Twitter', href: '#', icon: HashtagIcon },
    { name: 'LinkedIn', href: '#', icon: BriefcaseIcon },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Admin', href: '/admin' }
  ];

  const services = [
    'Wedding Photography',
    'Portrait Sessions',
    'Event Photography',
    'Corporate Photography',
    'Landscape Photography',
    'Product Photography',
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full">
                  <CameraIcon className="h-6 w-6 text-black" />
                </div>
                <span className="text-2xl font-bold">
                  LENS<span className="text-amber-500">ART</span>
                </span>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                Professional photographer capturing life's most precious moments through the art of visual storytelling.
                Every frame tells a story, every shot captures emotion.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <EnvelopeIcon className="h-4 w-4 text-amber-500" />
                  <span>gergessamuel100@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <PhoneIcon className="h-4 w-4 text-amber-500" />
                  <span>+20 120 477 0940</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <MapPinIcon className="h-4 w-4 text-amber-500" />
                  <span>Cairo, Egypt</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <span className="text-gray-400 text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-4">
                  Subscribe to get updates on new work and photography tips.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-medium rounded-r-lg hover:from-amber-600 hover:to-orange-600 transition-colors duration-200">
                    Join
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-gray-400 text-sm mb-4">Follow my work</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200 text-lg"
                    >
                      <social.icon className="h-5 w-5 text-gray-400" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 gap-1 text-sm text-gray-400"
              >
                <span>© {currentYear} LensArt Photography. Made with</span> {" "} Gerges Samuel
                {/* <HeartIcon className="h-4 w-4 text-red-500" /> */} <span>in Egypt, Cairo</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex space-x-6 text-sm text-gray-400"
              >
                <Link to="#" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="#" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link to="#" className="hover:text-white transition-colors duration-200">
                  Cookie Policy
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;