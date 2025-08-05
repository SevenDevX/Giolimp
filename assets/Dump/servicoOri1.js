// Cria a lightbox apenas uma vez
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
document.body.appendChild(lightbox);

const lightImg = document.createElement("img");
lightbox.appendChild(lightImg);

function initLightbox() {
  const images = document.querySelectorAll(".grid-fotos img");

  let currentIndex = 0;
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";

  const lightImg = document.createElement("img");
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  const closeBtn = document.createElement("button");

  // Conteúdo dos botões
  prevBtn.innerHTML = "❮";
  nextBtn.innerHTML = "❯";
  closeBtn.innerHTML = "✖";

  // Classes para estilização
  prevBtn.className = "nav-btn prev";
  nextBtn.className = "nav-btn next";
  closeBtn.className = "close-btn";

  lightbox.appendChild(lightImg);
  lightbox.appendChild(prevBtn);
  lightbox.appendChild(nextBtn);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);

  // Mostrar imagem
  function showImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    lightImg.src = images[index].src;
    currentIndex = index;
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      showImage(index);
      lightbox.classList.add("active");
    });
  });

  // Botões de navegação
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    lightbox.classList.remove("active");
  });

  // Clique fora da imagem
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}


window.addEventListener("DOMContentLoaded", initLightbox);

const verMaisBtn = document.getElementById("verMaisBtn");

if (verMaisBtn) {
  verMaisBtn.addEventListener("click", function () {
    const galeria = document.getElementById("galeria");
    if (!galeria) return;

    const folder = window.location.pathname.split('/').pop().replace('.html', '');

    // Ajuste o número conforme a quantidade real de imagens extras
    for (let i = 11; i <= 50; i++) {
      const img = document.createElement("img");
      img.src = `../assets/img/servicos/${folder}/${String(i).padStart(2, '0')}.jpg`;
      img.alt = "Foto do serviço";
      img.loading = "lazy";

      // Evita mostrar imagem quebrada
      img.onerror = () => {
        img.remove();
      };

      galeria.appendChild(img);
    }

    this.style.display = "none";
    initLightbox(); // Reaplica evento de lightbox nas novas imagens
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
