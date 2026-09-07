import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="relative grid h-8 w-8 shrink-0 place-items-center">
        <svg viewBox="0 0 40 40" className="h-8 w-8">
          <defs>
            <linearGradient id="logoG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="55%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <path
            d="M20 2 36 11v18L20 38 4 29V11z"
            fill="none"
            stroke="url(#logoG)"
            strokeWidth="1.6"
            className="transition-opacity group-hover:opacity-100"
            opacity="0.85"
          />
          <path d="M13 15h14M20 15v11" stroke="url(#logoG)" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 rounded-full bg-purple/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
      </span>
      <span className="font-display text-base font-semibold tracking-[0.28em] uppercase">
        Tev<span className="text-gradient">exxo</span>
      </span>
    </Link>
  );
}
