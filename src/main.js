import Alpine from 'alpinejs'

window.Alpine = Alpine

// ─── Portfolio Filter Component ───────────────────────────────────────────────
Alpine.data('portfolio', () => ({
    activeFilter: 'all',
    filters: [
        { id: 'all', label: 'All Projects' },
        { id: 'mobile', label: 'Mobile Apps' },
        { id: 'web', label: 'Web Apps' },
        { id: 'erp', label: 'ERP / CRM' },
        { id: 'ai', label: 'AI Integration' },
        { id: 'scraping', label: 'Web Scraping' },
        { id: 'automation', label: 'Automation' },
        { id: 'database', label: 'Database' },
    ],
    projects: [
        {
            id: 1,
            title: 'Pilotik ERP',
            desc: 'Full-featured ERP system for field operations, interventions management, and real-time team tracking.',
            category: 'erp',
            tags: ['Django', 'PostgreSQL', 'Supabase', 'REST API'],
            color: '#7c3aed',
            emoji: '⚙️',
        },
        {
            id: 2,
            title: 'FieldReport Mobile',
            desc: 'Cross-platform mobile app for field technicians to submit reports, photos, and digital signatures.',
            category: 'mobile',
            tags: ['React Native', 'Supabase', 'Expo'],
            color: '#3ecf8e',
            emoji: '📱',
        },
        {
            id: 3,
            title: 'AI Analytics Dashboard',
            desc: 'Business intelligence dashboard powered by LLM-driven insights and real-time data visualisation.',
            category: 'ai',
            tags: ['Python', 'OpenAI', 'FastAPI', 'React'],
            color: '#00d4ff',
            emoji: '🧠',
        },
        {
            id: 4,
            title: 'E-Commerce SaaS Platform',
            desc: 'Multi-tenant SaaS e-commerce platform with advanced inventory, analytics, and payment integration.',
            category: 'web',
            tags: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
            color: '#f0abfc',
            emoji: '🛒',
        },
        {
            id: 5,
            title: 'Market Price Scraper',
            desc: 'Automated competitive intelligence scraper monitoring 10k+ product listings daily with alert system.',
            category: 'scraping',
            tags: ['Python', 'Scrapy', 'Playwright', 'Redis'],
            color: '#f59e0b',
            emoji: '🕷️',
        },
        {
            id: 6,
            title: 'DevOps Automation Suite',
            desc: 'CI/CD pipeline orchestration and infrastructure automation for multi-cloud deployments.',
            category: 'automation',
            tags: ['Python', 'GitHub Actions', 'Docker', 'Terraform'],
            color: '#3ecf8e',
            emoji: '🚀',
        },
        {
            id: 7,
            title: 'CRM Intelligence Hub',
            desc: 'Custom CRM with AI-driven lead scoring, automated follow-ups, and predictive sales analytics.',
            category: 'erp',
            tags: ['Vue.js', 'Django', 'ML', 'PostgreSQL'],
            color: '#7c3aed',
            emoji: '🎯',
        },
        {
            id: 8,
            title: 'Healthcare Appointment App',
            desc: 'Patient booking mobile app with doctor scheduling, notifications, and telemedicine integration.',
            category: 'mobile',
            tags: ['Flutter', 'Firebase', 'Stripe'],
            color: '#00d4ff',
            emoji: '🏥',
        },
        {
            id: 9,
            title: 'Multi-Source Data Warehouse',
            desc: 'Scalable PostgreSQL data warehouse ingesting 15+ heterogeneous sources with automated ETL pipelines.',
            category: 'database',
            tags: ['PostgreSQL', 'dbt', 'Airflow', 'Python'],
            color: '#f0abfc',
            emoji: '🗄️',
        },
    ],
    get filtered() {
        if (this.activeFilter === 'all') return this.projects;
        return this.projects.filter(p => p.category === this.activeFilter);
    },
    setFilter(id) {
        this.activeFilter = id;
    }
}))

// ─── Contact Form Component ───────────────────────────────────────────────────
Alpine.data('contactForm', () => ({
    name: '',
    email: '',
    service: '',
    message: '',
    sending: false,
    sent: false,
    error: false,
    errors: {},
    validate() {
        this.errors = {};
        if (!this.name.trim()) this.errors.name = 'Name is required.';
        if (!this.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
            this.errors.email = 'Valid email required.';
        if (!this.service) this.errors.service = 'Please select a service.';
        if (!this.message.trim() || this.message.length < 20)
            this.errors.message = 'Message must be at least 20 characters.';
        return Object.keys(this.errors).length === 0;
    },
    async submit() {
        if (!this.validate()) return;
        this.sending = true;
        this.error = false;
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.name,
                    email: this.email,
                    service: this.service,
                    message: this.message,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Server error');
            this.sent = true;
        } catch (err) {
            this.error = err.message || 'Something went wrong. Please try again.';
        } finally {
            this.sending = false;
        }
    }
}))

// ─── Nav scroll behaviour ─────────────────────────────────────────────────────
Alpine.data('navbar', () => ({
    scrolled: false,
    menuOpen: false,
    init() {
        window.addEventListener('scroll', () => {
            this.scrolled = window.scrollY > 40;
        });
    }
}))

Alpine.start()

// ─── Animated counters ─────────────────────────────────────────────────────────
function animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const update = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(update);
}

// ─── Scroll Reveal + Counter Trigger ──────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Counter
            if (entry.target.dataset.count !== undefined) {
                animateCounter(entry.target, parseInt(entry.target.dataset.count));
            }

            // Progress bars
            entry.target.querySelectorAll && entry.target.querySelectorAll('.progress-fill').forEach(bar => {
                bar.classList.add('animated');
            });
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, [data-count]').forEach(el => observer.observe(el));

// Progress bar observer (run after DOM ready)
window.addEventListener('load', () => {
    document.querySelectorAll('.progress-fill').forEach(bar => {
        observer.observe(bar.closest('.reveal') || bar);
    });

    // Re-observe all counters and reveals for late-rendered elements
    setTimeout(() => {
        document.querySelectorAll('.reveal, [data-count]').forEach(el => observer.observe(el));
    }, 100);
});
