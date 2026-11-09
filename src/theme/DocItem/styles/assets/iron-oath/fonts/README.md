# Local display fonts

Cinzel and Noto Serif SC are distributed under the SIL Open Font License 1.1; see their adjacent OFL files. Original fonts are unmodified WOFF2 files served by Google Fonts. Downloaded on 2026-11-09.

- Cinzel: https://github.com/google/fonts/tree/main/ofl/cinzel
- Noto Serif SC: https://github.com/google/fonts/tree/main/ofl/notoserifsc
- CSS request: https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Noto+Serif+SC:wght@600&display=swap

The CSS family aliases are Iron Oath Display and Iron Oath Serif SC. Unicode ranges are preserved so browsers request only the subsets needed by visible text. No remote request is made at runtime. Body text uses native system fonts. Font-face rules live in ../../../ice-and-fire-ce.css so they are extracted with the directory theme by the production bundler.
