import { useRef } from "react";
import { gsap, useGSAP, prefersReduced, entrar } from "../lib/anim.js";
import { MARCA, contato } from "../dados.js";
import Marca from "../componentes/Marca.jsx";

/* ============================================================
   CONTATO — e aqui está o buraco do projeto, dito na cara.

   A BIO DELA NÃO TEM LINK. A quarta linha está truncada pelo Instagram
   num "Análise e…", e pode ser que o contato esteja lá, pode ser que
   não. Sem número, a página não tem como converter — e inventar um
   seria o pior erro possível num site de serviço.

   Enquanto isso, o botão vai para o DIRECT do Instagram, que é o único
   canal que se pode afirmar que existe. Não é o ideal: Direct é caixa
   de entrada de rede social, com filtro de solicitação e notificação
   que se perde no meio das outras. WhatsApp converte melhor e é o que
   falta.

   O DESTINO ESTÁ NUM LUGAR SÓ, a função `contato()` em `dados.js`.
   Preenchendo `MARCA.whatsapp`, os seis botões da página trocam de uma
   vez — em vez de caçá-los seção por seção.

   NÃO HÁ FORMULÁRIO, e é decisão. Formulário aqui seria um campo que
   envia para um endereço que ninguém abre e, pior, ADIA a conversa: a
   pessoa preenche, fecha o site e espera. A mensagem pronta no link
   abre o diálogo no aparelho que ela já tem na mão.
   ============================================================ */

export default function Contato() {
  const raiz = useRef(null);

  useGSAP(
    () => {
      entrar(".ct-anima", raiz.current);
      if (prefersReduced()) return;

      /* o monograma respira, devagar e sem fim. É o último movimento da
         página e é lento de propósito: aqui a pessoa precisa parar e
         clicar, não ser apressada */
      gsap.to(".ct-mono", {
        scale: 1.06,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: raiz },
  );

  return (
    <section
      id="contato"
      ref={raiz}
      className="relative overflow-hidden bg-uva px-[var(--pad)] py-[clamp(5rem,13vw,10rem)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 0%, rgba(192,168,240,0.14), transparent 70%)",
        }}
      />

      <span
        className="ct-mono pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <Marca
          cor="rgba(243,240,250,0.04)"
          corY="rgba(192,168,240,0.07)"
          className="text-[52vw] sm:text-[36vw]"
        />
      </span>

      <div className="relative mx-auto max-w-[56rem] text-center">
        <span className="ct-anima etiqueta justify-center">o próximo passo</span>

        <h2 className="ct-anima manchete mt-8 !text-[clamp(2.2rem,5.5vw,4.6rem)]">
          <span className="linha">
            <span>Vamos conversar</span>
          </span>
          <span className="linha">
            <span>sobre a <span className="italic text-lavanda">sua marca</span>?</span>
          </span>
        </h2>

        <p className="ct-anima texto mx-auto mt-8 text-center">
          Me conta o que você faz e onde quer chegar. Eu respondo com o que dá
          para fazer, o que não dá, e por onde eu começaria.
        </p>

        <div className="ct-anima mt-10 flex flex-wrap justify-center gap-4">
          <a
            className="btn btn--lavanda"
            href={contato(`Oi, ${MARCA.nome}! Vim pelo site e quero conversar sobre a minha marca.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {MARCA.whatsapp ? "chamar no WhatsApp" : "chamar no Direct"}
          </a>
          <a
            className="btn btn--nata"
            href={`https://instagram.com/${MARCA.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{MARCA.instagram}
          </a>
        </div>

        <p className="ct-anima mt-10 text-[0.72rem] uppercase tracking-[0.24em] text-nata-fraca">
          {MARCA.cidade} · atendimento remoto para todo o Brasil
        </p>
      </div>
    </section>
  );
}
