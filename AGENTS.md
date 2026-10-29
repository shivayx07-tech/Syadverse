<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Hero 3D scene (src/components/syad/HeroScene.tsx) is lazy-loaded client-side only after a WebGL check; shared pointer state lives in HeroScene.input.ts so three.js never enters the SSR bundle.
- Keep the reference opening layout in semantic CSS roles, with independent DOM controls over a client-only particle scene; this preserves accessibility and static fallbacks without disguising artwork as a 3D model.
- Character artwork and cosmic background are separate replaceable assets; a real character model must be validated before adding a model URL to the scene.
