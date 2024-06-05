import { navigateTo } from "../../Router";

export function TasksPage() {
  const $content = /*html*/ `
    <form>
      <input type="text" placeholder="Titulo...">
      <input type="text" placeholder="Descripcion...">
      <select name="priority">
        <option value="" disabled selected>-- select opt --</option>
        <option value="high">Alta</option>
        <option value="medium">Media</option>
        <option value="low">Baja</option>
      </select>
      <input type="date" id="date">
      <input type="submit" value="Registrar tarea">
    </form>

    <div id="all-tasks"></div>
    `;

  //Logic

  const showTasks = async () => {
    const $containerTask = document.getElementById("all-tasks");
    $containerTask.innerHTML = ``;

    const fetchAllTasks = await fetch("http://localhost:3000/tasks");

    const dataJson = await fetchAllTasks.json();

    dataJson.forEach((task) => {
      $containerTask.innerHTML += /*html*/ `
        <div>
          <p>${task.title}</p>
          <p>${task.date}</p>
          <button class="edit-class" data-id="${task.id}">Editar</button>
          <button>Eliminar</button>
          <button>Vista Previa</button>
        </div>
        `;
    });
  };

  const logic = async () => {
    showTasks();

    const $myRegisterTaskForm = document.querySelector("form");
    // console.log($myRegisterTaskForm);

    const $editBtns = document.getElementsByClassName("edit-class");

    for (let $editBtn of $editBtns) {
      $editBtn.addEventListener("click", () => {
        // navigateTo(`/tasks/edit?taskid=${$editBtn.getAttribute("data-id")}`);
        navigateTo(`/tasks/edit?taskid=${$editBtn.dataset.id}`);
      });
    }

    $myRegisterTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      //obtenemos los value de los inputs

      const $inputTitle = document.querySelectorAll("[type='text']")[0].value;
      const $inputDescription =
        document.querySelectorAll("[type='text']")[1].value;
      const $inputSelect = document.querySelector("[name='priority']").value;
      const $inputdate = document.getElementById("date").value;

      console.log($inputTitle, $inputSelect, $inputDescription, $inputdate);

      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: $inputTitle,
          description: $inputDescription,
          priority: $inputSelect,
          date: $inputdate,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al registrar la tarea" + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          showTasks();
        })
        .catch((error) => {
          let errorMessage =
            error.message || "Error al realizar el registro de tareas";
          console.error(errorMessage);
          reject(error);
        });
    });
  };

  return { $content, logic };
}
