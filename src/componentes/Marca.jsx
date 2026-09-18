/* ============================================================
   O MONOGRAMA — H + Y.

   COMO ELE É FEITO, lendo a arte que ela mandou ampliada: um H em
   branco, de duas hastes com serifa reta e um filete fino de travessão,
   e um Y em lavanda encaixado no vão entre as hastes. O braço esquerdo
   do Y é o traço grosso e o direito é um fio — que é exatamente como um
   Y se desenha numa didone, e foi o que confirmou a letra.

   COMPOSTO COM TIPO, E NÃO TRAÇADO. O arquivo que existe é um PNG de 99
   pixels. Vetorizar por cima de uma letra desse tamanho é o pior caso
   possível: serifa reta e filete fino são justamente as partes que o
   serrilhado destrói, e o traçado devolveria hastes tortas e serifas
   derretidas — quem desenhou reconheceria o erro de imediato.

   Um monograma é feito de LETRAS, então ele é remontado com letras:
   duas glifas de Bodoni Moda, a mesma família didone do original,
   sobrepostas. Fica nítido em qualquer corpo, herda a cor por variável,
   e é a mesma tipografia que a página inteira usa — o que amarra marca
   e texto num sistema só.

   A ORDEM DE PILHA IMPORTA: o Y vai atrás e o H na frente. É o que faz
   o travessão do H passar por cima da haste do Y, como no original.
   Invertido, o Y cortaria o travessão ao meio e a leitura do H se
   perderia.

   PEDIR a ela: o `.svg` do monograma. Trocar é substituir este
   componente inteiro — quem o usa passa só `cor` e `className`.
   ============================================================ */

/* O COMPONENTE NÃO IMPÕE `position`, e isso custou depuração.

   A versão anterior escrevia `relative` na própria casca e concatenava
   o `className` recebido. Quando a capa passava `absolute`, o elemento
   ficava com as DUAS classes de posição — e num conflito assim quem
   decide não é a ordem no atributo, é a ordem em que as regras saem na
   folha. O monograma acabava `relative`, isto é, DENTRO DO FLUXO, com
   46vw de corpo: 736px de altura fantasma empurrando a capa inteira
   para fora da primeira tela.

   Agora a casca é `static` e quem posiciona é um elemento de fora. O
   `relative` que o Y precisa para se ancorar mora numa casca interna
   própria, que ninguém de fora alcança — e o componente deixa de ter
   opinião sobre onde ele fica, que nunca foi assunto dele. */
export default function Marca({ className = "", cor = "currentColor", corY, ...resto }) {
  return (
    <span
      className={`inline-block leading-none ${className}`}
      role="img"
      aria-label="Mheraky"
      {...resto}
    >
      {/* a casca interna é quem carrega o `relative`: é o ancestral
          posicionado de que o Y precisa, e fica fora do alcance de quem
          usa o componente */}
      <span className="relative inline-block">
        {/* o Y ocupa o vão entre as hastes do H, centrado. Sai do fluxo
            para não empurrar o H, e é `aria-hidden` porque os dois juntos
            já foram anunciados como uma marca só */}
        <span
          className="pointer-events-none absolute inset-0 grid place-items-center"
          aria-hidden="true"
          style={{ color: corY ?? "var(--color-lavanda)" }}
        >
          <span
            className="font-display"
            style={{ fontSize: "0.92em", fontWeight: 500, transform: "translateY(0.045em)" }}
          >
            Y
          </span>
        </span>

        <span
          className="relative font-display"
          style={{ color: cor, fontWeight: 500 }}
          aria-hidden="true"
        >
          H
        </span>
      </span>
    </span>
  );
}

/* O logotipo por extenso. A caixa alta com espaçamento largo é a
   convenção da tipografia de luxo, e é o que o perfil dela usa nas
   artes — didone em caixa alta espaçada lê como autoridade, que é
   precisamente o argumento de uma marca que pergunta "se você não
   investe na sua marca, por que o cliente deveria?". */
export function Logotipo({ className = "", cor = "currentColor" }) {
  return (
    <span className={`inline-flex items-center gap-[0.5em] ${className}`}>
      <Marca cor={cor} className="text-[1.5em]" />
      <span className="flex flex-col leading-none">
        <span
          className="font-display uppercase tracking-[0.22em]"
          style={{ color: cor, fontWeight: 500 }}
        >
          Mheraky
        </span>
        <span className="mt-[0.35em] text-[0.36em] uppercase tracking-[0.3em] text-lavanda">
          social media
        </span>
      </span>
    </span>
  );
}
