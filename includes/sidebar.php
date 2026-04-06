<?php
if (!isset($currentPage)) {
    $currentPage = '';
}
?>
<div class="app-layout">
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <i class="bi bi-calculator-fill"></i>
            </div>
            <div>
                <div class="sidebar-title">MeuCalc</div>
                <div class="sidebar-subtitle">Planejamento financeiro</div>
            </div>
        </div>

        <nav class="sidebar-nav">
            <div class="sidebar-section">Principal</div>

            <a href="<?= $baseUrl ?>/" class="sidebar-link <?= $currentPage === 'home' ? 'active' : '' ?>">
                <i class="bi bi-house-door"></i>
                <span>Início</span>
            </a>

            <a href="<?= $baseUrl ?>/pages/calculadora.php" class="sidebar-link <?= $currentPage === 'juros' ? 'active' : '' ?>">
                <i class="bi bi-bar-chart-line"></i>
                <span>Juros compostos</span>
            </a>

            <div class="sidebar-section">Em breve</div>

            <div class="sidebar-link disabled">
                <i class="bi bi-bank"></i>
                <span>Financiamento</span>
                <small>Em breve</small>
            </div>

            <div class="sidebar-link disabled">
                <i class="bi bi-cash-coin"></i>
                <span>Empréstimos</span>
                <small>Em breve</small>
            </div>

            <div class="sidebar-link disabled">
                <i class="bi bi-piggy-bank"></i>
                <span>Aposentadoria</span>
                <small>Em breve</small>
            </div>
        </nav>
    </aside>

    <div class="sidebar-overlay" id="sidebar-overlay"></div>

    <main class="main-content">