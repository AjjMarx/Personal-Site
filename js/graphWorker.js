self.onmessage = function(e) {
	const data = e.data;
	let results  =[];


	for (let i = 0; i < data.equations.length; i++) {
		let eq = data.equations[i];
		let col = data.eqColors[i] ?? "Black";
		function evaluateFormula(x) {
			return eval(eq);
		}
		let temp = `<polyline points="`;
		let delta = 0;
		let x = data.x[0];
		let loop = 0;
		let pointCount = 0
		let nonEmpty = false;
		let st = performance.now();
		while (loop < 10000 && pointCount < 2000 && x < data.x[1]) {
			let xp = Math.trunc(x*100)/100;
			if (!isNaN(evaluateFormula(x)) || evaluateFormula(x) > data.y[1] || evaluateFormula(x) < data.y[0]) {
				if (evaluateFormula(xp) < data.y[1] + 1 && evaluateFormula(xp) > data.y[0] -1) {
					temp += `${xp},${Math.trunc(evaluateFormula(xp)*100)/100} `;
				}
				pointCount++;
				nonEmpty = true;
				if (!isNaN(evaluateFormula(x+0.01))) {
					x += 0.1 / Math.sqrt(Math.pow((evaluateFormula(x)-evaluateFormula(x+0.01))/0.01, 2)+ 1);
				} else { x += 0.01; }
			} else if (nonEmpty) {
				temp += `" /fill="none" stroke="${col}" stroke-width="2", vector-effect="non-scaling-stroke"></polyline><polyline points="`;
				nonEmpty = false;
				x += 0.1;
			} else { x += 0.01;}
			loop++;
		}
		//console.log(loop);
		temp += `" /fill="none" stroke="${col}" stroke-width="2", vector-effect="non-scaling-stroke">`;
		results.push(temp);
	}
	for (let i = 0; i < data.points.length; i++) {
		let p = data.points[i];
		let col = data.pColors[i];
		results.push(`<polyline points="${p[0]},${p[1]} ${p[0]+0.01},${p[1]}" /fill="none" stroke="${col}" stroke-width="8", stroke-linecap="round" vector-effect="non-scaling-stroke">`);
		results.push(`<polyline points="${p[0]},${p[1]} ${p[0]+0.01},${p[1]}" /fill="none" stroke="white" stroke-width="4", stroke-linecap="round" vector-effect="non-scaling-stroke">`);
	}

	self.postMessage(results);
}
