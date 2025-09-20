// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

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

// Preenche a lista no HTML
onValue(listaRef, snapshot => {
  lista.innerHTML = "";

  snapshot.forEach((child, index) => {
    const item = child.val();
    const id = child.key;

    // Clona o template
    const li = template.content.cloneNode(true);
    li.querySelector('.nome').textContent = item.nome;
    const checkbox = li.querySelector('.checkbox');
    checkbox.checked = item.escolhido;
    checkbox.disabled = item.escolhido;

    // Aplica estilos por índice ou condição
    li.querySelector('li').style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#e0e0e0";

    // Evento checkbox
    checkbox.addEventListener("change", () => {
      update(ref(db, "presentes/" + id), { escolhido: true });
      checkbox.disabled = true;
    });

    lista.appendChild(li);
  });
});
