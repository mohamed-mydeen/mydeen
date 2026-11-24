import React, { useMemo, useState, useEffect, useRef, useCallback, useContext } from "react";
import { Send, X, Trash2, Sparkles } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

type Sender = "user" | "bot";

type Message = {
  sender: Sender;
  text: string;
};

type FAQ = {
  keywords: string[];
  answer: string;
};

const QUICK_ACTIONS = [
  "About Me",
  "Skills & Stack",
  "Projects",
  "Role Models",
  "Future Visions",
  "Education",
  "Blog",
  "Contact"
];

// ── Clean Message Item ──
const MessageItem = React.memo<{ msg: Message; isDark: boolean }>(({ msg, isDark }) => {
  const isUser = msg.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} will-change-transform`}>
      <div
        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap select-text transition-all ${
          isUser
            ? "bg-[#A5A79B] text-[#181818] rounded-br-xs shadow-sm font-medium"
            : isDark
            ? "bg-[#272727] text-[#f2efe9] border border-white/5 rounded-tl-xs shadow-xs"
            : "bg-[#f5ebd9] text-[#181818] border border-[#A5A79B]/30 rounded-tl-xs shadow-xs"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
});
MessageItem.displayName = "MessageItem";

// ── Typing Indicator ──
const LoadingIndicator = React.memo<{ isDark: boolean }>(({ isDark }) => {
  return (
    <div className="flex justify-start will-change-transform">
      <div
        className={`rounded-2xl rounded-tl-xs px-3.5 py-2.5 flex items-center gap-1.5 shadow-xs ${
          isDark ? "bg-[#272727] border border-white/5" : "bg-[#f5ebd9] border border-[#A5A79B]/30"
        }`}
      >
        <span className="w-1.5 h-1.5 bg-[#A5A79B] rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
        <span className="w-1.5 h-1.5 bg-[#A5A79B] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        <span className="w-1.5 h-1.5 bg-[#A5A79B] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
});
LoadingIndicator.displayName = "LoadingIndicator";

// ── Clean Horizontal Scrollable FAQ Chips ──
const QuickActions = React.memo<{
  isDark: boolean;
  onActionClick: (action: string) => void;
}>(({ isDark, onActionClick }) => {
  return (
    <div className="px-4 pb-2 pt-1">
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none items-center">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            onClick={() => onActionClick(action)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              isDark
                ? "border-white/10 text-white/80 bg-white/5 hover:bg-[#A5A79B]/20 hover:border-[#A5A79B]/50 hover:text-white"
                : "border-[#A5A79B]/40 text-[#181818] bg-[#A5A79B]/15 hover:bg-[#A5A79B]/30 hover:border-[#A5A79B]"
            }`}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
});
QuickActions.displayName = "QuickActions";

