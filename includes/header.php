<?php
$scriptDir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
$baseUrl = preg_replace('#/pages$#', '', $scriptDir);
$baseUrl = rtrim($baseUrl, '/');
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MeuCalc</title>

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