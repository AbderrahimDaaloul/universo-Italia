/**
 * Centralized content data for the website
 * All public-facing text and configuration data
 */

import {
  GraduationCap,
  FileText,
  Plane,
  Home,
  Languages,
  Users,
  Award,
  Clock,
  Globe,
} from 'lucide-react';

// ==================== HERO SECTION ====================
export const heroContent = {
  badge: 'Services de Visa Étudiant pour l\'Italie',
  title: 'Votre Porte d\'Entrée vers',
  titleHighlight: 'étudier en Italie',
  description:
    'Nous aidons les étudiants tunisiens à réaliser leurs rêves d\'études en Italie. Des démarches universitaires au traitement des visas, nous vous accompagnons à chaque étape avec expertise et dévouement.',
  ctaPrimary: { text: 'Évaluation Gratuite', href: '#contact' },
  ctaSecondary: { text: 'Nos Services', href: '#services' },
  stats: [
    { value: 500, suffix: '+', label: 'Étudiants Satisfaits' },
    { value: 8, suffix: '+', label: 'Ans d\'Expérience' },
    { value: 2, suffix: '+', label: 'Ans Préparation Dossier' },
  ],
};

// ==================== ABOUT SECTION ====================
export const aboutContent = {
  sectionTitle: 'À Propos de Nous',
  heading: 'Votre Partenaire de Confiance pour étudier en Italie',
  description:
    'UniversoItalia est le premier conseil en Études tunisien spécialisé dans les universités italiennes. Notre équipe d\'experts a aidé des centaines d\'étudiants à naviguer avec succès dans le processus complexe des études à l\'étranger. Nous comprenons les défis uniques auxquels sont confrontés les étudiants tunisiens et nous nous engageons à fournir un accompagnement personnalisé pour chaque projet.',
  features: [
    'Sélection et candidature universitaire personnalisée',
    'Les demandes de bourses d\'études et de Résidences universitaires',
    'Cours de langue italienne pour faciliter votre intégration',
    'Orientation et soutien pré-départ et l\'arrivée au territoire italien',
    'Et plusieurs autres services',
  ],
  cta: { text: 'Découvrir Nos Services', href: '#services' },
};

// ==================== SERVICES SECTION ====================
export interface Service {
  id: number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
  details?: string[];
  image?: string;
}

export const servicesContent = {
  sectionTitle: 'Nos Services',
  heading: 'Solutions Complètes pour Visa d\'étude',
  description:
    'De la sélection universitaire à l\'approbation du visa et au-delà, nous fournissons un soutien complet et personnalisé pour les étudiants tunisiens poursuivant leurs rêves d\'études en Italie.',
  note: 'Tous les services sont assurés avec professionnalisme, confidentialité et souci du détail, afin d\'accroître les chances de succès de l\'étudiant.',
  services: [
    {
      id: 1,
      icon: GraduationCap,
      title: 'Candidature Universitaire',
      description:
        'Soutien complet pour sélectionner et postuler aux meilleures universités italiennes selon votre profil académique, vos objectifs de carrière et vos préférences personnelles. Nous gérons toute la correspondance avec les établissements.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      icon: FileText,
      title: 'Traitement de dossier bourse',
      description:
        'Guidage expert à travers tout le processus de dossier bourse pour les étudiants, incluant la préparation minutieuse de la documentation, le suivi jusqu\'à l\'obtention de bourse et résidence universitaire.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      icon: Plane,
      title: 'Soutien Pré-Départ',
      description:
        'Guidage expert à travers tout le processus de visa d\'étude, incluant la préparation minutieuse de la documentation.',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      icon: Home,
      title: 'Soutien à l\'arrivée',
      description:
        'Orientation essentielle, assistance recherche de logement, préparation culturelle et soutien administratif pour votre nouvelle vie en Italie. Nous vous aidons à vous installer en toute sérénité.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      icon: Languages,
      title: 'Enseignement de la Langue Italienne (A1–B2)',
      description:
        'Cours d\'italien A1, A2, B1 et B2 avec méthode pédagogique claire et axée sur la communication. Livre d\'italien au format PDF inclus, exercices et tests d\'évaluation.',
      image: 'https://images.unsplash.com/photo-1522661067900-ab829854a57f?auto=format&fit=crop&w=800&q=80',
      details: [
        'Méthode pédagogique claire et axée sur la communication',
        'Livre d\'italien au format PDF inclus',
        'Exercices et tests d\'évaluation et simulations d\'examen',
        'Soutien continu tout au long du parcours d\'apprentissage',
      ],
    },
    {
      id: 6,
      icon: Users,
      title: 'Services Supplémentaires et Soutien Universitaire',
      description:
        'Soutien complet aux étudiants à chaque étape de leur parcours académique, en fournissant des services personnalisés pour faciliter les démarches universitaires et administratives.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      details: [
        'Création et relecture du Curriculum Vitae (CV)',
        'Rédaction de la Lettre de Motivation',
        'Changement de cursus universitaire',
        'Transfert de cursus ou d\'université',
        'Remplissage et vérification des documents universitaires',
        'Aide dans les démarches administratives',
      ],
    },
  ] as Service[],
};