// ── Main Chatbot Component ──
const Chatbot: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I'm Mydeen FAQs 👋 Feel free to ask anything about Mohamed's projects, background, role models, or choose a topic below."
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Freeze background scrolling when chat is opened
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [open]);

  // Comprehensive FAQs curated from https://mydeenblog.vercel.app/about and portfolio
  const faqs: FAQ[] = useMemo(
    () => [
      {
        keywords: ["hi", "hello", "hey", "hii", "hlo", "hai", "vanakkam", "start"],
        answer: "Hello! Welcome to Mydeen FAQs! 🚀 How can I help you today? You can ask me about Mohamed's engineering path, role models, future goals, or projects."
      },
      {
        keywords: ["assalamu alaikum", "assalamualaikum", "salam", "salaam"],
        answer: "Wa alaikum assalam wa rahmatullahi wa barakatuh 🤍 Welcome to Mydeen's portfolio! Feel free to ask anything."
      },
      {
        keywords: ["who are you", "about me", "about you", "introduce", "biography", "background", "profile", "summary"],
        answer: "Mohamed Mydeen Shahabudeen M was born in 2005 in Melapalayam, Tirunelveli, Tamil Nadu.\n\nHe is a Full Stack Developer & Aspiring AI Engineer currently pursuing a B.Tech in Computer Science & Business Systems at Francis Xavier Engineering College. He specializes in React, TypeScript, Python, FastAPI, Spring Boot, and AI architectures."
      },
      {
        keywords: ["turning point", "childhood", "7th standard", "struggle", "teacher", "story", "transformation", "early life"],
        answer: "The Turning Point:\nDuring early school years, studies were a challenge for Mohamed. Everything changed in 7th standard when a caring teacher gave him personal encouragement and direction.\n\nHer guidance ignited his self-belief: by the very next exam, he went from failing to 2nd rank, and soon became a consistent top student!\n\nCore lesson: 'Your circumstances do not define your future. Your faith, mindset, discipline, and determination do.'"
      },
      {
        keywords: ["role model", "role models", "inspiration", "who inspires you", "hero", "idols"],
        answer: "Mohamed's Role Models:\n\n1. Life Role Model: Prophet Muhammad (peace be upon him)\nUltimate guide for character, morality, social justice, and leadership.\n\n2. Career Role Model: Sundar Pichai (CEO of Google)\nHumble origins, product leadership, and global impact on the software landscape inspire Mohamed's engineering path."
      },
      {
        keywords: ["future vision", "future visions", "future", "aim", "goals", "dream", "career goal", "ambition", "politics", "business"],
        answer: "Mohamed's Future Visions & Aspirations:\n\n1. Technology & Business: Build and lead dynamic IT software enterprises and premium restaurant networks (e.g. Feast At Night).\n2. Public Service: Aspire to be an honest, dedicated politician and public servant working directly on the ground to bring positive social welfare to the people.\n3. Eternal Equation: 'To achieve meaningful success in this temporary world, while ensuring ultimate success in the hereafter (Aakhirah).'"
      },
      {
        keywords: ["best student", "award", "recognition", "honors", "school award", "best student of the year"],
        answer: "Best Student of the Year (2022–2023):\nMohamed was recognized as Best Student of the Year at Time Matric Higher Secondary School. This prestigious honor was awarded through teacher nominations and school-wide voting for consistent character, discipline, responsibility, respectful conduct, and academic excellence."
      },
      {
        keywords: ["education", "college", "degree", "btech", "university", "cgpa", "school"],
        answer: "Academic Background:\n\n• College (2023 – 2027): B.Tech in Computer Science & Business Systems @ Francis Xavier Engineering College (CGPA: 7.81)\n• High School (2021 – 2023): Higher Secondary Certificate (HSC) in Maths & Computer Science @ Time Matric Higher Secondary School (Score: 83.17%, Awarded Best Student)"
      },
      {
        keywords: ["skills", "tech stack", "technologies", "languages", "tools", "mern"],
        answer: "Technical Arsenal:\n• Frontend: React.js, TypeScript, Tailwind CSS, HTML5/CSS3, PWA engineering\n• Backend: Java, Spring Boot, Python, FastAPI, Node.js, Express.js\n• Databases: PostgreSQL, MongoDB, MySQL, Supabase\n• AI & ML: LLMs, RAG pipelines, OpenCV Biometrics, Streamlit heuristic scanners\n• Cloud & Tools: AWS, Docker, Git, Playwright test automation"
      },
      {
        keywords: ["projects", "what projects", "apps", "work", "portfolio projects"],
        answer: "Key Applications Built by Mohamed:\n\n1. Mydeen AI: Conversational artificial intelligence suite\n2. SafeCheck ML: Seasonal phishing & deceptive website detection system\n3. Feast At Night: Night food ordering & delivery PWA\n4. Peace Be Upon Him (PBUH): Islamic spiritual companion APK & web app\n5. Business Card OCR Manager & Face Biometric Authentication\n\nYou can launch and inspect all of them directly in the desktop Ubuntu Dock & File Manager!"
      },
      {
        keywords: ["blog", "article", "articles", "writing", "news", "mydeenblog"],
        answer: "Mohamed publishes in-depth engineering journals and articles on AI, full-stack systems, modern architectures, and tutorials at:\n\n🌐 [Mydeen Dev Blog & About](https://mydeenblog.vercel.app/about)"
      },
      {
        keywords: ["philosophy", "quote", "values", "faith", "motto"],
        answer: "'Your circumstances do not define your future. Your faith, mindset, discipline, and determination do.'\n\n'And that there is not for man except that [good] for which he strives.' — Qur'an 53:39"
      },
      {
        keywords: ["resume", "cv", "biodata", "download resume"],
        answer: "You can download Mohamed's verified technical resume directly here:\n\n📄 [Download Mohamed's Resume](/mohamedmydeensd.pdf)"
      },
      {
        keywords: ["contact", "email", "phone", "whatsapp", "hire", "reach", "instagram", "linkedin", "github"],
        answer: "Get in touch directly with Mohamed:\n\n• Email: mohamedmydeen.sd@gmail.com\n• WhatsApp / Phone: +91 9344990461\n• Instagram: @mohamed_ukasha\n• LinkedIn: linkedin.com/in/mohamed-mydeen4262\n• GitHub: github.com/mohamed-mydeen"
      },
      {
        keywords: ["internship", "experience", "intern", "company"],
        answer: "Professional Experience:\n1. Software Developer Intern @ Skill Software Inc (Remote USA): Migrated Selenium suites to Playwright in Python; automated AWS deployment workflows.\n2. Full Stack Developer Intern @ Asta Systech Pvt. Ltd: Architected Java Spring Boot REST APIs with React.js & MySQL.\n3. Internships @ Gateway Software Solutions & IPCS Global."
      },
      {
        keywords: ["certifications", "certificates", "credentials"],
        answer: "Verified Credentials:\n• IIT Kharagpur (NPTEL) – Internet of Things (80% Elite Score)\n• LinkedIn Learning – Java Essentials & Git Essential Training\n• Cisco Networking Academy – Python Programming\n• Udemy – Web Development & C Systems Programming"
      },
      {
        keywords: ["where are you from", "hometown", "native", "melapalayam", "tirunelveli"],
        answer: "Mohamed is from Melapalayam, Tirunelveli, Tamil Nadu, India — the hometown where his childhood memories, friendships, and early resilience were nurtured."
      }
    ],
    []
  );

  const getBotReply = useCallback((text: string): string => {
    const query = text.toLowerCase().trim();

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
      "That's a thoughtful question! I know all about Mohamed's childhood turning point, role models (Prophet Muhammad ﷺ & Sundar Pichai), future visions, tech stack, and projects. Ask me about any of these!",
      "I'm here to share Mohamed's story and technical milestones! Would you like to know about his Best Student recognition, college education, or future aspirations?",
      "Feel free to ask about Mohamed's projects like Mydeen AI, SafeCheck ML, Feast At Night, or his technical writing on mydeenblog.vercel.app!"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }, [faqs]);

  // Auto scroll to bottom
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => cancelAnimationFrame(timer);
  }, [messages, loading]);

  const handleSend = useCallback((text: string): void => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages(prev => [...prev, { sender: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: getBotReply(trimmed) }]);
      setLoading(false);
    }, 550);
  }, [loading, getBotReply]);

  const clearChat = useCallback((): void => {
    setMessages([
      {
        sender: "bot",
        text: "Hi! I'm Mydeen FAQs 👋 Feel free to ask anything about Mohamed's projects, background, role models, or choose a topic below."
      }
    ]);
    setInput("");
  }, []);

  return (
    <>
      {/* ─── FLOATING LAUNCHER BUTTON ─────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-full border shadow-xl transition-all duration-300 select-none cursor-pointer ${
          isDark
            ? "bg-[#181818] border-white/10 text-white hover:border-[#A5A79B]"
            : "bg-[#E8D2B5] border-[#A5A79B]/40 text-[#181818] hover:border-[#A5A79B]"
        } ${
          open
            ? "opacity-0 scale-75 pointer-events-none translate-y-4"
            : "opacity-100 scale-100 pointer-events-auto translate-y-0 hover:scale-105 active:scale-95"
        }`}
        aria-label="Open Mydeen FAQs Assistant"
      >
        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#A5A79B]">
          <img
            src="/my%20photo.png"
            alt="Mohamed Mydeen"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black" />
        </div>

        <div className="hidden sm:flex flex-col items-start pr-1 text-left">
          <div className="flex items-center gap-1 text-xs font-semibold">
            <Sparkles size={11} className="text-[#A5A79B]" />
            <span>Mydeen FAQs</span>
          </div>
          <span className="text-[10px] opacity-60">Ask Anything</span>
        </div>
      </button>

      {/* ─── CLEAN, NATURAL CHAT WINDOW ───────────────────────────────────────── */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] sm:h-[560px] rounded-2xl shadow-2xl border overflow-hidden z-[100] flex flex-col transition-all duration-300 select-none font-sans ${
          isDark
            ? "bg-[#1a1a1a] border-white/10 text-[#f2efe9]"
            : "bg-[#E8D2B5] border-[#A5A79B]/40 text-[#181818]"
        } ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-8 pointer-events-none"
        }`}
      >
        {/* Header Bar */}
        <div
          className={`h-14 px-4 flex items-center justify-between border-b shrink-0 ${
            isDark ? "bg-[#222222] border-white/5" : "bg-[#A5A79B]/30 border-[#A5A79B]/30"
          }`}
        >
          {/* Avatar & Title */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#A5A79B] shrink-0">
              <img
                src="/my%20photo.png"
                alt="Mydeen FAQs Logo"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black" />
            </div>

            <div className="text-left leading-tight">
              <h3 className="text-sm font-semibold text-[#181818] dark:text-[#f2efe9]">
                Mydeen FAQs
              </h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Online &bull; Full Stack &amp; AI</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 text-black/60 dark:text-white/60">
            <button
              onClick={clearChat}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              title="Clear Conversation"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3 scrollbar-thin">
          {messages.map((msg, idx) => (
            <MessageItem key={idx} msg={msg} isDark={isDark} />
          ))}
          {loading && <LoadingIndicator isDark={isDark} />}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action FAQ Chips (Horizontal Scrollable) */}
        {messages.length < 5 && !loading && (
          <QuickActions isDark={isDark} onActionClick={handleSend} />
        )}

        {/* Clean Input Bar */}
        <div
          className={`p-3 border-t shrink-0 ${
            isDark ? "bg-[#202020] border-white/5" : "bg-[#A5A79B]/20 border-[#A5A79B]/25"
          }`}
        >
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all ${
              isDark
                ? "bg-[#161616] border-white/10 focus-within:border-[#A5A79B]"
                : "bg-white border-[#A5A79B]/40 focus-within:border-[#A5A79B]"
            }`}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask a question..."
              className="flex-1 outline-none text-xs sm:text-[13px] bg-transparent text-[#181818] dark:text-[#f2efe9] placeholder:text-black/40 dark:placeholder:text-white/40 font-normal"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || loading}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                !input.trim() || loading
                  ? "opacity-30 cursor-not-allowed bg-black/10 dark:bg-white/10 text-black/50 dark:text-white/50"
                  : "bg-[#A5A79B] text-[#181818] hover:bg-[#96988c] shadow-xs active:scale-95"
              }`}
              title="Send Message"
            >
              <Send size={12} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
