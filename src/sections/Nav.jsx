import { useEffect, useState } from "react";
import { MENU, MARCA, contato } from "../dados.js";
import { irPara } from "../lib/anim.js";
import { Logotipo } from "../componentes/Marca.jsx";

/* A barra é transparente sobre a capa e ganha fundo depois que a página
   rola. O gatilho é 40px e não a altura da capa: a mudança tem de
   acontecer no primeiro gesto, para a pessoa entender que a barra é
   fixa — esperar a capa inteira faria ela parecer surgir do nada. */

export default function Nav() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const ler = () => setRolou(window.scrollY > 40);
    ler();
    /* passivo: o ouvinte não chama `preventDefault`, e avisar isso tira
       o `scroll` do caminho crítico do toque */
    addEventListener("scroll", ler, { passive: true });
    return () => removeEventListener("scroll", ler);
  }, []);

  const ir = (id) => {
    setAberto(false);
    irPara(`#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        rolou
          ? "border-b border-lavanda/15 bg-noite/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="flex h-[var(--nav)] items-center justify-between gap-4 px-[var(--pad)]">
        <a href="#topo" onClick={(e) => (e.preventDefault(), ir("topo"))}>
          <Logotipo className="text-[0.92rem]" cor="var(--color-nata)" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Seções">
          {MENU.map(([id, rotulo]) => (
            <button
              key={id}
              onClick={() => ir(id)}
              className="group relative py-1 text-[0.72rem] uppercase tracking-[0.2em] text-nata-fraca transition-colors hover:text-nata"
            >
              {rotulo}
              {/* o filete cresce da esquerda: `scale-x` com `origin-left`
                  anima só a transformação, que é barato — animar `width`
                  reflui a linha inteira a cada quadro */}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-lavanda transition-transform duration-400 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            className="btn btn--lavanda !hidden !px-6 !py-3 sm:!inline-flex"
            href={contato(`Oi, ${MARCA.nome}! Vim pelo site e quero um orçamento.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            falar comigo
          </a>

          <button
            className="lg:hidden"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          >
            <span className="flex h-8 w-8 flex-col items-center justify-center gap-[6px]">
              <span
                className={`h-px w-7 bg-nata transition-transform duration-300 ${aberto ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-7 bg-nata transition-transform duration-300 ${aberto ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* o painel anima `grid-template-rows` de 0fr a 1fr: `height: auto`
          não é interpolável, e medir o conteúdo em JavaScript quebra
          quando a janela muda de largura e o texto reflui */}
      <div
        className={`grid overflow-hidden border-t border-lavanda/12 bg-noite/97 backdrop-blur-xl transition-[grid-template-rows] duration-400 ease-fina lg:hidden ${
          aberto ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col px-[var(--pad)] py-4" aria-label="Seções">
            {MENU.map(([id, rotulo]) => (
              <button
                key={id}
                onClick={() => ir(id)}
                className="titulo border-b border-lavanda/10 py-4 text-left !text-[1.6rem] last:border-0"
              >
                {rotulo}
              </button>
            ))}
            <a
              className="btn btn--lavanda mt-6 justify-center"
              href={contato(`Oi, ${MARCA.nome}! Vim pelo site e quero um orçamento.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              falar comigo
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
