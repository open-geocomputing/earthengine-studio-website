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
    runButton.classList.add("running");
    runButton.innerHTML = '<span class="spinner" aria-hidden="true"></span> Running';
    runStatus.textContent = "Evaluating image collection…";

    window.setTimeout(() => {
      runButton.classList.remove("running");
      runButton.innerHTML = '<span class="play" aria-hidden="true">▶</span> Run';
      runStatus.textContent = "Complete — layer rendered from 12 scenes in 231 ms";
      document.querySelector("[data-product-demo]")?.classList.add("run-complete");
      window.setTimeout(() => document.querySelector("[data-product-demo]")?.classList.remove("run-complete"), 1200);
    }, 950);
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
