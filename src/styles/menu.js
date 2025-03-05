function initializeMenu() {
    const menu = document.getElementById('menu');
    const btn = document.getElementById('hamburger');

    if (!menu || !btn) return;

    const closeMenuOnClickOutside = (e) => {

        // Close menu if click on a link
        menu.querySelectorAll('.link').forEach(link => {
            if (link.contains(e.target)) {
                menu.style.left = '-100%';
                document.removeEventListener("click", closeMenuOnClickOutside);
            }
        })

        // Close menu if click is outside menu or on a link
        if (!menu.contains(e.target) && e.target !== btn) {
            menu.style.left = '-100%';
            document.removeEventListener("click", closeMenuOnClickOutside);
        }
    };

    btn.onclick = (ev) => {
        if (menu.style.left !== '0px') {
            // Open Menu
            menu.style.left = '0px';
            ev.stopPropagation();
            
            // Add event listener to close menu when clicking outside
            document.addEventListener("click", closeMenuOnClickOutside);
        } else {
            // Close Menu
            menu.style.left = '-100%';
            document.removeEventListener("click", closeMenuOnClickOutside);
        }
    };
}

// Initialize only if screen width is below 767px
if (window.innerWidth < 767) {
    initializeMenu();
}

// Add resize event listener to reinitialize on width change
window.addEventListener('resize', () => {
    if (window.innerWidth < 767) {
        initializeMenu();
    }
});

window.addEventListener('load', () => {
    if (window.innerWidth < 767) {
        initializeMenu();
    }
});