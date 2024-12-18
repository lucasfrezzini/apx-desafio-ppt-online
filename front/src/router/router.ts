import { initChoice } from "@/pages/Choice";
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

const BASE_PATH = isGithubPages() ? "/apx-desafio-ppt-online" : "/";

// TODO routes con una coleccion de rutas
const routes: Route[] = [
  {
    path: /^\/$/,
    render: initHome,
  },
  {
    path: /^\/setPlayer$/,
    render: initPlayerInfo,
  },
  {
    path: /^\/setRoom$/,
    render: initRoomConfig,
  },
  {
    path: /^\/infoRoom$/,
    render: initInfoRoom,
  },
  {
    path: /^\/lobby$/,
    render: initLobby,
  },
  {
    path: /^\/rules$/,
    render: initRules,
  },
  {
    path: /^\/choice$/,
    render: initChoice,
  },
  {
    path: /^\/game$/,
    render: runGameOptions,
  },
  {
    path: /^\/result$/,
    render: initResult,
  },
];

export function handleRoute(fullPath: string) {
  const newRoute = isGithubPages() ? fullPath.replace(BASE_PATH, "") : fullPath;

  routes.forEach((route) => {
    if (route.path.test(newRoute)) {
      route.render();
    }
  });
}

export function goTo(path: string) {
  const completePath = isGithubPages() ? BASE_PATH + path : path;

  history.pushState({}, "", completePath);
  handleRoute(completePath);
}

export function getCleanPathForURL(path: string) {
  const fullPath = path;
  const basePath = "/apx-desafio-ppt-online";

  //verifica si el fullPath empieza con el basePath
  if (fullPath.startsWith(basePath)) {
    return fullPath.replace(basePath, "") || "/";
  }
  return fullPath;
}

function isGithubPages() {
  return location.host.includes("github.io");
}
