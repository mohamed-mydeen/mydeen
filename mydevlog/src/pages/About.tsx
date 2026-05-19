import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github } from 'lucide-react';

const SKILLS = [
  { icon: '⚛️', label: 'React & TypeScript', desc: 'Production-grade UI engineering' },
  { icon: '🐍', label: 'Python & FastAPI', desc: 'High-throughput async backends' },
  { icon: '🤖', label: 'AI/ML Systems', desc: 'LLMs, RAG, and inference pipelines' },
  { icon: '🗄️', label: 'Databases', desc: 'PostgreSQL, MongoDB, Supabase' },
  { icon: '📱', label: 'PWA Engineering', desc: 'Offline-first, installable web apps' },
  { icon: '🔒', label: 'Security Systems', desc: 'Threat detection and URL analysis' },
];



const About: React.FC = () => (
  <main className="pt-24 pb-20 min-h-screen">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border border-slate-200/60 dark:border-white/10 shadow-xl shadow-indigo-200/20 dark:shadow-black/40 bg-slate-50 dark:bg-ink-900">
              <img src="/my-photo.png" alt="Mohamed Mydeen" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg bg-emerald-400 border-2 border-white dark:border-ink-950 shadow-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-2">About Me</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-3">
              Mohamed Mydeen<br />Shahabudeen
            </h1>
            <p className="text-[15px] text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
              Full Stack & AI Engineer · BTech Computer Science
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/mohamed-mydeen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[13px] font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="https://mydeenai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300 text-[13px] font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                Mydeen AI <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Biography - The Journey of Transformation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-6 tracking-tight">Biography</h2>
        
        <div className="space-y-6 text-[15px] text-slate-600 dark:text-slate-400 leading-[1.85] text-justify">
          <p>
            I am Mohamed Mydeen, born in 2005 in Melapalayam, Tirunelveli, Tamil Nadu, where I was also raised. Melapalayam is more than just my hometown — it is the place where my childhood memories, friendships, and some of the most beautiful moments of my life were created.
          </p>

          <p>
            I began my early education in Melapalayam, completing my LKG and UKG there. Later, I started my 1st standard in Kayalpatnam, but life brought an unexpected and painful turning point at a very young age. During that time, I lost my father. At an age where I could not fully understand the meaning of such a loss, life had already begun teaching me difficult lessons.
          </p>

          <p>
            After that, I continued my education back in Melapalayam. During my early academic years, studies were not my strength. I often struggled, failed in exams, and lacked confidence in myself.
          </p>

          <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">The Turning Point</h3>
            <p>
              But my life changed completely during 7th standard.
            </p>
            <p>
              At that crucial stage, one of my teachers — a person I will always remain deeply grateful to — noticed my situation, understood what I was going through, and spoke to me with genuine care and guidance.
            </p>
            <p className="italic text-slate-700 dark:text-slate-300 font-medium">
              "That conversation became the single most important turning point in my life. Her words awakened something inside me. For the first time, I truly realized that my circumstances did not have to decide my future. I understood that if I believed in myself and worked hard, I could change my path."
            </p>
            <p>
              That moment transformed my mindset. I made a promise to myself that I would study seriously and build a better future. By the very next examination, I went from being a student who struggled and failed to securing 2nd rank in my class.
            </p>
            <p className="text-[13px] text-slate-500 dark:text-slate-500 italic">
              I sincerely pray that God blesses that teacher abundantly, because her guidance changed the direction of my life forever.
            </p>
          </div>

          <p>
            From then onward, confidence replaced fear. Hard work replaced doubt. Success became part of my journey. I gradually became one of the top-performing students in my class.
          </p>

          <p>
            By 9th standard, life became even more meaningful and beautiful, thank God. Despite family struggles, emotional challenges, and hardships, I continued moving forward with patience, faith, and determination.
          </p>

          <p>
            My academic journey reached an important milestone in my 12th standard, proving to myself how far transformation can take a person.
          </p>
        </div>
      </motion.section>

      {/* Philosophy & Travel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 tracking-tight">Philosophy & Exploration</h2>
        <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-[1.85]">
          Beyond tech, I hold a profound connection to the natural world. I want to explore nature and travel all around the world to gain knowledge, experience, and wisdom. For me, travel is an inner journey as much as an outer one — traveling by heart, exploring nature by soul.
        </p>
      </motion.section>

      {/* Role Models */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-5 tracking-tight">Role Models</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Life Role Model</span>
            <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg mt-1 mb-2">Prophet Muhammad (peace be upon him)</h3>
            <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed">
              My ultimate guide for character, morality, social justice, and leadership. His teachings inspire me to live with integrity, compassion, and dedication to serving humanity.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Career Role Model</span>
            <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg mt-1 mb-2">Sundar Pichai</h3>
            <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed">
              As the CEO of Google, his humble origins, product leadership, global vision, and impact on the global technology landscape inspire my engineering ambitions and career path.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Future Visions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-5 tracking-tight">Future Visions</h2>
        <div className="space-y-4 text-[15px] text-slate-600 dark:text-slate-400 leading-[1.85]">
          <p>
            My aspirations extend far beyond engineering. I aim to venture into business, with goals to establish dynamic IT companies and build premium restaurant networks. 
          </p>
          <p>
            Simultaneously, I have a deep call toward public service. I want to be a good, honest politician for the people — working directly on the ground to bring positive social welfare and real progressive changes to our society.
          </p>
          <p className="pt-2 text-slate-900 dark:text-white font-semibold font-display italic text-base">
            "I want to achieve success in this world, and ultimate success in the hereafter."
          </p>
          <p className="text-[13px] text-slate-400 dark:text-slate-500 leading-relaxed">
            My ultimate life equation: to achieve meaningful success in this temporary world, while ensuring true, eternal success in the hereafter.
          </p>
        </div>
      </motion.section>

      {/* Best Student Award Detail */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-5 tracking-tight">Best Student of the Year (2022–2023)</h2>
        <div className="space-y-4 text-[15px] text-slate-600 dark:text-slate-400 leading-[1.85]">
          <p>
            One of the proudest recognitions in my student life was being awarded Best Student of the Year (2022–2023).
          </p>
          <p>
            This recognition was not given solely for academic performance. It was awarded to students who demonstrated discipline, respectful behavior toward teachers, good character, consistency, responsibility, prayerfulness, and positive conduct in all aspects of student life.
          </p>
          <p>
            Teachers shortlisted a select group of deserving students, and the final decision was made through voting. By the grace of God, I was selected as the winner. This achievement meant far more than an award — it represented the values, character, and discipline I had worked to build.
          </p>
        </div>
      </motion.section>

      {/* Academic & Professional Journey */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-5 tracking-tight">Present Day</h2>
        <div className="space-y-4 text-[15px] text-slate-600 dark:text-slate-400 leading-[1.85]">
          <p>
            Continuing my educational journey, I joined the college I had genuinely hoped to study in — Francis Xavier Engineering College, where I am currently pursuing a B.Tech in Computer Science and Business Systems.
          </p>
          <p>
            Today, I am deeply passionate about software development, full-stack engineering, artificial intelligence, product building, and creating impactful digital experiences.
          </p>
        </div>
      </motion.section>

      {/* Inspirational Quote */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center max-w-xl mx-auto py-6 border-t border-b border-slate-100 dark:border-white/5"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">A Core Realization</span>
        <p className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white leading-relaxed mt-2 mb-3">
          "Your circumstances do not define your future. Your faith, mindset, discipline, and determination do."
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          From a child who once struggled academically to becoming a class topper, Best Student of the Year, and a builder of digital products, my story is a reminder that transformation is always possible. And this is only the beginning.
        </p>
      </motion.section>

      {/* Skills Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-6 tracking-tight">What I Work With</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-slate-200/60 dark:border-white/10 bg-white dark:bg-ink-900 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors"
            >
              <span className="text-2xl flex-shrink-0">{skill.icon}</span>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-[13px]">{skill.label}</p>
                <p className="text-[12px] text-slate-500 dark:text-slate-500 mt-0.5">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>



      {/* CTA */}
      <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100 dark:border-white/10">
        <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[13px] font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors">
          Read my writing <ArrowUpRight size={13} />
        </Link>
        <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300 text-[13px] font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
          Get in touch
        </Link>
      </div>
    </div>
  </main>
);

export default About;
