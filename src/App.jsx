import { useEffect } from "react";
import { iniciarRolagem } from "./lib/anim.js";
import Nav from "./sections/Nav.jsx";
import Capa from "./sections/Capa.jsx";
import MarcaSecao from "./sections/Marca.jsx";
import Quiz from "./sections/Quiz.jsx";
import Fita from "./componentes/Fita.jsx";
import Servicos from "./sections/Servicos.jsx";
import Feed from "./sections/Feed.jsx";
import Depoimentos from "./sections/Depoimentos.jsx";
import Duvidas from "./sections/Duvidas.jsx";
import Contato from "./sections/Contato.jsx";
import Rodape from "./sections/Rodape.jsx";

/* ============================================================
   A ORDEM DAS SEÇÕES é o argumento dela, na ordem em que convence:

   1. CAPA — a frase da bio, em tamanho de capa de revista.
   2. A MARCA — "se você não investe na sua marca, por que o cliente
      deveria?" e o contraponto do "outra empresa fez por menos".
      A objeção de preço vem PRIMEIRO porque é ela que trava o cliente;
      desarmada aqui, o resto da página é conversa.
   3. QUIZ — e agora que a pessoa quer, ela descobre do que precisa.
   4. SERVIÇOS — o detalhe do que o quiz apontou.
   5. O FEED — as peças dela, num carrossel que se arrasta. É a única
      seção que imita o produto em vez de descrevê-lo.
   6. DEPOIMENTOS — pronta e vazia, e a página diz por quê.
   7. DÚVIDAS — as objeções que sobraram.
   8. CONTATO — o passo.

   QUIZ ANTES DE SERVIÇOS, e não depois. Com quatro opções na tela, quem
   não sabe o que precisa não escolhe nenhuma e vai embora; três
   perguntas resolvem isso melhor do que qualquer texto explicando as
   diferenças. Quem pulou o quiz ainda lê a lista normalmente — as duas
   leituras funcionam, e nenhuma depende da outra.
   ============================================================ */

export default function App() {
  useEffect(() => iniciarRolagem(), []);

  return (
    <>
      <a className="pular" href="#main">
        Pular para o conteúdo
      </a>

      <Nav />

      <main id="main">
        <Capa />
        <MarcaSecao />
        <Quiz />
        <Fita velocidade={50} direcao={1} />
        <Servicos />
        <Feed />
        <Depoimentos />
        <Duvidas />
        <Contato />
      </main>

      <Rodape />
    </>
  );
}
