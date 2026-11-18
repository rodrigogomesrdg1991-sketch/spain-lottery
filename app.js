let activeGame = 'euromillones';

// Dicionário com as regras, dezenas padrão, números extras e histórico de concursos
const lotteryRules = {
    euromillones: {
        kSize: 5,
        minSum: 80,
        maxSum: 180,
        defaultPool: "5, 12, 18, 24, 33, 41, 47",
        mainDraw: [7, 14, 23, 35, 42],
        extraDraw: [3, 9],
        extraCount: 2,
        history: [
            { date: "15/11/2026", numbers: [7, 14, 23, 35, 42], extras: [3, 9] },
            { date: "12/11/2026", numbers: [4, 19, 25, 31, 48], extras: [2, 11] },
            { date: "08/11/2026", numbers: [12, 17, 28, 36, 50], extras: [5, 7] },
            { date: "05/11/2026", numbers: [2, 15, 22, 39, 44], extras: [1, 8] },
            { date: "01/11/2026", numbers: [9, 14, 30, 41, 49], extras: [4, 10] }
        ]
    },
    eurodreams: {
        kSize: 6,
        minSum: 70,
        maxSum: 160,
        defaultPool: "4, 11, 18, 22, 29, 31, 37",
        mainDraw: [5, 12, 19, 27, 34, 39],
        extraDraw: [4],
        extraCount: 1,
        history: [
            { date: "16/11/2026", numbers: [5, 12, 19, 27, 34, 39], extras: [4] },
            { date: "13/11/2026", numbers: [2, 8, 15, 22, 31, 40], extras: [2] },
            { date: "09/11/2026", numbers: [7, 14, 21, 28, 35, 38], extras: [5] },
            { date: "06/11/2026", numbers: [1, 9, 16, 25, 33, 37], extras: [3] },
            { date: "02/11/2026", numbers: [3, 11, 18, 24, 30, 36], extras: [1] }
        ]
    },
    laprimitiva: {
        kSize: 6,
        minSum: 90,
        maxSum: 210,
        defaultPool: "3, 10, 15, 21, 28, 36, 44, 48",
        mainDraw: [8, 15, 22, 31, 40, 47],
        extraDraw: [5],
        extraCount: 1,
        history: [
            { date: "14/11/2026", numbers: [8, 15, 22, 31, 40, 47], extras: [5] },
            { date: "11/11/2026", numbers: [3, 12, 19, 28, 35, 43], extras: [2] },
            { date: "07/11/2026", numbers: [6, 14, 25, 33, 39, 46], extras: [8] },
            { date: "04/11/2026", numbers: [1, 9, 17, 26, 34, 42], extras: [0] },
            { date: "31/10/2026", numbers: [5, 11, 21, 30, 38, 45], extras: [4] }
        ]
    }
};

function switchView(viewId, buttonElement) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    const targetSection = document.getElementById(viewId);
    if (targetSection) targetSection.classList.add('active');
    if (buttonElement) buttonElement.classList.add('active');

    const titles = {
        'overview': 'Visão Geral do Sistema',
        'generator': 'Laboratório de Filtros & Gerador',
        'history': 'Histórico de Apostas & Estatísticas'
    };
    const titleEl = document.getElementById('view-title');
    if (titleEl) titleEl.innerText = titles[viewId];

    // Se mudou para a aba de histórico, renderiza os dados da loteria ativa
    if (viewId === 'history') {
        renderHistoryView();
    }
}

function setGame(gameName, btn) {
    document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    activeGame = gameName;
    
    const gameLabel = document.getElementById('current-game-label');
    if (gameLabel) {
        let displayName = gameName.toUpperCase();
        if (gameName === 'laprimitiva') displayName = 'LA PRIMITIVA';
        gameLabel.innerText = displayName;
    }

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
        
        // Se estiver na aba de histórico, atualiza também
        if (document.getElementById('history').classList.contains('active')) {
            renderHistoryView();
        }
    }
}

