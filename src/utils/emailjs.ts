import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

/**
 * EmailJS utility for sending emails from the frontend
 * Requires environment variables to be configured in .env file
 */

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

/**
 * Initializes EmailJS with the public key
 */
export const initEmailJS = (): void => {
  if (PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
  }
};

/**
 * Contact form data interface
 */
export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  education: string;
  university: string;
  program: string;
  message: string;
}

/**
 * Newsletter form data interface
 */
export interface NewsletterFormData {
  email: string;
}

/**
 * Sends contact form data via EmailJS
 * @param data - The contact form data
 * @returns Promise resolving to the EmailJS response
 */
export const sendContactEmail = async (
  data: ContactFormData
): Promise<EmailJSResponseStatus> => {
  const templateParams = {
    from_name: data.fullName,
    from_email: data.email,
    phone: data.phone,
    education: data.education,
    university: data.university,
    program: data.program,
    message: data.message,
    to_email: 'abderrahimdaaloul@gmail.com',
    reply_to: data.email,
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
};

