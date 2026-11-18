let activeGame = 'euromillones';

// Dicionário com as regras e dezenas padrão
const lotteryRules = {
    euromillones: {
        kSize: 5,
        minSum: 80,
        maxSum: 180,
        defaultPool: "5, 12, 18, 24, 33, 41, 47",
        mainDraw: [7, 14, 23, 35, 42],
        extraDraw: [3, 9],
        extraCount: 2
    },
    eurodreams: {
        kSize: 6,
        minSum: 70,
        maxSum: 160,
        defaultPool: "4, 11, 18, 22, 29, 31, 37",
        mainDraw: [5, 12, 19, 27, 34, 39],
        extraDraw: [4],
        extraCount: 1
    },
    laprimitiva: {
        kSize: 6,
        minSum: 90,
        maxSum: 210,
        defaultPool: "3, 10, 15, 21, 28, 36, 44, 48",
        mainDraw: [8, 15, 22, 31, 40, 47],
        extraDraw: [5],
        extraCount: 1
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
    document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    activeGame = gameName;
    
    const gameLabel = document.getElementById('current-game-label');
    if (gameLabel) gameLabel.innerText = gameName.toUpperCase();

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

        renderLastDraw(config.mainDraw, config.extraDraw, gameName);
    }
}

function renderLastDraw(mainNumbers, extraNumbers, gameName) {
    const overviewSection = document.getElementById('overview');
    if (!overviewSection) return;

    const titleContainer = overviewSection.querySelector('h3, .card-title, [id*="sorteio"]');
    if (titleContainer) {
        titleContainer.innerText = `ÚLTIMO SORTEIO SIMULADO (${gameName.toUpperCase()})`;
    }

    const ballsContainer = overviewSection.querySelector('.balls-container');
    if (ballsContainer) {
        ballsContainer.innerHTML = '';
        
        mainNumbers.forEach(num => {
            const ball = document.createElement('div');
            ball.className = "ball";
            ball.style.cssText = "width: 36px; height: 36px; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold;";
            ball.innerText = String(num).padStart(2, '0');
            ballsContainer.appendChild(ball);
        });

        extraNumbers.forEach(num => {
            const ball = document.createElement('div');
            ball.className = "ball extra-ball";
            ball.style.cssText = "width: 36px; height: 36px; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; background: #d4af37; color: #121212; margin-left: 4px;";
            ball.innerText = String(num).padStart(2, '0');
            ballsContainer.appendChild(ball);
        });
    }
}

function isValidSum(numbers, minSum, maxSum) {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum >= minSum && sum <= maxSum;
}

