import { PenLine, Code2, ImageIcon, BookOpen } from "lucide-react";

const SUGGESTIONS = [
  { icon: PenLine, label: "Write", text: "a short poem about the ocean at dawn" },
  { icon: Code2, label: "Code", text: "a REST API endpoint in Express.js" },
  { icon: ImageIcon, label: "Create", text: "a product description for wireless headphones" },
  { icon: BookOpen, label: "Summarize", text: "the key ideas from Atomic Habits" },
];

export function EmptyState({ onSuggest }: { onSuggest: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 pb-8">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg">
        <svg width="28" height="28" viewBox="0 0 41 41" fill="none">
          <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.313-2.635 10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.313 2.634 10.079 10.079 0 0 0 9.614-6.976 9.967 9.967 0 0 0 6.664-4.834 10.079 10.079 0 0 0-1.24-11.818zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V18z" fill="#000" />
        </svg>
      </div>
      <h1 className="text-3xl font-semibold text-[#ececec] mb-8">What can I help with?</h1>
      <div className="grid grid-cols-2 gap-2.5 w-full max-w-xl mb-8">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onSuggest(s.text)}
            className="flex items-start gap-3 p-4 rounded-2xl bg-[#2f2f2f] hover:bg-[#3a3a3a] border border-white/8 transition-colors text-left group"
          >
            <s.icon size={18} className="text-[#8e8ea0] group-hover:text-[#ececec] transition-colors mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#ececec]">{s.label}</p>
              <p className="text-xs text-[#8e8ea0] mt-0.5 leading-relaxed">{s.text}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
