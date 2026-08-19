/* ================================================
   CURRÍCULO — script.js
   ================================================
   Funcionalidades:
   1. Animação das barras de habilidade
   2. Geração das iniciais no avatar (fallback)
   3. Destaque do ano atual no período "Atual"
   4. Revelação suave das seções ao rolar
================================================ */


/* ------------------------------------------------
   1. ANIMAÇÃO DAS BARRAS DE HABILIDADE
   Lê o atributo data-nivel de cada .skill-item
   e anima a barra até o valor correspondente.
   Para alterar o nível de uma habilidade, edite
   o atributo data-nivel no HTML (0 a 100).
------------------------------------------------ */
function animarBarras() {
  const itens = document.querySelectorAll('.skill-item[data-nivel]');

  itens.forEach(item => {
    const nivel = parseInt(item.dataset.nivel, 10) || 0;
    const barra = item.querySelector('.skill-barra-fill');
    if (barra) {
      // Pequeno delay para a transição CSS funcionar após o paint inicial
      requestAnimationFrame(() => {
        setTimeout(() => {
          barra.style.width = nivel + '%';
        }, 120);
      });
    }
  });
}


/* ------------------------------------------------
   2. INICIAIS NO AVATAR (fallback sem foto)
   Lê o texto do .nome e exibe as iniciais no
   avatar caso nenhuma <img> esteja presente.
   Se você adicionar uma foto via <img>, este
   trecho é ignorado automaticamente.
------------------------------------------------ */
function configurarAvatar() {
  const avatar = document.getElementById('avatar-iniciais');
  if (!avatar) return;

  const temImagem = avatar.querySelector('img');
  if (temImagem) return; // já tem foto — não faz nada

  const nomeEl = document.querySelector('.nome');
  if (!nomeEl) return;

  const palavras = nomeEl.textContent.trim().split(/\s+/);
  const iniciais = palavras
    .slice(0, 2)                          // máx. 2 iniciais
    .map(p => p.charAt(0).toUpperCase())
    .join('');

  avatar.textContent = iniciais || '?';
}


/* ------------------------------------------------
   3. ANO ATUAL NO PERÍODO "ATUAL"
   Substitui a palavra "Atual" pela data no
   formato "Mês Ano" (ex: "Jul 2026") para
   deixar o currículo sempre atualizado.
   Se preferir manter "Atual", comente as linhas
   abaixo ou remova esta função.
------------------------------------------------ */
function atualizarPeriodos() {
  const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const agora  = new Date();
  const label  = MESES[agora.getMonth()] + ' ' + agora.getFullYear();

  document.querySelectorAll('.entry-periodo').forEach(el => {
    if (el.textContent.includes('Atual')) {
      el.textContent = el.textContent.replace('Atual', label);
    }
  });
}


/* ------------------------------------------------
   4. REVELAÇÃO SUAVE AO ROLAR (scroll reveal)
   As seções entram com fade-in + slide-up quando
   ficam visíveis na tela. Usa IntersectionObserver,
   compatível com todos os navegadores modernos.
------------------------------------------------ */
function configurarScrollReveal() {
  const alvos = document.querySelectorAll('.section, .entry');

  // Estilo inicial (invisível e levemente abaixo)
  alvos.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.1 }
  );

  alvos.forEach(el => observer.observe(el));
}


/* ------------------------------------------------
   INICIALIZAÇÃO
   Todas as funções são chamadas aqui, após o DOM
   estar completamente carregado.
------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  configurarAvatar();
  animarBarras();
  atualizarPeriodos();
  configurarScrollReveal();
});
