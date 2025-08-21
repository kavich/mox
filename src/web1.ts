import { MApp } from "@/components/app/app";
import { _ } from "node_modules/tailwindcss/dist/colors-b_6i0Oi7";

(window as any)['MApp'] = MApp;

document?.addEventListener(
	'DOMContentLoaded',
	() => MApp.autobind(),
	{ once: true },
)


class nObject {
	constructor() {
		console.log('nObject initialized');
		// Initialize your app here
	}

	destructor() {  
		console.log('MyApp destructed');
		// Cleanup if necessary
	}
}
class nEntity extends nObject {
	data: { [key: string]: any } = {};

	constructor(input: any = {}) {
		super();
		for (const key in input) {
			this.value(key, input[key]);
		}
	}
	value(key: string, value: any = null): any {
		if (value !== null) {
			this.data[key] = value;
		}
		return this.data[key];
	}
}

class Source extends nEntity {}
class Job extends nEntity {
	 
	_source: { [key: string]: Source } = {};
	source(id: any): Source {
		if (this._source[id] === undefined) {
			this._source[id] = new Source({"id": id});
		}
		return this._source[id];
	}

	sources(): Source[] {
		return Object.values(this._source);
	}
}
class nView extends nEntity {
	
	node(node:any=null){
		if (node) {
			this.value('node', node);
		}else{
			let n = this.value('node');
			if (n === undefined) {
				n = window.document.createElement('div');
			}
			this.value('node', n);
		}
		return this.value('node');
	}
	render() {
		const el = this.node();
		const nodes = this.childrens();
		for( let node of nodes ) {
			if (typeof node === 'string') {
				node = document.createTextNode(node);
			} else if (node instanceof nView) {
				node = node.node();
			} else if (!(node instanceof Element)) {
				throw new Error('Invalid node type');
			}
			el.appendChild(node);
		}
	
	}
	 
	childrens(): any[]{
		return [];
	}

	autobind(): void {
		const el = document.getElementById(this.value('id'));
		if (el)
			this.node(el);
		console.log('nView autobind', el);
		this.render();
	}
}
class SourceView extends nView {
	 
}
 

class nApp extends nView {

	override childrens(): any[] {
		const ss = j1.sources();
		return ss.map((s) =>  s.value("id"));
	}
}
const myfunct = () => {
	console.log('MyApp function called');
	
	console.log(j1.source("jira"))
	console.log(j1.source("email"))
	console.log(j1.source("email").value("id"));
	console.log(j1.source("jira").value("id"));
	console.log(j1.sources());
	console.log(j1);

	const napp = new nApp({'id': 'nApp' });
	window['napp'] = napp;
	napp.autobind();
	console.log(napp);
	//j1.source("test")
	//napp.render();


	// No need to use delete on a local variable
};
const j1 = new Job();
window['j1'] = j1;
myfunct();
