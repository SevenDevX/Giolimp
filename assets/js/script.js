const telefoneInput = document.getElementById('telefone');
let isDeleting = false;

// Detecta se o usuário está apagando
telefoneInput.addEventListener('keydown', function(e) {
  isDeleting = e.key === 'Backspace' || e.key === 'Delete';
});

telefoneInput.addEventListener('input', function(e) {
  let val = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
  if (val.length > 11) val = val.slice(0, 11); // Limita a 11 dígitos
  
  // Se estiver apagando, não aplica a máscara
  if (isDeleting) {
    e.target.value = val;
    return;
  }
  
  // Aplica a máscara de telefone
  const pattern = val.length > 10 ?
    `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}` :
    `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
  
  e.target.value = pattern.trim();
});

// ---

// ✅ Função de Validação do Formulário
function validateForm(nome, telefone, bairro, servico, ambiente) {
  let isValid = true;

  const formAlert = document.getElementById('form-alert');
  const formSuccess = document.getElementById('form-success');

  // Oculta os alertas ao validar novamente
  formAlert.style.display = 'none';
  formSuccess.style.display = 'none';


  // Função auxiliar que marca/desmarca campo + mensagem de erro
    const markField = (fieldId, condition) => {
    const field = document.getElementById(fieldId);
    const errorMessage = field.nextElementSibling; // Assume que a mensagem está logo após o campo

    if (!condition) {
      field.classList.add('is-invalid');
      if (errorMessage && errorMessage.classList.contains('form-error')) {
        errorMessage.style.display = 'block';
      }
      isValid = false;
    } else {
      field.classList.remove('is-invalid');
      if (errorMessage && errorMessage.classList.contains('form-error')) {
        errorMessage.style.display = 'none';
      }
    }
  };

  markField('nome', nome.length > 0);
  markField('telefone', telefone.replace(/\D/g, '').length >= 10);
  markField('bairro', bairro.length > 0);
  markField('servico', servico.length > 0);
  markField('ambiente', ambiente.length > 0);

  if (!isValid) {
    formAlert.style.display = 'block'; // Mostra a caixa de aviso estilizada
  }

  return isValid;
}


// ---

// ✅ Função Principal: Redirecionar para o WhatsApp
function redirectToWhatsApp() {
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const servico = document.getElementById('servico').value;
  const ambiente = document.getElementById('ambiente').value;

  const isValid = validateForm(nome, telefone, bairro, servico, ambiente);

  if (!isValid) return false; // bloqueia envio

  // Se passou, mostra feedback de sucesso
  document.getElementById('form-success').style.display = 'block';


  // Opcional: enviar para o WhatsApp
  const mensagem = `Olá, meu nome é ${nome}. Gostaria de solicitar um orçamento para o serviço de ${servico}, em um(a) ${ambiente}, localizado em ${bairro}. Meu telefone é ${telefone}.`;
  const url = `https://wa.me/5531991077234?text=${encodeURIComponent(mensagem)}`;

  // Redireciona após pequeno atraso
  setTimeout(() => {
    window.open(url, '_blank');
  }, 800);

  return false; // previne o submit padrão
}

// ---

// Fade-in com IntersectionObserver
document.querySelectorAll('.fade-in').forEach(el => {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // Adiciona classe 'show' para ativar a animação
        obs.unobserve(entry.target); // Deixa de observar após a animação
      }
    });
  }, { threshold: 0.1 }).observe(el); // Observa quando 10% do elemento está visível
});

// ---

// Menu mobile toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) { // Garante que os elementos existem antes de adicionar event listeners
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active'); // Alterna a classe 'active' para mostrar/esconder o menu
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded)); // Atualiza atributo de acessibilidade
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
      nav.classList.contains('active') && // Se o menu estiver aberto
      !nav.contains(e.target) &&         // E o clique não foi dentro do menu
      !toggle.contains(e.target)         // E o clique não foi no botão de toggle
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