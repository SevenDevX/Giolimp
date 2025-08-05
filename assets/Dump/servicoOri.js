// Cria a lightbox apenas uma vez
let lightbox, lightImg, prevBtn, nextBtn, closeBtn, images, currentIndex = 0;

function createLightbox() {
  lightbox = document.createElement("div");
  lightbox.className = "lightbox";

  lightImg = document.createElement("img");
  prevBtn = document.createElement("button");
  nextBtn = document.createElement("button");
  closeBtn = document.createElement("button");

  prevBtn.innerHTML = "❮";
  nextBtn.innerHTML = "❯";
  closeBtn.innerHTML = "✖";

  prevBtn.className = "nav-btn prev";
  nextBtn.className = "nav-btn next";
  closeBtn.className = "close-btn";

  lightbox.append(lightImg, prevBtn, nextBtn, closeBtn);
  document.body.appendChild(lightbox);

  prevBtn.addEventListener("click", e => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });
  nextBtn.addEventListener("click", e => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });
  closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    lightbox.classList.remove("active");
  });
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

function showImage(index) {
  if (!images.length) return;
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  lightImg.src = images[index].src;
  currentIndex = index;
}

function initLightbox() {
  images = Array.from(document.querySelectorAll(".grid-fotos img"));
  images.forEach((img, idx) => {
    img.onclick = () => {
      showImage(idx);
      lightbox.classList.add("active");
    };
  });
}

window.addEventListener("DOMContentLoaded", () => {
  createLightbox();
  initLightbox();
});

// Botão "Ver Mais"
const verMaisBtn = document.getElementById("verMaisBtn");
if (verMaisBtn) {
  verMaisBtn.addEventListener("click", function () {
    const galeria = document.getElementById("galeria");
    if (!galeria) return;
    const folder = window.location.pathname.split('/').pop().replace('.html', '');
    for (let i = 11; i <= 50; i++) {
      const img = document.createElement("img");
      img.src = `../assets/img/servicos/${folder}/${String(i).padStart(2, '0')}.jpg`;
      img.alt = "Foto do serviço";
      img.loading = "lazy";
      img.onerror = () => img.remove();
      galeria.appendChild(img);
    }
    this.style.display = "none";
    initLightbox();
  });
}

// Filtro de locais
document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    const localSelecionado = btn.getAttribute('data-local');
    document.querySelectorAll('.grupo-fotos').forEach(grupo => {
      grupo.style.display = (localSelecionado === 'todos' || grupo.dataset.local === localSelecionado)
        ? 'flex'
        : 'none';
    });
  });
});
