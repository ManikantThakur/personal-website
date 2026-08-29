(function () {
    'use strict';

    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgvndopo';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /* ===============================================================
       Theme toggle
       =============================================================== */
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const syncPressed = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            themeToggle.setAttribute('aria-pressed', String(isDark));
        };
        syncPressed();
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const next = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            try {
                localStorage.setItem('theme', next);
            } catch (e) {
                /* storage unavailable (private mode) - ignore */
            }
            syncPressed();
        });
    }

    /* ===============================================================
       Mobile navigation
       =============================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        const setMenu = (open) => {
            hamburger.classList.toggle('active', open);
            navMenu.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', String(open));
        };
        hamburger.addEventListener('click', () => {
            setMenu(!navMenu.classList.contains('active'));
        });
        navMenu.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => setMenu(false));
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                setMenu(false);
                hamburger.focus();
            }
        });
    }

    /* ===============================================================
       Scroll-driven UI: navbar style, active link, scroll-to-top
       (one passive, rAF-throttled listener)
       =============================================================== */
    const navbar = document.querySelector('.navbar');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));

    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.type = 'button';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    document.body.appendChild(scrollToTopBtn);

    let scrollQueued = false;
    const handleScroll = () => {
        scrollQueued = false;
        const y = window.scrollY;

        if (navbar) navbar.classList.toggle('scrolled', y > 50);
        scrollToTopBtn.classList.toggle('visible', y > 300);

        let currentId = '';
        for (const section of sections) {
            if (y >= section.offsetTop - 200) currentId = section.id;
        }
        for (const link of navLinks) {
            const isCurrent = link.getAttribute('href') === `#${currentId}`;
            link.classList.toggle('active', isCurrent);
            if (isCurrent) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        }
    };
    window.addEventListener(
        'scroll',
        () => {
            if (!scrollQueued) {
                scrollQueued = true;
                window.requestAnimationFrame(handleScroll);
            }
        },
        { passive: true }
    );
    handleScroll();

    /* ===============================================================
       Reveal-on-scroll for major sections
       =============================================================== */
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const revealEls = document.querySelectorAll('.about, .resume, .contact');
        const io = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        revealEls.forEach((el) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            io.observe(el);
        });
    }

    /* ===============================================================
       Entrance stagger (hero + timeline)
       =============================================================== */
    window.addEventListener('load', () => {
        if (reduceMotion) return;
        const stagger = (selector, baseDelay, step) => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                setTimeout(
                    () => {
                        el.style.opacity = '1';
                        el.style.transform = 'none';
                    },
                    baseDelay + i * step
                );
            });
        };
        stagger('.hero-title, .hero-subtitle, .hero-description, .hero-buttons', 150, 120);
        stagger('.timeline-item', 200, 100);
    });

    /* ===============================================================
       Ripple effect on buttons
       =============================================================== */
    const addRipple = (el, event) => {
        if (reduceMotion) return;
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };
    document.querySelectorAll('.btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (typeof e.clientX === 'number' && e.clientX !== 0) addRipple(btn, e);
        });
    });

    /* ===============================================================
       Formspree-backed forms (contact + booking request)
       =============================================================== */
    function wireForm(formId, statusId, options) {
        const form = document.getElementById(formId);
        const statusEl = document.getElementById(statusId);
        if (!form) return;

        const setStatus = (msg, kind) => {
            if (!statusEl) return;
            statusEl.textContent = msg;
            statusEl.className = kind ? `form-status ${kind}` : 'form-status';
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);

            // Honeypot: a filled _gotcha means a bot. Pretend success, send nothing.
            if ((data.get('_gotcha') || '').toString().trim() !== '') {
                setStatus(options.successMsg, 'success');
                form.reset();
                return;
            }

            const required = options.required || [];
            for (const field of required) {
                if (!(data.get(field) || '').toString().trim()) {
                    setStatus('Please fill in all required fields.', 'error');
                    return;
                }
            }
            const email = (data.get('email') || '').toString().trim();
            if (email && !EMAIL_RE.test(email)) {
                setStatus('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) {
                submitBtn.textContent = 'Sending…';
                submitBtn.disabled = true;
            }
            setStatus('', '');

            try {
                if (options.subject) data.append('_subject', options.subject(data));
                const res = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    body: data,
                    headers: { Accept: 'application/json' }
                });
                if (!res.ok) throw new Error(`Formspree responded with ${res.status}`);
                setStatus(options.successMsg, 'success');
                form.reset();
            } catch (err) {
                console.error(`${formId} submission failed:`, err);
                setStatus(
                    'Sorry, something went wrong. Please email me directly instead.',
                    'error'
                );
            } finally {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    }

    wireForm('contactForm', 'contactStatus', {
        required: ['name', 'email', 'subject', 'message'],
        subject: (d) => `New contact message: ${d.get('subject')}`,
        successMsg: "Thanks! Your message has been sent — I'll get back to you soon."
    });

    wireForm('bookingForm', 'bookingStatus', {
        required: ['name', 'email', 'session_type', 'duration', 'meeting_type'],
        subject: (d) => `New session request — ${d.get('name') || 'unknown'}`,
        successMsg:
            "Request sent. I'll confirm a slot with you by email, in your timezone, within one business day."
    });

    /* ===============================================================
       Preferred-date input: don't allow past dates
       =============================================================== */
    const preferredDate = document.getElementById('preferredDate');
    if (preferredDate) {
        const now = new Date();
        const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        preferredDate.min = local.toISOString().slice(0, 10);
    }
})();
