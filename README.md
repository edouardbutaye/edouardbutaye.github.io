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
index.html            Home
research.html         Research activities, figures and references
publications.html     Journal articles and PhD thesis
teaching.html         Courses taught, hours and referents
cv.html               Curriculum vitae

css/style.css         The single stylesheet used by every page
js/main.js            Navigation, theme toggle, publication filter
images/               Photographs, figures and thumbnails
files/                PDFs of the papers, the thesis and the CV
```

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
