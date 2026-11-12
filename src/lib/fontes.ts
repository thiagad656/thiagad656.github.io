// Sistema "todo número tem fonte".
//
// No texto, marque um dado assim:  [[~250 ativos|ativos]]
// O que vem antes da barra é o texto que aparece; depois da barra, o id da fonte.
// O id precisa existir no bloco `fontes` do mesmo arquivo.
//
// Cada página cria um caderno de fontes. Os dados recebem números na ordem em
// que aparecem, e o componente <Fontes> lista tudo no fim da página.

export type Fonte = { texto: string; url?: string };

export type Nota = Fonte & { numero: number };

export function criarCaderno() {
  const notas: Nota[] = [];
  const vistos = new Map<string, number>();

  function marcar(texto: string, fontes: Record<string, Fonte>, escopo: string): string {
    return texto.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (_, rotulo: string, id: string) => {
      const fonte = fontes[id.trim()];
      if (!fonte) {
        throw new Error(
          `Fonte "${id}" usada em "${escopo}" não existe. Adicione-a ao bloco "fontes" desse arquivo.`,
        );
      }
      // Fontes com o mesmo texto e link recebem o mesmo número, mesmo vindas de arquivos diferentes.
      const chave = `${fonte.texto}|${fonte.url ?? ''}`;
      let numero = vistos.get(chave);
      const primeira = numero === undefined;
      if (numero === undefined) {
        numero = notas.length + 1;
        vistos.set(chave, numero);
        notas.push({ ...fonte, numero });
      }
      const atributoId = primeira ? ` id="ref-${numero}"` : '';
      return (
        `<span class="dado">${rotulo.trim()}</span>` +
        `<a class="ref" href="#fonte-${numero}"${atributoId} aria-label="Fonte ${numero}">[${numero}]</a>`
      );
    });
  }

  return { marcar, notas };
}
