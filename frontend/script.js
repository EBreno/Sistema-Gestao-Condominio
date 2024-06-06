const modalMoradores = document.querySelector('.modal-container.moradores');
const modalFuncionarios = document.querySelector('.modal-container.funcionarios');
const tbodyMoradores = document.querySelector('#tbody-moradores');
const tbodyFuncionarios = document.querySelector('#tbody-funcionarios');
const tbodyGeral = document.querySelector('#tbody-geral');
const sNomeMorador = document.querySelector('#m-nome-morador');
const sApartamento = document.querySelector('#m-apartamento');
const sCpfMorador = document.querySelector('#m-cpf-morador');
const sTelefoneMorador = document.querySelector('#m-telefone-morador');
const sNomeFuncionario = document.querySelector('#m-nome-funcionario');
const sCpfFuncionario = document.querySelector('#m-cpf-funcionario');
const sTelefoneFuncionario = document.querySelector('#m-telefone-funcionario');
const sSalario = document.querySelector('#m-salario');
const sFuncao = document.querySelector('#m-funcao');
const formMorador = document.querySelector('#form-morador');
const formFuncionario = document.querySelector('#form-funcionario');
const searchInput = document.querySelector('#search');
const btnMorador = document.getElementById('btnMorador');
const btnFuncionario = document.getElementById('btnFuncionario');
const btnGeral = document.getElementById('btnGeral');
let moradores = [];
let funcionarios = [];
let geral = [];
let idMorador = null;
let idFuncionario = null;

async function fetchMoradores() {
  const res = await fetch('http://localhost:3000/moradores');
  moradores = await res.json();
  loadMoradores();
}

async function fetchFuncionarios() {
  const res = await fetch('http://localhost:3000/funcionarios');
  funcionarios = await res.json();
  loadFuncionarios();
}

async function fetchGeral() {
  const res = await fetch('http://localhost:3000/geral');
  geral = await res.json();
  loadGeral(geral);
}

function loadMoradores() {
  tbodyMoradores.innerHTML = '';
  moradores.forEach((item, index) => {
    insertMorador(item, index);
  });
}

function loadFuncionarios() {
  tbodyFuncionarios.innerHTML = '';
  funcionarios.forEach((item, index) => {
    insertFuncionario(item, index);
  });
}

function loadGeral(data) {
  tbodyGeral.innerHTML = '';
  data.forEach(item => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.tipo}</td>
      <td>${item.nome}</td>
      <td>${item.funcao ? item.funcao : 'Morador'}</td>
      <td>${item.telefone ? item.telefone : 'Morador'}</td>
    `;
    tbodyGeral.appendChild(tr);
  });
}

function insertMorador(item, index) {
  let tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.apartamento}</td>
    <td>${item.cpf}</td>
    <td>${item.telefone}</td>
    <td class="acao">
      <button onclick="openModalMorador(true, ${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteMorador(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbodyMoradores.appendChild(tr);
}

function insertFuncionario(item, index) {
  let tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cpf}</td>
    <td>${item.telefone}</td>
    <td>${item.salario}</td>
    <td>${item.funcao ? item.funcao : 'Morador'}</td>
    <td class="acao">
      <button onclick="openModalFuncionario(true, ${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteFuncionario('${item.cpf}')"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbodyFuncionarios.appendChild(tr);
}

function insertGeral(item) {
  let tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${item.tipo}</td>
    <td>${item.nome}</td>
    <td>${item.funcao ? item.funcao : 'Morador'}</td>
    <td>${item.telefone ? item.telefone : 'Morador'}</td>
  `;
  tbodyGeral.appendChild(tr);
}

function loadFilteredMoradores(filteredMoradores) {
  tbodyMoradores.innerHTML = '';
  filteredMoradores.forEach((item, index) => {
    insertMorador(item, index);
  });
}

function loadFilteredFuncionarios(filteredFuncionarios) {
  tbodyFuncionarios.innerHTML = '';
  filteredFuncionarios.forEach((item, index) => {
    insertFuncionario(item, index);
  });
}

function loadFilteredGeral(filteredGeral) {
  tbodyGeral.innerHTML = '';
  filteredGeral.forEach(item => {
    insertGeral(item);
  });
}

