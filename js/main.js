window.addEventListener("DOMContentLoaded", async () => {
        const app = document.getElementById("app");

        try {
                const res = await fetch(findPageFileName(window.location.pathname));
                const data = await res.json();

                renderPage(app, data);
        } catch(err) {
                console.error("Loading error :(");
                const test = document.createElement("div"); 
                test.innerHTML = "404";
                container.appendChild(test);
        }
});

function renderPage(container, data) {
        const test = document.createElement("div");
        test.innerHTML = findPageFileName(window.location.pathname);
        container.appendChild(test);

        for (const key of Object.keys(data)) {
                console.log(key);
        }

        for (const key of Object.keys(data.meta)) {
                console.log(key, data.meta[key]);
        }

        for (const item of data.content) {
                //console.log(item);
                //for (const key of Object.keys(item)) {
                //        console.log(key, item[key]);
                //}
                renderFunctions[item["type"]](container, item["data"]);
        }


}

function findPageFileName(name) {
        if(name == "/") {
                return "pages/home.json";
        } 
        return "pages" + name + ".json";
}

function header(container, data) {
        console.log("creating header..");
        const header = document.createElement("div");
        container.appendChild(header);
        for (const item of data) {
                //console.log(key);
                renderFunctions[item["type"]](container, item["data"]);
        }
        console.log("Header complete");
}

function pageStack(container, data) {
        console.log("creating pageStack..");
}

function body(container, data) {
        console.log("creating body..");
        const body = document.createElement("div");
        container.appendChild(body);
        for (const item of data) {
                //console.log(key);
                renderFunctions[item["type"]](container, item["data"]);
        }       
        console.log("done rendering body");
}

function text(container, data) {
        console.log("creating text..");
}

function center(container, data) {
        console.log("centering..");
        console.log("done centering");
}

function icon(container, data) {
        console.log("creating icon..");
}

function img(container, data) {
        console.log("creating image..");
}

function toggle(container, data) {
        console.log("creating toggle..");
}

const renderFunctions = {
        header,
        pageStack,
        body,
        text,
        center,
        icon,
        img,
        toggle
}
