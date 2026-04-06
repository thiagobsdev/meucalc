document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initMoneyMasks();
    initCompoundCalculator();
});

function initSidebar() {
    const toggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (!toggle || !sidebar || !overlay) {
        return;
    }

    const mobileQuery = window.matchMedia('(max-width: 991px)');

    const openSidebar = () => {
        if (mobileQuery.matches) {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.toggle('sidebar-collapsed');
        }
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    toggle.addEventListener('click', () => {
        if (mobileQuery.matches) {
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
            return;
        }

        document.body.classList.toggle('sidebar-collapsed');
    });

    overlay.addEventListener('click', closeSidebar);

    window.addEventListener('resize', () => {
        if (!mobileQuery.matches) {
            closeSidebar();
        }
    });
}

function initMoneyMasks() {
    const inputs = document.querySelectorAll('.money-input');

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            input.value = formatCurrencyInput(input.value);
        });

        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.value = '';
                return;
            }
            input.value = formatCurrencyInput(input.value);
        });
    });
}

function formatCurrencyInput(value) {
    const digits = String(value).replace(/\D/g, '');

    if (!digits) {
        return '';
    }

    const number = Number(digits) / 100;
    return number.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function parseBrazilianNumber(value) {
    if (value === null || value === undefined) {
        return 0;
    }

    const normalized = String(value).trim().replace(/\./g, '').replace(',', '.');
    const parsed = parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function formatPercent(value) {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + '%';
}

function monthlyRateFromInput(rateValue, rateType) {
    const decimalRate = rateValue / 100;
    if (rateType === 'anual') {
        return Math.pow(1 + decimalRate, 1 / 12) - 1;
    }
    return decimalRate;
}

function initCompoundCalculator() {
    const button = document.getElementById('btnCalcular');
    if (!button) {
        return;
    }

    let chartInstance = null;

    button.addEventListener('click', () => {
        const valorInicial = parseBrazilianNumber(document.getElementById('valorInicial')?.value);
        const aporte = parseBrazilianNumber(document.getElementById('aporte')?.value);
        const taxa = parseFloat(document.getElementById('taxa')?.value) || 0;
        const tipoTaxa = document.getElementById('tipoTaxa')?.value || 'mensal';
        const tempo = parseInt(document.getElementById('tempo')?.value, 10) || 0;

        if (tempo <= 0) {
            alert('Informe um período válido em meses.');
            return;
        }

        if (valorInicial < 0 || aporte < 0 || taxa < 0) {
            alert('Preencha apenas valores positivos.');
            return;
        }

        const taxaMensal = monthlyRateFromInput(taxa, tipoTaxa);
        let saldo = valorInicial;
        let totalInvestido = valorInicial;
        let saldoInicialMes = valorInicial;

        const labels = [];
        const data = [];
        const tbody = document.getElementById('tabelaEvolucaoBody');
        let rows = '';

        for (let mes = 1; mes <= tempo; mes++) {
            saldoInicialMes = saldo;
            const jurosMes = saldoInicialMes * taxaMensal;
            saldo = saldoInicialMes + jurosMes + aporte;
            totalInvestido += aporte;

            labels.push(`${mes}`);
            data.push(Number(saldo.toFixed(2)));

            rows += `
                <tr>
                    <td>${mes}</td>
                    <td>${formatMoney(saldoInicialMes)}</td>
                    <td>${formatMoney(aporte)}</td>
                    <td>${formatMoney(jurosMes)}</td>
                    <td>${formatMoney(saldo)}</td>
                </tr>
            `;
        }

        const jurosGanhos = saldo - totalInvestido;
        const rentabilidade = totalInvestido > 0 ? (jurosGanhos / totalInvestido) * 100 : 0;

        document.getElementById('resValorFinal').textContent = formatMoney(saldo);
        document.getElementById('resTotalInvestido').textContent = formatMoney(totalInvestido);
        document.getElementById('resJurosGanhos').textContent = formatMoney(jurosGanhos);
        document.getElementById('resRentabilidade').textContent = formatPercent(rentabilidade);
        tbody.innerHTML = rows;
        document.getElementById('resultado').classList.remove('hidden');

        const canvas = document.getElementById('graficoEvolucao');
        if (!canvas || typeof Chart === 'undefined') {
            return;
        }

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Patrimônio acumulado',
                    data,
                    tension: 0.28,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#e2e8f0'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => ` ${formatMoney(Number(context.raw || 0))}`
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.08)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#94a3b8',
                            callback: (value) => formatMoney(Number(value))
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.08)'
                        }
                    }
                }
            }
        });
    });
}
