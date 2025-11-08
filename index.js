function initMap(){
    const storeLocation={lat:-21.1770,lng:-47.8103};
    const map=new google.maps.Map(document.getElementById('storeMap'),{zoom:15,center:storeLocation,styles:[{"featureType":"all","elementType":"geometry.fill","stylers":[{"saturation":"-100"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]}]});
    const marker=new google.maps.Marker({position:storeLocation,map:map,title:'AllPaper - Papelaria Fofa',animation:google.maps.Animation.DROP});
    const infoWindow=new google.maps.InfoWindow({content:'<div style="padding:10px;"><strong>AllPaper</strong><br>Rua das Flores, 123<br>Centro - Ribeirão Preto, SP</div>'});
    marker.addListener('click',()=>{infoWindow.open(map,marker)});
}
window.addEventListener('load',initMap);

function openProductPopup(title,description){
    const popup=document.getElementById('productPopup');
    const popupTitle=document.getElementById('popupTitle');
    const popupDescription=document.getElementById('popupDescription');
    popupTitle.textContent=title;popupDescription.textContent=description;popup.style.display='flex';
}

function closeProductPopup(){
    const popup=document.getElementById('productPopup');
    if(popup)popup.style.display='none';
}

function smoothScrollTo(elementId){
    const element=document.getElementById(elementId);if(!element)return;const headerHeight=80;const elementPosition=element.offsetTop-headerHeight;window.scrollTo({top:elementPosition,behavior:'smooth'});
}

function updateActiveNavLink(){
    const sections=document.querySelectorAll('.section, .hero-section');
    const navLinks=document.querySelectorAll('.nav-link');let current='';
    sections.forEach(section=>{const sectionTop=section.offsetTop-100;const sectionHeight=section.offsetHeight;if(window.scrollY>=sectionTop&&window.scrollY<sectionTop+sectionHeight){current=section.getAttribute('id')}});
    navLinks.forEach(link=>{link.classList.remove('active');if(link.getAttribute('data-page')===current)link.classList.add('active')});
}

document.addEventListener('DOMContentLoaded',function(){
    const navLinks=document.querySelectorAll('.nav-link');
    navLinks.forEach(link=>{link.addEventListener('click',function(e){e.preventDefault();const targetId=this.getAttribute('data-page');smoothScrollTo(targetId);const nav=document.querySelector('.nav');if(nav&&nav.classList.contains('open'))nav.classList.remove('open')})});
    const heroButtons=document.querySelectorAll('.hero-buttons a');heroButtons.forEach(button=>{button.addEventListener('click',function(e){e.preventDefault();const targetId=this.getAttribute('href').substring(1);smoothScrollTo(targetId)})});
    const footerLinks=document.querySelectorAll('.footer-section a[href^="#"]');footerLinks.forEach(link=>{link.addEventListener('click',function(e){e.preventDefault();const targetId=this.getAttribute('href').substring(1);smoothScrollTo(targetId)})});
    window.addEventListener('scroll',function(){updateActiveNavLink();const header=document.querySelector('.header');if(window.scrollY>100){header.classList.add('scrolled')}else{header.classList.remove('scrolled')}});
    const productCards=document.querySelectorAll('.product-card');productCards.forEach(card=>{card.addEventListener('mouseenter',function(){this.style.transform='translateY(-8px)'});card.addEventListener('mouseleave',function(){this.style.transform='translateY(0)'})});
    const helpButton=document.querySelector('.help-button');if(helpButton){helpButton.addEventListener('click',function(){alert('Olá! Como podemos ajudar? Entre em contato pelo WhatsApp ou telefone')})}
    const stars=document.querySelectorAll('.fas.fa-star');stars.forEach(star=>{star.addEventListener('mouseenter',function(){this.style.transform='scale(1.15) rotate(8deg)';this.style.transition='transform .25s'});star.addEventListener('mouseleave',function(){this.style.transform='scale(1) rotate(0deg)'})});
    const observerOptions={threshold:.1,rootMargin:'0px 0px -50px 0px'};const observer=new IntersectionObserver(function(entries){entries.forEach(entry=>{if(entry.isIntersecting){entry.target.style.opacity='1';entry.target.style.transform='translateY(0)'}})},observerOptions);const animatedElements=document.querySelectorAll('.value-card, .product-card, .category-card, .contact-card');animatedElements.forEach(element=>{element.style.opacity='0';element.style.transform='translateY(20px)';element.style.transition='opacity .45s ease, transform .45s ease';observer.observe(element)});
    updateActiveNavLink();
    const hearts=document.querySelectorAll('.product-heart');hearts.forEach(heart=>{heart.addEventListener('click',function(e){e.stopPropagation();const i=this.querySelector('i');if(i.classList.contains('far')){i.classList.remove('far');i.classList.add('fas');i.style.color='#ff69b4'}else{i.classList.remove('fas');i.classList.add('far');i.style.color='#ccc'}})});
    const menuToggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');if(menuToggle&&nav){menuToggle.addEventListener('click',function(){nav.classList.toggle('open');menuToggle.classList.toggle('open')});window.addEventListener('resize',function(){if(window.innerWidth>768){nav.classList.remove('open');menuToggle.classList.remove('open')}})}
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeProductPopup();const navOpen=document.querySelector('.nav.open');if(navOpen)navOpen.classList.remove('open')}});
    document.addEventListener('click',function(e){const popup=document.getElementById('productPopup');if(popup&&e.target===popup)closeProductPopup()});
});

function toggleContactInfo(){const contactInfo=document.querySelector('.contact-info');if(contactInfo){contactInfo.style.display=contactInfo.style.display==='none'?'flex':'none'}}

function validateContactForm(){const form=document.querySelector('form');if(form){form.addEventListener('submit',function(e){e.preventDefault();const name=form.querySelector('input[name="name"]');const email=form.querySelector('input[name="email"]');const message=form.querySelector('textarea[name="message"]');if(!name.value||!email.value||!message.value){alert('Por favor, preencha todos os campos obrigatórios.');return}const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;if(!emailRegex.test(email.value)){alert('Por favor, insira um e-mail válido.');return}alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');form.reset()})}}

document.addEventListener('DOMContentLoaded',function(){validateContactForm();if(localStorage.getItem('theme')==='dark')document.body.classList.add('dark-theme')});

window.addEventListener('load',function(){document.body.classList.add('loaded')});

function toggleTheme(){document.body.classList.toggle('dark-theme');localStorage.setItem('theme',document.body.classList.contains('dark-theme')?'dark':'light')}

