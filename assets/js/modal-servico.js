document.addEventListener("DOMContentLoaded", function() {
  const servicos = {
    "limpeza-pos-obra": {
      titulo: "Limpeza Pós-Obra",
      descricao: "Remoção de resíduos de obra...",
      imagens: [
        "assets/img/servicos/limpeza-pos-obra/01.jpg",
        "assets/img/servicos/limpeza-pos-obra/02.jpg",
        "assets/img/servicos/limpeza-pos-obra/03.jpg"
      ],
      link: "servicos/limpeza-pos-obra.html"
    },
    "mudanca": {
      titulo: "Pré e Pós Mudança",
      descricao: "Limpeza antes e após mudanças...",
      imagens: [
        "assets/img/servicos/mudanca/01.jpg",
        "assets/img/servicos/mudanca/02.jpg",
        "assets/img/servicos/mudanca/03.jpg"
      ],
      link: "servicos/mudanca.html"
    },
    "tratamento-pisos": {
      titulo: "Tratamento de Pisos",
      descricao: "Polimento e conservação de pisos...",
      imagens: [
        "assets/img/servicos/tratamento-pisos/01.jpg",
        "assets/img/servicos/tratamento-pisos/02.jpg",
        "assets/img/servicos/tratamento-pisos/03.jpg"
      ],
      link: "servicos/tratamento-pisos.html"
    },
    "limpeza-vidros": {
      titulo: "Limpeza de Vidros",
      descricao: "Vidros em sacadas, fachadas...",
      imagens: [
        "assets/img/servicos/limpeza-vidros/01.jpg",
        "assets/img/servicos/limpeza-vidros/02.jpg",
        "assets/img/servicos/limpeza-vidros/03.jpg"
      ],
      link: "servicos/limpeza-vidros.html"
    }
  };
  
  const modal = document.getElementById("modal-servico");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalDescricao = document.getElementById("modal-descricao");
  const modalImgs = [
    document.getElementById("modal-img1"),
    document.getElementById("modal-img2"),
    document.getElementById("modal-img3")
  ];
  const modalLink = document.getElementById("modal-link");
  
  document.querySelectorAll(".btn-detalhes").forEach(botao => {
    botao.addEventListener("click", () => {
      const tipo = botao.closest(".servico").dataset.servico;
      const dados = servicos[tipo];
      if (!dados) return;
      
      modalTitulo.textContent = dados.titulo;
      modalDescricao.textContent = dados.descricao;
      modalImgs[0].src = dados.imagens[0];
      modalImgs[1].src = dados.imagens[1];
      modalImgs[2].src = dados.imagens[2];
      modalLink.href = dados.link;
      
      modal.style.display = "flex";
    });
  });
  
  document.querySelector(".fechar").addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
});