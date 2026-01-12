import React, { useMemo, useState, useEffect, useRef } from "react";
import { Send, X, MessageCircle, Moon, Sun, Trash2 } from "lucide-react";

type Sender = "user" | "bot";

type Message = {
  sender: Sender;
  text: string;
};

type FAQ = {
  keywords: string[];
  answer: string;
};

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi I'm mydeen, Welcome to my portfolio! Ask me about: skills, projects, education, internship, contact."
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqs: FAQ[] = useMemo(
    () => [
      {
        keywords: ["hi", "hello", "hey", "hii", "hlo", "hai", "vanakkam"],
        answer:
          "Hi, Welcome to my portfolio! Ask me about: skills, projects, education, internship, contact."
      },
      {
        keywords: ["assalamu alaikum", "assalamualaikum", "assalamu alaykum", "asalamu alaikum", "salam", "salaam"],
        answer:
          "Wa alaikum assalam 🤍😊 Welcome to my portfolio! Ask me about my skills, projects, education or contact details."
      },
      {
        keywords:["School","school"],
        answer:"TIME Matric Higher Secondary School, Aaraikulam tirunelveli"
      },
      {
        keywords: ["who are you", "about you", "introduce", "yourself", "tell me about you", "name"],
        answer:
          "I'm Mohamed Mydeen Shahabudeen M. I'm a passionate Full Stack Developer and Cybersecurity enthusiast. I love building modern web apps and solving real-world problems using tech."
      },
      {
        keywords: ["education", "college", "study", "department", "btech", "course"],
        answer:
          "I'm studying BTech in Computer Science and Business Systems at Francis Xavier Engineering College, Vannerapettai."
      },
      {
        keywords: ["where are you from", "hometown", "native", "place"],
        answer:
          "I'm from Melapalayam, Tirunelveli, Tamil Nadu."
      },
      {
        keywords: ["age", "how old"],
        answer:
          "I'm 20 years old."
      },
      {
        keywords: ["skills", "tech stack", "technologies", "what you know", "stack"],
        answer:
          "My technical skills include: Java, Spring Boot, REST APIs, React, HTML, CSS, JavaScript, MongoDB, MySQL, Flask basics, Git/GitHub, and Cybersecurity fundamentals."
      },
      {
        keywords: ["frontend", "ui", "design"],
        answer:
          "Frontend: HTML, CSS, JavaScript, and React. I focus on building clean, responsive user interfaces with modern design principles."
      },
      {
        keywords: ["backend", "server", "api"],
        answer:
          "Backend: Java Spring Boot (REST APIs) and Flask basics. I specialize in API development, authentication, database integration, and application deployment."
      },
      {
        keywords: ["database", "db", "sql", "mongodb", "mysql"],
        answer:
          "I work with MongoDB (NoSQL) and MySQL (SQL). My expertise includes schema design, CRUD operations, indexing, and efficient data handling."
      },
      {
        keywords: ["projects", "what projects", "your projects", "portfolio projects"],
        answer:
          "My key projects include:\n\n1. Seasonal Deceptive Website Detection System – Cybersecurity solution using URL analysis, SSL validation, domain checks, and redirection detection with Streamlit risk-scoring\n2. CRUD-Based Full Stack Application – Java Spring Boot backend with REST APIs, MySQL database, and layered architecture\n3. YouTube Data Analytics & Warehousing – Automated data pipeline using YouTube APIs, SQL analysis, and Streamlit visualization\n4. Music World – Music streaming web application\n5. Railway Complaint & Feedback System – Platform for railway passenger feedback\n6. Voting Eligibility Check – Web application for voter verification\n7. Smart Irrigation Management – AI and sensor-based irrigation system"
      },
      {
        keywords: ["best project", "top project", "main project"],
        answer:
          "My standout projects are:\n\n1. Seasonal Deceptive Website Detection System – Advanced cybersecurity solution using URL analysis, SSL validation, and risk-scoring with Streamlit\n2. YouTube Data Analytics & Warehousing – Automated data pipeline with real-time insights and visualization\n3. CRUD Full Stack Application – Complete Java Spring Boot backend with REST APIs and MySQL\n4. Smart Irrigation Management – AI and IoT-based system for smart farming"
      },
      {
        keywords: ["internship", "experience", "work", "worked"],
        answer:
          "1.Asta Systech Pvt. Ltd , India\n developing a CRUD-based full-stack\napplication using Java, Spring Boot, React.js, and SQL, with hands-on experience in RESTful APIs and database\nintegration."
      },
      {
        keywords: ["industrial visit", "iv", "company visit"],
        answer:
          "I've attended industrial visits to Msquared Software Company in Trivandrum and TwikiBot company, gaining insights into professional software development environments."
      },
      {
        keywords: ["career goal", "future", "goal", "aim", "dream"],
        answer:
          "My long-term career goal is to become an AI Developer. I'm also focusing on full-stack development skills to secure positions at leading MNCs."
      },
      {
        keywords: ["placement", "job", "mnc", "companies"],
        answer:
          "I'm preparing for placements at companies like TCS, Zoho, Microsoft, and other top MNCs. I'm actively improving my data structures and algorithms, full-stack development, and cybersecurity knowledge."
      },
      {
        keywords: ["certification", "nptel", "iot"],
        answer:
          "I'm preparing for NPTEL IoT certification and building expertise in sensors, IoT protocols, and IoT systems architecture."
      },
      {
        keywords: ["linkedin", "profile", "connections"],
        answer:
          "I have 500+ LinkedIn connections and actively maintain my professional network. Feel free to connect with me on LinkedIn!"
      },
      {
        keywords: ["hobbies", "interests", "what you like"],
        answer:
          "My interests include cricket, UI/UX design, full-stack development, digital drawing, and continuously learning emerging technologies."
      },
      {
        keywords: ["email", "mail", "contact", "reach", "message"],
        answer:
          "You can reach me via email at: mohamedmydeen.ug.23.cb@francisxavier.ac.in\n\nYou can also connect with me on LinkedIn through my portfolio website."
      },
      {
        keywords: ["portfolio", "website", "vercel", "link"],
        answer:
          "This is my portfolio website hosted on Vercel. It showcases my projects, technical skills, experience, and contact information."
      },
      {
        keywords: ["seo", "google", "search console", "ranking"],
        answer:
          "To improve Google visibility: verify the website in Google Search Console, add sitemap.xml and robots.txt, request URL indexing, and build backlinks from LinkedIn and GitHub profiles."
      }
    ],
    []
  );

  const getBotReply = (text: string): string => {
    const query = text.toLowerCase().trim();

    for (const faq of faqs) {
      for (const key of faq.keywords) {
        if (query.includes(key)) return faq.answer;
      }
    }

    return (
      "I didn't quite catch that. Feel free to ask me about my skills, projects, education, experience, career goals, or how to contact me."
    );
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = (): void => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { sender: "user", text: trimmed };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botMsg: Message = { sender: "bot", text: getBotReply(trimmed) };
      setMessages(prev => [...prev, botMsg]);
      setLoading(false);
    }, 1000);
  };

  const clearChat = (): void => {
    setMessages([
      {
        sender: "bot",
        text: "Hi machan 😄👋 Welcome to my portfolio! Ask me about: skills, projects, education, internship, contact."
      }
    ]);
    setInput("");
  };

  const bgColor = darkMode ? "bg-gray-900" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-gray-900";
  const messageBgUser = darkMode ? "bg-blue-600" : "bg-gray-900";
  const messageBgBot = darkMode ? "bg-gray-800" : "bg-white";
  const messageBorderBot = darkMode ? "border-gray-700" : "border-gray-200";
  const inputBg = darkMode ? "bg-gray-800" : "bg-white";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const chatBg = darkMode ? "bg-gray-950" : "bg-gray-50";

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={`fixed bottom-6 right-6 ${bgColor} ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"} ${textColor} rounded-full shadow-lg border ${borderColor} p-4 transition-all duration-200 hover:shadow-xl z-50 flex items-center gap-2`}
        >
          <MessageCircle size={20} />
          <span className="text-sm font-medium">Ask me</span>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-96 h-[calc(100vh-100px)] sm:h-[600px] ${bgColor} rounded-2xl shadow-2xl overflow-hidden border ${borderColor} z-50 flex flex-col`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-2">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold truncate">Mydeen</h2>
              <p className="text-gray-300 text-xs sm:text-sm truncate">Portfolio Assistant</p>
            </div>
            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="hover:bg-gray-700 p-1.5 sm:p-2 rounded-lg transition-colors"
                title={darkMode ? "Light Mode" : "Dark Mode"}
              >
                {darkMode ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
              </button>
              <button
                onClick={clearChat}
                className="hover:bg-gray-700 p-1.5 sm:p-2 rounded-lg transition-colors"
                title="Clear chat"
              >
                <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="hover:bg-gray-700 p-1 sm:p-1.5 rounded-lg transition-colors"
              >
                <X size={18} className="sm:w-[20px] sm:h-[20px]" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4 ${chatBg}`}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium ${
                    msg.sender === "user"
                      ? `${messageBgUser} text-white rounded-br-none`
                      : `${messageBgBot} ${textColor} border ${messageBorderBot} rounded-bl-none shadow-sm`
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className={`${messageBgBot} ${textColor} border ${messageBorderBot} rounded-xl sm:rounded-2xl rounded-bl-none shadow-sm px-3 sm:px-4 py-2 sm:py-3 flex gap-2`}>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`border-t ${borderColor} ${inputBg} px-4 py-3 flex gap-2`}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className={`flex-1 outline-none text-sm font-medium ${textColor} placeholder-gray-400 bg-transparent`}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className={`${textColor} hover:opacity-70 disabled:opacity-40 transition-opacity p-1`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;