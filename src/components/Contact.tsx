import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Format message for WhatsApp
      const whatsappMessage = `New Contact Message 🚀
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message:
${formData.message}`;
      
      // URL encode the message
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // WhatsApp Click-to-Chat URL
      const whatsappUrl = `https://wa.me/919344990461?text=${encodedMessage}`;
      
      // Simulate form processing delay
      setTimeout(() => {
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 800);
    }
  };
  
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Get In <span className="text-emerald-600 dark:text-emerald-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300">
            Send me a message via WhatsApp or email
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-xl shadow-lg">
          {submitSuccess && (
            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300">
              ✓ Message sent! WhatsApp is opening on your device.
            </div>
          )}
          
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.subject ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                placeholder="Subject"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                placeholder="Your Message"
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
              )}
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center gap-2 font-medium ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Preparing Message...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send via WhatsApp
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
