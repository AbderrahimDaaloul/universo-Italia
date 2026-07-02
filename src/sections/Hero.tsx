import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react';
import { heroContent } from '../data/content';

/**
 * Hero Section
 * Premium hero with gradient background, animated elements, photo, and stats
 */
const Hero = () => {
  const floatSlow: { animate: { y: number[]; transition: { duration: number; repeat: number; ease: 'easeInOut' } } } = {
    animate: {
      y: [0, -14, 0],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      aria-label="Section héro"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200/5 rounded-full blur-3xl"
          />
          {/* Subtle Italian flag color hints */}
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-10 right-1/3 w-72 h-72 bg-italian-green/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            className="absolute bottom-20 left-1/3 w-72 h-72 bg-italian-red/20 rounded-full blur-3xl"
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/30 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6 shadow-lg shadow-black/10"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Sparkles size={16} className="text-accent-300" />
              </motion.span>
              {heroContent.badge}
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            >
              {heroContent.title}{' '}
              <span className="relative inline-block">
                <span className="text-gradient-accent bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                  {heroContent.titleHighlight}
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute bottom-2 left-0 h-1 bg-accent-400/50 rounded-full"
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {heroContent.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={heroContent.ctaPrimary.href}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white group shadow-xl shadow-black/20 hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {heroContent.ctaPrimary.text}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={heroContent.ctaSecondary.href}
                className="btn-outline text-lg px-8 py-4 group"
              >
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-2 group-hover:bg-white/20 transition-colors">
                  <Play size={14} className="ml-0.5" />
                </span>
                {heroContent.ctaSecondary.text}
              </motion.a>
            </motion.div>

            {/* Trust Signal - Avatar Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <div className="flex -space-x-3">
                {['https://img.magnific.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg?semt=ais_test_b&w=740&q=80', 'https://img.magnific.com/free-photo/young-student-man-wearing-sunglasses-holding-colorful-folders-showing-thumb-up-blue_176532-13862.jpg?semt=ais_test_b&w=740&q=80', 'https://img.magnific.com/free-photo/young-student-woman-wearing-sunglasses-holding-colorful-folders-showing-thumb-up-green_176532-13863.jpg?semt=ais_test_b&w=740&q=80', 'https://img.magnific.com/free-photo/young-student-man-wearing-sunglasses-holding-colorful-folders-showing-thumb-up-yellow_176532-13864.jpg?semt=ais_test_b&w=740&q=80'].map(
                  (src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Étudiant accompagné"
                      className="w-9 h-9 rounded-full border-2 border-slate-800 object-cover"
                    />
                  )
                )}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-accent-300 text-accent-300" />
                  ))}
                </div>
                <div className="text-white/70 text-xs">Rejoint par 500+ étudiants</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Photo + Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-[110%] max-w-none ml-auto pr-8">
              <motion.div
                whileHover={{ rotateY: 4, rotateX: -2 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-white/10"
              >
                <img
                  src="https://mozcp.truetrips.com/wp-content/uploads/2025/06/Rome_hero.jpg"
                  alt="Étudier en Italie"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent" />
                {/* Italian flag accent strip */}
                <div className="absolute top-0 left-0 w-full h-1.5 flex">
                  <div className="flex-1 bg-italian-green" />
                  <div className="flex-1 bg-white" />
                  <div className="flex-1 bg-italian-red" />
                </div>
              </motion.div>

              {/* Floating photo badges around the border */}
              <motion.div
                variants={floatSlow}
                animate="animate"
                className="absolute -top-4 left-10 glass rounded-2xl p-2 shadow-xl bg-white/95 backdrop-blur"
              >
                <img
                  src="https://img.magnific.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg?semt=ais_test_b&w=740&q=80"
                  alt="Étudiante"
                  className="w-11 h-11 rounded-xl object-cover"
                />
              </motion.div>

              <motion.div
                variants={floatSlow}
                animate="animate"
                transition={{ delay: 0.8 }}
                className="absolute top-20 -left-6 glass rounded-2xl p-2 shadow-xl bg-white/95 backdrop-blur"
              >
                <img
                  src="https://img.magnific.com/free-photo/young-student-man-wearing-sunglasses-holding-colorful-folders-showing-thumb-up-blue_176532-13862.jpg?semt=ais_test_b&w=740&q=80"
                  alt="Étudiant"
                  className="w-10 h-10 rounded-xl object-cover"
                />
              </motion.div>

              <motion.div
                variants={floatSlow}
                animate="animate"
                transition={{ delay: 1.2 }}
                className="absolute top-1/3 -right-6 glass rounded-2xl p-2 shadow-xl bg-white/95 backdrop-blur"
              >
                <img
                  src="https://img.magnific.com/free-photo/young-student-woman-wearing-sunglasses-holding-colorful-folders-showing-thumb-up-green_176532-13863.jpg?semt=ais_test_b&w=740&q=80"
                  alt="Étudiante"
                  className="w-11 h-11 rounded-xl object-cover"
                />
              </motion.div>

              <motion.div
                variants={floatSlow}
                animate="animate"
                transition={{ delay: 1.8 }}
                className="absolute bottom-24 -left-4 glass rounded-2xl p-2 shadow-xl bg-white/95 backdrop-blur"
              >
                <img
                  src="https://img.magnific.com/free-photo/young-student-man-wearing-sunglasses-holding-colorful-folders-showing-thumb-up-yellow_176532-13864.jpg?semt=ais_test_b&w=740&q=80"
                  alt="Étudiant"
                  className="w-10 h-10 rounded-xl object-cover"
                />
              </motion.div>

              <motion.div
                variants={floatSlow}
                animate="animate"
                transition={{ delay: 2.2 }}
                className="absolute bottom-10 right-8 glass rounded-2xl p-2 shadow-xl bg-white/95 backdrop-blur"
              >
                <img
                  src="https://mozcp.truetrips.com/wp-content/uploads/2025/06/Rome_hero.jpg"
                  alt="Italie"
                  className="w-11 h-11 rounded-xl object-cover"
                />
              </motion.div>
            </div>

          </motion.div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 12] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;