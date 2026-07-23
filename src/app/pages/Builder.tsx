import { useState, type ElementType, type ReactNode } from "react";
import {
  Home,
  LayoutGrid,
  Globe,
  Layers,
  Shield,
  Tag,
  Settings,
  Lightbulb,
  BookOpen,
  Cloud,
  Search,
  Plus,
  ChevronDown,
  ArrowRight,
  Monitor,
  Smartphone,
  Palette,
  Gamepad2,
  BarChart2,
  FileText,
  Archive,
  Code,
  RefreshCw,
  Mic,
  ChevronLeft,
  ChevronRight,
  Github,
  Zap,
  Table,
  Upload,
  Send,
  Wand2,
  Download,
  ExternalLink,
  Heart,
  Triangle,
  Database,
  Loader2,
  Check,
  Info,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Page =
  | "home"
  | "import"
  | "github"
  | "bitbucket"
  | "figma"
  | "lovable"
  | "bolt"
  | "vercel"
  | "base44"
  | "spreadsheet"
  | "zipfile"
  | "empty";

// ─── Design tokens ───────────────────────────────────────────────────────────

const T = {
  bg: "#0e0e10",
  sidebar: "#161618",
  surface: "#1c1c1e",
  surface2: "#222224",
  surface3: "#252527",
  border: "#2a2a2c",
  borderLight: "rgba(255,255,255,0.06)",
  text: "#e8e8ea",
  textDim: "#b0b0b8",
  muted: "#7a7a84",
  faint: "#4a4a54",
  blue: "#0073ff",
  blueHover: "#005ecc",
  orange: "#f26207",
  green: "#1aba7a",
};

// ─── Replit logo SVG ─────────────────────────────────────────────────────────

function ReplitIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="1" y="1" width="7" height="7" fill={T.orange} rx="1.5" />
      <rect x="1" y="12" width="7" height="7" fill={T.orange} rx="1.5" />
      <rect x="12" y="1" width="7" height="7" fill={T.orange} rx="1.5" />
      <rect x="12" y="7" width="7" height="12" fill={T.orange} rx="1.5" />
    </svg>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const navItems: { icon: ElementType; label: string; key: Page | "projects" | "published" | "integrations" | "security" | "promotions" | "settings" }[] = [
    { icon: Home, label: "Home", key: "home" },
    { icon: LayoutGrid, label: "Projects", key: "projects" },
    { icon: Globe, label: "Published Projects", key: "published" },
    { icon: Layers, label: "Integrations", key: "integrations" },
    { icon: Shield, label: "Security", key: "security" },
    { icon: Tag, label: "Promotions", key: "promotions" },
    { icon: Settings, label: "Settings", key: "settings" },
  ];

  return (
    <div
      className="flex flex-col h-screen shrink-0 select-none"
      style={{ width: 138, minWidth: 138, background: T.sidebar, borderRight: `1px solid ${T.border}`, fontFamily: "Inter, -apple-system, sans-serif" }}
    >
      {/* Logo + search */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2.5">
        <ReplitIcon size={18} />
        <button className="opacity-60 hover:opacity-100 transition-opacity">
          <Search size={14} color={T.muted} />
        </button>
      </div>

      {/* Workspace selector */}
      <button
        className="mx-2 mb-1.5 flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors text-left"
      >
        <div
          className="w-[18px] h-[18px] rounded flex items-center justify-center text-[9px] font-bold shrink-0"
          style={{ background: "#c96a1a", color: "#fff", fontSize: "9px" }}
        >
          DE
        </div>
        <span className="text-[11.5px] font-medium truncate flex-1" style={{ color: T.text }}>
          Deepteal's Workspace
        </span>
        <ChevronDown size={11} color={T.muted} className="shrink-0" />
      </button>

      {/* Action buttons */}
      <div className="px-2 flex flex-col gap-1 mb-2">
        <button
          className="flex items-center gap-1.5 w-full px-2 py-[6px] rounded-md text-[11.5px] font-medium text-left hover:opacity-90 transition-opacity"
          style={{ background: T.surface2, color: T.text }}
        >
          <Plus size={12} strokeWidth={2.5} />
          <span>Create something new</span>
        </button>
        <button
          className="flex items-center gap-1.5 w-full px-2 py-[6px] rounded-md text-[11.5px] font-medium text-left hover:opacity-90 transition-opacity"
          style={{ background: T.surface2, color: T.text }}
          onClick={() => setPage("import")}
        >
          <Download size={12} strokeWidth={2.5} />
          <span>Import code or design</span>
        </button>
      </div>

      {/* Divider */}
      <div className="mx-2 mb-1" style={{ borderTop: `1px solid ${T.border}` }} />

      {/* Nav items */}
      <nav className="px-2 flex flex-col gap-0.5">
        {navItems.map(({ icon: Icon, label, key }) => {
          const isActive = page === key || (key === "home" && page === "home");
          return (
            <button
              key={label}
              className="flex items-center gap-2 w-full px-2 py-[6px] rounded-md text-[11.5px] text-left transition-colors hover:bg-white/5"
              style={{
                color: isActive ? T.text : T.muted,
                background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
                fontWeight: isActive ? 500 : 400,
              }}
              onClick={() => {
                if (key === "home") setPage("home");
              }}
            >
              <Icon size={13} strokeWidth={isActive ? 2 : 1.75} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Bottom section */}
      <div className="px-2 pb-3">
        {[
          { icon: Lightbulb, label: "Learn" },
          { icon: BookOpen, label: "Documentation" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-2 w-full px-2 py-[6px] rounded-md text-[11.5px] text-left hover:bg-white/5 transition-colors"
            style={{ color: T.muted }}
          >
            <Icon size={13} strokeWidth={1.75} />
            <span>{label}</span>
          </button>
        ))}

        <p className="px-2 pt-2.5 pb-1 text-[10px] font-medium" style={{ color: T.muted }}>
          Your Starter Plan
        </p>

        {[
          { icon: LayoutGrid, primary: "Agent credits", secondary: "0% used" },
          { icon: Cloud, primary: "Cloud credits", secondary: "0% used" },
        ].map(({ icon: Icon, primary, secondary }) => (
          <div key={primary} className="flex items-start gap-1.5 px-2 py-[3px]">
            <Icon size={12} color={T.muted} strokeWidth={1.75} className="mt-[2px] shrink-0" />
            <div>
              <p className="text-[10px] leading-tight" style={{ color: T.textDim }}>
                {primary}
              </p>
              <p className="text-[10px] leading-tight" style={{ color: T.muted }}>
                {secondary}
              </p>
            </div>
          </div>
        ))}

        <button
          className="flex items-center justify-center gap-1.5 w-full py-[7px] rounded-md text-[11.5px] font-semibold text-white mt-2 hover:opacity-90 transition-opacity"
          style={{ background: T.blue }}
        >
          <Plus size={12} strokeWidth={2.5} />
          Upgrade
        </button>

        <p className="text-center mt-2 leading-none" style={{ color: T.faint, fontSize: "9.5px" }}>
          Install Replit on{" "}
          <span style={{ fontSize: "9px" }}>⊡</span>{" "}
          <span style={{ fontSize: "9px" }}>⊡</span>
          {" "}•{" "}Changelog
        </p>
      </div>
    </div>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { icon: Monitor, label: "Website" },
  { icon: Smartphone, label: "Mobile" },
  { icon: Palette, label: "Design" },
  { icon: Wand2, label: "Animation" },
  { icon: Table, label: "Spreadsheet" },
  { icon: LayoutGrid, label: "Slides" },
  { icon: Gamepad2, label: "3D Game" },
  { icon: BarChart2, label: "Data Visualization" },
  { icon: FileText, label: "Document" },
];

const EXAMPLE_PROMPTS = ["Weekly meal planner", "Beginner running tracker", "SaaS KPI dashboard"];

function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [catOffset, setCatOffset] = useState(0);
  const visible = CATEGORIES.slice(catOffset, catOffset + 5);

  return (
    <div
      className="flex flex-col items-center justify-center h-full px-8"
      style={{ background: T.bg, fontFamily: "Inter, -apple-system, sans-serif" }}
    >
      <h1 className="text-[22px] font-semibold mb-5" style={{ color: T.text }}>
        Hi Deepteal, what do you want to make?
      </h1>

      {/* Prompt input box */}
      <div
        className="w-full max-w-[580px] rounded-xl overflow-hidden"
        style={{ border: `1px solid ${T.border}`, background: T.surface }}
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Create a mobile app tha..."
          className="w-full bg-transparent resize-none outline-none px-3 pt-3 pb-2 text-sm"
          style={{ color: T.text, caretColor: T.blue, minHeight: 64, fontSize: "13.5px" }}
          rows={2}
        />
        <div className="flex items-center justify-between px-2.5 pb-2.5 pt-1">
          <button
            className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/5 transition-colors"
            style={{ color: T.muted }}
          >
            <Plus size={14} strokeWidth={2} />
          </button>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-[5px] rounded-lg text-[12px] font-medium"
              style={{ background: T.surface3, color: T.textDim, border: `1px solid ${T.border}` }}
            >
              Plan
            </button>
            <button className="hover:opacity-80 transition-opacity" style={{ color: T.muted }}>
              <Mic size={15} strokeWidth={1.75} />
            </button>
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
              style={{ background: T.surface3, border: `1px solid ${T.border}` }}
            >
              <Send size={13} color={T.textDim} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      {/* Category carousel */}
      <div className="flex items-center gap-4 mt-7">
        <button
          className="hover:opacity-80 transition-opacity"
          style={{ color: T.muted }}
          onClick={() => setCatOffset(Math.max(0, catOffset - 1))}
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-5">
          {visible.map(({ icon: Icon, label }) => (
            <button key={label} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: T.surface, border: `1px solid ${T.border}` }}
              >
                <Icon size={18} color={T.muted} strokeWidth={1.75} />
              </div>
              <span className="text-[11px]" style={{ color: T.muted }}>
                {label}
              </span>
            </button>
          ))}
        </div>
        <button
          className="hover:opacity-80 transition-opacity"
          style={{ color: T.muted }}
          onClick={() => setCatOffset(Math.min(CATEGORIES.length - 5, catOffset + 1))}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Example prompts */}
      <div className="flex flex-col items-center gap-3 mt-5">
        <div className="flex items-center gap-1.5">
          <span className="text-[12px]" style={{ color: T.muted }}>
            Try an example prompt
          </span>
          <button className="hover:opacity-80 transition-opacity">
            <RefreshCw size={11} color={T.muted} />
          </button>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              className="px-3 py-1.5 rounded-full text-[12px] hover:bg-white/5 transition-colors"
              style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.textDim }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Import list page ─────────────────────────────────────────────────────────

interface ImportOption {
  id: Page;
  icon: ReactNode;
  label: string;
  description: string;
  badge?: string;
}

const IMPORT_OPTIONS: ImportOption[] = [
  {
    id: "github",
    icon: (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#24292f" }}>
        <Github size={18} color="#fff" />
      </div>
    ),
    label: "Github",
    description: "Import any repository or existing app. Agent may be less predictable.",
  },
  {
    id: "bitbucket",
    icon: (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#0052cc" }}>
        <span className="text-white font-bold text-[13px]">B</span>
      </div>
    ),
    label: "Bitbucket",
    description: "Import a repository or existing app. Agent support may be limited.",
  },
  {
    id: "figma",
    icon: (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#1e1e1e" }}>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <rect x="0" y="0" width="8" height="8" rx="4" fill="#F24E1E" />
          <rect x="8" y="0" width="8" height="8" rx="4" fill="#FF7262" />
          <rect x="0" y="8" width="8" height="8" rx="4" fill="#A259FF" />
          <rect x="0" y="16" width="8" height="4" rx="2" fill="#0ACF83" />
          <circle cx="12" cy="12" r="4" fill="#1ABCFE" />
        </svg>
      </div>
    ),
    label: "Figma Design",
    description: "Convert your designs into live Apps using Replit Agent",
  },
  {
    id: "lovable",
    icon: (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#ff3c6e" }}>
        <Heart size={16} color="#fff" fill="#fff" />
      </div>
    ),
    label: "Lovable",
    description: "Migrate your site to make it production-ready",
    badge: "FREE",
  },
  {
    id: "bolt",
    icon: (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#1a1a1a" }}>
        <Zap size={16} color="#c9ff47" fill="#c9ff47" />
      </div>
    ),
    label: "Bolt",
    description: "Migrate your prototype to make it production-ready",
  },
  {
    id: "base44",
    icon: (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#6c47ff" }}>
        <span className="text-white font-bold text-[11px]">44</span>
      </div>
    ),
    label: "Base44",
    description: "Migrate your site to make it production-ready",
    badge: "FREE",
  },
  {
    id: "vercel",
    icon: (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#000" }}>
        <Triangle size={14} color="#fff" fill="#fff" />
      </div>
    ),
    label: "Vercel",
    description: "Migrate your site to make it production-ready",
    badge: "FREE",
  },
  {
    id: "spreadsheet",
    icon: (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#1a7d45" }}>
        <Table size={16} color="#fff" />
      </div>
    ),
    label: "Spreadsheet",
    description: "Create an app from Excel, CSV, or Google Sheets data",
  },
  {
    id: "zipfile",
    icon: (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#3a3a3e" }}>
        <Archive size={16} color={T.textDim} />
      </div>
    ),
    label: "Zip file",
    description: "Import from a zip file.",
  },
  {
    id: "empty",
    icon: (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#1a2a3a" }}>
        <Code size={16} color="#4a9eff" />
      </div>
    ),
    label: "Empty",
    description: "Start from a completely empty project without Agent setup or scaffolding.",
  },
];

function ImportListPage({ setPage }: { setPage: (p: Page) => void }) {
  const navigable: Page[] = ["github", "bitbucket", "figma", "lovable", "bolt", "spreadsheet"];

  return (
    <div
      className="h-full overflow-y-auto px-12 py-10"
      style={{ background: T.bg, fontFamily: "Inter, -apple-system, sans-serif" }}
    >
      <h1 className="text-[26px] font-semibold mb-1" style={{ color: T.text }}>
        Import to Replit
      </h1>
      <p className="text-sm mb-7" style={{ color: T.muted }}>
        Migrate data, code, and designs from other apps into Replit
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-w-[720px]">
        {IMPORT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left group hover:bg-white/[0.03] transition-colors"
            style={{ border: `1px solid ${T.border}`, background: T.surface }}
            onClick={() => navigable.includes(opt.id) ? setPage(opt.id) : undefined}
          >
            <div className="shrink-0">{opt.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[13px] font-medium" style={{ color: T.text }}>
                  {opt.label}
                </span>
                {opt.badge && (
                  <span
                    className="text-[10px] font-semibold px-1.5 py-px rounded"
                    style={{ background: "rgba(26,186,122,0.12)", color: T.green, border: `1px solid rgba(26,186,122,0.25)` }}
                  >
                    {opt.badge}
                  </span>
                )}
              </div>
              <p className="text-[12px] leading-snug" style={{ color: T.muted }}>
                {opt.description}
              </p>
            </div>
            <ArrowRight size={15} color={T.muted} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Shared import sub-page layout ───────────────────────────────────────────

function ImportSubPage({
  setPage,
  title,
  subtitle,
  infoTitle,
  infoContent,
  children,
}: {
  setPage: (p: Page) => void;
  title: string;
  subtitle: string;
  infoTitle: string;
  infoContent: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className="h-full overflow-y-auto px-10 py-7"
      style={{ background: T.bg, fontFamily: "Inter, -apple-system, sans-serif" }}
    >
      {/* Back link */}
      <button
        className="flex items-center gap-1 text-[12px] mb-5 hover:opacity-80 transition-opacity"
        style={{ color: T.muted }}
        onClick={() => setPage("import")}
      >
        <ChevronLeft size={14} />
        All import sources
      </button>

      <div className="flex gap-5 max-w-[800px]">
        {/* Main form panel */}
        <div className="flex-1 min-w-0">
          <h1 className="text-[24px] font-semibold mb-1" style={{ color: T.text }}>
            {title}
          </h1>
          <p className="text-[13px] mb-5" style={{ color: T.muted }}>
            {subtitle}
          </p>
          {children}
        </div>

        {/* Info panel */}
        <div
          className="shrink-0 rounded-xl p-4 h-fit"
          style={{ width: 230, background: T.surface, border: `1px solid ${T.border}` }}
        >
          <p className="text-[13px] font-semibold mb-2" style={{ color: T.text }}>
            {infoTitle}
          </p>
          {infoContent}
        </div>
      </div>
    </div>
  );
}

function DocsButton() {
  return (
    <button
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11.5px] mt-3 hover:bg-white/5 transition-colors"
      style={{ border: `1px solid ${T.border}`, color: T.textDim }}
    >
      <ExternalLink size={11} />
      Docs
    </button>
  );
}

function OwnerRow() {
  return (
    <div className="pt-3 mt-3" style={{ borderTop: `1px solid ${T.border}` }}>
      <p className="text-[12px] mb-2" style={{ color: T.muted }}>Owner</p>
      <div className="flex items-center gap-2">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
          style={{ background: "#c96a1a", color: "#fff" }}
        >
          DE
        </div>
        <span className="text-[13px]" style={{ color: T.text }}>Deepteal</span>
      </div>
    </div>
  );
}

function FreeAppsNote() {
  return (
    <p className="text-[11px]" style={{ color: T.muted }}>
      You have 10 free apps left
    </p>
  );
}

function RepoUrlInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="mb-4">
      <p className="text-[12.5px] font-medium mb-1.5" style={{ color: T.textDim }}>
        {label}
      </p>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
        style={{
          background: T.surface,
          color: T.text,
          caretColor: T.blue,
        }}
      />
    </div>
  );
}

// ─── GitHub import page ───────────────────────────────────────────────────────

function GitHubImportPage({ setPage }: { setPage: (p: Page) => void }) {
  const [search, setSearch] = useState("");

  return (
    <ImportSubPage
      setPage={setPage}
      title="Import from GitHub"
      subtitle="Import a repository or existing app. Agent support may be limited."
      infoTitle="Importing from GitHub"
      infoContent={
        <>
          <p className="text-[12px] leading-relaxed" style={{ color: T.muted }}>
            To get started, copy your GitHub repository into the{" "}
            <span style={{ color: T.text }}>field</span> or connect your GitHub account to search
            your repositories.
          </p>
          <DocsButton />
        </>
      }
    >
      <RepoUrlInput label="GitHub Repo URL" placeholder="https://github.com/username/repo" />

      <p className="text-[12.5px] mb-2" style={{ color: T.muted }}>
        Or select a repo from your account
      </p>

      {/* Repo selector row */}
      <div className="flex gap-2 mb-2">
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px]"
          style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.text, minWidth: 160 }}
        >
          <span className="flex-1 text-left">ElonInvestmentCo</span>
          <ChevronDown size={13} color={T.muted} />
        </button>
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: T.surface, border: `1px solid ${T.border}` }}
        >
          <Search size={13} color={T.muted} />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[13px]"
            style={{ color: T.text, caretColor: T.blue }}
          />
        </div>
      </div>

      {/* Repo list area */}
      <div
        className="rounded-lg flex items-center justify-center mb-0"
        style={{ border: `1px solid ${T.border}`, height: 130, background: T.surface }}
      >
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#e34c26", animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#e34c26", animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#e34c26", animationDelay: "300ms" }} />
        </div>
      </div>

      <OwnerRow />

      <div className="flex items-center justify-between mt-4">
        <button className="text-[12px] hover:underline" style={{ color: T.blue }}>
          Missing a repository? See our docs for FAQs →
        </button>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: T.blue }}
        >
          <Download size={13} />
          Import from GitHub
        </button>
      </div>
    </ImportSubPage>
  );
}

