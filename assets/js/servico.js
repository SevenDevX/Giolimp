// Cria a lightbox apenas uma vez
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
document.body.appendChild(lightbox);

const lightImg = document.createElement("img");
lightbox.appendChild(lightImg);

function initLightbox() {
  document.querySelectorAll(".grid-fotos img:not([data-listener])").forEach(img => {
    img.addEventListener("click", () => {
      lightImg.src = img.src;
      lightbox.classList.add("active");
    });
    img.dataset.listener = "true";
  });
}

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

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
