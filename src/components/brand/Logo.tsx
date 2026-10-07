import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
  wordmark = "Technologies",
}: {
  className?: string;
  showWordmark?: boolean;
  wordmark?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label={`Wavexa ${wordmark} logo`}
      >
        <defs>
          <linearGradient id="pc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="55%" stopColor="var(--secondary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>

        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="url(#pc-grad)"
          strokeWidth="2.2"
        />

        <ellipse
          cx="24"
          cy="24"
          rx="9.5"
          ry="21"
          fill="none"
          stroke="url(#pc-grad)"
          strokeWidth="1.1"
          opacity="0.55"
        />

        <path
          d="M3.6 17.5h40.8M3.6 30.5h40.8"
          stroke="url(#pc-grad)"
          strokeWidth="1.1"
          opacity="0.45"
        />

        <path
          d="M21 11h6v7h7v6h-7v7h-6v-7h-7v-6h7z"
          fill="url(#pc-grad)"
          opacity="0.18"
        />

        <path
          d="M6 24h7l3.5-8 5 16 4-11 2.5 3H42"
          fill="none"
          stroke="url(#pc-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="600"
          style={{ animation: "pulse-line 3.5s ease-out infinite" }}
        />
      </svg>

      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[17px] font-bold tracking-tight">
            Wavexa
          </span>

          <span className="text-[9px] font-medium uppercase tracking-[0.32em] text-muted-foreground">
            {wordmark}
          </span>
        </span>
      ) : null}
    </span>
  );
}