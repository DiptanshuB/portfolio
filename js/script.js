// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize particles.js for atomic background
    initParticles();
    
    // Text animation for hero section
    animateHeroText();
    
    // Mobile Navigation Toggle
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const navMenu = document.querySelector('nav ul');
        navMenu.classList.toggle('show');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Smooth Scrolling
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navMenu = document.querySelector('nav ul');
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                menuToggle.querySelector('i').classList.toggle('fa-bars');
                menuToggle.querySelector('i').classList.toggle('fa-times');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for header height
                behavior: 'smooth'
            });
        });
    });
    
    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Basic validation
            if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Normally, you would send this data to a server here
            // For this example, we'll just show a success message
            showAlert('Thank you for your message! I will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Show alert
    function showAlert(message, type) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type === 'error' ? 'alert-error' : 'alert-success'}`;
        alertDiv.textContent = message;
        
        // Append to DOM
        const contactSection = document.getElementById('contact');
        contactSection.insertBefore(alertDiv, contactSection.firstChild);
        
        // Remove after 3 seconds
        setTimeout(function() {
            alertDiv.remove();
        }, 3000);
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                section.classList.add('appear');
            }
        });
    };
    
    // Add CSS for scroll animation
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        section.appear {
            opacity: 1;
            transform: translateY(0);
        }
        
        .alert {
            padding: 12px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
            color: white;
            font-weight: bold;
        }
        
        .alert-error {
            background: var(--danger-color);
        }
        
        .alert-success {
            background: var(--success-color);
        }
        
        .menu-toggle {
            display: none;
            cursor: pointer;
            font-size: 24px;
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initial animation on page load
    setTimeout(animateOnScroll, 300);
    
    // Animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add active class to navigation links
    const highlightNav = function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const id = section.getAttribute('id');
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    // Add CSS for active navigation links
    const activeNavStyle = document.createElement('style');
    activeNavStyle.textContent = `
        nav ul li a.active {
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(activeNavStyle);
    
    // Initial highlight on page load
    highlightNav();
    
    // Highlight nav on scroll
    window.addEventListener('scroll', highlightNav);
    
    // Text animation function for hero section
    function animateHeroText() {
        const heroTitle = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-content .subtitle');
        const heroBtns = document.querySelectorAll('.hero-content .btn');
        
        // Clear any existing content to prepare for animation
        const titleText = heroTitle.innerHTML;
        const subtitleText = heroSubtitle.textContent;
        
        heroTitle.innerHTML = '';
        heroSubtitle.textContent = '';
        
        // Hide buttons initially
        heroBtns.forEach(btn => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
        });
        
        // Add animation styles
        const textAnimStyle = document.createElement('style');
        textAnimStyle.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes typeCharacter {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .char {
                display: inline-block;
                animation: typeCharacter 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
        `;
        document.head.appendChild(textAnimStyle);
        
        // Animate main title with character by character effect
        let delay = 0;
        [...titleText].forEach((char, index) => {
            setTimeout(() => {
                const span = document.createElement('span');
                span.className = 'char';
                span.innerHTML = char === ' ' ? '&nbsp;' : char;
                span.style.animationDelay = `${index * 0.05}s`;
                span.style.opacity = '0';
                heroTitle.appendChild(span);
            }, delay);
            delay += 50;
        });
        
        // Animate subtitle after title animation
        setTimeout(() => {
            heroSubtitle.textContent = subtitleText;
            heroSubtitle.style.animation = 'fadeInUp 0.8s forwards';
            heroSubtitle.style.opacity = '0';
        }, delay + 200);
        
        // Animate buttons after subtitle
        setTimeout(() => {
            heroBtns.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.animation = 'fadeInUp 0.8s forwards';
                }, index * 200);
            });
        }, delay + 600);
    }
    
    // Initialize particles.js with atomic configuration
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS("particles-js", {
                "particles": {
                    "number": {
                        "value": 180,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": ["#00e5ff", "#7b42ff", "#ffffff"]
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#00e5ff",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1.5,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.5
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        } else {
            console.warn("particles.js not loaded");
        }
    }

    // Slide-in animation on scroll for all .slide-in elements
    function handleSlideInOnScroll() {
        const slideEls = document.querySelectorAll('.slide-in');
        const triggerBottom = window.innerHeight * 0.85;
        slideEls.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }
    window.addEventListener('scroll', handleSlideInOnScroll);
    setTimeout(handleSlideInOnScroll, 400);

    // Sidebar Navbar toggle on scroll/section
    function toggleSidebarNavbar() {
        const homeSection = document.getElementById('home');
        const sidebar = document.getElementById('sidebarNavbar');
        const mainNavbar = document.querySelector('.navbar');
        const scrollY = window.scrollY || window.pageYOffset;
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight - 80;
        if (scrollY > homeBottom - 10) {
            sidebar.classList.add('active');
            mainNavbar.classList.add('hide-navbar');
        } else {
            sidebar.classList.remove('active');
            mainNavbar.classList.remove('hide-navbar');
        }
    }
    window.addEventListener('scroll', toggleSidebarNavbar);
    setTimeout(toggleSidebarNavbar, 400);

    // Update active nav link for both navbars
    function updateActiveNavLinks() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        let currentId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavLinks);
    setTimeout(updateActiveNavLinks, 400);
}); 