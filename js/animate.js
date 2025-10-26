function interpolate(start, target, Aslope, Bslope, mili, onUpdate) {
	return new Promise((resolve) => {
	const startTime = performance.now();
	const st = parseInt(start);
	const tg = parseInt(target);

	const diff = Math.abs(st-tg);
	const d2= mili*mili;
	const ApB = Aslope + Bslope;
	const BmA = Bslope - Aslope;
	const corr = 2*(diff - mili*(ApB/2) + Math.sqrt(d2*((ApB * ApB)/4 + (BmA * BmA)/4) - mili*ApB*diff + diff*diff))/d2;
	const M = (Bslope + corr*mili - Aslope)/(2 * corr);
	const mid = st + (corr/2) * M*M + Aslope*M + (corr/2) * M*M - (corr*mili + Bslope)*M
	
	let value = st;
	console.log(st + " " + tg + " " +M + " " + mid + " " + corr);

	function step(time) {
		let secant = time - startTime;
		if (secant < mili) {   
			
			if (secant < M) {
				value = st + corr/2 * secant*secant + Aslope*secant; 
				console.log(Math.floor(secant) + " a" + M + "  " + value);
				//console.log(st + corr/2 * secant*secant + Aslope*secant);
			} else {
				value = mid - (corr/2) * secant*secant + (corr*mili + Bslope) * secant;
				console.log(Math.floor(secant) + ' d'+ M + "  " + value);
				//console.log((-corr/2) * secant*secant + (corr*mili + Bslope) * secant); 
			}
			//if (updateFunc) { updateFunc() };
			onUpdate(value);
			requestAnimationFrame(step);
		} else {
			onUpdate(tg);
			resolve();
		}
	}

	requestAnimationFrame(step);
	});
}
