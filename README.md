# Envision: Script Generation App

Envision is a Next.js-based app for creating and editing scripts broken down into scenes. User can select characters, generate scripts from prompts, edit scenes individually or all at once, and accept finalized scripts.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

## Main Features

- **Character Selection:** Choose characters to appear in your script and provide trigger words for scene generation.
- **Custom Prompts:** Enter a main prompt to set the scenario or story direction.
- **Scene Generation:** Generate script scenes automatically, with the number of scenes configurable.
- **Script Editing:** Edit all scenes at once with batch instructions or modify individual scenes for finer control.
- **Collaborative Workflow:** Accept or further edit scripts as you iterate.

## Code Overview

- `contexts/EnvisionContext.tsx`: Manages app state (prompt, character selection, scenes, script).
- `app/auth/characters/page.tsx`: UI for selecting characters and the number of scenes.
- `app/auth/script/page.tsx`: Displays, edits, and manages generated scripts.
- `components/SceneCard.tsx`: Shows individual script scenes and allows editing.

## Contributing

Pull requests and issues are welcome!

## Deployment

You can deploy your own instance to [Vercel](https://vercel.com/) for seamless hosting.

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

