// Main JavaScript functionality for the Jekyll site

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced animations and interactions
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
        });
    });

    // Enhanced fade-in animation for elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.info-item, .cta-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add mouse parallax effect to geometric shapes
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        document.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;
            
            heroSection.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroSection.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Alt + H for Home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = '/';
        }
        // Alt + A for About
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            window.location.href = '/about/';
        }
        // Alt + R for Resume
        if (e.altKey && e.key === 'r') {
            e.preventDefault();
            window.location.href = '/resume/';
        }
    });

    // Add print functionality for resume page
    const printButton = document.querySelector('.print-resume');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }

    // Add copy-to-clipboard functionality for email addresses
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Extract email from href
            const email = this.href.replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                e.preventDefault();
                navigator.clipboard.writeText(email).then(() => {
                    // Show feedback
                    const originalText = this.textContent;
                    this.textContent = 'Email copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }).catch(() => {
                    // Fallback to default behavior
                    window.location.href = this.href;
                });
            }
        });
    });

    // Add responsive navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Add scroll-to-top functionality
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.className = 'scroll-top';
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollTopButton);
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.opacity = '1';
        } else {
            scrollTopButton.style.opacity = '0';
        }
    });
    
    // Scroll to top when clicked
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add dark mode support (if needed in future)
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
    }

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #2563eb';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    console.log('Jekyll site JavaScript loaded successfully!');

    // Render contact info as multi-segment canvas images to reduce scraping
    (function renderContactImages() {
        const nodes = document.querySelectorAll('.contact-image[data-encoded]');
        if (!nodes.length) return;

        // Base64 decode utility
        function b64Decode(str) {
            try {
                // atob handles base64; decodeURIComponent handles potential UTF-8
                return decodeURIComponent(escape(window.atob(str)));
            } catch (e) {
                // Fallback: return raw if decode fails
                return str;
            }
        }

        nodes.forEach(node => {
            const encoded = (node.getAttribute('data-encoded') || '').split('|').filter(Boolean);
            const sep = node.getAttribute('data-sep') || '';
            const segments = encoded.map(b64Decode);

            // Create canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Styling parameters
            const dpr = Math.max(window.devicePixelRatio || 1, 1);
            const fontSize = 16; // CSS px
            const fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
            const letterSpacing = 0; // canvas doesn't support letterSpacing; we simulate with x offsets
            const segmentGap = ctx.measureText ? 8 : 8; // px gap between segments

            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.textBaseline = 'top';

            // Measure total width and height
            let totalWidth = 0;
            const heights = [];
            const widths = [];
            segments.forEach((seg, i) => {
                const metrics = ctx.measureText(seg);
                const w = metrics.width;
                widths.push(w);
                heights.push(fontSize);
                totalWidth += w;
                if (i < segments.length - 1) totalWidth += segmentGap + (sep ? ctx.measureText(sep).width : 0);
            });
            const totalHeight = Math.max(...heights, fontSize);

            // Size canvas with DPR scaling
            canvas.width = Math.ceil(totalWidth * dpr);
            canvas.height = Math.ceil(totalHeight * dpr);
            canvas.style.width = `${Math.ceil(totalWidth)}px`;
            canvas.style.height = `${Math.ceil(totalHeight)}px`;

            // Scale for DPR
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Background for better OCR resistance (subtle noise)
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, totalWidth, totalHeight);
            // Add subtle noise dots
            ctx.fillStyle = 'rgba(0,0,0,0.04)';
            for (let i = 0; i < Math.floor(totalWidth * 0.2); i++) {
                const nx = Math.random() * totalWidth;
                const ny = Math.random() * totalHeight;
                ctx.fillRect(nx, ny, 0.5, 0.5);
            }

            // Draw segments with slight per-segment jitter to break linearity
            ctx.fillStyle = '#111827';
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.textBaseline = 'top';
            let x = 0;
            segments.forEach((seg, i) => {
                const jitterY = (Math.random() - 0.5) * 0.6; // ±0.3px
                ctx.fillText(seg, Math.round(x), Math.round(jitterY));
                x += widths[i];
                if (i < segments.length - 1) {
                    if (sep) {
                        ctx.fillText(sep, Math.round(x), Math.round((Math.random() - 0.5) * 0.6));
                        x += ctx.measureText(sep).width;
                    }
                    x += segmentGap;
                }
            });

            // Replace node contents with canvas
            node.innerHTML = '';
            node.appendChild(canvas);
            // Prevent text selection/copy
            node.setAttribute('aria-label', node.getAttribute('data-type') === 'email' ? 'Email image' : 'Phone image');
            node.setAttribute('role', 'img');
        });
    })();

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        // Only register on secure origins or localhost
        const isLocalhost = ['localhost', '127.0.0.1'].includes(location.hostname);
        const isSecure = location.protocol === 'https:';
        if (isSecure || isLocalhost) {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => {
                    console.log('Service Worker registered:', reg.scope);
                })
                .catch(err => {
                    console.warn('Service Worker registration failed:', err);
                });
        }
    }
});