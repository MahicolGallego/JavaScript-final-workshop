import { navigateTo } from "../../Router";
import { decryptData } from "../../helpers";

export function LoginPage() {
  const $root = document.getElementById("root");

  $root.innerHTML = /*html*/ `
    <form action="">
        <input type="email" placeholder="example@gmail.com..." value="maicol@gmail.com">
        <input type="password" placeholder="Digita tu contraseña..." value="12345">
        <button type="submit">Iniciar sesion</button>
    </form>
    `;

  //logic

  const $myLoginForm = document.getElementsByTagName("form")[0];
  $myLoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const $userEmail = document.getElementsByTagName("input")[0].value;
    const $userPassword = document.querySelector('[type="password"]').value;

    if (!$userEmail || !$userPassword) alert("todos los campos son requeridos");

    //Obtenemos los usuarios registrados

    const usersFetched = await fetch("http://localhost:3000/users");

    if (!usersFetched.ok) alert("Error al inicar sesion ");

    const usersToJson = await usersFetched.json();

    // console.log(usersToJson);

    const userFound = usersToJson.find(
      (user) => user.email === $userEmail.toLowerCase()
    );

    // console.log(usersToJson, userFound);

    if (!userFound) alert("usuario no encontrado");

    if (decryptData(userFound.password) !== $userPassword)
      alert("Contraseña incorrecta");

    const token = Math.random().toString(36).substring(2);
    localStorage.setItem("token", token);
    // console.log(localStorage.getItem("token"));
    navigateTo("/tasks");
  });
}
