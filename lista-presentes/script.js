// Configuração do Firebase (copie do seu Console > Configurações do app > SDKs)
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

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Referência à lista no Firebase
const listaRef = db.ref("presents");

// Renderiza lista
listaRef.on("value", (snapshot) => {
  const lista = document.getElementById("lista-presentes");
  lista.innerHTML = ""; // limpa antes de recriar

  snapshot.forEach((child) => {
    const item = child.val();
    const id = child.key;

    // Cria elementos
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.escolhido;
    checkbox.disabled = item.escolhido; // desabilita se já escolhido

    const label = document.createElement("label");
    label.textContent = item.nome;

    // Evento de clique
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        db.ref("presents/" + id).update({ escolhido: true });
      }
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    lista.appendChild(li);
  });
});
