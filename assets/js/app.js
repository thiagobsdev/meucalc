document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initMoneyMasks();
  initCompoundCalculator();
});

function initSidebar() {
  const toggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (!toggle || !sidebar || !overlay) {
    return;
  }

  const mobileQuery = window.matchMedia("(max-width: 991px)");

  const openSidebar = () => {
    if (mobileQuery.matches) {
      sidebar.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.toggle("sidebar-collapsed");
    }
  };

  const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  };

  toggle.addEventListener("click", () => {
    if (mobileQuery.matches) {
      if (sidebar.classList.contains("active")) {
        closeSidebar();
      } else {
        openSidebar();
      }
      return;
    }

    document.body.classList.toggle("sidebar-collapsed");
  });

  overlay.addEventListener("click", closeSidebar);

  window.addEventListener("resize", () => {
    if (!mobileQuery.matches) {
      closeSidebar();
    }
  });
}

function initMoneyMasks() {
  const inputs = document.querySelectorAll(".money-input");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.value = formatCurrencyInput(input.value);
    });

    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        input.value = "";
        return;
      }

      input.value = formatCurrencyInput(input.value);
    });
  });
}

function formatCurrencyInput(value) {
  const digits = String(value).replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const number = Number(digits) / 100;

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatMoneyInputFromNumber(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseBrazilianNumber(value) {
  if (value === null || value === undefined) {
    return 0;
  }

  const normalized = String(value).trim().replace(/\./g, "").replace(",", ".");
  const parsed = parseFloat(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatPercent(value) {
  return (
    Number(value || 0).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%"
  );
}

function formatMultiplier(value) {
  return (
    Number(value || 0).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "x"
  );
}

function formatPlainNumber(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function monthlyRateFromInput(rateValue, rateType) {
  const decimalRate = rateValue / 100;

  if (rateType === "anual") {
    return Math.pow(1 + decimalRate, 1 / 12) - 1;
  }

  return decimalRate;
}

function formatDateForFile(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function buildSimulationFilename(summary, extension) {
  const datePart = formatDateForFile(new Date());
  const monthsPart = summary?.tempo || 0;
  return `simulacao-juros-compostos-${monthsPart}-meses-${datePart}.${extension}`;
}

function downloadBlob(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function buildImpactMessage(summary) {
  if (summary.jurosGanhos <= 0) {
    return `Seu patrimônio estimado pode chegar a ${summary.valorFinalFormatado}. Neste cenário, o crescimento vem principalmente do valor investido.`;
  }

  if (summary.participacaoJurosNoValorFinal >= 50) {
    return `Excelente efeito dos juros compostos: ${summary.jurosGanhosFormatado} do valor final pode vir só dos rendimentos.`;
  }

  if (summary.jurosGanhos >= summary.totalInvestido * 0.5) {
    return `Boa evolução: os juros podem acrescentar ${summary.jurosGanhosFormatado} ao seu patrimônio nesse período.`;
  }

  if (summary.multiplicadorPatrimonio >= 1.5) {
    return `Seu patrimônio estimado pode ficar ${summary.multiplicadorPatrimonioFormatado} maior que o total investido ao longo da simulação.`;
  }

  return `Mantendo esse ritmo, você pode acumular ${summary.valorFinalFormatado} ao final do período informado.`;
}

function buildSimulationSummaryText(summary) {
  const fraseImpacto = buildImpactMessage(summary);

  return `${fraseImpacto} Em ${summary.tempo} meses, investindo ${summary.valorInicialFormatado} inicialmente e ${summary.aporteFormatado} por mês, a uma taxa de ${summary.taxaFormatada}, o valor final estimado pode chegar a ${summary.valorFinalFormatado}. Desse total, ${summary.totalInvestidoFormatado} foram aportados por você e ${summary.jurosGanhosFormatado} podem vir dos juros compostos.`;
}

function buildSimulationShareUrl(values) {
  const url = new URL(window.location.href);
  url.search = "";

  url.searchParams.set(
    "valorInicial",
    Number(values.valorInicial || 0).toFixed(2),
  );
  url.searchParams.set("aporte", Number(values.aporte || 0).toFixed(2));
  url.searchParams.set("taxa", Number(values.taxa || 0).toFixed(2));
  url.searchParams.set(
    "tipoTaxa",
    values.tipoTaxa === "anual" ? "anual" : "mensal",
  );
  url.searchParams.set("tempo", String(parseInt(values.tempo, 10) || 0));

  return url.toString();
}

function readSimulationFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const keys = ["valorInicial", "aporte", "taxa", "tipoTaxa", "tempo"];
  const hasAnyParam = keys.some((key) => params.has(key));

  if (!hasAnyParam) {
    return null;
  }

  const valorInicial = Number.parseFloat(params.get("valorInicial") || "0");
  const aporte = Number.parseFloat(params.get("aporte") || "0");
  const taxa = Number.parseFloat(params.get("taxa") || "0");
  const tempo = Number.parseInt(params.get("tempo") || "0", 10);
  const tipoTaxa = params.get("tipoTaxa") === "anual" ? "anual" : "mensal";

  return {
    valorInicial: Number.isFinite(valorInicial) ? valorInicial : 0,
    aporte: Number.isFinite(aporte) ? aporte : 0,
    taxa: Number.isFinite(taxa) ? taxa : 0,
    tipoTaxa,
    tempo: Number.isFinite(tempo) ? tempo : 0,
  };
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  const success = document.execCommand("copy");
  document.body.removeChild(textarea);

  return success;
}

function initCompoundCalculator() {
  const button = document.getElementById("btnCalcular");
  const exportExcelButton = document.getElementById("btnExportarExcel");
  const exportCsvButton = document.getElementById("btnExportarCsv");
  const copySummaryButton = document.getElementById("btnCopiarResumo");
  const shareSimulationButton = document.getElementById(
    "btnCompartilharSimulacao",
  );
  const summaryOutput = document.getElementById("resumoSimulacao");

  const impactMessageOutput = document.getElementById("resMensagemImpacto");
  const multiplierOutput = document.getElementById("resMultiplicador");
  const interestShareOutput = document.getElementById("resParticipacaoJuros");
  const yearlyAverageOutput = document.getElementById("resMediaAnual");
  const aporteEquivalentOutput = document.getElementById(
    "resEquivalenciaAporte",
  );

  const quickScenarioButtons = document.querySelectorAll(
    ".quick-scenario-button",
  );
  const valorInicialInput = document.getElementById("valorInicial");
  const aporteInput = document.getElementById("aporte");
  const taxaInput = document.getElementById("taxa");
  const tipoTaxaInput = document.getElementById("tipoTaxa");
  const tempoInput = document.getElementById("tempo");

  if (!button) {
    return;
  }

  let chartInstance = null;
  let simulationRows = [];
  let simulationSummary = null;

  const exportToCsv = () => {
    if (!simulationRows.length || !simulationSummary) {
      return;
    }

    const lines = [
      ["Simulação de Juros Compostos", ""],
      ["Valor inicial", simulationSummary.valorInicialFormatado],
      ["Aporte mensal", simulationSummary.aporteFormatado],
      ["Taxa de juros", simulationSummary.taxaFormatada],
      ["Período", `${simulationSummary.tempo} meses`],
      ["Valor final estimado", simulationSummary.valorFinalFormatado],
      ["Total investido", simulationSummary.totalInvestidoFormatado],
      ["Juros ganhos", simulationSummary.jurosGanhosFormatado],
      ["Rentabilidade", simulationSummary.rentabilidadeFormatada],
      [],
      ["Mês", "Saldo inicial", "Aporte", "Juros do mês", "Saldo final"],
    ];

    simulationRows.forEach((row) => {
      lines.push([
        row.mes,
        row.saldoInicialFormatado,
        row.aporteFormatado,
        row.jurosMesFormatado,
        row.saldoFinalFormatado,
      ]);
    });

    const csvContent =
      "\uFEFF" +
      lines.map((line) => line.map(escapeCsvValue).join(";")).join("\n");

    downloadBlob(
      csvContent,
      buildSimulationFilename(simulationSummary, "csv"),
      "text/csv;charset=utf-8;",
    );
  };

  const exportToExcel = () => {
    if (!simulationRows.length || !simulationSummary) {
      return;
    }

    if (typeof XLSX === "undefined") {
      alert("Não foi possível carregar a biblioteca de Excel.");
      return;
    }

    const workbook = XLSX.utils.book_new();

    const summaryData = [
      ["Simulação de Juros Compostos", ""],
      ["Valor inicial", simulationSummary.valorInicial],
      ["Aporte mensal", simulationSummary.aporte],
      ["Taxa de juros (%)", simulationSummary.taxa],
      ["Tipo da taxa", simulationSummary.tipoTaxaLabel],
      ["Período (meses)", simulationSummary.tempo],
      ["Valor final estimado", simulationSummary.valorFinal],
      ["Total investido", simulationSummary.totalInvestido],
      ["Juros ganhos", simulationSummary.jurosGanhos],
      ["Rentabilidade (%)", simulationSummary.rentabilidade],
      ["Link compartilhável", simulationSummary.shareUrl || ""],
    ];

    const evolutionData = [
      ["Mês", "Saldo inicial", "Aporte", "Juros do mês", "Saldo final"],
      ...simulationRows.map((row) => [
        row.mes,
        row.saldoInicial,
        row.aporte,
        row.jurosMes,
        row.saldoFinal,
      ]),
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    const evolutionSheet = XLSX.utils.aoa_to_sheet(evolutionData);

    XLSX.utils.book_append_sheet(workbook, summarySheet, "Resumo");
    XLSX.utils.book_append_sheet(workbook, evolutionSheet, "Evolucao");

    XLSX.writeFile(
      workbook,
      buildSimulationFilename(simulationSummary, "xlsx"),
    );
  };

  const runSimulation = () => {
    const valorInicial = parseBrazilianNumber(valorInicialInput?.value);
    const aporte = parseBrazilianNumber(aporteInput?.value);
    const taxa = parseFloat(taxaInput?.value) || 0;
    const tipoTaxa = tipoTaxaInput?.value || "mensal";
    const tempo = parseInt(tempoInput?.value, 10) || 0;

    if (tempo <= 0) {
      alert("Informe um período válido em meses.");
      return;
    }

    if (valorInicial < 0 || aporte < 0 || taxa < 0) {
      alert("Preencha apenas valores positivos.");
      return;
    }

    const taxaMensal = monthlyRateFromInput(taxa, tipoTaxa);
    let saldo = valorInicial;
    let totalInvestido = valorInicial;

    const labels = [];
    const patrimonioData = [];
    const investidoData = [];
    const tbody = document.getElementById("tabelaEvolucaoBody");
    let rows = "";

    simulationRows = [];

    for (let mes = 1; mes <= tempo; mes++) {
      const saldoInicialMes = saldo;
      const jurosMes = saldoInicialMes * taxaMensal;
      saldo = saldoInicialMes + jurosMes + aporte;
      totalInvestido += aporte;

      labels.push(`${mes}`);
      patrimonioData.push(Number(saldo.toFixed(2)));
      investidoData.push(Number(totalInvestido.toFixed(2)));

      const rowData = {
        mes,
        saldoInicial: Number(saldoInicialMes.toFixed(2)),
        aporte: Number(aporte.toFixed(2)),
        jurosMes: Number(jurosMes.toFixed(2)),
        saldoFinal: Number(saldo.toFixed(2)),
        saldoInicialFormatado: formatMoney(saldoInicialMes),
        aporteFormatado: formatMoney(aporte),
        jurosMesFormatado: formatMoney(jurosMes),
        saldoFinalFormatado: formatMoney(saldo),
      };

      simulationRows.push(rowData);

      rows += `
        <tr>
          <td>${rowData.mes}</td>
          <td>${rowData.saldoInicialFormatado}</td>
          <td>${rowData.aporteFormatado}</td>
          <td>${rowData.jurosMesFormatado}</td>
          <td>${rowData.saldoFinalFormatado}</td>
        </tr>
      `;
    }

    const jurosGanhos = saldo - totalInvestido;
    const rentabilidade =
      totalInvestido > 0 ? (jurosGanhos / totalInvestido) * 100 : 0;
    const tipoTaxaLabel = tipoTaxa === "anual" ? "Ao ano" : "Ao mês";
    const participacaoJurosNoValorFinal =
      saldo > 0 ? (jurosGanhos / saldo) * 100 : 0;
    const multiplicadorPatrimonio =
      totalInvestido > 0 ? saldo / totalInvestido : 0;
    const mediaInvestidaAno = tempo > 0 ? totalInvestido / (tempo / 12) : 0;
    const equivalenciaAporte = aporte > 0 ? jurosGanhos / aporte : 0;

    simulationSummary = {
      valorInicial: Number(valorInicial.toFixed(2)),
      aporte: Number(aporte.toFixed(2)),
      taxa: Number(taxa.toFixed(2)),
      tipoTaxa,
      tipoTaxaLabel,
      tempo,
      valorFinal: Number(saldo.toFixed(2)),
      totalInvestido: Number(totalInvestido.toFixed(2)),
      jurosGanhos: Number(jurosGanhos.toFixed(2)),
      rentabilidade: Number(rentabilidade.toFixed(2)),
      participacaoJurosNoValorFinal: Number(
        participacaoJurosNoValorFinal.toFixed(2),
      ),
      multiplicadorPatrimonio: Number(multiplicadorPatrimonio.toFixed(2)),
      mediaInvestidaAno: Number(mediaInvestidaAno.toFixed(2)),
      equivalenciaAporte: Number(equivalenciaAporte.toFixed(1)),
      valorInicialFormatado: formatMoney(valorInicial),
      aporteFormatado: formatMoney(aporte),
      taxaFormatada: `${formatPercent(taxa)} ${tipoTaxaLabel}`,
      valorFinalFormatado: formatMoney(saldo),
      totalInvestidoFormatado: formatMoney(totalInvestido),
      jurosGanhosFormatado: formatMoney(jurosGanhos),
      rentabilidadeFormatada: formatPercent(rentabilidade),
      participacaoJurosNoValorFinalFormatada: formatPercent(
        participacaoJurosNoValorFinal,
      ),
      multiplicadorPatrimonioFormatado: formatMultiplier(
        multiplicadorPatrimonio,
      ),
      mediaInvestidaAnoFormatada: formatMoney(mediaInvestidaAno),
      equivalenciaAporteFormatada:
        aporte > 0
          ? `${formatPlainNumber(equivalenciaAporte)} meses`
          : "Sem aporte mensal",
    };

    simulationSummary.resumoTexto =
      buildSimulationSummaryText(simulationSummary);

    simulationSummary.shareUrl = buildSimulationShareUrl({
      valorInicial: simulationSummary.valorInicial,
      aporte: simulationSummary.aporte,
      taxa: simulationSummary.taxa,
      tipoTaxa: simulationSummary.tipoTaxa,
      tempo: simulationSummary.tempo,
    });

    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, "", simulationSummary.shareUrl);
    }

    document.getElementById("resValorFinal").textContent =
      simulationSummary.valorFinalFormatado;
    document.getElementById("resTotalInvestido").textContent =
      simulationSummary.totalInvestidoFormatado;
    document.getElementById("resJurosGanhos").textContent =
      simulationSummary.jurosGanhosFormatado;
    document.getElementById("resRentabilidade").textContent =
      simulationSummary.rentabilidadeFormatada;

    if (impactMessageOutput) {
      impactMessageOutput.textContent = buildImpactMessage(simulationSummary);
    }

    if (multiplierOutput) {
      multiplierOutput.textContent =
        simulationSummary.multiplicadorPatrimonioFormatado;
    }

    if (interestShareOutput) {
      interestShareOutput.textContent =
        simulationSummary.participacaoJurosNoValorFinalFormatada;
    }

    if (yearlyAverageOutput) {
      yearlyAverageOutput.textContent =
        simulationSummary.mediaInvestidaAnoFormatada;
    }

    if (aporteEquivalentOutput) {
      aporteEquivalentOutput.textContent =
        simulationSummary.equivalenciaAporteFormatada;
    }

    if (summaryOutput) {
      summaryOutput.textContent = simulationSummary.resumoTexto;
    }

    if (tbody) {
      tbody.innerHTML = rows;
    }

    document.getElementById("resultado")?.classList.remove("hidden");

    const canvas = document.getElementById("graficoEvolucao");

    if (!canvas || typeof Chart === "undefined") {
      return;
    }

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Patrimônio acumulado",
            data: patrimonioData,
            tension: 0.28,
            fill: true,
            borderColor: "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.22)",
            pointBackgroundColor: "#38bdf8",
            pointBorderColor: "#38bdf8",
            pointRadius: 3,
            pointHoverRadius: 5,
            borderWidth: 2,
          },
          {
            label: "Total investido",
            data: investidoData,
            tension: 0.28,
            fill: false,
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.12)",
            pointBackgroundColor: "#22c55e",
            pointBorderColor: "#22c55e",
            pointRadius: 3,
            pointHoverRadius: 5,
            borderWidth: 2,
            borderDash: [8, 5],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "#e2e8f0",
            },
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                ` ${context.dataset.label}: ${formatMoney(Number(context.raw || 0))}`,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#94a3b8",
            },
            grid: {
              color: "rgba(148, 163, 184, 0.08)",
            },
          },
          y: {
            ticks: {
              color: "#94a3b8",
              callback: (value) => formatMoney(Number(value)),
            },
            grid: {
              color: "rgba(148, 163, 184, 0.08)",
            },
          },
        },
      },
    });
  };

  if (exportCsvButton) {
    exportCsvButton.addEventListener("click", exportToCsv);
  }

  if (exportExcelButton) {
    exportExcelButton.addEventListener("click", exportToExcel);
  }

  if (copySummaryButton) {
    copySummaryButton.addEventListener("click", async () => {
      if (!simulationSummary?.resumoTexto) {
        return;
      }

      const originalHtml = copySummaryButton.innerHTML;

      try {
        await copyTextToClipboard(simulationSummary.resumoTexto);
        copySummaryButton.classList.add("action-button-success");
        copySummaryButton.innerHTML = '<i class="bi bi-check2"></i> Copiado';
      } catch (error) {
        alert("Não foi possível copiar o resumo.");
      }

      setTimeout(() => {
        copySummaryButton.classList.remove("action-button-success");
        copySummaryButton.innerHTML = originalHtml;
      }, 1800);
    });
  }

  if (shareSimulationButton) {
    shareSimulationButton.addEventListener("click", async () => {
      if (!simulationSummary?.shareUrl) {
        runSimulation();
      }

      if (!simulationSummary?.shareUrl) {
        return;
      }

      const originalHtml = shareSimulationButton.innerHTML;

      try {
        if (navigator.share) {
          await navigator.share({
            title: "Simulação de juros compostos",
            text: "Veja esta simulação:",
            url: simulationSummary.shareUrl,
          });

          shareSimulationButton.classList.add("action-button-success");
          shareSimulationButton.innerHTML =
            '<i class="bi bi-check2"></i> Link compartilhado';
        } else {
          await copyTextToClipboard(simulationSummary.shareUrl);
          shareSimulationButton.classList.add("action-button-success");
          shareSimulationButton.innerHTML =
            '<i class="bi bi-check2"></i> Link copiado';
        }
      } catch (error) {
        if (error?.name !== "AbortError") {
          alert("Não foi possível compartilhar a simulação.");
        }
      }

      setTimeout(() => {
        shareSimulationButton.classList.remove("action-button-success");
        shareSimulationButton.innerHTML = originalHtml;
      }, 1800);
    });
  }

  button.addEventListener("click", runSimulation);

  if (quickScenarioButtons.length) {
    quickScenarioButtons.forEach((scenarioButton) => {
      scenarioButton.addEventListener("click", () => {
        quickScenarioButtons.forEach((item) =>
          item.classList.remove("is-active"),
        );
        scenarioButton.classList.add("is-active");

        if (valorInicialInput) {
          valorInicialInput.value = formatMoneyInputFromNumber(
            scenarioButton.dataset.valorInicial || 0,
          );
        }

        if (aporteInput) {
          aporteInput.value = formatMoneyInputFromNumber(
            scenarioButton.dataset.aporte || 0,
          );
        }

        if (taxaInput) {
          taxaInput.value = scenarioButton.dataset.taxa || "";
        }

        if (tipoTaxaInput) {
          tipoTaxaInput.value = scenarioButton.dataset.tipoTaxa || "mensal";
        }

        if (tempoInput) {
          tempoInput.value = scenarioButton.dataset.tempo || "";
        }

        runSimulation();
      });
    });
  }

  const sharedValues = readSimulationFromUrl();

  if (sharedValues) {
    if (valorInicialInput) {
      valorInicialInput.value = formatMoneyInputFromNumber(
        sharedValues.valorInicial,
      );
    }

    if (aporteInput) {
      aporteInput.value = formatMoneyInputFromNumber(sharedValues.aporte);
    }

    if (taxaInput) {
      taxaInput.value = sharedValues.taxa;
    }

    if (tipoTaxaInput) {
      tipoTaxaInput.value = sharedValues.tipoTaxa;
    }

    if (tempoInput) {
      tempoInput.value = sharedValues.tempo > 0 ? sharedValues.tempo : "";
    }

    if (sharedValues.tempo > 0) {
      runSimulation();
    }
  }
}
