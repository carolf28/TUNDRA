// wheel label functionality

const icons = document.querySelectorAll(".icon-wheel img");
const label = document.getElementById("wheelLabel");

icons.forEach(icon => {
    icon.addEventListener("mouseenter", () => {
        label.textContent = icon.alt;
        label.classList.add("active");
    });

    icon.addEventListener("mouseleave", () => {
        label.textContent = "";
        label.classList.remove("active");
    });
});

// splash screen functionality

window.addEventListener("load", () => {
    const splash = document.getElementById("splash-screen");

    setTimeout(() => {
        splash.classList.add("fade-out");
    }, 2000); 
});