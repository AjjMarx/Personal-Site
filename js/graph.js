async function addGraph(container, data, name, isAnimated){
	//console.log("Adding graph");
	//console.log(data);
	const graphWrapper = document.createElement("div");
	graphWrapper.id = assignName(name);
	graphWrapper.style.position = "relative";

	const graph = document.createElement("special-div");
	graph.id = assignName(name);
	graph.style.position = "absolute";
	graph.style.top = "0px";
	graph.style.width = "100%";
	graph.style.height = "100%";
	graph.style.dispay = "none";
	
	graphWrapper.style.aspectRatio = data["aspect_ratio"];
	if (0.8 * container.offsetWidth * 0.8 - container.offsetWidth * 0.8 * data["width"] < 150 || data["location"] == "center") {
		graphWrapper.style.float = "none";
		graphWrapper.style.margin = "0.5em auto";
	} else {
		graphWrapper.style.float = data["location"];
		graphWrapper.style.margin = "0.5em 0.5em 0.5em 0.5em";
	}

	container.appendChild(graphWrapper);
	graphWrapper.appendChild(graph);

	window.addEventListener("resize", () => {
		if (0.8 * container.offsetWidth * 0.8 - container.offsetWidth * 0.8 * data["width"] < 150 || data["location"] == "center") {
			graphWrapper.style.float = "none";
			graphWrapper.style.margin = "0.5em auto";
		} else {	
			graphWrapper.style.float = data["location"];
			graphWrapper.style.margin = "0.5em 0.5em 0.5em 0.5em";
		}
	});

	graph.content.style.padding = "0px 0px 0px 0px";

	const vis = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	vis.style.position = "absolute";
	vis.style.left = "0%";
	vis.style.top = "0%";
	vis.style.width = "100%";
	vis.style.height = "100%";
	vis.style.transform ="scaleY(-1)";
	vis.setAttribute("width", "100%");
	vis.setAttribute("height", "100%");
	vis.setAttribute("viewBox", String(data.x[0] + " " + data.y[0] + " " +  data.x[1] + " " + data.y[1]));
	vis.setAttribute("preserveAspectRatio", "none");
	vis.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	for (let i = data.y[0] - data.y[0]%data["lineSpacing"]; i < data.y[1]; i += data["lineSpacing"]) { 
		vis.innerHTML += `<polyline points="${data.x[0]},${i} ${data.x[1]},${i}" /fill="none" stroke="#D0D0D0" stroke-width="1", vector-effect="non-scaling-stroke">`; 
	}
	for (let i = data.x[0] - data.x[0]%data["lineSpacing"]; i < data.x[1]; i += data["lineSpacing"]) { 
		vis.innerHTML += `<polyline points="${i},${data.y[0]} ${i},${data.y[1]}" /fill="none" stroke="#D0D0D0" stroke-width="1", vector-effect="non-scaling-stroke">`; 
	}
	vis.innerHTML += `<polyline points="${data.x[0]},0 ${data.x[1]},0" /fill="none" stroke="oklch(0.75 0.225 330)" stroke-width="2", vector-effect="non-scaling-stroke">`;
	vis.innerHTML += `<polyline points="0,${data.y[0]} 0,${data.y[1]}" /fill="none" stroke="oklch(0.75 0.225 240)" stroke-width="2", vector-effect="non-scaling-stroke">`;

	const loadingBox = document.createElement("div");
	loadingBox.style.position = "absolute";
	loadingBox.style.width = "100%";
	loadingBox.style.top = "calc(50% - 1em)";
	loadingBox.style.textAlign = "center";
	loadingBox.innerHTML = "<h3>loading..</h3>";

	//'<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">'
	await graph.content.appendChild(vis);
	graph.content.appendChild(loadingBox);


	function loadData() {
		console.log("loading graph");
		const tempWorker = new Worker('./js/graphWorker.js');
		tempWorker.postMessage(data);
		tempWorker.onmessage = function(e) {
			const result = e.data
			for (let i of result) {
				vis.innerHTML += i;
			}
			loadingBox.remove();
			tempWorker.terminate();
		}
		tempWorker.onError = (err) => {console.error(err);};
	}


	return new Promise((resolve, reject) => {
		if (isAnimated) {
			const wdth = 80 * data["width"];
			graphWrapper.style.width = "0%";
			graph.reload();
			interpolate(wdth, 0, 0, 0, 70, (value) => {
				graphWrapper.style.width = Math.floor(Math.abs(wdth-value)) + "px";
				graph.reload(); 
			}, () => {
				graphWrapper.style.width = 80 * data["width"] + "%";
				graph.style.display = "auto";
				graph.reload(); 
				resolve(); 
				setTimeout(() => {loadData();}, 100);
			});
		} else {	
			graphWrapper.style.width = 80 * data["width"] + "%";
			graph.style.display = "auto";
			graph.reload();
			resolve(); 
			setTimeout(() => {loadData();}, 100);
		}
	});
}

async function removeGraph(element, isAnimated) {
	return new Promise (async (resolve, reject) => {
		if (!element) { console.log("No such graph"); return; }
		if (statusHash.get(element.id) == "removing"){ console.log("double removal being neglected"); return; }
		statusHash.set(element.id, "removing");
		const wdth = parseInt(element.style.width);
		if (isAnimated) {
			await interpolate(0, wdth, 0, 0, 100, (value) => {
				element.style.width = Math.floor(Math.abs(wdth-value)) + "%";
				element.firstChild.reload();
			}, () => { return;});
		}
		element.remove();
		statusHash.set(element.id, "removed");
		resolve();
	});
}

async function updateGraph(element, content) {
	console.log("Updating graph");
	return;
}

