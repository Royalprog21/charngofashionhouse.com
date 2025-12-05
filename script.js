// BACK TO TOP BUTTON
(function(){
        const btn = document.getElementById('backToTop');
        const showAfter = 300; // px scrolled before showing

        function onScroll(){
            if (window.scrollY > showAfter) btn.classList.add('show');
            else btn.classList.remove('show');
        }

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        // initial state
        onScroll();
        })();

// ACTIVE NAV LINK HIGHLIGHTING
(function(){
    const links = document.querySelectorAll('.navBar a, .navBarOutfits a');
    const path = location.pathname.split('/').pop() || 'index.html'; // filename or index.html
    links.forEach(a => {
        const href = a.getAttribute('href') || '';
        const linkFile = href.split('/').pop() || '';
        // match exact filename or root
        if (linkFile && linkFile === path) {
        a.classList.add('active');
        if (a.parentElement) a.parentElement.classList.add('active');
        } else if ((href === '/' || href === 'index.html') && (path === '' || path === 'index.html')) {
        a.classList.add('active');
        }
    });
})();

// BURGER MENU TOGGLE FOR MOBILE
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const leftSide = document.querySelector('.leftSide');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Toggle menu function
    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        leftSide.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (leftSide.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Event listeners
    if (burgerMenu) {
        burgerMenu.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link in the sidebar
    const sidebarLinks = document.querySelectorAll('.showOptions a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && leftSide.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});