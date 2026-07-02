import { motion, useInView } from 'framer-motion';
import { 
  TrendingUp, Users, Award, Clock, Sparkles, 
  Zap, Crown, Rocket, Target, BarChart,
  Globe, Shield, CheckCircle, Star 
} from 'lucide-react';
import { statisticsContent } from '../data/content';
import { useEffect, useRef, useState } from 'react';

// Enhanced constants
const ANIMATION_DURATION = 0.6;
const ANIMATION_DELAY_STEP = 0.1;
const VIEWPORT_MARGIN = '-50px';

// Enhanced stat icon mapping with colors
const statIconMap: Record<string, { icon: any; color: string; gradient: string }> = {
  'projects': { 
    icon: TrendingUp, 
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-500'
  },
  'clients': { 
    icon: Users, 
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-pink-500'
  },
  'experience': { 
    icon: Award, 
    color: 'text-yellow-400',
    gradient: 'from-yellow-500 to-orange-500'
  },
  'support': { 
    icon: Clock, 
    color: 'text-green-400',
    gradient: 'from-green-500 to-emerald-500'
  },
  'success': { 
    icon: Target, 
    color: 'text-red-400',
    gradient: 'from-red-500 to-pink-500'
  },
  'growth': { 
    icon: BarChart, 
    color: 'text-indigo-400',
    gradient: 'from-indigo-500 to-purple-500'
  },
  'global': { 
    icon: Globe, 
    color: 'text-cyan-400',
    gradient: 'from-cyan-500 to-blue-500'
  },
  'security': { 
    icon: Shield, 
    color: 'text-emerald-400',
    gradient: 'from-emerald-500 to-teal-500'
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
  const Icon = stat.icon;
  
  // Get dynamic icon styling
  const getIconStyle = (label: string) => {
    const key = Object.keys(statIconMap).find(k => 
      label.toLowerCase().includes(k) || stat.label?.toLowerCase().includes(k)
    );
    return key ? statIconMap[key] : { 
      icon: Star, 
      color: 'text-primary-400',
      gradient: 'from-primary-500 to-purple-500'
    };
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
          <StatIcon className="w-10 h-10 text-white" />
          
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
          boxShadow: isHovered ? `0 0 40px rgba(99, 102, 241, 0.2)` : 'none',
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
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-indigo-900 to-purple-900" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 100, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
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
      </div>

      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6 shadow-lg shadow-black/10"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(255,255,255,0.05)',
                '0 0 40px rgba(255,255,255,0.1)',
                '0 0 20px rgba(255,255,255,0.05)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="flex items-center gap-2">
              <span className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
                <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
              </span>
              {statisticsContent.badge || "En Direct"}
              <Sparkles size={14} className="text-yellow-400" />
            </span>
          </motion.span>

          {/* Heading with Gradient Text */}
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {statisticsContent.heading}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Nos Chiffres Clés
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg text-white/70 max-w-2xl mx-auto"
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
                  ? 'bg-white/20 backdrop-blur-sm text-white shadow-lg shadow-black/20 border border-white/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/90 border border-white/10'
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
                  className="w-8 h-8 rounded-full border-2 border-white/20 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold"
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
                  className="w-4 h-4 text-yellow-400"
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
}> = ({ end, suffix = '', label = '', delay = 0 }) => {
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