formMorador.onsubmit = async event => {
  event.preventDefault();

  const morador = {
    nome: sNomeMorador.value,
    apartamento: sApartamento.value,
    cpf: sCpfMorador.value,
    telefone: sTelefoneMorador.value,
  };

  if (idMorador === null) {
    await fetch('http://localhost:3000/moradores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(morador),
    });
  } else {
    const cpf = moradores[idMorador].cpf;
    await fetch(`http://localhost:3000/moradores/${cpf}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(morador),
    });
  }

  await fetchMoradores();
  modalMoradores.classList.remove('active');
};

formFuncionario.onsubmit = async event => {
  event.preventDefault();

  const funcionario = {
    nome: sNomeFuncionario.value,
    cpf: sCpfFuncionario.value,
    telefone: sTelefoneFuncionario.value,
    salario: sSalario.value,
    funcao: sFuncao.value,
  };

  if (idFuncionario === null) {
    await fetch('http://localhost:3000/funcionarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(funcionario),
    });
  } else {
    const cpf = funcionarios[idFuncionario].cpf;
    await fetch(`http://localhost:3000/funcionarios/${cpf}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(funcionario),
    });
  }

  await fetchFuncionarios();
  modalFuncionarios.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => {
  fetchMoradores();
  fetchFuncionarios();
  fetchGeral(); // Carrega os dados da view 'view_moradores_funcionarios' na inicialização
});

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  const activeTab = document.querySelector('.tab-content[style*="display: block"]');
  
  if (activeTab.id === 'moradores') {
    const filteredMoradores = moradores.filter(morador =>
      morador.nome.toLowerCase().includes(searchValue) ||
      morador.apartamento.toLowerCase().includes(searchValue) ||
      morador.cpf.toLowerCase().includes(searchValue) ||
      morador.telefone.toLowerCase().includes(searchValue)
    );
    loadFilteredMoradores(filteredMoradores);
  } else if (activeTab.id === 'funcionarios') {
    const filteredFuncionarios = funcionarios.filter(funcionario =>
      funcionario.nome.toLowerCase().includes(searchValue) ||
      funcionario.cpf.toLowerCase().includes(searchValue) ||
      funcionario.telefone.toLowerCase().includes(searchValue) ||
      funcionario.salario.toString().toLowerCase().includes(searchValue) ||
      funcionario.funcao.toLowerCase().includes(searchValue)
    );
    loadFilteredFuncionarios(filteredFuncionarios);
  } else if (activeTab.id === 'geral') {
    const filteredGeral = geral.filter(item =>
      item.tipo.toLowerCase().includes(searchValue) ||
      item.nome.toLowerCase().includes(searchValue) ||
      (item.funcao && item.funcao.toLowerCase().includes(searchValue)) ||
      (item.telefone && item.telefone.toLowerCase().includes(searchValue))
    );
    loadFilteredGeral(filteredGeral);
  }
});

function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });

  document.getElementById(tabName).style.display = 'block';

  document.getElementById('btnMorador').classList.add('hide');
  document.getElementById('btnFuncionario').classList.add('hide');
  document.getElementById('btnGeral').classList.add('hide');

  if (tabName === 'moradores') {
    document.getElementById('btnMorador').classList.remove('hide');
  } else if (tabName === 'funcionarios') {
    document.getElementById('btnFuncionario').classList.remove('hide');
  } else if (tabName === 'geral') {
    document.getElementById('btnGeral').classList.remove('hide');
    fetchGeral(); // Carrega os dados da view 'view_moradores_funcionarios'
  }
}

function showModal(type) {
  if (type === 'morador') {
    modalMoradores.classList.add('active');
  } else if (type === 'funcionario') {
    modalFuncionarios.classList.add('active');
  }
}

// Defina as funções openModalMorador e openModalFuncionario
function openModalMorador(edit = false, index = null) {
  if (edit) {
    const morador = moradores[index];
    sNomeMorador.value = morador.nome;
    sApartamento.value = morador.apartamento;
    sCpfMorador.value = morador.cpf;
    sTelefoneMorador.value = morador.telefone;
    idMorador = index;
  } else {
    sNomeMorador.value = '';
    sApartamento.value = '';
    sCpfMorador.value = '';
    sTelefoneMorador.value = '';
    idMorador = null;
  }
  modalMoradores.classList.add('active');
}

function openModalFuncionario(edit = false, index = null) {
  if (edit) {
    const funcionario = funcionarios[index];
    sNomeFuncionario.value = funcionario.nome;
    sCpfFuncionario.value = funcionario.cpf;
    sTelefoneFuncionario.value = funcionario.telefone;
    sSalario.value = funcionario.salario;
    sFuncao.value = funcionario.funcao;
    idFuncionario = index;
  } else {
    sNomeFuncionario.value = '';
    sCpfFuncionario.value = '';
    sTelefoneFuncionario.value = '';
    sSalario.value = '';
    sFuncao.value = '';
    idFuncionario = null;
  }
  modalFuncionarios.classList.add('active');
}

// Defina as funções deleteMorador e deleteFuncionario
async function deleteMorador(index) {
  const cpf = moradores[index].cpf;
  await fetch(`http://localhost:3000/moradores/${cpf}`, {
    method: 'DELETE'
  });
  await fetchMoradores();
}

async function deleteFuncionario(cpf) {
  await fetch(`http://localhost:3000/funcionarios/${cpf}`, {
    method: 'DELETE'
  });
  await fetchFuncionarios();
}

async function fetchNumeroDeMoradores() {
  try {
    const res = await fetch('http://localhost:3000/numero-de-moradores');
    const data = await res.json();
    console.log(data); // Verifique os dados da resposta no console
    return data.numero_de_moradores; // Retorna o número de moradores
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchNumeroDeFuncionarios() {
  try {
    const res = await fetch('http://localhost:3000/numero-de-funcionarios');
    const data = await res.json();
    console.log(data); // Verifique os dados da resposta no console
    return data.numero_de_funcionarios; // Retorna o número de funcionários
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function loadGeral(data) {
  tbodyGeral.innerHTML = '';
  data.forEach(item => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.tipo}</td>
      <td>${item.nome}</td>
      <td>${item.funcao ? item.funcao : 'Morador'}</td>
      <td>${item.telefone ? item.telefone : 'Morador'}</td>
    `;
    tbodyGeral.appendChild(tr);
  });

  const numeroDeMoradores = await fetchNumeroDeMoradores();
  const numeroDeFuncionarios = await fetchNumeroDeFuncionarios();
  
  // Atualiza as informações na seção fixa
  document.getElementById('num-moradores').textContent = numeroDeMoradores;
  document.getElementById('num-funcionarios').textContent = numeroDeFuncionarios;
}
