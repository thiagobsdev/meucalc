<?php
$currentPage = 'juros';
include '../includes/header.php';
include '../includes/sidebar.php';
?>

<div class="page-header">
    <h1>Juros Compostos</h1>
    <p>Simule o crescimento do seu investimento ao longo do tempo.</p>
</div>

<div class="calc-wrapper calc-wrapper-wide">
    <div class="calc-card">
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label" for="valorInicial">Valor inicial</label>
                <input type="text" id="valorInicial" class="form-control money-input" placeholder="0,00" inputmode="numeric" autocomplete="off">
            </div>

            <div class="form-group">
                <label class="form-label" for="aporte">Aporte mensal</label>
                <input type="text" id="aporte" class="form-control money-input" placeholder="0,00" inputmode="numeric" autocomplete="off">
            </div>

            <div class="form-group">
                <label class="form-label" for="taxa">Taxa de juros</label>
                <div class="input-wrap suffix suffix-short">
                    <span class="input-suffix">%</span>
                    <input type="number" id="taxa" class="form-control" placeholder="1,00" min="0" step="0.01">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="tipoTaxa">Tipo da taxa</label>
                <select id="tipoTaxa" class="form-control">
                    <option value="mensal">Ao mês</option>
                    <option value="anual">Ao ano</option>
                </select>
            </div>

            <div class="form-group full">
                <label class="form-label" for="tempo">Período</label>
                <div class="input-wrap suffix">
                    <span class="input-suffix">meses</span>
                    <input type="number" id="tempo" class="form-control" placeholder="12" min="1" step="1">
                </div>
            </div>
        </div>

        <button type="button" class="calc-button" id="btnCalcular">
            <i class="bi bi-calculator"></i>
            Calcular investimento
        </button>

        <div id="resultado" class="hidden result-section">
            <div class="summary-grid">
                <div class="summary-card summary-card-highlight">
                    <span class="summary-label">Valor final estimado</span>
                    <strong class="summary-value" id="resValorFinal">R$ 0,00</strong>
                </div>

                <div class="summary-card">
                    <span class="summary-label">Total investido</span>
                    <strong class="summary-value" id="resTotalInvestido">R$ 0,00</strong>
                </div>

                <div class="summary-card">
                    <span class="summary-label">Juros ganhos</span>
                    <strong class="summary-value positive" id="resJurosGanhos">R$ 0,00</strong>
                </div>

                <div class="summary-card">
                    <span class="summary-label">Rentabilidade sobre o valor investido</span>
                    <strong class="summary-value" id="resRentabilidade">0,00%</strong>
                </div>
            </div>

            <div class="summary-text-card">
                <div class="section-head section-head-inline">
                    <div>
                        <h3>Resumo da simulação</h3>
                        <p>Texto pronto para compartilhar ou salvar.</p>
                    </div>
                </div>

                <p id="resumoSimulacao" class="summary-text-output">
                    Preencha os dados e calcule para gerar um resumo automático.
                </p>
            </div>

            <div class="result-actions">
                <button type="button" class="action-button action-button-secondary" id="btnCopiarResumo">
                    <i class="bi bi-clipboard"></i>
                    Copiar resultado
                </button>

                <button type="button" class="action-button" id="btnExportarExcel">
                    <i class="bi bi-file-earmark-excel"></i>
                    Exportar Excel
                </button>

                <button type="button" class="action-button action-button-secondary" id="btnExportarCsv">
                    <i class="bi bi-filetype-csv"></i>
                    Exportar CSV
                </button>
            </div>

            <div class="chart-card">
                <div class="section-head">
                    <h3>Evolução do patrimônio</h3>
                    <p>Compare o crescimento do patrimônio com o total efetivamente investido.</p>
                </div>

                <div class="chart-container">
                    <canvas id="graficoEvolucao"></canvas>
                </div>
            </div>

            <div class="table-card">
                <div class="section-head">
                    <h3>Tabela de evolução</h3>
                    <p>Detalhamento completo por período.</p>
                </div>

                <div class="table-responsive-custom">
                    <table class="evolution-table">
                        <thead>
                            <tr>
                                <th>Mês</th>
                                <th>Saldo inicial</th>
                                <th>Aporte</th>
                                <th>Juros do mês</th>
                                <th>Saldo final</th>
                            </tr>
                        </thead>
                        <tbody id="tabelaEvolucaoBody"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>

<?php include '../includes/footer.php'; ?>