export function NotFoundPage() {
  const $root = document.getElementById("root");
  // const $myDiv = document.createElement("DIV");
  // $myDiv.textContent = "Hola mundo. Error: page not found";
  $root.innerHTML = /*html*/ `
    <div><p>Hola mundo. Error: page not found</p></div>
    `;
  // $root.appendChild($myDiv);
}
