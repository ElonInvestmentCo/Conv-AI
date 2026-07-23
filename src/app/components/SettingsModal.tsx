import { useState, type ReactNode, type ElementType } from "react";
import {
  Settings,
  User,
  Shield,
  Globe,
  CreditCard,
  Check,
  X,
  Zap,
} from "lucide-react";

type SettingsTab = "general" | "account" | "security" | "data" | "billing";

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative inline-flex w-10 h-5.5 rounded-full transition-colors duration-200 ${on ? "bg-[#6366F1]" : "bg-[#0F172A]/20"}`}
      style={{ height: "22px", width: "40px" }}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform duration-200 ${on ? "translate-x-[18px]" : "translate-x-0"}`}
        style={{ width: "18px", height: "18px" }}
      />
    </button>
  );
}

function SettingsRow({ label, description, children }: { label: string; description: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/6 last:border-0">
      <div className="flex-1 mr-4">
        <p className="text-sm text-[#0F172A] font-medium">{label}</p>
        <p className="text-xs text-[#334155] mt-0.5 leading-relaxed">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function SettingsModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<SettingsTab>("general");
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");

  const tabs: { id: SettingsTab; label: string; icon: ElementType }[] = [
    { id: "general", label: "General", icon: Settings },
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "data", label: "Data controls", icon: Globe },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#93A2B8] rounded-2xl shadow-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <h2 className="text-lg font-semibold text-[#0F172A]">Settings</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#0F172A]/8 text-[#334155] hover:text-[#0F172A] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar tabs */}
          <div className="w-48 border-r border-white/8 p-3 flex-shrink-0">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left mb-0.5 ${
                  tab === t.id
                    ? "bg-[#0F172A]/10 text-[#0F172A] font-medium"
                    : "text-[#334155] hover:text-[#0F172A] hover:bg-[#0F172A]/6"
                }`}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {tab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Appearance</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#0F172A]">Theme</p>
                      <p className="text-xs text-[#334155] mt-0.5">Choose your preferred interface theme</p>
                    </div>
                    <div className="flex bg-[#0F172A]/20 rounded-lg p-1 gap-1">
                      {(["light", "dark", "system"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                            theme === t ? "bg-[#0F172A] text-white" : "text-[#334155] hover:text-[#0F172A]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/8 pt-6">
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Language & Region</h3>
                  <SettingsRow label="Language" description="Interface language">
                    <select className="bg-[#0F172A]/20 text-sm text-[#0F172A] rounded-lg px-3 py-1.5 outline-none">
                      <option>English (US)</option>
                      <option>Español</option>
                      <option>Français</option>
                      <option>Deutsch</option>
                    </select>
                  </SettingsRow>
                </div>
                <div className="border-t border-white/8 pt-6">
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Chat</h3>
                  <SettingsRow label="Always show code when using data analyst" description="Show the underlying code for responses generated with code">
                    <Toggle defaultChecked />
                  </SettingsRow>
                  <SettingsRow label="Show follow-up suggestions" description="Display suggested follow-up prompts after responses">
                    <Toggle defaultChecked />
                  </SettingsRow>
                </div>
              </div>
            )}

            {tab === "account" && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-white/8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center text-white text-2xl font-semibold">
                    A
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#0F172A]">Alex Johnson</p>
                    <p className="text-sm text-[#334155]">alex.johnson@example.com</p>
                    <span className="inline-flex items-center gap-1 text-xs bg-[#6366F1]/15 text-[#6366F1] px-2 py-0.5 rounded-full mt-1">
                      <Zap size={11} /> Free plan
                    </span>
                  </div>
                </div>
                <SettingsRow label="Display name" description="How your name appears in conversations">
                  <input defaultValue="Alex Johnson" className="bg-[#0F172A]/20 text-sm text-[#0F172A] rounded-lg px-3 py-1.5 outline-none w-40" />
                </SettingsRow>
                <div className="pt-4 border-t border-white/8">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg text-sm font-medium transition-colors">
                    <Zap size={15} />
                    Upgrade to Conv AI Pro
                  </button>
                </div>
              </div>
            )}

            {tab === "security" && (
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Security</h3>
                <SettingsRow label="Two-factor authentication" description="Add an extra layer of security to your account">
                  <Toggle />
                </SettingsRow>
                <SettingsRow label="Login notifications" description="Get notified when a new device signs in">
                  <Toggle defaultChecked />
                </SettingsRow>
                <div className="pt-4 border-t border-white/8">
                  <button className="text-sm text-[#334155] hover:text-[#0F172A] transition-colors">
                    Manage active sessions →
                  </button>
                </div>
              </div>
            )}

            {tab === "data" && (
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Data controls</h3>
                <SettingsRow label="Improve the model for everyone" description="Allow your conversations to be used to train our models">
                  <Toggle defaultChecked />
                </SettingsRow>
                <SettingsRow label="Shared links" description="Manage who can view your shared conversations">
                  <Toggle defaultChecked />
                </SettingsRow>
                <div className="pt-4 border-t border-white/8 space-y-3">
                  <button className="w-full text-left px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                    <p className="text-sm font-medium text-[#0F172A]">Export data</p>
                    <p className="text-xs text-[#334155] mt-0.5">Download all your conversations and data</p>
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-colors">
                    <p className="text-sm font-medium text-red-600">Delete account</p>
                    <p className="text-xs text-[#334155] mt-0.5">Permanently delete your account and all data</p>
                  </button>
                </div>
              </div>
            )}

            {tab === "billing" && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#6366F1]/15 to-[#6366F1]/5 border border-[#6366F1]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">Free Plan</p>
                      <p className="text-xs text-[#334155] mt-0.5">Limited to standard AI with standard limits</p>
                    </div>
                    <button className="px-3 py-1.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg text-xs font-medium transition-colors">
                      Upgrade
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { plan: "Conv AI Pro", price: "$20/mo", features: ["Full AI model access", "Advanced reasoning", "Image generation", "Higher limits"] },
                    { plan: "Conv AI Team", price: "$25/mo", features: ["Everything in Pro", "Team workspace", "Admin controls", "Priority support"] },
                  ].map((p) => (
                    <div key={p.plan} className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-[#0F172A]">{p.plan}</p>
                        <p className="text-sm text-[#334155]">{p.price}</p>
                      </div>
                      <ul className="space-y-1.5">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-[#334155]">
                            <Check size={12} className="text-[#6366F1]" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
