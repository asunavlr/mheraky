import { useRef, useCallback, useState } from "react";
import { gsap, useGSAP, prefersReduced, entrar } from "../lib/anim.js";
import { DEPOIMENTOS, MARCA, contato } from "../dados.js";
import Carrossel from "../componentes/Carrossel.jsx";
import Marca from "../componentes/Marca.jsx";

/* ============================================================
   DEPOIMENTOS.

   A SEÇÃO ESTÁ PRONTA E A LISTA ESTÁ VAZIA, e isso é decisão, não
   pendência esquecida.

   Depoimento é a única peça de um site de serviço que, inventada, deixa
   de ser problema estético e vira problema de verdade: é fala atribuída
   a uma pessoa com nome. Basta um visitante procurar o perfil citado e
   não achar ninguém para a credibilidade da página inteira cair — e,
   com ela, a da agência que argumenta sobre confiança duas telas acima.

   Além disso: todo mundo já aprendeu a não acreditar em três elogios
   genéricos com foto de banco. O convite escrito na cara converte
   melhor do que a prova social falsificada, porque pelo menos ele é
   verdade.

   O ESTADO VAZIO É DESENHADO, e não é um aviso de erro. Três molduras
   de filete com aspas grandes e o monograma apagado: lê-se como página
   de revista à espera do texto, que é exatamente o que é.

   COM UM ITEM NA LISTA o carrossel liga sozinho e este bloco some. O
   componente é o mesmo do feed — mesmo arrasto, mesmo encaixe, mesmos
   pontos —, então não há segunda implementação para manter.
   ============================================================ */

function Aspas({ className = "" }) {
  return (
    <span
      className={`font-display leading-[0.6] text-lavanda/30 ${className}`}
      style={{ fontWeight: 500 }}
      aria-hidden="true"
    >
      “
    </span>
  );
}

export default function Depoimentos() {
  const raiz = useRef(null);
  const [, setFoco] = useState(0);
  const aoTrocar = useCallback((i) => setFoco(i), []);
  const vazio = DEPOIMENTOS.length === 0;

  useGSAP(
    () => {
      entrar(".dp-cabeca > *", raiz.current);
      entrar(".dp-vaga", ".dp-vagas", { start: "top 84%" });
      if (prefersReduced()) return;

      /* as aspas grandes sobem devagar enquanto a seção passa: é o único
         movimento aqui, e é lento de propósito — a seção fala de
         confiança, e confiança não se apresenta com pressa */
      gsap.to(".dp-aspas", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: raiz.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    },
    { scope: raiz },
  );

  return (
    <section id="depoimentos" ref={raiz} className="secao overflow-hidden bg-noite">
      <Marca
        cor="rgba(243,240,250,0.025)"
        corY="rgba(192,168,240,0.04)"
        className="dp-aspas pointer-events-none absolute -right-[6%] top-[12%] text-[34vw]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[82rem]">
        <div className="dp-cabeca max-w-[46rem]">
          <span className="etiqueta">quem já trabalhou comigo</span>
          <h2 className="titulo mt-6">
            {vazio ? "Os primeiros depoimentos entram aqui" : "O que dizem"}
          </h2>
        </div>

        {vazio ? (
          <>
            <div className="dp-vagas mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
              {[0, 1, 2].map((i) => (
                <article
                  key={i}
                  className="dp-vaga cartao relative flex min-h-[15rem] flex-col justify-between p-8"
                >
                  <Aspas className="text-[4rem]" />

                  {/* as linhas fantasma dizem "aqui vai um texto" melhor
                      do que a palavra "vazio" diria, e não competem com
                      o conteúdo quando ele chegar */}
                  <div className="mt-2 flex flex-col gap-3" aria-hidden="true">
                    {[100, 92, 68].map((l, j) => (
                      <span
                        key={j}
                        className="h-px bg-lavanda/20"
                        style={{ width: `${l}%` }}
                      />
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <span className="h-9 w-9 rounded-full border border-lavanda/25" />
                    <span className="flex flex-col gap-2">
                      <span className="block h-px w-20 bg-lavanda/25" />
                      <span className="block h-px w-14 bg-lavanda/15" />
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <p className="texto">
                Eu prefiro deixar esta seção vazia a enchê-la com elogio
                inventado. Depoimento é fala de gente com nome, e nome que não
                existe derruba a confiança da página inteira.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-nata-fraca">
                Trabalhou comigo e quer aparecer aqui?{" "}
                <a
                  className="border-b border-lavanda/40 pb-0.5 text-lavanda transition-colors hover:border-lavanda"
                  href={contato(`Oi, ${MARCA.nome}! Quero deixar um depoimento.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  me manda
                </a>
                .
              </p>
            </div>
          </>
        ) : (
          <div className="mt-14 -mx-[var(--pad)]">
            <Carrossel
              aoTrocar={aoTrocar}
              itens={DEPOIMENTOS.map((d, i) => ({
                id: d.nome ?? i,
                legenda: d.nome,
                render: () => (
                  <figure className="cr-peca cartao flex h-full flex-col justify-between p-9">
                    <Aspas className="text-[3.5rem]" />
                    <blockquote className="mt-2 text-[1.05rem] leading-relaxed">
                      {d.texto}
                    </blockquote>
                    <figcaption className="mt-8 border-t border-lavanda/15 pt-5">
                      <p
                        className="font-display text-[1.15rem]"
                        style={{ fontWeight: 500 }}
                      >
                        {d.nome}
                      </p>
                      <p className="mt-0.5 text-[0.85rem] text-nata-fraca">
                        {d.negocio}
                        {d.instagram && (
                          <>
                            {" · "}
                            <a
                              className="text-lavanda"
                              href={`https://instagram.com/${d.instagram}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              @{d.instagram}
                            </a>
                          </>
                        )}
                      </p>
                    </figcaption>
                  </figure>
                ),
              }))}
            />
          </div>
        )}
      </div>
    </section>
  );
}
