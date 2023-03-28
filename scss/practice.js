
//const main = document.getElementById("main");
//console.log(main);

//const listItems = document.getElementsByTagName("li")
//const listItems = document.getElementsByClassName("example-list-item")[0];
//console.log(listItems);

//const main = document.querySelector("#main");
//console.log("Main: ", main);
//main = document.querySelector("data-main-el");
//console.log("Ex2 Main", main2);
//querySelectorAll - returns an array
//const listItems = document.querySelectorAll(".example-list-item");
//const listItems = document.querySelectorAll("li");
//console.log("List items: ", listItems);

const pageWrapper = document.getElementById("page-wrapper");
const greeting = "Hello, world!";
const header = document.createElement("header");
header.innerHTML = `
    <h1 class="text-center">${greeting}</h1>
    `;
header.classList.add("bg-dark", "text-light", "m-0", "p-2");
header.style.height = "120px";

pageWrapper.appendChild(header);

const main = document.createElement("main");
main.id="main-section";
main.classList.add("container", "py-2", "px-4", "my-4");

const p = document.createElement("p");
p.classList.add("text-monospace");
p.textContent = "I'm in the main section.";

main.appendChild(p);
pageWrapper.appendChild(main);

function createCustomEl(element) {
    //const paragraphTag = document.createElement("p");
    //paragraphTag.classList.add("text-center");
    //return paragraphTag;
    const el = .document.createElement(element);
    return el;
}

console.log(createCustomEl());