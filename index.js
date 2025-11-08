// JavaScript para navegação fluida do site AllPaper

// Inicialização do Google Maps
function initMap() {
    // Coordenadas da loja (Ribeirão Preto)
    // Coordenadas aproximadas do centro de Ribeirão Preto
    const storeLocation = {
        lat: -21.1770,
        lng: -47.8103
    };

    // Criando o mapa
    const map = new google.maps.Map(document.getElementById('storeMap'), {
        zoom: 15,
        center: storeLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{"saturation": "-100"}]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{"visibility": "off"}]
            }
        ]
    });

    // Adicionando o marcador da loja
    const marker = new google.maps.Marker({
        position: storeLocation,
        map: map,
        title: 'AllPaper - Papelaria Fofa',
        animation: google.maps.Animation.DROP
    });

    // Adicionando uma janela de informação
    const infoWindow = new google.maps.InfoWindow({
        content: '<div style="padding: 10px;"><strong>AllPaper</strong><br>Rua das Flores, 123<br>Centro - Ribeirão Preto, SP</div>'
    });

    // Abrindo a janela de informação ao clicar no marcador
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Carregar o mapa quando a página estiver pronta
window.addEventListener('load', initMap);

// Funções para o popup de produtos
function openProductPopup(title, description) {
    const popup = document.getElementById('productPopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    
    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popup.style.display = 'block';
    
    // Fechar popup ao clicar fora dele
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closeProductPopup();
        }
    });
}

function closeProductPopup() {
    const popup = document.getElementById('productPopup');
    popup.style.display = 'none';
}

// Função para scroll suave para seções
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Função para destacar link ativo na navegação
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === current) {
            link.classList.add('active');
        }
    });
}

// Event listeners principais
document.addEventListener('DOMContentLoaded', function() {
    // Navegação por links da navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-page');
            smoothScrollTo(targetId);
        });
    });
    
    // Botões de ação do hero
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
        });
    });
    
    // Links do footer
    const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
        });
    });
    
    // Atualizar navegação ativa durante o scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        
        // Efeito no header
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Efeitos de hover nos cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efeitos de hover nos cards de valores
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efeitos de hover nos cards de categoria
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Funcionalidade do botão de ajuda
    const helpButton = document.querySelector('.help-button');
    if (helpButton) {
        helpButton.addEventListener('click', function() {
            alert('Olá! Como posso ajudá-lo? Entre em contato conosco através do telefone (11) 99999-9999 ou pelo WhatsApp!');
        });
    }
    
    // Animação das estrelas
    const stars = document.querySelectorAll('.fas.fa-star');
    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        star.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Efeito parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
    
    // Animação de entrada dos elementos
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
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.value-card, .product-card, .category-card, .contact-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Inicializar navegação ativa
    updateActiveNavLink();
});

// Função para alternar coração nos produtos
function toggleHeart(element) {
    const heart = element.querySelector('i');
    if (heart.classList.contains('far')) {
        heart.classList.remove('far');
        heart.classList.add('fas');
        heart.style.color = '#ff69b4';
    } else {
        heart.classList.remove('fas');
        heart.classList.add('far');
        heart.style.color = '#ccc';
    }
}

// Adicionar event listeners para os corações
document.addEventListener('DOMContentLoaded', function() {
    const hearts = document.querySelectorAll('.product-heart');
    hearts.forEach(heart => {
        heart.addEventListener('click', function() {
            toggleHeart(this);
        });
    });
});

// Função para mostrar/ocultar informações de contato
function toggleContactInfo() {
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.style.display = contactInfo.style.display === 'none' ? 'flex' : 'none';
    }
}

// Função para validar formulário de contato (se houver)
function validateContactForm() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = form.querySelector('input[name="name"]');
            const email = form.querySelector('input[name="email"]');
            const message = form.querySelector('textarea[name="message"]');
            
            if (!name.value || !email.value || !message.value) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!isValidEmail(email.value)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
        });
    }
}

// Função para validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Inicializar validação do formulário
document.addEventListener('DOMContentLoaded', function() {
    validateContactForm();
});

// Adicionar efeito de loading
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Função para alternar tema (se necessário no futuro)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Carregar tema salvo
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
