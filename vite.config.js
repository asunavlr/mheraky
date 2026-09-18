import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  /* `resolveDispatcher() is null` é a assinatura de duas cópias do React
     na página: `@gsap/react` declara React como dependência e o
     pré-empacotador pode resolvê-lo por outro caminho. `dedupe` obriga
     as duas a apontarem para a mesma cópia. */
  plugins: [react(), tailwind()],
  resolve: { dedupe: ["react", "react-dom"] },
  optimizeDeps: { include: ["react", "react-dom", "@gsap/react", "gsap"] },
  server: { port: 5183, strictPort: true },
});
