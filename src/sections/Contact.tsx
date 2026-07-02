import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle,
  User,
  GraduationCap,
  Building2,
  BookOpen,
  FileText,
  Clock,
  ArrowUpRight,
  Zap,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { sendContactEmail, initEmailJS, type ContactFormData } from '../utils/emailjs';
import { contactContent } from '../data/content';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Contact Section
 * Features a comprehensive contact form with EmailJS integration
 */
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { ref, isVisible } = useScrollAnimation(0.05);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData & { privacyAccepted: boolean }>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      initEmailJS();
      await sendContactEmail(data);
      setIsSuccess(true);
      toast.success('Message envoyé avec succès! Nous vous contacterons bientôt.');
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    phone: Phone,
    map: MapPin,
    email: Mail,
    whatsapp: MessageCircle,
  };

  return (
    <section
      id="contact"
      className="section-padding bg-white relative overflow-hidden"
      aria-label="Contactez-nous"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      {/* Dotted pattern texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4"
          >
            <MessageCircle size={14} />
            {contactContent.sectionTitle}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight mb-4">
            {contactContent.heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {contactContent.description}
          </p>

          {/* Response time badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <Zap size={14} />
            Réponse moyenne en moins de 2 heures
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactContent.info.map((item, index) => {
                const Icon = contactIcons[item.icon];
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all group overflow-hidden"
                  >
                    {/* Left accent bar on hover */}
                    <span className="absolute left-0 top-0 h-full w-0 bg-primary-600 group-hover:w-1 transition-all duration-300" />

                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.08 }}
                      className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300"
                    >
                      <Icon
                        size={22}
                        className="text-primary-600 group-hover:text-white transition-colors duration-300"
                      />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 font-medium">{item.label}</div>
                      <div className="text-gray-900 font-semibold">{item.value}</div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-gray-300 group-hover:text-primary-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden"
            >
              {/* Decorative circle */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-10 -left-6 w-24 h-24 rounded-full bg-white/5" />

              <h3 className="relative text-lg font-bold mb-3 flex items-center gap-2">
                <Clock size={20} />
                Heures de Disponibilité
              </h3>
              <div className="relative space-y-2 text-sm text-white/80">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium text-white">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium text-white">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="font-medium text-white/60">Fermé</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-500 p-6 lg:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary-600" />
                </span>
                {contactContent.formTitle}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Nom Complet <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                      />
                      <input
                        id="fullName"
                        type="text"
                        {...register('fullName', { required: 'Le nom est requis' })}
                        className={`peer w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                          errors.fullName ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Votre nom complet"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      />
                    </div>
                    {errors.fullName && (
                      <p id="fullName-error" className="text-red-500 text-sm mt-1" role="alert">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone', {
                          required: 'Le téléphone est requis',
                          pattern: {
                            value: /^[\+]?[\d\s\-\(\)]{8,}$/,
                            message: 'Numéro de téléphone invalide',
                          },
                        })}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                          errors.phone ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="+216 XX XXX XXX"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'L\'email est requis',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Adresse email invalide',
                        },
                      })}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                        errors.email ? 'border-red-400' : 'border-gray-200'
                      }`}
                      placeholder="votre@email.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Educational Background */}
                <div>
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Parcours Éducatif
                  </label>
                  <div className="relative">
                    <BookOpen size={18} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      id="education"
                      {...register('education')}
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="Décrivez votre parcours éducatif..."
                    />
                  </div>
                </div>

                {/* University & Program */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="university"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Université Souhaitée
                    </label>
                    <div className="relative">
                      <Building2
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        id="university"
                        type="text"
                        {...register('university')}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Nom de l'université"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="program"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Programme Souhaité
                    </label>
                    <div className="relative">
                      <FileText
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        id="program"
                        type="text"
                        {...register('program')}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Programme d'études"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Parlez-nous de votre projet d'études..."
                  />
                </div>

                {/* Privacy Checkbox — now bound to its own field (fixed from original) */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    {...register('privacyAccepted', {
                      required: 'Veuillez accepter la politique de confidentialité',
                    })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-1"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    J'accepte la{' '}
                    <a href="#" className="text-primary-600 hover:underline">
                      politique de confidentialité
                    </a>
                  </label>
                </div>
                {errors.privacyAccepted && (
                  <p className="text-red-500 text-sm -mt-3" role="alert">
                    {errors.privacyAccepted.message}
                  </p>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  whileHover={!isSubmitting && !isSuccess ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting && !isSuccess ? { scale: 0.98 } : {}}
                  className={`relative w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-lg overflow-hidden ${
                    isSuccess ? 'bg-green-600 text-white' : 'btn-primary shadow-lg shadow-primary-600/25'
                  }`}
                >
                  {/* Shimmer effect */}
                  {!isSubmitting && !isSuccess && (
                    <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  )}

                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 size={20} className="animate-spin" />
                        Envoi en cours...
                      </motion.span>
                    ) : isSuccess ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle size={20} />
                        Message envoyé avec succès!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Send size={20} />
                        Obtenir une Évaluation Gratuite
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;