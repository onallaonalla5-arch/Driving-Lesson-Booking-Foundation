---
name: Clerk runtime compatibility
description: The web and API Clerk packages must use compatible shared runtime versions.
---

When adding Clerk packages to this workspace, keep `@clerk/react` and `@clerk/shared` on a compatible release line; the React SDK can fail during Vite dependency optimization when it resolves a shared runtime from a different major line.

**Why:** A valid TypeScript installation can still fail at runtime when esbuild resolves a mismatched Clerk shared export.

**How to apply:** After changing Clerk dependencies, restart the web workflow and inspect Vite logs before treating the app as ready.