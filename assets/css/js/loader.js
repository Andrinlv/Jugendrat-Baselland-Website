/* === loader.js === */
document.documentElement.classList.add('loading');
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.documentElement.classList.remove('loading');
        }, 1000);
    }
});