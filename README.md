# edouardbutaye.github.io — maintenance branch

This branch serves a single "back soon" notice instead of the site. It is
a **deploy-only** branch: never merge it into `main`, and never merge
`main` into it.

## Putting the site into maintenance

In the repository settings, under Pages, change the published branch from
`main` to `maintenance`. Change it back to `main` to restore the site.

## What is here

```
index.html   the notice
404.html     an identical copy, so any deep link shows the notice
             rather than the GitHub Pages error page
images/      favicon, touch icon and the profile photo
```

The page is deliberately self-contained: the styles are inline and there
is no JavaScript and no stylesheet. It cannot be broken by a change to
`css/style.css` or `js/main.js`, which is the point of a page whose job is
to work when the rest does not. It follows the light and dark palettes of
the real site and carries `noindex`, so search engines do not record the
notice in place of the actual pages.

The content pages are absent from this branch on purpose. If they were
present, a visitor with a direct link to `research.html` would bypass the
notice entirely.

## Editing the message

Both files must be changed together:

```
edit index.html
cp index.html 404.html
```
