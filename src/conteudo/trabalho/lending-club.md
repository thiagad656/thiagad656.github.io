---
titulo: Lending Club Analytics
tipo: Projeto pessoal
onde: Base pública da Lending Club (2007–2018)
periodo: 2026
ordem: 2
lide: >-
  Onde uma carteira de crédito deixou dinheiro na mesa? Em
  [[1,34 milhão|contratos]] de contratos encerrados, o indicador de performance
  ficou em [[4,43%|roa]] ao ano, acima da meta de 4%, com um custo de
  oportunidade de [[US$ 299,5 milhões|custo]] que o projeto propõe recuperar
  em duas fases.
stack:
  - Python
  - Azure Blob Storage
  - PostgreSQL
  - SQL
  - Power BI
  - DAX
links:
  - texto: Repositório no GitHub
    url: https://github.com/thiagad656/lending-club-analytics
  - texto: Metodologia
    url: https://github.com/thiagad656/lending-club-analytics/blob/main/docs/financial_methodology.md
# Quando tiver um print ou GIF do dashboard, descomente e ajuste:
# imagem:
#   src: /img/lending-club-dashboard.png
#   alt: Descreva o que o print mostra.
fontes:
  contratos:
    texto: README do projeto, seção Principais Resultados. Contratos de 2007 a 2018 com ciclo encerrado.
    url: https://github.com/thiagad656/lending-club-analytics#-principais-resultados
  roa:
    texto: Indicador de performance de crédito calculado no projeto, não lucro contábil. Ver a metodologia e a ressalva no fim do case.
    url: https://github.com/thiagad656/lending-club-analytics/blob/main/docs/financial_methodology.md
  custo:
    texto: README do projeto, seção Principais Resultados.
    url: https://github.com/thiagad656/lending-club-analytics#-principais-resultados
  dataset:
    texto: "Kaggle: Lending Club Loan Data, arquivo accepted_2007_to_2018Q4.csv."
    url: https://www.kaggle.com/datasets/wordsforthewise/lending-club
# Enquanto for true, o bloco "O que eu faria diferente" é um rascunho a revisar.
rascunho: true
---

## O problema

Auditar a performance de uma carteira de [[US$ 20,3 bilhões|custo]] originados entre 2007 e 2018 e descobrir onde ela rendeu menos do que poderia. A base pública tem cerca de [[2,2 milhões|dataset]] de linhas.

## O que construí

- **Pipeline do zero.** O CSV bruto vai para o Azure Blob Storage, é lido em streaming por um script Python e carregado no PostgreSQL em blocos de 50 mil linhas.
- **Camada SQL.** Limpeza, filtro dos contratos com ciclo encerrado, correção de todos os valores para dólares de 2018 pelo CPI, e duas variáveis próprias de segmentação: classe de renda e peso da parcela sobre a renda.
- **Power BI.** Modelo em DAX com o indicador de performance, o custo de oportunidade e cenários de reprecificação, num dashboard executivo.
- **Recomendação.** Três ações para um comitê de crédito, apresentadas num pitch executivo em vídeo.

## O que eu faria diferente

Os cálculos estão corretos, mas três escolhas de método inflam a confiança nos números. Primeiro, o "resultado" de um contrato quitado é juros simples sobre o valor cheio pelo prazo inteiro, o que ignora amortização e pré-pagamento, enquanto a perda assume LGD de 100%, sem recuperações. São dois vieses em direções opostas, e chamei o resultado de "lucro" e "ROA", nomes contábeis para um indicador que não é contábil. Segundo, apresentei projeções com precisão de centavos sem faixa de incerteza. Terceiro, calibrei os cortes de segmentação depois de ver os dados e usei linguagem causal para o que é associação. Foi para corrigir isso que comecei um novo projeto, um monitor de inadimplência do crédito no Brasil.
