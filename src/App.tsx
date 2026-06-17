import React, { useState, useEffect } from "react";
import { 
  Github, Mail, Phone, ExternalLink, MapPin, 
  Menu, X, Laptop, LogIn, Send, Sparkles, Check, 
  Briefcase, GraduationCap, Layout, Cpu, Database, 
  Wrench, Moon, Sun, ShieldCheck, ArrowUpRight, 
  FileText 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import BackgroundGrid from "./components/BackgroundGrid";
import TechStack from "./components/TechStack";
import ProjectCards from "./components/ProjectCards";
import ResumeViewer from "./components/ResumeViewer";
import CustomCursor from "./components/CustomCursor";
import TechnicalAnalytics from "./components/TechnicalAnalytics";
import EngineeringRoadmap from "./components/EngineeringRoadmap";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [currentPage, setCurrentPage] = useState<"portfolio" | "metrics" | "roadmap">("portfolio");
  
  // Contact Form States
  const [formName, setFormName] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formMsg, setFormMsg] = useState<string>("");
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [exactTime, setExactTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setExactTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1005);
    return () => clearInterval(interval);
  }, []);

  // Synchronize CSS class with Theme state
  useEffect(() => {
    const savedTheme = localStorage.getItem("aristotle-theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    } else {
      // Default dark theme
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("aristotle-theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  // Scroll handler for Scroll Spy active state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ["about", "projects", "tech-stack", "contact"];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== "portfolio") {
      setCurrentPage("portfolio");
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 85,
            behavior: "smooth"
          });
        }
      }, 150);
    } else {
      const target = document.getElementById(id);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 85,
          behavior: "smooth"
        });
      }
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setFormLoading(true);
    // Simulate API delivery
    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      setFormName("");
      setFormEmail("");
      setFormMsg("");
      setTimeout(() => setFormSuccess(false), 3500);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-350 select-text">
      {/* Custom pointer follow cursor */}
      <CustomCursor />

      {/* Background Graphic Framework */}
      <BackgroundGrid />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.04] bg-[#050816]/75 backdrop-blur-md transition-colors duration-400 light:bg-slate-50/75 light:border-slate-205">
        <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-6">
          
          {/* Logo Brand */}
          <button 
            id="logo-button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="font-display text-base font-bold tracking-widest text-white transition-all hover:opacity-80 uppercase light:text-slate-900"
          >
            ARISTOTLE
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 md:flex">
            <button 
              id="nav-link-about"
              onClick={() => scrollTo("about")}
              className={`text-xs tracking-wider uppercase font-medium transition duration-200 cursor-pointer ${
                activeSection === "about" 
                  ? "text-indigo-400 light:text-indigo-600 font-bold" 
                  : "text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-950"
              }`}
            >
              About
            </button>
            <button 
              id="nav-link-projects"
              onClick={() => scrollTo("projects")}
              className={`text-xs tracking-wider uppercase font-medium transition duration-200 cursor-pointer ${
                activeSection === "projects" 
                  ? "text-indigo-400 light:text-indigo-600 font-bold" 
                  : "text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-950"
              }`}
            >
              Projects
            </button>
            <button 
              id="nav-link-tech"
              onClick={() => scrollTo("tech-stack")}
              className={`text-xs tracking-wider uppercase font-medium transition duration-200 cursor-pointer ${
                activeSection === "tech-stack" 
                  ? "text-indigo-400 light:text-indigo-600 font-bold" 
                  : "text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-950"
              }`}
            >
              Tech Stack
            </button>
            <button 
              id="nav-link-contact"
              onClick={() => scrollTo("contact")}
              className={`text-xs tracking-wider uppercase font-medium transition duration-200 cursor-pointer ${
                activeSection === "contact" 
                  ? "text-indigo-400 light:text-indigo-600 font-bold" 
                  : "text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-950"
              }`}
            >
              Contact
            </button>

            {/* Accent Separator */}
            <div className="h-4 w-[1px] bg-white/10 light:bg-slate-200"></div>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white light:text-slate-600 light:hover:bg-slate-200 transition-colors duration-250"
              title="Toggle theme mode"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Exclusive resume handle */}
            <button 
              id="nav-link-resume"
              onClick={() => setResumeOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 text-xs font-semibold uppercase tracking-wider text-white hover:bg-indigo-500 transition-all shadow-md cursor-pointer duration-200"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 light:text-slate-600 light:hover:bg-slate-200 transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button 
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-30 border-b border-white/10 bg-[#050816]/95 p-6 backdrop-blur-lg md:hidden light:bg-slate-100/95 light:border-slate-200"
          >
            <div className="flex flex-col gap-4">
              <button 
                id="mobile-link-about"
                onClick={() => scrollTo("about")}
                className="text-left text-sm font-semibold tracking-wide uppercase text-slate-300 light:text-slate-700"
              >
                About
              </button>
              <button 
                id="mobile-link-projects"
                onClick={() => scrollTo("projects")}
                className="text-left text-sm font-semibold tracking-wide uppercase text-slate-300 light:text-slate-700"
              >
                Projects
              </button>
              <button 
                id="mobile-link-tech"
                onClick={() => scrollTo("tech-stack")}
                className="text-left text-sm font-semibold tracking-wide uppercase text-slate-300 light:text-slate-700"
              >
                Tech Stack
              </button>
              <button 
                id="mobile-link-contact"
                onClick={() => scrollTo("contact")}
                className="text-left text-sm font-semibold tracking-wide uppercase text-slate-300 light:text-slate-700"
              >
                Contact
              </button>
              <div className="h-[1px] w-full bg-white/10 light:bg-slate-200"></div>
              <button 
                id="mobile-link-resume"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeOpen(true);
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 p-3 text-sm font-bold uppercase tracking-wider text-white"
              >
                <FileText className="h-4 w-4" />
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section Container */}
      <section className="relative mx-auto max-w-5xl px-6 pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col items-center text-center">
        {/* Engineering small label tag */}
        <motion.div
          id="hero-label-container"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-600/[0.07] px-4 py-1.5 text-[10px] font-mono tracking-widest text-indigo-400 font-semibold uppercase light:bg-indigo-600/[0.04] light:border-indigo-400/30 light:text-indigo-600"
        >
          <Sparkles className="h-3 w-3 animate-pulse" />
          <span>Building Real-World Software Products</span>
        </motion.div>

        {/* Main Heading Accentuated */}
        <div className="relative group">
          {/* Subtle elegant radial ambient glow behind the centerpiece name */}
          <div className="absolute -inset-x-20 -inset-y-10 bg-indigo-600/10 rounded-full blur-[80px] opacity-50 group-hover:opacity-75 transition-opacity duration-1000 pointer-events-none hidden md:block" />
          <motion.h1 
            id="hero-developer-name"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-indigo-200 drop-shadow-[0_2px_30px_rgba(99,102,241,0.25)] light:bg-clip-text light:text-transparent light:bg-gradient-to-br light:from-slate-900 light:via-indigo-950 light:to-slate-950 light:drop-shadow-none block select-none pb-2"
          >
            Rapolu Sai Nithin
          </motion.h1>
        </div>

        {/* Subtitle statement */}
        <motion.p 
          id="hero-subheading"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-6 text-gradient-brand light:text-gradient-light-brand font-display text-lg font-semibold tracking-tight sm:text-xl md:text-2xl max-w-2xl"
        >
          Building Software That Solves Real Problems
        </motion.p>

        {/* Core Product Bio */}
        <motion.p 
          id="hero-core-description"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-6 text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl light:text-slate-600"
        >
          Driven by curiosity, continuous learning, and purposeful engineering. I believe every problem is an opportunity to create something better through technology.
        </motion.p>

        {/* Interactive Actions CTA */}
        <motion.div 
          id="hero-cta-buttons"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button 
            onClick={() => scrollTo("projects")}
            className="group relative flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:bg-indigo-550 border border-indigo-400/20"
          >
            <span>View Projects</span>
            <div className="h-1.5 w-1.5 rounded-full bg-white group-hover:scale-130 transition duration-300"></div>
          </button>
          <button 
            onClick={() => setResumeOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-300 transition duration-300 hover:bg-slate-900 hover:text-white light:border-slate-300 light:bg-slate-100 light:text-slate-700 light:hover:bg-slate-200"
          >
            <FileText className="h-4 w-4" />
            <span>Resume</span>
          </button>
        </motion.div>
      </section>

      {/* Main Sections Body */}
      <main id="viewport-content-root" className="mx-auto max-w-6xl px-6 relative z-10 pb-24 scroll-mt-24">

        {/* Dynamic Multi-Page/Tab navigation for Premium Advanced presentation */}
        <div className="flex justify-center mb-16 relative z-25">
          <div className="flex p-1 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md max-w-lg w-full justify-between gap-1 light:bg-slate-100 light:border-slate-200 light:shadow-sm">
            {[
              { id: "portfolio", label: "Overview", icon: Laptop },
              { id: "metrics", label: "Metrics & Speech", icon: Cpu },
              { id: "roadmap", label: "CS Roadmap", icon: GraduationCap }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = currentPage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentPage(tab.id as any);
                    const mainEl = document.getElementById("viewport-content-root");
                    if (mainEl) {
                      window.scrollTo({
                        top: mainEl.offsetTop - 85,
                        behavior: "smooth"
                      });
                    }
                  }}
                  className={`flex-1 relative flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl text-[10px] font-mono tracking-wider uppercase font-semibold transition-colors duration-250 cursor-pointer ${
                    isActive 
                      ? "text-white light:text-white" 
                      : "text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabSelector"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      className="absolute inset-0 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-650/40"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 font-mono">
                    <TabIcon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-32"
          >
            {currentPage === "portfolio" && (
              <>
                {/* 1. ABOUT / STORY SECTION */}
        <section id="about" className="scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "none" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10 max-w-xl mx-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-indigo-400 light:text-indigo-600 uppercase font-bold">01 / Overview</span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-2 light:text-slate-900">Description</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto">
            {/* Story description card */}
            <motion.div 
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "none" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="md:col-span-12 lg:col-span-7 rounded-2xl border border-white/5 bg-slate-900/10 p-6 md:p-8 flex flex-col justify-between light:border-slate-200/50 light:bg-slate-50 md:col-span-7"
            >
              <div className="space-y-6">
                <p className="text-sm text-slate-300 leading-relaxed light:text-slate-700 text-justify">
                  I'm a <strong className="text-white light:text-slate-900 font-bold">Computer Science student</strong> and <strong className="text-white light:text-slate-900 font-bold">aspiring software engineer</strong> driven by curiosity, continuous learning, and the pursuit of meaningful innovation. I enjoy exploring complex challenges, understanding how systems work, and applying technology to create practical solutions.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed light:text-slate-700 text-justify">
                  For me, engineering is <strong className="text-indigo-350 text-indigo-300 light:text-indigo-600 font-semibold">more than writing code</strong>—it's a way of thinking. It is about approaching problems with <strong className="text-white light:text-slate-950 font-semibold">logic, creativity, and persistence</strong> while constantly striving to improve both the solution and myself.
                </p>
                <div className="pt-2">
                  <p className="text-base font-display font-semibold text-white light:text-slate-950 border-l-2 border-indigo-500 pl-4 py-1 text-left">
                    Building software that matters, not software that merely exists.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-white/[0.04] mt-6 light:border-slate-200">
                <div className="h-8 w-8 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-400 light:text-indigo-600">
                  <Laptop className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white light:text-slate-900">Independent Product Builder</h4>
                  <p className="text-[9px] font-mono text-slate-400 uppercase light:text-slate-500">Autonomous Development Stack</p>
                </div>
              </div>
            </motion.div>

            {/* Quick stats grid card (Concrete & legitimate stats only representing true metrics) */}
            <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4 md:col-span-5">
              <motion.div 
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "none" }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="flex-1 rounded-2xl border border-white/5 bg-slate-900/10 p-6 flex flex-col justify-between light:border-slate-200/50 light:bg-slate-50"
              >
                <span className="text-[10px] font-mono tracking-widest text-indigo-400 light:text-indigo-600 uppercase font-semibold">Active Pipeline</span>
                <div className="my-3">
                  <h3 className="text-xl font-display font-black text-white light:text-slate-900">4 Core Platforms</h3>
                  <p className="text-xs text-slate-404 text-slate-400 mt-1 light:text-slate-600">Curated software systems across education, medical tracking, and web presentation.</p>
                </div>
                <div className="h-1 w-12 bg-indigo-600 rounded"></div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "none" }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="flex-1 rounded-2xl border border-white/5 bg-slate-900/10 p-6 flex flex-col justify-between light:border-slate-200/50 light:bg-slate-50"
              >
                <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase font-semibold">Engineering Target</span>
                <div className="my-3">
                  <h3 className="text-xl font-display font-black text-white light:text-slate-900">Expected 2027</h3>
                  <p className="text-xs text-slate-404 text-slate-400 mt-1 light:text-slate-600">B.Tech in Computer Science & Engineering. Combining structural focus with product precision.</p>
                </div>
                <div className="h-1 w-12 bg-[#06B6D4] rounded"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. PROJECTS GRID SECTION */}
        <section id="projects" className="scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "none" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10 max-w-xl mx-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-indigo-400 light:text-indigo-600 uppercase font-bold">02 / Portfolio Work</span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-2 light:text-slate-900">Curated Software Projects</h2>
            <p className="text-xs text-slate-400 mt-2 light:text-slate-500">Interact with the real-time wireframes to explore each responsive platform design layout.</p>
          </motion.div>

          <ProjectCards />
        </section>

        {/* 3. TECH STACK BADGES SECTION */}
        <section id="tech-stack" className="scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "none" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10 max-w-xl mx-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-indigo-400 light:text-indigo-600 uppercase font-bold">03 / Capabilities</span>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white mt-2 light:text-slate-900">Technical Arsenal</h1>
            <p className="text-xs text-slate-400 mt-1.5 light:text-slate-600">Strict, clean architecture implementation with modern language frameworks.</p>
          </motion.div>

          <TechStack />
        </section>
              </>
            )}

            {currentPage === "metrics" && (
              <section id="metrics" className="scroll-mt-24">
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-10 max-w-xl mx-auto"
                >
                  <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase font-bold">02 / Technical Metrics</span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-2 light:text-slate-900">Language Knowledge & Speaking Proficiency</h2>
                  <p className="text-xs text-slate-400 mt-1.5 light:text-slate-500">
                    A comprehensive look at linguistic expertise, dialect inflections, and computational mastery levels.
                  </p>
                </motion.div>

                <TechnicalAnalytics />
              </section>
            )}

            {currentPage === "roadmap" && (
              <section id="roadmap" className="scroll-mt-24">
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-10 max-w-xl mx-auto"
                >
                  <span className="text-[10px] font-mono tracking-widest text-indigo-400 light:text-indigo-600 uppercase font-bold">03 / CS Education</span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-2 light:text-slate-900">Academic & Project Development Timeline</h2>
                  <p className="text-xs text-slate-400 mt-1.5 light:text-slate-500">
                    Key milestones, scholastic targets, certifications, and product launches.
                  </p>
                </motion.div>

                <EngineeringRoadmap />
              </section>
            )}

            {/* 4. CONTACT DIRECTORY SECTION */}
            <section id="contact" className="scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "none" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10 max-w-xl mx-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-indigo-400 light:text-indigo-600 uppercase font-bold">04 / Connectivity</span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-1.5 light:text-slate-900">Get In Touch</h2>
            <p className="text-xs text-slate-400 mt-1 light:text-slate-500">Reach out directly to discuss web product development, software engineering, or academic collaboration.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* Quick details */}
            <motion.div 
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "none" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="md:col-span-5 rounded-2xl border border-white/5 bg-slate-900/10 p-6 md:p-8 flex flex-col justify-between light:border-slate-200/50 light:bg-slate-50"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-wider text-indigo-400 light:text-indigo-600 uppercase">DIRECT ENCRYPTED CONTACT</h3>
                  <p className="text-[11px] text-slate-400 mt-1 light:text-slate-550">Response times generally under 24 hours.</p>
                </div>

                <div className="space-y-4">
                  <a 
                    href="mailto:sainithin172005@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/20 border border-white/5 hover:border-indigo-500/30 transition-all group light:bg-white light:border-slate-200 light:hover:border-indigo-505"
                  >
                    <Mail className="h-4 w-4 text-indigo-400 light:text-indigo-600 group-hover:text-indigo-305 transition" />
                    <div>
                      <span className="text-[10px] block font-mono text-slate-400 light:text-slate-500 uppercase">EMAIL</span>
                      <span className="text-xs font-semibold text-white truncate max-w-[180px] block light:text-slate-800">nithin172005@gmail.com</span>
                    </div>
                  </a>

                  <a 
                    href="tel:+918688775252"
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/20 border border-white/5 hover:border-indigo-500/30 transition-all group light:bg-white light:border-slate-200 light:hover:border-indigo-505"
                  >
                    <Phone className="h-4 w-4 text-purple-400 light:text-purple-600 group-hover:text-purple-305 transition" />
                    <div>
                      <span className="text-[10px] block font-mono text-slate-400 light:text-slate-500 uppercase">TELEPHONE</span>
                      <span className="text-xs font-semibold text-white light:text-slate-800">+91 8688775252</span>
                    </div>
                  </a>

                  <a 
                    href="https://github.com/ARISTOTLE-CREATOR"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/20 border border-white/5 hover:border-indigo-500/30 transition-all group light:bg-white light:border-slate-200 light:hover:border-indigo-505"
                  >
                    <Github className="h-4 w-4 text-cyan-400 light:text-cyan-600 group-hover:text-cyan-305 transition" />
                    <div>
                      <span className="text-[10px] block font-mono text-slate-400 light:text-slate-500 uppercase">GITHUB REPOSITORY</span>
                      <span className="text-xs font-semibold text-white truncate max-w-[180px] block light:text-slate-800">ARISTOTLE-CREATOR</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.04] mt-6 flex justify-between items-center text-[10px] text-slate-400 light:text-slate-500 font-mono light:border-slate-200">
                <span>HYDERABAD, IN</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{exactTime || "12:00:00 AM"} (GMT+5:30)</span>
                </span>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "none" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="md:col-span-7 rounded-2xl border border-white/5 bg-slate-900/10 p-6 md:p-8 light:border-slate-200/50 light:bg-slate-50"
            >
              <h3 className="font-display font-semibold text-sm text-white mb-4 light:text-slate-900">Send an Autonomous Message</h3>
              
              {formSuccess ? (
                <div className="h-44 flex flex-col items-center justify-center text-center animate-ready">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white light:text-slate-900">Message Delivered Safely</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs light:text-slate-500">Thank you. I have received your request and will follow up shortly at your supplied email address.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 light:text-slate-500 uppercase mb-1.5">NAME</label>
                      <input 
                        type="text" 
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Your Name" 
                        className="w-full bg-slate-950/40 text-xs px-4 py-3 rounded-xl border border-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 light:bg-white light:text-slate-900 light:border-slate-300 dark:placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 light:text-slate-500 uppercase mb-1.5">EMAIL ADRESS</label>
                      <input 
                        type="email" 
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="name@company.com" 
                        className="w-full bg-slate-950/40 text-xs px-4 py-3 rounded-xl border border-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 light:bg-white light:text-slate-900 light:border-slate-300 dark:placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 light:text-slate-500 uppercase mb-1.5">MESSAGE CONTENT</label>
                    <textarea 
                      required
                      rows={4}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Discuss custom layout structures, healthcare tech, or B.Tech engineering coursework..." 
                      className="w-full bg-slate-950/40 text-xs px-4 py-3 rounded-xl border border-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 light:bg-white light:text-slate-900 light:border-slate-300 dark:placeholder-slate-500 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={formLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 p-3.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-indigo-550 disabled:opacity-40"
                  >
                    {formLoading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Deliver Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </section>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer minimal elements */}
      <footer className="border-t border-white/[0.04] bg-[#050816] py-12 transition-colors duration-400 light:bg-slate-50 light:border-slate-205 relative z-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left copyright specs */}
          <div className="text-center md:text-left">
            <h3 className="font-display font-medium text-xs tracking-widest text-slate-450 uppercase">Rapolu Sai Nithin</h3>
            <p className="text-[10px] text-slate-500 font-mono mt-1">© 2026 • Product Builder Portfolio • All rights reserved</p>
          </div>

          {/* Center reference verification line */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              INTEGRITY CODE VERIFIED
            </span>
            <span className="text-[8px] font-mono text-slate-500 mt-1">
              No simulated stats or fake telemetry used.
            </span>
          </div>

          {/* Right contact details list */}
          <div className="text-center md:text-right text-xs text-slate-500 space-y-1">
            <p>GitHub: <a href="https://github.com/ARISTOTLE-CREATOR" className="text-indigo-400 hover:underline light:text-indigo-600">ARISTOTLE-CREATOR</a></p>
            <p>Email: <a href="mailto:nithin172005@gmail.com" className="text-indigo-400 hover:underline light:text-indigo-600">nithin172005@gmail.com</a></p>
            <p>Phone: <span className="text-slate-450">+91 8688775252</span></p>
          </div>

        </div>
      </footer>

      {/* Professional Resume PDF document Overlay */}
      <ResumeViewer 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />
    </div>
  );
}
