// O evento DOMContentLoaded garante que o script só rode após todo o HTML ser lido. Previne erros de 'null'.
document.addEventListener('DOMContentLoaded', () => {

    // Instanciação segura de elementos do DOM
    const heroBg = document.querySelector('.hero-bg');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    // === FUNCTION 1: MODOS DE TEMA (DARK/LIGHT) ===
    if (themeToggleBtn && themeIcon) {
        const savedTheme = localStorage.getItem('theme');

        // Inicializa o tema baseado na última visita
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // === FUNCTION 2: PARALLAX E ESTILIZAÇÃO DO MENU NO SCROLL ===
    window.addEventListener('scroll', () => {
        let scrollValue = window.scrollY;
        
        // Movimento Parallax controlado
        if (heroBg && scrollValue <= window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollValue * 0.3}px)`;
        }
        
        // Compactação visual do menu ao descer a página
        const headerElement = document.querySelector('header');
        if (headerElement) {
            if (scrollValue > 50) {
                headerElement.classList.add('scrolled');
            } else {
                headerElement.classList.remove('scrolled');
            }
        }
    });

    // === FUNCTION 3: ACESSIBILIDADE DE FONTES (A+ / A-) ===
    let currentFontSize = 100;
    const fontMin = 75;
    const fontMax = 135;
    const fontStep = 10;

    const btnIncrease = document.getElementById('btn-increase');
    const btnDecrease = document.getElementById('btn-decrease');

    if (btnIncrease && btnDecrease) {
        btnIncrease.addEventListener('click', () => {
            if (currentFontSize < fontMax) {
                currentFontSize += fontStep;
                document.documentElement.style.fontSize = `${currentFontSize}%`;
            }
        });

        btnDecrease.addEventListener('click', () => {
            if (currentFontSize > fontMin) {
                currentFontSize -= fontStep;
                document.documentElement.style.fontSize = `${currentFontSize}%`;
            }
        });
    }

    // === FUNCTION 4: MENU RESPONSIVO MOBILE ===
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Autofechar o menu ao selecionar um item
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // === FUNCTION 5: NAVEGAÇÃO COM ROLAGEM SUAVE ===
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

    // === FUNCTION 6: ANIMAÇÃO SEQUENCIAL DOS CARDS ===
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });

});
