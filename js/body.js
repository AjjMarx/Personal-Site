function addBody(container, data, name) {
        //console.log("creating body..");
        const body = document.createElement("special-div");
	body.id = name;   
	container.appendChild(body);
        body.style.position = "absolute";
	let wideWidth = "692px";
	let wideLeft = "calc((100% - 1000px) / 2 + 302px)";
	let narrowWidth = "calc(100% - 8px)";
	let narrowLeft = "0px";
	if (parseInt(container.offsetWidth, 10) > 1000) {
		body.style.width = wideWidth;
		body.style.left = wideLeft; 
	} else {
		body.style.width = narrowWidth;
		body.style.left = narrowLeft;
	}
	body.style.padding = "4px 4px 4px 4px";
        body.style.top = "4em";
        body.style.bottom = "10px";
	body.style.minWidth = "calc(100vh * (0.5) - 8px)";
	let footer_allow = true
	body.reload();
        for (const item of data) {
                //console.log(item);
		if (item["type"] == "footer" && footer_allow) { 
			body.style.bottom = "42px";
			body.reload();
			const footer = document.createElement("div");
			if (item.id) { footer.id = parseInt(item.id,16); } else { footer.id = 0; }
			container.appendChild(footer);
			footer.style.position = "absolute";
			if (parseInt(container.offsetWidth, 10) >= 1000) {
				footer.style.width = wideWidth;
				footer.style.left = wideLeft; 
			} else {
				footer.style.width = narrowWidth;
				footer.style.left = narrowLeft;
			}
			footer.style.bottom = "8px";
			footer.style.height = "1.5em";
			
			footer_allow = false;

			window.addEventListener("resize", () => {
				if (parseInt(container.offsetWidth, 10) >= 1000) {
					footer.style.width = wideWidth;
					footer.style.left = wideLeft; 
				} else {
					footer.style.width = narrowWidth; 
					footer.style.left = narrowLeft;
				}
			});	

			for (const footer_item of item["data"]) {
				const id = footer_item.id ?? 0;
                		spawnFunctions[footer_item["type"]](footer, footer_item["data"], parseInt(id,16));	
			}
		} else {
			const id = item.id ?? 0;
			spawnFunctions[item["type"]](body, item["data"], parseInt(id,16));  
		}
        }       
        window.addEventListener("resize", () => {
		if (parseInt(container.offsetWidth, 10) >= 1000) {
			body.style.width = wideWidth;
			body.style.left = wideLeft;
			body.reload();
		} else {
			body.style.width = narrowWidth;
			body.style.left = narrowLeft;
			body.reload(); 
		}
	});
	//console.log("done rendering body");
}


