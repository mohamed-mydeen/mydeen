import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

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

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
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
  
  // Messages state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      subject: "Project Inquiry",
      message: "I'm interested in discussing a potential project with you. Could we schedule a call sometime this week?",
      date: "2025-04-22"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Collaboration Opportunity",
      message: "Hi there! I saw your portfolio and would love to collaborate on an upcoming project. Let me know if you're interested!",
      date: "2025-04-24"
    }
  ]);
  
  const [showMessageViewer, setShowMessageViewer] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  
  const contactRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);
  
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
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        // Add the new message to our messages array
        const newMessage: Message = {
          id: messages.length + 1,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          date: new Date().toISOString().split('T')[0]
        };
        
        setMessages([...messages, newMessage]);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after a few seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };
  
  const toggleMessageViewer = () => {
    setShowMessageViewer(!showMessageViewer);
    setSelectedMessage(null);
  };
  
  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
  };
  
  const goBackToList = () => {
    setSelectedMessage(null);
  };
  
  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Get In <span className="text-emerald-600 dark:text-emerald-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto mb-8"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Feel free to reach out to me for collaborations, opportunities, or just to say hello!
          </p>
        </div>

        <div 
          ref={contactRef}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 opacity-0 transition-opacity duration-1000"
        >
          {/* Contact Info */}
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600 dark:text-emerald-400 mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white mb-1">Email</p>
                  <a href="mailto:mmohamedukasha83@gmail.com" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    mohamedmydeen.sd@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600 dark:text-emerald-400 mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white mb-1">Phone</p>
                  <a href="tel:+919344990461" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    +91 9344990461
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600 dark:text-emerald-400 mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white mb-1">Location</p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Tirunelveli, India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                Connect with me
              </h4>
              
              <div className="flex gap-4">
                {/* Corrected links individually */}
                <a
                  href="https://github.com/M-Mohamed-Mydeen-Shahabudeen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                    alt="GitHub"
                    className="w-5 h-5"
                  />
                </a>

                <a
                  href="http://www.linkedin.com/in/mohamed-mydeen-shahabudeen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>

                <a
                  href="https://x.com/mohamed_mydeen3" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-md hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
                    alt="Twitter"
                    className="w-5 h-5"
                  />
                </a>
              </div>

              <div className="mt-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 italic">
                 "Whoever travel a path in search of knowledge, God will make easy for him a path to paradise."
                 
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form / Message Viewer */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-8 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {showMessageViewer ? "Message Inbox" : "Send me a Message"}
              </h3>
           
            </div>
            
            {!showMessageViewer ? (
              // Contact Form
              <>
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300">
                    Thank you for your message! I'll get back to you as soon as possible.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
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
                          errors.name ? 'border-red-500 dark:border-red-700' : 'border-slate-300 dark:border-slate-600'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
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
                          errors.email ? 'border-red-500 dark:border-red-700' : 'border-slate-300 dark:border-slate-600'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
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
                        errors.subject 
                          ? 'border-red-500 dark:border-red-700' 
                          : 'border-slate-300 dark:border-slate-600'
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
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
                        errors.message 
                          ? 'border-red-500 dark:border-red-700' 
                          : 'border-slate-300 dark:border-slate-600'
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
                      placeholder="Your Message"
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              // Message Viewer
              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
                {!selectedMessage ? (
                  // Message List
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {messages.length > 0 ? (
                      messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer"
                          onClick={() => viewMessage(msg)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{msg.subject}</h4>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{msg.date}</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">From: {msg.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{msg.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                        <p>No messages yet.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Message Detail View
                  <div className="p-6">
                    <button 
                      onClick={goBackToList}
                      className="mb-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
                    >
                      ← Back to all messages
                    </button>
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {selectedMessage.subject}
                      </h3>
                      <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300 mb-6">
                        <p><span className="font-medium">From:</span> {selectedMessage.name} ({selectedMessage.email})</p>
                        <p><span className="font-medium">Date:</span> {selectedMessage.date}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                        <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                          {selectedMessage.message}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6 gap-2">
                      <button
                        className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                      >
                        <Mail size={16} />
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
