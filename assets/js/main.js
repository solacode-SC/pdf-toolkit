// ========== HEADER SCROLL EFFECT ==========
        function initHeaderScroll() {
            const header = document.getElementById('header');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // ========== SMOOTH SCROLLING ==========
        function initSmoothScrolling() {
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
        }

        // ========== SCROLL ANIMATIONS ==========
        function initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Observe all elements with animate-on-scroll class
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }

        // ========== TOOL CARD INTERACTIONS ==========
        function initToolCardInteractions() {
            const toolCards = document.querySelectorAll('.tool-card-main');
            
            toolCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    // Add subtle sound effect or additional animations here
                    this.style.transform = 'translateY(-10px) rotateY(5deg) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
                
                // Click handler for future navigation
                card.addEventListener('click', function() {
                    // Future: Navigate to tool detail page
                    console.log('Navigate to tool:', this.querySelector('.tool-name').textContent);
                });
            });
        }

        // ========== FLOATING CARDS MANAGEMENT ==========
        function initFloatingCards() {
            const floatingCards = document.querySelectorAll('.tool-card');
            
            // Add random delays and speeds for more natural movement
            floatingCards.forEach((card, index) => {
                const randomDelay = Math.random() * 20;
                const randomDuration = 15 + Math.random() * 10;
                
                card.style.animationDelay = `-${randomDelay}s`;
                card.style.animationDuration = `${randomDuration}s`;
            });
        }

        // ========== PERFORMANCE OPTIMIZATIONS ==========
        function initPerformanceOptimizations() {
            // Reduce animations on low-performance devices
            if (navigator.hardwareConcurrency < 4) {
                document.body.classList.add('low-performance');
            }
            
            // Pause animations when page is not visible
            document.addEventListener('visibilitychange', function() {
                const cards = document.querySelectorAll('.tool-card');
                if (document.hidden) {
                    cards.forEach(card => {
                        card.style.animationPlayState = 'paused';
                    });
                } else {
                    cards.forEach(card => {
                        card.style.animationPlayState = 'running';
                    });
                }
            });
        }

        // ========== INITIALIZATION ==========
        document.addEventListener('DOMContentLoaded', function() {
            initHeaderScroll();
            initSmoothScrolling();
            initScrollAnimations();
            initToolCardInteractions();
            initFloatingCards();
            initPerformanceOptimizations();
            
            console.log('🚀 SoladeepTools website initialized successfully!');
        });

        // ========== UTILITY FUNCTIONS ==========
        // Function to add new tools dynamically (for future use)
        function addNewTool(toolData) {
            const toolsGrid = document.querySelector('.tools-grid');
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card-main animate-on-scroll';
            toolCard.innerHTML = `
                <div class="tool-icon">${toolData.icon}</div>
                <h3 class="tool-name">${toolData.name}</h3>
                <p class="tool-description">${toolData.description}</p>
                <div class="tool-stats">
                    <div class="stat"><span>⭐</span><span>${toolData.rating}</span></div>
                    <div class="stat"><span>👥</span><span>${toolData.users}</span></div>
                    <div class="stat"><span>${toolData.badgeIcon}</span><span>${toolData.badge}</span></div>
                </div>
            `;
            toolsGrid.appendChild(toolCard);
            
            // Re-initialize interactions for new card
            initToolCardInteractions();
        }

        // Function to update theme colors (for future customization)
        function updateTheme(colorScheme) {
            const root = document.documentElement;
            Object.keys(colorScheme).forEach(property => {
                root.style.setProperty(`--${property}`, colorScheme[property]);
            });
        }