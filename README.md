# thiagad656.github.io

Site-portfólio de **Thiago da Silva** (Dados / BI), no ar em **https://thiagad656.github.io**.

O site reúne meus cases e projetos de dados, a trajetória, as certificações com link de verificação, os currículos em português e inglês e o contato.

## A ideia: todo número tem fonte

Antes do dashboard, eu pergunto se o dado está certo, e o site segue a mesma regra. Cada número aparece destacado com uma nota numerada (`[1]`, `[2]`…) que leva à evidência dele no fim da página: o repositório, o dataset, a documentação oficial ou, quando o dado é de cliente, a indicação de que ele foi arredondado. As certificações levam ao link oficial de verificação do emissor.

Cada case segue a mesma estrutura: o problema, o que construí e o que eu faria diferente.

## Tecnologia

- [Astro](https://astro.build) 7, gerando um site estático
- Conteúdo em arquivos YAML e Markdown, sem CMS nem banco de dados
- Tema escuro único: fundo tinta azul (`#11151c`) com destaque azul-céu (`#6cc6ff`), contraste dentro do padrão WCAG AA
- Tipografia self-hosted: Newsreader (títulos), Source Sans 3 (texto) e JetBrains Mono (números)
- Publicação no GitHub Pages via GitHub Actions a cada push na `main`

## Rodar localmente

Precisa do Node.js 22 ou mais novo.

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera o site final em dist/
```

## Onde fica cada coisa

| Arquivo | O que controla |
|---|---|
| `src/conteudo/perfil.yaml` | Nome, subtítulo, frase e apresentação da home, contato e vídeo |
| `src/conteudo/trabalho/*.md` | Um arquivo por case ou projeto |
| `src/conteudo/trajetoria.yaml` | Linha do tempo |
| `src/conteudo/certificacoes.yaml` | Certificações e links de verificação |
| `src/conteudo/curriculos.yaml` | Links dos currículos (PDFs em `public/cv/`, sem telefone) |
| `src/styles/global.css` | Paleta (no topo do arquivo) e tipografia |

Campo vazio não aparece no site. O campo `ordem` define a posição dos itens.

## Como marcar um número com fonte

No texto, envolva só o número:

```
Estruturei o catálogo de [[~250|ativos]] ativos.
```

O que vem antes da barra é o que aparece; depois da barra, o id da fonte, que precisa existir no bloco `fontes` do mesmo arquivo:

```yaml
fontes:
  ativos:
    texto: Dado de cliente, arredondado.
    url: https://...   # opcional
```

O site numera as fontes na ordem em que aparecem e repete o número quando a mesma fonte é usada de novo. Se um id não existir, o build falha e diz qual é.

## Adicionar um projeto

Copie um arquivo de `src/conteudo/trabalho/`, renomeie e edite. O nome do arquivo vira o endereço: `meu-projeto.md` → `/trabalho/meu-projeto/`. Enquanto `rascunho: true`, o modo de desenvolvimento mostra um aviso para revisar o texto.

## Publicação

Cada push na `main` dispara o workflow **Publicar site** (`.github/workflows/publicar.yml`), que gera o site e publica no GitHub Pages em cerca de 1 minuto. Para publicar sem push: **Actions > Publicar site > Run workflow**.
