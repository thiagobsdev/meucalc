<?php
$currentPage = 'juros';
include '../includes/header.php';
include '../includes/sidebar.php';
?>

<div class="page-header page-header-enhanced">
    <div class="page-header-content">
        <div class="page-header-main">
            <span class="page-badge">
                <i class="bi bi-lightning-charge-fill"></i>
                Simulação gratuita e instantânea
            </span>

            <h1>Calculadora de <span>juros compostos</span></h1>
            <p>Descubra quanto seu dinheiro pode render com aportes mensais, taxa mensal ou anual e uma projeção clara da evolução do patrimônio.</p>

            <div class="page-benefits">
                <div class="page-benefit-chip">
                    <i class="bi bi-check2-circle"></i>
                    <span>Resultado em segundos</span>
                </div>

                <div class="page-benefit-chip">
                    <i class="bi bi-file-earmark-bar-graph"></i>
                    <span>Gráfico e tabela completos</span>
                </div>

                <div class="page-benefit-chip">
                    <i class="bi bi-download"></i>
                    <span>Exportação em Excel e CSV</span>
                </div>

                <div class="page-benefit-chip">
                    <i class="bi bi-shield-check"></i>
                    <span>Sem cadastro</span>
                </div>
            </div>

            <div class="page-header-actions">
                <a href="#simulador-investimento" class="hero-button">
                    <i class="bi bi-play-fill"></i>
                    Começar simulação
                </a>

                <span class="page-inline-note">Ideal para comparar cenários antes de investir.</span>
            </div>
        </div>

        <div class="page-header-preview">
            <div class="page-preview-card">
                <span class="page-preview-label">Exemplo rápido</span>
                <strong>R$ 500/mês por 10 anos</strong>
                <p>Visualize o patrimônio acumulado, o total investido e quanto veio dos juros compostos.</p>

                <div class="page-preview-list">
                    <div>
                        <i class="bi bi-graph-up-arrow"></i>
                        <span>Compare crescimento x valor investido</span>
                    </div>
                    <div>
                        <i class="bi bi-clipboard-data"></i>
                        <span>Copie o resumo para compartilhar</span>
                    </div>
                    <div>
                        <i class="bi bi-table"></i>
                        <span>Analise mês a mês na tabela</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="calc-wrapper calc-wrapper-wide" id="simulador-investimento">
    <div class="calc-card calc-card-featured calc-card-premium">
        <div class="calc-card-head calc-card-head-premium">
            <div>
                <span class="calc-card-kicker">Preencha os dados abaixo</span>
                <h2>Monte sua simulação</h2>
                <p>Informe os valores e veja instantaneamente a projeção do seu investimento.</p>
            </div>
        </div>

        <div class="quick-scenarios">
            <div class="quick-scenarios-head">
                <div>
                    <span class="quick-scenarios-kicker">Cenários rápidos</span>
                    <h3>Teste exemplos prontos com um clique</h3>
                </div>
                <p>Preenchimento automático para você comparar diferentes ritmos de investimento.</p>
            </div>

            <div class="quick-scenarios-grid">
                <button type="button" class="quick-scenario-button is-active" data-valor-inicial="0" data-aporte="100" data-taxa="1" data-tipo-taxa="mensal" data-tempo="24">
                    <span class="quick-scenario-title">R$ 100/mês</span>
                    <span class="quick-scenario-meta">24 meses • 1,00% ao mês</span>
                </button>

                <button type="button" class="quick-scenario-button" data-valor-inicial="0" data-aporte="300" data-taxa="1" data-tipo-taxa="mensal" data-tempo="60">
                    <span class="quick-scenario-title">R$ 300/mês</span>
                    <span class="quick-scenario-meta">5 anos • 1,00% ao mês</span>
                </button>

                <button type="button" class="quick-scenario-button" data-valor-inicial="0" data-aporte="500" data-taxa="1" data-tipo-taxa="mensal" data-tempo="120">
                    <span class="quick-scenario-title">R$ 500/mês</span>
                    <span class="quick-scenario-meta">10 anos • 1,00% ao mês</span>
                </button>

                <button type="button" class="quick-scenario-button" data-valor-inicial="5000" data-aporte="500" data-taxa="12" data-tipo-taxa="anual" data-tempo="180">
                    <span class="quick-scenario-title">R$ 5.000 + R$ 500/mês</span>
                    <span class="quick-scenario-meta">15 anos • 12,00% ao ano</span>
                </button>

                <button type="button" class="quick-scenario-button" data-valor-inicial="10000" data-aporte="1000" data-taxa="12" data-tipo-taxa="anual" data-tempo="240">
                    <span class="quick-scenario-title">R$ 10.000 + R$ 1.000/mês</span>
                    <span class="quick-scenario-meta">20 anos • 12,00% ao ano</span>
                </button>
            </div>
        </div>

        <div class="form-grid">
            <div class="form-group">
                <label class="form-label" for="valorInicial">Valor inicial</label>
                <div class="input-wrap input-wrap-icon">
                    <span class="input-icon">
                        <i class="bi bi-wallet2"></i>
                    </span>
                    <input type="text" id="valorInicial" class="form-control form-control-icon money-input" placeholder="0,00" inputmode="numeric" autocomplete="off">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="aporte">Aporte mensal</label>
                <div class="input-wrap input-wrap-icon">
                    <span class="input-icon">
                        <i class="bi bi-piggy-bank"></i>
                    </span>
                    <input type="text" id="aporte" class="form-control form-control-icon money-input" placeholder="0,00" inputmode="numeric" autocomplete="off">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="taxa">Taxa de juros</label>
                <div class="input-wrap input-wrap-icon suffix suffix-short">
                    <span class="input-icon">
                        <i class="bi bi-percent"></i>
                    </span>
                    <span class="input-suffix">%</span>
                    <input type="number" id="taxa" class="form-control form-control-icon" placeholder="1,00" min="0" step="0.01">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="tipoTaxa">Tipo da taxa</label>
                <div class="input-wrap input-wrap-icon">
                    <span class="input-icon">
                        <i class="bi bi-arrow-repeat"></i>
                    </span>
                    <select id="tipoTaxa" class="form-control form-control-icon">
                        <option value="mensal">Ao mês</option>
                        <option value="anual">Ao ano</option>
                    </select>
                </div>
            </div>

            <div class="form-group full">
                <label class="form-label" for="tempo">Período</label>
                <div class="input-wrap input-wrap-icon suffix">
                    <span class="input-icon">
                        <i class="bi bi-calendar3"></i>
                    </span>
                    <span class="input-suffix">meses</span>
                    <input type="number" id="tempo" class="form-control form-control-icon" placeholder="12" min="1" step="1">
                </div>
            </div>
        </div>

        <button type="button" class="calc-button" id="btnCalcular">
            <i class="bi bi-calculator"></i>
            Calcular investimento
        </button>

        <div id="resultado" class="hidden result-section">
            <div class="impact-banner">
                <div class="impact-banner-icon">
                    <i class="bi bi-stars"></i>
                </div>

                <div class="impact-banner-content">
                    <span class="impact-banner-label">Leitura rápida do resultado</span>
                    <strong id="resMensagemImpacto">Preencha os dados e calcule para ver o impacto da sua simulação.</strong>
                </div>
            </div>

            <div class="insight-grid">
                <div class="insight-card">
                    <span class="insight-label">Seu patrimônio pode ficar</span>
                    <strong class="insight-value" id="resMultiplicador">0,00x</strong>
                    <small class="insight-note">em relação ao total investido</small>
                </div>

                <div class="insight-card">
                    <span class="insight-label">Parte do valor final vinda dos juros</span>
                    <strong class="insight-value" id="resParticipacaoJuros">0,00%</strong>
                    <small class="insight-note">quanto os juros pesam no resultado</small>
                </div>

                <div class="insight-card">
                    <span class="insight-label">Média investida por ano</span>
                    <strong class="insight-value" id="resMediaAnual">R$ 0,00</strong>
                    <small class="insight-note">considerando todo o período</small>
                </div>

                <div class="insight-card">
                    <span class="insight-label">Juros equivalem a</span>
                    <strong class="insight-value" id="resEquivalenciaAporte">0 meses</strong>
                    <small class="insight-note">de aportes mensais no ritmo informado</small>
                </div>
            </div>

            <div class="summary-grid">
                <div class="summary-card summary-card-highlight summary-card-primary">
                    <div class="summary-card-head">
                        <span class="summary-card-icon">
                            <i class="bi bi-trophy"></i>
                        </span>
                        <span class="summary-label">Valor final estimado</span>
                    </div>
                    <strong class="summary-value" id="resValorFinal">R$ 0,00</strong>
                </div>

                <div class="summary-card">
                    <div class="summary-card-head">
                        <span class="summary-card-icon">
                            <i class="bi bi-safe2"></i>
                        </span>
                        <span class="summary-label">Total investido</span>
                    </div>
                    <strong class="summary-value" id="resTotalInvestido">R$ 0,00</strong>
                </div>

                <div class="summary-card">
                    <div class="summary-card-head">
                        <span class="summary-card-icon">
                            <i class="bi bi-graph-up-arrow"></i>
                        </span>
                        <span class="summary-label">Juros ganhos</span>
                    </div>
                    <strong class="summary-value positive" id="resJurosGanhos">R$ 0,00</strong>
                </div>

                <div class="summary-card">
                    <div class="summary-card-head">
                        <span class="summary-card-icon">
                            <i class="bi bi-speedometer2"></i>
                        </span>
                        <span class="summary-label">Rentabilidade sobre o valor investido</span>
                    </div>
                    <strong class="summary-value" id="resRentabilidade">0,00%</strong>
                </div>
            </div>

            <div class="summary-text-card summary-text-card-premium">
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

                <button type="button" class="action-button action-button-secondary" id="btnCompartilharSimulacao">
                    <i class="bi bi-share"></i>
                    Compartilhar simulação
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

            <div class="chart-card chart-card-premium">
                <div class="section-head">
                    <h3>Evolução do patrimônio</h3>
                    <p>Compare o crescimento do patrimônio com o total efetivamente investido.</p>
                </div>

                <div class="chart-container">
                    <canvas id="graficoEvolucao"></canvas>
                </div>
            </div>

            <div class="table-card table-card-premium">
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

