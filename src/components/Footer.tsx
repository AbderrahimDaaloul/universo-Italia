import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { footerContent } from '../data/content';
import { MARBLE_VEINS } from './ItalianDecor';
import logo1 from '../assets/logo1.png';

/**
 * Dark themed footer with contact info, links, and newsletter
 */
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#0D3D24] via-[#072A18] to-[#02100A] text-white relative overflow-hidden">
      {/* Italian tricolore top strip */}
      <div className="tricolore-strip absolute top-0 left-0 z-20 animate-tricolore">
        <span className="bg-italian-green" />
        <span className="bg-white" />
        <span className="bg-italian-red" />
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Faint marble veins for luxury texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: MARBLE_VEINS, backgroundSize: 'cover' }}
        />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-16 lg:py-20">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <a href="#hero" className="inline-flex items-center mb-4 group">
              <img
                src={logo1}
                alt="Logo UniversoItalia"
                className="h-20 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </a>
            <p className="text-parchment/70 text-sm leading-relaxed mb-6">
              {footerContent.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, href: '#', label: 'Facebook' },
                { icon: FaInstagram, href: '#', label: 'Instagram' },
                { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-parchment/80 hover:bg-primary-600 hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-3">
              {footerContent.services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#services');
                    }}
                    className="text-parchment/70 hover:text-white text-sm transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-3">
              {footerContent.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-parchment/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contactez-Nous</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${footerContent.contact.phone}`}
                  className="text-parchment/70 hover:text-white text-sm transition-colors"
                >
                  {footerContent.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${footerContent.contact.email}`}
                  className="text-parchment/70 hover:text-white text-sm transition-colors"
                >
                  {footerContent.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-parchment/70 text-sm">{footerContent.contact.address}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-parchment/50 text-sm text-center sm:text-left">
            {footerContent.copyright}
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-accent-600 flex items-center justify-center text-white hover:bg-accent-700 shadow-lg shadow-accent-600/25 transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;