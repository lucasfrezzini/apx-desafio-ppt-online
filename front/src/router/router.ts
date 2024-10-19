import { initChoice } from "@/pages/Choice";
import { initErrorRoom } from "@/pages/ErrorRoom";
import { runGameOptions } from "@/pages/Game";
import { initHome } from "@/pages/Home";
import { initInfoRoom } from "@/pages/InfoRoom";
import { initLobby } from "@/pages/Lobby";
import { initResult } from "@/pages/Result";
import { initRules } from "@/pages/Rules";
import { initPlayerInfo } from "@/pages/SetPlayer";

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
    path: "/setPlayer",
    render: initPlayerInfo,
  },
  {
    path: "/infoRoom",
    render: initInfoRoom,
  },
  {
    path: "/lobby",
    render: initLobby,
  },
  {
    path: "/errorRoom",
    render: initErrorRoom,
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
