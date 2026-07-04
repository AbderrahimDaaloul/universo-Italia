import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  CheckCircle,
  ArrowRight,
  Award,
  Users,
  Globe,
  GraduationCap,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { aboutContent } from '../data/content';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import bicoccaImg from '../assets/bicocca.png';
import unitoImg from '../assets/unito.png';
import unimiImg from '../assets/unimi.png';

/**
 * Auto-flipping 3D card cycling through 3 Italian universities.
 * Photo 1 holds ~2.5s, then flips; the others hold ~4.5s. Pauses on hover.
 * Swap-at-edge technique gives a true continuous flip (no mirrored frames).
 */
const UNIVERSITY_PHOTOS = [
  {
    src: bicoccaImg,
    alt: 'Università degli Studi di Milano-Bicocca',
  },
  {
    src: unitoImg,
    alt: 'Università degli Studi di Torino',
  },
  {
    src: unimiImg,
    alt: 'Università degli Studi di Messina',
  },
];

const FlippingUniversityCard = () => {
  const controls = useAnimationControls();
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    let active = true;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const loop = async () => {
      while (active) {
        // Photo 1 holds a touch shorter than the rest
        await wait(idxRef.current === 0 ? 2500 : 4500);
        while (pausedRef.current && active) await wait(150);
        if (!active) return;
        try {
          // turn edge-on (image foreshortens away)
          await controls.start({ rotateY: 90, transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } });
          // swap the photo while invisible, then complete the flip from the other side
          const nextIdx = (idxRef.current + 1) % UNIVERSITY_PHOTOS.length;
          idxRef.current = nextIdx;
          setIdx(nextIdx);
          controls.set({ rotateY: -90 });
          await controls.start({ rotateY: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } });
        } catch {
          return; // controls unmounted mid-animation
        }
      }
    };

    loop();
    return () => {
      active = false;
    };
  }, [controls]);

  const photo = UNIVERSITY_PHOTOS[idx];

  return (
    <div className="relative pb-14 sm:pb-16">
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl group"
        style={{ perspective: '1400px' }}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        {/* Flipping photo layer */}
        <motion.div
          animate={controls}
          style={{ transformOrigin: 'center', backfaceVisibility: 'hidden' }}
          className="relative w-full h-[300px] sm:h-[380px] will-change-transform"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover"
            style={{ backfaceVisibility: 'hidden' }}
          />
        </motion.div>

        {/* Gradient overlay for readability + Italian flag accent */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-1.5 flex pointer-events-none">
          <div className="flex-1 bg-italian-green" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-italian-red" />
        </div>

        {/* University name caption */}
        <div className="absolute top-5 left-5 pointer-events-none">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-sm border border-white/20 text-white text-xs font-medium shadow-lg">
            <span className="flex h-3 w-1 flex-col overflow-hidden rounded-full">
              <span className="flex-1 bg-italian-green" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-italian-red" />
            </span>
            {photo.alt.split('—')[0].trim()}
          </span>
        </div>
      </div>

      {/* Stat cards straddling the bottom edge — the image border runs
          through their vertical center */}
      <div className="absolute inset-x-0 bottom-14 sm:bottom-16 translate-y-1/2 px-6">
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-4 text-center backdrop-blur-md bg-white/95 shadow-xl ring-1 ring-primary-100"
          >
            <Award className="w-7 h-7 text-primary-600 mx-auto mb-1.5" />
            <div className="text-xl font-bold text-primary-700">8+</div>
            <div className="text-[11px] text-gray-600 mt-0.5 leading-tight">Ans d'Expérience</div>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-4 text-center backdrop-blur-md bg-white/95 shadow-xl ring-1 ring-primary-100"
          >
            <Users className="w-7 h-7 text-primary-600 mx-auto mb-1.5" />
            <div className="text-xl font-bold text-primary-700">500+</div>
            <div className="text-[11px] text-gray-600 mt-0.5 leading-tight">Étudiants Satisfaits</div>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-4 text-center backdrop-blur-md bg-white/95 shadow-xl ring-1 ring-primary-100"
          >
            <Globe className="w-7 h-7 text-primary-600 mx-auto mb-1.5" />
            <div className="text-xl font-bold text-primary-700">50+</div>
            <div className="text-[11px] text-gray-600 mt-0.5 leading-tight">Universités Partenaires</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

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
            <FlippingUniversityCard />

           
           

            {/* Rating badge */}
           
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
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(aboutContent.cta.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
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