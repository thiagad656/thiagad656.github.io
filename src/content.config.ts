import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// Uma fonte é a evidência de um número ou afirmação do site.
// `url` é opcional: dado de cliente, por exemplo, não tem link público.
const fonte = z.object({
  texto: z.string(),
  url: z.string().optional(),
});

const fontes = z.record(z.string(), fonte).default({});

const perfil = defineCollection({
  loader: file('src/conteudo/perfil.yaml'),
  schema: z.object({
    nome: z.string(),
    cargo: z.string(),
    frase: z.string(),
    apresentacao: z.string(),
    fontes,
    email: z.string().default(''),
    linkedin: z.string().default(''),
    github: z.string().default(''),
    video: z
      .object({
        youtubeId: z.string(),
        titulo: z.string(),
        legenda: z.string(),
      })
      .optional(),
  }),
});

const trabalho = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/conteudo/trabalho' }),
  schema: z.object({
    titulo: z.string(),
    tipo: z.string(),
    onde: z.string(),
    periodo: z.coerce.string(),
    ordem: z.number(),
    lide: z.string(),
    stack: z.array(z.string()),
    links: z.array(z.object({ texto: z.string(), url: z.string() })).default([]),
    imagem: z.object({ src: z.string(), alt: z.string() }).optional(),
    fontes,
    rascunho: z.boolean().default(false),
  }),
});

const trajetoria = defineCollection({
  loader: file('src/conteudo/trajetoria.yaml'),
  schema: z.object({
    periodo: z.coerce.string(),
    titulo: z.string(),
    onde: z.string(),
    ordem: z.number(),
  }),
});

const certificacoes = defineCollection({
  loader: file('src/conteudo/certificacoes.yaml'),
  schema: z.object({
    nome: z.string(),
    emissor: z.string(),
    ordem: z.number().default(99),
    verificacao: z.string().default(''),
  }),
});

const curriculos = defineCollection({
  loader: file('src/conteudo/curriculos.yaml'),
  schema: z.object({
    rotulo: z.string(),
    url: z.string().default(''),
    ordem: z.number().default(99),
  }),
});

export const collections = { perfil, trabalho, trajetoria, certificacoes, curriculos };
