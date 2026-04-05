<?php
$currentPage = 'juros';
include '../includes/header.php';
include '../includes/sidebar.php';
?>

<div class="page-header">
    <h1>Juros Compostos</h1>
    <p>Simule o crescimento do seu investimento ao longo do tempo.</p>
</div>

<div class="calc-wrapper">
    <div class="calc-card">
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label" for="valorInicial">Valor inicial</label>
                <div class="input-wrap prefix">
                    <span class="input-prefix">R$</span>
                    <input type="number" id="valorInicial" class="form-control" placeholder="1000">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="aporte">Aporte mensal</label>
                <div class="input-wrap prefix">
                    <span class="input-prefix">R$</span>
                    <input type="number" id="aporte" class="form-control" placeholder="500">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="taxa">Taxa de juros</label>
                <div class="input-wrap suffix">
                    <span class="input-suffix">% a.m.</span>
                    <input type="number" id="taxa" class="form-control" placeholder="1.0" step="0.01">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="tempo">Período</label>
                <div class="input-wrap suffix">
                    <span class="input-suffix">meses</span>
                    <input type="number" id="tempo" class="form-control" placeholder="12">
                </div>
            </div>
        </div>

        <button type="button" class="calc-button" onclick="calcular()">
            <i class="bi bi-calculator"></i>
            Calcular investimento
        </button>

        <div id="resultado" class="hidden"></div>
    </div>
</div>

<?php include '../includes/footer.php'; ?>