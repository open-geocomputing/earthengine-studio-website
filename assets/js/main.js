(() => {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const productDemo = document.querySelector("[data-product-demo]");
  const productDemoVideo = productDemo?.querySelector("[data-product-demo-video]");
  const productDemoToggle = productDemo?.querySelector("[data-product-demo-toggle]");
  const productDemoToggleLabel = productDemoToggle?.querySelector("[data-product-demo-toggle-label]");

  if (productDemoVideo && productDemoToggle) {
    let shouldPlay = !reducedMotion;
    let isVisible = true;

    const updateDemoToggle = () => {
      const isPlaying = !productDemoVideo.paused && !productDemoVideo.ended;
      const label = isPlaying ? productDemoToggle.dataset.pauseLabel : productDemoToggle.dataset.playLabel;
      productDemoToggle.setAttribute("aria-pressed", String(isPlaying));
      if (label) {
        productDemoToggle.setAttribute("aria-label", label);
        if (productDemoToggleLabel) productDemoToggleLabel.textContent = label;
      }
    };

    const syncDemoPlayback = () => {
      if (!shouldPlay || !isVisible || document.hidden) {
        productDemoVideo.pause();
        return;
      }
      productDemoVideo.play().catch(updateDemoToggle);
    };

    productDemoToggle.addEventListener("click", () => {
      shouldPlay = productDemoVideo.paused;
      syncDemoPlayback();
    });
    productDemoVideo.addEventListener("play", updateDemoToggle);
    productDemoVideo.addEventListener("pause", updateDemoToggle);
    document.addEventListener("visibilitychange", syncDemoPlayback);

    if ("IntersectionObserver" in window) {
      const demoObserver = new IntersectionObserver((entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        syncDemoPlayback();
      }, { threshold: 0.25 });
      demoObserver.observe(productDemo);
    } else {
      syncDemoPlayback();
    }
    updateDemoToggle();
  }

  const initializeLogo = (element) => {
    if (reducedMotion || element.dataset.logoReady === "true" || !window.lottie) return;
    const container = element.querySelector(".studio-logo-animation");
    const path = element.dataset.animationPath;
    if (!container || !path) return;

    element.dataset.logoReady = "true";
    const animation = window.lottie.loadAnimation({
      autoplay: false,
      container,
      loop: false,
      path,
      renderer: "svg",
      rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
    });
    animation.addEventListener("DOMLoaded", () => {
      element.classList.add("studio-logo-ready");
      animation.playSegments([0, 177], true);
    });
  };

  const logoElements = [...document.querySelectorAll("[data-studio-logo]")];
  if (!reducedMotion && "IntersectionObserver" in window) {
    const logoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        initializeLogo(entry.target);
        logoObserver.unobserve(entry.target);
      });
    }, { rootMargin: "80px" });
    logoElements.forEach((element) => logoObserver.observe(element));
  } else {
    logoElements.forEach(initializeLogo);
  }

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

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
