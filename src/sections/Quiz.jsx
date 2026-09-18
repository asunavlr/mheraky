import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReduced, entrar } from "../lib/anim.js";
import { QUIZ, MARCA, contato } from "../dados.js";

/* ============================================================
   O QUIZ — "qual dos meus serviços é ideal para você?"

   A IDEIA É DELA: é o post fixado do perfil. Num carrossel isso vira
   uma lista que a pessoa lê e esquece. Numa página, vira uma coisa que
   ela FAZ — e o que se descobre sozinho não precisa ser argumentado.

   É também a resposta ao problema real de uma página de serviço: com
   quatro opções na tela, quem não sabe o que precisa não escolhe
   nenhuma e vai embora. Três perguntas resolvem isso melhor do que
   qualquer texto explicando as diferenças.

   TRÊS PERGUNTAS, E NENHUMA A MAIS. Cada pergunta adicional é uma
   chance de desistir, e três bastam para separar três serviços. Nenhuma
   delas pergunta orçamento: perguntar quanto a pessoa pode pagar antes
   de mostrar valor é o jeito mais rápido de perder a conversa.

   A APURAÇÃO é uma soma de pesos, e está em `dados.js` junto das
   perguntas — quem for mexer no texto vê o peso ao lado e entende o que
   está mudando. Empate vence o de menor índice, que é o serviço mais
   completo: no empate, a recomendação certa é a que mais resolve.

   O RESULTADO NÃO É UMA VENDA FECHADA. Ele diz o que faz sentido e
   oferece a conversa; o botão de refazer fica ao lado, sem escondido,
   porque quiz que prende a pessoa no resultado queima a confiança que
   acabou de ganhar.

   ACESSIBILIDADE: cada pergunta é um `fieldset` com `legend`, e as
   opções são botões de verdade. Quem usa teclado percorre com Tab e
   aciona com Enter; quem usa leitor de tela ouve a pergunta antes das
   opções. O resultado é anunciado por `aria-live`, senão a troca de
   tela aconteceria em silêncio.
   ============================================================ */

export default function Quiz() {
  const raiz = useRef(null);
  const [passo, setPasso] = useState(0);
  const [pesos, setPesos] = useState([0, 0, 0]);

  const total = QUIZ.perguntas.length;
  const terminou = passo >= total;

  /* `indexOf(Math.max(...))` devolve o PRIMEIRO máximo, e é por isso que
     o empate resolve sozinho no serviço mais completo — sem precisar de
     regra de desempate escrita à parte */
  const vencedor = pesos.indexOf(Math.max(...pesos));
  const resultado = QUIZ.resultados[vencedor];

  const responder = (ganhos) => {
    setPesos((p) => p.map((v, i) => v + ganhos[i]));
    setPasso((s) => s + 1);
  };

  const refazer = () => {
    setPesos([0, 0, 0]);
    setPasso(0);
  };

  useGSAP(() => entrar(".qz-cabeca > *", raiz.current), { scope: raiz });

  /* a tela troca com um corte curto, e não com desvanecimento longo: é
     substituição, não transição de slide. `dependencies` refaz a
     animação a cada passo */
  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.fromTo(
        ".qz-tela",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
      );
    },
    { scope: raiz, dependencies: [passo] },
  );

  return (
    <section id="quiz" ref={raiz} className="secao bg-uva">
      <div className="mx-auto max-w-[68rem]">
        <div className="qz-cabeca text-center">
          <span className="etiqueta justify-center">qual serviço</span>
          <h2 className="titulo mt-6">
            Qual dos meus serviços
            <br />é <span className="italic text-lavanda">ideal para você</span>?
          </h2>
          <p className="texto mx-auto mt-5 text-center">
            Três perguntas, meio minuto. Nenhuma delas sobre orçamento.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-[46rem]">
          {/* A BARRA DE PROGRESSO É DE FILETE, e não de bloco.

              Ela existe para responder "quanto falta?" antes de a pessoa
              se cansar — e num quiz de três perguntas essa é a diferença
              entre começar e não começar. */}
          <div className="flex items-center gap-3" aria-hidden="true">
            {QUIZ.perguntas.map((_, i) => (
              <span
                key={i}
                className={`h-px flex-1 transition-colors duration-500 ${
                  i < passo ? "bg-lavanda" : "bg-lavanda/20"
                }`}
              />
            ))}
            <span className="text-[0.72rem] tracking-[0.2em] text-lavanda-fraca">
              {Math.min(passo + (terminou ? 0 : 1), total)}/{total}
            </span>
          </div>

          <div className="mt-10 min-h-[22rem]" aria-live="polite">
            {!terminou ? (
              <fieldset className="qz-tela border-0">
                <legend
                  className="font-display text-[clamp(1.4rem,3vw,2.2rem)] leading-tight"
                  style={{ fontWeight: 500 }}
                >
                  {QUIZ.perguntas[passo].titulo}
                </legend>

                <div className="mt-8 flex flex-col gap-3">
                  {QUIZ.perguntas[passo].opcoes.map(([rotulo, ganhos]) => (
                    <button
                      key={rotulo}
                      className="cartao group flex items-center justify-between gap-5 px-6 py-5 text-left"
                      onClick={() => responder(ganhos)}
                    >
                      <span className="text-[1.02rem]">{rotulo}</span>
                      <span
                        className="shrink-0 text-lavanda opacity-0 transition-all duration-400 ease-fina group-hover:translate-x-1 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  ))}
                </div>

                {passo > 0 && (
                  <button
                    className="mt-6 text-[0.78rem] uppercase tracking-[0.2em] text-nata-fraca underline-offset-4 transition-colors hover:text-lavanda hover:underline"
                    onClick={refazer}
                  >
                    recomeçar
                  </button>
                )}
              </fieldset>
            ) : (
              <div className="qz-tela">
                <span className="etiqueta">o que faz sentido para você</span>

                <h3
                  className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.2rem)] leading-tight text-lavanda"
                  style={{ fontWeight: 500 }}
                >
                  {resultado.nome}
                </h3>

                <p className="texto mt-5">{resultado.texto}</p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    className="btn btn--lavanda"
                    href={contato(
                      `Oi! Fiz o quiz no seu site e caí em "${resultado.nome}". Quero conversar.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    falar sobre isso
                  </a>
                  <button
                    className="text-[0.78rem] uppercase tracking-[0.2em] text-nata-fraca underline-offset-4 transition-colors hover:text-lavanda hover:underline"
                    onClick={refazer}
                  >
                    refazer o quiz
                  </button>
                </div>

                {/* o resultado não fecha a porta: dizer que os outros dois
                    existem é o que impede o quiz de parecer funil */}
                <p className="mt-8 text-[0.88rem] text-nata-fraca">
                  Isso é uma sugestão, não um veredito. Se você olhou os outros
                  dois e achou que é mais a sua cara, também dá para começar por
                  lá. A gente ajusta na conversa.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
