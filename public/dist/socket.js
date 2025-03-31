const socket = io("http://localhost:5000");
let namespaceSocket;

function stringToHTML(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body.firstChild
}

function initNamespaceConnection(endpoint) {
    if (namespaceSocket) namespaceSocket.close();
    namespaceSocket = io(`http://localhost:5000/${endpoint}`)
    namespaceSocket.on("connect", () => {
        namespaceSocket.on("roomList", rooms => {
            const roomsElement = document.querySelector("#contacts ul")
            roomsElement.innerHTML = ""
            for (const room of rooms) {
                const html = stringToHTML(`
                <li class="contact" roomName="${room.name}">
                    <div class="wrap">
                        <img src="${room.image}" height="40"/>
                        <div class="meta">
                            <p class="name">${room.name}</p>
                            <p class="preview" >${room.description}</p>
                        </div>
                    </div>
                </li>`)
                roomsElement.appendChild(html)
            }
            const roomNodes = document.querySelectorAll("ul li.contact");
            for (const room of roomNodes) {
                room.addEventListener("click", function(){
                    const roomName = this.getAttribute("roomName");
                    getRoomInfo(endpoint, roomName);
                })
            }
       });
  });
}

socket.on("connect", () => {
    socket.on("namespacesList", namespacesList => {
        const namespacesElement = document.getElementById("namespaces");
        namespacesElement.innerHTML = ""
        initNamespaceConnection(namespacesList[0].endpoint);
        for (const namespace of namespacesList) {
            const li = document.createElement("li")
            const p = document.createElement("p")
            p.setAttribute("class", "namespaceTitle")
            p.setAttribute("endpoint", namespace.endpoint)
            p.innerText = namespace.title;
            li.appendChild(p)
            namespacesElement.appendChild(li)
        }
        const namespaceNodes = document.querySelectorAll("#namespaces li p.namespaceTitle");
        for (const namespace of namespaceNodes) {
            namespace.addEventListener("click", () => {
                const endpoint = namespace.getAttribute("endpoint");
                initNamespaceConnection(endpoint)
            })
        }
    });
});

function getRoomInfo(endpoint, roomName) {
    document.querySelector("#roomName h3").setAttribute("roomName", roomName)
    document.querySelector("#roomName h3").setAttribute("endpoint", endpoint)
    namespaceSocket.emit("joinRoom", roomName);
    namespaceSocket.off("roomInfo");
    namespaceSocket.on("roomInfo", roomInfo => {
        document.querySelector(".messages ul").innerHTML = ""
        document.querySelector("#roomName h3").innerText = roomInfo.description
        console.log(roomInfo);
    });
    namespaceSocket.on("countOfOnlineUsers", count => {
        document.getElementById("onlineCount").innerHTML = count
        console.log(count);
    })
}

