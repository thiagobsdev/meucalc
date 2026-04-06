<?php
$scriptDir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
$baseUrl = preg_replace('#/pages$#', '', $scriptDir);
$baseUrl = rtrim($baseUrl, '/');

$pageTitle = 'MeuCalc - Calculadoras Financeiras Online';
$pageDescription = 'Simule investimentos e entenda os juros compostos com a calculadora financeira online do MeuCalc.';
$canonicalUrl = 'https://meucalc.com.br/';

if (isset($currentPage) && $currentPage === 'juros') {
    $pageTitle = 'Calculadora de Juros Compostos Online | MeuCalc';
    $pageDescription = 'Calcule juros compostos com aporte mensal, taxa mensal ou anual e veja a evolução do investimento no MeuCalc.';
    $canonicalUrl = 'https://meucalc.com.br/pages/calculadora.php';
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?></title>
    <meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">
    <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8') ?>">

    <meta name="robots" content="index, follow">
    <meta name="author" content="MeuCalc">

    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:url" content="<?= htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:site_name" content="MeuCalc">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="<?= $baseUrl ?>/assets/style.css">
</head>
<body>
<header class="topbar">
    <div class="topbar-left">
        <button id="menu-toggle" class="menu-toggle" type="button" aria-label="Abrir menu">
            <i class="bi bi-list"></i>
        </button>

        <a href="<?= $baseUrl ?>/index.php" class="brand">
            <div class="brand-icon">
                <i class="bi bi-graph-up-arrow"></i>
            </div>
            <div class="brand-text">
                <span class="brand-title">MeuCalc</span>
                <span class="brand-subtitle">Calculadoras financeiras</span>
            </div>
        </a>
    </div>

    <div class="topbar-right">
        <span class="topbar-badge">Beta</span>
    </div>
</header>