const detailsContent = document.getElementById("id-details-js");
const params = new URLSearchParams(location.search);
const id = params.get("id");
const idDetails = data.events.find(event => event._id === id);

detailsContent.innerHTML = `
<div class="image-details">
  <img src="${idDetails.image}" alt="" width="250" >
</div>
<div class="detalles">
  <div class="details-text">
    <h5>${idDetails.name}</h5>
    <p>Date: ${idDetails.date}</p>
    <p>Description: ${idDetails.description}</p>
    <p>Category: ${idDetails.category}</p>
    <p>Capacity: ${idDetails.capacity}</p>
    <p>Estimate: ${idDetails.estimate}</p>
    <p>Price: $${idDetails.price}</p>
  </div>
</div>`;