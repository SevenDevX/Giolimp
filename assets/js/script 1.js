function redirectToWhatsApp() {
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const servico = document.getElementById('servico').value;
  const ambiente = document.getElementById('ambiente').value;

  if (![nome, telefone, bairro, servico, ambiente].every(Boolean)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return false;
  }

  const mensagem = `Olá! Me chamo ${nome}, telefone: ${telefone}.
Gostaria de solicitar um orçamento para o serviço de: ${servico}, em um(a) ${ambiente}, localizado em ${bairro}.`;

  const url = `https://wa.me/5531991077234?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
  return false;
}

// Fade-in com IntersectionObserver
document.querySelectorAll('.fade-in').forEach(el => {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }).observe(el);
});

// Menu mobile toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
  });

  // Fecha o menu ao clicar em um link dentro do menu
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header.classList.toggle('scrolled', window.scrollY > 10);
});