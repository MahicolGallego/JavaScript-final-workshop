import { navigateTo } from "../../Router";

export function TasksEditPage() {
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
      <input type="submit" value="Editar tarea">
    </form>

    <div id="all-tasks"></div>
    `;

  const logic = async () => {
    //obtener los search params que le pasamos por el url
    //por medio del atributo search del objeto window
    //-> Me regresa un str

    const searchParams = window.location.search;
    console.log(searchParams);

    //Transformamos a URLSearchParams para obtener una
    //lista con cada uno de los search params como atributos(objetos)

    const paramsTransformed = new URLSearchParams(searchParams);
    console.log(paramsTransformed);

    //el objeto lista es de solo lectura, por lo cual debemos
    //accedder interactuar con gets and sets
    const taskid = paramsTransformed.get("taskid");
    console.log(taskid);

    //con fetch traemos toda la info de una tarea(por su id)
    const fetchedTask = await fetch(`http://localhost:3000/tasks/${taskid}`);
    const data = await fetchedTask.json();
    console.log(data);

    const $inputTitle = document.querySelectorAll("[type='text']")[0];
    const $inputDescription = document.querySelectorAll("[type='text']")[1];
    const $inputSelect = document.querySelector("[name='priority']");
    const $inputdate = document.getElementById("date");

    $inputTitle.value = data.title;
    $inputDescription.value = data.description;
    $inputSelect.value = data.priority;
    $inputdate.value = data.date;

    const $myRegisterTaskForm = document.querySelector("form");

    $myRegisterTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      //obtenemos los value de los inputs

      console.log($inputTitle, $inputSelect, $inputDescription, $inputdate);

      fetch(`http://localhost:3000/tasks/${taskid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: $inputTitle.value,
          description: $inputDescription.value,
          priority: $inputSelect.value,
          date: $inputdate.value,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al editar la tarea" + response.status);
          }
          alert("Tarea actualizada exitosamente");
          return;
        })
        .catch((error) => {
          let errorMessage =
            error.message || "Error al editar el registro de tareas";
          console.error(errorMessage);
          reject(error);
        });

      navigateTo("/tasks");
    });
  };

  return {
    $content,
    logic,
  };
}
