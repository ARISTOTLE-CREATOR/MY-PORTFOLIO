import React from "react";
import { Cpu, Database, Blocks, Wrench } from "lucide-react";
import { motion } from "motion/react";

interface BadgeProps {
  name: string;
  key?: any;
}

function TechBadge({ name }: BadgeProps) {
  return (
    <div 
      className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-slate-900/30 text-[var(--text)] hover:bg-indigo-600/[0.08] hover:border-indigo-500/30 transition-all duration-300 font-mono text-[11px] tracking-wide flex items-center justify-center cursor-default light:bg-slate-100 light:border-slate-200 light:text-slate-700 light:hover:bg-indigo-600/5 light:hover:border-indigo-500/30"
    >
      {name}
    </div>
  );
}

export default function TechStack() {
  const stackCategories = [
    {
      title: "Frontend Engineering",
      icon: Blocks,
      skills: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
      accentClass: "text-indigo-400 group-hover:text-indigo-305 light:text-indigo-600"
    },
    {
      title: "Backend Services",
      icon: Cpu,
      skills: ["Node.js", "Express.js"],
      accentClass: "text-purple-400 group-hover:text-purple-305 light:text-purple-600"
    },
    {
      title: "Data Systems",
      icon: Database,
      skills: ["PostgreSQL", "Supabase", "MySQL"],
      accentClass: "text-emerald-400 group-hover:text-emerald-305 light:text-emerald-600"
    },
    {
      title: "Developer Tools",
      icon: Wrench,
      skills: ["Git", "GitHub", "VS Code", "Figma", "Postman"],
      accentClass: "text-cyan-400 group-hover:text-cyan-305 light:text-cyan-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto my-4">
      {stackCategories.map((cat, idx) => {
        const Icon = cat.icon;
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "none" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
            className="group relative rounded-xl border border-white/5 bg-slate-900/10 hover:bg-slate-900/35 hover:border-white/10 transition-all duration-300 p-5 flex flex-col justify-between light:bg-white light:border-slate-200/80 light:hover:border-slate-300 light:shadow-sm"
          >
            {/* Fine border decoration line inside card */}
            <div className="absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/15 transition-all duration-300" />
            
            <div className="mb-4">
              <div className="flex items-center gap-2.5 mb-2">
                <Icon className={`h-4.5 w-4.5 ${cat.accentClass} transition-colors duration-300`} />
                <h3 className="font-display font-medium text-xs tracking-wider uppercase text-slate-350 light:text-slate-700">{cat.title}</h3>
              </div>
              <div className="h-[1px] w-8 bg-white/10 group-hover:w-16 transition-all duration-300 light:bg-slate-200" />
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, sIdx) => (
                <TechBadge key={sIdx} name={skill} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
