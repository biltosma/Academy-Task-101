const url = 'https://jsonplaceholder.typicode.com/posts';
const pavadinimas = document.getElementById("pavadinimas");
const errorMsg = document.getElementById("error");
const btn = document.getElementById("btn");
const div = document.getElementById("container");
const form = document.getElementById("nForm");
// ----atgal mygtukas
const btnBack = document.createElement('button');
btnBack.textContent = 'Bendras Sąrašas';
btnBack.setAttribute("id", "atgal");
btnBack.setAttribute("class", "btn btn-secondary mt-3");
//------Naujos Formos mygtukas
const btnNew = document.createElement('button');
btnNew.textContent = 'New Record Form';
btnNew.setAttribute("id", "naujas");
btnNew.setAttribute("type", "button");
btnNew.setAttribute("class", "btn btn-info mb-2");
// --------Numeruoto sarašo <ol> Tag'as
const sarasas = document.createElement('ol');
sarasas.setAttribute("id", "list");
sarasas.setAttribute("class", "list-group list-group-numbered");


// ---------eventListener'iai----------
btnBack.addEventListener('click', start);
btnNew.addEventListener('click', newForm)
form.addEventListener('submit', addList);



// funkcijos---------
// ------------Jei klaida, parodo ekrane klaidą------------
function empty(err) {
  pavadinimas.textContent = 'Ups!.. Sąrašas tušias...';
  errorMsg.textContent = `${err}`;
}
// ------------ GET:rodo puslpayje bendra sarasa-----------
function start() {
  axios.get(url)
    .then(res => getData(res))
    .catch(err => empty(err))
}
// -------------GET: Rodomos iraso detales-----------------
function showDetails(id) {
  axios.get(`${url}/${id}`)
    .then(res => details(res))
    .catch(err => empty(err))
}
//----------------POST funkcija (duomenų gavimas ir siuntimas)---------
async function addList(e) {
  e.preventDefault();
  let data = Object.fromEntries(new FormData(e.target));
  await postRez(url, data);
}
// --------------POST: Rodomos iraso detales-----------------
async function postRez(link, data) {
  await axios.post(link, data)
    .then(res => details(res))
    .catch(err => empty(err))
}
// -------------HTML saraso puslapis #1---------------------
function getData(a) {
  pavadinimas.textContent = 'Bendras Sąrašas';
  btn.appendChild(btnNew);
  let html = '';
  div.textContent = '';
  form.innerHTML = '';
  div.appendChild(sarasas);
  for (let i = 0; i < a.data.length; i++) {
    html += `<li class="list-group-item list-group-item-action mb-1" onclick="showDetails(${a.data[i].id}); return false">${a.data[i].title}</li>`;
  }
  sarasas.innerHTML = html;
}
// -------------HTML vieno iraso (details) puslapis #2---------------------
function details(res) {
  btn.textContent = "";
  form.innerHTML = "";
  pavadinimas.textContent = 'Detalės';
  div.innerHTML = `<div class="card" style="width: 30rem;">
    <div class="card-body">
    <h4 class="card-title">Pavadinimas:<br><b> ${res.data.title}</b></h4>
    <h6 class="card-text"><b>Aprašymas</b>:<br> ${res.data.body}</h6>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Vartotojo Id: ${res.data.userId}</li>
    <li class="list-group-item">Įrašo Id: ${res.data.id}</li>
  </ul>
</div>`;
  div.appendChild(btnBack)
}
// -------------HTML Naujo iraso puslapis #3---------------------
function newForm() {
  btn.textContent = "";
  div.textContent = "";
  pavadinimas.textContent = 'Naujas Įrašas';
  form.innerHTML = `
  <div class="mb-3">
    <label for="userId" class="form-label">Vartotojo Id</label>
    <input type="number" class="form-control" id="userId" name="userId">
  </div>
  <div class="mb-3">
    <label for="title" class="form-label">Pavadinimas</label>
    <input type="text" class="form-control" id="title" name="title">
  </div>
  <div class="mb-3">
    <label for="body" class="form-label">Aprašymas</label>
    <input type="text" class="form-control" id="body" name="body">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
`;
  form.after(btnBack)
}