// ─── Bitbucket import page ────────────────────────────────────────────────────

function BitbucketImportPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <ImportSubPage
      setPage={setPage}
      title="Import from Bitbucket"
      subtitle="Import a repository or existing app. Agent support may be limited."
      infoTitle="Importing from Bitbucket"
      infoContent={
        <>
          <p className="text-[12px] leading-relaxed" style={{ color: T.muted }}>
            To get started, copy your Bitbucket repository URL into the{" "}
            <span style={{ color: T.text }}>field</span> or connect your Bitbucket account to search
            your repositories.
          </p>
          <DocsButton />
        </>
      }
    >
      <RepoUrlInput label="Bitbucket Repo URL" placeholder="https://bitbucket.org/workspace/repo" />

      <p className="text-[12.5px] mb-2" style={{ color: T.muted }}>
        Or select a repo from your account
      </p>

      {/* Connect to Bitbucket */}
      <div
        className="rounded-lg flex flex-col items-center justify-center py-10 mb-0"
        style={{ border: `1px solid ${T.border}`, background: T.surface }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#e34c26" }}>
            <span className="text-white font-bold text-base">R</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-5 h-px my-1" style={{ background: T.border }} />
            <span style={{ color: T.muted, fontSize: 12 }}>↔</span>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#0052cc" }}>
            <span className="text-white font-bold text-base">B</span>
          </div>
        </div>
        <p className="text-[14px] font-semibold mb-1" style={{ color: T.text }}>
          Connect to Bitbucket
        </p>
        <p className="text-[12px] mb-4 text-center" style={{ color: T.muted }}>
          Get started by logging in with your Bitbucket account
        </p>
        <button
          className="px-4 py-2 rounded-lg text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: T.blue }}
        >
          Connect your Bitbucket account
        </button>
      </div>

      <OwnerRow />

      <div className="flex items-center justify-between mt-4">
        <FreeAppsNote />
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: T.blue }}
        >
          <Download size={13} />
          Import from Bitbucket
        </button>
      </div>
    </ImportSubPage>
  );
}

