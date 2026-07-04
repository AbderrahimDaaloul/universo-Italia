import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  TrendingUp, Users, Award, Clock, Sparkles,
  Target, BarChart,
  Globe, Shield, Star
} from 'lucide-react';
import { statisticsContent } from '../data/content';
import { useEffect, useRef, useState } from 'react';
import { OliveBranch, MARBLE_VEINS } from '../components/ItalianDecor';

// Enhanced constants
const ANIMATION_DURATION = 0.6;
const ANIMATION_DELAY_STEP = 0.1;
const VIEWPORT_MARGIN = '-50px';

// Enhanced stat icon mapping with colors
const statIconMap: Record<string, { icon: any; color: string; gradient: string }> = {
  'projects': {
    icon: TrendingUp,
    color: 'text-primary-300',
    gradient: 'from-primary-500 to-primary-700'
  },
  'clients': {
    icon: Users,
    color: 'text-primary-300',
    gradient: 'from-primary-500 to-primary-600'
  },
  'experience': {
    icon: Award,
    color: 'text-accent-300',
    gradient: 'from-accent-500 to-accent-700'
  },
  'support': {
    icon: Clock,
    color: 'text-olive-light',
    gradient: 'from-olive-light to-olive-dark'
  },
  'success': {
    icon: Target,
    color: 'text-accent-300',
    gradient: 'from-accent-500 to-tuscan'
  },
  'growth': {
    icon: BarChart,
    color: 'text-primary-300',
    gradient: 'from-primary-500 to-primary-700'
  },
  'global': {
    icon: Globe,
    color: 'text-accent-300',
    gradient: 'from-accent-500 to-tuscan-dark'
  },
  'security': {
    icon: Shield,
    color: 'text-olive-light',
    gradient: 'from-olive to-olive-dark'
  },
};

/**
 * Individual Stat Card Component with Enhanced UI
 */
