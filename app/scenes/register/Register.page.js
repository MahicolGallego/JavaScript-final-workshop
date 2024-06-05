import { navigateTo } from "../../Router";
import { encryptData } from "../../helpers";

export function RegisterPage() {
  const $root = document.getElementById("root");
  //   const $myDiv = document.createElement("DIV");
  //   $myDiv.innerHTML = /*html*/ `
  //     <form action="">
  //         <input type="text" placeholder="Nombre de usuario por favor..." value="Mahicol">
  //         <input type="email" placeholder="example@gmail.com..." value="maicol@gmail.com">
  //         <input type="password" placeholder="Digita tu contraseña..." value="12345">
  //         <button type="submit">Registrarme</button>
  //     </form>
  //     `;
  $root.innerHTML = /*html*/ `
    <form action="">
        <input type="text" placeholder="Nombre de usuario por favor..." value="Mahicol">
        <input type="email" placeholder="example@gmail.com..." value="maicol@gmail.com">
        <input type="password" placeholder="Digita tu contraseña..." value="12345">
        <button type="submit">Registrarme</button>
    </form>
    `;
  //   console.log($myDiv.isConnected);
  //   $root.appendChild($myDiv);
  //   console.log($myDiv.isConnected);

  //logic

  const $myRegisterForm = document.getElementsByTagName("form")[0];
  $myRegisterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const $userName = document.querySelector('[type="text"]').value;
    const $userEmail = document.getElementsByTagName("input")[1].value;
    const $userPassword = document.querySelector('[type="password"]').value;

    if (!$userName || !$userEmail || !$userPassword)
      alert("Todos los campos son requeridos");

    // console.log($userName, $userPassword, $userEmail);

    // Registrar los datos en la db.json

    const registreUser = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({
        name: $userName.toLowerCase(),
        email: $userEmail.toLowerCase(),
        password: encryptData($userPassword),
      }),
    });

    if (!registreUser.ok) alert("Error al crear el usuario");

    alert("El usuario ha sido creado");

    navigateTo("/login");
  });
}
