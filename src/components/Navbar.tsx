import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Sparkles,
  Home, Info, Briefcase, Award, Mail, Star
} from 'lucide-react';
import { navLinks } from '../data/content';
import logo1 from '../assets/logo1.png';

// Enhanced constants
const NAVBAR_HEIGHT = 96;
const SCROLL_THRESHOLD = 20;

/**
 * Responsive navigation bar with premium UI
 * Features animated glassmorphism, hover effects, and mobile menu
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');

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
            ? 'bg-[#072A18]/85 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/10'
            : 'bg-transparent'
          }
        `}
        role="navigation"
        aria-label="Navigation principale"
      >
        {/* Animated Gradient Background — blends into hero at top, frosted burgundy when scrolled */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: scrolled
              ? 'linear-gradient(135deg, rgba(13,61,36,0.92), rgba(7,42,24,0.82))'
              : 'linear-gradient(180deg, rgba(2,16,10,0.35), rgba(2,16,10,0))',
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Glowing Border Effect — Italian tricolore */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          animate={{
            background: scrolled
              ? 'linear-gradient(90deg, transparent, #008C45, #FFFFFF, #CD212A, transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            opacity: scrolled ? 1 : 0.4,
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
                background: `radial-gradient(circle, ${i % 2 === 0 ? '#008C45' : '#CD212A'}, transparent)`,
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
                className="absolute -inset-4 rounded-2xl bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="relative w-24 h-16 lg:w-36 lg:h-20 flex items-center justify-center transition-all duration-300"
                whileHover={{
                  rotate: [0, -5, 5, 0],
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={logo1}
                  alt="Logo UniversoItalia"
                  className="w-full h-full object-contain"
                />
              </motion.div>
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
                    data-active={isActive}
                    className={`
                      nav-underline relative px-5 py-2.5 rounded-xl font-medium tracking-wide transition-all duration-300
                      flex items-center gap-2
                      ${isActive ? 'text-primary-300' : 'text-parchment/85 hover:text-primary-200'}
                    `}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}

                    {/* Hover Background Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl -z-10 bg-primary-500/10"
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
                className="relative px-6 py-3 rounded-full font-semibold overflow-hidden group text-primary-800 bg-white shadow-lg shadow-black/20 hover:shadow-white/30 transition-shadow border border-white/60"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button Shine Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-italian-red" />
                  <span>Commencer</span>
                </span>
              </motion.a>
            </div>

            {/* Mobile Menu Button with Enhanced Styling */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                lg:hidden relative p-3 rounded-xl transition-all duration-300
                text-parchment hover:bg-primary-500/10
                ${isOpen ? 'bg-primary-500/15 text-primary-200' : ''}
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
                  className="absolute top-1 right-1 w-2 h-2 bg-italian-red rounded-full"
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
            className="fixed top-0 right-0 bottom-0 w-96 max-w-[90vw] z-50 bg-gradient-to-b from-[#0D3D24] via-[#072A18] to-[#02100A] backdrop-blur-xl border-l border-white/10 shadow-2xl lg:hidden overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobile"
          >
            {/* Tricolore accent on the leading edge */}
            <div className="absolute top-0 left-0 h-full w-1 flex flex-col z-20">
              <span className="flex-1 bg-italian-green" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-italian-red" />
            </div>

            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute -top-32 -right-32 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent-600/12 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 4, repeat: Infinity }}
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
                  <span className="text-2xl font-extrabold font-heading text-cream-shimmer bg-size-200">
                    Menu
                  </span>
                  <span className="block text-xs text-parchment/60 font-medium tracking-widest uppercase">
                    Navigation
                  </span>
                </motion.div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl text-parchment/80 hover:bg-white/10 hover:text-white transition-all"
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
                            text-parchment/85 font-medium tracking-wide hover:text-white
                            transition-all duration-300 group
                            ${activeLink === link.href
                              ? 'bg-white/10 text-white'
                              : 'hover:bg-white/5'
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
                                ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white'
                                : 'bg-white/10 text-parchment/70 group-hover:bg-primary-600 group-hover:text-white'
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
                              className="ml-auto w-2 h-2 rounded-full bg-italian-red"
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

              {/* Mobile Footer — CTA only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* CTA Button — matches desktop white pill */}
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  className="relative w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-white text-primary-800 font-semibold border border-white/60 shadow-lg shadow-black/20 hover:shadow-white/30 overflow-hidden group transition-shadow"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Sparkles className="relative w-5 h-5 text-italian-red" />
                  <span className="relative">Commencer votre projet</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;