import { initChoice } from "@/pages/Choice";
import { initErrorRoom } from "@/pages/ErrorRoom";
import { runGameOptions } from "@/pages/Game";
import { initHome } from "@/pages/Home";
import { initInfoRoom } from "@/pages/InfoRoom";
import { initLobby } from "@/pages/Lobby";
import { initResult } from "@/pages/Result";
import { initRules } from "@/pages/Rules";
import { initPlayerInfo } from "@/pages/SetPlayer";
import { initRoomConfig } from "@/pages/SetRoom";

interface Route {
  path: RegExp;
  render: Function;
}

// TODO routes con una coleccion de rutas
const routes: Route[] = [
  {
    path: /^\/$/,
    render: initHome,
  },
  {
    path: /^\setPlayer$/,
    render: initPlayerInfo,
  },
  {
    path: /^\setRoom$/,
    render: initRoomConfig,
  },
  {
    path: /^\infoRoom$/,
    render: initInfoRoom,
  },
  {
    path: /^\lobby$/,
    render: initLobby,
  },
  {
    path: /^\errorRoom$/,
    render: initErrorRoom,
  },
  {
    path: /^\rules$/,
    render: initRules,
  },
  {
    path: /^\choice$/,
    render: initChoice,
  },
  {
    path: /^\game$/,
    render: runGameOptions,
  },
  {
    path: /^\result$/,
    render: initResult,
  },
];

// TODO fn handleRoute para evaluar si existe la ruta y correr el componente
export function handleRoute(fullPath: string) {
  routes.forEach((route) => {
    if (route.path.test(fullPath)) {
      route.render();
    }
  });
}

// TODO fn goTo para indicar donde queremos ir
export function goTo(path: string) {
  const fullPath = getCleanPathForURL(path);
  history.pushState({}, "", path);
  handleRoute(fullPath);
}

export function getCleanPathForURL(path?: string) {
  const fullPath = path || window.location.pathname;
  const basePath = "/apx-desafio-ppt-online";

  //verifica si el fullPath empieza con el basePath
  if (fullPath.startsWith(basePath)) {
    return fullPath.replace(basePath, "") || "/";
  }
  return fullPath;
}
