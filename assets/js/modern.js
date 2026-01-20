document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const links = document.querySelectorAll(".site-nav a[data-nav]");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (nav && navToggle) {
    const closeNav = () => {
      nav.dataset.open = "false";
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.classList.remove("is-active");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = nav.dataset.open === "true";
      nav.dataset.open = String(!isOpen);
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navToggle.classList.toggle("is-active", !isOpen);
    });

    nav.addEventListener("click", (event) => {
      if (
        event.target instanceof Element &&
        event.target.matches("a[data-nav]")
      ) {
        closeNav();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    });
  }

  if (links.length > 0) {
    const sections = Array.from(links)
      .map((link) => {
        const id = link.getAttribute("href")?.replace("#", "");
        if (!id) return null;
        const section = document.querySelector(`[data-section="${id}"]`);
        return section ? { id, link, section } : null;
      })
      .filter((entry) => entry !== null);

    const onScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let activeId = sections[0]?.id ?? null;

      sections.forEach((entry) => {
        if (!entry) return;
        const rect = entry.section.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top;
        if (scrollPosition >= offsetTop) {
          activeId = entry.id;
        }
      });

      sections.forEach((entry) => {
        if (!entry) return;
        entry.link.setAttribute(
          "aria-current",
          entry.id === activeId ? "true" : "false",
        );
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
});
