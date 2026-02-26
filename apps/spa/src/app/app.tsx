import { useProfiles } from '../hooks/use-profiles';

export function App() {
  const { profiles, isLoading, error } = useProfiles();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12">
        <header className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Nx Monorepo • React SPA
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Hunqz Profiles Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
            This React SPA fetches the same shared profile data through a
            Next.js API proxy that handles CORS and calls the remote Hunqz API
            on the server.
          </p>
        </header>

        <section className="space-y-8">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
            Featured profiles
          </h2>

          <div className="space-y-10">
            {error ? (
              <p className="text-red-400 text-center">{error}</p>
            ) : isLoading ? (
              <p className="text-slate-400 text-center">Loading profiles...</p>
            ) : (
              profiles.map((profile) => (
                <article
                  key={profile.id}
                  className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {profile.displayName}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {profile.pictures?.map((picture) => (
                      <div
                        key={picture.id}
                        className="relative aspect-[3/4] w-24 sm:w-28 md:w-32 lg:w-36 overflow-hidden rounded-xl bg-slate-800"
                      >
                        <img
                          src={picture.src}
                          alt={profile.displayName}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
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
