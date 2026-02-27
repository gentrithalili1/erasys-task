import Image from 'next/image';
import type { Metadata } from 'next';
import { fetchProfiles } from '@erasys-monorepo/shared-profiles';
import { ListProfiles, GalleryHeader } from '@erasys-monorepo/shared-ui';

export const metadata: Metadata = {
  title: 'Hunqz Profiles Gallery - SSR Demo',
  description:
    'Server-rendered gallery of Hunqz user profiles, demonstrating Nx monorepo with Next.js and shared TypeScript modules.',
  openGraph: {
    title: 'Hunqz Profiles Gallery - SSR Demo',
    description:
      'Server-rendered gallery of Hunqz user profiles, demonstrating Nx monorepo with Next.js and shared TypeScript modules.',
  },
};

export default async function Index() {
  const profiles = await fetchProfiles();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12">
        <GalleryHeader
          badge="Nx Monorepo • Next.js SSR"
          title="Hunqz Profiles Gallery"
          description="This page is fully server-rendered with Next.js and powered by a shared TypeScript library that fetches profile data and image URLs from the remote Hunqz API."
          accentColor="fuchsia"
        />

        <ListProfiles
          profiles={profiles}
          renderPicture={({ picture, alt }) => (
            <Image
              src={picture.src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
              className="object-cover transition-transform duration-300 hover:scale-105"
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
