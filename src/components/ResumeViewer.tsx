import React, { useState, useEffect } from "react";
import { 
  X, ZoomIn, ZoomOut, RotateCcw, Printer, Download, 
  ChevronLeft, ChevronRight, FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [zoom, setZoom] = useState<number>(100);

  // Add escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Download Handler (downloads traditional ATS-friendly, clean Markdown/Plaintext resume representation)
  const handleDownload = () => {
    const resumeText = `RAPOLU SAI NITHIN
Telangana, India • nithin172005@gmail.com • +91 8688775252 • github.com/ARISTOTLE-CREATOR

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Deconstructive Computer Science undergraduate developer specializing in structured, highly stable application cycles, front-to-back state design, and performant localized interfaces. Committed to utilizing rigorous architectural boundaries to deploy clean web solutions that systematically address regional healthcare and academic distribution inefficiencies.

================================================================================
EDUCATION
================================================================================
St. Martin's Engineering College, JNTUH
Bachelor of Technology (B.Tech) – Computer Science & Engineering (Artificial Intelligence & Machine Learning) (2023 – 2027)
• Current CGPA: 7.5/10
• Relevant Coursework: Data Structures and Algorithms, Database Management Systems (DBMS), Operating Systems, Object-Oriented Programming (C++), Software Engineering, Computer Networks, Artificial Intelligence, Machine Learning.

Narayana Junior College (2021 – 2023)
Intermediate (MPC)
• Percentage: 73%

Narayana High School (2021)
Secondary School Certificate (SSC)
• GPA: 10.0/10

================================================================================
TECHNICAL SKILLS
================================================================================
• Languages: Python, C, C++, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3
• Frontend Systems: React, Next.js, Redux State Toolkit, Tailwind CSS, DOM APIs, Responsive Layouts
• Databases / BaaS: PostgreSQL, MySQL Database, Supabase (Active Postgres), Firebase, MongoDB
• Developer Tools: Git, GitHub VCS, Visual Studio Code, Figma, Postman, Vercel Edge, GitHub Actions CI

================================================================================
RELEVANT PROJECTS
================================================================================
1. ARISTOTLE CURA — Healthcare Ecosystem Staging Platform
   • Overview: Programmed a decentralized health portal aligning clinical appointment routes, ambulance logs, and doctor calendars.
   • Technologies: React, TypeScript, Local Storage, HTML5, Tailwind CSS.
   • Architecture Decisions: Deployed custom modular state managers saving active booking entries directly into stable local client-side registers.
   • Technical Challenges Solved: Eliminated interface render stuttering under dynamic scheduler workloads by implementing debounce mechanisms and memoizing child component trees.
   • Measurable Impact: Achieved immediate state transitions under 15ms, maintaining 100% operation without secondary database synchronization overhead.

2. LUMINOUS — Regional Undergraduate Resource Hub
   • Overview: Engineered a high-efficiency archive distributing semester curricula, exam guides, and reference documents to engineering peers.
   • Technologies: HTML5, CSS3, JavaScript, hosted on GitHub Pages.
   • Architecture Decisions: Formulated an optimized file hierarchy deploying static media assets directly over content delivery network edge nodes.
   • Technical Challenges Solved: Reduced script latency on limited connections by refactoring complex DOM loops into raw vanilla scripts.
   • Measurable Impact: Boosted mobile core performance scores to 98/100, serving over 500+ regional campus peers with reduced bandwidth loads.

3. NOVA LEARN — Bento Study & Productivity Workspace
   • Overview: Coded an integrated student task assistant combining multi-state focus timers, task list boards, and study metrics.
   • Technologies: React, State Persistence, Browser Clock APIs, Tailwind CSS.
   • Architecture Decisions: Mapped visual component state arrays strictly to storage-level cache controllers to buffer active sessions against network disconnects.
   • Technical Challenges Solved: Crafted a Web Worker script layer to run interval ticker intervals steadily, preventing browser main-thread clock throttling inside idle/background tabs.
   • Measurable Impact: Maintained clock accuracy within a tight ±0.05ms range across extreme simulated 100+ task stress cycles.

4. BYTECRAFT — High-End Agency Showcase Website
   • Overview: Authored a premium agency layout portraying layout bento models, responsive scaling, and low-latency interaction logic.
   • Technologies: React, Tailwind CSS, custom motion layout drivers.
   • Architecture Decisions: Formulated standard grid systems using Tailwind utility mappings, ensuring accurate sizing calculations across various hardware viewports.
   • Technical Challenges Solved: Offloaded element transitions to run via absolute transforms, enabling raw GPU layout composite caching.
   • Measurable Impact: Sustained 60 FPS scrolling benchmarks on mobile engines, reducing layout reflow ticks by 40%.

================================================================================
EXPERIENCE & INDEPENDENT DEVELOPMENT
================================================================================
Independent Software & Product Engineer | 2024 – Present
• Designed and shipped native-feeling web assets, leading complete product plans from interface wiring in Figma to Vercel production hosting.
• Followed rigorous structural layouts, ensuring exact pixel alignments and high accessibility standard margins or typeface hierarchy mappings.
• Trimmed bundle footprints by refactoring custom hooks, lowering library dependencies to yield faster first-contentful-paint (FCP) metrics.

================================================================================
OPEN SOURCE & GITHUB CONTRIBUTIONS
================================================================================
• Managed active open-source contributions (github.com/ARISTOTLE-CREATOR), adhering to semantic Git commit formats and multi-branch merge review techniques.
• Authored clear, technical setup guidelines and automated installation files, enabling developer peers to boot workspace sandboxes in less than 2 minutes.

================================================================================
CERTIFICATIONS
================================================================================
• Advanced Full-Stack Software Engineering Honors — Specialized Course Study on Udemy
• Data Structures and Algorithms Specialist — Verified Course Credentials
• PostgreSQL Database Architecture & Query Optimization Specialization

================================================================================
ACHIEVEMENTS
================================================================================
• Maintained a 100+ consecutive days change log tracking on public Git repositories.
• Architected clinical scheduling algorithms rated for high operational feasibility.

================================================================================
ADDITIONAL INFORMATION
================================================================================
• Methods: Visual Hierarchy, Agile Frameworks, Systems Architecture, Clean Code standards.
• Personal Interests: Typography pairing, Advanced interface optimizations, Performance profiling, Technical writing.
`;
    
    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Rapolu_Sai_Nithin_Resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="resume-viewer-overlay"
        className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md"
      >
        {/* Style injection for seamless printing of only the A4 pages */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #resume-print-area, #resume-print-area * {
              visibility: visible;
            }
            #resume-print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100% !important;
              background: white !important;
              color: black !important;
              transform: none !important;
            }
            #resume-viewer-overlay {
              position: absolute;
              left: 0;
              top: 0;
              width: 100% !important;
              background: white !important;
            }
            .resume-sheet {
              border: none !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              height: auto !important;
              aspect-ratio: auto !important;
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
            #resume-page-1 {
              page-break-after: always !important;
              break-after: page !important;
            }
            /* Enforce Instant display for printing animations */
            .motion-section {
              transform: none !important;
              opacity: 1 !important;
              filter: none !important;
              transition: none !important;
              animation: none !important;
            }
          }
        `}} />

        {/* Toolbar */}
        <div id="pdf-toolbar" className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded bg-indigo-600 p-2 text-white">
              <FileText className="h-5 w-5" id="doc-ico" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-wide shadow-none" id="filename-heading">Rapolu_Sai_Nithin_Resume.pdf</h2>
              <p className="text-xs text-slate-400" id="file-ext-label">PDF Document • 2 Pages • Official Academic Version</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Page Jump buttons */}
            <div className="flex items-center gap-2 rounded-lg bg-slate-800 p-1">
              <button 
                id="prev-page-btn"
                onClick={() => document.getElementById("resume-page-1")?.scrollIntoView({ behavior: "smooth", block: "nearest" })}
                className="rounded p-1 text-slate-400 hover:bg-slate-705 hover:text-white"
                title="Go to Page 1"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="px-2 text-xs font-mono text-slate-300 animate-pulse" id="page-indicator">
                Continuous View
              </span>
              <button 
                id="next-page-btn"
                onClick={() => document.getElementById("resume-page-2")?.scrollIntoView({ behavior: "smooth", block: "nearest" })}
                className="rounded p-1 text-slate-400 hover:bg-slate-705 hover:text-white"
                title="Go to Page 2"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="hidden h-6 w-[1px] bg-slate-800 sm:block"></div>

            {/* Zoom controls */}
            <div className="hidden items-center gap-1 rounded-lg bg-slate-800 p-1 sm:flex">
              <button 
                id="zoom-out-btn"
                onClick={() => setZoom(prev => Math.max(60, prev - 10))}
                className="rounded p-1 text-slate-400 hover:bg-slate-705 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-xs font-mono" id="zoom-percent">{zoom}%</span>
              <button 
                id="zoom-in-btn"
                onClick={() => setZoom(prev => Math.min(155, prev + 10))}
                className="rounded p-1 text-slate-400 hover:bg-slate-705 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button 
                id="zoom-reset-btn"
                onClick={() => setZoom(100)}
                className="rounded p-1 text-slate-400 hover:bg-slate-705 hover:text-white"
                title="Reset Zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex items-center gap-3">
            <button 
              id="print-resume-btn"
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-indigo-650 hover:text-white"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden md:inline">Print</span>
            </button>
            <button 
              id="download-resume-btn"
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500"
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Download</span>
            </button>
            <button 
              id="close-viewer-btn"
              onClick={onClose}
              className="rounded-lg bg-slate-800 p-2 text-slate-400 transition hover:bg-red-650 hover:text-white"
              title="Close PDF Viewer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* View Document Area */}
        <div 
          id="resume-pdf-view-viewport"
          className="flex-1 overflow-y-auto bg-slate-900/60 p-6 flex flex-col items-center"
        >
          <div 
            id="resume-print-area"
            className="transition-transform duration-200 origin-top flex flex-col items-center gap-8 py-4 max-w-full"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Page 1 Canvas Container */}
            <div 
              id="resume-page-1"
              className="resume-sheet w-[850px] max-w-full bg-white text-black p-12 border border-slate-300 relative aspect-[1/1.414] select-text rounded-none shadow-none flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Section (Revealed first) */}
                <div className="text-center select-text">
                  <h1 className="text-[28px] font-bold tracking-tight text-black font-serif uppercase">Rapolu Sai Nithin</h1>
                  <div className="text-xs text-neutral-700 font-serif mt-1.5 flex justify-center items-center gap-2 flex-wrap">
                    <span>Telangana, India</span>
                    <span>•</span>
                    <span>nithin172005@gmail.com</span>
                    <span>•</span>
                    <span>+91 8688775252</span>
                    <span>•</span>
                    <a href="https://github.com/ARISTOTLE-CREATOR" target="_blank" rel="noreferrer" className="hover:underline text-black font-bold">github.com/ARISTOTLE-CREATOR</a>
                  </div>
                </div>

                {/* Professional Summary Section */}
                <div className="space-y-1 select-text">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black font-serif">Professional Summary</h3>
                  <div className="border-b border-black w-full" />
                  <p className="text-[11px] text-neutral-800 leading-relaxed text-justify font-serif pt-1">
                    Deconstructive Computer Science undergraduate developer specializing in structured, highly stable application cycles, frontend-to-backend state modeling, and performance-optimized localized client interfaces. Committed to utilizing detailed architectural boundaries, crisp styling rules, and secure practices to deploy clean web solutions that systematically address regional healthcare and academic distribution inefficiencies.
                  </p>
                </div>

                {/* Education Section */}
                <div className="space-y-1 select-text">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black font-serif">Education</h3>
                  <div className="border-b border-black w-full" />
                  
                  <div className="pt-1 space-y-2 select-text">
                    {/* B.Tech */}
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[11px] font-bold text-black font-serif">St. Martin's Engineering College, JNTUH</span>
                        <span className="text-[10px] font-serif text-neutral-700">Telangana, India</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] italic text-neutral-850 font-serif">Bachelor of Technology (B.Tech) – Computer Science & Engineering (Artificial Intelligence & Machine Learning)</span>
                        <span className="text-[10px] font-serif text-neutral-700 font-bold">2023 – 2027</span>
                      </div>
                      <ul className="text-[10px] text-neutral-755 font-serif list-disc pl-4 mt-0.5 space-y-0.5">
                        <li>Current CGPA: <strong>7.5 / 10.00</strong></li>
                        <li><strong>Relevant Coursework:</strong> Artificial Intelligence, Machine Learning, Advanced Data Structures, Database Management Systems (DBMS), Operating Systems, Computer Networks.</li>
                      </ul>
                    </div>

                    {/* Intermediate */}
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[11px] font-bold text-black font-serif">Narayana Junior College</span>
                        <span className="text-[10px] font-serif text-neutral-700">Telangana, India</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] italic text-neutral-850 font-serif">Intermediate (MPC)</span>
                        <span className="text-[10px] font-serif text-neutral-700 font-bold">2021 – 2023</span>
                      </div>
                      <ul className="text-[10px] text-neutral-755 font-serif list-disc pl-4 mt-0.5">
                        <li>Achieved overall percentage of <strong>73%</strong></li>
                      </ul>
                    </div>

                    {/* SSC */}
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[11px] font-bold text-black font-serif">Narayana High School</span>
                        <span className="text-[10px] font-serif text-neutral-700">Telangana, India</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] italic text-neutral-850 font-serif">Secondary School Certificate (SSC)</span>
                        <span className="text-[10px] font-serif text-neutral-700 font-bold">2021</span>
                      </div>
                      <ul className="text-[10px] text-neutral-755 font-serif list-disc pl-4 mt-0.5">
                        <li>Achieved perfect GPA of <strong>10.0 / 10.0</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Technical Skills Section */}
                <div className="space-y-1 select-text">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black font-serif">Technical Skills</h3>
                  <div className="border-b border-black w-full" />
                  
                  <div className="grid grid-cols-1 gap-1 text-[10.5px] font-serif pt-1 select-text">
                    <div>
                      <strong className="text-black inline-block w-28">Languages:</strong>
                      <span className="text-neutral-850">Python, C, C++, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3</span>
                    </div>
                    <div>
                      <strong className="text-black inline-block w-28">Frontend Systems:</strong>
                      <span className="text-neutral-850">React.js, Next.js, Redux State Toolkit, Tailwind CSS, DOM Manipulation, Custom React Hooks</span>
                    </div>
                    <div>
                      <strong className="text-black inline-block w-28">Databases / BaaS:</strong>
                      <span className="text-neutral-850">PostgreSQL, MySQL Database, Supabase (Active Postgres), Firebase, MongoDB</span>
                    </div>
                    <div>
                      <strong className="text-black inline-block w-28">Developer Tools:</strong>
                      <span className="text-neutral-850">Git, GitHub VCS, Visual Studio Code, Figma (Interface Mocking), Postman, Vercel edge, GitHub Actions CI</span>
                    </div>
                  </div>
                </div>

                {/* Core Portfolio Projects (Intro & Projects 1-2) */}
                <div className="space-y-4">
                  <div className="space-y-1 select-text">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black font-serif">Featured Academic Projects (I)</h3>
                    <div className="border-b border-black w-full" />
                  </div>

                  {/* Project 1: Aristotle Cura */}
                  <div className="font-serif select-text">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-[11px] text-black">ARISTOTLE CURA — Comprehensive Healthcare Portal</strong>
                      <span className="text-[10px] italic text-neutral-700">React, TypeScript, Local Storage, Tailwind CSS</span>
                    </div>
                    
                    <ul className="text-[10.5px] text-neutral-800 space-y-1 list-disc pl-4 mt-1.5 leading-relaxed">
                      <li><strong>Project Overview:</strong> Designed, developed, and launched an offline-resilient healthcare portal aligning patient directories, clinic appointments, ambulance booking logs, and active emergency broadcasts.</li>
                      <li><strong>Architecture Decisions:</strong> Implemented a strictly decoupled component pattern, mapping local React states to central store hooks to manage client entries natively.</li>
                      <li><strong>Technical Challenges Solved:</strong> Mitigated excessive script re-trigger loops when rendering schedules by setting up customized debounce layers and memoizing complex layout lists.</li>
                      <li><strong>Measurable Impact:</strong> Secured a 100% stable client execution rating, avoiding central database requests while lowering local rendering latency below 15ms.</li>
                    </ul>
                  </div>

                  {/* Project 2: Luminous */}
                  <div className="font-serif select-text">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-[11px] text-black">LUMINOUS — Undergraduate Scholastic Resource Distribution Channel</strong>
                      <span className="text-[10px] italic text-neutral-700">HTML5, CSS3, Vanilla JavaScript, GitHub Pages</span>
                    </div>
                    
                    <ul className="text-[10.5px] text-neutral-800 space-y-1 list-disc pl-4 mt-1.5 leading-relaxed">
                      <li><strong>Project Overview:</strong> Engineered a lightweight static web channel routing semester syllabus logs, academic reference guides, and examination papers to student peers.</li>
                      <li><strong>Architecture Decisions:</strong> Selected a static asset deployment structure directly over CDN edge networks, enabling seamless navigation on low-bandwidth regions.</li>
                      <li><strong>Technical Challenges Solved:</strong> Removed scripting bottlenecks seen on slow local networks by substituting large framework overhead with tailored pure script controllers.</li>
                      <li><strong>Measurable Impact:</strong> Reached 500+ active student users across regional engineering groups, scoring 98/100 on standard mobile accessibility audits.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Page 1 Footer */}
              <div className="mt-6 flex justify-between text-[8px] text-neutral-400 border-t border-neutral-100 pt-2 font-serif select-none">
                <span>Rapolu Sai Nithin — Technical Resume</span>
                <span>Page 1 of 2</span>
              </div>
            </div>

            {/* Page 2 Canvas Container */}
            <div 
              id="resume-page-2"
              className="resume-sheet w-[850px] max-w-full bg-white text-black p-12 border border-slate-300 relative aspect-[1/1.414] select-text rounded-none shadow-none flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Spacer (consistent with Page 1, but compact) */}
                <div className="text-center pb-2 border-b border-neutral-100 select-text">
                  <h2 className="text-xs font-bold font-serif text-neutral-600 tracking-wider">RAPOLU SAI NITHIN — PORTFOLIO DEVELOPMENT PROJECTS (II)</h2>
                </div>

                {/* Core Projects (Projects 3-4) */}
                <div className="space-y-4">
                  {/* Project 3: Nova Learn */}
                  <div className="font-serif select-text">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-[11px] text-black">NOVA LEARN — Bento Study & Productivity Workspace</strong>
                      <span className="text-[10px] italic text-neutral-700">React, Storage Cache APIs, Web Clock Threads</span>
                    </div>
                    
                    <ul className="text-[10.5px] text-neutral-800 space-y-1 list-disc pl-4 mt-1.5 leading-relaxed">
                      <li><strong>Project Overview:</strong> Structured an active student workspace dashboard nesting countdown interval focus timers, study logging lists, and task markers.</li>
                      <li><strong>Architecture Decisions:</strong> Designed active timers to store progress logs directly inside localStorage models, preventing session data loss.</li>
                      <li><strong>Technical Challenges Solved:</strong> Concocted a dedicated Web Worker service to control countdown timing logic, successfully bypassing common sleep-mode throttling inside inactive web browser tabs.</li>
                      <li><strong>Measurable Impact:</strong> Accomplished continuous operational synchronization within ±0.05ms accuracy, enduring stress loops of 150+ rapid state changes.</li>
                    </ul>
                  </div>

                  {/* Project 4: Bytecraft */}
                  <div className="font-serif select-text">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-[11px] text-black">BYTECRAFT — High-End Digital Agency Showcase</strong>
                      <span className="text-[10px] italic text-neutral-700">React.js, Tailwind CSS Framework, GPU Keyframes</span>
                    </div>
                    
                    <ul className="text-[10.5px] text-neutral-800 space-y-1 list-disc pl-4 mt-1.5 leading-relaxed">
                      <li><strong>Project Overview:</strong> Designed an elite responsive landing agency showcase displaying ultra-modern structural grids and smooth performance boundaries.</li>
                      <li><strong>Architecture Decisions:</strong> Established flexible display grids through pure responsive Tailwind classes to guarantee scale accuracy as viewport limits alter.</li>
                      <li><strong>Technical Challenges Solved:</strong> Enhanced scrolling behavior by decoupling animation triggers, executing interactive effects only via hardware-accelerated CSS layers.</li>
                      <li><strong>Measurable Impact:</strong> Secured a locked 60 FPS scrolling output targeting standard mobile devices and trimmed frame repaint spikes to preserve fluid interface rendering.</li>
                    </ul>
                  </div>
                </div>

                {/* Experience / Independent Development Section */}
                <div className="space-y-1 select-text">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black font-serif">Experience / Independent Development</h3>
                  <div className="border-b border-black w-full" />
                  
                  <div className="pt-1 select-text">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-[11px] text-black font-serif">Independent Systems Developer & Software Builder</strong>
                      <span className="text-[10px] font-serif text-neutral-700">Telangana, India</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10.5px] font-serif text-neutral-800 italic">Core Stack Authoring & Platform Integrals</span>
                      <span className="text-[10px] font-serif text-neutral-700 font-bold">Jan 2024 – Present</span>
                    </div>
                    <ul className="text-[10.5px] text-neutral-800 font-serif list-disc pl-4 mt-1.5 space-y-1 leading-relaxed">
                      <li>Architected, coded, and deployed modular web tools independently, guiding applications from wireframe prototypes in Figma to secure edge deployments on Vercel hosts.</li>
                      <li>Enforced rigorous layout guidelines, emphasizing proper column margins, responsive breakpoints, and strict color-contrast rules for peer and client products.</li>
                      <li>Reduced file payload footprints by systematically cleaning redundant component code blocks, resulting in faster subsequent interaction metrics.</li>
                    </ul>
                  </div>
                </div>

                {/* Open Source & GitHub Contributions Section */}
                <div className="space-y-1 select-text">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black font-serif">Open Source & GitHub Contributions</h3>
                  <div className="border-b border-black w-full" />
                  
                  <ul className="text-[10.5px] text-neutral-850 font-serif list-disc pl-4 pt-1 space-y-1 leading-relaxed select-text">
                    <li>Maintained public codebase repositories under personal profile (<strong>github.com/ARISTOTLE-CREATOR</strong>), keeping granular git logs, commit workflows, and tagged source iterations.</li>
                    <li>Wrote comprehensive, technical documentation and local setup scripts, decreasing peer development environment startup duration to under 2 minutes.</li>
                  </ul>
                </div>

                {/* Certifications Section */}
                <div className="space-y-1 select-text">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black font-serif">Certifications</h3>
                  <div className="border-b border-black w-full" />
                  
                  <ul className="text-[10.5px] text-neutral-800 font-serif list-disc pl-4 pt-1 space-y-0.5 leading-relaxed select-text">
                    <li><strong>Full Stack Software Engineering Honors</strong> — Specialized Course Study on Udemy</li>
                    <li><strong>Data Structures and Algorithms Specialist</strong> — Verified Course Performance credentials</li>
                    <li><strong>PostgreSQL Database Architecture & Optimization Study Course</strong></li>
                  </ul>
                </div>

                {/* Achievements Section */}
                <div className="space-y-1 select-text">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black font-serif">Achievements</h3>
                  <div className="border-b border-black w-full" />
                  
                  <ul className="text-[10.5px] text-neutral-800 font-serif list-disc pl-4 pt-1 space-y-0.5 leading-relaxed select-text">
                    <li>Sustained a 100+ consecutive days change log tracking across public Git version control directories.</li>
                    <li>Architected vital healthcare task scheduling routines, validated for seamless execution by regional student users.</li>
                  </ul>
                </div>

                {/* Additional Information Section (Revealed last) */}
                <div className="space-y-1 select-text">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black font-serif">Additional Information</h3>
                  <div className="border-b border-black w-full" />
                  
                  <div className="grid grid-cols-1 gap-1 text-[10.5px] font-serif pt-1 select-text">
                    <div>
                      <strong className="text-black inline-block w-28">Applied Methodologies:</strong>
                      <span className="text-neutral-800">Visual Grid Hierarchies, Solid Code Principles, Agile Sprints, System Refactoring</span>
                    </div>
                    <div>
                      <strong className="text-black inline-block w-28">Technical Interests:</strong>
                      <span className="text-neutral-850">Advanced Algorithmic Efficiency, Offline-First state patterns, Typeface Pairing, Payload Optimization</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page 2 Footer */}
              <div className="mt-6 flex justify-between text-[8px] text-neutral-400 border-t border-neutral-100 pt-2 font-serif select-none">
                <span>Rapolu Sai Nithin — Technical Resume</span>
                <span>Page 2 of 2</span>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Page Swapping Panel at Bottom */}
        <div id="pdf-paging-helper" className="bg-slate-900 border-t border-white/5 py-4 px-6 flex justify-center items-center gap-4 text-white">
          <p className="text-xs text-slate-400">Jump to Page Section:</p>
          <div className="flex gap-2">
            <button
              onClick={() => document.getElementById("resume-page-1")?.scrollIntoView({ behavior: "smooth", block: "nearest" })}
              className="px-3 py-1.5 text-xs rounded-lg transition font-mono bg-slate-800 text-slate-350 hover:bg-indigo-600 hover:text-white"
            >
              Page 1
            </button>
            <button
              onClick={() => document.getElementById("resume-page-2")?.scrollIntoView({ behavior: "smooth", block: "nearest" })}
              className="px-3 py-1.5 text-xs rounded-lg transition font-mono bg-slate-800 text-slate-350 hover:bg-indigo-650 hover:text-white"
            >
              Page 2
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
