// Gera a miniatura da primeira página de cada PDF em public/cv/ (usa o pdftoppm, do Poppler).
// Roda sozinho na publicação (GitHub Actions). No seu computador, se o pdftoppm não existir,
// o script avisa e mantém as miniaturas que já estão no repositório.
import { execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, parse } from 'node:path';

const pasta = 'public/cv';
const destino = join(pasta, 'previas');
mkdirSync(destino, { recursive: true });

try {
  execFileSync('pdftoppm', ['-v'], { stdio: 'ignore' });
} catch {
  console.log('pdftoppm não encontrado: mantendo as miniaturas atuais.');
  process.exit(0);
}

for (const arquivo of readdirSync(pasta).filter((f) => f.endsWith('.pdf'))) {
  const saida = join(destino, parse(arquivo).name);
  execFileSync('pdftoppm', ['-jpeg', '-jpegopt', 'quality=85', '-f', '1', '-l', '1', '-scale-to', '640', '-singlefile', join(pasta, arquivo), saida]);
  console.log(`Miniatura gerada: ${saida}.jpg`);
}
