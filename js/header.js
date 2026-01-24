function addHeader(container, data, name, isAnimated) {
        //console.log("creating header..");
	const header = document.createElement("div");
        const title = document.createElement("special-div");
        header.id = assignName(name);
	container.appendChild(header);
	header.style.position = "absolute";
	header.style.top = "0px";
	header.style.left = "0px";
	header.style.width = "100%";
	header.style.height = "4em";
	header.style.minWidth = "600px";

	header.innerHTML = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' + '<line x1="0px" y1="calc(50% - 1.5px)" x2="100%" y2="calc(50% - 1.5px)" stroke="oklch(0.75 0.225 240)" stroke-width="3px"/>' + '<line x1="0px" y1="calc(50% + 1.5px)" x2="100%" y2="calc(50% + 1.5px)" stroke="oklch(0.75 0.225 60)" stroke-width="3px"/>' + '<line x1="0px" y1="50%" x2="100%" y2="50%" stroke="black" stroke-width="3px"/>' + '</svg>'; 

	header.appendChild(title);
	header.titleElement = title;
	title.id = assignName(0);
        title.style.position = "absolute";
        title.style.top = "8px";
	title.style.width = "396px";
        title.style.height = "3.5em";
	title.content.style.height = "100%";
	title.content.style.overflow = "hidden";
	title.style.left = "calc(50% - 196px)"
	title.content.style.padding = "9px 0px 0px 0px";	
	title.style.padding = "0px -10px 0px 0x";	

	//title.content.style.display = "flex";
	title.content.style.height = "3.5em";
	title.content.style.top = "-4px";
	//title.content.style.justifyContent = "center";
	//title.content.style.alignItems = "center";
	title.content.innerHTML += data.find(item => item["type"] == "text")["data"]["all"];

	title.reload();

	const dropDown = document.createElement('special-div');
	dropDown.style.display = "none";
	header.appendChild(dropDown);
	dropDown.style.position = "absolute";
	dropDown.style.top = "14px";
	dropDown.style.height = "2.7em";
	dropDown.content.style.margin = "0px";
	dropDown.content.style.padding = "0px";
	dropDown.style.left = "8px";
	dropDown.style.width = "calc(50% - 210px)";
	dropDown.content.style.display = "flex";
	dropDown.content.style.alignItems = "center";
	dropDown.content.style.justifyContent = "center";
	dropDown.content.innerHTML = "<h3 style='margin:0;'>More..</h3>"

	header.dropDown = dropDown;
	header.stack = null;

	dropDown.addEventListener("click", (event) => { 
		console.log("Click", header.stack);
	})

	dropDown.reload();

	window.addEventListener("resize", () => dropDown.reload());

        //console.log("Header complete");
        return header;
}

function removeHeader(element) {
	if (element) { element.remove(); }
}

async function updateHeader(element, content, isAnimated) {
	console.log("updating header");
	element.titleElement.content.innerHTML = content.find(item => item["type"] == "text")["data"]["all"];
	return;
}

function toggleDropDown(element, obj, isVis) {
	element.stack = obj;
	if (isVis) {
		element.dropDown.style.display = "none";
		element.dropDown.content.style.disply = "none";
	} else {
		element.dropDown.style.display = "flex";
		element.dropDown.content.style.display = "flex";
		element.dropDown.reload();
	}
}
