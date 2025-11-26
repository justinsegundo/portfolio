const PortfolioApp = {
  init() {
    this.initTailwindConfig();
    this.initTheme();
    this.initAnimations();
    this.initSmoothScroll();
    this.initTabs();
    this.initContactForm();
    this.initMobileMenu();
    this.initScrollTop();
  },

  initTailwindConfig() {
    tailwind.config = { darkMode: "class" };
  },

  initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    }

    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      document.documentElement.classList.toggle("dark");
      const isDark = document.documentElement.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  },

  initAnimations() {
    new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 100,
      mobile: true,
      live: true,
    }).init();
  },

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  },

  initTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    
    if (!tabBtns.length || !tabContents.length) return;

    const activeClasses = [
      "border-gray-900",
      "dark:border-slate-100",
      "text-gray-900",
      "dark:text-slate-100"
    ];
    
    const inactiveClasses = [
      "border-transparent",
      "text-gray-500",
      "dark:text-slate-400"
    ];

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");

        tabBtns.forEach((b) => {
          b.classList.remove("active", ...activeClasses);
          b.classList.add(...inactiveClasses);
        });

        btn.classList.add("active", ...activeClasses);
        btn.classList.remove(...inactiveClasses);

        tabContents.forEach((content) => {
          content.style.display = "none";
        });

        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
          targetContent.style.display = "block";
          new WOW().init();
        }
      });
    });
  },

initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  if (!contactForm || !submitBtn || !formStatus) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData); // Convert to JSON

    try {
      const response = await fetch('/.netlify/functions/send_mail', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.text();

      formStatus.classList.remove('hidden');

      if (result.trim() === "success") {
        formStatus.className = "p-4 rounded-lg text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border border-green-200 dark:border-green-800";
        formStatus.textContent = "Thank you! Your message has been sent successfully.";
        contactForm.reset();
      } else {
        formStatus.className = "p-4 rounded-lg text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border border-red-200 dark:border-red-800";
        formStatus.textContent = "Error: " + result;
      }
    } catch (error) {
      formStatus.classList.remove('hidden');
      formStatus.className = "p-4 rounded-lg text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border border-red-200 dark:border-red-800";
      formStatus.textContent = "Network error. Please try again.";
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Send Message</span><svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>';
  });
},


  initMobileMenu() {
    const toggle = document.getElementById("mobile-menu-toggle");
    const menu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("close-icon");

    if (!toggle || !menu || !menuIcon || !closeIcon) return;

    const toggleMenu = (open) => {
      if (open) {
        menu.classList.remove("max-h-0", "opacity-0");
        menu.classList.add("max-h-96", "opacity-100");
        menuIcon.classList.add("hidden");
        closeIcon.classList.remove("hidden");
      } else {
        menu.classList.remove("max-h-96", "opacity-100");
        menu.classList.add("max-h-0", "opacity-0");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      }
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.contains("max-h-96");
      toggleMenu(!isOpen);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });
  },

  initScrollTop() {
    const buttons = document.querySelectorAll("#scrollToTop");
    const showAfter = 300;

    if (!buttons.length) return;

    window.addEventListener("scroll", () => {
      const show = window.pageYOffset > showAfter;
      buttons.forEach((btn) => {
        btn.classList.toggle("opacity-100", show);
        btn.classList.toggle("opacity-0", !show);
        btn.classList.toggle("pointer-events-none", !show);
      });
    });

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  },
};

function openCertificateModal() {
  document.getElementById('certificateModal').classList.remove('hidden');
  document.getElementById('certificateModal').classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
  document.getElementById('certificateModal').classList.add('hidden');
  document.getElementById('certificateModal').classList.remove('flex');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeCertificateModal();
  }
});

document.addEventListener("DOMContentLoaded", () => PortfolioApp.init());