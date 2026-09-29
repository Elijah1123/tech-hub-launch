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

- Keep public form writes in validated server functions and private reads in role-gated authenticated queries; this prevents exposure of applicant data.
- Keep the three course records in Cloud as the public catalog; this lets administrator edits appear on public pages.
- Keep social and WhatsApp destinations in one configuration module; official contact details are not yet supplied.
- Keep `/courses` as an Outlet layout with a separate index leaf; otherwise the dynamic course detail child cannot render.
- Keep administrator records behind verified Cloud identity and a server-checked admin role; client-side navigation is not authorization.
- Treat zero tuition and “To be confirmed” as unpublished course logistics, not free tuition; official fees, dates, schedules, and contact destinations await confirmation.
