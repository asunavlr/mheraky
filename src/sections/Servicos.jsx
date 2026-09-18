import { useRef } from "react";
import { useGSAP, entrar } from "../lib/anim.js";
import { SERVICOS, FRASES } from "../dados.js";

/* ============================================================
   OS SERVIÇOS — quatro, em cartões de filete.

   Vêm DEPOIS do quiz de propósito. Quem fez o quiz já sabe o que
   precisa e usa esta seção para conferir; quem pulou o quiz chega aqui
   sem bússola, e por isso a seção continua sendo uma lista legível
   sozinha. As duas leituras funcionam, e nenhuma depende da outra.

   CARTÃO DE FILETE, sem sombra e sem canto arredondado. Numa página que
   argumenta sofisticação, cartão com sombra e curva entregaria o
   contrário — é a moldura do aplicativo, não a da revista. A única
   decoração é o fio, e ele acende na lavanda quando o ponteiro chega.

   A FRASE DO POST no fim da seção — "seu Instagram não precisa de mais
   posts, precisa de estratégia" — é o resumo do argumento inteiro, e é
   dela. Vinda de mim soaria opinião; vinda do feed dela, é posição.
   ============================================================ */

export default function Servicos() {
  const raiz = useRef(null);

  useGSAP(
    () => {
      entrar(".sv-cabeca > *", raiz.current);
      entrar(".sv-cartao", ".sv-grade", { start: "top 82%" });
      entrar(".sv-fecho > *", ".sv-fecho", { start: "top 85%" });
    },
    { scope: raiz },
  );

  return (
    <section id="servicos" ref={raiz} className="secao bg-noite">
      <div className="mx-auto max-w-[82rem]">
        <div className="sv-cabeca flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="etiqueta">serviços</span>
            <h2 className="titulo mt-6">O que eu faço</h2>
          </div>
          <p className="texto max-w-[36ch]">
            Quase sempre em conjunto. Estratégia sem execução vira documento na
            gaveta; execução sem estratégia vira post bonito que não leva a
            lugar nenhum.
          </p>
        </div>

        <div className="sv-grade mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {SERVICOS.map(([nome, texto, itens], i) => (
            <article key={nome} className="sv-cartao cartao flex flex-col p-8 lg:p-10">
              <span className="font-display text-[0.9rem] text-lavanda-fraca">
                0{i + 1}
              </span>

              <h3
                className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2.1rem)] leading-tight"
                style={{ fontWeight: 500 }}
              >
                {nome}
              </h3>

              <p className="mt-4 text-[0.98rem] leading-relaxed text-nata-fraca">
                {texto}
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-lavanda/15 pt-5">
                {itens.map((it) => (
                  <li
                    key={it}
                    className="text-[0.74rem] uppercase tracking-[0.16em] text-lavanda"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="sv-fecho mt-20 text-center">
          <p className="impacto mx-auto max-w-[20ch] !text-[clamp(1.6rem,4vw,3.2rem)]">
            <span className="block">{FRASES.estrategia[0]}</span>
            <span className="block text-lavanda">{FRASES.estrategia[1]}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
