const ACCENT_CLASSES: Record<string, string> = {
  fuchsia: 'text-fuchsia-400',
  emerald: 'text-emerald-400',
};

export interface GalleryHeaderProps {
  badge: string;
  title: string;
  description: string;
  accentColor: keyof typeof ACCENT_CLASSES;
}

export function GalleryHeader({
  badge,
  title,
  description,
  accentColor,
}: GalleryHeaderProps) {
  const accentClass = ACCENT_CLASSES[accentColor] ?? ACCENT_CLASSES.emerald;
  return (
    <header className="space-y-3 text-center">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.2em] ${accentClass}`}
      >
        {badge}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
        {description}
      </p>
    </header>
  );
}
