import { motion, useInView } from 'framer-motion';
import { Check, Star, ArrowRight, Sparkles, Zap, Crown, Rocket } from 'lucide-react';
import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import { pricingContent, type PricingPlan } from '../data/content';

// Enhanced constants
const ANIMATION_DURATION = 0.6;
const ANIMATION_DELAY_STEP = 0.12;
const VIEWPORT_MARGIN = '-50px';

// Gradient color schemes for cards
const cardGradients = {
  popular: 'from-violet-600 via-purple-600 to-indigo-700',
  starter: 'from-blue-50 via-cyan-50 to-white',
  professional: 'from-indigo-50 via-purple-50 to-white',
  enterprise: 'from-violet-50 via-fuchsia-50 to-white',
};

// Icon mapping
const planIcons: Record<string, ReactElement> = {
  'Starter': <Sparkles className="w-6 h-6" />,
  'Professional': <Zap className="w-6 h-6" />,
  'Enterprise': <Crown className="w-6 h-6" />,
  'Premium': <Rocket className="w-6 h-6" />,
};

/**
 * Individual Pricing Card Component with Enhanced UI
 */
const PricingCard: React.FC<{ plan: PricingPlan; index: number }> = ({ plan, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  // Determine gradient based on plan name
  const getGradient = () => {
    if (plan.popular) return cardGradients.popular;
    if (plan.name.includes('Starter')) return cardGradients.starter;
    if (plan.name.includes('Professional')) return cardGradients.professional;
    if (plan.name.includes('Enterprise')) return cardGradients.enterprise;
    return cardGradients.starter;
  };

  const getIcon = () => {
    const key = Object.keys(planIcons).find(k => plan.name.includes(k));
    return key ? planIcons[key] : <Sparkles className="w-6 h-6" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      transition={{ 
        duration: ANIMATION_DURATION, 
        delay: index * ANIMATION_DELAY_STEP,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      whileHover={{ 
        y: -12,
        scale: plan.popular ? 1.08 : 1.03,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsGlowing(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsGlowing(false);
      }}
      className={`
        relative rounded-3xl p-8 lg:p-10
        transition-all duration-500 ease-out
        ${plan.popular 
          ? `bg-gradient-to-br ${getGradient()} text-white shadow-2xl`
          : `bg-gradient-to-br ${getGradient()} border-2 border-gray-200/50 shadow-xl backdrop-blur-sm`
        }
        ${plan.popular ? 'scale-105 lg:scale-110' : ''}
        ${isGlowing && plan.popular ? 'shadow-[0_0_40px_rgba(139,92,246,0.4)]' : ''}
        ${!plan.popular && isHovered ? 'border-primary-300 shadow-2xl shadow-primary-200/30' : ''}
      `}
      role="article"
      aria-label={`${plan.name} pricing plan`}
    >
      {/* Animated Background Glow */}
      {plan.popular && (
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0"
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.6), transparent 70%)',
          }}
        />
      )}

      {/* Floating Particles for Popular Plan */}
      {plan.popular && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* Animated Popular Badge */}
      {plan.popular && (
        <motion.div 
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold shadow-lg shadow-orange-500/30"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: ['0 0 20px rgba(251, 191, 36, 0.3)', '0 0 40px rgba(251, 191, 36, 0.6)', '0 0 20px rgba(251, 191, 36, 0.3)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Star size={16} fill="currentColor" />
            </motion.div>
            {plan.badge}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles size={14} />
            </motion.div>
          </motion.span>
        </motion.div>
      )}

      {/* Plan Icon */}
      <motion.div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
          plan.popular 
            ? 'bg-white/20 backdrop-blur-sm' 
            : 'bg-gradient-to-br from-primary-100 to-purple-100'
        }`}
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={plan.popular ? 'text-white' : 'text-primary-600'}>
          {getIcon()}
        </div>
      </motion.div>

      {/* Plan Name & Subtitle */}
      <div className="mb-6">
        <h3
          className={`text-2xl font-bold mb-2 ${
            plan.popular ? 'text-white' : 'text-gray-900'
          }`}
        >
          {plan.name}
        </h3>
        <motion.p
          className={`text-sm font-medium ${
            plan.popular ? 'text-white/80' : 'text-primary-600'
          }`}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {plan.subtitle}
        </motion.p>
      </div>

      {/* Enhanced Price Display */}
      {plan.price && (
        <motion.div 
          className="mb-6 p-4 rounded-2xl bg-black/5 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-baseline gap-1">
            <span
              className={`text-4xl font-extrabold ${
                plan.popular ? 'text-white' : 'text-gray-900'
              }`}
            >
              {plan.price.currency}{plan.price.amount}
            </span>
            <span
              className={`text-sm ${
                plan.popular ? 'text-white/70' : 'text-gray-500'
              }`}
            >
              /{plan.price.period}
            </span>
          </div>
        </motion.div>
      )}

      {/* Description */}
      <p
        className={`text-sm leading-relaxed mb-6 ${
          plan.popular ? 'text-white/80' : 'text-gray-600'
        }`}
      >
        {plan.description}
      </p>

      {/* Features List with Enhanced Animations */}
      <ul className="space-y-3.5 mb-8">
        {plan.features.map((feature, idx) => (
          <motion.li
            key={feature}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
            whileHover={{ x: 5 }}
          >
            <motion.div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                plan.popular 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'bg-gradient-to-br from-primary-400 to-purple-400'
              }`}
              whileHover={{ scale: 1.2, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Check
                size={14}
                className={plan.popular ? 'text-white' : 'text-white'}
                strokeWidth={3}
              />
            </motion.div>
            <span
              className={`text-sm ${
                plan.popular ? 'text-white/90' : 'text-gray-700'
              }`}
            >
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Enhanced CTA Button */}
      <motion.a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all duration-300 group relative overflow-hidden ${
          plan.popular
            ? 'bg-white text-purple-700 hover:text-purple-800 shadow-lg shadow-white/30'
            : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700 shadow-md hover:shadow-xl'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Button Shine Effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        <span className="relative z-10 flex items-center gap-2">
          {plan.cta}
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </span>
      </motion.a>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-20">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
      </div>
      <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden opacity-20">
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
    </motion.div>
  );
};

/**
 * Enhanced Pricing Section with Stunning UI
 */
const Pricing = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN });
  return (
    <section
      id="pricing"
      className="section-padding bg-gradient-to-br from-gray-50 via-white to-purple-50/30 relative overflow-hidden"
      aria-label="Nos tarifs"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"
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
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-300/10 to-violet-300/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold mb-6 shadow-lg shadow-purple-200/30"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: ['0 0 20px rgba(147, 51, 234, 0.1)', '0 0 40px rgba(147, 51, 234, 0.2)', '0 0 20px rgba(147, 51, 234, 0.1)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={16} className="text-purple-500" />
            {pricingContent.sectionTitle}
            <Sparkles size={16} className="text-purple-500" />
          </motion.span>

          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 max-w-4xl mx-auto leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {pricingContent.heading}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}Perfect Fit
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {pricingContent.description}
          </motion.p>

       
        </motion.div>

        {/* Pricing Grid with Masonry Effect */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-stretch"
          layout
        >
          {pricingContent.plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;