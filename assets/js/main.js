(() => {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");
  const runButton = document.querySelector("[data-run-demo]");
  const runStatus = document.querySelector("[data-run-status]");

  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menu?.classList.toggle("open", !isOpen);
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton?.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll("[data-language-switcher][open]").forEach((switcher) => {
      if (!switcher.contains(event.target)) switcher.removeAttribute("open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll("[data-language-switcher][open]").forEach((switcher) => {
      switcher.removeAttribute("open");
      switcher.querySelector("summary")?.focus();
    });
  });

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13 });

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  }

  runButton?.addEventListener("click", () => {
    if (runButton.classList.contains("running")) return;
    const runLabel = runButton.dataset.runLabel || "Run";
    const runningLabel = runButton.dataset.runningLabel || "Running";
    runButton.classList.add("running");
    runButton.innerHTML = `<span class="spinner" aria-hidden="true"></span> ${runningLabel}`;
    runStatus.textContent = runStatus.dataset.evaluating || "Evaluating image collection…";

    window.setTimeout(() => {
      runButton.classList.remove("running");
      runButton.innerHTML = `<span class="play" aria-hidden="true">▶</span> ${runLabel}`;
      runStatus.textContent = runStatus.dataset.complete || "Complete — layer rendered from 12 scenes in 231 ms";
      document.querySelector("[data-product-demo]")?.classList.add("run-complete");
      window.setTimeout(() => document.querySelector("[data-product-demo]")?.classList.remove("run-complete"), 1200);
    }, 950);
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
