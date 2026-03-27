/* === theme.js === */
const savedTheme = localStorage.getItem("moStudioTheme");
if (savedTheme === "dark") { document.documentElement.classList.add("dark-mode"); }

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.textContent = document.documentElement.classList.contains("dark-mode") ? "Kxwrt" : "Plqvn";
        themeToggle.addEventListener("click", () => {
            document.documentElement.classList.toggle("dark-mode");
            const isDark = document.documentElement.classList.contains("dark-mode");
            localStorage.setItem("moStudioTheme", isDark ? "dark" : "light");
            themeToggle.textContent = isDark ? "Kxwrt" : "Plqvn";
        });
    }
});