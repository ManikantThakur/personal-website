// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about, .resume, .contact');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add smooth fade-in effects to hero elements
window.addEventListener('load', () => {
    const heroElements = [
        { selector: '.hero-title', delay: 200 },
        { selector: '.hero-subtitle', delay: 400 },
        { selector: '.hero-description', delay: 600 },
        { selector: '.hero-buttons', delay: 800 },
        { selector: '.hero-image', delay: 1000 }
    ];
    
    heroElements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
    });
});

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add enhanced hover effects and interactions
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
            item.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add loading animation and page transitions
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add stagger effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 200));
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Calendar Booking System
class CalendarBooking {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.selectedTime = null;
        this.availableSlots = this.generateAvailableSlots();
        this.init();
    }

    init() {
        this.renderCalendar();
        this.bindEvents();
    }

    generateAvailableSlots() {
        // Generate available time slots for the next 30 days
        const slots = {};
        const today = new Date();
        
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Skip weekends for now (you can modify this)
            if (date.getDay() === 0 || date.getDay() === 6) continue;
            
            const dateStr = this.formatDate(date);
            slots[dateStr] = this.generateTimeSlots(date);
        }
        
        return slots;
    }

    generateTimeSlots(date) {
        const slots = [];
        const hour = date.getHours();
        
        // Generate slots from 9 AM to 5 PM
        for (let h = 9; h <= 17; h++) {
            if (h === 12) continue; // Skip lunch hour
            
            // Add 30-minute and 60-minute slots
            slots.push({
                time: `${h.toString().padStart(2, '0')}:00`,
                available: Math.random() > 0.3, // 70% availability
                duration: 30
            });
            
            if (h < 17) {
                slots.push({
                    time: `${h.toString().padStart(2, '0')}:30`,
                    available: Math.random() > 0.3,
                    duration: 30
                });
            }
        }
        
        return slots;
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    renderCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        const currentMonth = document.getElementById('currentMonth');
        
        if (!calendarGrid || !currentMonth) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        currentMonth.textContent = this.currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });

        // Clear previous calendar
        calendarGrid.innerHTML = '';

        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            emptyDay.textContent = '';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const currentDate = new Date(year, month, day);
            const dateStr = this.formatDate(currentDate);
            const isToday = this.isToday(currentDate);
            const isAvailable = this.availableSlots[dateStr] && 
                               this.availableSlots[dateStr].some(slot => slot.available);
            
            if (isToday) {
                dayElement.classList.add('today');
            }
            
            if (isAvailable) {
                dayElement.classList.add('available');
                dayElement.addEventListener('click', () => this.selectDate(currentDate));
            } else {
                dayElement.classList.add('unavailable');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    selectDate(date) {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });

        // Add selection to clicked day
        event.target.classList.add('selected');
        
        this.selectedDate = date;
        this.showTimeSlots(date);
    }

    showTimeSlots(date) {
        const timeSlotsContainer = document.getElementById('timeSlots');
        const slotsGrid = document.getElementById('slotsGrid');
        
        if (!timeSlotsContainer || !slotsGrid) return;

        const dateStr = this.formatDate(date);
        const slots = this.availableSlots[dateStr] || [];
        
        // Clear previous slots
        slotsGrid.innerHTML = '';
        
        // Add available slots
        slots.forEach(slot => {
            if (slot.available) {
                const slotElement = document.createElement('div');
                slotElement.className = 'time-slot';
                slotElement.textContent = slot.time;
                slotElement.addEventListener('click', () => this.selectTime(slot));
                slotsGrid.appendChild(slotElement);
            }
        });
        
        timeSlotsContainer.style.display = 'block';
    }

    selectTime(slot) {
        // Remove previous selection
        document.querySelectorAll('.time-slot.selected').forEach(timeSlot => {
            timeSlot.classList.remove('selected');
        });

        // Add selection to clicked slot
        event.target.classList.add('selected');
        
        this.selectedTime = slot;
        this.showBookingModal();
    }

    showBookingModal() {
        const modal = document.getElementById('bookingModal');
        const summaryDate = document.getElementById('summaryDate');
        const summaryTime = document.getElementById('summaryTime');
        const summaryDuration = document.getElementById('summaryDuration');
        
        if (!modal || !summaryDate || !summaryTime || !summaryDuration) return;

        // Update summary
        summaryDate.textContent = this.selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        summaryTime.textContent = this.selectedTime.time;
        summaryDuration.textContent = `${this.selectedTime.duration} minutes`;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hideBookingModal() {
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    bindEvents() {
        // Previous month button
        const prevBtn = document.getElementById('prevMonth');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar();
            });
        }

        // Next month button
        const nextBtn = document.getElementById('nextMonth');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar();
            });
        }

        // Close modal button
        const closeBtn = document.getElementById('closeModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideBookingModal());
        }

        // Cancel booking button
        const cancelBtn = document.getElementById('cancelBooking');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.hideBookingModal());
        }

        // Close modal when clicking outside
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideBookingModal();
                }
            });
        }

        // Booking form submission
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => this.handleBookingSubmission(e));
        }
    }

    async handleBookingSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const bookingData = {
            clientName: formData.get('clientName'),
            clientEmail: formData.get('clientEmail'),
            clientPhone: formData.get('clientPhone'),
            sessionType: formData.get('sessionType'),
            sessionDuration: formData.get('sessionDuration'),
            meetingType: formData.get('meetingType'),
            projectDescription: formData.get('projectDescription'),
            additionalNotes: formData.get('additionalNotes'),
            selectedDate: this.selectedDate.toISOString(),
            selectedTime: this.selectedTime.time,
            bookingId: this.generateBookingId()
        };

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Booking...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.submitBooking(bookingData);
            
            // Show success message
            alert('Booking confirmed! You will receive a confirmation email shortly.');
            
            // Reset form and close modal
            e.target.reset();
            this.hideBookingModal();
            this.resetSelection();
            
        } catch (error) {
            alert('Sorry, there was an error processing your booking. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async submitBooking(bookingData) {
        try {
            // Format the booking data for Formspree
            const formData = new FormData();
            
            // Add all booking fields
            formData.append('name', bookingData.clientName);
            formData.append('email', bookingData.clientEmail);
            formData.append('phone', bookingData.clientPhone || 'Not provided');
            formData.append('session_type', this.getSessionTypeName(bookingData.sessionType));
            formData.append('session_duration', `${bookingData.sessionDuration} minutes`);
            formData.append('meeting_type', this.getMeetingTypeName(bookingData.meetingType));
            formData.append('project_description', bookingData.projectDescription || 'Not provided');
            formData.append('additional_notes', bookingData.additionalNotes || 'Not provided');
            formData.append('booking_date', new Date(bookingData.selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }));
            formData.append('booking_time', bookingData.selectedTime);
            formData.append('booking_id', bookingData.bookingId);
            formData.append('_subject', `New Booking: ${bookingData.bookingId} - ${bookingData.clientName}`);
            formData.append('_replyto', bookingData.clientEmail);
            
            // Formspree endpoint for booking submissions
            const response = await fetch('https://formspree.io/f/mgvndopo', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit booking');
            }
            
            return { success: true, message: 'Booking submitted successfully!' };
        } catch (error) {
            console.error('Booking submission error:', error);
            throw error;
        }
    }

    getSessionTypeName(type) {
        const types = {
            'cloud-architecture': 'Cloud Architecture Review',
            'ai-strategy': 'AI/GenAI Strategy',
            'devops-cicd': 'DevOps & CI/CD',
            'general': 'General Consultation'
        };
        return types[type] || type;
    }

    getMeetingTypeName(type) {
        const types = {
            'video': 'Video Call (Google Meet/Zoom)',
            'phone': 'Phone Call',
            'in-person': 'In-Person Meeting'
        };
        return types[type] || type;
    }

    generateBookingId() {
        return 'BK' + Date.now().toString(36).toUpperCase();
    }

    resetSelection() {
        this.selectedDate = null;
        this.selectedTime = null;
        
        // Clear visual selections
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        document.querySelectorAll('.time-slot.selected').forEach(slot => {
            slot.classList.remove('selected');
        });
        
        // Hide time slots
        const timeSlotsContainer = document.getElementById('timeSlots');
        if (timeSlotsContainer) {
            timeSlotsContainer.style.display = 'none';
        }
    }
}

// Initialize calendar booking when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalendarBooking();
});