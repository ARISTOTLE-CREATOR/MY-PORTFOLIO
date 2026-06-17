import React, { useState, useEffect } from "react";
import { 
  Activity, BookOpen, Layout, Clock, Play, Pause, 
  RotateCcw, Check, Search, Download, FolderOpen, 
  MapPin, Heart, Plus, Sparkles, User, FileText, Lock
} from "lucide-react";

// ==========================================
// 1. ARISTOTLE CURA (Healthcare Platform Wireframe)
// ==========================================
export function CuraWireframe() {
  const [activeDept, setActiveDept] = useState<string>("Emergency");
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("06:44 AM");

  const depts = [
    { id: "Emergency", label: "ER Care", icon: Activity, color: "text-rose-500 bg-rose-500/10" },
    { id: "Cardiology", label: "Cardio", icon: Heart, color: "text-indigo-400 bg-indigo-500/10" },
    { id: "Pediatrics", label: "Pediatrics", icon: User, color: "text-emerald-400 bg-emerald-500/10" }
  ];

  const handleBook = () => {
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className={`p-4 rounded-xl border border-white/5 transition-all duration-300 h-[220px] flex flex-col justify-between overflow-hidden relative ${
      isEmergency ? "bg-rose-950/20 border-rose-500/30" : "bg-slate-900/60"
    }`}>
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className={`h-4 w-4 ${isEmergency ? "text-rose-500 animate-pulse" : "text-indigo-400"}`} />
          <span className="text-[10px] font-mono tracking-widest text-slate-400">CURA VITAL-LINK</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${isEmergency ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`}></span>
          <span className="text-[9px] font-mono text-slate-400">ONLINE</span>
        </div>
      </div>

      {/* Main interactive segment */}
      <div className="my-2 flex-1 flex flex-col justify-center">
        {successMsg ? (
          <div className="text-center py-2 animate-fade-in">
            <div className="mx-auto h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
              <Check className="h-4 w-4" />
            </div>
            <p className="text-[11px] font-medium text-slate-200">Session Scheduled Successfully</p>
            <p className="text-[9px] font-mono text-slate-450 mt-0.5">Doctor notified • Dynamic Ref CURA-705</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Dept selector */}
            <div className="grid grid-cols-3 gap-1.5">
              {depts.map(d => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveDept(d.id)}
                    className={`p-1.5 rounded-lg flex flex-col items-center gap-1 transition text-center ${
                      activeDept === d.id 
                        ? "bg-indigo-600/30 border border-indigo-500/40 text-white" 
                        : "bg-slate-800/40 border border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-medium">{d.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick stats / Booking actions */}
            <div className="flex justify-between items-center bg-slate-950/40 px-2.5 py-1.5 rounded-lg border border-white/5">
              <div>
                <span className="text-[8px] font-mono uppercase text-slate-400 block">Selected</span>
                <span className="text-[10px] font-semibold text-white">{activeDept} Dept</span>
              </div>
              <button 
                onClick={handleBook}
                className="bg-indigo-600 text-white px-2 py-1 rounded text-[9px] font-medium transition hover:bg-indigo-500"
              >
                Schedule Check
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Warning Override */}
      <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-1">
        <span className="text-[9px] text-slate-400 flex items-center gap-1">
          <MapPin className="h-3 w-3 text-emerald-400" /> Regional Ingress: Hyderabad
        </span>
        <button
          onClick={() => setIsEmergency(!isEmergency)}
          className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider transition ${
            isEmergency 
              ? "bg-rose-500 text-white" 
              : "bg-rose-950/30 border border-rose-500/20 text-rose-400 hover:bg-rose-950/70"
          }`}
        >
          {isEmergency ? "Cancel Broadcast" : "Simulate Emergency"}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. LUMINOUS (Educational Platform Wireframe)
// ==========================================
export function LuminousWireframe() {
  const [semester, setSemester] = useState<number>(3);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [downloadingIdx, setDownloadingIdx] = useState<number | null>(null);

  const materials = [
    { sem: 3, name: "Data Structures & Algos", type: "Key Notes", size: "2.4 MB" },
    { sem: 3, name: "Discrete Mathematics", type: "Syllabus Hub", size: "1.1 MB" },
    { sem: 4, name: "Database Management", type: "Exam Prep", size: "3.5 MB" },
    { sem: 4, name: "Operating Systems Notes", type: "Full Guide", size: "4.2 MB" }
  ];

  const filteredMaterials = materials.filter(m => 
    m.sem === semester && 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerDownload = (idx: number) => {
    setDownloadingIdx(idx);
    setTimeout(() => setDownloadingIdx(null), 1500);
  };

  return (
    <div className="p-4 rounded-xl border border-white/5 bg-slate-900/60 transition-all duration-300 h-[220px] flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-4 w-4 text-emerald-400" />
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Luminous Archive</span>
        </div>
        <div className="flex gap-1">
          {[3, 4].map(sem => (
            <button
              key={sem}
              onClick={() => setSemester(sem)}
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition ${
                semester === sem 
                  ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400" 
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="my-2 relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500" />
        <input 
          type="text" 
          placeholder="Lookup notes / materials..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-950/45 text-[10px] pl-7 pr-3 py-1.5 rounded-lg border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/40"
        />
      </div>

      {/* Materials List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((m, idx) => (
            <div 
              key={idx}
              className="flex justify-between items-center p-1.5 rounded bg-slate-950/20 border border-white/5 hover:border-emerald-500/25 transition"
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[9.5px] font-semibold text-slate-200 truncate">{m.name}</p>
                  <span className="text-[7.5px] font-mono text-slate-400 uppercase">{m.type} • {m.size}</span>
                </div>
              </div>
              <button 
                onClick={() => triggerDownload(idx)}
                className={`p-1 rounded text-slate-400 hover:text-white transition ${
                  downloadingIdx === idx ? "bg-emerald-500/25 text-emerald-400" : "bg-slate-800"
                }`}
                title="Download Study PDF"
              >
                {downloadingIdx === idx ? (
                  <Check className="h-3 w-3 animate-pulse" />
                ) : (
                  <Download className="h-3 w-3" />
                )}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-[9px] text-slate-450 py-4">No matching course guides found.</p>
        )}
      </div>

      {/* Footer statistics label (Real literal metadata only) */}
      <div className="text-[8px] text-slate-450 font-mono text-right mt-1">
        HYDRA-STACK SYNC ACTIVE
      </div>
    </div>
  );
}

// ==========================================
// 3. BYTECRAFT (Agency Website Wireframe)
// ==========================================
export function BytecraftWireframe() {
  const [layoutMode, setLayoutMode] = useState<string>("Bento");
  const [palette, setPalette] = useState<string>("Mono");

  return (
    <div className="p-4 rounded-xl border border-white/5 bg-slate-900/60 transition-all duration-300 h-[220px] flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <Layout className="h-4 w-4 text-cyan-400" />
          <span className="text-[10px] font-mono tracking-widest text-slate-400">BYTECRAFT CANVAS</span>
        </div>
        <div className="flex gap-1">
          {["Bento", "Split", "Minimal"].map(mode => (
            <button
              key={mode}
              onClick={() => setLayoutMode(mode)}
              className={`px-1.5 py-0.5 rounded text-[8.5px] font-mono transition ${
                layoutMode === mode 
                  ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400" 
                  : "bg-slate-850 text-slate-400 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic graphic panels representing adaptive geometry */}
      <div className="my-2.5 flex-1 bg-slate-950/45 rounded-lg border border-white/5 p-2 flex flex-col justify-center">
        {layoutMode === "Bento" && (
          <div className="grid grid-cols-3 grid-rows-2 gap-1 h-24 animate-fade-in">
            <div className="col-span-2 row-span-1 bg-cyan-600/10 border border-cyan-500/20 rounded flex items-center justify-center">
              <span className="text-[8px] font-sans font-bold text-cyan-300">Display Hero</span>
            </div>
            <div className="col-span-1 row-span-2 bg-slate-800/40 rounded flex items-center justify-center p-1 text-center">
              <span className="text-[7.5px] font-mono text-slate-400">Spec Panel</span>
            </div>
            <div className="col-span-1 bg-slate-800/40 rounded flex items-center justify-center">
              <span className="text-[7.5px] font-mono text-slate-400">Index</span>
            </div>
            <div className="col-span-1 bg-cyan-500/5 rounded flex items-center justify-center">
              <span className="text-[7.5px] font-mono text-cyan-400">Link</span>
            </div>
          </div>
        )}

        {layoutMode === "Split" && (
          <div className="grid grid-cols-2 gap-1.5 h-24 animate-fade-in">
            <div className="border border-white/5 bg-slate-800/30 rounded p-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="h-1.5 w-8 bg-cyan-400 rounded"></div>
                <div className="h-1 w-12 bg-slate-400 rounded"></div>
                <div className="h-1 w-10 bg-slate-450 rounded"></div>
              </div>
              <span className="text-[8px] font-mono text-slate-450">Creative Header</span>
            </div>
            <div className="bg-cyan-600/15 border border-cyan-500/20 rounded flex items-center justify-center p-1 text-center">
              <span className="text-[8.5px] font-sans font-bold text-cyan-300">Minimal Visual Asset</span>
            </div>
          </div>
        )}

        {layoutMode === "Minimal" && (
          <div className="space-y-1.5 p-2 h-24 flex flex-col justify-center animate-fade-in">
            <div className="text-center space-y-1">
              <h4 className="text-[10px] font-sans font-bold tracking-tight text-white uppercase">Symmetric Layout</h4>
              <p className="text-[7.5px] text-slate-400 max-w-xs mx-auto">No margins. Pure content focus. Zero distraction typography hierarchy.</p>
            </div>
            <div className="flex gap-1 justify-center">
              <div className="h-3 w-3 bg-cyan-400/20 rounded-full"></div>
              <div className="h-3 w-3 bg-slate-800 rounded-full"></div>
              <div className="h-3 w-3 bg-slate-850 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Controls info */}
      <div className="flex items-center justify-between border-t border-white/5 pt-1.5 mt-0.5">
        <span className="text-[8px] text-slate-400 font-mono">RENDER STATE: HIGH_CONTRAST</span>
        <span className="text-[8px] text-cyan-400 font-mono italic">CSS transitions ready</span>
      </div>
    </div>
  );
}

// ==========================================
// 4. NOVA LEARN (Student Productivity Platform)
// ==========================================
export function NovaLearnWireframe() {
  const [timerLeft, setTimerLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [taskChecked, setTaskChecked] = useState<boolean[]>([false, false, true]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft(prev => prev - 1);
      }, 1000);
    } else if (timerLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timerLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimerLeft(25 * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 rounded-xl border border-white/5 bg-slate-900/60 transition-all duration-300 h-[220px] flex flex-col justify-between overflow-hidden relative">
      {/* Under Construction subtle glassmask overlay */}
      <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 p-4 text-center">
        <div className="bg-slate-900/90 border border-white/10 p-2.5 rounded-lg flex flex-col items-center gap-1 shadow-xl max-w-[200px]">
          <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
            <Lock className="h-3.5 w-3.5" />
            <span className="text-[9px] font-mono uppercase tracking-wider font-bold">In Studio</span>
          </div>
          <p className="text-[10px] text-slate-200 leading-snug">Productivity Canvas scheduled for pipeline deploy.</p>
        </div>
      </div>

      {/* Background/Base Mock content to preserve the premium visual under the blur */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2 opacity-30 select-none">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-rose-400" />
          <span className="text-[10px] font-mono tracking-widest text-slate-400">NOVA WORKBENCH</span>
        </div>
        <span className="text-[9px] font-mono text-slate-400">STREAK: 4 DAYS</span>
      </div>

      <div className="my-2.5 flex-1 flex gap-3 h-24 opacity-35 select-none">
        {/* Focus Timer panel */}
        <div className="flex-1 bg-slate-950/40 border border-white/5 rounded-lg p-2 flex flex-col items-center justify-center">
          <span className="text-[8px] font-mono text-slate-400 text-center block">FOCUS SESSION</span>
          <span className="text-xl font-mono tracking-widest text-white font-bold my-1">{formatTime(timerLeft)}</span>
          <div className="flex gap-1.5">
            <button className="bg-rose-600/35 p-1 rounded-full text-white">
              <Play className="h-2.5 w-2.5" />
            </button>
            <button className="bg-slate-800 p-1 rounded-full text-slate-400">
              <RotateCcw className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>

        {/* Tasks list panel */}
        <div className="flex-1 bg-slate-950/20 border border-white/5 rounded-lg p-2 flex flex-col justify-between">
          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block">Course Tasks</span>
          <div className="space-y-1 my-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded bg-rose-500/20 border border-rose-500/40"></div>
              <span className="text-[8px] text-slate-400 font-sans line-through">Discrete Math HW</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded bg-slate-800"></div>
              <span className="text-[8px] text-slate-200 font-sans">Lab report CSE-401</span>
            </div>
          </div>
          <span className="text-[7.5px] text-rose-400 font-mono">1/2 modules done</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-1.5 mt-0.5 opacity-30 select-none">
        <span className="text-[8px] text-slate-450 font-mono">METADATA SYNC LOCAL</span>
      </div>
    </div>
  );
}
