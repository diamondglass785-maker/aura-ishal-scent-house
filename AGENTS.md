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

- Uploaded product media is served through Lovable Assets pointers and mapped centrally in `src/lib/products.ts` so all shopping views share the same originals.
- Netlify static exports run in an isolated temporary source tree, package unchanged media under `/media/`, and rewrite only staged pointers; this avoids depending on Lovable's asset-serving paths while preserving preview behavior.
