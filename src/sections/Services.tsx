import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { servicesContent, type Service } from '../data/content';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Helper for beautiful fallback gradients if an image is missing
const getFallbackGradient = (id: number) => {
  const gradients = [
    'from-primary-400 via-primary-500 to-primary-700',
    'from-primary-500 via-emerald-400 to-primary-600',
    'from-accent-400 via-accent-500 to-accent-700',
    'from-primary-500 via-cream-200 to-accent-500',
  ];
  return gradients[(id - 1) % gradients.length];
};

// Animation Variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
    },
  }),
};

const detailVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: i * 0.05,
      ease: 'easeOut' as const,
    },
  }),
};

/**
 * Individual Service Card Component
 */
const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={cardVariants}
      className="group relative bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-primary-200/40 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col overflow-hidden"
    >
      {/* Italian flag accent strip */}
      <div className="tricolore-strip absolute top-0 left-0 z-20 opacity-90">
        <span className="bg-italian-green" />
        <span className="bg-white" />
        <span className="bg-italian-red" />
      </div>

      {/* Image Area */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          // Beautiful gradient fallback with subtle dot pattern
          <div className={`w-full h-full bg-gradient-to-br ${getFallbackGradient(service.id)} relative`}>
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        )}

        {/* Gradient Fade to blend image into the card body */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />

        {/* Service Number Watermark */}
        <div className="absolute top-4 right-4 text-6xl font-black text-white/30 group-hover:text-white/50 transition-colors duration-500 select-none pointer-events-none">
          {String(service.id).padStart(2, '0')}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative p-8 flex flex-col flex-grow">
        {/* Overlapping Icon Container */}
        <div className="absolute -top-8 left-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 z-20">
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Spacer to push text below the overlapping icon */}
        <div className="pt-8 mb-4 relative z-10">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            {service.title}
          </h3>
        </div>

        <p className="text-slate-600 leading-relaxed mb-6 relative z-10">
          {service.description}
        </p>

        {/* Details (expandable) */}
        {service.details && service.details.length > 0 && (
          <div className="relative z-10">
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-3 pl-4 border-l-2 border-primary-100">
                    {service.details.map((detail, i) => (
                      <motion.li 
                        key={detail} 
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={detailVariants}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <span className="w-2 h-2 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 mt-1.5 flex-shrink-0 ring-2 ring-primary-50" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md px-2 py-1 -ml-2"
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Voir moins' : 'En Savoir Plus'}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown size={16} className="text-primary-500 group-hover/btn:text-primary-700 transition-colors" />
              </motion.div>
            </button>
          </div>
        )}
        
        {/* Push button/details to the bottom if the card is in a grid */}
        <div className="flex-grow" />
      </div>
    </motion.div>
  );
};

/**
 * Services Section
 */
const Services = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-slate-50 overflow-hidden"
      aria-label="Nos services"
    >
      {/* Background Pattern & Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-200/40 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container-custom relative z-10 mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm text-slate-600 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            {servicesContent.sectionTitle}
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-primary-800 to-accent-800 max-w-3xl mx-auto leading-tight mb-6">
            {servicesContent.heading}
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {servicesContent.description}
          </p>
        </motion.div>

        {/* Note Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-lg shadow-slate-200/20 max-w-2xl mx-auto">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <Sparkles size={16} className="text-primary-600" />
            </div>
            <span className="text-sm text-slate-700 font-medium text-left">
              {servicesContent.note}
            </span>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesContent.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;