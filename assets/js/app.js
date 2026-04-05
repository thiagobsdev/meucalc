const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const body = document.body;

function isMobile() {
    return window.innerWidth <= 991;
}

function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('no-scroll');
}

function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll');
}

function toggleDesktopSidebar() {
    body.classList.toggle('sidebar-collapsed');
}

if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();

        if (isMobile()) {
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        } else {
            toggleDesktopSidebar();
        }
    });

    overlay.addEventListener('click', function () {
        closeSidebar();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });

    window.addEventListener('resize', function () {
        if (!isMobile()) {
            closeSidebar();
        }
    });
}

function formatBRL(value) {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calcular() {
    const valorInicial = parseFloat(document.getElementById('valorInicial')?.value) || 0;
    const aporte = parseFloat(document.getElementById('aporte')?.value) || 0;
    const taxa = (parseFloat(document.getElementById('taxa')?.value) || 0) / 100;
    const tempo = parseInt(document.getElementById('tempo')?.value) || 0;

    if (tempo <= 0 || taxa <= 0) {
        alert('Preencha a taxa e o período corretamente.');
        return;
    }

    let montante = valorInicial;

    for (let i = 0; i < tempo; i++) {
        montante = (montante + aporte) * (1 + taxa);
    }

    const totalInvestido = valorInicial + (aporte * tempo);
    const juros = montante - totalInvestido;

    const resultado = document.getElementById('resultado');

    if (resultado) {
        resultado.classList.remove('hidden');
        resultado.innerHTML = `
            <div class="result-box">
                <div class="result-top">
                    <span class="result-label">Valor final estimado</span>
                    <h3 class="result-value">R$ ${formatBRL(montante)}</h3>
                </div>

                <div class="result-grid">
                    <div class="result-card">
                        <span class="result-card-label">Total investido</span>
                        <strong class="result-card-value">R$ ${formatBRL(totalInvestido)}</strong>
                    </div>

                    <div class="result-card">
                        <span class="result-card-label">Juros ganhos</span>
                        <strong class="result-card-value positive">R$ ${formatBRL(juros)}</strong>
                    </div>
                </div>
            </div>
        `;

        resultado.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const tempo = document.getElementById('tempo');
        if (tempo) {
            calcular();
        }
    }
});