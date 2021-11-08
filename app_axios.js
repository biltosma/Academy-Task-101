const url = 'https://jsonplaceholder.typicode.com/posts';
const pavadinimas = document.getElementById("pavadinimas");
const errorMsg = document.getElementById("error");
const btn = document.getElementById("btn");
const div = document.getElementById("container");

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


start()

// funkcijos---------
// ------------Jei klaida, parodo ekrane klaidą--------------
function empty(e) {
  pavadinimas.textContent = 'Ups!.. Sąrašas tušias...';
  errorMsg.textContent = `${e}`;
}

// ------------ rodo puslpayje sarasa-------------------
function start() {
  axios.get(url)
    .then(res => getData(res))
    .catch(err => empty(err))
}

// -------------iteruoja JSON duomenis, grazina pavadinima
function getData(a) {
  pavadinimas.textContent = 'Bendras Sąrašas';
  btn.appendChild(btnNew);
  document.getElementById('naujas').addEventListener('click', newForm)
  let html = '';
  div.textContent = '';
  div.appendChild(sarasas);
  const list = document.getElementById("list");
  for (let i = 0; i < a.data.length; i++) {
    html += `<li class="list-group-item list-group-item-action mb-1" onclick="showDetails(${a.data[i].id}); return false">${a.data[i].title}</li>`;
  }
  list.innerHTML = html;
}

// --------------------Show Form --> Rodomos iraso detales-----------------
function showDetails(id) {
  axios.get(`${url}/${id}`)
    .then(res => details(res))
    .catch(err => empty(err))
}

function details(res) {
  btn.textContent = "";
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
  document.getElementById('atgal').addEventListener('click', start)
}


// -------------Duomenys naujam irašui---------------
function newForm() {
  btn.textContent = "";
  pavadinimas.textContent = 'Naujas Įrašas';
  div.innerHTML = `<form>
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
  <button type="button" id="submit" class="btn btn-primary">Submit</button>
</form>`;
  div.appendChild(btnBack)
  document.getElementById('atgal').addEventListener('click', start)
  document.getElementById('submit').addEventListener('click', addList)
}

//----------------POST funkcija (duomenų gavimas ir siuntimas)---------
async function addList() {
  try {
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;
    let userId = document.getElementById('userId').value;
    let postData = { title: title, body: body, userId: userId };
    let rez = await axios.post(url, postData);
    details(rez);
  } catch { err => console.log(err) }
}