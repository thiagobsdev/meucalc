<?php include '../includes/header.php'; ?>
<?php include '../includes/sidebar.php'; ?>

<div class="main-content">

    <div class="container">

        <div class="card fintech-card p-4">

            <h3 class="fw-bold mb-4">📊 Calculadora de Juros Compostos</h3>

            <div class="row g-4">

                <div class="col-md-6">
                    <label class="form-label">Valor inicial</label>
                    <input type="number" id="valorInicial" class="form-control" placeholder="Ex: 1000">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Aporte mensal</label>
                    <input type="number" id="aporte" class="form-control" placeholder="Ex: 500">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Taxa de juros (% ao mês)</label>
                    <input type="number" id="taxa" class="form-control" placeholder="Ex: 1">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Tempo (meses)</label>
                    <input type="number" id="tempo" class="form-control" placeholder="Ex: 12">
                </div>

            </div>

            <button class="btn btn-success w-100 mt-4 py-2" onclick="calcular()">
                Calcular investimento
            </button>

            <!-- RESULTADO -->
            <div id="resultado" class="resultado mt-4 d-none"></div>

        </div>

    </div>

</div>

<?php include '../includes/footer.php'; ?>