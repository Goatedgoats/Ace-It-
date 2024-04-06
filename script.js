document.getElementById('sesel').style.display = "none";

// Concatenate a zero to the left of every single-digit time frame
function concatZero(timeFrame) {
    return timeFrame < 10 ? '0'.concat(timeFrame) : timeFrame;
}

function realTime() {
    let date = new Date();
    let sec = date.getSeconds();
    let mon = date.getMinutes();
    let hr = date.getHours();
    // 12-hour time
    // If the hour equals 0 or 12, the remainder equals 0, so output 12 instead. (0 || 12 = 12)
    document.getElementById('time').textContent = `${concatZero((hr % 12) || 12)} : ${concatZero(mon)} ${hr >= 12 ? 'PM' : 'AM'}`;
}

setInterval(realTime, 1000);

var searchEngineUrl = "https://www.google.com/search?q=";

function submitSearch() {
    var query = document.getElementById("textbox").value;
    var searchUrl = searchEngineUrl + encodeURIComponent(query);
    window.location.href = searchUrl;
}

function changeSearchEngine(engine) {
    if (engine === "bing") {
        searchEngineUrl = "https://www.bing.com/search?q=";
    } else if (engine === "google") {
        searchEngineUrl = "https://www.google.com/search?q=";
    }
    document.getElementById("textbox").value = "";
}

document.getElementById('textbox').addEventListener('keydown', function (event) {
    checkEnter(event);
});

function checkEnter(event) {
    if (event.key === "Enter" && event.target.id === "textbox") {
        event.preventDefault();
        submitSearch();
    }
}

function docload() {
    if (localStorage.getItem('engin') == null) {
        localStorage.setItem('engin', 'google');
    } else if (localStorage.getItem('engin') == 'google') {
        changeSearchEngine('google');
    } else if (localStorage.getItem('engin') == 'bing') {
        changeSearchEngine('bing');
    }
}

