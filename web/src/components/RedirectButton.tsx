import type React from "react";
import type { ComponentType } from "react"
import { useNavigate } from "react-router-dom";

interface RedirectButtonProps {
  icon: ComponentType<React.SVGProps<SVGSVGElement>>
  text: string;
  redirectPage: string;
}

export function RedirectButton({ icon: Icon, text, redirectPage }: RedirectButtonProps) {
  const navigate = useNavigate()
  return (
    <button
      className="group relative inline-flex items-center gap-2 bg-black px-6 py-3 text-white rounded-lg hover:bg-black/70 cursor-pointer transition-colors"
      onClick={() => navigate(redirectPage)}
    >
      <Icon className="w-4 h-4" strokeWidth={2.5} />
      <span className="font-medium text-sm">{text}</span>
    </button>
  )
}
