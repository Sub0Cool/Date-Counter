# Date Counter

A small, dependency-free browser app that counts inclusive calendar days across
multiple date ranges. Overlapping dates are counted only once in the grand total.

## Use it locally

Download or clone the project, then open `index.html` in any modern web browser.
No install or build step is required.

## Publish with GitHub Pages

1. Create a GitHub repository and add these files to its default branch.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the default branch (usually `main`), choose the `/ (root)` folder, and
   click **Save**.
5. GitHub will show the public site link after deployment finishes.

## How counting works

- Start and end dates both count. September 28–30, 2026 is **3 days**.
- Each row displays its own inclusive day count.
- The large total counts each calendar day only once, even when ranges overlap.
- Date math uses calendar dates in UTC, avoiding daylight-saving time errors.
