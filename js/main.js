window.addEventListener("DOMContentLoaded", async () => {
        const app = document.getElementById("app");
	//app.style.display = "flex";
	//app.style.flexDirection = "row";
	//app.style.flexWrap = "wrap";
	//app.style.justifyContent = "center";
	//app.style.alignItems = "center";

        //try {
                const res = await fetch(findPageFileName(window.location.pathname));
                const data = await res.json();

                renderPage(app, data);
        //} //catch(err) {
          //      console.error("Loading error :(");
          //      const test = document.createElement("div"); 
          //      test.innerHTML = "404";
          //      container.appendChild(test);
       // }
});

horizontalElements = 0

function renderPage(container, data) {
//        const test = document.createElement("div");
//        test.innerHTML = findPageFileName(window.location.pathname);
//        container.appendChild(test);	
	customElements.define('special-div', SpecialDiv, { extends: 'div' });

	
        for (const key of Object.keys(data)) {
                console.log(key);
        }

        for (const key of Object.keys(data.meta)) {
                console.log(key, data.meta[key]);
        }

	for (const item of data.content) {
		if(item["type"] == "header" || item["type"] == "pageStack") {
			horizontalElements++;	
		}
	}
	console.log(horizontalElements);

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
        const header = document.createElement("div", { is: "special-div" });
        container.appendChild(header);
        header.style.position = "relative";
        header.style.top = "8px";
	header.style.width = "396px";
        header.style.height = "3.5em";
	header.style.left = "calc(50% - 196px)"

	header.content.style.top = "8px";
	header.content.style.padding = "0px 0px 0px 0px";

        let textDiv;
        for (const item of data) {
                if (item["type"] == "text") { 
                        textDiv = renderFunctions[item["type"]](header, item["data"]);
                } else {
//                        renderFunctions[item["type"]](header, item["data"]);
                }
        }


	
	header.reload();

        console.log("Header complete");
        return header;
}

function pageStack(container, data) {
        console.log("creating pageStack..");
	const box = document.createElement("div", { is: "special-div" });   
	container.appendChild(box);
	box.style.position = "absolute";
	let wideWidth = "298px";
	let wideLeft = "calc((100% - 1000px) / 2)";
	let narrowWidth = "0px";
	let narrowLeft = "-20px";
	if (parseInt(container.offsetWidth, 10) >= 1000) {
		box.style.width = wideWidth;
		box.style.left = wideLeft;
	} else {
		box.style.width = narrowWidth;
		box.style.left = narrowLeft;
	}
	box.style.padding = "4px 4px 4px 4px";
	box.style.top = "4em"; 
	box.style.bottom = "8px";
	box.reload();

		

	window.addEventListener("resize", () => {
		if (parseInt(container.offsetWidth, 10) >= 1000) {
			box.style.width = wideWidth;
			box.style.left = wideLeft;
			box.reload();
		} else {
			box.style.width = narrowWidth;
			box.style.left = narrowLeft;
			box.reload(); 
		}
	});
}

