import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, GraduationCap, Sparkles, ChevronDown, 
  Home, Info, Briefcase, Award, Mail, Phone, 
  Globe, Users, Star, Zap 
} from 'lucide-react';
import { navLinks } from '../data/content';

// Enhanced constants
const NAVBAR_HEIGHT = 80;
const SCROLL_THRESHOLD = 20;

/**
 * Responsive navigation bar with premium UI
 * Features animated glassmorphism, hover effects, and mobile menu
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > SCROLL_THRESHOLD);
      
      // Update active link based on scroll position
      const sections = navLinks.map(link => link.href);
      const currentSection = sections.find(section => {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveLink(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveLink(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Get link icon mapping
  const getLinkIcon = (label: string) => {
    const iconMap: Record<string, any> = {
      'Accueil': Home,
      'Services': Briefcase,
      'Tarifs': Award,
      'Contact': Mail,
      'À propos': Info,
    };
    return iconMap[label] || Star;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.22, 1, 0.36, 1],
          type: "spring",
          stiffness: 100,
          damping: 25
        }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${scrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-b border-white/20' 
            : 'bg-transparent'
          }
        `}
        role="navigation"
        aria-label="Navigation principale"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: scrolled 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))'
              : 'linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05))',
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Glowing Border Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          animate={{
            background: scrolled
              ? 'linear-gradient(90deg, transparent, #6366F1, #8B5CF6, #EC4899, transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            opacity: scrolled ? 1 : 0.5,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Floating Particles in Navbar */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `radial-gradient(circle, ${i % 2 === 0 ? '#6366F1' : '#8B5CF6'}, transparent)`,
                left: `${10 + i * 15}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.3, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative">
          <div className="flex items-center justify-between" style={{ height: NAVBAR_HEIGHT }}>
            {/* Logo with Enhanced Animation */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="flex items-center gap-3 group relative"
              aria-label="UniversoItalia - Retour à l'accueil"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Logo Glow Effect */}
              <motion.div
                className="absolute -inset-4 rounded-2xl bg-primary-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-all duration-300"
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="w-7 h-7 text-white" />
                
                {/* Logo Pulse Animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-white/20"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <div className="flex flex-col">
                <motion.span
                  className={`text-2xl font-extrabold font-heading tracking-tight transition-colors ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  Universo
                  <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Italia
                  </span>
                </motion.span>
                <motion.span
                  className={`text-[10px] font-medium tracking-widest uppercase ${
                    scrolled ? 'text-gray-400' : 'text-white/60'
                  }`}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  Excellence & Innovation
                </motion.span>
              </div>
            </motion.a>

            {/* Desktop Navigation with Enhanced Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = getLinkIcon(link.label);
                const isActive = activeLink === link.href;
                
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`
                      relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                      flex items-center gap-2
                      ${scrolled 
                        ? 'text-gray-700 hover:text-primary-600' 
                        : 'text-white/90 hover:text-white'
                      }
                      ${isActive ? 'text-primary-600' : ''}
                    `}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover Background Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl -z-10 ${
                        scrolled ? 'bg-primary-50/50' : 'bg-white/10'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className={`
                  relative px-6 py-3 rounded-xl font-semibold
                  overflow-hidden group
                  ${scrolled
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40'
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button Shine Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Commencer</span>
                </span>
              </motion.a>
            </div>

            {/* Mobile Menu Button with Enhanced Styling */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                lg:hidden relative p-3 rounded-xl transition-all duration-300
                ${scrolled 
                  ? 'text-gray-900 hover:bg-primary-50' 
                  : 'text-white hover:bg-white/10'
                }
                ${isOpen ? 'bg-primary-50 text-primary-600' : ''}
              `}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
              
              {/* Notification Dot */}
              {!isOpen && (
                <motion.span
                  className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay with Enhanced Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel with Premium Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 200,
              opacity: { duration: 0.3 }
            }}
            className="fixed top-0 right-0 bottom-0 w-96 max-w-[90vw] z-50 bg-gradient-to-br from-white via-gray-50 to-purple-50/30 shadow-2xl lg:hidden overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobile"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
            </div>

            <div className="relative flex flex-col h-full p-8">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-2xl font-extrabold font-heading bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                    Menu
                  </span>
                  <span className="block text-xs text-gray-400 font-medium tracking-widest uppercase">
                    Navigation
                  </span>
                </motion.div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all"
                  aria-label="Fermer le menu"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Mobile Navigation Links with Enhanced Animation */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => {
                    const Icon = getLinkIcon(link.label);
                    return (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.1 + index * 0.08,
                          type: "spring",
                          stiffness: 100,
                          damping: 20
                        }}
                      >
                        <motion.a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link.href);
                          }}
                          className={`
                            flex items-center gap-4 px-5 py-4 rounded-2xl
                            text-gray-700 font-medium hover:text-primary-600
                            transition-all duration-300 group
                            ${activeLink === link.href 
                              ? 'bg-gradient-to-r from-primary-50 to-purple-50 text-primary-600' 
                              : 'hover:bg-gray-50'
                            }
                          `}
                          whileHover={{ 
                            x: 10,
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className={`
                              w-10 h-10 rounded-xl flex items-center justify-center
                              ${activeLink === link.href
                                ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white'
                                : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600'
                              }
                              transition-all duration-300
                            `}
                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="w-5 h-5" />
                          </motion.div>
                          <span>{link.label}</span>
                          
                          {activeLink === link.href && (
                            <motion.div
                              className="ml-auto w-2 h-2 rounded-full bg-primary-500"
                              animate={{
                                scale: [1, 1.5, 1],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                              }}
                            />
                          )}
                        </motion.a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Mobile Footer with CTA and Social */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Commencer votre projet</span>
                </motion.a>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-200">
                  {[
                    { icon: Globe, label: 'Website' },
                    { icon: Users, label: 'Community' },
                    { icon: Star, label: 'Reviews' },
                    { icon: Zap, label: 'Updates' },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-primary-100 hover:text-primary-600 transition-all"
                      whileHover={{ 
                        scale: 1.15,
                        y: -2,
                        rotate: [0, -5, 5, 0],
                      }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>

                {/* Version Info */}
                <p className="text-center text-xs text-gray-400 font-medium">
                  © 2024 UniversoItalia • v2.0.0
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;