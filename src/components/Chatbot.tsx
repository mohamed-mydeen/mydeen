import React, { useMemo, useState, useEffect, useRef } from "react";
import { Send, X, MessageCircle, Trash2 } from "lucide-react";

type Sender = "user" | "bot";

type Message = {
  sender: Sender;
  text: string;
};

type FAQ = {
  keywords: string[];
  answer: string;
};

const QUICK_ACTIONS = ["Skills", "Projects", "Education", "Contact"];

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false); // Default to light mode to match the portfolio lock
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi I'm Mydeen! 👋 Welcome to my portfolio. Ask me anything, or choose a quick topic below!"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const faqs: FAQ[] = useMemo(
    () => [
      {
        keywords: ["hi", "hello", "hey", "hii", "hlo", "hai", "vanakkam"],
        answer: "Hello! Welcome to my portfolio! How can I help you today? You can ask me about my skills, projects, education, or internship experience."
      },
      {
        keywords: ["assalamu alaikum", "assalamualaikum", "salam", "salaam"],
        answer: "Wa alaikum assalam 🤍😊 Welcome to my portfolio! Feel free to ask about my skills or projects."
      },
      {
        keywords: ["who are you", "about you", "introduce", "yourself", "name", "profile", "summary"],
        answer: "I'm Mohamed Mydeen Shahabudeen M, an aspiring software developer currently pursuing my B.Tech in Computer Science and Business Systems. I'm passionate about building scalable, real-world full-stack web applications and continuously improving my skills!"
      },
      {
        keywords: ["objective", "career", "goal", "aim", "future"],
        answer: "My career objective is to contribute to innovative and scalable software solutions in a dynamic organization while continuously learning and adapting to new technologies."
      },
      {
        keywords: ["skills", "tech stack", "technologies", "languages", "tools", "mern"],
        answer: "My Technical Skills:\n• MERN Stack: MongoDB, Express.js, React.js, Node.js\n• Backend: Java, Spring Boot, REST APIs\n• Languages: Java, Python, C, JavaScript\n• Databases: SQL, MongoDB\n• Tools: Git, AWS, Streamlit"
      },
      {
        keywords: ["frontend", "ui", "design"],
        answer: "For Frontend development, I use HTML, CSS, and React.js to build clean, responsive, and modern user interfaces."
      },
      {
        keywords: ["backend", "server", "api"],
        answer: "For Backend development, I specialize in Java, Spring Boot, and building robust REST APIs."
      },
      {
        keywords: ["strengths", "core", "soft skills", "personal"],
        answer: "My Core Strengths include:\n• Problem Solving\n• Team Collaboration\n• Time Management\n• Adaptability"
      },
      {
        keywords: ["education", "college", "study", "btech", "degree", "university", "cgpa"],
        answer: "I am pursuing a B.Tech in Computer Science and Business Systems at Francis Xavier Engineering College (2023 – 2027) with a CGPA of 7.81."
      },
      {
        keywords: ["school", "higher secondary", "12th", "hsc", "percentage", "schooling"],
        answer: "I completed my Higher Secondary (Maths & Computer Science) at Time Matric Higher Secondary School with a percentage of 83.2%."
      },
      {
        keywords: ["projects", "what projects", "your projects", "portfolio projects", "work"],
        answer: "Here are some of my key projects:\n1. Seasonal Deceptive Website Detection System (Cybersecurity)\n2. YouTube Data Analytics and Warehousing (Data Pipeline)\n3. Food Ordering Progressive Web Application (Full-Stack PWA)\n\nAsk me about a specific project if you want to know more!"
      },
      {
        keywords: ["deceptive", "website", "detection", "cybersecurity", "fraudulent", "seasonal", "fraud"],
        answer: "My 'Seasonal Deceptive Website Detection System' is a cybersecurity solution that detects fraudulent websites during public events using URL analysis, SSL validation, and domain age verification. It features an explainable risk scoring system built with Streamlit."
      },
      {
        keywords: ["youtube", "data", "analytics", "warehousing", "pipeline"],
        answer: "My 'YouTube Data Analytics' project is a data pipeline built using APIs and SQL. I used Streamlit to analyze and visualize the YouTube data effectively."
      },
      {
        keywords: ["food", "ordering", "pwa", "progressive web app", "restaurant"],
        answer: "My 'Food Ordering PWA' is a full-stack Progressive Web Application featuring AI recommendations, Firebase notifications, JWT authentication, payment integration, and an admin dashboard."
      },
      {
        keywords: ["internship", "experience", "intern", "company", "worked"],
        answer: "I have two main internship experiences:\n1. Software Developer Intern: Worked on automation testing using Playwright (Python) and AWS deployments.\n2. Full Stack Developer Intern: Built CRUD applications using Java, Spring Boot, React.js, and SQL."
      },
      {
        keywords: ["certifications", "certificates", "courses", "achievements", "certified"],
        answer: "My Certifications:\n• NPTEL – Internet of Things (IIT Kharagpur) – 80%\n• LinkedIn Learning – Java Essentials & Git Essential Training\n• Cisco – Python\n• Udemy – Web Development & C Programming"
      },
      {
        keywords: ["where are you from", "hometown", "native", "place"],
        answer: "I'm from Melapalayam, Tirunelveli, Tamil Nadu."
      },
      {
        keywords: ["resume", "cv", "biodata", "download resume"],
        answer: "You can download my resume directly here: \n\n📄 [Download Mohamed's Resume](/mydeen_resume.pdf)\n\nIs there anything specific you'd like to know about my experience?"
      },
      {
        keywords: ["contact", "email", "reach", "hire", "phone", "whatsapp", "message"],
        answer: "You can reach out to me via the Contact section, or email me directly at mohamedmydeen.sd@gmail.com! I'm always open to new opportunities."
      }
    ],
    []
  );

  const getBotReply = (text: string): string => {
    const query = text.toLowerCase().trim();
    
    // Sort faqs by longest keyword first to match more specific phrases before general ones
    const sortedFaqs = [...faqs].sort((a, b) => {
      const maxA = Math.max(...a.keywords.map(k => k.length));
      const maxB = Math.max(...b.keywords.map(k => k.length));
      return maxB - maxA;
    });

    for (const faq of sortedFaqs) {
      for (const key of faq.keywords) {
        if (query.includes(key)) return faq.answer;
      }
    }
    
    const fallbacks = [
      "That's an interesting question! I mostly know about Mohamed's Skills, Projects, and Experience. Want to hear about those?",
      "Good question! I'm still learning, but I can definitely tell you all about Mohamed's tech stack and education.",
      "I love that you asked that! While I don't have the exact answer, I'd be happy to share details about Mohamed's recent projects or internships.",
      "Mohamed is always exploring new ideas like that! If you want to know more about his professional background, just ask about his Skills or Education."
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = (text: string): void => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages(prev => [...prev, { sender: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: getBotReply(trimmed) }]);
      setLoading(false);
    }, 800);
  };

  const clearChat = (): void => {
    setMessages([
      {
        sender: "bot",
        text: "Hi there! 👋 Welcome back. Ask me about my skills, projects, or education."
      }
    ]);
    setInput("");
  };

  // Theme styling based on internal dark mode state
  const isDark = darkMode;
  const containerBg = isDark ? "bg-slate-900/95 border-white/10" : "bg-white/95 border-slate-200/50";
  const headerBg = isDark ? "bg-slate-800" : "bg-slate-100";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const userMsgBg = "bg-indigo-500 text-white shadow-md shadow-indigo-500/20";
  const botMsgBg = isDark ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-700";
  const inputContainerBg = isDark ? "bg-slate-800/50 border-white/5" : "bg-white border-slate-200";

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center hover:bg-indigo-600 hover:scale-105 transition-all duration-300 z-50 animate-bounce-slow"
          aria-label="Open Chatbot"
        >
          <MessageCircle size={20} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[350px] h-[500px] sm:h-[550px] backdrop-blur-xl ${containerBg} border rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col transition-colors duration-300`}>
          {/* Header */}
          <div className={`${headerBg} px-4 py-3 flex justify-between items-center border-b border-white/5`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold">MM</span>
              </div>
              <div className="min-w-0">
                <h2 className={`text-sm font-semibold ${textPrimary}`}>MydeenBot</h2>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className={`text-[10px] ${textSecondary}`}>Online</p>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={clearChat} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`} title="Clear Chat">
                <Trash2 size={14} className={isDark ? "text-slate-300" : "text-slate-600"} />
              </button>
              <button onClick={() => setOpen(false)} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}>
                <X size={16} className={isDark ? "text-slate-300" : "text-slate-600"} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                  msg.sender === "user" ? `${userMsgBg} rounded-br-sm` : `${botMsgBg} rounded-bl-sm`
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className={`${botMsgBg} rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 shadow-sm`}>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions / FAQs */}
          {messages.length < 3 && !loading && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  onClick={() => handleSend(action)}
                  className={`text-[11px] font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    isDark 
                      ? 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20' 
                      : 'border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className={`p-3 border-t ${inputContainerBg}`}>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend(input)}
                placeholder="Type a message..."
                className={`flex-1 outline-none text-sm bg-transparent ${textPrimary} placeholder-slate-400`}
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || loading}
                className={`p-1.5 rounded-lg transition-colors ${
                  !input.trim() || loading 
                    ? 'opacity-40 cursor-not-allowed text-slate-400' 
                    : 'text-indigo-500 hover:bg-indigo-500/10'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;