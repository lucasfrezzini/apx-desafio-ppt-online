import { initChoice } from "@/pages/Choice";
import { runGameOptions } from "@/pages/Game";
import { initHome } from "@/pages/Home";
import { initResult } from "@/pages/Result";
import { initRules } from "@/pages/Rules";

interface Route {
  path: string;
  render: () => any;
}

// TODO routes con una coleccion de rutas
const routes: Route[] = [
  {
    path: "/",
    render: initHome,
  },
  {
    path: "/rules",
    render: initRules,
  },
  {
    path: "/choice",
    render: initChoice,
  },
  {
    path: "/game",
    render: runGameOptions,
  },
  {
    path: "/result",
    render: initResult,
  },
];

// TODO fn handleRoute para evaluar si existe la ruta y correr el componente
export function handleRoute(route: string) {
  routes.forEach((r) => {
    if (r.path == route) {
      r.render();
    }
  });
}

// TODO fn goTo para indicar donde queremos ir
export function goTo(path: string) {
  history.pushState({}, "", path);
  handleRoute(path);
}
