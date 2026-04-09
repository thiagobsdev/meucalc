<?php
$currentPage = 'investimentos';
include '../includes/header.php';
include '../includes/sidebar.php';
?>

<section class="rf-modern-hero">
    <div class="rf-modern-hero-copy">
        <span class="rf-modern-eyebrow">
            <i class="bi bi-bank2"></i>
            Comparador interativo de renda fixa
        </span>
        <h1>Qual investimento <span>rende mais?</span></h1>
        <p>Compare CDB, LCI/LCA, Tesouro Selic, Prefixado e Tesouro IPCA+ no mesmo cenário. Veja ranking, impostos e detalhes de cada alternativa em uma tela mais limpa e interativa.</p>
    </div>

    <div class="rf-modern-hero-note">
        <div class="rf-modern-hero-pill">
            <i class="bi bi-shield-check"></i>
            Cálculo com IR e taxas
        </div>
        <p>Nos produtos comuns, a comparação é nominal. No Tesouro IPCA+, além do valor líquido nominal, mostramos também uma leitura em poder de compra de hoje.</p>
    </div>
</section>

<section class="rf-modern-layout" id="rfModernCalculator">
    <div class="rf-modern-main">
        <article class="rf-modern-panel">
            <div class="rf-modern-panel-head">
                <div>
                    <span class="rf-modern-kicker">Monte a simulação</span>
                    <h2>Defina seu cenário</h2>
                </div>
                <p>Inspirado em comparadores mais interativos, mas adaptado ao visual do seu site.</p>
            </div>

            <div class="rf-modern-presets">
                <button type="button" class="rf-modern-preset is-active" data-valor-inicial="20000" data-aporte="1000" data-periodo="20" data-unidade="anos" data-cdi="14.65" data-selic="14.65" data-ipca="4.09" data-cdb="100" data-lci="92" data-prefixado="12" data-ipcareal="6">
                    Cenário forte
                </button>
                <button type="button" class="rf-modern-preset" data-valor-inicial="10000" data-aporte="500" data-periodo="10" data-unidade="anos" data-cdi="11.75" data-selic="11.75" data-ipca="4.50" data-cdb="100" data-lci="90" data-prefixado="11.2" data-ipcareal="5.8">
                    Cenário moderado
                </button>
                <button type="button" class="rf-modern-preset" data-valor-inicial="5000" data-aporte="300" data-periodo="5" data-unidade="anos" data-cdi="10.50" data-selic="10.75" data-ipca="4.25" data-cdb="102" data-lci="88" data-prefixado="10.8" data-ipcareal="5.5">
                    Cenário conservador
                </button>
            </div>

            <div class="rf-modern-input-grid">
                <label class="rf-modern-field">
                    <span>Investimento inicial</span>
                    <div class="input-wrap input-wrap-icon">
                        <span class="input-icon">
                            <i class="bi bi-wallet2"></i>
                        </span>
                        <input type="text" id="rfValorInicial" class="form-control form-control-icon money-input" value="20.000,00" inputmode="numeric" autocomplete="off">
                    </div>
                </label>

                <label class="rf-modern-field">
                    <span>Aportes mensais</span>
                    <div class="input-wrap input-wrap-icon">
                        <span class="input-icon">
                            <i class="bi bi-piggy-bank"></i>
                        </span>
                        <input type="text" id="rfAporte" class="form-control form-control-icon money-input" value="1.000,00" inputmode="numeric" autocomplete="off">
                    </div>
                </label>

                <div class="rf-modern-field">
                    <span>Período da aplicação</span>
                    <div class="rf-modern-period">
                        <div class="input-wrap input-wrap-icon">
                            <span class="input-icon">
                                <i class="bi bi-calendar3"></i>
                            </span>
                            <input type="number" id="rfPeriodo" class="form-control form-control-icon" value="20" min="1" step="1">
                        </div>

                        <div class="input-wrap">
                            <select id="rfPeriodoUnidade" class="form-control">
                                <option value="anos" selected>Anos</option>
                                <option value="meses">Meses</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="rf-modern-divider"></div>

            <div class="rf-modern-mini-grid">
                <label class="rf-modern-mini-card">
                    <span>CDI efetivo (a.a.)</span>
                    <div class="rf-modern-mini-input">
                        <input type="number" id="rfCdi" class="form-control" value="14.65" min="0" step="0.01">
                        <small>%</small>
                    </div>
                </label>

                <label class="rf-modern-mini-card">
                    <span>Selic efetiva (a.a.)</span>
                    <div class="rf-modern-mini-input">
                        <input type="number" id="rfSelic" class="form-control" value="14.65" min="0" step="0.01">
                        <small>%</small>
                    </div>
                </label>

                <label class="rf-modern-mini-card">
                    <span>IPCA (a.a.)</span>
                    <div class="rf-modern-mini-input">
                        <input type="number" id="rfIpca" class="form-control" value="4.09" min="0" step="0.01">
                        <small>%</small>
                    </div>
                </label>

                <label class="rf-modern-mini-card">
                    <span>Custódia Tesouro (a.a.)</span>
                    <div class="rf-modern-mini-input">
                        <input type="number" id="rfCustodiaTesouro" class="form-control" value="0.20" min="0" step="0.01">
                        <small>%</small>
                    </div>
                </label>

                <label class="rf-modern-mini-card">
                    <span>CDB (% do CDI)</span>
                    <div class="rf-modern-mini-input">
                        <input type="number" id="rfCdbPercentCdi" class="form-control" value="100" min="0" step="0.01">
                        <small>%</small>
                    </div>
                </label>

                <label class="rf-modern-mini-card">
                    <span>LCI/LCA (% do CDI)</span>
                    <div class="rf-modern-mini-input">
                        <input type="number" id="rfLciPercentCdi" class="form-control" value="92" min="0" step="0.01">
                        <small>%</small>
                    </div>
                </label>

                <label class="rf-modern-mini-card">
                    <span>Prefixado (a.a.)</span>
                    <div class="rf-modern-mini-input">
                        <input type="number" id="rfPrefixadoTaxa" class="form-control" value="12" min="0" step="0.01">
                        <small>%</small>
                    </div>
                </label>

                <label class="rf-modern-mini-card">
                    <span>IPCA+ taxa real (a.a.)</span>
                    <div class="rf-modern-mini-input">
                        <input type="number" id="rfIpcaRealTaxa" class="form-control" value="6" min="0" step="0.01">
                        <small>%</small>
                    </div>
                </label>
            </div>

            <div class="rf-modern-divider"></div>

            <div class="rf-modern-product-picker">
                <label class="rf-modern-check">
                    <input type="checkbox" id="rfProdutoCdb" checked>
                    <span>CDB</span>
                </label>

                <label class="rf-modern-check">
                    <input type="checkbox" id="rfProdutoTesouroSelic" checked>
                    <span>Tesouro Selic</span>
                </label>

                <label class="rf-modern-check">
                    <input type="checkbox" id="rfProdutoLciLca" checked>
                    <span>LCI/LCA</span>
                </label>

                <label class="rf-modern-check">
                    <input type="checkbox" id="rfProdutoPrefixado" checked>
                    <span>Prefixado</span>
                </label>

                <label class="rf-modern-check">
                    <input type="checkbox" id="rfProdutoIpca" checked>
                    <span>Tesouro IPCA+</span>
                </label>
            </div>

            <div class="rf-modern-actions">
                <button type="button" class="calc-button" id="rfBtnCalcular">
                    <i class="bi bi-calculator"></i>
                    Comparar investimentos
                </button>

                <p class="rf-modern-helper">Premissas da simulação: aportes no fim de cada mês, IR estimado no resgate e sem IOF. O IPCA entra somente no Tesouro IPCA+.</p>
            </div>
        </article>
    </div>

    <aside class="rf-modern-aside">
        <article class="rf-modern-ranking" id="rfResultado">
            <div class="rf-modern-total">
                <span>Total investido</span>
                <strong id="rfTotalInvestidoTop">R$ 0,00</strong>
            </div>

            <div class="rf-modern-ranking-head">
                <div>
                    <span class="rf-modern-kicker">Ranking automático</span>
                    <h3>Melhores opções de investimento</h3>
                </div>
                <p>Valor líquido estimado no fim do período.</p>
            </div>

            <div class="rf-modern-ranking-list" id="rfRankingList"></div>

            <div class="rf-modern-ranking-note" id="rfResumoTop">
                Preencha os dados e clique em comparar para ver o ranking.
            </div>
        </article>
    </aside>
