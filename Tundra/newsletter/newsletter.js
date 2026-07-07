fetch("../assets/ascii/ascii.txt")
    .then(response => response.text())
    .then(text => {
        document.getElementById("asciiArt").textContent = text;
    })
    .catch(error => console.error(error));