// ─── Figma import page ────────────────────────────────────────────────────────

function FigmaImportPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <ImportSubPage
      setPage={setPage}
      title="Import Figma Design into Replit"
      subtitle="Convert your designs into live Apps using Replit Agent"
      infoTitle="Importing frames from Figma"
      infoContent={
        <>
          <p className="text-[12px] leading-relaxed" style={{ color: T.muted }}>
            Getting started is easy: 1. Connect your{" "}
            <span style={{ color: T.text }}>Figma account</span> 2. In Figma, select the frame you
            want to build in Replit 3. Copy the frame URL and{" "}
            <span style={{ color: T.text }}>paste it</span>
          </p>
          <DocsButton />
          <div className="mt-4">
            <p className="text-[11px] font-medium mb-2" style={{ color: T.muted }}>
              What we'll import:
            </p>
            {["Theme & components", "Assets & icons", "App scaffolding"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 mb-1">
                <Check size={11} color={T.green} />
                <span className="text-[11.5px]" style={{ color: T.textDim }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </>
      }
    >
      {/* Connect Figma */}
      <div
        className="rounded-xl flex flex-col items-center justify-center py-14"
        style={{ border: `1px solid ${T.border}`, background: T.surface }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#1e1e1e", border: `1px solid ${T.border}` }}>
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <rect x="0" y="0" width="9" height="9" rx="4.5" fill="#F24E1E" />
              <rect x="9" y="0" width="9" height="9" rx="4.5" fill="#FF7262" />
              <rect x="0" y="9" width="9" height="9" rx="4.5" fill="#A259FF" />
              <rect x="0" y="18" width="9" height="4" rx="2" fill="#0ACF83" />
              <circle cx="13.5" cy="13.5" r="4.5" fill="#1ABCFE" />
            </svg>
          </div>
          <ArrowRight size={16} color={T.muted} />
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#e34c26" }}>
            <span className="text-white font-bold text-xl">R</span>
          </div>
        </div>
        <p className="text-[15px] font-semibold mb-1" style={{ color: T.text }}>
          Connect Figma to Replit
        </p>
        <p className="text-[12.5px] mb-5" style={{ color: T.muted }}>
          Get started by logging in with your Figma account.
        </p>
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: T.blue }}
        >
          Log in with Figma
          <ArrowRight size={13} />
        </button>
      </div>
    </ImportSubPage>
  );
}