</section>

<section class="rf-modern-detail-wrap hidden" id="rfDetailSection">
    <div class="rf-modern-detail-top">
        <div>
            <span class="rf-modern-kicker">Detalhamento</span>
            <h2>Análise da aplicação selecionada</h2>
        </div>

        <div class="rf-modern-detail-select">
            <label for="rfResultadoProdutoSelect">Trocar aplicação</label>
            <select id="rfResultadoProdutoSelect" class="form-control"></select>
        </div>
    </div>

    <article class="rf-modern-detail-card" id="rfResultadoCardAtual"></article>

    <div class="rf-modern-chart-and-table">
        <article class="chart-card chart-card-premium rf-modern-chart-card">
            <div class="section-head">
                <h3>Evolução da aplicação</h3>
                <p>Comparação entre o valor líquido estimado da aplicação selecionada e o total efetivamente investido.</p>
            </div>

            <div class="chart-container rf-modern-chart-container">
                <canvas id="rfGraficoComparacao"></canvas>
            </div>
        </article>

        <article class="table-card table-card-premium rf-modern-table-card">
            <div class="section-head">
                <h3>Comparativo geral</h3>
                <p>Resumo das opções selecionadas para o mesmo cenário.</p>
            </div>

            <div class="table-responsive-custom">
                <table class="evolution-table rf-modern-table">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Taxa bruta anual</th>
                            <th>Valor líquido</th>
                            <th>Ganho líquido</th>
                            <th>Impostos + taxas</th>
                        </tr>
                    </thead>
                    <tbody id="rfTabelaComparativaBody"></tbody>
                </table>
            </div>
        </article>
    </div>
