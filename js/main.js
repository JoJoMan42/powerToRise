/* ==========================
   MAIN.JS
   Core Initialization
========================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "%cPowerToRise Website Loaded",
        "color: #00d4ff; font-weight: bold; font-size: 14px; text-shadow: 0 0 8px rgba(0, 212, 255, 0.5);"
    );

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", (e) => {

            const target = document.querySelector(
                anchor.getAttribute("href")
            );

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

});