const StatCard: React.FC<{ 
  stat: any; 
  index: number; 
  isVisible: boolean;
}> = ({ stat, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Balanced Italian palette rotated per card so the row isn't monotone green
  const tilePalette = [
    { color: 'text-white', gradient: 'from-primary-400 to-primary-700' },    // green tile
    { color: 'text-primary-700', gradient: 'from-white to-primary-100' },    // white tile
    { color: 'text-white', gradient: 'from-accent-500 to-accent-700' },      // red tile
    { color: 'text-white', gradient: 'from-primary-500 to-olive-dark' },     // green/olive tile
  ];

  // Get dynamic icon styling (keep mapped icon, rotate the tile colour by index)
  const getIconStyle = (label: string) => {
    const key = Object.keys(statIconMap).find(k =>
      label.toLowerCase().includes(k) || stat.label?.toLowerCase().includes(k)
    );
    const base = key ? statIconMap[key] : { icon: Star };
    const palette = tilePalette[index % tilePalette.length];
    return { icon: base.icon, ...palette };
  };

  const iconStyle = getIconStyle(stat.label);
  const StatIcon = iconStyle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: ANIMATION_DURATION, 
        delay: index * ANIMATION_DELAY_STEP,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      whileHover={{ 
        y: -10,
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glass Effect Card */}
      <div className={`
        relative rounded-3xl p-8 lg:p-10
        backdrop-blur-xl
        bg-white/10
        border border-white/20
        shadow-2xl
        transition-all duration-500
        ${isHovered ? 'bg-white/20 border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.3)]' : ''}
      `}>
        {/* Animated Background Glow */}
        <motion.div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${iconStyle.gradient} opacity-0`}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              animate={{
                x: [0, Math.random() * 80 - 40, 0],
                y: [0, Math.random() * 80 - 40, 0],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
            />
          ))}
        </div>

        {/* Icon with Animation */}
        <motion.div
          className={`
            relative z-10 w-20 h-20 rounded-2xl
            bg-gradient-to-br ${iconStyle.gradient}
            flex items-center justify-center mx-auto mb-6
            shadow-lg shadow-white/10
            ${isHovered ? 'shadow-2xl shadow-white/20' : ''}
          `}
          whileHover={{ 
            rotate: [0, -10, 10, 0],
            scale: 1.1,
          }}
          transition={{ duration: 0.5 }}
        >
          <StatIcon className={`w-10 h-10 ${iconStyle.color}`} />
          
          {/* Icon Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-white/20"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Counter with Enhanced Styling */}
        <div className="relative z-10 text-center">
          <motion.div
            className="text-5xl lg:text-6xl font-extrabold text-white mb-2"
            style={{
              textShadow:
                index % 2 === 0
                  ? '0 0 24px rgba(0,140,69,0.55), 0 2px 4px rgba(0,0,0,0.35)'
                  : '0 0 24px rgba(205,33,42,0.5), 0 2px 4px rgba(0,0,0,0.35)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <AnimatedCounter
              end={stat.value}
              suffix={stat.suffix}
              delay={0.3 + index * 0.1}
            />
          </motion.div>

          {/* Label with Icon */}
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <span className="text-white/80 font-medium text-sm lg:text-base">
              {stat.label}
            </span>
            {stat.badge && (
              <motion.span
                className="px-2 py-0.5 rounded-full bg-white/20 text-white/90 text-xs font-semibold"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                {stat.badge}
              </motion.span>
            )}
          </motion.div>

          {/* Optional description */}
          {stat.description && (
            <motion.p
              className="text-white/60 text-xs mt-2"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {stat.description}
            </motion.p>
          )}
        </div>

        {/* Decorative Corner */}
        <div className="absolute -top-3 -right-3 w-16 h-16 overflow-hidden opacity-10">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${iconStyle.gradient} rounded-full translate-x-1/2 -translate-y-1/2`} />
        </div>
        <div className="absolute -bottom-3 -left-3 w-16 h-16 overflow-hidden opacity-10">
          <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br ${iconStyle.gradient} rounded-full -translate-x-1/2 translate-y-1/2`} />
        </div>
      </div>

      {/* Glowing Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
        animate={{
          boxShadow: isHovered ? `0 0 40px rgba(0, 140, 69, 0.35)` : 'none',
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

/**
 * Enhanced Statistics Section with Stunning UI
 */
const Statistics = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yVeins = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const [activeView, setActiveView] = useState('all');

  // View options
  const viewOptions = [
    { id: 'all', label: 'Toutes' },
    { id: 'achievements', label: 'Réalisations' },
    { id: 'impact', label: 'Impact' },
    { id: 'growth', label: 'Croissance' },
  ];

  return (
    <section
      id="statistics"
      className="section-padding relative overflow-hidden"
      aria-label="Nos statistiques"
    >
      {/* ============ Layered luxury background — deep Tuscan green ============ */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D3D24] via-[#072A18] to-[#02100A]" />
      {/* Rich green glow from the top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -10%, rgba(0,140,69,0.34), rgba(0,89,47,0.1) 45%, transparent 70%)',
        }}
      />

      {/* Parallax marble veins */}
      <motion.div
        aria-hidden="true"
        style={{ y: yVeins, backgroundImage: MARBLE_VEINS, backgroundSize: 'cover' }}
        className="absolute -inset-x-10 -top-10 bottom-0 opacity-[0.07] animate-drift-slow pointer-events-none"
      />

      {/* Animated green / red glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/22 rounded-full blur-3xl"
          animate={{ x: [0, 100, -100, 0], y: [0, -100, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-700/12 rounded-full blur-3xl"
          animate={{ x: [0, -100, 100, 0], y: [0, 100, -100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-500/10 to-olive/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating cream motes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            animate={{ y: [0, -100, 0], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Olive branches */}
        <OliveBranch className="absolute top-16 left-6 w-56 opacity-20 animate-leaf-sway hidden md:block" />
        <OliveBranch className="absolute bottom-12 right-8 w-64 opacity-15 -scale-x-100 animate-leaf-sway hidden md:block" />
      </div>

      {/* Vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(100% 100% at 50% 45%, transparent 55%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <motion.span
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-sm border border-primary-500/30 text-parchment/90 text-sm font-medium mb-6 shadow-lg shadow-black/20"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(0,140,69,0.08)',
                '0 0 40px rgba(0,140,69,0.18)',
                '0 0 20px rgba(0,140,69,0.08)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="flex items-center gap-2">
              <span className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-italian-green inline-block" />
                <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-italian-green animate-ping" />
              </span>
              {statisticsContent.badge || "En Direct"}
              <Sparkles size={14} className="text-italian-red" />
            </span>
          </motion.span>

          {/* Heading with Gradient Text */}
          <motion.h2
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-parchment max-w-4xl mx-auto leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {statisticsContent.heading}
            <span className="block text-cream-shimmer bg-size-200 mt-1">
              Nos Chiffres Clés
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg text-parchment/70 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {statisticsContent.description || "Des résultats qui parlent d'eux-mêmes"}
          </motion.p>
        </motion.div>

        {/* View Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {viewOptions.map((view) => (
            <motion.button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`
                px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                ${activeView === view.id
                  ? 'bg-white text-primary-800 shadow-lg shadow-black/25 border border-white'
                  : 'bg-white/5 text-parchment/60 hover:bg-white/10 hover:text-parchment/90 border border-white/10'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {view.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Grid with Masonry Effect */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          layout
        >
          {statisticsContent.stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isVisible={isInView}
            />
          ))}
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Trust Indicators */}
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white/30 bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white text-xs font-bold"
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                >
                  {String.fromCharCode(64 + i)}
                </motion.div>
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium">
              <motion.span
                className="text-white font-bold"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                500+
              </motion.span>
              {' '}Entreprises nous font confiance
            </span>
          </div>

          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  className="w-4 h-4 text-italian-red"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium">
              <span className="text-white font-bold">4.9/5</span> Satisfaction client
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Animated Counter Component (Enhanced)
 */
const AnimatedCounter: React.FC<{
  end: number;
  suffix?: string;
  label?: string;
  delay?: number;
}> = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref}>
      <span className="text-5xl lg:text-6xl font-extrabold text-white">
        {count}
        {suffix}
      </span>
    </div>
  );
};

export default Statistics;