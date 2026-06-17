import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Code2, GitMerge, FileCheck2, Cpu, Milestone } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  desc: string;
  techs: string[];
  type: "academic" | "product" | "integrity";
}

export default function EngineeringRoadmap() {
  const items: TimelineItem[] = [
    {
      year: "2023 – 2027",
      title: "B.Tech – Computer Science & Engineering (AI & ML)",
      subtitle: "St. Martin's Engineering College, JNTUH",
      icon: GraduationCap,
      desc: "Core academic trajectory specializing in Artificial Intelligence & Machine Learning. Emphasizing algorithms, databases, neural networks, and operating systems with a current CGPA of 7.5/10.",
      techs: ["AI", "Machine Learning", "Data Structures", "DBMS"],
      type: "academic"
    },
    {
      year: "2024",
      title: "Platform Launch: Aristotle Cura",
      subtitle: "Comprehensive Digital Healthcare Coordination",
      icon: Code2,
      desc: "Built a fully reactive, offline-first clinical scheduling workflow. Solved rendering loop bottlenecks on client browsers by crafting custom debounced scheduling layers.",
      techs: ["React.js", " TypeScript", " Cache Storage", " High-Contrast Tailwind"],
      type: "product"
    },
    {
      year: "2024 - Ongoing",
      title: "Public Code-Integrity Tracking",
      subtitle: "Version Control Commitment Milestone",
      icon: GitMerge,
      desc: "Sustained over 100+ consecutive days tracking across public code storage repositories. Keeping atomic logs of changes, commit cycles, and modular directory structures.",
      techs: ["Git VCS", " Bash Scripting", " CI/CD Hooks", " Public Repository Deployment"],
      type: "integrity"
    },
    {
      year: "2024 - 2025",
      title: "Strategic Scholastic Launch: Luminous",
      subtitle: "University Resource Distribution Engine",
      icon: Cpu,
      desc: "Pioneered a vanilla code distribution structure ensuring immediate page loads for students on minimal cellular data networks, scoring 98/100 on standard web auditories.",
      techs: ["HTML5", " Pure CSS3 Engine", " Pure Browser APIs", " GitHub Pages Edge"],
      type: "product"
    },
    {
      year: "2021 – 2023",
      title: "Intermediate (MPC)",
      subtitle: "Narayana Junior College",
      icon: GraduationCap,
      desc: "Completed secondary board academic framework focusing on Mathematics, Physics, and Chemistry. Achieved an overall percentage of 73%.",
      techs: ["Mathematics", "Physics", "Chemistry"],
      type: "academic"
    },
    {
      year: "2021",
      title: "Secondary School Certificate (SSC)",
      subtitle: "Narayana High School",
      icon: GraduationCap,
      desc: "Graduated with secondary school honors, securing a perfect GPA score of 10.0/10.",
      techs: ["Scholastic Excellence", "SSC Board"],
      type: "academic"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-4 relative animate-ready">
      
      {/* Decorative vertical line in the middle / left depending on size */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-indigo-500/10 md:-translate-x-[0.5px]" />

      <div className="space-y-12">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isEven = idx % 2 === 0;

          return (
            <div key={idx} className="relative flex flex-col md:flex-row items-stretch md:justify-between group">
              
              {/* Timeline Center Badge */}
              <div className="absolute left-4 md:left-1/2 xs:top-0 h-9 w-9 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/30 group-hover:text-indigo-300 transition duration-300 -translate-x-[18px] z-10 light:bg-slate-50 light:border-slate-250">
                <Icon className="h-4.5 w-4.5" />
              </div>

              {/* Left Side spacer on desktop to swap cards */}
              <div className={`hidden md:block w-[46%] ${isEven ? "order-1" : "order-2"}`} />

              {/* Core Content Box card */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -25 : 25, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "none" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                className={`w-full md:w-[46%] pl-12 md:pl-0 flex flex-col justify-between rounded-2xl border border-white/5 bg-slate-900/10 hover:bg-slate-900/35 hover:border-white/10 transition-all duration-350 p-6 relative ${
                  isEven ? "order-2 md:order-1 text-left" : "order-2 md:order-2 text-left"
                } light:bg-white light:border-slate-200/80 light:hover:border-slate-300 light:shadow-sm`}
              >
                {/* Horizontal guide pointer connecting to center line */}
                <div className={`hidden md:block absolute top-[18px] h-[1px] w-6 bg-indigo-500/10 ${
                  isEven ? "right-[-24px]" : "left-[-24px]"
                }`} />

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-indigo-400 light:text-indigo-600 font-bold bg-indigo-600/10 px-2.5 py-0.5 rounded-full light:bg-indigo-600/5">
                      {item.year}
                    </span>
                    <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-display font-medium text-sm text-white light:text-slate-900 mt-2">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400 light:text-slate-5y00 mt-1 uppercase text-slate-[#94A3B8] light:text-slate-650">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-slate-350 leading-relaxed mt-4 light:text-slate-600 text-justify text-justify">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/[0.04] light:border-slate-100">
                  {item.techs.map((tech, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[9pt] font-mono text-[#06B6D4] light:text-[#0891B2]"
                    >
                      #{tech.trim().replace(/\s+/g, '_')}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