</section>

<section class="trust-section trust-section-premium">
    <div class="trust-section-head">
        <span class="trust-section-kicker">Impostos e regras</span>
        <h2>Como a tributação foi tratada na calculadora</h2>
        <p>Este bloco ajuda o usuário a entender por que um produto pode render mais do que outro mesmo com taxa bruta parecida.</p>
    </div>

    <div class="trust-grid">
        <article class="trust-card">
            <div class="trust-card-head">
                <div class="trust-card-icon">
                    <i class="bi bi-receipt"></i>
                </div>
                <div>
                    <h3>CDB, Tesouro Selic, Tesouro IPCA+ e Prefixado</h3>
                    <p>IR regressivo sobre o rendimento.</p>
                </div>
            </div>

            <ul class="trust-list">
                <li>Até 180 dias: 22,5% sobre o rendimento.</li>
                <li>De 181 a 360 dias: 20%.</li>
                <li>De 361 a 720 dias: 17,5%.</li>
                <li>Acima de 720 dias: 15%.</li>
            </ul>

            <div class="trust-note">
                <strong>Na prática:</strong>
                <span>quanto maior o prazo, menor tende a ser a mordida do IR sobre o ganho.</span>
            </div>
        </article>

        <article class="trust-card">
            <div class="trust-card-head">
                <div class="trust-card-icon">
                    <i class="bi bi-house-check"></i>
                </div>
                <div>
                    <h3>LCI/LCA</h3>
                    <p>Tratadas como isentas de IR para pessoa física.</p>
                </div>
            </div>

            <p class="trust-text">Na calculadora, o rendimento líquido da LCI/LCA coincide com o rendimento bruto porque não aplicamos Imposto de Renda ao resultado final.</p>

            <div class="trust-highlight">
                <i class="bi bi-lightbulb"></i>
                <span>Por isso, uma LCI/LCA com percentual menor do CDI ainda pode vencer um CDB em alguns cenários.</span>
            </div>
        </article>

        <article class="trust-card">
            <div class="trust-card-head">
                <div class="trust-card-icon">
                    <i class="bi bi-bank"></i>
                </div>
                <div>
                    <h3>Taxa de custódia do Tesouro</h3>
                    <p>Aplicada separadamente do IR.</p>
                </div>
            </div>

            <ul class="trust-list">
                <li>No Tesouro Selic, a simulação considera isenção até R$ 10 mil e cobrança só sobre o excedente.</li>
                <li>No Tesouro IPCA+, a simulação aplica a custódia sobre o saldo do título.</li>
            </ul>

            <div class="trust-note">
                <strong>Atenção:</strong>
                <span>a taxa da sua corretora não está incluída, porque muitas hoje trabalham com taxa zero.</span>
            </div>
        </article>

        <article class="trust-card">
            <div class="trust-card-head">
                <div class="trust-card-icon">
                    <i class="bi bi-info-circle"></i>
                </div>
                <div>
                    <h3>Observações da metodologia</h3>
                    <p>Para evitar confusão na comparação.</p>
                </div>
            </div>

            <ul class="trust-list">
                <li>Os aportes mensais entram no fim de cada mês.</li>
                <li>Não aplicamos inflação nos demais produtos.</li>
                <li>No Tesouro IPCA+, mostramos também o valor líquido em poder de compra de hoje.</li>
                <li>IOF para resgates em menos de 30 dias não foi aplicado.</li>
            </ul>
        </article>
    </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<?php include '../includes/footer.php'; ?>
