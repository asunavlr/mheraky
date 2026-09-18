import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* A rolagem suave e o GSAP compartilham UM relógio.

   Com dois laços independentes, o Lenis move a página num quadro e o
   ScrollTrigger lê a posição no seguinte: as animações ficam sempre um
   passo atrás do que se vê. Dirigindo o Lenis pelo ticker do GSAP, os
   dois avançam no mesmo instante — e num site que é quase todo paralaxe
   essa defasagem seria o defeito mais visível da página. */
let lenis = null;

export function iniciarRolagem() {
  if (lenis || prefersReduced()) return null;

  lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 });
  lenis.on("scroll", ScrollTrigger.update);

  const passo = (t) => lenis?.raf(t * 1000);
  gsap.ticker.add(passo);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(passo);
    lenis?.destroy();
    lenis = null;
  };
}

export function irPara(alvo) {
  if (lenis) lenis.scrollTo(alvo, { offset: -72, duration: 1.2 });
  else document.querySelector(alvo)?.scrollIntoView({ behavior: "smooth" });
}

export function prefersReduced() {
  return (
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ============================================================
   PARALAXE, em uma linha.

   A página usa o efeito uma dúzia de vezes e sempre do mesmo jeito: o
   elemento anda no eixo Y enquanto a seção atravessa a tela, amarrado à
   rolagem por `scrub`.

   Vale isolar por dois motivos. O primeiro é que `scrub` sem número
   gruda a animação na barra de rolagem e fica dura; com 0.6 ela tem
   inércia, e é a inércia que faz parecer profundidade em vez de
   deslizamento. O segundo é `ease: "none"`: qualquer suavização aqui
   briga com o scrub e produz um solavanco no fim do percurso.

   A regra que vale para todos os usos: é a DIFERENÇA de velocidade
   entre as camadas que o olho lê como espaço. Duas camadas na mesma
   distância equivalem a nenhuma paralaxe. */
export function paralaxe(alvo, distancia, gatilho, opcoes = {}) {
  if (prefersReduced()) return null;
  return gsap.to(alvo, {
    y: distancia,
    ease: "none",
    scrollTrigger: {
      trigger: gatilho,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      ...opcoes,
    },
  });
}

/* A entrada padrão das seções: sobe e aparece, escalonada.

   `autoAlpha` e não `opacity` porque ele também mexe em `visibility` —
   o elemento invisível sai do alcance do leitor de tela e do ponteiro
   enquanto ainda não chegou. */
export function entrar(alvo, gatilho, opcoes = {}) {
  if (prefersReduced()) return null;
  return gsap.from(alvo, {
    autoAlpha: 0,
    y: 34,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.08,
    scrollTrigger: { trigger: gatilho, start: "top 78%", ...opcoes },
  });
}

export { gsap, ScrollTrigger, useGSAP };
