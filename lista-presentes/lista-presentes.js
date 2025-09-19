// Importa módulos Firebase direto da CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// 🔑 Configuração do Firebase (copie do seu Console do Firebase)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  databaseURL: "https://SEU-PROJETO.firebaseio.com",
  projectId: "SEU-PROJETO",
  storageBucket: "SEU-PROJETO.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referência à lista de presentes
const presentesRef = ref(db, "presentes");

// Atualiza lista em tempo real
onValue(presentesRef, (snapshot) => {
  const lista = snapshot.val();
  const listaEl = document.getElementById("lista");
  listaEl.innerHTML = ""; // limpa lista antes de renderizar

  for (let id in lista) {
    const item = lista[id];
    const li = document.createElement("li");

    // Cria checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.escolhido;
    checkbox.disabled = item.escolhido;

    // Quando marcar, salva no Firebase
    checkbox.onchange = () => {
      set(ref(db, "presentes/" + id), {
        nome: item.nome,
        escolhido: true,
      });
    };

    li.appendChild(checkbox);
    li.append(" " + item.nome);
    listaEl.appendChild(li);
  }
});
