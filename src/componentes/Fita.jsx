import { FITA } from "../dados.js";

/* A fita: duas cópias do grupo e a animação até -50% — no corte, a
   segunda está onde a primeira começou, e o laço não tem emenda.

   A ALTURA DA BANDA SAI DO ÂNGULO. Um retângulo girado ocupa
   `altura + largura × sen(ângulo)`: chutar a altura deixa as pontas
   escaparem por cima e por baixo e abre cunhas do fundo nas laterais.

   Aqui ela é de FILETE, sem preenchimento: a página é revista, e uma
   tarja sólida atravessando seria sinalização de obra. O que passa é a
   didone em caixa alta espaçada, entre dois fios finos.

   `aria-hidden` porque o conteúdo já está escrito em texto na página, e
   seis palavras em laço infinito num leitor de tela são ruído puro. */

const LARGURA = 1.18;
/* sen(2.2°) ≈ 0.0384, arredondado para cima para sobrar um fio */
const ESPALHA = LARGURA * 0.04;

export default function Fita({ velocidade = 50, direcao = 1 }) {
  return (
    <div
      className="relative overflow-hidden bg-noite"
      aria-hidden="true"
      style={{ height: `calc(100vw * ${ESPALHA} + 4.5rem)` }}
    >
      <div
        className="absolute top-1/2 left-1/2 border-y border-lavanda/25 py-4"
        style={{
          width: `${LARGURA * 100}vw`,
          transform: `translate(-50%, -50%) rotate(${direcao * -2.2}deg)`,
        }}
      >
        <div
          className="flex w-max animate-[correr_var(--v)_linear_infinite] gap-12"
          style={{
            "--v": `${velocidade}s`,
            animationDirection: direcao === 1 ? "normal" : "reverse",
          }}
        >
          {[0, 1].map((copia) => (
            <div className="flex shrink-0 items-center gap-12" key={copia}>
              {FITA.map((palavra, i) => (
                <span
                  className="flex shrink-0 items-center gap-12 font-display text-[clamp(0.85rem,1.6vw,1.2rem)] uppercase tracking-[0.3em] text-nata-fraca"
                  key={`${copia}-${i}`}
                >
                  {palavra}
                  <b className="text-[0.6em] font-normal text-lavanda">◆</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
