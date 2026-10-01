# Date Counter

A small, dependency-free browser app that counts inclusive calendar days across
multiple date ranges. Overlapping dates are counted only once in the grand total.

It also includes an optional California Penal Code § 4019 custody-credit calculator.

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

## How date counting works

- Start and end dates both count. September 28–30, 2026 is **3 days**.
- Each row displays its own inclusive day count.
- The large total counts each calendar day only once, even when ranges overlap.
- Date math uses calendar dates in UTC, avoiding daylight-saving time errors.

## California Penal Code § 4019 calculator

The custody-credit section uses the unique inclusive-day total as the number of
actual custody days. When the four-day commitment requirement is marked as
satisfied, it applies the standard current § 4019 formula: two conduct-credit
days for each complete two-day block of actual custody.

Examples:

- 4 actual days → 4 conduct days → 8 total credit days.
- 5 actual days → 4 conduct days → 9 total credit days.
- 6 actual days → 6 conduct days → 12 total credit days.

The calculator does **not** determine whether § 4019 applies in a particular
case. Other statutes can limit or eliminate conduct credits, and custody must
otherwise qualify for presentence credit. The result should be independently
verified before use in a case.


## California Penal Code § 29805 lookup

The app also includes a local lookup for offenses listed in the current text of
Penal Code § 29805. The input is deliberately forgiving: examples such as
`242`, `PC 242`, `Penal Code section 242`, `§ 242`, and `368(b)`
are normalized before lookup.

The lookup is subdivision-aware where § 29805 lists only part of a statute. It
also displays the specific § 29805 subdivision and any conviction-date or factual
condition reflected in the statute. A "not listed" result means only that the
entered offense was not found in § 29805; it is not a determination that no
other firearm prohibition applies.

Statutory source: California Legislative Information, Penal Code § 29805,
current text effective January 1, 2026.
