import { useRef } from "react";
import { gsap, useGSAP, prefersReduced, irPara } from "../lib/anim.js";
import { MARCA, contato } from "../dados.js";
import Marca from "../componentes/Marca.jsx";

/* ============================================================
   A CAPA.

   O QUE ELA PRECISA FAZER: soar como capa de revista, não como perfil.

   A marca dela é uma didone, e didone em corpo grande sobre escuro é a
   linguagem de capa. A página abre com a frase da bio em tamanho de
   manchete e o monograma enorme atrás, meio cortado pela borda — o
   arranjo de uma capa impressa, em que o logotipo é marca d'água e o
   título manda.

   SEM FOTO, E DE PROPÓSITO. Nas outras duas páginas da casa a capa
   pedia rosto; aqui não. O argumento dela é de autoridade, e autoridade
   se constrói com espaço vazio e tipo grande, não com retrato sorrindo.
   Além disso não há imagem dela em resolução utilizável, e capa com
   banco de imagem contradiria a pergunta que a própria página faz duas
   telas abaixo sobre investir na própria marca.

   O QUE SE MOVE E POR QUÊ: o monograma anda mais devagar que o texto na
   rolagem, e um pouco no sentido do ponteiro. É a DIFERENÇA entre as
   duas velocidades que o olho lê como profundidade; iguais, seria o
   mesmo que nada se mexer.
   ============================================================ */

export default function Capa() {
  const raiz = useRef(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;

      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(".cp-etiqueta", { autoAlpha: 0, y: -10, duration: 0.7 })
        /* as linhas sobem de dentro do recorte, escalonadas. 0.1s entre
           elas: menos e as quatro parecem uma só; mais e a última chega
           depois de o olho ter desistido */
        .from(
          ".cp-linha > span",
          { yPercent: 106, duration: 1.05, ease: "power3.out", stagger: 0.1 },
          "-=0.35",
        )
        .from(
          ".cp-sub, .cp-acoes > *, .cp-pe > *",
          { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.08 },
          "-=0.55",
        )
        /* o monograma abre de dentro, crescendo: é uma marca d'água
           aparecendo no papel, não um objeto entrando em cena */
        .from(
          ".cp-mono",
          { autoAlpha: 0, scale: 1.25, duration: 1.8, ease: "power3.out" },
          0.1,
        );

      const rolagem = {
        trigger: raiz.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      };
      gsap.to(".cp-mono", { yPercent: 12, ease: "none", scrollTrigger: rolagem });
      gsap.to(".cp-texto", { y: -70, ease: "none", scrollTrigger: rolagem });

      /* `quickTo` e não `gsap.to` por evento: o ponteiro dispara dezenas
         de vezes por segundo, e cada `to` criaria uma animação nova
         disputando a mesma propriedade com as anteriores */
      const mover = {
        x: gsap.quickTo(".cp-mono", "x", { duration: 1.4, ease: "power3" }),
        y: gsap.quickTo(".cp-mono", "y", { duration: 1.4, ease: "power3" }),
      };
      const aoMover = (e) => {
        mover.x(((e.clientX / innerWidth) * 2 - 1) * 26);
        mover.y(((e.clientY / innerHeight) * 2 - 1) * 18);
      };
      addEventListener("pointermove", aoMover);
      return () => removeEventListener("pointermove", aoMover);
    },
    { scope: raiz },
  );

  return (
    <section
      id="topo"
      ref={raiz}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-noite px-[var(--pad)] pt-[calc(var(--nav)+4rem)] pb-12"
    >
      {/* a luz roxa nos cantos: é o que tira o fundo de "preto chapado" e
          dá a ele uma hora do dia. Sem isso a página fica plana e o
          escuro vira ausência de cor em vez de cor */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(58% 48% at 76% 10%, rgba(24,0,72,0.95), transparent 70%), radial-gradient(48% 46% at 8% 94%, rgba(192,168,240,0.1), transparent 72%)",
        }}
      />

      {/* O MONOGRAMA COMO MARCA D'ÁGUA.

          Enorme, centrado à direita e sangrando pela borda. Cortado pela
          margem ele parece continuar fora do enquadramento, e é isso que
          dá escala; contido, viraria um ícone grande. */}
      <span
        className="cp-mono pointer-events-none absolute right-[-8%] top-1/2 -z-0 -translate-y-1/2 sm:right-[-4%]"
        aria-hidden="true"
      >
        <Marca
          cor="rgba(243,240,250,0.05)"
          corY="rgba(192,168,240,0.09)"
          className="text-[46vw] sm:text-[38vw] lg:text-[32vw]"
        />
      </span>

      <div className="cp-texto relative z-10 mx-auto w-full max-w-[82rem]">
        <span className="cp-etiqueta etiqueta">
          {MARCA.disciplinas.join(" · ")}
        </span>

        {/* A MANCHETE DA CAPA É MENOR QUE A CLASSE PADRÃO.

            `.manchete` vai até 6rem, que é o corpo certo para uma frase
            de duas linhas. Esta tem QUATRO, e em 6rem elas somavam ~460px
            de altura: com o pé, o parágrafo e os botões, o bloco passava
            dos 900px dentro de uma capa de 950 menos as margens. O
            conteúdo transbordava para fora da primeira tela, que é o
            único lugar da página em que isso não pode acontecer.

            Quatro linhas pedem corpo menor — não porque a frase valha
            menos, mas porque ALTURA TOTAL é o que a capa tem de caber, e
            ela é o produto do corpo pelo número de linhas. */}
        <h1 className="manchete mt-8 max-w-[15ch] !text-[clamp(2.2rem,5.4vw,4.6rem)]">
          <span className="cp-linha linha">
            <span>Não é sobre</span>
          </span>
          <span className="cp-linha linha">
            <span>um conteúdo,</span>
          </span>
          <span className="cp-linha linha">
            <span>é sobre <span className="italic text-lavanda">o que</span></span>
          </span>
          <span className="cp-linha linha">
            <span>ele carrega.</span>
          </span>
        </h1>

        <p className="cp-sub texto mt-7">
          Social media, design e marketing para marcas que querem ser
          escolhidas, e não só encontradas. Estratégia primeiro, arte depois,
          número no fim do mês.
        </p>

        <div className="cp-acoes mt-9 flex flex-wrap gap-4">
          <a
            className="btn btn--lavanda"
            href={contato(`Oi, ${MARCA.nome}! Vim pelo site e quero um orçamento.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            quero um orçamento
          </a>
          <button className="btn btn--nata" onClick={() => irPara("#quiz")}>
            qual serviço é o meu
          </button>
        </div>

        <div className="cp-pe mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.72rem] uppercase tracking-[0.22em] text-nata-fraca">
          <span>{MARCA.cidade}</span>
          <span className="hidden h-3 w-px bg-lavanda/30 sm:block" />
          <span>atendimento remoto</span>
          <span className="hidden h-3 w-px bg-lavanda/30 sm:block" />
          <span>@{MARCA.instagram}</span>
        </div>
      </div>
    </section>
  );
}
