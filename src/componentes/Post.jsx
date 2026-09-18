import Marca from "./Marca.jsx";

/* ============================================================
   OS POSTS DELA, RECONSTRUÍDOS.

   A DESCOBERTA QUE MUDOU A SEÇÃO: o feed dela não é fotográfico. As
   sete publicações são DESENHOS TIPOGRÁFICOS — frase grande sobre fundo
   de uva, serifa e condensada, o monograma no pé. Uma ou outra usa foto
   de apoio, mas o que carrega a peça é sempre o tipo.

   Isso muda tudo aqui. Na página da Yasmim as molduras ficaram vazias
   porque o trabalho dela é fotográfico e eu não tinha as fotos. Aqui eu
   TENHO o que importa: as frases, a cartela, a família tipográfica e o
   monograma. Dá para remontar as peças com fidelidade, e o que sai não
   é um espaço reservado — é o trabalho dela, legível.

   O QUE É REAL: as cinco frases abaixo estão copiadas literalmente das
   publicações. O que é reconstrução é a DIAGRAMAÇÃO — a minha leitura
   de como cada uma foi montada, a partir das miniaturas do perfil.

   POR ISSO CADA PEÇA DIZ O QUE É. Em `Carrossel`, a legenda de cada
   cartão traz "recriação". Passar reconstrução por peça original seria
   exatamente o tipo de coisa que a seção do preço, duas telas acima,
   acusa.

   PEDIR a ela: as artes originais em PNG. Cada item de `POSTS` ganha
   `foto:` e o cartão passa a mostrar o arquivo, sem mudar mais nada.
   ============================================================ */

/* o rodapé assinado que se repete em todas as peças dela: o monograma
   pequeno, centrado, no pé. É a repetição dele que faz sete artes
   diferentes parecerem um feed só */
function Assinatura({ cor = "currentColor", corY }) {
  return (
    <span className="mt-auto flex justify-center pt-[6%]">
      <Marca cor={cor} corY={corY} className="text-[13cqw]" />
    </span>
  );
}

/* "SE VOCÊ NÃO INVESTE NA SUA MARCA, POR QUE O CLIENTE DEVERIA?"
   Fundo de uva, condensada pesada em caixa alta, texto centrado. É a
   peça que grita, e é a única do feed que usa a família sem serifa. */
export function PostInveste() {
  return (
    <div className="flex h-full flex-col justify-between bg-uva p-[9%] text-nata">
      <p
        className="mt-[8%] text-center text-[10.5cqw] uppercase leading-[1.04]"
        style={{ fontFamily: "var(--font-impacto)", fontVariationSettings: '"wdth" 82, "wght" 800' }}
      >
        Se você não investe na sua marca,{" "}
        <span className="text-lavanda">por que o cliente deveria?</span>
      </p>
      <Assinatura cor="rgba(243,240,250,0.9)" corY="var(--color-lavanda)" />
    </div>
  );
}

/* "SEU POST ESTÁ SENDO IGNORADO?" — a peça clara do feed, em serifa
   alta com o apoio em corpo pequeno. A inversão de fundo é o que dá
   ritmo à grade: sete peças escuras seguidas viram uma mancha só. */
export function PostIgnorado() {
  return (
    <div className="flex h-full flex-col justify-between bg-nata p-[9%] text-uva">
      <div>
        <p
          className="text-[11cqw] uppercase leading-[0.98]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          Seu post está sendo ignorado?
        </p>
        {/* medido a 4,05:1 em `uva/70`, contra os 4,5 exigidos. Roxo a 70%
            sobre creme clareia para um lilás médio, e lilás médio sobre
            creme é o par que mais engana o olho: parece contrastado de
            longe e some em corpo de leitura */}
        <p className="mt-[6%] text-[4.4cqw] leading-snug text-uva/90">
          O design do seu post pode ser o diferencial entre ser visto ou
          ignorado.
        </p>
      </div>
      <Assinatura cor="var(--color-uva)" corY="rgba(24,0,72,0.45)" />
    </div>
  );
}

/* "Seu Instagram não precisa de MAIS posts, precisa de ESTRATÉGIA" —
   a peça lavanda, com a lista de conferência embaixo. Aqui a didone
   trabalha junto com o itálico, que é como ela destaca no feed. */
export function PostEstrategia() {
  return (
    <div className="flex h-full flex-col justify-between bg-lavanda p-[9%] text-uva">
      <div>
        <p
          className="text-[9.5cqw] leading-[1.06]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          Seu Instagram não precisa de{" "}
          <span style={{ fontWeight: 700 }}>mais posts</span>, precisa de{" "}
          <span className="italic" style={{ fontWeight: 700 }}>
            estratégia
          </span>
          .
        </p>

        <ul className="mt-[8%] flex flex-col gap-[3%]">
          {["Legendas que vendem", "Hashtags certas", "Conteúdo com intenção"].map(
            (i) => (
              <li key={i} className="flex items-center gap-[3%] text-[4.2cqw]">
                <span className="text-[4.6cqw] leading-none">✓</span>
                {i}
              </li>
            ),
          )}
        </ul>
      </div>
      <Assinatura cor="var(--color-uva)" corY="rgba(24,0,72,0.4)" />
    </div>
  );
}

/* "outra empresa fez por menos" — a peça do preço. Fundo escuro com um
   halo roxo, a frase em itálico e a resposta em corpo pequeno embaixo.
   O itálico aqui é fala de outra pessoa, e é por isso que ele existe */
export function PostPreco() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-noite p-[9%] text-nata">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 15%, rgba(201,180,245,0.26), transparent 70%)",
        }}
      />
      <div className="relative">
        <p
          className="text-[10cqw] italic leading-[1.05] text-lavanda"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          “outra empresa fez por menos”
        </p>
        <p className="mt-[7%] text-[4.4cqw] leading-snug text-nata/75">
          Fez mesmo. A pergunta não é quanto custou, é o que estava dentro.
        </p>
      </div>
      <Assinatura cor="rgba(243,240,250,0.9)" corY="var(--color-lavanda)" />
    </div>
  );
}

/* "Qual dos meus serviços é ideal para você?" — o post fixado, que
   virou o quiz da página. O cartão traz a pergunta e aponta para lá */
export function PostQuiz() {
  return (
    <div className="flex h-full flex-col justify-between bg-uva-2 p-[9%] text-nata">
      <div>
        {/* medido a 4,44:1 contra os 4,5 exigidos, e o corpo aqui é de
            9px na largura do cartão da seção do quiz: em tamanho assim
            não há margem para tom intermediário */}
        <span className="text-[3.4cqw] uppercase tracking-[0.24em] text-nata">
          post fixado
        </span>
        <p
          className="mt-[7%] text-[10cqw] leading-[1.04]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          Qual dos meus serviços é{" "}
          <span className="italic text-lavanda">ideal para você</span>?
        </p>
        <p className="mt-[6%] text-[4cqw] text-nata/70">
          Virou um quiz de três perguntas aqui no site.
        </p>
      </div>
      <Assinatura cor="rgba(243,240,250,0.9)" corY="var(--color-lavanda)" />
    </div>
  );
}

export const POSTS = [
  { id: "investe", legenda: "Se você não investe na sua marca", Peca: PostInveste },
  { id: "ignorado", legenda: "Seu post está sendo ignorado?", Peca: PostIgnorado },
  { id: "estrategia", legenda: "Não precisa de mais posts", Peca: PostEstrategia },
  { id: "preco", legenda: "Outra empresa fez por menos", Peca: PostPreco },
  { id: "quiz", legenda: "Qual serviço é ideal para você", Peca: PostQuiz },
];
