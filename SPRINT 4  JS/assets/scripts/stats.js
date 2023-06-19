const $tablaContenido = document.getElementById("tablaContenido");

function mostrarTabla1(minAssistance, maxAssistance, minPercent, maxPercent, moreCap) {
  const tablaUnoContainer = document.getElementById("eventsTable1");

  tablaUnoContainer.innerHTML = `
    <tr>
      <td>${maxAssistance.name} ${maxPercent}%</td>       
      <td>${minAssistance.name} ${minPercent}%</td>
      <td>${moreCap.name} ${moreCap.capacity.toLocaleString()}</td>
    </tr>
  `;
}

function tablaUno(events, currentDate) {
  let infoEvent = events.map((event) => event.events);
  infoEvent = events.filter((event) => event.date < currentDate).sort((a, b) => (100 * a.assistance / a.capacity) - (100 * b.assistance / b.capacity));

  const minAssistance = infoEvent[0];
  const maxAssistance = infoEvent[infoEvent.length - 1];

  const minPercent = (100 * minAssistance.assistance / minAssistance.capacity).toFixed(1);
  const maxPercent = (100 * maxAssistance.assistance / maxAssistance.capacity).toFixed(1);

  const capacity = events.sort((a, b) => a.capacity - b.capacity);
  const moreCap = capacity[capacity.length - 1];

  mostrarTabla1(minAssistance, maxAssistance, minPercent, maxPercent, moreCap);
}

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((amazing) => {
    const todayDate = amazing.currentDate;
    tablaUno(amazing.events, amazing.currentDate);

    function tablaDos() {
      const arrayUpcomingCat = [...new Set(amazing.events.filter((element) => element.date > todayDate).map((event) => event.category))];

      arrayUpcomingCat.forEach((category) => {
        const eventCategory = amazing.events.filter((event) => event.category == category && event.date > todayDate);

        const revenueTotalByCategory = eventCategory.reduce((acc, event) => {
          return acc + (event.estimate * event.price);
        }, 0).toLocaleString();

        const percentageTotalByCategory = (eventCategory.reduce((acc, event) => {
          return acc + ((event.estimate * 100) / event.capacity);
        }, 0) / eventCategory.length).toFixed(2);

        const tablaDosContainer = document.getElementById("upcomingCategories");
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = category;
        tr.appendChild(td);

        const tdRevenue = document.createElement("td");
        tdRevenue.textContent = `$${revenueTotalByCategory}`;
        tr.appendChild(tdRevenue);

        const tdPercentage = document.createElement("td");
        tdPercentage.textContent = `${percentageTotalByCategory}%`;
        tr.appendChild(tdPercentage);

        tablaDosContainer.appendChild(tr);
      });
    }

    tablaDos();

    function tablaTres() {
      const arrayUpcomingCat = [...new Set(amazing.events.filter((element) => element.date < todayDate).map((event) => event.category))];

      arrayUpcomingCat.forEach((category) => {
        const eventCategory = amazing.events.filter((event) => event.category == category && event.date < todayDate);

        const revenueTotalByCategory = eventCategory.reduce((acc, event) => {
          return acc + (event.assistance * event.price);
        }, 0).toLocaleString();

        const percentageTotalByCategory = (eventCategory.reduce((acc, event) => {
          return acc + ((event.assistance * 100) / event.capacity);
        }, 0) / eventCategory.length).toFixed(2);

        const tablaTresContainer = document.getElementById("pastCategories");
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = category;
        tr.appendChild(td);

        const tdRevenue = document.createElement("td");
        tdRevenue.textContent = `$${revenueTotalByCategory}`;
        tr.appendChild(tdRevenue);

        const tdPercentage = document.createElement("td");
        tdPercentage.textContent = `${percentageTotalByCategory}%`;
        tr.appendChild(tdPercentage);

        tablaTresContainer.appendChild(tr);
      });
    }

    tablaTres();
  })
  .catch((error) => console.error(error));