function renderLastDraw(mainNumbers, extraNumbers, gameName) {
    const overviewSection = document.getElementById('overview');
    if (!overviewSection) return;

    const titleContainer = overviewSection.querySelector('h3, .card-title, [id*="sorteio"]');
    if (titleContainer) {
        let displayName = gameName.toUpperCase();
        if (gameName === 'laprimitiva') displayName = 'LA PRIMITIVA';
        titleContainer.innerText = `ÚLTIMO SORTEIO SIMULADO (${displayName})`;
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

// Renderiza a tabela de histórico e painel estatístico na aba Histórico
function renderHistoryView() {
    const historySection = document.getElementById('history');
    if (!historySection) return;

    const config = lotteryRules[activeGame];
    if (!config || !config.history) return;

    let displayName = activeGame.toUpperCase();
    if (activeGame === 'laprimitiva') displayName = 'LA PRIMITIVA';

    // Procura ou cria o container de conteúdo do histórico
    let contentContainer = historySection.querySelector('.history-content-wrapper');
    if (!contentContainer) {
        contentContainer = document.createElement('div');
        contentContainer.className = 'history-content-wrapper';
        contentContainer.style.cssText = "display: flex; flex-direction: column; gap: 20px; margin-top: 15px;";
        historySection.appendChild(contentContainer);
    }

    contentContainer.innerHTML = `
        <div style="background: var(--surface-card); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color);">
            <h3 style="margin-bottom: 15px; font-size: 1.1rem; color: var(--text-main);">Últimos Concursos Oficiais — ${displayName}</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;" id="history-rows-container">
            </div>
        </div>
    `;

    const rowsContainer = contentContainer.querySelector('#history-rows-container');

    config.history.forEach((draw, index) => {
        const row = document.createElement('div');
        row.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); flex-wrap: wrap; gap: 10px;";
        
        const dateSpan = document.createElement('span');
        dateSpan.style.cssText = "font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--text-secondary);";
        dateSpan.innerText = `Concurso ${draw.date}`;

        const ballsDiv = document.createElement('div');
        ballsDiv.style.cssText = "display: flex; align-items: center; gap: 6px;";

        draw.numbers.forEach(num => {
            const ball = document.createElement('div');
            ball.style.cssText = "width: 30px; height: 30px; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; background: var(--surface-main); color: var(--text-main); border: 1px solid var(--border-color);";
            ball.innerText = String(num).padStart(2, '0');
            ballsDiv.appendChild(ball);
        });

        draw.extras.forEach(num => {
            const ball = document.createElement('div');
            ball.style.cssText = "width: 30px; height: 30px; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; background: #d4af37; color: #121212;";
            ball.innerText = String(num).padStart(2, '0');
            ballsDiv.appendChild(ball);
        });

        row.appendChild(dateSpan);
        row.appendChild(ballsDiv);
        rowsContainer.appendChild(row);
    });
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
    const modeSelect = document.getElementById('generator-mode');

    if (!poolInput || !kSizeInput || !minSumInput || !maxSumInput) return;

    const poolStr = poolInput.value;
    const kSize = parseInt(kSizeInput.value, 10);
    const minSum = parseInt(minSumInput.value, 10);
    const maxSum = parseInt(maxSumInput.value, 10);
    const mode = modeSelect ? modeSelect.value : 'full';

    const pool = poolStr.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n)).sort((a, b) => a - b);

    if (pool.length < kSize) {
        alert(`O grupo precisa ter pelo menos ${kSize} números.`);
        return;
    }

    let validGames = [];

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

    if (mode === 'reduced' && validGames.length > 10) {
        const reducedGames = [];
        const coveredCount = {};
        pool.forEach(n => coveredCount[n] = 0);

        validGames.sort(() => Math.random() - 0.5);

        const targetCount = Math.min(15, Math.ceil(validGames.length / 3));

        for (let game of validGames) {
            if (reducedGames.length >= targetCount) break;
            reducedGames.push(game);
            game.forEach(n => coveredCount[n] = (coveredCount[n] || 0) + 1);
        }
        validGames = reducedGames;
    }

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

document.addEventListener('DOMContentLoaded', () => {
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
            btn.onclick = (e) => setGame('laprimitiva', e.currentTarget);
        } else if (text.includes('gerar fechamento') || text.includes('otimizado')) {
            btn.id = 'run-generator-btn';
            btn.onclick = () => runGenerator();
        }
    });

    setGame('euromillones', document.querySelector('.game-btn') || null);
});
