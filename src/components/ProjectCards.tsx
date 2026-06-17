import React from "react";
import { Github, ExternalLink, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { 
  CuraWireframe, 
  LuminousWireframe, 
  BytecraftWireframe, 
  NovaLearnWireframe 
} from "./InteractiveWireframe";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status?: string;
  description: string;
  github?: string;
  live?: string;
  wireframeComp: React.ComponentType;
}

export default function ProjectCards() {
  const projects: ProjectItem[] = [
    {
      id: "project-cura",
      title: "Aristotle Cura",
      category: "Healthcare Platform",
      description: "A comprehensive healthcare ecosystem bridging patient care, doctor consultation queues, facility directories, and instant emergency broadcasts. Streamlined for zero-flicker performance and clean local indexing guidelines.",
      github: "https://github.com/ARISTOTLE-CREATOR/aristotle-cura",
      live: "https://aristotle-cura.vercel.app/",
      wireframeComp: CuraWireframe
    },
    {
      id: "project-luminous",
      title: "Luminous",
      category: "Educational Platform",
      description: "A centralized academic repository crafted for regional students to query and access textbook syllabus logs, classroom cheat-sheets, and semester study guides with extreme loading efficiency on slow connection limits.",
      github: "https://github.com/ARISTOTLE-CREATOR/LUMINOUS",
      live: "https://aristotle-creator.github.io/LUMINOUS/",
      wireframeComp: LuminousWireframe
    },
    {
      id: "project-bytecraft",
      title: "Bytecraft",
      category: "Agency Website",
      description: "An elite agency portfolio showcase illustrating high-end visual compositions, clean structural layout practices, and beautiful microinteractions built for the modern product builder.",
      live: "https://bytecraft-mocha.vercel.app/",
      wireframeComp: BytecraftWireframe
    },
    {
      id: "project-novalearn",
      title: "Nova Learn",
      category: "Student Productivity Platform",
      status: "In Development",
      description: "A productivity control grid designed specifically for engineering scholars to plan assignment schedules, lock course goals, and run focused study sprints using active bento workspace cards.",
      wireframeComp: NovaLearnWireframe
    }
  ];

  return (
    <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto my-6">
      {projects.map((proj, idx) => {
        const WireframeComponent = proj.wireframeComp;
        return (
          <motion.div 
            key={proj.id}
            id={proj.id}
            initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "none" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-slate-900/10 hover:bg-slate-900/40 hover:border-white/10 transition-all duration-300 overflow-hidden light:bg-white light:border-slate-200/80 light:hover:border-slate-300 light:shadow-sm"
          >
            {/* Top architectural flare lines */}
            <div className="absolute top-0 right-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/10 group-hover:via-indigo-505/30 to-transparent transition-all duration-300" />
            
            {/* Embedded Live Wireframe Visualization Area */}
            <div className="p-5 pb-2">
              <div className="mb-4 rounded-xl overflow-hidden bg-[#0B0F19] border border-white/5 p-1 relative light:border-slate-200">
                {/* Glowing edge mask in dark theme */}
                <div className="absolute -inset-px bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-xl" />
                <WireframeComponent />
              </div>
            </div>

            {/* Project Copy */}
            <div className="px-5 py-2 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5 animate-ready">
                  <span className="text-[10px] font-mono tracking-widest font-semibold text-indigo-400 dark:text-indigo-405 uppercase light:text-indigo-600">
                    {proj.category}
                  </span>
                  
                  {proj.status ? (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide uppercase bg-amber-500/10 text-amber-500 border border-amber-500/15">
                      {proj.status}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wide bg-indigo-500/5 text-indigo-400/90 border border-indigo-500/10 light:bg-indigo-600/5 light:text-indigo-650 light:border-indigo-550/20">
                      Shipped Application
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-indigo-350 transition-colors duration-300 light:text-slate-950 light:group-hover:text-indigo-600">
                  {proj.title}
                </h3>

                <p className="text-xs text-[#94A3B8] leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors duration-300 light:text-slate-600 light:group-hover:text-slate-700">
                  {proj.description}
                </p>
              </div>

              {/* Action Buttons panel */}
              <div className="flex flex-wrap items-center gap-3 pt-6 pb-4 border-t border-white/[0.04] mt-5 light:border-slate-100">
                {proj.github && (
                  <a 
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition light:bg-slate-100 light:text-slate-600 light:hover:bg-slate-200 light:hover:text-slate-900"
                    title="Explore Source Code repository"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>Source Code</span>
                  </a>
                )}

                {proj.live && (
                  <a 
                    href={proj.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/[0.12] hover:bg-indigo-650 text-xs text-indigo-300 hover:text-white transition font-medium border border-indigo-500/[0.15] light:bg-indigo-600 light:text-white light:hover:bg-indigo-700"
                    title="Open live staging application"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}

                {proj.live && (
                  <a 
                    href={proj.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/[0.1] hover:bg-emerald-600 hover:text-white text-xs text-emerald-400 transition font-medium border border-emerald-500/[0.15] light:bg-emerald-600/10 light:text-emerald-700 light:border-emerald-500/20 light:hover:bg-emerald-600 light:hover:text-white"
                    title="Verify online deployment"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verify Project</span>
                  </a>
                )}

                {proj.status === "In Development" && (
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono italic">
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>Figma file archived on github</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
