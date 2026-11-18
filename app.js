let activeGame = 'euromillones';

// Dicionário com as regras específicas de cada loteria espanhola
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

function switchView(viewId, buttonElement) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(viewId).classList.add('active');
    buttonElement.classList.add('active');

    const titles = {
        'overview': 'Visão Geral do Sistema',
        'generator': 'Laboratório de Filtros & Gerador',
        'history': 'Histórico de Apostas'
    };
    const titleEl = document.getElementById('view-title');
    if (titleEl) titleEl.innerText = titles[viewId];
}

function setGame(gameName, btn) {
    // Remove a classe active dos botões de jogo e aplica no selecionado
    document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    activeGame = gameName;
    
    const gameLabel = document.getElementById('current-game-label');
    if (gameLabel) gameLabel.innerText = gameName.toUpperCase();

    // Aplica as regras da loteria selecionada nos campos do gerador
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

        renderLastDraw(config.lastDraw, gameName);
    }
}

// Renderiza as bolas do último sorteio na Visão Geral
function renderLastDraw(numbers, gameName) {
    const overviewSection = document.getElementById('overview');
    if (!overviewSection) return;

    const titleContainer = overviewSection.querySelector('h3, .card-title, [id*="sorteio"]');
    if (titleContainer) {
        titleContainer.innerText = `ÚLTIMO SORTEIO SIMULADO (${gameName.toUpperCase()})`;
    }

    const ballsContainer = overviewSection.querySelector('.balls-container');
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

// 1. Valida se a soma das dezenas está dentro da faixa estatística
function isValidSum(numbers, minSum, maxSum) {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum >= minSum && sum <= maxSum;
}

// 2. Motor de Fechamentos Matemáticos
function runGenerator() {
    const poolInput = document.getElementById('pool-input');
    const kSizeInput = document.getElementById('k-size');
    const minSumInput = document.getElementById('min-sum');
    const maxSumInput = document.getElementById('max-sum');

    if (!poolInput || !kSizeInput || !minSumInput || !maxSumInput) return;

    const poolStr = poolInput.value;
    const kSize = parseInt(kSizeInput.value, 10);
    const minSum = parseInt(minSumInput.value, 10);
    const maxSum = parseInt(maxSumInput.value, 10);

    const pool = poolStr.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n)).sort((a, b) => a - b);

    if (pool.length < kSize) {
        alert(`O grupo precisa ter pelo menos ${kSize} números.`);
        return;
    }

    const validGames = [];

    function combine(start, current) {
        if (current.length === kSize) {
            const sorted = [...current].sort((a, b) => a - b);
            if (isValidSum(sorted, minSum, maxSum)) {
                validGames.push(sorted);
            }
            return;
        }
        for (let i = start; i < pool.length; i++) {
            current.push(pool[i]);
            combine(i + 1, current);
            current.pop();
        }
    }

    combine(0, []);

    const resultsCard = document.getElementById('results-card');
    const resultsContainer = document.getElementById('results-container');
    const resultsTitle = document.getElementById('results-title');

    if (resultsTitle) {
        resultsTitle.innerText = `Jogos Filtrados e Validados (${validGames.length} combinações)`;
    }
    
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
        validGames.forEach((game, index) => {
            const row = document.createElement('div');
            row.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--surface-card); border-radius: 8px;";
            
            const span = document.createElement('span');
            span.style.cssText = "font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--text-secondary);";
            span.innerText = `#${index + 1}`;
            
            const ballsDiv = document.createElement('div');
            ballsDiv.className = "balls-container";
            ballsDiv.style.margin = "0";

            game.forEach(num => {
                const ball = document.createElement('div');
                ball.className = "ball";
                ball.style.cssText = "width: 32px; height: 32px; font-size: 0.85rem;";
                ball.innerText = String(num).padStart(2, '0');
                ballsDiv.appendChild(ball);
            });

            row.appendChild(span);
            row.appendChild(ballsDiv);
            resultsContainer.appendChild(row);
        });
    }

    if (resultsCard) {
        resultsCard.style.display = 'block';
    }
}

// Vincula apenas as tags de botão reais de forma segura
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        const text = btn.innerText ? btn.innerText.trim().toLowerCase() : '';
        if (text.includes('euromillones')) {
            btn.classList.add('game-btn');
            btn.onclick = (e) => setGame('euromillones', e.currentTarget);
        } else if (text.includes('eurodreams')) {
            btn.classList.add('game-btn');
            btn.onclick = (e) => setGame('eurodreams', e.currentTarget);
        } else if (text.includes('primitiva')) {
            btn.classList.add('game-btn');
            btn.onclick = (e) => setGame('laprimitiva', e.currentTarget);
        }
    });

    setGame('euromillones', document.querySelector('.game-btn') || null);
});
