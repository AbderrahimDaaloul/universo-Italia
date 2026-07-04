import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';
import { heroContent } from '../data/content';
import { OliveBranch, MARBLE_VEINS } from '../components/ItalianDecor';
import HeroCarousel from '../components/HeroCarousel';

/**
 * Hero Section — luxury Italian aesthetic.
 * Layered deep-green background with marble veins, green glow, red accents,
 * olive-branch accents, gentle parallax and cream/green typography.
 */
const Hero = () => {
  const { scrollY } = useScroll();
  const yVeins = useTransform(scrollY, [0, 700], [0, 130]);
  const yGlow = useTransform(scrollY, [0, 700], [0, 70]);
  const yArch = useTransform(scrollY, [0, 700], [0, 40]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.55]);

  const scrollToSection = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const avatars = [
    'https://img.magnific.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg?semt=ais_test_b&w=740&q=80',
    'https://img.magnific.com/free-photo/young-student-man-wearing-sunglasses-holding-colorful-folders-showing-thumb-up-blue_176532-13862.jpg?semt=ais_test_b&w=740&q=80',
    'https://img.magnific.com/free-photo/young-student-woman-wearing-sunglasses-holding-colorful-folders-showing-thumb-up-green_176532-13863.jpg?semt=ais_test_b&w=740&q=80',
    'https://img.magnific.com/free-photo/young-student-man-wearing-sunglasses-holding-colorful-folders-showing-thumb-up-yellow_176532-13864.jpg?semt=ais_test_b&w=740&q=80',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
      aria-label="Section héro"
    >
      {/* ============ Layered luxury background — deep Tuscan green ============ */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D3D24] via-[#072A18] to-[#02100A]">
        {/* Rich green glow from the top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% -10%, rgba(0,140,69,0.38), rgba(0,89,47,0.12) 45%, transparent 70%)',
          }}
        />

        {/* Parallax marble veins */}
        <motion.div
          aria-hidden="true"
          style={{ y: yVeins, opacity: fade, backgroundImage: MARBLE_VEINS, backgroundSize: 'cover' }}
          className="absolute -inset-x-10 -top-10 bottom-0 opacity-[0.07] animate-drift-slow"
        />

        {/* Soft green glow orbs + one subtle red accent */}
        <motion.div
          style={{ y: yGlow }}
          className="absolute top-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-primary-500/30 blur-3xl animate-gold-pulse pointer-events-none"
        />
        <motion.div
          style={{ y: yGlow }}
          className="absolute top-1/3 right-1/4 w-[26rem] h-[26rem] rounded-full bg-primary-400/15 blur-3xl animate-gold-pulse pointer-events-none"
        />
        <motion.div
          style={{ y: yGlow }}
          className="absolute -bottom-24 right-1/3 w-[22rem] h-[22rem] rounded-full bg-accent-600/12 blur-3xl animate-gold-pulse pointer-events-none"
        />

        {/* Faint architectural arch behind the photo */}
        <motion.svg
          style={{ y: yArch }}
          aria-hidden="true"
          viewBox="0 0 400 500"
          className="absolute right-[6%] top-1/2 -translate-y-1/2 hidden lg:block h-[80%] w-auto opacity-[0.10]"
        >
          <path
            d="M40 480 L40 180 A160 160 0 0 1 360 180 L360 480"
            fill="none"
            stroke="#F8F5F0"
            strokeWidth="2"
          />
          <path
            d="M90 480 L90 200 A110 110 0 0 1 310 200 L310 480"
            fill="none"
            stroke="#F8F5F0"
            strokeWidth="1.2"
            opacity="0.6"
          />
        </motion.svg>

        {/* Olive branches */}
        <OliveBranch className="absolute top-24 left-6 w-56 opacity-25 animate-leaf-sway hidden md:block" />
        <OliveBranch className="absolute bottom-16 right-8 w-64 opacity-20 -scale-x-100 animate-leaf-sway hidden md:block" />

        {/* Fine grain / vignette for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(100% 100% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Seamless fade toward the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/40 to-black" />
        {/* Thin Italian tricolore divider line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-italian-green to-transparent opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-italian-red to-transparent opacity-50" />
      </div>

      {/* ============ Content ============ */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/20 text-parchment/90 text-xs sm:text-sm mb-7 shadow-lg shadow-black/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-italian-red animate-pulse" />
              <span className="tracking-wide">{heroContent.badge}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl xl:text-[5rem] font-bold text-parchment mb-6 tracking-tight"
            >
              {heroContent.title}{' '}
              <span className="relative inline-block">
                <span className="text-cream-shimmer bg-size-200">{heroContent.titleHighlight}</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-parchment/70 max-w-xl mx-auto lg:mx-0 mb-9 leading-relaxed font-light"
            >
              {heroContent.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={heroContent.ctaPrimary.href}
                onClick={scrollToSection(heroContent.ctaPrimary.href)}
                className="btn-italian-red group text-base sm:text-lg"
              >
                {heroContent.ctaPrimary.text}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={heroContent.ctaSecondary.href}
                onClick={scrollToSection(heroContent.ctaSecondary.href)}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base sm:text-lg font-semibold text-white border border-white/35 backdrop-blur-sm hover:bg-white hover:text-primary-800 hover:border-white transition-all duration-300 group"
              >
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center mr-2.5 group-hover:bg-primary-100 transition-colors">
                  <Play size={13} className="ml-0.5" />
                </span>
                {heroContent.ctaSecondary.text}
              </motion.a>
            </motion.div>

            {/* Trust Signal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Étudiant accompagné"
                    className="w-9 h-9 rounded-full border-2 border-white/50 object-cover"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-italian-red text-italian-red" />
                  ))}
                </div>
                <div className="text-parchment/60 text-xs">Rejoint par 500+ étudiants</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-[108%] max-w-none ml-auto pr-4">
              {/* Green frame glow with a red glint */}
              <div className="absolute -inset-3 rounded-[2.4rem] bg-gradient-to-br from-primary-500/45 via-transparent to-accent-600/25 blur-xl" />

              {/* Auto-playing Italian heritage carousel */}
              <HeroCarousel />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
