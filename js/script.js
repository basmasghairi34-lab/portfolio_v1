document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. THEME TOGGLE
    // =========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // =========================================
    // 2. MOBILE MENU
    // =========================================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // =========================================
    // 3. SCROLL ANIMATIONS (IntersectionObserver)
    // =========================================
    const scrollElements = document.querySelectorAll('.fade-in-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.1)) { // 1.1 = slightly before bottom
                displayScrollElement(el);
            }
        })
    }

    // Initialize observer
    // Ideally use IntersectionObserver for performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        scrollElements.forEach((el) => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
        handleScrollAnimation(); // Trigger once on load
    }

    // =========================================
    // 4. HEADER TRANSFORM ON SCROLL
    // =========================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "var(--shadow)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });

    // =========================================
    // 5. CONTACT FORM HANDLING
    // =========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            // Visual feedback
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Send actual email using formsubmit.co
            fetch("https://formsubmit.co/ajax/basmasghairi34@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            })
                .then(response => response.json())
                .then(data => {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.style.opacity = '1';
                    btn.disabled = false;
                })
                .catch(error => {
                    console.error(error);
                    alert('Oops! Something went wrong, please try again.');
                    btn.innerText = originalText;
                    btn.style.opacity = '1';
                    btn.disabled = false;
                });
        });
    }

    // =========================================
    // 6. IMAGE TOGGLE ANIMATION
    // =========================================
    const toggleContainers = document.querySelectorAll('.image-toggle-container');
    toggleContainers.forEach(container => {
        container.addEventListener('click', () => {
            const backImg = container.querySelector('.img-back');
            const hint = container.querySelector('.click-hint');

            if (backImg) {
                if (backImg.style.opacity === '1') {
                    backImg.style.opacity = '0';
                    if (hint) hint.innerHTML = '<i class="fas fa-hand-pointer"></i> Click to view';
                } else {
                    backImg.style.opacity = '1';
                    if (hint) hint.innerHTML = '<i class="fas fa-times"></i> Click to close';
                }
            }
        });
    });

});
