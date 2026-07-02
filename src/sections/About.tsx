import { motion } from 'framer-motion';
import {
  CheckCircle,
  ArrowRight,
  Award,
  Users,
  Globe,
  GraduationCap,
  Star,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { aboutContent } from '../data/content';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * About Section
 * Showcases company values and key features
 */
const About = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const floatY: { animate: { y: number[]; transition: { duration: number; repeat: number; ease: 'easeInOut' } } } = {
    animate: {
      y: [0, -12, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section
      id="about"
      className="section-padding bg-gradient-to-b from-white via-primary-50/30 to-gray-50 relative overflow-hidden"
      aria-label="À propos de nous"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/60 via-primary-50/30 to-transparent pointer-events-none" />
      <motion.div
        variants={floatY}
        animate="animate"
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary-200/30 blur-3xl pointer-events-none"
      />
      <motion.div
        variants={floatY}
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-italian-green/10 blur-3xl pointer-events-none"
      />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4 shadow-sm"
          >
            <Sparkles size={14} className="text-primary-500" />
            {aboutContent.sectionTitle}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight">
            {aboutContent.heading}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Visual Content (Photo Collage + Stats) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              {/* Main photo */}
              <img
                src="https://plantisima.com/wp-content/uploads/2024/12/University-of-Bologna-Italy.jpg.webp"
                alt="Campus universitaire en Italie"
                className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay for readability + Italian flag colors accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />
              <div className="absolute top-0 left-0 w-full h-1.5 flex">
                <div className="flex-1 bg-italian-green" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-italian-red" />
              </div>

              {/* Overlaid stat cards */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-3 gap-3">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-4 text-center backdrop-blur-md bg-white/90"
                  >
                    <Award className="w-7 h-7 text-primary-600 mx-auto mb-1.5" />
                    <div className="text-xl font-bold text-primary-700">8+</div>
                    <div className="text-[11px] text-gray-600 mt-0.5 leading-tight">
                      Ans d'Expérience
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-4 text-center backdrop-blur-md bg-white/90"
                  >
                    <Users className="w-7 h-7 text-primary-600 mx-auto mb-1.5" />
                    <div className="text-xl font-bold text-primary-700">500+</div>
                    <div className="text-[11px] text-gray-600 mt-0.5 leading-tight">
                      Étudiants Satisfaits
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-4 text-center backdrop-blur-md bg-white/90"
                  >
                    <Globe className="w-7 h-7 text-primary-600 mx-auto mb-1.5" />
                    <div className="text-xl font-bold text-primary-700">50+</div>
                    <div className="text-[11px] text-gray-600 mt-0.5 leading-tight">
                      Universités Partenaires
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Small floating secondary photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
              animate={
                isVisible
                  ? { opacity: 1, scale: 1, rotate: -6 }
                  : { opacity: 0, scale: 0.85, rotate: -6 }
              }
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="hidden md:block absolute -top-8 -left-8 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
            >
              <img
                src="https://www.continents.us/wp-content/uploads/2024/01/Studying-Abroad-Made-Simple-OTHM-Guide-International-Students-1024x585.jpg"
                alt="Étudiants internationaux"
                className="w-full h-full object-cover"
              />
            </motion.div>

           

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="hidden lg:flex absolute top-6 right-6 items-center gap-1 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 shadow-lg"
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs font-semibold text-gray-700 ml-1">4.9/5</span>
            </motion.div>
          </motion.div>

          {/* Right - Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center gap-2 text-primary-600 font-medium mb-4"
            >
              <MapPin size={18} />
              <span className="text-sm">Basés en Italie, à votre service partout</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-600 leading-relaxed mb-8"
            >
              {aboutContent.description}
            </motion.p>

            {/* Features List */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              className="space-y-4 mb-8"
            >
              {aboutContent.features.map((feature) => (
                <motion.li
                  key={feature}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 group cursor-default"
                >
                  <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                    <CheckCircle className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Mini credential strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-3 mb-8 text-sm text-gray-500"
            >
              <GraduationCap size={20} className="text-primary-600" />
              <span>Accompagnement de A à Z : visa, logement, inscription universitaire</span>
            </motion.div>

            {/* CTA */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={aboutContent.cta.href}
              className="btn-primary group inline-flex shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 transition-shadow"
            >
              {aboutContent.cta.text}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;