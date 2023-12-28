// Assuming you have the Tomato type defined somewhere
// import { Tomato } from "./types";


  
const tomatoProps = {
    tomatoes: [
      // Array of Tomato objects
    ],
  };
  
  function createTomatoElement(tomato) {
    console.log("createTomatoElement")
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.width = "100px";
    element.style.height = "100px";
    element.style.backgroundSize = "contain";
    element.style.backgroundRepeat = "no-repeat";
    element.style.left = `${tomato.x}%`;
    element.style.bottom = `${tomato.y}%`;
    element.style.transform = `rotateZ(${tomato.rotate}deg)`;
  
    if (tomato.splatter) {
      element.classList.add("tomatoSplatter");
    } else {
      element.classList.add("tomato");
    }
  
    if (tomato.fadeAway) {
      element.classList.add("fadeAway");
    }
    setTimeout(splatter,1000,element)
    return element;
  }
  function splatter(element){
    element.classList.add("tomatoSplatter");
    setTimeout(fade,500,element)
  }
  function fade(element){
    element.classList.add("fadeAway");
    setTimeout(remove,2000,element)
  }
  function remove(element){
    element.remove();
  }

  function renderTomatoes(container, tomatoes) {
    console.log("renderTomatoes")
    tomatoes.forEach((tomato) => {
      const tomatoElement = createTomatoElement(tomato);
      container.appendChild(tomatoElement);
    });
  }
  
//   // Example usage
//   const container = document.getElementById("tomatoContainer"); // Replace with your actual container ID
//   renderTomatoes(container, tomatoProps.tomatoes);
  