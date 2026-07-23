import { PenLine, Code2, ImageIcon, BookOpen } from "lucide-react";
import { LogoMark } from "./LogoMark";

const SUGGESTIONS = [
  { icon: PenLine, label: "Write", text: "a short poem about the ocean at dawn" },
  { icon: Code2, label: "Code", text: "a REST API endpoint in Express.js" },
  { icon: ImageIcon, label: "Create", text: "a product description for wireless headphones" },
  { icon: BookOpen, label: "Summarize", text: "the key ideas from Atomic Habits" },
];

export function EmptyState({ onSuggest }: { onSuggest: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 pb-8">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: '#181b21' }}>
        <LogoMark size={28} variant="auto" />
      </div>
      <h1 className="text-3xl font-semibold text-[#ececec] mb-8">What can I help with?</h1>
      <div className="grid grid-cols-2 gap-2.5 w-full max-w-xl mb-8">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onSuggest(s.text)}
            className="flex items-start gap-3 p-4 rounded-2xl bg-[#93A2B8] hover:bg-[#7B8FA8] border border-white/8 transition-colors text-left group"
          >
            <s.icon size={18} className="text-[#1E293B] group-hover:text-[#0F172A] transition-colors mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#0F172A]">{s.label}</p>
              <p className="text-xs text-[#334155] mt-0.5 leading-relaxed">{s.text}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
