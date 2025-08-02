import $mol_wire_lib from 'mol_wire_lib'
import { mox_view, type mox_view_content } from "../view/view";

class Entity extends Object {

    constructor(
        readonly id: number
    ) { super() }

    destructor() { }

    @$mol_wire_lib.$mol_wire_solo
    data(data = {}) {
        return data
    }

    @$mol_wire_lib.$mol_wire_plex
    value<
        Field extends keyof ReturnType<this['data']>
    >(
        field: Field,
        value?: ReturnType<this['data']>[Field],
    ): ReturnType<this['data']>[Field] {

        return this.data(value === undefined
            ? undefined
            : {
                ... this.data(),
                [field]: value,
            }
        )[field as never]

    }

}


class Job extends Entity {
    @$mol_wire_lib.$mol_wire_plex
    override data(data = { title: '', uid: '' }) {
        return data
    }

    uid(uid?: string) {
        return this.value('uid', uid)
    }
    title(title?: string) {
        return this.value('title', title)
    }



}


export class Logo extends mox_view {

    @$mol_wire_lib.$mol_wire_solo
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
    @$mol_wire_lib.$mol_wire_solo
    override sub(): readonly mox_view_content[] {
        return [

            this.Logo()
        ];
    }

}

export class Column extends mox_view {
    override dom_name(): string {
        return "td"
    }

    @$mol_wire_lib.$mol_wire_solo
    override sub(): readonly mox_view_content[] {
        let i = 0;
        let cols = ['col']

        return cols
    }
}

export class Row extends mox_view {
    override dom_name(): string {
        return "tr"
    }

    @$mol_wire_lib.$mol_wire_plex
    items(id: number): Column {
        return new Column();
    }

    @$mol_wire_lib.$mol_wire_plex
    Column(id: number): Column {
        return new Column();
    }
    override sub(): readonly mox_view_content[] {
        let cols = []
        for (let i = 0; i < 5; i++) {
            const col = this.Column(i);
            cols.push(col);
        }
        return cols
    }
}
export class Table extends mox_view {
    override dom_name(): string {
        return "table"
    }
    @$mol_wire_lib.$mol_wire_solo
    items(): any[]  {
        return [];
    }
    @$mol_wire_lib.$mol_wire_plex
    Row(id: number): Row {
        return new Row();
    }

    override sub(): readonly mox_view_content[] {
        let i = 0;
        let rows = []
        for (const item of this.items()) {
            const row = this.Row(i++);
            rows.push(row);
        }
        return rows
    }
}


export class Main extends mox_view {

    @$mol_wire_lib.$mol_wire_solo
    Table() {
        const table = new Table();
        table.items = () => {
            return [
                new Job(1),
                new Job(2),
                new Job(3),
            ];
        }
        return table
    }
    override sub(): readonly mox_view_content[] {
        return [
            this.Table(),
        ];
    }
}

export class MApp extends mox_view {

    @$mol_wire_lib.$mol_wire_solo
    Sidebar() {
        const sidebar = new Sidebar();

        return sidebar
    }

    @$mol_wire_lib.$mol_wire_solo
    Main() {
        const main = new Main();
        return main
    }



    override sub(): readonly mox_view_content[] {
        return [
            this.Sidebar(),
            this.Main(),
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
    static [Symbol.toStringTag] = 'MApp'
}
