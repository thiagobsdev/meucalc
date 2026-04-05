const toggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

if (toggle) {
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

function calcular() {

    let valorInicial = parseFloat(document.getElementById('valorInicial').value) || 0;
    let aporte = parseFloat(document.getElementById('aporte').value) || 0;
    let taxa = parseFloat(document.getElementById('taxa').value) / 100 || 0;
    let tempo = parseInt(document.getElementById('tempo').value) || 0;

    let montante = valorInicial;

    for (let i = 0; i < tempo; i++) {
        montante = (montante + aporte) * (1 + taxa);
    }

    let totalInvestido = valorInicial + (aporte * tempo);
    let juros = montante - totalInvestido;

    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.classList.remove('d-none');
    resultadoDiv.innerHTML = `
        💰 Valor final: R$ ${montante.toFixed(2)} <br>
        📥 Total investido: R$ ${totalInvestido.toFixed(2)} <br>
        📈 Juros ganhos: R$ ${juros.toFixed(2)}
    `;
}