document.getElementById("verMaisBtn").addEventListener("click", function() {
  const galeria = document.getElementById("galeria");
  const folder = window.location.pathname.split('/').pop().replace('.html', '');
  
  for (let i = 10; i <= 50; i++) {
    const img = document.createElement("img");
    const numero = i < 10 ? `0${i}` : i;
    img.src = `../assets/img/servicos/${folder}/${numero}.jpg`;
    img.alt = `Foto do serviço`;
    img.loading = "lazy";
    galeria.appendChild(img);
  }
  
  this.style.display = "none";
  initLightbox(); // reaplica evento nas novas imagens
});

// Lightbox
function initLightbox() {
  const images = document.querySelectorAll(".grid-fotos img");
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  document.body.appendChild(lightbox);
  
  const lightImg = document.createElement("img");
  lightbox.appendChild(lightImg);
  
  images.forEach(img => {
    img.addEventListener("click", () => {
      lightImg.src = img.src;
      lightbox.classList.add("active");
    });
  });
  
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

window.addEventListener("DOMContentLoaded", initLightbox);

document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Alternar classe ativa
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');

    const localSelecionado = btn.getAttribute('data-local');
    const grupos = document.querySelectorAll('.grupo-fotos');

    grupos.forEach(grupo => {
      if (localSelecionado === 'todos' || grupo.dataset.local === localSelecionado) {
        grupo.style.display = 'flex';
      } else {
        grupo.style.display = 'none';
      }
    });
  });
});

