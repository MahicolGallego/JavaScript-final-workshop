export function PrivateLayout($content, logic) {
  const $root = document.getElementById("root");
  //   $root.innerHTML = /*html*/ `
  //     <ul>
  //         <li><button>Usuarios</button></li>
  //         <li><button>Tasks</button></li>
  //         <li><button id="logout">LogOut</button></li>
  //     </ul>
  //     ${$content}
  //     `;

  const $nav = /*html*/ `
    <ul>
        <li><a href="/users">Usuarios</a></li>
        <li><a href="/tasks">Tasks</a></li>
        <li><a href="/logout">LogOut</a></li>
    </ul>
    `;

  $root.innerHTML = /*html*/ `
  ${$nav}
  ${$content}
  `;

  //Logic

  logic();

  const $anchorLogOut = document.querySelector("[href='/logout']");
  $anchorLogOut.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigateTo("/login");
  });
}
