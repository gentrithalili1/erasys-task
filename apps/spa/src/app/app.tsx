import { ListProfiles, GalleryHeader } from '@erasys-monorepo/shared-ui';
import { useProfiles } from '../hooks/use-profiles';

export function App() {
  const { profiles, isLoading, error } = useProfiles();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12">
        <GalleryHeader
          badge="Nx Monorepo • React SPA"
          title="Hunqz Profiles Gallery"
          description="This React SPA fetches the same shared profile data through a Next.js API proxy that handles CORS and calls the remote Hunqz API on the server."
          accentColor="emerald"
        />

        <ListProfiles
          profiles={profiles}
          loading={isLoading}
          error={error ?? undefined}
          renderPicture={({ picture, alt }) => (
            <img
              src={picture.src}
              alt={alt}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          )}
        />

        <footer className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500">
          <p>
            Built with <span className="font-semibold">Nx</span>,{' '}
            <span className="font-semibold">Next.js 16</span>, and{' '}
            <span className="font-semibold">Tailwind CSS</span> in a typed
            monorepo architecture.
          </p>
        </footer>
      </section>
    </main>
  );
}

export default App;
