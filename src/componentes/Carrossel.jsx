import { useEffect, useRef, useState, useCallback } from "react";

/* ============================================================
   O CARROSSEL — mecanismo do "Scrollable Card Stack" do Skiper UI,
   portado para GSAP e rolagem nativa.

   O QUE FOI PORTADO E O QUE MUDOU.

   O original usa Motion e guarda a posição em estado do React,
   redesenhando a cada quadro do arrasto. Aqui a posição vive na ROLAGEM
   NATIVA do trilho, e o React só é avisado quando o cartão em foco
   muda. São duas vantagens grandes:

   · O ARRASTO DE CELULAR SAI DE GRAÇA, com a inércia do sistema.
     Refazer momento e atrito em JavaScript nunca fica igual ao do
     aparelho, e a diferença se sente na mão.

   · O TECLADO E O LEITOR DE TELA CONTINUAM FUNCIONANDO. Um trilho que
     rola de verdade é percorrível com Tab, e cada cartão é um elemento
     que o leitor anuncia. Um carrossel que move tudo por `transform`
     precisa reimplementar isso, e quase nunca reimplementa.

   O ENCAIXE é `scroll-snap`, também nativo: o cartão para no lugar sem
   uma linha de JavaScript.

   O EFEITO DE PROFUNDIDADE é o que o Skiper acrescenta e é o motivo de
   usar este mecanismo: o cartão em foco fica inteiro, e os vizinhos
   encolhem e perdem opacidade conforme se afastam do centro. É medido
   a cada quadro do `scroll`, pela distância entre o centro do cartão e
   o centro da janela.

   `requestAnimationFrame` com trava: o evento de rolagem dispara muito
   mais que 60 vezes por segundo em trackpad, e sem a trava a medição
   roda várias vezes para o mesmo quadro desenhado — trabalho jogado
   fora que aparece como travada no arrasto.

   A PONTA DA ESQUERDA E DA DIREITA são desvanecidas por máscara, não
   por um retângulo com gradiente por cima: máscara acompanha o fundo
   da seção sozinha, e um retângulo teria de ser repintado toda vez que
   a seção trocasse de cor.
   ============================================================ */

export default function Carrossel({ itens, aoTrocar, className = "" }) {
  const trilho = useRef(null);
  const [foco, setFoco] = useState(0);

  const medir = useCallback(() => {
    const t = trilho.current;
    if (!t) return;

    const meio = t.scrollLeft + t.clientWidth / 2;
    let maisPerto = 0;
    let menorDist = Infinity;

    [...t.children].forEach((cartao, i) => {
      const centro = cartao.offsetLeft + cartao.offsetWidth / 2;
      const dist = Math.abs(centro - meio);

      if (dist < menorDist) {
        menorDist = dist;
        maisPerto = i;
      }

      /* a distância vira uma razão de 0 a 1 medida em LARGURAS DE
         CARTÃO, e não em pixels: assim o efeito é igual num celular e
         num monitor, onde o cartão tem tamanhos muito diferentes */
      const razao = Math.min(1, dist / cartao.offsetWidth);
      cartao.style.setProperty("--longe", razao.toFixed(3));
    });

    setFoco((f) => (f === maisPerto ? f : maisPerto));
  }, []);

  useEffect(() => {
    const t = trilho.current;
    if (!t) return;

    let pedido = null;
    const aoRolar = () => {
      if (pedido) return;
      pedido = requestAnimationFrame(() => {
        pedido = null;
        medir();
      });
    };

    medir();
    t.addEventListener("scroll", aoRolar, { passive: true });
    /* o tamanho do cartão muda com a largura da janela, e a razão de
       distância depende dele: sem remedir no `resize`, girar o aparelho
       deixa os vizinhos encolhidos no tamanho errado */
    const ro = new ResizeObserver(aoRolar);
    ro.observe(t);

    return () => {
      t.removeEventListener("scroll", aoRolar);
      ro.disconnect();
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, [medir]);

  useEffect(() => {
    aoTrocar?.(foco);
  }, [foco, aoTrocar]);

  const irPara = (i) => {
    const t = trilho.current;
    const cartao = t?.children[i];
    if (!cartao) return;
    t.scrollTo({
      left: cartao.offsetLeft - (t.clientWidth - cartao.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className={className}>
      <div
        ref={trilho}
        className="cr-trilho flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-4 lg:gap-8"
        /* o vão lateral é metade da folga que sobra: é o que permite o
           PRIMEIRO e o ÚLTIMO cartão chegarem ao centro da tela. Sem
           ele, as pontas nunca entram em foco e o efeito só funciona no
           miolo */
        style={{
          scrollPaddingInline: "max(var(--pad), calc(50% - 11rem))",
          paddingInline: "max(var(--pad), calc(50% - 11rem))",
          maskImage:
            "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
        }}
        tabIndex={0}
        role="group"
        aria-label="Publicações, arraste para o lado"
      >
        {itens.map((item, i) => (
          <article
            key={item.id ?? i}
            className="cr-cartao w-[min(22rem,78vw)] shrink-0 snap-center"
            aria-current={foco === i || undefined}
          >
            {item.render(foco === i)}
          </article>
        ))}
      </div>

      {/* OS PONTOS SÃO BOTÕES DE VERDADE, com rótulo.

          Bolinha decorativa é o padrão desta peça e é o defeito dela:
          quem usa teclado fica sem saída lateral, e quem usa leitor de
          tela ouve "botão" cinco vezes seguidas sem saber para onde
          cada um leva. */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
        {itens.map((item, i) => (
          <button
            key={item.id ?? i}
            onClick={() => irPara(i)}
            aria-label={`Ir para: ${item.legenda ?? `item ${i + 1}`}`}
            aria-current={foco === i}
            className={`h-1.5 rounded-full transition-all duration-500 ease-fina ${
              foco === i ? "w-9 bg-lavanda" : "w-1.5 bg-lavanda/30 hover:bg-lavanda/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
