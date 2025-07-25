import $mol_wire_lib from 'mol_wire_lib'
import $mol_wire_dom from 'mol_wire_dom'


export function $mol_dom_qname(name: string) {
    return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_')
}

export function $mol_dom_render_fields(
    el: Element,
    fields: { [key: string]: any }
) {
    for (let key in fields) {

        const val: any = fields[key]

        if (val === undefined) continue
        if (val === (el as any)[key]) continue

        (el as any)[key] = val
    }
}

export function $mol_dom_render_attributes(
    el: Element,
    attrs: { [key: string]: string | number | boolean | null }
) {
    for (let name in attrs) {

        let val = attrs[name] as any


        if (val === undefined) {

            continue

        } else if (val === null || val === false) {

            if (!el.hasAttribute(name)) continue

            el.removeAttribute(name)

        } else {


            const str = String(val)


            if (el.getAttribute(name) === str) continue


            el.setAttribute(name, str)

        }

    }

}



export class mox_view extends $mol_wire_lib.$mol_object {


    @$mol_wire_lib.$mol_mem_key
    static Root<This extends typeof mox_view>(this: This, id: number) {
        return new this as InstanceType<This>
    }
    @$mol_wire_lib.$mol_wire_method
    dom_id() {
        //console.log(this.toString());
        return this.toString().replace(/</g, '(').replace(/>/g, ')').replaceAll(/"/g, "'")
    }


    @$mol_wire_lib.$mol_wire_method
    dom_name() {
     //   return $mol_dom_qname(this.constructor.toString()) || 'div'
        return 'div'
    }


    dom_node_external(next?: Element) {
        const node = next ?? $mol_wire_dom.document.createElementNS('http://www.w3.org/1999/xhtml', this.dom_name())
        const id = this.dom_id()
        node.setAttribute('id', id)
        node.toString = $mol_wire_lib.$mol_const('<#' + id + '>')

        return node
    }

    @$mol_wire_lib.$mol_mem
    dom_node(next?: Element) {
        $mol_wire_lib.$mol_wire_solid()
        const node = this.dom_node_external(next)
        $mol_dom_render_attributes(node, this.attr_static())

        //const events = this.event_async()
        //$mol_dom_render_events(node, events)

        return node
    }


    @$mol_wire_lib.$mol_wire_solo
    autorun() {
        try {
            this.dom_tree()

        } catch (error) {
            $mol_wire_lib.$mol_fail_log(error)
        }
    }

    auto() {
        return null as any
    }
    @$mol_wire_lib.$mol_wire_solo
    dom_node_actual() {
        const node = this.dom_node()

        //$mol_dom_render_styles(node, this.style_size())

        //const attr = this.attr()
        //const style = this.style()

        //$mol_dom_render_attributes(node, attr)
        //$mol_dom_render_styles(node, style)

        return node
    }

    @$mol_wire_lib.$mol_wire_solo
    render() {

        const node = this.dom_node_actual()

        const sub = this.sub()
        if (!sub) return

        const nodes = sub.map(child => {
            if (child == null) return null
            return (child instanceof mox_view)
                ? child.dom_node()
                : child instanceof window.Node
                    ? child
                    : String(child)
        })

        $mol_wire_dom.$mol_dom_render_children(node, nodes)

        for (const el of sub) if (el && typeof el === 'object' && 'dom_tree' in el) el['dom_tree']()

        $mol_dom_render_fields(node, this.field())

    }


    @$mol_wire_lib.$mol_wire_solo
    dom_tree(next?: Element): Element {
        const node = this.dom_node(next)

        render: try {
            //console.log(node);

            $mol_dom_render_attributes(node, { mox_view_error: null })

            try {

                this.render()

            } finally {
                /*
                for (let plugin of this.plugins()) {
                    if (plugin instanceof $mol_plugin) {
                        plugin.dom_tree()
                    }
                }
                */

            }

        } catch (error: any) {
            console.error(`Error rendering view ${this.constructor.name}:`, error)
            /*
            $mol_fail_log(error)
            const mol_view_error = $mol_promise_like(error)
                ? (error as any).constructor[Symbol.toStringTag] ?? 'Promise'
                : error.name || error.constructor.name
            $mol_dom_render_attributes(node, { mox_view_error })

            if ($mol_promise_like(error)) break render

            try {
                const message = error.message || error
                    ; (node as HTMLElement).innerText = message.replace(/^|$/mg, '\xA0\xA0')
            } catch { }
            */
        }

        try {
            this.auto()
        } catch (error) {
            confirm(`Error in auto() method of ${this.constructor.name}: ${error}`)
            //$mol_fail_log(error)
        }

        return node
    }



    sub() {
        return [] as readonly mox_view_content[]
    }

    attr_static(): { [key: string]: string | number | boolean | null } {
        let attrs: any = {}

        for (let name of this.view_names()) attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = ''

        return attrs
    }

    @$mol_wire_lib.$mol_wire_method

    static view_classes() {
        const proto = this.prototype

        let current = proto
        const classes = [] as (typeof mox_view)[]

        while (current) {
            if (current.constructor.name !== classes.at(-1)?.name) {
                classes.push(current.constructor as typeof mox_view)
            }
            if (!(current instanceof mox_view)) break
            current = Object.getPrototypeOf(current)
        }
        //console.log('View classes:', classes.map(c => c.name).join(', '))
        return classes
    }
    static _view_names?: Map<string, string[]>
    static view_names(suffix: string) {

        let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value
        if (!cache) cache = this._view_names = new Map

        const cached = cache.get(suffix)
        if (cached) return cached

        const names = [] as string[]
        const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1)

        for (const Class of this.view_classes()) {
            if (suffix in Class.prototype) names.push(this.$.$mol_func_name(Class) + suffix2)
            else break
        }
       // console.log('View names:', names)
        cache.set(suffix, names)
        return names
    }
    @$mol_wire_lib.$mol_wire_method
    view_names_owned() {
        const names = [] as string[]
        let owner = $mol_wire_lib.$mol_owning_get(this) as $mol_wire_lib.$mol_wire_fiber<any, any[], any>

        if (!(owner?.host instanceof mox_view)) return names

        const suffix = owner.task.name.trim()
        const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1)

