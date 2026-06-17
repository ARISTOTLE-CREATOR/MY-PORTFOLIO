import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Trophy, BookOpen, Volume2, Globe, Activity, Terminal } from "lucide-react";

interface LanguageSkill {
  name: string;
  level: number; // percentage
  category: "systems" | "frontend" | "databases" | "scripting";
  experience: string;
  libs: string[];
  color: string;
}

export default function TechnicalAnalytics() {
  const [selectedLang, setSelectedLang] = useState<LanguageSkill | null>(null);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  const languageSkills: LanguageSkill[] = [
    {
      name: "TypeScript (ES6+)",
      level: 90,
      category: "frontend",
      experience: "Architecting complex type systems and responsive component states across medical portals and client showcase designs.",
      libs: ["React", " Vite", " TSX compiler", " Framer Motion"],
      color: "from-indigo-500 to-blue-500"
    },
    {
      name: "Python",
      level: 88,
      category: "systems",
      experience: "Designing computational algorithms, file parsing utilities, and scholastic data models in computer science courses.",
      libs: ["NumPy", " Pandas", " algorithms testing"],
      color: "from-[#06B6D4] to-emerald-500"
    },
    {
      name: "C & C++",
      level: 85,
      category: "systems",
      experience: "Developing structured academic algorithms and object-oriented architectures during advanced core courses.",
      libs: ["Standard Template Library (STL)", " OOP design patterns"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "SQL & PostgreSQL",
      level: 82,
      category: "databases",
      experience: "Structuring relational database schemas, designing high-frequency indexing, and optimizing subqueries.",
      libs: ["Drizzle ORM", " PostgreSQL server system", " custom indexing"],
      color: "from-emerald-500 to-cyan-500"
    },
    {
      name: "HTML5 & CSS3 (Tailwind)",
      level: 95,
      category: "frontend",
      experience: "Creating precision layout meshes with absolute fluid spacing, custom animations, and responsive pixel boundaries.",
      libs: ["Tailwind Engine", " Flexbox/Grid", " GPU hardware transitions"],
      color: "from-amber-500 to-orange-500"
    },
    {
      name: "Bash & Automation",
      level: 80,
      category: "scripting",
      experience: "Drafting micro-scripts to optimize environment deployments, automate Git logging, and clean workspace clutter.",
      libs: ["Shell utilities", " automation hooks"],
      color: "from-slate-500 to-slate-400"
    }
  ];

  // Selected language if not set, default to first
  const activeLang = selectedLang || languageSkills[0];

  const spokenLanguages = [
    {
      name: "Telugu",
      proficiency: "Native / Bilingual",
      level: 100,
      dialect: "India (Telangana regional dialect expert)",
      desc: "Primary spoken language. Fluent across written classical texts and everyday communication.",
      accent: "Native Hyderabad / Telangana inflection",
      audioWaveColor: "bg-emerald-500"
    },
    {
      name: "English",
      proficiency: "Professional Fluent",
      level: 95,
      dialect: "Global (Academic, technical, and engineering articulation)",
      desc: "Secondary language used for software documentation, public presentations, and collegiate study.",
      accent: "Clear, structured, neutral international inflection",
      audioWaveColor: "bg-indigo-500"
    },
    {
      name: "Hindi",
      proficiency: "Professional Conversational",
      level: 85,
      dialect: "India (Standard national communication)",
      desc: "Proficient conversational comprehension, connecting with team members across diverse national hubs.",
      accent: "Standard dialogue inflection",
      audioWaveColor: "bg-purple-500"
    }
  ];

  return (
    <div className="space-y-16 animate-ready">
      
      {/* Dynamic Languages Graphs Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Skill Distribution Graph (Bento Card) */}
        <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-slate-900/10 p-6 md:p-8 flex flex-col justify-between light:border-slate-200/50 light:bg-slate-50">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase font-semibold">interactive metrics</span>
                <h3 className="font-display font-medium text-lg text-white mt-1 light:text-slate-900">Languages Knowledge Benchmarks</h3>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4]">
                <Activity className="h-4 w-4" />
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-8 light:text-slate-600">
              Interactive language density map. Click or hover on a technical language to examine the practical milestones, selected libraries, and software engineering use cases.
            </p>

            {/* Custom Interactive SVG / Pure CSS Visual Bar Chart */}
            <div className="space-y-5">
              {languageSkills.map((lang) => {
                const isActive = activeLang.name === lang.name;
                const isHovered = hoveredLang === lang.name;
                
                return (
                  <div 
                    key={lang.name}
                    className="space-y-2 cursor-pointer group"
                    onClick={() => setSelectedLang(lang)}
                    onMouseEnter={() => setHoveredLang(lang.name)}
                    onMouseLeave={() => setHoveredLang(null)}
                  >
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${lang.color}`} />
                        <span className={`text-xs font-mono font-medium transition-colors ${
                          isActive || isHovered ? "text-indigo-400 light:text-indigo-600" : "text-white light:text-slate-800"
                        }`}>
                          {lang.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-450 light:text-slate-500">
                        {lang.level}% Mastery
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden light:bg-slate-200/60 relative">
                      {/* Active indicator glow */}
                      {isActive && (
                        <div className={`absolute inset-y-0 left-0 bg-gradient-to-r ${lang.color} opacity-20 blur-[2px] transition-all`} style={{ width: `${lang.level}%` }} />
                      )}
                      
                      {/* Animated visual fill */}
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full bg-gradient-to-r ${lang.color}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-slate-500 font-mono light:border-slate-200">
            <span>DATABASE INTEGRITY LEVEL: VERIFIED</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
              CPU RENDER ACTIVE
            </span>
          </div>
        </div>

        {/* Right Detail Deep Dive Inspection Display (Bento Card) */}
        <div className="lg:col-span-5 rounded-2xl border border-white/5 bg-slate-900/10 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden light:border-slate-200/50 light:bg-slate-50">
          
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-600/[0.03] blur-[40px] pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 light:bg-indigo-600" />
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 light:text-indigo-600 uppercase font-bold">MILITARY-SPEC PROFILES</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLang.name}
                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "none" }}
                exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-display font-medium text-xl text-white light:text-slate-900">
                    {activeLang.name}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-1 light:text-slate-500 uppercase">
                    category: <span className="text-[#06B6D4]">{activeLang.category}</span>
                  </p>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/[0.03] rounded-xl light:bg-slate-100/60 light:border-slate-200">
                  <h5 className="text-[9px] font-mono text-slate-450 uppercase mb-1.5 light:text-slate-500">Acquired Application Scope</h5>
                  <p className="text-xs text-slate-300 leading-relaxed light:text-slate-700 text-justify">
                    {activeLang.experience}
                  </p>
                </div>

                <div>
                  <h5 className="text-[9px] font-mono text-slate-450 uppercase mb-2 light:text-slate-500">Libraries, Environments & Utilities</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLang.libs.map((lib, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-mono bg-indigo-600/10 border border-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded light:bg-indigo-600/5 light:border-indigo-500/20 light:text-indigo-600"
                      >
                        {lib.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-white/5 bg-slate-950/20 mt-6 light:bg-slate-100 light:border-slate-200 flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-slate-900/60 text-slate-400 flex items-center justify-center light:bg-white light:text-slate-600 shrink-0">
              <Terminal className="h-4 w-4" />
            </div>
            <p className="text-[10px] text-slate-450 leading-normal light:text-slate-500">
              Click individual bars on the left distribution matrix to swap the inspected profile context card.
            </p>
          </div>

        </div>

      </div>

      {/* Languages I Speak Proficiently (Bento Card) */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/10 p-6 md:p-8 light:border-slate-200/50 light:bg-slate-50">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase font-bold">vocal capabilities</span>
            <h3 className="font-display font-medium text-lg text-white mt-1 light:text-slate-900">Languages Spoken Proficiently</h3>
            <p className="text-xs text-slate-400 mt-1 light:text-slate-500">Highly fluent communication across technical groups, international peers and local workspaces.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-slate-950/20 text-[10px] font-mono text-slate-400 light:bg-slate-100 light:border-slate-200 light:text-slate-600">
            <Globe className="h-3.5 w-3.5 text-indigo-400" />
            <span>Multi-Lingual Integration</span>
          </div>
        </div>

        {/* Spoken Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spokenLanguages.map((lang, idx) => (
            <motion.div 
              key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-xl border border-white/5 bg-slate-950/10 hover:bg-slate-950/30 hover:border-white/10 transition-all duration-300 p-5 flex flex-col justify-between light:bg-white light:border-slate-200/80 light:hover:border-slate-300 light:shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white light:text-slate-940 light:text-slate-800">{lang.name}</h4>
                    <span className="text-[9px] font-mono text-indigo-400 light:text-indigo-600 uppercase font-semibold">{lang.proficiency}</span>
                  </div>
                  <div className="h-7 w-7 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center light:bg-slate-50 light:border-slate-200">
                    <Volume2 className="h-3.5 w-3.5 text-slate-400 light:text-slate-600 group-hover:scale-110 transition" />
                  </div>
                </div>

                <div className="h-[1px] w-8 bg-white/10 mb-4 group-hover:w-16 transition-all duration-300 light:bg-slate-200" />

                <p className="text-xs text-slate-400 leading-relaxed mb-4 light:text-slate-600 text-justify text-justify">
                  {lang.desc}
                </p>
              </div>

              <div className="space-y-3 mt-4">
                {/* Accent Detail */}
                <div className="text-[10px] text-slate-450 font-mono flex flex-col gap-0.5 light:text-slate-500">
                  <span className="text-[8px] uppercase tracking-wide opacity-60">Accent Inflection</span>
                  <span className="text-slate-350 light:text-slate-700 font-sans text-xs">{lang.accent}</span>
                </div>

                {/* Pulsating Voice-Wave Visualizer Bar Matrix */}
                <div className="flex items-center gap-1 pt-2 h-6 border-t border-white/[0.04] light:border-slate-100">
                  <span className="text-[8px] font-mono text-slate-400 uppercase mr-2 light:text-slate-500">Waveform:</span>
                  <div className="flex items-end gap-[2px] h-3.5">
                    {[
                      { h: "h-2", speed: "1.1s" },
                      { h: "h-3", speed: "0.8s" },
                      { h: "h-1.5", speed: "1.4s" },
                      { h: "h-3.5", speed: "0.6s" },
                      { h: "h-2.5", speed: "1s" },
                      { h: "h-3", speed: "0.9s" },
                      { h: "h-1.5", speed: "1.2s" },
                      { h: "h-2", speed: "1.5s" }
                    ].map((wave, i) => (
                      <div
                        key={i}
                        className={`w-[2px] rounded-full ${lang.audioWaveColor} opacity-75`}
                        style={{
                          height: lang.level === 100 ? "100%" : `${lang.level * 0.8}%`,
                          animationName: "pulseVoice",
                          animationDuration: wave.speed,
                          animationIterationCount: "infinite",
                          animationTimingFunction: "ease-in-out"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Dialect info sticker */}
              <div className="mt-4 pt-4 border-t border-white/[0.03] text-[9px] font-mono text-slate-550 light:text-slate-500 light:border-slate-100 italic">
                {lang.dialect}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Embedded Animations CSS for waveforms */}
      <style>{`
        @keyframes pulseVoice {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1.1); }
        }
      `}</style>

    </div>
  );
}
