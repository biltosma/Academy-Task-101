const url = 'https://jsonplaceholder.typicode.com/posts';
const pavadinimas = document.getElementById("pavadinimas")
const btn = document.getElementById("btn")
const div = document.getElementById("container")

// ----atgal mygtukas
const btnBack = document.createElement('button');
btnBack.innerHTML = 'Atgal';
btnBack.setAttribute("id", "atgal");
btnBack.setAttribute("class", "btn btn-secondary mt-3");

//------Naujos Formos mygtukas
const btnNew = document.createElement('button');
btnNew.innerHTML = 'New Record Form';
btnNew.setAttribute("id", "naujas");
btnNew.setAttribute("type", "button");
btnNew.setAttribute("class", "btn btn-info mb-2");

// --------Numeruoto sarašo Tag'as
const sarasas = document.createElement('ol');
sarasas.setAttribute("id", "list");
sarasas.setAttribute("class", "list-group list-group-numbered");

start()
// funkcijos----
// ------------ rodo puslpayje sarasa-------------------
function start() {
  axios.get(url)
    .then(res => {
      if (!res) {
        pavadinimas.innerHTML = 'Ups! Sąrašas tuščias...';
      } else {
        getData(res)
    }
  })
  .catch(err => console.log('ERROR! ', err))
}

// -------------iteruoja JSON duomenis, grazina pavadinima
function getData(a) {
  pavadinimas.innerHTML = 'Bendras Sąrašas';

  btn.appendChild(btnNew);
  document.getElementById('naujas').addEventListener('click', newForm)

  let html = '';
  div.innerHTML = '';
  
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
  .catch(e => console.log(e))
}

function details(res) {
  btn.innerHTML = "";
  pavadinimas.innerHTML = 'Detalės';
  div.innerHTML = `  
<div class="card" style="width: 30rem;">
    <div class="card-body">
    <h3 class="card-title">${res.data.title}</h3>
    <p class="card-text">${res.data.body}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Vartotojo Id: ${res.data.userId}</li>
    <li class="list-group-item">Įrašo Id: ${res.data.id}</li>
  </ul>
</div>
  `;
  
  div.appendChild(btnBack)
  document.getElementById('atgal').addEventListener('click', start)
}


// -------------POST forma---------------
function newForm() {
  btn.innerHTML = "";
  pavadinimas.innerHTML = 'Naujas Įrašas';
  div.innerHTML = `
  <form action="${url}" method="post">
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
</form>`;
  
  div.appendChild(btnBack)
  document.getElementById('atgal').addEventListener('click', start)
  // document.getElementById('submit').addEventListener('click', addList)
  //panaikinus eventListener'i forma submitina "body" i serveri irturetu grazint, bet negrazina object israiska 
}


//-----------tas pats, tik async-------
// const details = async (res) => {
//   try {
//     pavadinimas.innerHTML = 'Detalės';
//     const title = await res.data.title;
//     const body = await res.data.body;

//     div.innerHTML = `<h2>${title}</h2><h3>${body}</h3>`;

//     const button = document.createElement('button');
//     button.innerHTML = 'Atgal';
//     button.setAttribute("id", "atgal");
//     div.appendChild(button)
//     document.getElementById('atgal').addEventListener('click', start)
//   } catch {e=> console.log(e)
//    }
// }


// ------------POST request---Neveikia: gaunu israiska "[object Object]"-------------
// function addList() {
//   const title = document.getElementById('title');
//   const body = document.getElementById('body');
//   const userId = document.getElementById('userId');
//   axios.post(url, {
//     title: title,
//     body: body,
//     userId: userId
//   })
//     .then(response => {
//       details(response) //----------------gaunu israiska "[object Object]"----------------
//     })
//     .catch(err => console.log(err))
// }