import { useRef } from "react";
import { gsap, useGSAP, prefersReduced, entrar } from "../lib/anim.js";
import { TESE, PRECO } from "../dados.js";

/* ============================================================
   A MARCA — a melhor pergunta do feed dela, e o contraponto do preço.

   "Se você não investe na sua marca, por que o cliente deveria?"

   É a frase mais forte das sete publicações por um motivo técnico: ela
   não defende o serviço, defende o INVESTIMENTO, e faz isso virando a
   objeção de preço do avesso. Quem está achando caro é exatamente quem
   a pergunta atinge — e ela não tem resposta confortável.

   POR ISSO A SEÇÃO VEM LOGO DEPOIS DA CAPA. A objeção de preço é a
   primeira coisa que trava o cliente dela; a página desarma antes de
   pedir qualquer coisa. Deixada para o fim, ela chegaria depois de a
   pessoa já ter ido embora.

   A PERGUNTA É EM `.impacto`, e não na didone da marca. Ela grita, e
   didone não grita: as serifas finas quebram no corpo em que essa frase
   precisa viver. A página troca de voz em vez de forçar a família
   errada — e a troca em si tem significado, porque marca o único
   momento em que ela levanta o tom.

   A SEGUNDA METADE responde "outra empresa fez por menos", que é a
   outra publicação. A seção NÃO BRIGA COM O PREÇO BAIXO: mostra o que
   não vem junto. Discutir preço é discussão perdida; discutir ESCOPO é
   a conversa certa, e é a única em que ela pode ganhar sem falar mal de
   ninguém.

   Os quatro itens são descrições de processo. Nenhum cita concorrente,
   nenhum promete resultado.
   ============================================================ */

export default function MarcaSecao() {
  const raiz = useRef(null);

  useGSAP(
    () => {
      if (prefersReduced()) {
        return;
      }

      gsap.from(".mc-linha > span", {
        yPercent: 108,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: ".mc-pergunta", start: "top 74%" },
      });

      entrar(".mc-anima", raiz.current, { start: "top 65%" });
      entrar(".mc-item", ".mc-lista", { start: "top 82%" });
    },
    { scope: raiz },
  );

  return (
    <section id="marca" ref={raiz} className="secao bg-uva">
      <div className="mx-auto max-w-[82rem]">
        <span className="mc-anima etiqueta">a marca</span>

        <p className="mc-pergunta impacto mt-8 max-w-[16ch]">
          {TESE.pergunta.map((l, i) => (
            <span className="mc-linha linha" key={i}>
              <span className={i === 3 ? "text-lavanda" : undefined}>{l}</span>
            </span>
          ))}
        </p>

        <p className="mc-anima texto mt-10 max-w-[52ch]">{TESE.resposta}</p>

        {/* ---- o contraponto do preço ---- */}
        <div className="mt-24 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p
              className="mc-anima font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight italic text-lavanda"
              style={{ fontWeight: 500 }}
            >
              “{PRECO.frase}”
            </p>
            <p className="mc-anima texto mt-6">{PRECO.texto}</p>
          </div>

          {/* A LISTA É NUMERADA E DE FILETE.

              Sem preenchimento, sem ícone: o número e o fio bastam. Numa
              seção que argumenta que o barato sai caro, uma grade de
              cartõezinhos coloridos entregaria o contrário do que o
              texto diz. */}
          <ol className="mc-lista border-t border-lavanda/20">
            {PRECO.itens.map(([nome, oque], i) => (
              <li
                key={nome}
                className="mc-item flex items-baseline gap-6 border-b border-lavanda/20 py-6"
              >
                <span className="font-display text-[0.95rem] text-lavanda-fraca">
                  0{i + 1}
                </span>
                <div>
                  <h3
                    className="font-display text-[clamp(1.2rem,2.4vw,1.7rem)] leading-tight"
                    style={{ fontWeight: 500 }}
                  >
                    {nome}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-nata-fraca">
                    {oque}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
