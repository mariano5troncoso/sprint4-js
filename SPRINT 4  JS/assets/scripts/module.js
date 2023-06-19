const cardContainer = document.getElementById("card-template");
export function crearCard(event) {
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

export function mostrarCard(data) {
    cardContainer.innerHTML = "";
    let template = "";
    for (const event of data) {
      template += crearCard(event);
    }
    cardContainer.innerHTML += template;
  }
  export function filtrarEventosFuturos(data) {
  
 
    const currentDate = new Date();
      
     
    const upcoming = data.filter((event) => new Date(event.date) > currentDate);
      
     
    mostrarCard(upcoming);
  }
export function filtrarEventosPasados(data) {
  
 
    const currentDate = new Date();
      
     
    const past = data.filter((event) => new Date(event.date) < currentDate);
      
     
    mostrarCard(past);
  }