const STORAGE_KEY = "young-theme";

function applyTheme(theme) {
  const html = document.documentElement;
  html.setAttribute("data-theme", theme);
}

function getPreferredTheme() {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    stored = null;
  }
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);
  toggle.setAttribute("aria-pressed", String(initialTheme === "light"));

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    toggle.setAttribute("aria-pressed", String(next === "light"));
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      // Ignore storage errors so the toggle still works.
    }
  });
});

