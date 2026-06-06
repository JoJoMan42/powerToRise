/* ==========================
   MAIN.JS
   Core Initialization
========================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "%cPowerToRise Website Loaded",
        "color: #0ea5e9; font-weight: bold; font-size: 14px;"
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