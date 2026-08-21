export default function AuthLayout({ eyebrow, title, children, footer }) {
  return (
    <div className="grid min-h-screen sm:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink px-10 py-12 text-paper sm:flex">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-display text-base font-semibold text-ink">
            ⇄
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            SkillBarter
          </span>
        </div>

        <div className="max-w-sm">
          <p className="font-display text-3xl font-medium italic leading-snug text-paper/95">
            "Teach what you know. Learn what you don't. No money changes
            hands."
          </p>
          <div className="mt-8 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-gold">
            <span>Teach</span>
            <span className="text-paper/40">⇄</span>
            <span>Learn</span>
          </div>
        </div>

        <p className="font-body text-xs text-paper/50">
          Campus peer-to-peer skill exchange
        </p>
      </div>

      <div className="flex items-center justify-center bg-paper px-6 py-12">
        <div className="w-full max-w-sm">
          <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-sage">
            {eyebrow}
          </p>
          <h1 className="mb-8 font-display text-3xl font-semibold text-ink">
            {title}
          </h1>

          {children}

          {footer && (
            <p className="mt-6 font-body text-sm text-slate">{footer}</p>
          )}
        </div>
      </div>
    </div>
  );
}
