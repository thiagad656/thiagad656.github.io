# thiagad656.github.io

Site-portfólio de Thiago da Silva, publicado em **https://thiagad656.github.io**.

Feito com [Astro](https://astro.build) e publicado no GitHub Pages por GitHub Actions. Todo o conteúdo fica em arquivos de texto em `src/conteudo/`: para mudar o site, edite esses arquivos e faça push na `main`.

## Rodar no seu computador

Precisa do Node.js 22 ou mais novo.

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera o site final em dist/
```

## Onde fica cada coisa

| Arquivo | O que controla |
|---|---|
| `src/conteudo/perfil.yaml` | Nome, cargo, frase e apresentação da home, contato, vídeo |
| `src/conteudo/trabalho/*.md` | Um arquivo por case ou projeto |
| `src/conteudo/trajetoria.yaml` | Linha do tempo |
| `src/conteudo/certificacoes.yaml` | Certificações e links de verificação |
| `src/conteudo/curriculos.yaml` | Links dos currículos (os PDFs ficam em `public/cv/`, sem telefone) |
| `src/styles/global.css` | Paleta (no topo do arquivo) e tipografia |

Campo vazio não aparece no site.

## Todo número tem fonte

Todo número do site aponta para a evidência dele. No texto, marque o número assim:

```
Estruturei o catálogo de [[~250|ativos]] ativos.
```

O que vem antes da barra é o que aparece; depois da barra, o id da fonte. O id precisa existir no bloco `fontes` do mesmo arquivo:

```yaml
fontes:
  ativos:
    texto: Dado de cliente, arredondado.
    url: https://...   # opcional
```

O site numera as fontes na ordem em que aparecem e lista tudo no fim da página. Se um id não existir, o build falha e avisa qual é.

## Adicionar um projeto

Copie um arquivo de `src/conteudo/trabalho/`, renomeie (o nome vira o endereço: `meu-projeto.md` → `/trabalho/meu-projeto/`) e edite. O campo `ordem` define a posição na home.

## Antes do lançamento

- [ ] `perfil.yaml`: id do vídeo do pitch em inglês
- [ ] `certificacoes.yaml`: links de verificação
- [ ] Revisar o "O que eu faria diferente" dos dois cases e trocar `rascunho: true` para `false`
- [ ] Lending Club: print ou GIF do dashboard (opcional)

## Publicação

Na primeira vez: em **Settings > Pages**, escolha **Source: GitHub Actions**. Depois disso, cada push na `main` publica sozinho em cerca de 1 minuto.
