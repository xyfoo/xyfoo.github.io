let setColorMode = function(colorMode) {
    if(colorMode == "system" && window.matchMedia) {
        colorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark": "light";
    }

    let bodyElement = document.querySelector("body");
    bodyElement.setAttribute("data-color-mode", colorMode);

    window.localStorage.setItem("color-mode", colorMode);
}

let loadColorMode = function() {
    myStorage = window.localStorage
    return myStorage.getItem("color-mode");
}

document.addEventListener("DOMContentLoaded", function(event) { 
    // load color mode
    var preferredColorMode = loadColorMode();
    if(preferredColorMode == null || preferredColorMode == "light") {
        setColorMode("light");
    } else if (preferredColorMode == "dark") {
        setColorMode("dark");
    }

    // set button mode
    let darkModeButton = document.querySelector("button#darkMode");
    let lightModeButton = document.querySelector("button#lightMode");
    let systemModeButton = document.querySelector("button#systemMode");

    darkModeButton.addEventListener("click", function(event) {
        setColorMode("dark");
    });

    lightModeButton.addEventListener("click", function(event) {
        setColorMode("light");
    })

    systemModeButton.addEventListener("click", function(event) {
        setColorMode("system");
    })


  });