// ─── Lovable import page ──────────────────────────────────────────────────────

function LovableImportPage({ setPage }: { setPage: (p: Page) => void }) {
  const [tab, setTab] = useState<"zip" | "github">("zip");

  return (
    <ImportSubPage
      setPage={setPage}
      title="Migrate from Lovable to Replit"
      subtitle="Export your project from Lovable and import it to Replit"
      infoTitle="Exporting from Lovable"
      infoContent={
        <>
          {[
            "1. Copy the export prompt below.",
            "2. Paste it into Lovable's chat so it builds you a ReplitExport.zip.",
            "3. Download the zip from Lovable.",
            "4. Drop the zip into the upload area here — Replit will import your app and hand it off to Agent.",
          ].map((step) => (
            <p key={step} className="text-[11.5px] leading-relaxed mb-1.5" style={{ color: T.muted }}>
              {step}
            </p>
          ))}
          <div className="flex gap-2 mt-3">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11.5px] hover:bg-white/5 transition-colors"
              style={{ border: `1px solid ${T.border}`, color: T.textDim }}
            >
              Copy export prompt
            </button>
            <DocsButton />
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-medium mb-2" style={{ color: T.muted }}>
              What we'll import:
            </p>
            {["Code", "Design and styles", "Assets", "Backend functionality", "Database schema"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 mb-1">
                <Check size={11} color={T.green} />
                <span className="text-[11.5px]" style={{ color: T.textDim }}>{item}</span>
              </div>
            ))}
          </div>
        </>
      }
    >
      {/* Tabs */}
      <div className="flex gap-1 mb-5" style={{ borderBottom: `1px solid ${T.border}` }}>
        {(["zip", "github"] as const).map((t) => (
          <button
            key={t}
            className="pb-2 px-1 text-[13px] font-medium transition-colors mr-3"
            style={{
              color: tab === t ? T.text : T.muted,
              borderBottom: tab === t ? `2px solid ${T.text}` : "2px solid transparent",
            }}
            onClick={() => setTab(t)}
          >
            {t === "zip" ? "Zip upload" : "GitHub"}
          </button>
        ))}
      </div>

      {tab === "zip" && (
        <>
          {/* Steps */}
          <p className="text-[12px] mb-3" style={{ color: T.muted }}>Here's what will happen:</p>
          <div className="flex gap-3 mb-5">
            {[
              "1. We'll import your code and run a security check",
              "2. Your database will be migrated to Replit",
              "3. (Optional) You can choose to import any existing user data",
            ].map((step) => (
              <div
                key={step}
                className="flex-1 p-3 rounded-lg text-[11.5px] leading-snug"
                style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.muted }}
              >
                {step}
              </div>
            ))}
          </div>

          <p className="text-[12.5px] font-medium mb-2" style={{ color: T.textDim }}>
            Select a zip file
          </p>
          <button
            className="w-full flex items-center justify-center gap-2 py-6 rounded-lg text-[13px] hover:bg-white/[0.02] transition-colors mb-4"
            style={{ border: `2px dashed ${T.border}`, color: T.muted }}
          >
            <Upload size={15} />
            Choose zip file or drag here
          </button>
        </>
      )}

      {tab === "github" && (
        <>
          <RepoUrlInput label="GitHub Repo URL" placeholder="https://github.com/username/repo" />
          <p className="text-[12.5px] mb-2" style={{ color: T.muted }}>
            Or select a repo from your account
          </p>
          <div
            className="rounded-lg flex items-center justify-center mb-4"
            style={{ border: `1px solid ${T.border}`, height: 100, background: T.surface }}
          >
            <Loader2 size={20} color={T.muted} className="animate-spin" />
          </div>
        </>
      )}

      <OwnerRow />

      <div className="flex items-center justify-between mt-4">
        <FreeAppsNote />
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: T.blue }}
        >
          <Download size={13} />
          Import from zip
        </button>
      </div>
    </ImportSubPage>
  );
}