function togglesettings() {
    var sesel = document.getElementById('sesel');
    var fav = document.getElementById('fav');

    if (sesel.style.display == 'none') {
        sesel.style.display = 'block';
        fav.style.display = 'none';
    } else {
        sesel.style.display = 'none';
        fav.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('music').addEventListener('click', function() {
        var audio = document.getElementById('fireAudio');
        var img = document.getElementById('mu');
        
        // Toggle play/pause and image source
        if (audio.paused) {
          audio.play();
          img.src = "play.png";
        } else {
          audio.pause();
          img.src = "muted.png";
        }
      });
    const shortcutContainer = document.getElementById("shortcut-container");
    const addShortcutButton = document.getElementById("add-shortcut-button");
    const modal = document.getElementById("modal");

    let shortcuts = JSON.parse(localStorage.getItem("customShortcuts")) || [];

    const saveShortcuts = () => {
        localStorage.setItem("customShortcuts", JSON.stringify(shortcuts));
    };

    window.openModal = () => {
        console.log("openModal");
        modal.style.display = "block";
    };

    window.closeModal = () => {
        console.log("closeModal");
        modal.style.display = "none";
    };

    window.addShortcut = async () => {
        console.log("addShortcut");
        const name = document.getElementById("name").value;
        let url = document.getElementById("url").value;

        // Check and add "https://" to the URL if needed
        if (url && !url.startsWith("https://") && !url.startsWith("http://")) {
            url = "https://" + url;
            document.getElementById("url").value = url; // Update the input field
        }

        if (name && url) {
            if (shortcuts.length < 10) {
                const newShortcut = {
                    name: name.length > 10 ? name.substring(0, 7) + "..." : name,
                    url,
                    icon: `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}/&size=64`
                };
                shortcuts.push(newShortcut);
                saveShortcuts();
                renderShortcuts();
                closeModal();
                updateAddButtonVisibility();
            } else {
                alert("You can't add more than 10 shortcuts.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    window.deleteShortcut = (url) => {
        shortcuts = shortcuts.filter(shortcut => shortcut.url !== url);
        saveShortcuts();
        renderShortcuts();
        updateAddButtonVisibility();
    };

    const updateAddButtonVisibility = () => {
        addShortcutButton.style.display = shortcuts.length < 10 ? "block" : "none";
    };

    const createShortcut = (shortcut) => {
        const shortcutElement = document.createElement("div");
        shortcutElement.classList.add("shortcut");
        shortcutElement.setAttribute("data-url", shortcut.url);
        const imgElement = document.createElement("img");
        imgElement.src = shortcut.icon;
        imgElement.alt = shortcut.name;

        imgElement.onload = function () {
            shortcutElement.innerHTML = `
                <a href="${shortcut.url}" target="_blank">
                    ${imgElement.outerHTML}<br>
                    <span>${shortcut.name}</span>
                </a>
                <span class="delete-button" onclick="deleteShortcut('${shortcut.url}')">&#10006;</span>
            `;
            shortcutContainer.appendChild(shortcutElement);
        };
    };

    const renderShortcuts = () => {
        shortcutContainer.innerHTML = "";
        shortcuts.forEach(createShortcut);
    };

    renderShortcuts();
    updateAddButtonVisibility();
});

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('engin') == 'google') {
        changeSearchEngine('google');
    }else if (localStorage.getItem('engin') == 'bing') {
        changeSearchEngine('bing');
    }
    const shortcutContainer = document.getElementById("shortcut-container");
    const addShortcutButton = document.getElementById("add-shortcut-button");
    const modal = document.getElementById("modal");

    let shortcuts = JSON.parse(localStorage.getItem("customShortcuts")) || [];

    const saveShortcuts = () => {
        localStorage.setItem("customShortcuts", JSON.stringify(shortcuts));
    };

    window.openModal = () => {
        modal.style.display = "block";
    };

    window.closeModal = () => {
        modal.style.display = "none";
    };

    window.addShortcut = async () => {
        const name = document.getElementById("name").value;
        let url = document.getElementById("url").value;
        console.log("Name:", name);
        console.log("URL:", url);

        // Check and add "https://" to the URL if needed
        if (url && !url.startsWith("https://") && !url.startsWith("http://")) {
            url = "https://" + url;
            document.getElementById("url").value = url; // Update the input field
        }

        if (name && url) {
            if (shortcuts.length < 10) {
                const newShortcut = {
                    name: name.length > 10 ? name.substring(0, 7) + "..." : name,
                    url,
                    icon: `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}/&size=64`
                };
                shortcuts.push(newShortcut);
                saveShortcuts();
                renderShortcuts();
                closeModal();
                updateAddButtonVisibility();
            } else {
                alert("You can't add more than 10 shortcuts.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    window.deleteShortcut = (url) => {
        shortcuts = shortcuts.filter(shortcut => shortcut.url !== url);
        saveShortcuts();
        renderShortcuts();
        updateAddButtonVisibility();
    };

    const updateAddButtonVisibility = () => {
        addShortcutButton.style.display = shortcuts.length < 10 ? "block" : "none";
    };

    const createShortcut = (shortcut) => {
        const shortcutElement = document.createElement("div");
        shortcutElement.classList.add("shortcut");
        shortcutElement.setAttribute("data-url", shortcut.url);
        const imgElement = document.createElement("img");
        imgElement.src = shortcut.icon;
        imgElement.alt = shortcut.name;
    
        const linkElement = document.createElement("a");
        linkElement.href = shortcut.url;
        linkElement.target = "_blank";
        linkElement.innerHTML = `${imgElement.outerHTML}<br><span>${shortcut.name}</span>`;
    
        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = "&#10006;";
        deleteButton.addEventListener("click", () => deleteShortcut(shortcut.url));
    
        shortcutElement.appendChild(linkElement);
        shortcutElement.appendChild(deleteButton);
    
        shortcutContainer.appendChild(shortcutElement);
    };
    
    const renderShortcuts = () => {
        shortcutContainer.innerHTML = "";
        shortcuts.forEach(createShortcut);
    };

    renderShortcuts();
    updateAddButtonVisibility();

    // Event listeners consolidated here
    document.getElementById('searchbtn').addEventListener('click', submitSearch);
    document.getElementById('sets').addEventListener('click', togglesettings);
    document.getElementById('ads').addEventListener('click', addShortcut);
    document.getElementById('add-shortcut-button').addEventListener('click', openModal);
    document.getElementById('close').addEventListener('click', closeModal);
    document.getElementById('google').addEventListener('click',ggle );
    document.getElementById('bing').addEventListener('click',bing );
    
});

document.getElementById('music').addEventListener('click', function() {
    document.getElementById('mul').src = 'play.png';
    const audio = new Audio('fire.mp3');  // Assuming "fire.mp3" is in the same directory

});
function ggle(){
    changeSearchEngine('google');
    localStorage.setItem('engin', 'google');
}
function bing(){
    changeSearchEngine('bing');
    localStorage.setItem('engin', 'bing');
}
function pur() {
    // Set background gradient
    document.documentElement.style.background = "linear-gradient(#0f0c29, #302b63, #24243e)";

    // Save selected gradient to localStorage
    localStorage.setItem('backgroundGradient', 'linear-gradient(#0f0c29, #302b63, #24243e)');
}

function sea() {
    // Set background gradient
    document.documentElement.style.background = "linear-gradient(#11278a, #478cc6)";

    // Save selected gradient to localStorage
    localStorage.setItem('backgroundGradient', 'linear-gradient(#11278a, #478cc6)');
}

function blue() {
    // Set background gradient
    document.documentElement.style.background = "linear-gradient(#0077b6, #081844)";

    // Save selected gradient to localStorage
    localStorage.setItem('backgroundGradient', 'linear-gradient(#0077b6, #081844)');
}

function gren() {
    // Set background gradient
    document.documentElement.style.background = "linear-gradient(#97ABFF, #123597)";

    // Save selected gradient to localStorage
    localStorage.setItem('backgroundGradient', 'linear-gradient(#97ABFF, #123597)');
}

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve selected gradient from localStorage
    const savedGradient = localStorage.getItem('backgroundGradient');
    if (savedGradient) {
        document.documentElement.style.background = savedGradient;
    }
});