<section class="trust-section trust-section-premium">
    <div class="trust-section-head">
        <span class="trust-section-kicker">Conteúdo de apoio</span>
        <h2>Entenda melhor a simulação</h2>
        <p>Use a calculadora com mais clareza, entenda como os juros compostos funcionam e saiba interpretar o resultado com mais segurança.</p>
    </div>

    <div class="trust-grid">
        <article class="trust-card">
            <div class="trust-card-head">
                <div class="trust-card-icon">
                    <i class="bi bi-info-circle"></i>
                </div>
                <div>
                    <h3>Como funciona esta calculadora</h3>
                    <p>Resumo direto de como a simulação é feita.</p>
                </div>
            </div>

            <ul class="trust-list">
                <li>Você informa o valor inicial, o aporte mensal, a taxa de juros e o período em meses.</li>
                <li>Quando a taxa é anual, ela é convertida em uma taxa mensal equivalente.</li>
                <li>Os juros são aplicados sobre o saldo acumulado de cada mês.</li>
                <li>Depois disso, o aporte mensal é somado ao saldo projetado.</li>
                <li>O resultado mostra patrimônio final, total investido, juros ganhos, gráfico e tabela mensal.</li>
            </ul>

            <div class="trust-note">
                <strong>Importante:</strong>
                <span>Esta simulação é educativa. Ela não considera impostos, taxas de corretagem, inflação, carência ou oscilações reais de mercado.</span>
            </div>
        </article>

        <article class="trust-card">
            <div class="trust-card-head">
                <div class="trust-card-icon">
                    <i class="bi bi-graph-up-arrow"></i>
                </div>
                <div>
                    <h3>O que são juros compostos</h3>
                    <p>O crescimento acontece sobre o valor já acumulado.</p>
                </div>
            </div>

            <p class="trust-text">
                Juros compostos são os rendimentos que incidem não apenas sobre o valor que você investiu, mas também sobre os juros acumulados ao longo do tempo. É por isso que, em períodos maiores, o crescimento tende a acelerar.
            </p>

            <p class="trust-text">
                Na prática, quanto maior o tempo e mais constante forem os aportes, maior tende a ser o efeito da capitalização composta no seu patrimônio.
            </p>

            <div class="trust-highlight">
                <i class="bi bi-lightbulb"></i>
                <span>Tempo e consistência costumam ter um impacto enorme no resultado final.</span>
            </div>
        </article>

        <article class="trust-card trust-card-full">
            <div class="trust-card-head">
                <div class="trust-card-icon">
                    <i class="bi bi-patch-question"></i>
                </div>
                <div>
                    <h3>Perguntas frequentes</h3>
                    <p>Respostas rápidas para dúvidas comuns do público.</p>
                </div>
            </div>

            <div class="faq-list">
                <details class="faq-item" open>
                    <summary>Essa calculadora serve para quais tipos de investimento?</summary>
                    <div class="faq-content">
                        Ela pode ser usada como referência para investimentos que tenham lógica de rentabilidade composta, como CDB, Tesouro, fundos, previdência e até projeções genéricas de carteira. O resultado é uma estimativa, não uma promessa de retorno real.
                    </div>
                </details>

                <details class="faq-item">
                    <summary>A taxa ao ano é transformada em taxa ao mês?</summary>
                    <div class="faq-content">
                        Sim. Quando você escolhe taxa anual, a calculadora converte esse percentual para uma taxa mensal equivalente antes de montar a projeção.
                    </div>
                </details>

                <details class="faq-item">
                    <summary>A calculadora considera inflação?</summary>
                    <div class="faq-content">
                        Não. O cálculo atual mostra valores nominais. Ou seja, ele ajuda a visualizar o crescimento do patrimônio, mas não desconta a perda de poder de compra ao longo do tempo.
                    </div>
                </details>

                <details class="faq-item">
                    <summary>O valor final é garantido?</summary>
                    <div class="faq-content">
                        Não. O valor final é apenas uma simulação com base nos dados informados. Investimentos reais podem variar por causa de mercado, impostos, custos e mudanças de rentabilidade.
                    </div>
                </details>

                <details class="faq-item">
                    <summary>Qual a diferença entre total investido e valor final?</summary>
                    <div class="faq-content">
                        O total investido é a soma do valor inicial com todos os aportes feitos no período. O valor final é o total investido somado aos juros acumulados ao longo da simulação.
                    </div>
                </details>
            </div>
        </article>
    </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>

<?php include '../includes/footer.php'; ?>