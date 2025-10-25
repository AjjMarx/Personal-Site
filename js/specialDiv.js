class SpecialDiv extends HTMLElement {
	constructor() {
		super();
		//this.style.padding = "4px";

		this.content = null;
		this.frame = null;
			
	}

	connectedCallback() {
		this.content = document.createElement("div");
		this.content.id = 0;
		this.appendChild(this.content);
		this.content.style.position = "absolute";
		this.content.style.width = "calc(100% - 6px)";
		this.content.style.height = "calc(100% - 8px)";
		this.content.style.top = "8px";
		this.content.style.left = "4px";//"12px";
//		this.content.style.right = "8px";
		this.content.style.padding = "10px 10% 10px 10%";
		this.content.style.overflow = "auto";
		this.content.style.textAlign = "justify";
		this.content.style.backgroundColor = "white";
		
		this.frame = document.createElement("div");
		this.frame.id = 0;
		this.appendChild(this.frame);
		this.frame.style.position = "absolute";
		this.frame.style.width = "100%";
		this.frame.style.height = "100%";
		this.frame.style.pointerEvents = "none";

		this.parentAppend = this.appendChild.bind(this);
        	this.appendChild = (child) => {
			return this.content.appendChild(child);
		};

		this.reload();
		window.addEventListener("resize", () => this.reload());
	}

	#scroll() {
		return this.content.scrollTop;
	}
 

	reload() {
		//console.log(this.clientWidth, this.clientHeight);
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

