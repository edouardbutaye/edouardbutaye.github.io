/* =============================================================
   MAIN.JS
   ---------------------------------------------------------------
   Every page loads this one script with:
     <script src="js/main.js"></script>

   It does two small, independent things:
     1. Opens/closes the mobile navigation menu (the "hamburger"
        button that appears on narrow screens).
     2. Writes the current year into the footer, so the copyright
        notice never goes out of date.

   Both pieces check that the element they need actually exists
   before using it, so this same file works unchanged on every
   page even if a page doesn't have every element.
   ============================================================= */


/* -------------------------------------------------------------
   1. MOBILE NAVIGATION TOGGLE
   ------------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });
}


/* -------------------------------------------------------------
   2. AUTOMATIC COPYRIGHT YEAR

   ------------------------------------------------------------- */
const yearSpan = document.getElementById("year");

if (yearSpan) {
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}


/* -------------------------------------------------------------
   3. PUBLICATION TYPE FILTER
   Only on publications.html, which has a row of filter buttons
   (<ul id="typeFilter">) above the list of publication cards.

   Each button carries a data-filter value ("all", "journal",
   "thesis"); each card carries a matching data-type. Clicking a
   button hides every card whose data-type does not match, by
   adding the "is-hidden" class that css/style.css turns into
   "display: none".

   Matching is done on those data- attributes rather than on the
   button's visible text, so the labels can be reworded or
   translated without breaking the filtering.
   ------------------------------------------------------------- */
const typeFilter = document.getElementById("typeFilter");

if (typeFilter) {
  const buttons = typeFilter.querySelectorAll("button[data-filter]");
  const cards = document.querySelectorAll(".card-list .card");

  /* Count the cards of each data-type once, at load, and append the
     number to each filter button. Computing it here rather than
     typing it into the HTML means the numbers can never drift out of
     date when a publication is added to or removed from the page. */
  const counts = {};
  cards.forEach((card) => {
    counts[card.dataset.type] = (counts[card.dataset.type] || 0) + 1;
  });

  buttons.forEach((button) => {
    const filter = button.dataset.filter;
    /* "all" counts every card, including any that is missing a
       data-type and so cannot be reached by a specific filter. */
    const total = filter === "all" ? cards.length : counts[filter] || 0;
    const plural = total === 1 ? "publication" : "publications";

    /* Set the spoken name BEFORE adding the visible count, otherwise
       the number would be read into the label twice. The bracketed
       number is then hidden from screen readers as a duplicate. */
    button.setAttribute("aria-label", `${button.textContent.trim()}, ${total} ${plural}`);
    button.insertAdjacentHTML(
      "beforeend",
      ` <span class="tag__count" aria-hidden="true">(${total})</span>`
    );
  });

  /* One listener on the <ul> rather than one per button: the click
     bubbles up from whichever button was pressed, and closest()
     finds it again. Adding a fourth filter later needs no new
     listener. */
  typeFilter.addEventListener("click", (event) => {
    const clicked = event.target.closest("button[data-filter]");
    if (!clicked) return; // a click on the gap between buttons

    const wanted = clicked.dataset.filter;

    // Mark the pressed button; aria-pressed drives the CSS too.
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button === clicked));
    });

    // "all" matches everything; otherwise compare against data-type.
    cards.forEach((card) => {
      const matches = wanted === "all" || card.dataset.type === wanted;
      card.classList.toggle("is-hidden", !matches);
    });
  });
}


/* -------------------------------------------------------------
   4. LIGHT / DARK THEME TOGGLE
   The button lives at the right-hand end of the top nav on every
   page. Clicking it writes data-theme="light" or "dark" onto the
   <html> element, which flips the color variables defined at the
   top of css/style.css, and stores the choice so it survives a
   reload and applies across pages.

   The saved choice is APPLIED by a small inline script in each
   page's <head>, not here: this file is deferred, so doing it here
   would repaint the page after the visitor had already seen it.
   What is left for this file is reacting to clicks and keeping the
   button's label in step.
   ------------------------------------------------------------- */
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  /* What the page is showing right now: an explicit choice if one was
     made, otherwise whatever the operating system asks for. */
  const currentTheme = () =>
    document.documentElement.getAttribute("data-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  /* The button always offers the OTHER theme, so its icon and its
     label describe where a click would take you, not where you are. */
  const describeButton = () => {
    const goingTo = currentTheme() === "dark" ? "light" : "dark";
    themeToggle.textContent = goingTo === "dark" ? "🌙" : "☀️";
    themeToggle.setAttribute("aria-label", `Switch to ${goingTo} theme`);
  };

  describeButton();

  themeToggle.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* Storage can be unavailable in private mode. The theme still
         switches for this page view; it just will not be remembered. */
    }
    describeButton();
  });

  /* If the visitor has never chosen explicitly, follow the operating
     system live - so switching the OS to dark at sunset updates the
     page without a reload. */
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (!document.documentElement.hasAttribute("data-theme")) describeButton();
    });
}


/* -------------------------------------------------------------
   5. SIDEBAR LINKS TOGGLE (small screens only)
   On a phone the contact and social links would push the actual
   page content off the bottom of the screen, so CSS hides them
   behind a "Links" button (see the RESPONSIVE section of
   css/style.css). This wires that button up.

   The button and the list are tied together in the markup by
   aria-controls / aria-expanded, so a screen reader announces the
   list as collapsible and reports its current state. On desktop
   the button is display:none and none of this runs.
   ------------------------------------------------------------- */
const linksToggle = document.getElementById("linksToggle");
const sidebarLinks = document.getElementById("sidebarLinks");

if (linksToggle && sidebarLinks) {
  linksToggle.addEventListener("click", () => {
    const open = sidebarLinks.classList.toggle("is-open");
    linksToggle.setAttribute("aria-expanded", String(open));
  });
}
