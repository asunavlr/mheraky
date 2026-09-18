import { MARCA, MENU, ESTUDIO, contato } from "../dados.js";
import { irPara } from "../lib/anim.js";
import { Logotipo } from "../componentes/Marca.jsx";

/* O rodapé não inventa nada: não há e-mail, endereço nem CNPJ
   publicados, e nenhum dos três aparece. Rodapé é onde texto de enfeite
   mais vira problema, porque é onde se procura dado formal.

   A assinatura do estúdio fica na linha do copyright, com link — praxe,
   e prova de mão dupla: diz quem construiu e dá para conferir. Em bloco
   próprio disputaria espaço com o contato dela, que não é o lugar. */

export default function Rodape() {
  return (
    <footer className="relative overflow-hidden border-t border-lavanda/15 bg-noite">
      <div className="px-[var(--pad)] pt-[clamp(3.5rem,8vw,6rem)]">
        <div className="mx-auto max-w-[80rem]">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2 lg:pr-12">
              <Logotipo className="text-[1.05rem]" cor="var(--color-nata)" />
              <p className="mt-6 max-w-[32ch] text-[0.98rem] leading-relaxed text-nata-fraca">
                {MARCA.chamada}
              </p>
              <a
                className="btn btn--lavanda mt-8"
                href={contato(`Oi, ${MARCA.nome}! Cheguei ao fim do site e quero conversar.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {MARCA.whatsapp ? "chamar no WhatsApp" : "chamar no Direct"}
              </a>
            </div>

            <nav className="flex flex-col gap-3" aria-label="Rodapé">
              <span className="text-[0.66rem] uppercase tracking-[0.26em] text-lavanda-fraca">
                seções
              </span>
              {MENU.map(([id, rotulo]) => (
                <button
                  key={id}
                  onClick={() => irPara(`#${id}`)}
                  className="w-fit text-left text-[0.92rem] text-nata-fraca transition-colors hover:text-lavanda"
                >
                  {rotulo}
                </button>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <span className="text-[0.66rem] uppercase tracking-[0.26em] text-lavanda-fraca">
                onde achar
              </span>
              <a
                className="w-fit text-[0.92rem] text-lavanda transition-opacity hover:opacity-70"
                href={`https://instagram.com/${MARCA.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{MARCA.instagram}
              </a>
              <span className="text-[0.92rem] text-nata-fraca">{MARCA.cidade}</span>
              <span className="text-[0.92rem] text-nata-fraca">atendimento remoto</span>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-lavanda/15 py-6 text-[0.74rem] text-nata-fraca">
            <p>
              © {new Date().getFullYear()} {MARCA.nome} · {MARCA.assinatura}
            </p>
            <p>
              feito pela{" "}
              <a
                className="border-b border-lavanda/30 pb-0.5 text-lavanda transition-colors hover:border-lavanda"
                href={ESTUDIO.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ESTUDIO.nome}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* A ASSINATURA: o nome cortado pela base. A caixa é menor que a
          palavra e o `overflow` come o resto, então só o terço de cima
          das letras aparece. Palavra cortada de raspão lê como escolha;
          cortada pela metade lê como acidente de layout. E o corte vem
          da altura da caixa, não de margem negativa: assim a proporção é
          a mesma em qualquer largura de tela. */}
      <div
        className="pointer-events-none relative h-[clamp(2rem,4.5vw,4.5rem)] select-none overflow-hidden"
        aria-hidden="true"
      >
        <p
          className="absolute inset-x-0 top-0 text-center font-display text-[clamp(4rem,15vw,13rem)] uppercase leading-[0.78] tracking-[0.06em] text-nata/[0.07]"
          style={{ fontWeight: 500 }}
        >
          Mheraky
        </p>
      </div>
    </footer>
  );
}
