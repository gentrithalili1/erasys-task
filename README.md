# ErasysMonorepo

## Quick start

**Install**

```sh
npm install
```

**Run**

```sh
npm run dev
```

- Next.js app: http://localhost:4200
- SPA: http://localhost:5173

**Test**

```sh
npm run test
```

Runs all project tests (shared-profiles, spa). To test one project: `npx nx test @erasys-monorepo/shared-profiles` or `npx nx test @erasys-monorepo/spa`.

---

<!--

To run the dev server for your app, use:

```sh
npx nx dev web-ssr
```

To create a production bundle:

```sh
npx nx build web-ssr
```

To see all available targets to run for a project, run:

```sh
npx nx show project web-ssr
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/next:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Projects in this monorepo

- **Next.js SSR app**: `web-ssr`
  - Uses the App Router and **server-side rendering**.
  - Renders a gallery of Hunqz profiles using the shared `shared-profiles` library.
  - Exposes a backend **API proxy** at `/api/profiles` that calls the remote Hunqz API and sets CORS headers.
- **React SPA (CSR)**: `@erasys-monorepo/spa`
  - Vite-based React single-page app, styled with Tailwind.
  - Fetches profile data from the `web-ssr` API proxy so that CORS is handled server-side.
- **Shared library**: `@erasys-monorepo/shared-profiles`
  - Typed, reusable utilities for fetching and transforming profile data and image URLs.
  - Covered by minimal **Vitest** tests for URL building, mapping, and sampling logic.

## Running the apps

From the workspace root:

```sh
# Run both apps in parallel
npm run dev
```

Or run individually:

```sh
# Next.js SSR app (defaults to http://localhost:4200)
npx nx dev web-ssr

# React SPA (defaults to http://localhost:5173)
npx nx dev @erasys-monorepo/spa
```

For the SPA to call the Next.js API proxy, configure the base URL:

```sh
# apps/spa/.env.local
VITE_API_BASE_URL=http://localhost:4200
```

## Running tests

```sh
# Shared library tests
npx nx test @erasys-monorepo/shared-profiles
```

The shared library is framework-agnostic and can be reused from API routes, server components, or client applications. -->
