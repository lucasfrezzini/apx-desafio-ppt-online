import "@/style.css";
import "@components/button/button";
import "@components/bottomHands/bottomHands";
import "@components/counter/counter";
import "@pages/Home";
import "@pages/Rules";
import "@pages/Game";
import "@pages/Result";
import { getCleanPathForURL } from "./router/router";
import { handleRoute } from "./router/router";
import { state } from "./state/state";

// Arrancamos el programa y analizamos la ruta y verificamos si hay una sesión guardada
window.addEventListener("load", () => {
  const initialPath = getCleanPathForURL();
  handleRoute(initialPath);
  // const storedState = localStorage.getItem("stateData");
  // if (storedState) {
  //   state.setState(JSON.parse(storedState));
  // }
});

// Analizamos el cambio de ruta para cargar la nueva vista
window.addEventListener("popstate", () => {
  const initialPath = getCleanPathForURL();
  handleRoute(initialPath);
});
