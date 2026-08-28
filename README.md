# edouardbutaye.github.io

Personal academic website of Édouard Butaye, research scientist and CFD
solver developer. Published with GitHub Pages at
<https://edouardbutaye.github.io>.

## How it is built

Plain HTML, CSS and JavaScript. There is no build step, no framework and
no server: every page is a regular `.html` file that can be opened
directly in a browser. A `.nojekyll` file tells GitHub Pages to serve the
files verbatim rather than running them through Jekyll.

```
index.html            Language gate: redirects to /en/ or /fr/
en/index.html         Home
en/research.html      Research activities, figures and references
en/publications.html  Journal articles and PhD thesis
en/teaching.html      Courses taught, hours and referents
en/cv.html            Curriculum vitae
fr/                   The same five pages in French, same filenames

css/style.css         The single stylesheet used by every page
js/main.js            Navigation, theme toggle, publication filter, language
images/               Photographs, figures and thumbnails
files/                PDFs of the papers, the thesis and the CV
```

## Languages

The site is served twice, in English and in French, from `en/` and `fr/`.
The two trees use the **same filenames**, so the EN/FR switch in the top
navigation only has to swap one path segment to reach the same page in the
other language. Section ids stay in English on both sides, so a deep link
such as `#hybrid-rans-les` works whichever edition it was copied from.

The bare root `/` is a gate rather than a page. It carries the Open Graph
card, because the bare address is the one that gets shared, and then sends
the visitor to a language: a choice saved by the switch if there is one,
otherwise whatever the browser asks for, otherwise English.

There is one stylesheet and one script for both editions, so a fix cannot
land in one language and be forgotten in the other. Everything in
`js/main.js` that depends on the language - the few strings it writes into
the page, and the date locale - is read off `<html lang>` from one table
at the top of the file. Page text itself lives in each edition's HTML.

Adding a page means adding it to both trees, giving each edition the
`canonical` and three `hreflang` links that name the pair, and listing
both in `sitemap.xml`.

## Branches

- `main` is what GitHub Pages publishes. It should always be in a state
  that can be served.
- `dev` is where changes are made. Merge into `main` once a change has
  been checked in a browser.

## Editing

`css/style.css` is organised in numbered sections and carries comments
explaining what each block does and why. The colour variables at the top
drive both the light and the dark theme, so changing the look usually
means editing those rather than the rules below.

Maths on the research page is written as LaTeX between `$...$` or
`$$...$$` and rendered by KaTeX, loaded from a CDN. It is the only
external dependency.

`_data/` holds the sources the site content was written from (papers,
defence slides, figures). It is deliberately not committed.
