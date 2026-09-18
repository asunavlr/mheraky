import { useRef } from "react";
import { gsap, useGSAP, prefersReduced, entrar, paralaxe } from "../lib/anim.js";
import { TRABALHOS, MARCA, FRASES, contato } from "../dados.js";
import Marca from "../componentes/Marca.jsx";

/* ============================================================
   TRABALHOS — e a seção assume que está vazia.

   O perfil tem sete publicações, todas de conteúdo próprio: não há peça
   de cliente pública. Encher com banco de imagem responderia mal, na
   cara do visitante, a pergunta que a página faz três telas acima sobre
   investir na própria marca — a autoridade construída até aqui cairia
   de uma vez.

   O LUGAR VAZIO É DESENHADO, e não é uma caixa cinza com "em breve":
   moldura de filete, o monograma apagado no centro e o tipo de peça na
   base. Lê-se como prancha de diagramação à espera da arte, que é
   honesto sobre o que é.

   E HÁ UM GANHO: "o portfólio começa agora" é convite. Quem contrata
   quem está começando sabe que está contratando quem está começando;
   fingir dez anos de casa só adia a descoberta.

   COMO PREENCHER: em `dados.js`, cada item de `TRABALHOS` tem
   `foto: null`. Pondo o caminho, o cartão vira a peça e o aviso do fim
   some sozinho quando todos tiverem foto.
   ============================================================ */

export default function Trabalhos() {
  const raiz = useRef(null);
  const vazio = TRABALHOS.every((t) => !t.foto);

  useGSAP(
    () => {
      entrar(".tb-cabeca > *", raiz.current);
      entrar(".tb-item", ".tb-grade", { start: "top 84%" });
      if (prefersReduced()) return;

      /* só em tela larga: no celular a coluna é uma só, e deslocar cada
         peça ali só abre vãos irregulares entre elas */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => paralaxe(".tb-desloca", -50, raiz.current));
      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section id="trabalhos" ref={raiz} className="secao overflow-hidden bg-uva">
      <div className="mx-auto max-w-[82rem]">
        <div className="tb-cabeca max-w-[46rem]">
          <span className="etiqueta">trabalhos</span>
          <h2 className="titulo mt-6">O portfólio começa agora</h2>
          <p className="texto mt-6">
            Em vez de encher esta página com imagem de banco, eu deixei os
            lugares prontos. As primeiras peças entram aqui, com o nome de quem
            contratou e o que foi feito.
          </p>
        </div>

        <div className="tb-grade mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {TRABALHOS.map((t, i) => (
            <article
              key={i}
              /* a segunda e a quarta descem um pouco e andam na paralaxe:
                 quatro peças perfeitamente alinhadas leem como catálogo,
                 e o desencontro é o que dá o ar de diagramação */
              className={`tb-item cartao group relative aspect-[4/5] overflow-hidden ${i % 2 ? "tb-desloca lg:mt-12" : ""}`}
            >
              {t.foto ? (
                <img
                  src={t.foto}
                  alt={t.titulo}
                  className="h-full w-full object-cover transition-transform duration-700 ease-fina group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full flex-col justify-between p-6">
                  <span className="text-[0.66rem] uppercase tracking-[0.24em] text-nata-fraca/70">
                    vaga {String(i + 1).padStart(2, "0")}
                  </span>

                  <Marca
                    cor="rgba(243,240,250,0.07)"
                    corY="rgba(192,168,240,0.12)"
                    className="mx-auto text-[5.5rem]"
                  />

                  <span className="font-display text-[0.95rem] uppercase tracking-[0.2em] text-lavanda-fraca">
                    {t.tipo}
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* a folga é grande porque a peça deslocada desce 12 unidades na
            coluna: medida a partir da primeira, a margem seguinte ficaria
            menor do que parece */}
        {vazio && (
          <div className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <p
              className="font-display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-tight"
              style={{ fontWeight: 500 }}
            >
              {FRASES.ignorado}{" "}
              <span className="italic text-lavanda">{FRASES.ignoradoApoio}</span>
            </p>

            <p className="text-[0.95rem] leading-relaxed text-nata-fraca">
              Quer ser o primeiro caso desta página? Me chama no{" "}
              <a
                className="border-b border-lavanda/40 pb-0.5 text-lavanda transition-colors hover:border-lavanda"
                href={contato("Oi! Vi que o portfólio está começando e quero conversar.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {MARCA.whatsapp ? "WhatsApp" : "Direct"}
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
