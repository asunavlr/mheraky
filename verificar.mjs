/* checagem rápida num navegador de verdade: erro de JavaScript, corte
   lateral e altura da página, em três larguras */
import { chromium } from "playwright";

const b = await chromium.launch();
for (const [nome, largura] of [
  ["mesa", 1920],
  ["tablet", 834],
  ["celular", 390],
]) {
  const p = await b.newPage({ viewport: { width: largura, height: 900 } });
  const erros = [];
  p.on("pageerror", (e) => erros.push(String(e).slice(0, 120)));
  p.on("console", (m) => m.type() === "error" && erros.push(m.text().slice(0, 120)));

  await p.goto("http://localhost:5183/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  /* rola a página inteira: os ScrollTrigger só existem depois de o
     gatilho passar, e erro de animação não aparece parado no topo */
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
  });
  await p.waitForTimeout(800);

  const info = await p.evaluate(() => ({
    altura: Math.round(document.body.scrollHeight),
    texto: document.body.innerText.trim().length,
    corta: document.documentElement.scrollWidth > innerWidth + 2,
  }));

  console.log(
    `${nome.padEnd(9)} ${String(largura).padStart(4)}px  altura ${String(info.altura).padStart(6)}  texto ${info.texto}  ${info.corta ? "CORTA NA HORIZONTAL" : "sem corte lateral"}  erros: ${erros.length || "nenhum"}`,
  );
  if (erros.length) erros.slice(0, 3).forEach((e) => console.log("    ", e));
  await p.close();
}
await b.close();