function body(container, data) {
        console.log("creating body..");
        const body = document.createElement("div", { is: "special-div" });   
	container.appendChild(body);
        body.style.position = "absolute";
	let wideWidth = "700px";
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
        body.style.bottom = "0px";
	body.style.minWidth = "calc(100vh * (0.5) - 8px)";
	let footer_allow = true
	body.reload();
        for (const item of data) {
                console.log(item);
		if (item["type"] == "footer" && footer_allow) { 
			body.style.bottom = "42px";
			body.reload();
			const footer = document.createElement("div");
			container.appendChild(footer);
			footer.style.position = "absolute";
			if (parseInt(container.offsetWidth, 10) >= 1000) {
				footer.style.width = wideWidth;
				footer.style.left = wideLeft; 
			} else {
				footer.style.width = narrowWidth;
				footer.style.left = narrowLeft;
			}
			//footer.style.right = "10px";
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
                		renderFunctions[footer_item["type"]](footer, footer_item["data"]);
			}
		} else {
                	renderFunctions[item["type"]](body, item["data"]);
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
	console.log("done rendering body");
}

function text(container, data) {
        console.log("creating text..");
        const text = document.createElement("div");
        container.appendChild(text);
	if (data["all"] != undefined) {
		text.innerHTML = data["all"];
	} else if (data["en"] != undefined) {
        	text.innerHTML = data["en"];
	} else if (data["zh"] != undefined) {
		text.innerHTML = data["zh"];
	}
        return text;
}

function center(container, data) {
        console.log("centering..");
	const body = document.createElement("div");
	//body.style.textAlign = "center";
	body.style.display = "inline-block";
	body.style.width = "100%";
	body.style.height = "100%";	
	container.appendChild(body);
	for (const item of data) {
		renderFunctions[item["type"]](body, item["data"]);
	}
}

function icon(container, data) {
        console.log("creating icon.. unsupported");
}

function img(container, data) {
        console.log("creating image..");
	const img = document.createElement("img");
	img.src = data["file"];
	img.title = data["en_hover"];
	img.alt = data["en_hover"];
	img.style.display = "block";
	img.style.float = "left";
	img.style.margin = "1em 1em 1em 1em";
	img.style.height = '30%';
	//img.style.objectFit = "cover";
	img.style.borderRadius = "12px";
	container.appendChild(img);

	window.addEventListener("resize", () => {
		if (parseInt(container.offsetWidth, 10) > 600) {
			img.style.float = "left";
			img.style.margin = "1em 1em 1em 1em";
		} else {	
			img.style.float = "none";
			img.style.margin = "1em auto";
		}
	});
}

function toggle(container, data) {
        console.log("creating toggle..");
	
}

function footer(container, data) {
        console.log("creating footer.. unsupported");
}

const renderFunctions = {
        header,
        pageStack,
        body,
        text,
        center,
        icon,
        img,
        toggle,
	footer
}


class SpecialDiv extends HTMLDivElement {
	constructor() {
		super();
		//this.style.padding = "4px";

		this.content = document.createElement("div");
		this.appendChild(this.content);
		this.content.style.position = "absolute";
		this.content.style.width = "calc(100% - 16px)";
		this.content.style.height = "calc(100% - 16px)";
		this.content.style.top = "12px";
		this.content.style.left = "12px";
//		this.content.style.right = "8px";
		this.content.style.padding = "10px 10% 10px 10%";
		this.content.style.overflow = "auto";
		this.content.style.textAlign = "justify";
		
		this.frame = document.createElement("div");
		this.appendChild(this.frame);
		this.frame.style.position = "absolute";
		this.frame.style.width = "100%";
		this.frame.style.height = "100%";
		this.frame.style.pointerEvents = "none";

		this.parentAppend = this.appendChild.bind(this);
        	this.appendChild = function(child) {
			this.content.appendChild(child);
		}	

		this.reload();
		window.addEventListener("resize", () => this.reload());
	}

	#scroll() {
		return this.content.scrollTop;
	}
 

	reload() {
		this.#render_box(this.clientWidth, this.clientHeight, 24, 3, 150);
	}	

	#box_svg(width, height, offst, weight, left, top, color) { 	
		const offset = Math.min(offst, Math.min(width/2, height/2));
		const handle = 2.2;
		const right = weight/2;
		const bottom = weight/2;

		let box = {};
		
		box.top = `
		    <line x1="${offset + left}" y1="${top}" x2="${width - offset - right}" y2="${top}" stroke="${color}" stroke-width="${weight}"/>
		    <path d="M ${width - right} ${offset + top} C ${width - right} ${offset/handle + top}, ${width - offset/handle - right} ${top}, ${width - offset - right} ${top}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		    <path d="M ${left} ${offset + top} C ${left} ${offset/handle + top}, ${offset/handle + left} ${top}, ${offset + left} ${top}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		`;
		 box.bottom = `
		    <line x1="${offset + left}" y1="${height - bottom}" x2="${width - offset - right}" y2="${height - bottom}" stroke="${color}" stroke-width="${weight}"/>
		    <path d="M ${width - right} ${height - offset - bottom} C ${width - right} ${height - offset/handle - bottom}, ${width - offset/handle - right} ${height - bottom}, ${width - offset - right} ${height - bottom}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		    <path d="M ${left} ${height - offset - bottom} C ${left} ${height - offset/handle - bottom}, ${offset/handle + left} ${height - bottom}, ${offset + left} ${height - bottom}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		`;
		 box.left = `
		    <line x1="${left}" y1="${offset + top}" x2="${left}" y2="${height - offset - bottom}" stroke="${color}" stroke-width="${weight}"/>
		    <path d="M ${left} ${offset + top} C ${left} ${offset/handle + top}, ${offset/handle + left} ${top}, ${offset + left} ${top}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		    <path d="M ${left} ${height - offset - bottom} C ${left} ${height - offset/handle - bottom}, ${offset/handle + left} ${height - bottom}, ${offset + left} ${height - bottom}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		`;
		 box.right = `
		    <line x1="${width - right}" y1="${offset + top}" x2="${width - right}" y2="${height - offset - bottom}" stroke="${color}" stroke-width="${weight}"/>
		    <path d="M ${width - right} ${offset + top} C ${width - right} ${offset/handle + top}, ${width - offset/handle - right} ${top}, ${width - offset - right} ${top}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		    <path d="M ${width - right} ${height - offset - bottom} C ${width - right} ${height - offset/handle - bottom}, ${width - offset/handle - right} ${height - bottom}, ${width - offset - right} ${height - bottom}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		`;
		 box.all = `
		    <line x1="${offset + left}" y1="${top}" x2="${width - offset - right}" y2="${top}" stroke="${color}" stroke-width="${weight}"/>
		    <line x1="${left}" y1="${offset + top}" x2="${left}" y2="${height - offset - bottom}" stroke="${color}" stroke-width="${weight}"/>
		    <line x1="${width - right}" y1="${offset + top}" x2="${width - right}" y2="${height - offset - bottom}" stroke="${color}" stroke-width="${weight}"/>
		    <line x1="${offset + left}" y1="${height - bottom}" x2="${width - offset - right}" y2="${height - bottom}" stroke="${color}" stroke-width="${weight}"/>
		    <path d="M ${width - right} ${offset + top} C ${width - right} ${offset/handle + top}, ${width - offset/handle - right} ${top}, ${width - offset - right} ${top}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		    <path d="M ${left} ${offset + top} C ${left} ${offset/handle + top}, ${offset/handle + left} ${top}, ${offset + left} ${top}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		    <path d="M ${width - right} ${height - offset - bottom} C ${width - right} ${height - offset/handle - bottom}, ${width - offset/handle - right} ${height - bottom}, ${width - offset - right} ${height - bottom}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		    <path d="M ${left} ${height - offset - bottom} C ${left} ${height - offset/handle - bottom}, ${offset/handle + left} ${height - bottom}, ${offset + left} ${height - bottom}" stroke="${color}" stroke-width="${weight}" fill="transparent" />
		`;

		return box;
	}

	#render_box(width, height, offst, weight, angle) {
		let lab = "oklch(0.75 0.225 ";
		let blk = this.#box_svg(width - weight/2, height - weight/2, offst - weight/2, weight, weight, weight, "black");
		let ylw = this.#box_svg(width - weight, height - weight/2, offst - weight/2, weight, weight/2, weight, lab + angle + ")");
		let grn = this.#box_svg(width - weight/2, height - weight, offst - weight/2, weight, weight, weight/2, lab + (angle+90) + ")");
		let blu = this.#box_svg(width , height - weight/2, offst - weight/2, weight, weight*1.5, weight, lab + (angle+180) + ")");
		let red = this.#box_svg(width - weight/2, height, offst - weight/2, weight, weight, weight*1.5, lab + (angle+270) + ")");
		this.frame.innerHTML = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' + ylw.left + ylw.right + grn.top + grn.bottom  + blu.left + blu.right + red.top + red.bottom + blk.all + '</svg>';
	//	console.log(this.innerHTML);
		//let temp = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">';
		//for (let i = 0; i < 360; i=i+10) {
	//		let L = Math.cos(i * 0.0174532925199) * weight/2;
//			let T = Math.sin(i * 0.0174532925199) * weight/2;
//			temp = temp + this.#box_svg(width - weight/2 + L, height - weight/2 + T, offst - weight/2, weight, weight + L, weight + T, lab + i + ")").all;
//		}
//		
//		temp += '</svg>';
//		this.innerHTML = temp;
//		console.log(this.innerHTML);
	}

}
