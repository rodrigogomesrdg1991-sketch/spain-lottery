let activeGame = 'euromillones';

// Dicionário com as regras, dezenas padrão, números extras e histórico oficial real completo
const lotteryRules = {
    euromillones: {
        kSize: 5,
        minSum: 80,
        maxSum: 180,
        defaultPool: "5, 12, 18, 24, 33, 41, 47",
        mainDraw: [35, 37, 38, 46, 48],
        extraDraw: [1, 2],
        extraCount: 2,
        history: [
            { date: "20/11/2026", numbers: [08, 21, 24, 36, 49], extras: [1, 8] },
            { date: "17/11/2026", numbers: [35, 37, 38, 46, 48], extras: [1, 2] },
            { date: "13/11/2026", numbers: [16, 27, 32, 41, 45], extras: [2, 12] },
            { date: "10/11/2026", numbers: [15, 18, 31, 37, 41], extras: [1, 5] },
            { date: "06/11/2026", numbers: [7, 13, 37, 47, 49], extras: [7, 11] },
            { date: "03/11/2026", numbers: [13, 23, 38, 39, 48], extras: [5, 8] },
            { date: "30/10/2026", numbers: [3, 12, 14, 17, 37], extras: [3, 12] },
            { date: "27/10/2026", numbers: [21, 30, 32, 42, 48], extras: [3, 6] },
            { date: "23/10/2026", numbers: [24, 33, 35, 44, 47], extras: [7, 11] },
            { date: "20/10/2026", numbers: [9, 15, 16, 37, 43], extras: [7, 10] },
            { date: "16/10/2026", numbers: [7, 15, 16, 22, 35], extras: [4, 6] },
            { date: "13/10/2026", numbers: [21, 23, 39, 44, 49], extras: [4, 11] },
            { date: "09/10/2026", numbers: [5, 20, 24, 31, 45], extras: [5, 10] },
            { date: "06/10/2026", numbers: [18, 22, 32, 41, 48], extras: [8, 10] },
            { date: "02/10/2026", numbers: [7, 8, 10, 22, 35], extras: [2, 10] },
            { date: "29/09/2026", numbers: [4, 7, 12, 31, 44], extras: [8, 11] },
            { date: "25/09/2026", numbers: [11, 12, 15, 38, 49], extras: [10, 12] },
            { date: "22/09/2026", numbers: [13, 14, 16, 44, 50], extras: [10, 12] },
            { date: "18/09/2026", numbers: [8, 17, 25, 30, 44], extras: [2, 3] },
            { date: "15/09/2026", numbers: [10, 16, 18, 22, 28], extras: [6, 10] },
            { date: "11/09/2026", numbers: [1, 7, 15, 39, 50], extras: [1, 11] },
            { date: "08/09/2026", numbers: [13, 17, 33, 35, 39], extras: [7, 12] },
            { date: "04/09/2026", numbers: [11, 12, 19, 27, 46], extras: [4, 12] },
            { date: "01/09/2026", numbers: [2, 10, 23, 37, 47], extras: [3, 5] },
            { date: "28/08/2026", numbers: [7, 14, 28, 42, 45], extras: [6, 9] },
            { date: "25/08/2026", numbers: [8, 16, 30, 47, 48], extras: [4, 9] },
            { date: "21/08/2026", numbers: [10, 14, 15, 19, 45], extras: [4, 12] },
            { date: "18/08/2026", numbers: [3, 9, 38, 40, 50], extras: [6, 10] },
            { date: "14/08/2026", numbers: [5, 29, 39, 48, 49], extras: [4, 8] },
            { date: "11/08/2026", numbers: [3, 11, 17, 46, 48], extras: [1, 2] },
            { date: "07/08/2026", numbers: [26, 29, 35, 38, 47], extras: [1, 2] },
            { date: "04/08/2026", numbers: [25, 30, 34, 46, 50], extras: [1, 12] },
            { date: "31/07/2026", numbers: [10, 24, 25, 31, 45], extras: [4, 5] },
            { date: "28/07/2026", numbers: [5, 7, 24, 30, 49], extras: [10, 11] },
            { date: "24/07/2026", numbers: [8, 10, 30, 36, 47], extras: [1, 4] },
            { date: "21/07/2026", numbers: [2, 3, 8, 28, 39], extras: [2, 11] },
            { date: "17/07/2026", numbers: [12, 21, 23, 34, 40], extras: [9, 10] },
            { date: "14/07/2026", numbers: [10, 19, 37, 42, 47], extras: [9, 12] },
            { date: "10/07/2026", numbers: [2, 14, 28, 33, 48], extras: [8, 10] },
            { date: "07/07/2026", numbers: [5, 29, 33, 45, 47], extras: [5, 8] },
            { date: "03/07/2026", numbers: [2, 12, 17, 25, 39], extras: [1, 2] },
            { date: "30/06/2026", numbers: [1, 8, 37, 44, 48], extras: [2, 6] },
            { date: "26/06/2026", numbers: [6, 16, 26, 34, 35], extras: [11, 12] },
            { date: "23/06/2026", numbers: [3, 33, 36, 45, 46], extras: [5, 6] },
            { date: "19/06/2026", numbers: [8, 34, 39, 41, 42], extras: [2, 7] },
            { date: "16/06/2026", numbers: [18, 25, 31, 37, 45], extras: [4, 9] },
            { date: "12/06/2026", numbers: [4, 7, 14, 22, 23], extras: [1, 7] },
            { date: "09/06/2026", numbers: [2, 7, 23, 44, 46], extras: [3, 5] },
            { date: "05/06/2026", numbers: [5, 6, 16, 17, 49], extras: [2, 12] },
            { date: "02/06/2026", numbers: [6, 9, 17, 18, 42], extras: [7, 9] },
            { date: "29/05/2026", numbers: [5, 14, 18, 31, 35], extras: [2, 12] },
            { date: "26/05/2026", numbers: [6, 23, 25, 35, 37], extras: [6, 12] },
            { date: "22/05/2026", numbers: [6, 22, 26, 31, 37], extras: [5, 8] },
            { date: "19/05/2026", numbers: [2, 12, 20, 38, 45], extras: [2, 5] },
            { date: "15/05/2026", numbers: [3, 10, 38, 41, 43], extras: [2, 9] },
            { date: "12/05/2026", numbers: [4, 26, 32, 35, 36], extras: [5, 7] },
            { date: "08/05/2026", numbers: [2, 17, 19, 34, 37], extras: [8, 11] },
            { date: "05/05/2026", numbers: [3, 4, 8, 20, 31], extras: [6, 8] },
            { date: "01/05/2026", numbers: [3, 9, 42, 46, 47], extras: [1, 11] },
            { date: "28/04/2026", numbers: [26, 29, 41, 46, 47], extras: [8, 9] },
            { date: "24/04/2026", numbers: [25, 26, 30, 40, 45], extras: [1, 5] },
            { date: "21/04/2026", numbers: [13, 16, 29, 40, 47], extras: [3, 4] },
            { date: "17/04/2026", numbers: [22, 23, 28, 41, 47], extras: [6, 8] },
            { date: "14/04/2026", numbers: [1, 2, 4, 28, 44], extras: [5, 12] },
            { date: "10/04/2026", numbers: [10, 13, 14, 38, 41], extras: [6, 9] },
            { date: "07/04/2026", numbers: [11, 14, 19, 36, 49], extras: [6, 7] },
            { date: "03/04/2026", numbers: [8, 27, 29, 46, 49], extras: [2, 10] },
            { date: "31/03/2026", numbers: [5, 8, 10, 33, 38], extras: [2, 7] },
            { date: "27/03/2026", numbers: [4, 10, 43, 44, 48], extras: [2, 4] },
            { date: "24/03/2026", numbers: [12, 16, 17, 18, 27], extras: [1, 3] },
            { date: "20/03/2026", numbers: [5, 12, 16, 37, 46], extras: [8, 10] },
            { date: "17/03/2026", numbers: [5, 17, 28, 33, 41], extras: [3, 9] },
            { date: "13/03/2026", numbers: [13, 17, 26, 41, 48], extras: [4, 10] },
            { date: "10/03/2026", numbers: [12, 14, 27, 44, 50], extras: [4, 12] },
            { date: "06/03/2026", numbers: [15, 16, 19, 28, 37], extras: [6, 9] },
            { date: "03/03/2026", numbers: [6, 7, 24, 34, 50], extras: [5, 7] },
            { date: "27/02/2026", numbers: [14, 24, 27, 39, 42], extras: [6, 10] },
            { date: "24/02/2026", numbers: [10, 27, 40, 43, 47], extras: [6, 10] },
            { date: "20/02/2026", numbers: [13, 24, 28, 33, 35], extras: [5, 9] },
            { date: "17/02/2026", numbers: [1, 4, 6, 10, 41], extras: [5, 12] },
            { date: "13/02/2026", numbers: [9, 13, 31, 37, 40], extras: [6, 9] },
            { date: "10/02/2026", numbers: [1, 17, 19, 34, 42], extras: [5, 8] },
            { date: "06/02/2026", numbers: [10, 13, 20, 23, 24], extras: [6, 11] },
            { date: "03/02/2026", numbers: [26, 27, 28, 34, 37], extras: [4, 9] },
            { date: "30/01/2026", numbers: [14, 18, 31, 35, 46], extras: [7, 11] },
            { date: "27/01/2026", numbers: [4, 23, 42, 43, 47], extras: [3, 9] },
            { date: "23/01/2026", numbers: [4, 5, 13, 21, 42], extras: [3, 10] },
            { date: "20/01/2026", numbers: [11, 18, 19, 22, 50], extras: [1, 11] },
            { date: "16/01/2026", numbers: [5, 17, 24, 29, 50], extras: [5, 10] },
            { date: "13/01/2026", numbers: [6, 10, 18, 44, 47], extras: [2, 10] },
            { date: "09/01/2026", numbers: [1, 7, 10, 26, 34], extras: [2, 4] },
            { date: "06/01/2026", numbers: [5, 14, 17, 18, 31], extras: [10, 12] },
            { date: "02/01/2026", numbers: [8, 27, 42, 44, 46], extras: [1, 10] },
            { date: "30/12/2025", numbers: [11, 26, 29, 34, 44], extras: [1, 10] },
            { date: "26/12/2025", numbers: [12, 22, 32, 36, 48], extras: [3, 4] },
            { date: "23/12/2025", numbers: [8, 26, 27, 29, 44], extras: [11, 12] },
            { date: "19/12/2025", numbers: [17, 21, 39, 43, 44], extras: [1, 11] },
            { date: "16/12/2025", numbers: [14, 16, 40, 41, 44], extras: [2, 10] },
            { date: "12/12/2025", numbers: [7, 25, 30, 37, 41], extras: [5, 11] },
            { date: "09/12/2025", numbers: [2, 8, 13, 29, 49], extras: [2, 11] },
            { date: "05/12/2025", numbers: [9, 15, 25, 34, 46], extras: [8, 12] }
        ]
    },
    eurodreams: {
        kSize: 6,
        minSum: 70,
        maxSum: 160,
        defaultPool: "4, 11, 18, 22, 29, 31, 37",
        mainDraw: [2, 4, 11, 14, 17, 18],
        extraDraw: [2],
        extraCount: 1,
        history: [
            { date: "19/11/2026", numbers: [5, 8, 18, 24, 27, 39], extras: [2] },
            { date: "16/11/2026", numbers: [2, 4, 11, 14, 17, 18], extras: [2] },
            { date: "12/11/2026", numbers: [5, 10, 15, 18, 19, 37], extras: [1] },
            { date: "09/11/2026", numbers: [1, 3, 6, 12, 27, 37], extras: [1] },
            { date: "05/11/2026", numbers: [15, 18, 21, 31, 33, 34], extras: [3] },
            { date: "02/11/2026", numbers: [5, 7, 22, 23, 29, 36], extras: [1] },
            { date: "29/10/2026", numbers: [3, 8, 11, 13, 34, 40], extras: [5] },
            { date: "26/10/2026", numbers: [3, 19, 21, 26, 35, 38], extras: [3] },
            { date: "22/10/2026", numbers: [6, 7, 13, 14, 25, 30], extras: [1] },
            { date: "19/10/2026", numbers: [1, 2, 10, 15, 23, 26], extras: [3] },
            { date: "15/10/2026", numbers: [4, 19, 27, 31, 34, 39], extras: [5] },
            { date: "12/10/2026", numbers: [3, 4, 6, 19, 30, 36], extras: [2] },
            { date: "08/10/2026", numbers: [6, 13, 20, 27, 35, 38], extras: [4] },
            { date: "05/10/2026", numbers: [3, 6, 16, 24, 29, 40], extras: [2] },
            { date: "01/10/2026", numbers: [6, 9, 12, 21, 36, 37], extras: [3] },
            { date: "28/09/2026", numbers: [2, 7, 9, 17, 18, 30], extras: [3] },
            { date: "24/09/2026", numbers: [6, 13, 14, 18, 20, 32], extras: [4] },
            { date: "21/09/2026", numbers: [4, 11, 20, 22, 38, 39], extras: [5] },
            { date: "17/09/2026", numbers: [8, 10, 13, 17, 20, 27], extras: [4] },
            { date: "14/09/2026", numbers: [2, 15, 18, 22, 34, 38], extras: [4] },
            { date: "10/09/2026", numbers: [3, 6, 12, 24, 38, 40], extras: [4] },
            { date: "07/09/2026", numbers: [1, 3, 21, 24, 28, 32], extras: [5] },
            { date: "03/09/2026", numbers: [8, 18, 20, 22, 33, 40], extras: [1] },
            { date: "31/08/2026", numbers: [6, 14, 15, 17, 34, 37], extras: [2] },
            { date: "27/08/2026", numbers: [6, 12, 29, 30, 35, 38], extras: [3] },
            { date: "24/08/2026", numbers: [3, 11, 17, 23, 28, 30], extras: [2] },
            { date: "20/08/2026", numbers: [19, 20, 24, 28, 30, 33], extras: [3] },
            { date: "17/08/2026", numbers: [8, 12, 19, 21, 26, 36], extras: [4] },
            { date: "13/08/2026", numbers: [10, 14, 18, 20, 26, 30], extras: [5] },
            { date: "10/08/2026", numbers: [7, 9, 10, 26, 33, 40], extras: [1] },
            { date: "06/08/2026", numbers: [3, 18, 22, 24, 26, 33], extras: [2] },
            { date: "03/08/2026", numbers: [12, 13, 17, 20, 23, 34], extras: [2] },
            { date: "30/07/2026", numbers: [4, 12, 21, 27, 34, 39], extras: [1] },
            { date: "27/07/2026", numbers: [2, 4, 13, 16, 21, 25], extras: [3] },
            { date: "23/07/2026", numbers: [3, 4, 17, 21, 31, 33], extras: [2] },
            { date: "20/07/2026", numbers: [8, 11, 12, 22, 26, 36], extras: [1] },
            { date: "16/07/2026", numbers: [1, 9, 14, 16, 30, 40], extras: [3] },
            { date: "13/07/2026", numbers: [9, 12, 13, 17, 21, 30], extras: [1] },
            { date: "09/07/2026", numbers: [5, 14, 18, 22, 33, 35], extras: [4] },
            { date: "06/07/2026", numbers: [4, 5, 7, 12, 29, 37], extras: [2] },
            { date: "02/07/2026", numbers: [3, 12, 23, 24, 36, 40], extras: [3] },
            { date: "29/06/2026", numbers: [12, 20, 22, 28, 29, 40], extras: [2] },
            { date: "25/06/2026", numbers: [1, 4, 11, 16, 17, 38], extras: [1] },
            { date: "22/06/2026", numbers: [4, 10, 14, 15, 29, 37], extras: [3] },
            { date: "18/06/2026", numbers: [2, 19, 23, 27, 28, 30], extras: [3] },
            { date: "15/06/2026", numbers: [3, 14, 20, 22, 29, 40], extras: [5] },
            { date: "11/06/2026", numbers: [6, 18, 22, 25, 31, 32], extras: [5] },
            { date: "08/06/2026", numbers: [2, 4, 9, 22, 28, 34], extras: [4] },
            { date: "04/06/2026", numbers: [1, 9, 17, 22, 37, 39], extras: [3] },
            { date: "01/06/2026", numbers: [4, 15, 23, 31, 34, 39], extras: [3] },
            { date: "28/05/2026", numbers: [11, 12, 17, 22, 25, 35], extras: [4] },
            { date: "25/05/2026", numbers: [4, 13, 17, 22, 27, 30], extras: [1] },
            { date: "21/05/2026", numbers: [10, 16, 25, 27, 29, 37], extras: [5] },
            { date: "18/05/2026", numbers: [3, 11, 16, 20, 21, 22], extras: [4] },
            { date: "14/05/2026", numbers: [3, 7, 9, 21, 24, 27], extras: [4] },
            { date: "11/05/2026", numbers: [1, 4, 6, 22, 30, 38], extras: [5] },
            { date: "07/05/2026", numbers: [9, 12, 13, 24, 32, 38], extras: [5] },
            { date: "04/05/2026", numbers: [12, 21, 27, 30, 34, 38], extras: [1] },
            { date: "30/04/2026", numbers: [5, 7, 9, 16, 19, 22], extras: [2] },
            { date: "27/04/2026", numbers: [1, 4, 14, 21, 29, 34], extras: [1] },
            { date: "23/04/2026", numbers: [3, 7, 19, 22, 23, 29], extras: [2] },
            { date: "20/04/2026", numbers: [5, 7, 15, 24, 26, 31], extras: [4] },
            { date: "16/04/2026", numbers: [23, 24, 28, 29, 31, 40], extras: [3] },
            { date: "13/04/2026", numbers: [3, 17, 19, 28, 33, 40], extras: [5] },
            { date: "09/04/2026", numbers: [3, 7, 8, 19, 24, 29], extras: [5] },
            { date: "06/04/2026", numbers: [1, 2, 8, 14, 28, 33], extras: [3] },
            { date: "02/04/2026", numbers: [3, 4, 13, 21, 30, 37], extras: [4] },
            { date: "30/03/2026", numbers: [3, 17, 20, 23, 30, 39], extras: [3] },
            { date: "26/03/2026", numbers: [11, 14, 30, 32, 34, 39], extras: [5] },
            { date: "23/03/2026", numbers: [1, 4, 6, 13, 16, 28], extras: [5] },
            { date: "19/03/2026", numbers: [5, 8, 15, 28, 33, 34], extras: [3] },
            { date: "16/03/2026", numbers: [2, 5, 24, 29, 32, 39], extras: [3] },
            { date: "12/03/2026", numbers: [2, 9, 20, 23, 35, 36], extras: [4] },
            { date: "09/03/2026", numbers: [5, 14, 32, 34, 35, 37], extras: [3] },
            { date: "05/03/2026", numbers: [6, 18, 22, 32, 37, 38], extras: [4] },
            { date: "02/03/2026", numbers: [1, 8, 11, 14, 18, 35], extras: [3] },
            { date: "26/02/2026", numbers: [17, 18, 19, 21, 23, 36], extras: [4] },
            { date: "23/02/2026", numbers: [1, 7, 12, 25, 26, 39], extras: [1] },
            { date: "19/02/2026", numbers: [8, 10, 13, 36, 37, 38], extras: [4] },
            { date: "16/02/2026", numbers: [6, 10, 13, 24, 26, 38], extras: [3] },
            { date: "12/02/2026", numbers: [17, 27, 30, 33, 34, 36], extras: [3] },
            { date: "09/02/2026", numbers: [9, 11, 19, 22, 33, 36], extras: [3] },
            { date: "05/02/2026", numbers: [3, 10, 20, 21, 37, 38], extras: [3] },
            { date: "02/02/2026", numbers: [2, 7, 23, 24, 32, 37], extras: [3] },
            { date: "29/01/2026", numbers: [1, 7, 8, 26, 28, 34], extras: [5] },
            { date: "26/01/2026", numbers: [15, 23, 28, 33, 34, 37], extras: [3] },
            { date: "22/01/2026", numbers: [4, 7, 10, 17, 25, 39], extras: [3] },
            { date: "19/01/2026", numbers: [8, 9, 20, 24, 32, 40], extras: [1] },
            { date: "15/01/2026", numbers: [1, 5, 9, 10, 30, 35], extras: [2] },
            { date: "12/01/2026", numbers: [9, 15, 18, 23, 27, 31], extras: [1] },
            { date: "08/01/2026", numbers: [5, 15, 24, 26, 31, 34], extras: [1] },
            { date: "05/01/2026", numbers: [11, 20, 21, 28, 34, 38], extras: [4] },
            { date: "01/01/2026", numbers: [2, 6, 14, 20, 24, 27], extras: [2] },
            { date: "29/12/2025", numbers: [5, 8, 16, 19, 24, 39], extras: [2] },
            { date: "25/12/2025", numbers: [8, 9, 11, 13, 37, 39], extras: [4] },
            { date: "22/12/2025", numbers: [4, 11, 24, 27, 34, 35], extras: [5] },
            { date: "18/12/2025", numbers: [10, 12, 19, 21, 25, 27], extras: [1] },
            { date: "15/12/2025", numbers: [8, 22, 23, 31, 39, 40], extras: [4] },
            { date: "11/12/2025", numbers: [4, 6, 21, 23, 32, 37], extras: [1] },
            { date: "08/12/2025", numbers: [3, 8, 12, 18, 19, 27], extras: [3] },
            { date: "04/12/2025", numbers: [14, 15, 27, 32, 37, 38], extras: [3] }
        ]
    },
    laprimitiva: {
        kSize: 6,
        minSum: 90,
        maxSum: 210,
        defaultPool: "3, 10, 15, 21, 28, 36, 44, 48",
        mainDraw: [8, 9, 17, 34, 43, 48],
        extraDraw: [0, 29],
        extraCount: 2,
        history: [
            { date: "16/11/2026", numbers: [8, 9, 17, 34, 43, 48], extras: [0, 29] },
            { date: "14/11/2026", numbers: [3, 22, 24, 30, 48, 49], extras: [1, 37] },
            { date: "12/11/2026", numbers: [4, 10, 21, 32, 33, 45], extras: [9, 24] },
            { date: "09/11/2026", numbers: [1, 6, 14, 23, 30, 39], extras: [2, 36] },
            { date: "07/11/2026", numbers: [9, 13, 19, 25, 26, 30], extras: [4, 34] },
            { date: "05/11/2026", numbers: [4, 8, 9, 15, 31, 32], extras: [3, 2] },
            { date: "02/11/2026", numbers: [12, 25, 32, 44, 46, 47], extras: [2, 2] },
            { date: "31/10/2026", numbers: [2, 6, 8, 17, 27, 30], extras: [1, 47] },
            { date: "29/10/2026", numbers: [2, 18, 19, 28, 31, 44], extras: [9, 9] },
            { date: "26/10/2026", numbers: [4, 9, 33, 37, 39, 49], extras: [4, 18] }
        ]
    }
};

