import { useRef, useState } from "react";
import { useGSAP, entrar } from "../lib/anim.js";
import { DUVIDAS } from "../dados.js";

/* As perguntas são de PROCESSO, não de fato: nenhuma afirma prazo,
   preço ou resultado que eu não possa sustentar. Duas dizem "depende",
   contra o manual de copy e a favor da primeira reunião — número
   inventado aqui vira discussão lá.

   O ACORDEÃO ANIMA `grid-template-rows` de 0fr a 1fr, e não a altura.
   `height: auto` não é interpolável: o caminho usual é medir o conteúdo
   em JavaScript e escrever o pixel, o que quebra quando a janela muda
   de largura e o texto reflui. Com a grade, o navegador interpola até a
   altura natural sozinho e continua certo depois de girar o aparelho. */

export default function Duvidas() {
  const raiz = useRef(null);
  const [aberta, setAberta] = useState(0);

  useGSAP(
    () => {
      entrar(".dv-cabeca > *", raiz.current);
      entrar(".dv-item", ".dv-lista", { start: "top 82%" });
    },
    { scope: raiz },
  );

  return (
    <section id="duvidas" ref={raiz} className="secao bg-noite">
      <div className="mx-auto grid max-w-[78rem] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div className="dv-cabeca lg:sticky lg:top-[calc(var(--nav)+2rem)] lg:self-start">
          <span className="etiqueta">dúvidas</span>
          <h2 className="titulo mt-6">O que me perguntam antes de fechar</h2>
          <p className="texto mt-5">
            Se a sua não estiver aqui, me chama. Respondo sem enrolar.
          </p>
        </div>

        <ul className="dv-lista border-t border-lavanda/20">
          {DUVIDAS.map(([pergunta, resposta], i) => {
            const eAberta = aberta === i;
            return (
              <li key={pergunta} className="dv-item border-b border-lavanda/20">
                <h3>
                  <button
                    className="flex w-full items-start gap-6 py-7 text-left"
                    onClick={() => setAberta(eAberta ? -1 : i)}
                    aria-expanded={eAberta}
                    aria-controls={`dv-${i}`}
                  >
                    <span className="mt-1.5 shrink-0 font-display text-[0.85rem] text-lavanda-fraca">
                      0{i + 1}
                    </span>
                    <span
                      className={`flex-1 font-display text-[clamp(1.15rem,2.1vw,1.65rem)] leading-snug transition-colors ${eAberta ? "text-lavanda" : ""}`}
                      style={{ fontWeight: 500 }}
                    >
                      {pergunta}
                    </span>
                    {/* o mais gira 45° e vira um X: é o mesmo botão nos
                        dois estados, e o giro diz isso */}
                    <span
                      className={`mt-1 shrink-0 text-[1.3rem] font-light leading-none transition-transform duration-400 ease-fina ${eAberta ? "rotate-45 text-lavanda" : "text-nata-fraca"}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={`dv-${i}`}
                  className={`grid transition-[grid-template-rows] duration-400 ease-fina ${eAberta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-[58ch] pb-7 pl-[2.6rem] text-[0.97rem] leading-relaxed text-nata-fraca">
                      {resposta}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
