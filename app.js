// Dicionário com as regras e dados simulados de cada loteria
const lotteryRules = {
    euromillones: {
        kSize: 5,
        minSum: 80,
        maxSum: 180,
        defaultPool: "5, 12, 18, 24, 33, 41, 47",
        lastDraw: [7, 14, 23, 35, 42]
    },
    eurodreams: {
        kSize: 6,
        minSum: 70,
        maxSum: 160,
        defaultPool: "4, 11, 18, 22, 29, 31, 37",
        lastDraw: [5, 12, 19, 27, 34, 39]
    },
    laprimitiva: {
        kSize: 6,
        minSum: 90,
        maxSum: 210,
        defaultPool: "3, 10, 15, 21, 28, 36, 44, 48",
        lastDraw: [8, 15, 22, 31, 40, 47]
    }
};

function setGame(gameName, btn) {
    document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeGame = gameName;
    
    // Atualiza o rótulo do jogo ativo
    const labelEl = document.getElementById('current-game-label');
    if (labelEl) labelEl.innerText = gameName.toUpperCase();

    // Aplica as configurações específicas da loteria escolhida nos inputs do gerador
    const config = lotteryRules[gameName];
    if (config) {
        const poolInput = document.getElementById('pool-input');
        const kSizeInput = document.getElementById('k-size');
        const minSumInput = document.getElementById('min-sum');
        const maxSumInput = document.getElementById('max-sum');

        if (poolInput) poolInput.value = config.defaultPool;
        if (kSizeInput) kSizeInput.value = config.kSize;
        if (minSumInput) minSumInput.value = config.minSum;
        if (maxSumInput) maxSumInput.value = config.maxSum;

        // Atualiza visualmente o último sorteio simulado na tela de Visão Geral
        renderLastDraw(config.lastDraw, gameName);
    }
}

// Função auxiliar para renderizar as bolas do último sorteio dinamicamente
function renderLastDraw(numbers, gameName) {
    // Procura o container do último sorteio na Visão Geral
    const overviewSection = document.getElementById('overview');
    if (!overviewSection) return;
    
    // Atualiza o título do card de último sorteio
    const titleEl = overviewSection.querySelector('h3, .card-title, [id*="sorteio"]');
    
    // Cria ou atualiza as bolinhas na tela de visão geral
    let ballsContainer = overviewSection.querySelector('.balls-container');
    if (!ballsContainer) {
        // Se não existir, tenta achar pelo container padrão
        ballsContainer = document.querySelector('.overview-balls') || document.querySelector('.balls-container');
    }
    
    if (ballsContainer) {
        ballsContainer.innerHTML = '';
        numbers.forEach(num => {
            const ball = document.createElement('div');
            ball.className = "ball";
            ball.style.cssText = "width: 36px; height: 36px; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold;";
            ball.innerText = String(num).padStart(2, '0');
            ballsContainer.appendChild(ball);
        });
    }
}
// Garante que os botões do topo funcionam automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        const text = btn.innerText.trim().toLowerCase();
        if (text.includes('euromillones')) {
            btn.classList.add('game-btn');
            btn.onclick = () => setGame('euromillones', btn);
        } else if (text.includes('eurodreams')) {
            btn.classList.add('game-btn');
            btn.onclick = () => setGame('eurodreams', btn);
        } else if (text.includes('primitiva')) {
            btn.classList.add('game-btn');
            btn.onclick = () => setGame('laprimitiva', btn);
        }
    });
});
