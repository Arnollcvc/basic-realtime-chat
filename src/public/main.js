const socket = io();

let msgList = document.querySelector(".message-list");
let form = document.querySelector("form");
let input = document.querySelector(".user-input");

function addMsg(d) {
  let item = String.raw`<li class="msg" id="${d.id}">${d.msg}</li>`;
  msgList.insertAdjacentHTML("afterbegin", item);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value == "") return;
  sendMsg(input.value)
  input.value = "";
});

function sendMsg(msg) {
  socket.emit("newMsg", msg);
  console.log("Mensaje enviado!");
}

socket.on("newMsg", (msg) => {
  addMsg(msg);
  console.log("Mensaje recivido!");
});

socket.on("updateList", (msg) => addMsg(msg));

socket.on("loadPrev", (data) => {
  msgList.innerHTML = "";
  console.log("Cargando mensajes previos");
  if (!data?.length >= 1) return;
  data.forEach((i) => {
    addMsg(i);
  });
  console.log("Mensajes cargados con exito!");
});
