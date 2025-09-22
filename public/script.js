// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
//import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
import { 
  getDatabase, ref, onValue, update, get 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";


// Config do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBP_jRcJHatCanPVrJzr-W4QQRp7glkCkA",
  authDomain: "lista-de-itens-f4a54.firebaseapp.com",
  databaseURL: "https://lista-de-itens-f4a54-default-rtdb.firebaseio.com",
  projectId: "lista-de-itens-f4a54",
  storageBucket: "lista-de-itens-f4a54.firebasestorage.app",
  messagingSenderId: "874165125234",
  appId: "1:874165125234:web:edd86588bf738042cb82eb",
  measurementId: "G-PJFQY3TMTX"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referência da lista de presentes
const listaRef = ref(db, "presentes");

const lista = document.getElementById("list");
const template = document.getElementById("item-template");
const btnSalvar = document.getElementById("add-button");
const inputNome = document.getElementById("pessoa"); 
let presenteSelecionadoId = null;

// 🔹 Monitora mudanças na lista de presentes
onValue(listaRef, snapshot => {
  lista.innerHTML = "";

  snapshot.forEach((child) => {
    const item = child.val();
    const id = child.key;

    // Só exibe se não foi escolhido
    if (item.escolhido) return;

    // Clona o template
    const li = template.content.cloneNode(true);
    li.querySelector('.nome').textContent = item.nome;
    const checkbox = li.querySelector('.checkbox');
    checkbox.checked = false;
    checkbox.disabled = false;

    // Aplica estilos
    li.querySelector('.nome').style.color = "#0754e4ff";
   

  checkbox.addEventListener("change", () => {
  // Desmarca qualquer outro checkbox selecionado
  document.querySelectorAll(".checkbox").forEach(cb => {
    const nomeEl = cb.closest("li")?.querySelector(".nome");

    if (cb !== checkbox) {
      cb.checked = false;
      if (nomeEl) nomeEl.style.fontWeight = "normal"; // remove bold dos outros
    } else {
      if (nomeEl) {
        nomeEl.style.fontWeight = cb.checked ? "bold" : "normal"; // bold só no selecionado
      }
    }
  });

      // Salva o id do presente selecionado
      presenteSelecionadoId = checkbox.checked ? id : null;
      console.log("Presente selecionado ID:", presenteSelecionadoId);
    });

    lista.appendChild(li);
  });
});


// 🔹 Função para salvar presente selecionado
async function salvarPresente() {
  console.log("pessoa:", inputNome.value);
  const nomee = inputNome.value.trim();

  if (!nomee) {
    alert("Digite seu nome antes de salvar!");
    return;
  }

  if (!presenteSelecionadoId) {
    alert("Selecione um presente antes de salvar!");
    return;
  }

  try {
    await update(ref(db, "presentes/" + presenteSelecionadoId), { 
      escolhido: true,
      pessoa: nomee
    });

    // Limpa input e seleção
    inputNome.value = "";
    presenteSelecionadoId = null;

    alert("Presente reservado com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar presente:", error);
  }
}

// 🔹 Evento do botão salvar
btnSalvar.addEventListener("click", salvarPresente);


// 🔹 Função para resetar todos os presentes
async function resetarPresentes() {
  try {
    const snapshot = await get(listaRef);
    snapshot.forEach(child => {
      const id = child.key;
      update(ref(db, "presentes/" + id), { escolhido: false, pessoa: ""});
    });
  } catch (error) {
    console.error("Erro ao resetar presentes:", error);
  }
}



document.getElementById("reset-button").addEventListener("click", resetarPresentes);



