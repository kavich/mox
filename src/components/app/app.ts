import $mol_wire_lib from 'mol_wire_lib'
import { mox_view, type mox_view_content } from "../view/view";
class Account extends Object {}
export class Appp extends Object {
	
	@$mol_wire_lib.$mol_wire_plex
	account( id: number ) {
		return new Account( id )
	}
	
}

export class Logo extends mox_view {
   
    override sub(): readonly mox_view_content[] {
        return [
            "Logo Component"
        ];
    }
     
}

export class Sidebar extends mox_view {
    
    @$mol_wire_lib.$mol_wire_solo
    Logo() {
        const logo = new Logo();
        return logo
    }
    override sub(): readonly mox_view_content[] {
        return [

            this.Logo()
        ];
    }
   
}

export class App extends mox_view {

    @$mol_wire_lib.$mol_wire_solo
    Sidebar() {
        const sidebar = new Sidebar();

        return sidebar
    }
    override sub(): readonly mox_view_content[] {
        return [
            "Hello, World!",
            this.Sidebar()
        ];
    }


    /*
    mount() {
        console.log('Mounting App');
        const appElement = document.getElementById('app');
        if (appElement) {
            appElement.outerHTML = this.run();
        }
    }
        */
    static [Symbol.toStringTag] = 'App'
}
