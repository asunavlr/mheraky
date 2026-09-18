import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP, prefersReduced, entrar, paralaxe } from "../lib/anim.js";
import { POSTS } from "../componentes/Post.jsx";
import { MARCA, contato } from "../dados.js";

/* ============================================================
   O FEED — as peças dela, num carrossel que se arrasta.

   O QUE SAIU E POR QUÊ. Aqui havia uma grade de quatro molduras vazias
   com "vaga 01" escrito dentro. Era honesto e era ruim: numa página de
   social media, a seção que mostra o trabalho não pode ser a mais vazia
   da página. Quem vende conteúdo visual precisa mostrar conteúdo
   visual, e "ainda não tenho" é uma resposta que o visitante não
   compra.

   O QUE DESTRAVOU: o feed dela não é fotográfico. As sete publicações
   são desenhos tipográficos, e disso eu tenho tudo o que importa — as
   frases, a cartela, a família e o monograma. As peças aqui são
   RECONSTRUÇÕES das artes dela, e cada legenda diz isso.

   POR QUE CARROSSEL E NÃO GRADE. Porque é o gesto do Instagram. A
   pessoa que abre este site passa o dia arrastando carrossel; a seção
   que mostra o feed dela funcionar do mesmo jeito é a única que imita
   o produto em vez de descrevê-lo. E uma grade de cinco peças grandes
   ocuparia três telas de rolagem para dizer o que o carrossel diz em
   uma.

   O CONTADOR ao lado do título não é enfeite: carrossel esconde quanto
   tem, e a primeira pergunta de quem arrasta é "quantos são?".
   ============================================================ */

/* o Carrossel é pesado e só aparece no meio da página: importar por
   caminho normal mantém tudo num pacote só, que é o certo aqui — a
   página inteira tem 380kB e dividir isso em pedaços renderia menos do
   que o custo de uma segunda viagem de rede */
import Carrossel from "../componentes/Carrossel.jsx";

export default function Feed() {
  const raiz = useRef(null);
  const [foco, setFoco] = useState(0);

  /* `useCallback` porque o `Carrossel` guarda esta função num efeito:
     sem ela estável, o efeito reagenda a cada render e o contador
     entra em laço */
  const aoTrocar = useCallback((i) => setFoco(i), []);

  useGSAP(
    () => {
      entrar(".fd-cabeca > *", raiz.current);
      if (prefersReduced()) return;

      /* o trilho inteiro entra deslizando da direita, uma vez: é a
         demonstração do gesto antes de a pessoa tentar */
      gsap.from(".fd-carrossel", {
        autoAlpha: 0,
        x: 90,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".fd-carrossel", start: "top 82%", once: true },
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => paralaxe(".fd-fundo", 110, raiz.current));
      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section id="trabalhos" ref={raiz} className="secao overflow-hidden bg-uva !px-0">
      {/* a mancha de luz anda ao contrário da página: é ela que impede o
          fundo de uva de ficar chapado atrás de cinco cartões */}
      <div
        className="fd-fundo pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(45% 60% at 18% 20%, rgba(192,168,240,0.13), transparent 70%), radial-gradient(40% 55% at 85% 70%, rgba(192,168,240,0.09), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-[82rem] px-[var(--pad)]">
        <div className="fd-cabeca flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="etiqueta">o feed</span>
            <h2 className="titulo mt-6 max-w-[16ch]">
              O que eu publico é a amostra do que eu faço
            </h2>
          </div>

          <div className="flex items-baseline gap-4">
            <span
              className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-none text-lavanda"
              style={{ fontWeight: 500 }}
            >
              {String(foco + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-[1.1rem] text-nata-fraca">
              / {String(POSTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <div className="fd-carrossel relative mt-14">
        <Carrossel
          aoTrocar={aoTrocar}
          itens={POSTS.map(({ id, legenda, Peca }) => ({
            id,
            legenda,
            render: (emFoco) => (
              <figure>
                <div
                  className="aspect-[4/5] overflow-hidden border border-lavanda/20"
                  /* `containerType` faz as medidas internas das peças
                     serem por cento da LARGURA DO CARTÃO: a mesma arte
                     fica certa num cartão de 22rem e num de 78vw, com o
                     tipo sempre na mesma proporção do quadro */
                  style={{ containerType: "inline-size" }}
                >
                  <Peca />
                </div>
                <figcaption
                  className={`mt-4 flex items-baseline justify-between gap-4 text-[0.78rem] transition-colors duration-500 ${emFoco ? "text-nata" : "text-nata-fraca/60"}`}
                >
                  <span>{legenda}</span>
                  {/* a etiqueta que separa reconstrução de original: sem
                      ela, a seção estaria fazendo exatamente o que a
                      seção do preço acusa duas telas acima */}
                  <span className="shrink-0 uppercase tracking-[0.18em] text-lavanda-fraca">
                    recriação
                  </span>
                </figcaption>
              </figure>
            ),
          }))}
        />
      </div>

      <div className="relative mx-auto mt-12 max-w-[82rem] px-[var(--pad)]">
        <p className="max-w-[58ch] border-l border-lavanda/40 pl-5 text-[0.92rem] leading-relaxed text-nata-fraca">
          As peças acima são recriações das publicações do perfil, montadas com
          as frases originais. As artes em arquivo entram aqui assim que ela
          mandar. O feed inteiro está no{" "}
          <a
            className="border-b border-lavanda/40 pb-0.5 text-lavanda transition-colors hover:border-lavanda"
            href={`https://instagram.com/${MARCA.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{MARCA.instagram}
          </a>
          , e o primeiro trabalho de cliente pode ser o seu:{" "}
          <a
            className="border-b border-lavanda/40 pb-0.5 text-lavanda transition-colors hover:border-lavanda"
            href={contato("Oi! Vi o site e quero conversar.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            me chama
          </a>
          .
        </p>
      </div>
    </section>
  );
}