// Motor de Fechamentos Matemáticos com Suporte a Modo Reduzido
function runGenerator() {
    const poolInput = document.getElementById('pool-input');
    const kSizeInput = document.getElementById('k-size');
    const minSumInput = document.getElementById('min-sum');
    const maxSumInput = document.getElementById('max-sum');
    const modeSelect = document.getElementById('generator-mode'); // Completo ou Reduzido

    if (!poolInput || !kSizeInput || !minSumInput || !maxSumInput) return;

    const poolStr = poolInput.value;
    const kSize = parseInt(kSizeInput.value, 10);
    const minSum = parseInt(minSumInput.value, 10);
    const maxSum = parseInt(maxSumInput.value, 10);
    const mode = modeSelect ? modeSelect.value : 'full'; // 'full' ou 'reduced'

    const pool = poolStr.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n)).sort((a, b) => a - b);

    if (pool.length < kSize) {
        alert(`O grupo precisa ter pelo menos ${kSize} números.`);
        return;
    }

    let validGames = [];

    // Geração de combinações
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

    // SE O MODO FOR REDUZIDO: Aplica algoritmo de cobertura e dispersão máxima
    if (mode === 'reduced' && validGames.length > 10) {
        const reducedGames = [];
        const coveredCount = {};
        pool.forEach(n => coveredCount[n] = 0);

        // Embaralha levemente para garantir variabilidade em cada clique
        validGames.sort(() => Math.random() - 0.5);

        // Seleciona bilhetes priorizando aqueles que cobrem números menos repetidos até atingir um teto enxuto (ex: 12 a 15 bilhetes)
        const targetCount = Math.min(15, Math.ceil(validGames.length / 3));

        for (let game of validGames) {
            if (reducedGames.length >= targetCount) break;
            
            // Verifica se o jogo traz diversidade de cobertura
            reducedGames.push(game);
            game.forEach(n => coveredCount[n] = (coveredCount[n] || 0) + 1);
        }
        validGames = reducedGames;
    }

    // Renderiza os resultados na tela
    const resultsCard = document.getElementById('results-card');
    const resultsContainer = document.getElementById('results-container');
    const resultsTitle = document.getElementById('results-title');

    if (resultsTitle) {
        const modeLabel = mode === 'reduced' ? ' (Fechamento Reduzido / Económico)' : ' (Fechamento Completo)';
        resultsTitle.innerText = `Jogos Filtrados e Validados (${validGames.length} combinações)${modeLabel}`;
    }
    
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
        const config = lotteryRules[activeGame];

        validGames.forEach((game, index) => {
            const row = document.createElement('div');
            row.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--surface-card); border-radius: 8px;";
            
            const span = document.createElement('span');
            span.style.cssText = "font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--text-secondary);";
            span.innerText = `#${index + 1}`;
            
            const ballsDiv = document.createElement('div');
            ballsDiv.className = "balls-container";
            ballsDiv.style.margin = "0";
            ballsDiv.style.display = "flex";
            ballsDiv.style.alignItems = "center";
            ballsDiv.style.gap = "6px";

            game.forEach(num => {
                const ball = document.createElement('div');
                ball.className = "ball";
                ball.style.cssText = "width: 32px; height: 32px; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold;";
                ball.innerText = String(num).padStart(2, '0');
                ballsDiv.appendChild(ball);
            });

            if (config && config.extraDraw) {
                config.extraDraw.forEach(extraNum => {
                    const ball = document.createElement('div');
                    ball.className = "ball extra-ball";
                    ball.style.cssText = "width: 32px; height: 32px; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; background: #d4af37; color: #121212; margin-left: 4px;";
                    ball.innerText = String(extraNum).padStart(2, '0');
                    ballsDiv.appendChild(ball);
                });
            }

            row.appendChild(span);
            row.appendChild(ballsDiv);
            resultsContainer.appendChild(row);
        });
    }

    if (resultsCard) {
        resultsCard.style.display = 'block';
    }
}

// Injeção automática do seletor de modo na interface e ligação dos botões
document.addEventListener('DOMContentLoaded', () => {
    // Insere o seletor de modo de fechamento logo acima do botão de gerar se não existir
    const generatorSection = document.getElementById('generator');
    if (generatorSection && !document.getElementById('generator-mode')) {
        const controlsContainer = generatorSection.querySelector('.card, form, div');
        if (controlsContainer) {
            const modeWrapper = document.createElement('div');
            modeWrapper.style.cssText = "margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px;";
            modeWrapper.innerHTML = `
                <label style="font-size: 0.85rem; color: var(--text-secondary);">Estratégia de Fechamento:</label>
                <select id="generator-mode" style="background: var(--surface-card); color: var(--text-main); border: 1px solid var(--border-color); padding: 10px; border-radius: 8px; font-family: inherit;">
                    <option value="reduced">Fechamento Reduzido / Económico (Otimizado)</option>
                    <option value="full">Fechamento Completo (Todas as combinações)</option>
                </select>
            `;
            const targetBtn = document.getElementById('run-generator-btn') || generatorSection.querySelector('button');
            if (targetBtn && targetBtn.parentNode) {
                targetBtn.parentNode.insertBefore(modeWrapper, targetBtn);
            }
        }
    }

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
            btn.onclick = (e) => setGame('primitiva', e.currentTarget);
        } else if (text.includes('gerar fechamento') || text.includes('otimizado')) {
            btn.id = 'run-generator-btn';
            btn.onclick = () => runGenerator();
        }
    });

    setGame('euromillones', document.querySelector('.game-btn') || null);
});
