---
titulo: "Gestão de ativos de TI: do papel ao painel"
tipo: Case profissional
onde: T-Systems do Brasil, para um cliente industrial (anonimizado)
periodo: out/2025 – atual
ordem: 1
lide: >-
  Um cliente com 5 unidades controlava o hardware em planilhas manuais e
  anotações em papel. Estruturei o catálogo de [[~250|ativos]] ativos,
  automatizei a coleta e passei a registrar [[2.400+|movimentacoes]] movimentações,
  com um painel Power BI que se atualiza [[8 vezes|atualizacoes]] por dia.
stack:
  - Microsoft Forms
  - Power Automate
  - Power Query
  - Power BI
  - SharePoint
fontes:
  ativos:
    texto: Dado de cliente, arredondado. 247 ativos patrimoniados (204 celulares; 43 notebooks, tablets e desktops) em novembro de 2026.
  movimentacoes:
    texto: Dado de cliente, arredondado. Registros de entradas, saídas e descartes até novembro de 2026.
  atualizacoes:
    texto: "Microsoft Learn: datasets em capacidade compartilhada do Power BI têm até 8 atualizações agendadas por dia."
    url: https://learn.microsoft.com/power-bi/connect-data/refresh-data
  pendencias:
    texto: Dado de cliente, contagem aproximada até novembro de 2026.
# Enquanto for true, o bloco "O que eu faria diferente" é um rascunho a revisar.
rascunho: true
---

## O problema

O cliente tinha 1 escritório e 4 plantas fabris, e nenhuma visão consolidada do hardware: notebooks, celulares, tablets e periféricos. As quantidades ficavam em planilhas preenchidas à mão, e as movimentações eram anotadas em papel. Não havia processo nem histórico anterior.

## O que construí

- **Taxonomia antes de tudo.** Catalogação do parque com categorias, subcategorias e status padronizados. Itens com etiqueta de patrimônio (celulares, notebooks) são rastreados um a um; periféricos são controlados por quantidade, por modelo. O nível de controle acompanha o custo e o risco de cada item.
- **Validação na entrada.** A coleta passou para o Microsoft Forms com listas fixas de opções: ninguém digita o nome de um modelo, só escolhe. Os fluxos do Power Automate são separados por localidade, para simplificar a lógica e evitar várias pessoas editando a mesma planilha.
- **Uma base, várias fontes.** O Power Query une as planilhas de cada localidade e alimenta o painel do ciclo de vida dos ativos, com KPIs de conformidade para a liderança e o cliente.
- **Uma segunda fonte da verdade.** Auditorias cruzadas entre CMDB, Active Directory, Dynamics e o MDM. Quando o MDM tinha pendência de inventário, a minha base servia para reconciliar: foram mais de [[30|pendencias]] pendências resolvidas assim.
- **Atualização na medida certa.** O painel atualiza 8 vezes por dia em horário comercial, o limite da capacidade compartilhada do Power BI. Movimentação de hardware não pede tempo real: um atraso de cerca de 2 horas não muda nenhuma decisão de inventário.

Por ser trabalho para cliente, não há prints nem nomes neste case. Os números estão arredondados.

## O que eu faria diferente

As listas fixas do Forms garantiam nomes padronizados, e separei as planilhas por localidade para evitar conflito de edição. O que eu não previ: além de registrar cada movimento, os fluxos atualizavam a quantidade do item de estoque no lugar. Dois fluxos simultâneos liam o mesmo valor e um sobrescrevia o outro, gerando divergência no saldo, mesmo com o log correto. Hoje eu trataria o log de movimentos como a única fonte da verdade e calcularia o saldo a partir dele, como um livro-razão. E centralizaria o catálogo numa lista do SharePoint alimentando todos os formulários, em vez de cadastrar cada modelo novo em cada formulário à mão.
