let activeGame = 'euromillones';

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
    document.getElementById('view-title').innerText = titles[viewId];
}

function setGame(gameName, btn) {
    document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeGame = gameName;
    document.getElementById('current-game-label').innerText = gameName.toUpperCase();
}

// 1. Valida se a soma das dezenas está dentro da faixa estatística
function isValidSum(numbers, minSum, maxSum) {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum >= minSum && sum <= maxSum;
}

// 2. Motor de Fechamentos Matemáticos
function runGenerator() {
    const poolStr = document.getElementById('pool-input').value;
    const kSize = parseInt(document.getElementById('k-size').value, 10);
    const minSum = parseInt(document.getElementById('min-sum').value, 10);
    const maxSum = parseInt(document.getElementById('max-sum').value, 10);

    const pool = poolStr.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n)).sort((a, b) => a - b);

    if (pool.length < kSize) {
        alert(`O grupo precisa ter pelo menos ${kSize} números.`);
        return;
    }

    const validGames = [];

    // Algoritmo de combinação matemática (n escolhe k)
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

    // Renderiza os resultados na tela
    const resultsCard = document.getElementById('results-card');
    const resultsContainer = document.getElementById('results-container');
    document.getElementById('results-title').innerText = `Jogos Filtrados e Validados (${validGames.length} combinações)`;
    
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

    resultsCard.style.display = 'block';
}