// ─── Bolt import page ─────────────────────────────────────────────────────────

function BoltImportPage({ setPage }: { setPage: (p: Page) => void }) {
  const [search, setSearch] = useState("");

  return (
    <ImportSubPage
      setPage={setPage}
      title="Migrate from Bolt to Replit"
      subtitle="Export your project from Bolt and import it to Replit"
      infoTitle="Exporting from Bolt"
      infoContent={
        <>
          <p className="text-[12px] leading-relaxed" style={{ color: T.muted }}>
            To get started, export your Bolt project to GitHub. Then{" "}
            <span style={{ color: T.text }}>simply</span> connect your GitHub account to Replit and
            select your new Bolt project repo for import.
          </p>
          <DocsButton />
          <div className="mt-4">
            <p className="text-[11px] font-medium mb-2" style={{ color: T.muted }}>
              What we'll import:
            </p>
            {["Code", "Design and styles", "Assets", "Backend functionality", "Database schema"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 mb-1">
                <Check size={11} color={T.green} />
                <span className="text-[11.5px]" style={{ color: T.textDim }}>{item}</span>
              </div>
            ))}
            <p className="text-[11px] font-medium mb-2 mt-3" style={{ color: T.muted }}>
              What's not included:
            </p>
            {["Supabase database", "Secrets"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 mb-1">
                <div className="w-[11px] h-[11px] rounded-sm flex items-center justify-center" style={{ background: T.border }}>
                  <span style={{ color: T.muted, fontSize: 8 }}>✕</span>
                </div>
                <span className="text-[11.5px]" style={{ color: T.textDim }}>{item}</span>
              </div>
            ))}
          </div>
        </>
      }
    >
      <RepoUrlInput label="GitHub Repo URL" placeholder="https://github.com/username/repo" />

      <p className="text-[12.5px] mb-2" style={{ color: T.muted }}>
        Or select a repo from your account
      </p>

      <div className="flex gap-2 mb-2">
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px]"
          style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.text, minWidth: 160 }}
        >
          <span className="flex-1 text-left">ElonInvestmentCo</span>
          <ChevronDown size={13} color={T.muted} />
        </button>
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: T.surface, border: `1px solid ${T.border}` }}
        >
          <Search size={13} color={T.muted} />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[13px]"
            style={{ color: T.text, caretColor: T.blue }}
          />
        </div>
      </div>

      <div
        className="rounded-lg flex items-center justify-center mb-0"
        style={{ border: `1px solid ${T.border}`, height: 120, background: T.surface }}
      >
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#e34c26", animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#e34c26", animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#e34c26", animationDelay: "300ms" }} />
        </div>
      </div>

      <OwnerRow />

      <div className="flex items-center justify-between mt-4">
        <button className="text-[12px] hover:underline" style={{ color: T.blue }}>
          Missing a repository? See our docs for FAQs →
        </button>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: T.blue }}
        >
          <Download size={13} />
          Import from Bolt
        </button>
      </div>
    </ImportSubPage>
  );
}