function applyMobileStyles() {
    if (document.getElementById('mobile-responsive-style')) return;

    const style = document.createElement('style');
    style.id = 'mobile-responsive-style';
    style.textContent = `
        @media (max-width: 768px) {
            body {
                overflow-x: hidden;
                padding-bottom: 24px;
            }

            .main-content, main, .container, .dashboard-container {
                padding-left: 12px !important;
                padding-right: 12px !important;
                max-width: 100% !important;
                box-sizing: border-box;
            }

            .nav-btn, .game-btn, #run-generator-btn, button {
                min-height: 44px;
                font-size: 0.92rem;
            }

            .game-btn {
                flex: 1 1 auto;
                text-align: center;
            }

            #generator-mode,
            #pool-input,
            #k-size,
            #min-sum,
            #max-sum,
            input,
            select {
                width: 100% !important;
                min-height: 44px;
                font-size: 16px !important;
                box-sizing: border-box;
            }

            #results-container > div,
            #history-rows-container > div {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 10px !important;
                padding: 12px !important;
            }

            #results-container .balls-container,
            #history-rows-container > div > div:last-child {
                flex-wrap: wrap !important;
                max-width: 100%;
            }
        }
    `;
    document.head.appendChild(style);
}

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
        
        if (document.getElementById('history') && document.getElementById('history').classList.contains('active')) {
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
        titleContainer.innerText = `ÚLTIMO SORTEIO OFICIAL (${displayName})`;
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

function renderHistoryView() {
    const historySection = document.getElementById('history');
    if (!historySection) return;

    const config = lotteryRules[activeGame];
    if (!config || !config.history) return;

    let displayName = activeGame.toUpperCase();
    if (activeGame === 'laprimitiva') displayName = 'LA PRIMITIVA';

    let contentContainer = historySection.querySelector('.history-content-wrapper');
    if (!contentContainer) {
        contentContainer = document.createElement('div');
        contentContainer.className = 'history-content-wrapper';
        contentContainer.style.cssText = "display: flex; flex-direction: column; gap: 20px; margin-top: 15px;";
        historySection.appendChild(contentContainer);
    }

    contentContainer.innerHTML = `
        <div style="background: var(--surface-card); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color);">
            <h3 style="margin-bottom: 15px; font-size: 1.1rem; color: var(--text-main);">Histórico de Concursos Oficiais — ${displayName} (${config.history.length} registos)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;" id="history-rows-container">
            </div>
        </div>
    `;

    const rowsContainer = contentContainer.querySelector('#history-rows-container');

    config.history.forEach((draw) => {
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
    applyMobileStyles();

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
