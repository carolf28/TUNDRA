const label = document.getElementById("wheelLabel");
const icons = document.querySelectorAll(".icon-wheel img");

icons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
        label.textContent = icon.alt;
        label.classList.add("active");
    });

    icon.addEventListener("mouseleave", () => {
        label.classList.remove("active");
    });
});