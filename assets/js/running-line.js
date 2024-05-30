let runningLineBlocks = document.querySelectorAll(".running-line");

runningLineBlocks.forEach((block) => {
    let ulElement = block.querySelector("ul");

    let liElement = ulElement.querySelectorAll("li");

    for (let i = 0; i < 10; i++) {
        for (let i = 0; i < liElement.length; i++) {
            let newLiElement = document.createElement("li");
            newLiElement.textContent = liElement[i].textContent;
            ulElement.appendChild(newLiElement);
        }
    }
});