// ==================== PRICING SECTION ====================
export interface PricingPlan {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  badge?: string;
  price?: {
    currency: string;
    amount: string | number;
    period: string;
  };
}

export const pricingContent = {
  sectionTitle: 'Nos Tarifs',
  heading: 'Forfaits Visa Étudiant Accessibles',
  description:
    'Nous proposons des tarifs transparents sans coûts cachés. Tous les forfaits incluent un soutien personnalisé et un accompagnement dédié pour maximiser vos chances de succès.',
  plans: [
    {
      id: 1,
      name: 'Forfait Basique',
      subtitle: 'Paiement unique',
      description: 'Soutien essentiel pour les candidatures universitaires et la documentation de base.',
      features: [
        'Analyse de profil et sélection universitaire',
        'Assistance complète aux formulaires',
        'Check-list documents personnalisée',
        'Support email prioritaire',
        'Suivi candidature détaillé',
      ],
      cta: 'Commencer',
    },
    {
      id: 2,
      name: 'Forfait Professions de santé',
      subtitle: 'Pour les Étudiants de santé',
      description: 'Soutien de bout en bout de la candidature à l\'arrivée et installation en Italie.',
      features: [
        'Analyse de profil et sélection universitaire',
        'Assistance complète aux formulaires',
        'Check-list documents personnalisée',
        'Support email prioritaire',
        'Suivi candidature détaillé',
      ],
      cta: 'Commencer',
    },
    {
      id: 3,
      name: 'Forfait Médecine',
      subtitle: 'Pour les Étudiants de Médecine',
      description: 'Soutien de bout en bout de la candidature à l\'arrivée et installation en Italie.',
      features: [
        'Analyse de profil et sélection universitaire',
        'Assistance complète aux formulaires',
        'Check-list documents personnalisée',
        'Support email prioritaire',
        'Suivi candidature détaillé',
      ],
      cta: 'Commencer',
    },
    {
      id: 4,
      name: 'Forfait Premium',
      subtitle: 'Le Plus Populaire',
      description: 'Traitement complet du visa avec consultant dédié et suivi personnalisé.',
      features: [
        'Analyse de profil et sélection universitaire',
        'Assistance complète aux formulaires',
        'Check-list documents personnalisée',
        'Support email prioritaire',
        'Suivi candidature détaillé',
        'Consultant dédié disponible 5j/7',
        'Soutien après l\'arrivée en Italie',
      ],
      cta: 'Commencer',
      popular: true,
      badge: 'Le Plus Populaire',
    },
  ] as PricingPlan[],
};

// ==================== STATISTICS SECTION ====================
export const statisticsContent = {
  badge: 'Plus de 500+ étudiants nous font confiance',
  heading: 'Prêt à concrétiser vos rêves d\'études en Italie ?',
  description:
    'Inscrivez-vous à notre newsletter pour recevoir les dernières actualités sur les études en Italie, les opportunités de bourses et les conseils exclusifs.',
  stats: [
    { value: 500, suffix: '+', label: 'Étudiants Accompagnés', icon: Users },
    { value: 95, suffix: '%', label: 'Taux de Réussite', icon: Award },
    { value: 50, suffix: '+', label: 'Universités Partenaires', icon: Globe },
    { value: 8, suffix: '+', label: 'Années d\'Expérience', icon: Clock },
  ],
};

// ==================== CONTACT SECTION ====================
export const contactContent = {
  sectionTitle: 'Contactez-Nous',
  heading: 'Commencez Votre Projet d\'Études en Italie',
  description:
    'Prêt à concrétiser vos rêves d\'études en Italie? Nos conseillers expérimentés sont à votre disposition pour répondre à toutes vos questions, évaluer votre profil et vous guider pas à pas dans votre projet académique italien.',
  info: [
    {
      icon: 'phone',
      label: 'Téléphone',
      value: '+39 350 882 4436',
      href: 'tel:+393508824436',
    },
    {
      icon: 'map',
      label: 'Adresse',
      value: 'Freelance (sur site)',
      href: '#',
    },
    {
      icon: 'email',
      label: 'Email',
      value: 'universoitalia.tn@gmail.com',
      href: 'mailto:universoitalia.tn@gmail.com',
    },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: '+39 350 882 4436',
      href: 'https://wa.me/393508824436',
    },
  ],
  formTitle: 'Évaluation de Profil Gratuite',
};

// ==================== NAVIGATION ====================
export const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À Propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

// ==================== FOOTER ====================
export const footerContent = {
  description:
    'Votre partenaire de confiance pour étudier en Italie. Nous aidons les étudiants tunisiens à réaliser leurs rêves d\'études en Italie avec un soutien complet pour les visas et candidatures universitaires.',
  services: [
    'Candidatures Universitaires',
    'Traitement des Visas',
    'Préparation des Documents',
    'Soutien Pré-Départ',
    'Assistance Logement',
  ],
  quickLinks: [
    { label: 'Accueil', href: '#hero' },
    { label: 'À Propos', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
  contact: {
    phone: '+39 350 882 4436',
    email: 'universoitalia.tn@gmail.com',
    address: 'FREELANCE',
  },
  copyright: '© Copyright 2026 - UniversoItalia. Tous Droits Réservés',
};
