<?php
$currentPage = 'home';
include 'includes/header.php';
include 'includes/sidebar.php';
?>

<section class="hero">
    <div class="hero-badge">
        <i class="bi bi-lightning-charge-fill"></i>
        Simulador gratuito
    </div>

    <div class="hero-content">
        <div class="hero-text">
            <h1 class="hero-title">
                Faça seu dinheiro
                <span>trabalhar por você TESTE DE DEPLOY</span>
            </h1>

            <p class="hero-subtitle">
                Simule investimentos, entenda o efeito dos juros compostos
                e tome decisões financeiras com mais clareza.
            </p>

            <a href="<?= $baseUrl ?>/pages/calculadora.php" class="hero-button">
                <i class="bi bi-play-fill"></i>
                Começar agora
            </a>
        </div>

        <div class="hero-stat">
            <strong>+R$</strong>
            <span>Visual moderno e cálculos rápidos</span>
        </div>
    </div>
</section>

<section class="cards-grid">
    <article class="info-card">
        <i class="bi bi-graph-up-arrow"></i>
        <h3>Juros compostos</h3>
        <p>Veja como o capital cresce com o tempo e entenda o impacto dos aportes mensais.</p>
    </article>

    <article class="info-card">
        <i class="bi bi-calendar-check"></i>
        <h3>Projeção simples</h3>
        <p>Faça simulações rápidas para comparar cenários e visualizar resultados futuros.</p>
    </article>

    <article class="info-card">
        <i class="bi bi-phone"></i>
        <h3>Responsivo</h3>
        <p>Use no computador ou no celular com sidebar funcional e navegação mais limpa.</p>
    </article>
</section>

<section class="cta-box">
    <div>
        <h4>Pronto para começar?</h4>
        <p>Acesse a calculadora de juros compostos e faça sua primeira simulação.</p>
    </div>

    <a href="<?= $baseUrl ?>/pages/calculadora.php" class="cta-button">
        Ver calculadora
        <i class="bi bi-arrow-right"></i>
    </a>
</section>

<?php include 'includes/footer.php'; ?>