        names.push(... (owner.host.constructor as typeof mox_view).view_names(suffix))

        for (let prefix of owner.host.view_names_owned()) {
            names.push(prefix + suffix2)
        }
        //console.log('View names owned:', names)
        return names
    }

    @$mol_wire_lib.$mol_wire_method
    view_names() {
        const names = new Set<string>()

        for (let name of this.view_names_owned()) names.add(name)

        for (let Class of (this.constructor as typeof mox_view).view_classes()) {
            const name = this.$.$mol_func_name(Class)
            if (name) names.add(name)
        }

        return names
    }

    field(): { [key: string]: any } {
        return {}
    }

    event(): { [key: string]: (event: Event) => void } {
        return {}
    }

    @$mol_wire_lib.$mol_wire_solo
    event_async() {
        return { ...$mol_wire_lib.$mol_wire_async(this.event()) }
    }

    plugins() {
        return [] as readonly mox_view[]
    }
    static autobind() {

        const nodes = document.querySelectorAll('[mox_root]:not([mox_root=""])')

        for (let i = nodes.length - 1; i >= 0; --i) {

            const name = nodes.item(i).getAttribute('mox_root')!
            //console.log(window);
            const View = (window as any)[name] as typeof mox_view
            if (!View) {
                console.error(`Can not attach view. Class not found: ${name}`)
                continue
            }
            //console.log(View, i);
            const view = View.Root(i)
            //;(window as any)['app'] = view

            //(window as any)['app'] = view

            view.dom_node(nodes.item(i))
            view.autorun()

        }

    }
    override destructor() {
        const node = $mol_wire_lib.$mol_wire_probe(() => this.dom_node())
        if (!node) return

        const events = $mol_wire_lib.$mol_wire_probe(() => this.event_async())
        if (!events) return

        for (let event_name in events) {
            node.removeEventListener(
                event_name,
                events[event_name]
            )
        }
    }
}


export type mox_view_content = mox_view | Node | string | number | boolean | null
