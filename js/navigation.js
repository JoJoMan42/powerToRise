/* ==========================
   NAVIGATION.JS
   Mobile Navigation + Active Links
========================== */

document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // ACTIVE NAV LINK
    // ========================

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }
    });

    // ========================
    // MOBILE NAVIGATION
    // ========================

    const toggleBtn = document.getElementById("mobileToggle");

    if (!toggleBtn) return;

    const mobileNav = document.createElement("div");

    mobileNav.classList.add("mobile-nav");

    mobileNav.innerHTML = `
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="programs.html">Programs</a>
        <a href="gallery.html">Gallery</a>
        <a href="book.html">Book</a>
        <a href="contact.html">Contact</a>
    `;

    document.body.appendChild(mobileNav);

    // Set active link in mobile nav
    const mobileLinks = mobileNav.querySelectorAll("a");

    mobileLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }
    });

    // Toggle menu
    toggleBtn.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

        toggleBtn.textContent =
            mobileNav.classList.contains("active")
                ? "✕"
                : "☰";
    });

    // Close on link click
    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

            toggleBtn.textContent = "☰";
        });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {

        const clickedNav =
            mobileNav.contains(e.target);

        const clickedButton =
            toggleBtn.contains(e.target);

        if (
            !clickedNav &&
            !clickedButton &&
            mobileNav.classList.contains("active")
        ) {

            mobileNav.classList.remove("active");

            toggleBtn.textContent = "☰";
        }
    });

});