// ─── Spreadsheet import page ──────────────────────────────────────────────────

function SpreadsheetImportPage({ setPage }: { setPage: (p: Page) => void }) {
  const [sheetsUrl, setSheetsUrl] = useState("");

  return (
    <ImportSubPage
      setPage={setPage}
      title="Create an app from a spreadsheet"
      subtitle="Upload an Excel or CSV file, or paste a Google Sheets URL. Agent will build an app to view and manage your data."
      infoTitle="How it works"
      infoContent={
        <>
          {[
            "Upload a spreadsheet file (xlsx, .csv, or .tsv).",
            "Paste a public Google Sheets URL or a spreadsheet shared with this link.",
            "The spreadsheet must be accessible or shared with this link.",
          ].map((step, i) => (
            <p key={i} className="text-[11.5px] leading-relaxed mb-1.5" style={{ color: T.muted }}>
              {step}
            </p>
          ))}
          <div className="mt-4">
            <p className="text-[11px] font-medium mb-2" style={{ color: T.muted }}>
              What to expect:
            </p>
            {[
              "Agent reads your spreadsheet structure and data",
              "Builds a full stack app with a database from your data",
              "Creates a UI to view, search, and manage your records",
            ].map((item) => (
              <div key={item} className="flex items-start gap-1.5 mb-1">
                <Check size={11} color={T.green} className="mt-0.5 shrink-0" />
                <span className="text-[11.5px]" style={{ color: T.textDim }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-medium mb-2" style={{ color: T.muted }}>
              What won't import:
            </p>
            {["Formulas and computed structure", "UI to view and manage data", "Charts and visualizations"].map((item) => (
              <div key={item} className="flex items-start gap-1.5 mb-1">
                <Info size={11} color={T.muted} className="mt-0.5 shrink-0" />
                <span className="text-[11.5px]" style={{ color: T.textDim }}>{item}</span>
              </div>
            ))}
          </div>
        </>
      }
    >
      {/* Google Sheets URL */}
      <div className="mb-4">
        <p className="text-[12.5px] font-medium mb-1.5" style={{ color: T.textDim }}>
          Paste a Google Sheets URL
        </p>
        <input
          type="text"
          placeholder="https://docs.google.com/spreadsheets/..."
          value={sheetsUrl}
          onChange={(e) => setSheetsUrl(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
          style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            color: T.text,
            caretColor: T.blue,
          }}
        />
        <p className="text-[11px] mt-1.5" style={{ color: T.muted }}>
          The spreadsheet must be accessible or shared with this link.
        </p>
      </div>

      {/* File upload */}
      <div className="mb-4">
        <p className="text-[12.5px] font-medium mb-2" style={{ color: T.textDim }}>
          Upload a spreadsheet file
        </p>
        <button
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] hover:bg-white/[0.02] transition-colors mb-2"
          style={{ border: `2px dashed ${T.border}`, color: T.muted }}
        >
          <Upload size={14} />
          Choose spreadsheet file or drag here
        </button>
        <p className="text-[11px]" style={{ color: T.muted }}>
          Supported formats: .xlsx, .csv, .tsv
        </p>
      </div>

      <OwnerRow />

      <div className="flex items-center justify-between mt-4">
        <FreeAppsNote />
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: T.blue }}
        >
          Create app from spreadsheet!
        </button>
      </div>
    </ImportSubPage>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function Builder() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: T.bg, color: T.text, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <Sidebar page={page} setPage={setPage} />

      <main className="flex-1 overflow-hidden">
        {page === "home" && <HomePage />}
        {page === "import" && <ImportListPage setPage={setPage} />}
        {page === "github" && <GitHubImportPage setPage={setPage} />}
        {page === "bitbucket" && <BitbucketImportPage setPage={setPage} />}
        {page === "figma" && <FigmaImportPage setPage={setPage} />}
        {page === "lovable" && <LovableImportPage setPage={setPage} />}
        {page === "bolt" && <BoltImportPage setPage={setPage} />}
        {page === "spreadsheet" && <SpreadsheetImportPage setPage={setPage} />}
      </main>
    </div>
  );
}
