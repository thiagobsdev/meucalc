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

function formatDateForFile(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function buildSimulationFilename(summary, extension) {
    const datePart = formatDateForFile(new Date());
    const monthsPart = summary?.tempo || 0;
    return `simulacao-juros-compostos-${monthsPart}-meses-${datePart}.${extension}`;
}

function downloadBlob(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 100);
}

function escapeCsvValue(value) {
    const text = String(value ?? '');
    return `"${text.replace(/"/g, '""')}"`;
}

function initCompoundCalculator() {
    const button = document.getElementById('btnCalcular');
    const exportExcelButton = document.getElementById('btnExportarExcel');
    const exportCsvButton = document.getElementById('btnExportarCsv');

    if (!button) {
        return;
    }

    let chartInstance = null;
    let simulationRows = [];
    let simulationSummary = null;

    const exportToCsv = () => {
        if (!simulationRows.length || !simulationSummary) {
            return;
        }

        const lines = [
            ['Simulação de Juros Compostos', ''],
            ['Valor inicial', simulationSummary.valorInicialFormatado],
            ['Aporte mensal', simulationSummary.aporteFormatado],
            ['Taxa de juros', simulationSummary.taxaFormatada],
            ['Período', `${simulationSummary.tempo} meses`],
            ['Valor final estimado', simulationSummary.valorFinalFormatado],
            ['Total investido', simulationSummary.totalInvestidoFormatado],
            ['Juros ganhos', simulationSummary.jurosGanhosFormatado],
            ['Rentabilidade', simulationSummary.rentabilidadeFormatada],
            [],
            ['Mês', 'Saldo inicial', 'Aporte', 'Juros do mês', 'Saldo final']
        ];

        simulationRows.forEach((row) => {
            lines.push([
                row.mes,
                row.saldoInicialFormatado,
                row.aporteFormatado,
                row.jurosMesFormatado,
                row.saldoFinalFormatado
            ]);
        });

        const csvContent = '\uFEFF' + lines
            .map((line) => line.map(escapeCsvValue).join(';'))
            .join('\n');

        downloadBlob(csvContent, buildSimulationFilename(simulationSummary, 'csv'), 'text/csv;charset=utf-8;');
    };

    const exportToExcel = () => {
        if (!simulationRows.length || !simulationSummary) {
            return;
        }

        if (typeof XLSX === 'undefined') {
            alert('Não foi possível carregar a biblioteca de Excel.');
            return;
        }

        const workbook = XLSX.utils.book_new();

        const summaryData = [
            ['Simulação de Juros Compostos', ''],
            ['Valor inicial', simulationSummary.valorInicial],
            ['Aporte mensal', simulationSummary.aporte],
            ['Taxa de juros (%)', simulationSummary.taxa],
            ['Tipo da taxa', simulationSummary.tipoTaxaLabel],
            ['Período (meses)', simulationSummary.tempo],
            ['Valor final estimado', simulationSummary.valorFinal],
            ['Total investido', simulationSummary.totalInvestido],
            ['Juros ganhos', simulationSummary.jurosGanhos],
            ['Rentabilidade (%)', simulationSummary.rentabilidade]
        ];

        const evolutionData = [
            ['Mês', 'Saldo inicial', 'Aporte', 'Juros do mês', 'Saldo final'],
            ...simulationRows.map((row) => [
                row.mes,
                row.saldoInicial,
                row.aporte,
                row.jurosMes,
                row.saldoFinal
            ])
        ];

        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
        const evolutionSheet = XLSX.utils.aoa_to_sheet(evolutionData);

        XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumo');
        XLSX.utils.book_append_sheet(workbook, evolutionSheet, 'Evolucao');

        XLSX.writeFile(workbook, buildSimulationFilename(simulationSummary, 'xlsx'));
    };

    if (exportCsvButton) {
        exportCsvButton.addEventListener('click', exportToCsv);
    }

    if (exportExcelButton) {
        exportExcelButton.addEventListener('click', exportToExcel);
    }

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

        simulationRows = [];

        for (let mes = 1; mes <= tempo; mes++) {
            saldoInicialMes = saldo;
            const jurosMes = saldoInicialMes * taxaMensal;
            saldo = saldoInicialMes + jurosMes + aporte;
            totalInvestido += aporte;

            labels.push(`${mes}`);
            data.push(Number(saldo.toFixed(2)));

            const rowData = {
                mes,
                saldoInicial: Number(saldoInicialMes.toFixed(2)),
                aporte: Number(aporte.toFixed(2)),
                jurosMes: Number(jurosMes.toFixed(2)),
                saldoFinal: Number(saldo.toFixed(2)),
                saldoInicialFormatado: formatMoney(saldoInicialMes),
                aporteFormatado: formatMoney(aporte),
                jurosMesFormatado: formatMoney(jurosMes),
                saldoFinalFormatado: formatMoney(saldo)
            };

            simulationRows.push(rowData);

            rows += `
                <tr>
                    <td>${rowData.mes}</td>
                    <td>${rowData.saldoInicialFormatado}</td>
                    <td>${rowData.aporteFormatado}</td>
                    <td>${rowData.jurosMesFormatado}</td>
                    <td>${rowData.saldoFinalFormatado}</td>
                </tr>
            `;
        }

        const jurosGanhos = saldo - totalInvestido;
        const rentabilidade = totalInvestido > 0 ? (jurosGanhos / totalInvestido) * 100 : 0;
        const tipoTaxaLabel = tipoTaxa === 'anual' ? 'Ao ano' : 'Ao mês';

        simulationSummary = {
            valorInicial: Number(valorInicial.toFixed(2)),
            aporte: Number(aporte.toFixed(2)),
            taxa: Number(taxa.toFixed(2)),
            tipoTaxa,
            tipoTaxaLabel,
            tempo,
            valorFinal: Number(saldo.toFixed(2)),
            totalInvestido: Number(totalInvestido.toFixed(2)),
            jurosGanhos: Number(jurosGanhos.toFixed(2)),
            rentabilidade: Number(rentabilidade.toFixed(2)),
            valorInicialFormatado: formatMoney(valorInicial),
            aporteFormatado: formatMoney(aporte),
            taxaFormatada: `${formatPercent(taxa)} ${tipoTaxaLabel}`,
            valorFinalFormatado: formatMoney(saldo),
            totalInvestidoFormatado: formatMoney(totalInvestido),
            jurosGanhosFormatado: formatMoney(jurosGanhos),
            rentabilidadeFormatada: formatPercent(rentabilidade)
        };

        document.getElementById('resValorFinal').textContent = simulationSummary.valorFinalFormatado;
        document.getElementById('resTotalInvestido').textContent = simulationSummary.totalInvestidoFormatado;
        document.getElementById('resJurosGanhos').textContent = simulationSummary.jurosGanhosFormatado;
        document.getElementById('resRentabilidade').textContent = simulationSummary.rentabilidadeFormatada;
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