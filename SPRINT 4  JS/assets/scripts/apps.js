
document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-template");
   function crearCard(event) {
    return `
      <div class="card" style="width: 18rem;">
        <img src="${event.image}" class="card-img-top" alt="...">
        <div class="card-body text-white">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text">${event.description}</p>
          <a href="./assets/details.html?id=${event._id}" class="btn btn-primary">Details</a>
        </div>
      </div>`;
  }

 function mostrarCard(data) {
    cardContainer.innerHTML = "";
    let template = "";
    for (const event of data) {
      template += crearCard(event);
    }
    cardContainer.innerHTML += template;
  }

  


    fetch('https://mindhub-xj03.onrender.com/api/amazing')
      .then(response => response.json())
      .then(data => {
        mostrarCard(data.events);

        const forms = document.getElementById("todosloschecks");
        const checkFiltrado = data.events.map(event => event.category);
        const checkSinRepetir = new Set(checkFiltrado);
        const arrayChecksCategory = Array.from(checkSinRepetir);

        const checksFiltrados = [
          ...new Set(data.events.map(event => event.category)),
        ];

        function crearCheck(check) {
          const div = document.createElement("div");
          div.classList.add("form-check");

          const input = document.createElement("input");
          input.type = "checkbox";
          input.className = "form-check-input";
          input.value = check;
          input.id = `${check}-check`;
          input.name = "checkFiltrados";

          const label = document.createElement("label");
          label.className = "form-check-label";
          label.htmlFor = `${check}-check`;
          label.textContent = check;

          div.appendChild(input);
          div.appendChild(label);

          return div;
        }

        function pintarCheckboxes(checksFiltrados, elemento) {
          const fragment = document.createDocumentFragment();

          for (const checkFiltrado of checksFiltrados) {
            const div = crearCheck(checkFiltrado);
            fragment.appendChild(div);
          }

          elemento.appendChild(fragment);
        }

        pintarCheckboxes(checksFiltrados, forms);

        const checkboxes = forms.querySelectorAll('input[type="checkbox"]');
        const buscador = document.getElementById("buscar-card");

        function filtrarChecks(checkFiltrados) {
          let categoriaSeleccionada = [];
          checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
              categoriaSeleccionada.push(checkbox.labels[0].innerText);
            }
          });

          let busqueda = buscador.value.toLowerCase().trim();

          if (categoriaSeleccionada.length > 0 || busqueda !== "") {
            let eventosFiltrados = data.events.filter((event) => {
              let coincideNombreCategoria =
                categoriaSeleccionada.length === 0 ||
                categoriaSeleccionada.includes(event.category);
              let coincideNombre = event.name.toLowerCase().includes(busqueda);
              let coincideDescripcion = event.description
                .toLowerCase()
                .includes(busqueda);
              return coincideNombreCategoria && (coincideNombre || coincideDescripcion);
            });
            mostrarCard(eventosFiltrados);
          } else {
            mostrarCard(data.events);
          }
        }

        checkboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", filtrarChecks);
        });

        buscador.addEventListener("keyup", filtrarChecks);
      })
      .catch(error => console.error("Error", error));
  }
)
