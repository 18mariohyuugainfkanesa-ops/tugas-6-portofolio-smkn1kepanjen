document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // DARK MODE & LIGHT MODE
    // =========================

    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;

    // Ambil tema yang tersimpan
    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    } catch (error) {
        console.warn("Penyimpanan tema tidak tersedia.");
    }

    // Terapkan tema awal
    function setTheme(theme) {
        html.setAttribute("data-theme", theme);

        const isDark = theme === "dark";

        themeToggle.textContent = isDark ? "☀️" : "🌙";
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"
        );
        themeToggle.setAttribute(
            "title",
            isDark ? "Mode terang" : "Mode gelap"
        );

        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch (error) {
            console.warn("Tema tidak dapat disimpan.");
        }
    }

    setTheme(savedTheme === "light" ? "light" : "dark");

    // Klik tombol untuk berganti tema
    themeToggle.addEventListener("click", function () {
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        setTheme(newTheme);
    });


    // =========================
    // MENU NAVIGASI HP
    // =========================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Tutup menu setelah link dipilih
    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });


    // =========================
    // ANIMASI SCROLL
    // =========================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("show");
        });
    }


    // =========================
    // NAVIGASI AKTIF
    // =========================

    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.id;

                        links.forEach(function (link) {
                            const isActive =
                                link.getAttribute("href") === "#" + currentId;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }


    // =========================
    // TAHUN OTOMATIS
    // =========================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =========================
    // PESAN DI CONSOLE
    // =========================

    console.log("Website portofolio berhasil dimuat!");
    console.log("Tema aktif:", html.getAttribute("data-theme"));

});