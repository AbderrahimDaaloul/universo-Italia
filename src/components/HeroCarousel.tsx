import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Auto-playing hero carousel celebrating Italian heritage & excellence:
 * Ancient Rome, historic universities, and iconic Italian places.
 * Fade + slow Ken-Burns zoom, pause on hover, Italian-flag arrows & dots.
 */

interface Slide {
  src: string;
  label: string;
  place: string;
}

const slides: Slide[] = [
  {
    src: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    label: 'Le Colisée',
    place: 'Rome',
  },
  {
    src: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=80',
    label: 'Forum & Panthéon',
    place: 'Rome antique',
  },
  {
    src: 'https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&w=1200&q=80',
    label: 'Duomo de Florence',
    place: 'Florence',
  },
  {
    src: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1200&q=80',
    label: 'Collines toscanes',
    place: 'Toscane',
  },
  {
    src: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80',
    label: 'Les canaux',
    place: 'Venise',
  },
  {
    src: 'https://images.unsplash.com/photo-1520440229-6469a149ac59?auto=format&fit=crop&w=1200&q=80',
    label: 'Duomo di Milano',
    place: 'Milan',
  },
  {
    src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    label: 'Positano',
    place: 'Côte Amalfitaine',
  },
  {
    src: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80',
    label: 'Rome',
    place: 'Italie',
  },
];

const AUTOPLAY_MS = 5500;

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, []);
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = slides[index];

  return (
    <div
      className="group relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/20 h-[540px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Images de l'Italie"
    >
      {/* Slides (crossfade + slow Ken-Burns zoom) */}
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={slide.src}
          alt={`${slide.label}, ${slide.place}`}
          initial={{ opacity: 0, scale: 1.09 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{
            opacity: { duration: 1.1, ease: 'easeInOut' },
            scale: { duration: AUTOPLAY_MS / 1000 + 1.2, ease: 'linear' },
          }}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </AnimatePresence>

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#02100A]/90 via-[#02100A]/25 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#02100A]/30 to-transparent" />

      {/* Tricolore accent strip */}
      <div className="absolute top-0 left-0 w-full h-1 flex z-20">
        <span className="flex-1 bg-italian-green" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-italian-red" />
      </div>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-6 left-6 z-20 flex items-center gap-3"
        >
          <span className="flex h-8 w-1.5 flex-col overflow-hidden rounded-full">
            <span className="flex-1 bg-italian-green" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-italian-red" />
          </span>
          <span>
            <span className="block font-heading text-lg font-semibold text-white leading-tight drop-shadow">
              {slide.label}
            </span>
            <span className="block text-parchment/70 text-xs tracking-wide uppercase">
              {slide.place}
            </span>
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Image précédente"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/25 text-white opacity-0 group-hover:opacity-100 hover:bg-italian-green hover:border-italian-green transition-all duration-300"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Image suivante"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/25 text-white opacity-0 group-hover:opacity-100 hover:bg-italian-red hover:border-italian-red transition-all duration-300"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Aller à ${s.label}`}
              aria-current={active}
              className={`h-2 rounded-full transition-all duration-300 ${
                active ? 'w-8 overflow-hidden' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            >
              {active && (
                <span className="flex h-full w-full">
                  <span className="flex-1 bg-italian-green" />
                  <span className="flex-1 bg-white" />
                  <span className="flex-1 bg-italian-red" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroCarousel;
