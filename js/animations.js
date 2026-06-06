/* ==========================
   ANIMATIONS.JS
   Minimal — just scroll header
========================== */

document.addEventListener("DOMContentLoaded", () => {

    // Header shadow on scroll
    const header = document.querySelector(".header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
            } else {
                header.style.boxShadow = "none";
            }
        }, { passive: true });
    }

});
