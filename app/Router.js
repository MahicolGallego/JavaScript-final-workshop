import { PrivateLayout } from "./components";
import { routes } from "./routes";

export async function Router() {
  //   console.log("Hola, desde el Router");

  //   console.log(window.location.pathname);

  //obtenemos el path actual(al que quiere ir el usuario)
  const currentPath = window.location.pathname;

  //buscamos en las routes tanto publicas como privadas si existe a
  //la que el usuario quiere ir

  const publicRoute = routes.public.find((route) => {
    return route.path === currentPath;
  });

  const privateRoute = routes.private.find(
    (route) => route.path === currentPath
  );

  if (currentPath === "/login" || currentPath === "/register") {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      navigateTo("/tasks");
      return;
    }
  }

  //si la pagina existe muestra el sitio deseado
  if (publicRoute) {
    // console.log("holaaaa");
    publicRoute.page();
    return;
  }

  if (privateRoute) {
    if (!localStorage.getItem("token")) {
      navigateTo("/login");
      return;
    }
    const { $content, logic } = privateRoute.page();
    PrivateLayout($content, logic);
    return;
  }
  //Si la ruta no existe vamos al not found
  navigateTo("/not-found");
}

//realizamos nuestra funcion para utilizar otros apartados
//que es para navegar a...
export function navigateTo(path) {
  window.history.pushState({}, "", window.location.origin + path);
  //history => accede a al historial de atras y adelante(para donde va y donde esta)
  //pushState => toma la variable/estado URL y la cambia por lo que le pase como 3rd
  //parameter
  //-> origin: es la ruta raiz del sitio. e.g.: https://youtube.com/
  Router();
  //Aplicamos recursividad y volvemos a llamar a nuestro Router;
}
