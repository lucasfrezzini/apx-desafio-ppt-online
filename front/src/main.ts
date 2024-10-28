import "@/style.css";
import { handleRoute } from "./router/router";
import "@components/button/button";
import "@components/bottomHands/bottomHands";
import "@components/counter/counter";
import "@pages/Home";
import "@pages/Rules";
import "@pages/Game";
import "@pages/Result";

// Arrancamos el programa y analizamos la ruta
window.addEventListener("load", () => {
  handleRoute(location.pathname);
});

// Analizamos el cambio de ruta para cargar la nueva vista
window.addEventListener("popstate", () => {
  handleRoute(location.pathname);
});
