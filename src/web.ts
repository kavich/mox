//console.log('working')
import {App} from "@/components/app/app";
import {Appp} from "@/components/app/app";
import { mox_view, type mox_view_content } from "@/components/view/view";
//const app = new App();
(window as any)['App'] = App;
//(window as any)['mox_view'] = mox_view;

document?.addEventListener(
		'DOMContentLoaded',
		()=> App.autobind(),
		{ once: true },
	)

const appp = new Appp();

