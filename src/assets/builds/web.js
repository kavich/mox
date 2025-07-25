var __legacyDecorateClassTS = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1;i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __legacyMetadataTS = (k, v) => {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};

// node_modules/mol_wire_lib/web.mjs
var $node = $node || {};
(function(module) {
  var exports = module.exports = this;
  function require2(id) {
    return $node[id.replace(/^.\//, "../")];
  }
  Error.stackTraceLimit = 50;
  var $;
  (function($2) {})($ || ($ = {}));
  module.exports = $;
  $node["../mam.ts"] = $node["../mam.ts"] = module.exports;
}).call({}, {});
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1;i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $ = typeof module_web === "object" ? module_web["export" + "s"] = globalThis : globalThis;
$.$$ = $;
var $;
(function($2) {
  function $mol_guid2(length = 8, exists = () => false) {
    for (;; ) {
      let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
      if (exists(id))
        continue;
      return id;
    }
  }
  $2.$mol_guid = $mol_guid2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_fail2(error) {
    throw error;
  }
  $2.$mol_fail = $mol_fail2;
})($ || ($ = {}));
var $;
(function($2) {
  let $mol_wire_cursor2;
  (function($mol_wire_cursor3) {
    $mol_wire_cursor3[$mol_wire_cursor3["stale"] = -1] = "stale";
    $mol_wire_cursor3[$mol_wire_cursor3["doubt"] = -2] = "doubt";
    $mol_wire_cursor3[$mol_wire_cursor3["fresh"] = -3] = "fresh";
    $mol_wire_cursor3[$mol_wire_cursor3["final"] = -4] = "final";
  })($mol_wire_cursor2 = $2.$mol_wire_cursor || ($2.$mol_wire_cursor = {}));
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_wire_pub2 extends Object {
    constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
      super();
      this[Symbol.toStringTag] = id;
    }
    [Symbol.toStringTag];
    data = [];
    static get [Symbol.species]() {
      return Array;
    }
    sub_from = 0;
    get sub_list() {
      const res = [];
      for (let i = this.sub_from;i < this.data.length; i += 2) {
        res.push(this.data[i]);
      }
      return res;
    }
    get sub_empty() {
      return this.sub_from === this.data.length;
    }
    sub_on(sub, pub_pos) {
      const pos = this.data.length;
      this.data.push(sub, pub_pos);
      return pos;
    }
    sub_off(sub_pos) {
      if (!(sub_pos < this.data.length)) {
        $mol_fail(new Error(`Wrong pos ${sub_pos}`));
      }
      const end = this.data.length - 2;
      if (sub_pos !== end) {
        this.peer_move(end, sub_pos);
      }
      this.data.length = end;
      if (end === this.sub_from)
        this.reap();
    }
    reap() {}
    promote() {
      $mol_wire_auto()?.track_next(this);
    }
    fresh() {}
    complete() {}
    get incompleted() {
      return false;
    }
    emit(quant = $mol_wire_cursor.stale) {
      for (let i = this.sub_from;i < this.data.length; i += 2) {
        this.data[i].absorb(quant, this.data[i + 1]);
      }
    }
    peer_move(from_pos, to_pos) {
      const peer = this.data[from_pos];
      const self_pos = this.data[from_pos + 1];
      this.data[to_pos] = peer;
      this.data[to_pos + 1] = self_pos;
      peer.peer_repos(self_pos, to_pos);
    }
    peer_repos(peer_pos, self_pos) {
      this.data[peer_pos + 1] = self_pos;
    }
  }
  $2.$mol_wire_pub = $mol_wire_pub2;
})($ || ($ = {}));
var $;
(function($2) {
  $2.$mol_wire_auto_sub = null;
  function $mol_wire_auto2(next = $2.$mol_wire_auto_sub) {
    return $2.$mol_wire_auto_sub = next;
  }
  $2.$mol_wire_auto = $mol_wire_auto2;
  $2.$mol_wire_affected = [];
})($ || ($ = {}));
var $;
(function($2) {
  $2["devtoolsFormatters"] ||= [];
  function $mol_dev_format_register(config) {
    $2["devtoolsFormatters"].push(config);
  }
  $2.$mol_dev_format_register = $mol_dev_format_register;
  $2.$mol_dev_format_head = Symbol("$mol_dev_format_head");
  $2.$mol_dev_format_body = Symbol("$mol_dev_format_body");
  $mol_dev_format_register({
    header: (val, config = false) => {
      if (config)
        return null;
      if (!val)
        return null;
      if ($2.$mol_dev_format_head in val) {
        try {
          return val[$2.$mol_dev_format_head]();
        } catch (error) {
          return $2.$mol_dev_format_accent($mol_dev_format_native2(val), "\uD83D\uDCA8", $mol_dev_format_native2(error), "");
        }
      }
      if (typeof val === "function") {
        return $mol_dev_format_native2(val);
      }
      if (Symbol.toStringTag in val) {
        return $mol_dev_format_native2(val);
      }
      return null;
    },
    hasBody: (val) => val[$2.$mol_dev_format_body],
    body: (val) => val[$2.$mol_dev_format_body]()
  });
  function $mol_dev_format_native2(obj) {
    if (typeof obj === "undefined")
      return $2.$mol_dev_format_shade("undefined");
    return [
      "object",
      {
        object: obj,
        config: true
      }
    ];
  }
  $2.$mol_dev_format_native = $mol_dev_format_native2;
  function $mol_dev_format_auto2(obj) {
    if (obj == null)
      return $2.$mol_dev_format_shade(String(obj));
    return [
      "object",
      {
        object: obj,
        config: false
      }
    ];
  }
  $2.$mol_dev_format_auto = $mol_dev_format_auto2;
  function $mol_dev_format_element(element, style, ...content) {
    const styles = [];
    for (let key in style)
      styles.push(`${key} : ${style[key]}`);
    return [
      element,
      {
        style: styles.join(" ; ")
      },
      ...content
    ];
  }
  $2.$mol_dev_format_element = $mol_dev_format_element;
  function $mol_dev_format_span2(style, ...content) {
    return $mol_dev_format_element("span", {
      ...style
    }, ...content);
  }
  $2.$mol_dev_format_span = $mol_dev_format_span2;
  $2.$mol_dev_format_div = $mol_dev_format_element.bind(null, "div");
  $2.$mol_dev_format_ol = $mol_dev_format_element.bind(null, "ol");
  $2.$mol_dev_format_li = $mol_dev_format_element.bind(null, "li");
  $2.$mol_dev_format_table = $mol_dev_format_element.bind(null, "table");
  $2.$mol_dev_format_tr = $mol_dev_format_element.bind(null, "tr");
  $2.$mol_dev_format_td = $mol_dev_format_element.bind(null, "td");
  $2.$mol_dev_format_accent = $mol_dev_format_span2.bind(null, {
    color: "magenta"
  });
  $2.$mol_dev_format_strong = $mol_dev_format_span2.bind(null, {
    "font-weight": "bold"
  });
  $2.$mol_dev_format_string = $mol_dev_format_span2.bind(null, {
    color: "green"
  });
  $2.$mol_dev_format_shade = $mol_dev_format_span2.bind(null, {
    color: "gray"
  });
  $2.$mol_dev_format_indent = $2.$mol_dev_format_div.bind(null, {
    "margin-left": "13px"
  });
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_wire_pub_sub2 extends $mol_wire_pub {
    pub_from = 0;
    cursor = $mol_wire_cursor.stale;
    get temp() {
      return false;
    }
    get pub_list() {
      const res = [];
      const max = this.cursor >= 0 ? this.cursor : this.sub_from;
      for (let i = this.pub_from;i < max; i += 2) {
        if (this.data[i])
          res.push(this.data[i]);
      }
      return res;
    }
    track_on() {
      this.cursor = this.pub_from;
      const sub = $mol_wire_auto();
      $mol_wire_auto(this);
      return sub;
    }
    promote() {
      if (this.cursor >= this.pub_from) {
        $mol_fail(new Error("Circular subscription"));
      }
      super.promote();
    }
    track_next(pub) {
      if (this.cursor < 0)
        $mol_fail(new Error("Promo to non begun sub"));
      if (this.cursor < this.sub_from) {
        const next = this.data[this.cursor];
        if (pub === undefined)
          return next ?? null;
        if (next === pub) {
          this.cursor += 2;
          return next;
        }
        if (next) {
          if (this.sub_from < this.data.length) {
            this.peer_move(this.sub_from, this.data.length);
          }
          this.peer_move(this.cursor, this.sub_from);
          this.sub_from += 2;
        }
      } else {
        if (pub === undefined)
          return null;
        if (this.sub_from < this.data.length) {
          this.peer_move(this.sub_from, this.data.length);
        }
        this.sub_from += 2;
      }
      this.data[this.cursor] = pub;
      this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
      this.cursor += 2;
      return pub;
    }
    track_off(sub) {
      $mol_wire_auto(sub);
      if (this.cursor < 0) {
        $mol_fail(new Error("End of non begun sub"));
      }
      for (let cursor = this.pub_from;cursor < this.cursor; cursor += 2) {
        const pub = this.data[cursor];
        pub.fresh();
      }
      this.cursor = $mol_wire_cursor.fresh;
    }
    pub_off(sub_pos) {
      this.data[sub_pos] = undefined;
      this.data[sub_pos + 1] = undefined;
    }
    destructor() {
      for (let cursor = this.data.length - 2;cursor >= this.sub_from; cursor -= 2) {
        const sub = this.data[cursor];
        const pos = this.data[cursor + 1];
        sub.pub_off(pos);
      }
      this.data.length = this.sub_from;
      this.cursor = this.pub_from;
      this.track_cut();
      this.cursor = $mol_wire_cursor.final;
    }
    track_cut() {
      if (this.cursor < this.pub_from) {
        $mol_fail(new Error("Cut of non begun sub"));
      }
      let end = this.data.length;
      for (let cursor = this.cursor;cursor < this.sub_from; cursor += 2) {
        const pub = this.data[cursor];
        pub?.sub_off(this.data[cursor + 1]);
        end -= 2;
        if (this.sub_from <= end)
          this.peer_move(end, cursor);
      }
      this.data.length = end;
      this.sub_from = this.cursor;
    }
    complete() {}
    complete_pubs() {
      const limit = this.cursor < 0 ? this.sub_from : this.cursor;
      for (let cursor = this.pub_from;cursor < limit; cursor += 2) {
        const pub = this.data[cursor];
        if (pub?.incompleted)
          return;
      }
      for (let cursor = this.pub_from;cursor < limit; cursor += 2) {
        const pub = this.data[cursor];
        pub?.complete();
      }
    }
    absorb(quant = $mol_wire_cursor.stale, pos = -1) {
      if (this.cursor === $mol_wire_cursor.final)
        return;
      if (this.cursor >= quant)
        return;
      this.cursor = quant;
      this.emit($mol_wire_cursor.doubt);
    }
    [$mol_dev_format_head]() {
      return $mol_dev_format_native(this);
    }
    get pub_empty() {
      return this.sub_from === this.pub_from;
    }
  }
  $2.$mol_wire_pub_sub = $mol_wire_pub_sub2;
})($ || ($ = {}));
var $;
(function($2) {
  $2.$mol_ambient_ref = Symbol("$mol_ambient_ref");
  function $mol_ambient(overrides) {
    return Object.setPrototypeOf(overrides, this || $2);
  }
  $2.$mol_ambient = $mol_ambient;
})($ || ($ = {}));
var $;
(function($2) {
  const instances = new WeakSet;
  function $mol_delegate2(proto, target) {
    const proxy = new Proxy(proto, {
      get: (_, field) => {
        const obj = target();
        let val = Reflect.get(obj, field);
        if (typeof val === "function") {
          val = val.bind(obj);
        }
        return val;
      },
      has: (_, field) => Reflect.has(target(), field),
      set: (_, field, value) => Reflect.set(target(), field, value),
      getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
      ownKeys: () => Reflect.ownKeys(target()),
      getPrototypeOf: () => Reflect.getPrototypeOf(target()),
      setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
      isExtensible: () => Reflect.isExtensible(target()),
      preventExtensions: () => Reflect.preventExtensions(target()),
      apply: (_, self2, args) => Reflect.apply(target(), self2, args),
      construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
      defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
      deleteProperty: (_, field) => Reflect.deleteProperty(target(), field)
    });
    instances.add(proxy);
    return proxy;
  }
  $2.$mol_delegate = $mol_delegate2;
  Reflect.defineProperty($mol_delegate2, Symbol.hasInstance, {
    value: (obj) => instances.has(obj)
  });
})($ || ($ = {}));
var $;
(function($2) {
  $2.$mol_owning_map = new WeakMap;
  function $mol_owning_allow(having) {
    try {
      if (!having)
        return false;
      if (typeof having !== "object" && typeof having !== "function")
        return false;
      if (having instanceof $mol_delegate)
        return false;
      if (typeof having["destructor"] !== "function")
        return false;
      return true;
    } catch {
      return false;
    }
  }
  $2.$mol_owning_allow = $mol_owning_allow;
  function $mol_owning_get2(having, Owner) {
    if (!$mol_owning_allow(having))
      return null;
    while (true) {
      const owner = $2.$mol_owning_map.get(having);
      if (!owner)
        return owner;
      if (!Owner)
        return owner;
      if (owner instanceof Owner)
        return owner;
      having = owner;
    }
  }
  $2.$mol_owning_get = $mol_owning_get2;
  function $mol_owning_check2(owner, having) {
    if (!$mol_owning_allow(having))
      return false;
    if ($2.$mol_owning_map.get(having) !== owner)
      return false;
    return true;
  }
  $2.$mol_owning_check = $mol_owning_check2;
  function $mol_owning_catch2(owner, having) {
    if (!$mol_owning_allow(having))
      return false;
    if ($2.$mol_owning_map.get(having))
      return false;
    $2.$mol_owning_map.set(having, owner);
    return true;
  }
  $2.$mol_owning_catch = $mol_owning_catch2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_fail_hidden2(error) {
    throw error;
  }
  $2.$mol_fail_hidden = $mol_fail_hidden2;
})($ || ($ = {}));
var $;
(function($2) {
  const named = new WeakSet;
  function $mol_func_name(func) {
    let name = func.name;
    if (name?.length > 1)
      return name;
    if (named.has(func))
      return name;
    for (let key in this) {
      try {
        if (this[key] !== func)
          continue;
        name = key;
        Object.defineProperty(func, "name", { value: name });
        break;
      } catch {}
    }
    named.add(func);
    return name;
  }
  $2.$mol_func_name = $mol_func_name;
  function $mol_func_name_from2(target, source) {
    Object.defineProperty(target, "name", { value: source.name });
    return target;
  }
  $2.$mol_func_name_from = $mol_func_name_from2;
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_object22 {
    static $ = $2;
    [Symbol.toStringTag];
    [$mol_ambient_ref] = null;
    get $() {
      if (this[$mol_ambient_ref])
        return this[$mol_ambient_ref];
      const owner = $mol_owning_get(this);
      return this[$mol_ambient_ref] = owner?.$ || $mol_object22.$;
    }
    set $(next) {
      if (this[$mol_ambient_ref])
        $mol_fail_hidden(new Error("Context already defined"));
      this[$mol_ambient_ref] = next;
    }
    static create(init) {
      const obj = new this;
      if (init)
        init(obj);
      return obj;
    }
    static [Symbol.toPrimitive]() {
      return this.toString();
    }
    static toString() {
      return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
    }
    static toJSON() {
      return this.toString();
    }
    destructor() {}
    static destructor() {}
    toString() {
      return this[Symbol.toStringTag] || this.constructor.name + "<>";
    }
  }
  $2.$mol_object2 = $mol_object22;
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_after_tick2 extends $mol_object2 {
    task;
    static promise = null;
    cancelled = false;
    constructor(task) {
      super();
      this.task = task;
      if (!$mol_after_tick2.promise)
        $mol_after_tick2.promise = Promise.resolve().then(() => {
          $mol_after_tick2.promise = null;
        });
      $mol_after_tick2.promise.then(() => {
        if (this.cancelled)
          return;
        task();
      });
    }
    destructor() {
      this.cancelled = true;
    }
  }
  $2.$mol_after_tick = $mol_after_tick2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_promise_like2(val) {
    try {
      return val && typeof val === "object" && "then" in val && typeof val.then === "function";
    } catch {
      return false;
    }
  }
  $2.$mol_promise_like = $mol_promise_like2;
})($ || ($ = {}));
var $;
(function($2) {
  const wrappers = new WeakMap;

  class $mol_wire_fiber2 extends $mol_wire_pub_sub {
    task;
    host;
    static warm = true;
    static planning = new Set;
    static reaping = new Set;
    static plan_task = null;
    static plan() {
      if (this.plan_task)
        return;
      this.plan_task = new $mol_after_tick(() => {
        try {
          this.sync();
        } finally {
          $mol_wire_fiber2.plan_task = null;
        }
      });
    }
    static sync() {
      while (this.planning.size) {
        for (const fiber of this.planning) {
          this.planning.delete(fiber);
          if (fiber.cursor >= 0)
            continue;
          if (fiber.cursor === $mol_wire_cursor.final)
            continue;
          fiber.fresh();
        }
      }
      while (this.reaping.size) {
        const fibers = this.reaping;
        this.reaping = new Set;
        for (const fiber of fibers) {
          if (!fiber.sub_empty)
            continue;
          fiber.destructor();
        }
      }
    }
    cache = undefined;
    get args() {
      return this.data.slice(0, this.pub_from);
    }
    result() {
      if ($mol_promise_like(this.cache))
        return;
      if (this.cache instanceof Error)
        return;
      return this.cache;
    }
    get incompleted() {
      return $mol_promise_like(this.cache);
    }
    field() {
      return this.task.name + "()";
    }
    constructor(id, task, host, args) {
      super(id);
      this.task = task;
      this.host = host;
      if (args)
        this.data.push(...args);
      this.pub_from = this.sub_from = args?.length ?? 0;
    }
    plan() {
      $mol_wire_fiber2.planning.add(this);
      $mol_wire_fiber2.plan();
      return this;
    }
    reap() {
      $mol_wire_fiber2.reaping.add(this);
      $mol_wire_fiber2.plan();
    }
    toString() {
      return this[Symbol.toStringTag];
    }
    toJSON() {
      return this[Symbol.toStringTag];
    }
    [$mol_dev_format_head]() {
      const cursor = {
        [$mol_wire_cursor.stale]: "\uD83D\uDD34",
        [$mol_wire_cursor.doubt]: "\uD83D\uDFE1",
        [$mol_wire_cursor.fresh]: "\uD83D\uDFE2",
        [$mol_wire_cursor.final]: "\uD83D\uDD35"
      }[this.cursor] ?? this.cursor.toString();
      return $mol_dev_format_div({}, $mol_owning_check(this, this.cache) ? $mol_dev_format_auto({
        [$mol_dev_format_head]: () => $mol_dev_format_shade(cursor),
        [$mol_dev_format_body]: () => $mol_dev_format_native(this)
      }) : $mol_dev_format_shade($mol_dev_format_native(this), cursor), $mol_dev_format_auto(this.cache));
    }
    get $() {
      return (this.host ?? this.task)["$"];
    }
    emit(quant = $mol_wire_cursor.stale) {
      if (this.sub_empty)
        this.plan();
      else
        super.emit(quant);
    }
    fresh() {
      if (this.cursor === $mol_wire_cursor.fresh)
        return;
      if (this.cursor === $mol_wire_cursor.final)
        return;
      check:
        if (this.cursor === $mol_wire_cursor.doubt) {
          for (let i = this.pub_from;i < this.sub_from; i += 2) {
            this.data[i]?.fresh();
            if (this.cursor !== $mol_wire_cursor.doubt)
              break check;
          }
          this.cursor = $mol_wire_cursor.fresh;
          return;
        }
      const bu = this.track_on();
      let result;
      try {
        switch (this.pub_from) {
          case 0:
            result = this.task.call(this.host);
            break;
          case 1:
            result = this.task.call(this.host, this.data[0]);
            break;
          default:
            result = this.task.call(this.host, ...this.args);
            break;
        }
        if ($mol_promise_like(result)) {
          if (wrappers.has(result)) {
            result = wrappers.get(result).then((a) => a);
          } else {
            const put = (res) => {
              if (this.cache === result)
                this.put(res);
              return res;
            };
            wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => {}) }));
            wrappers.set(result, result);
            const error = new Error(`Promise in ${this}`);
            Object.defineProperty(result, "stack", { get: () => error.stack });
          }
        }
      } catch (error) {
        if (error instanceof Error || $mol_promise_like(error)) {
          result = error;
        } else {
          result = new Error(String(error), { cause: error });
        }
        if ($mol_promise_like(result)) {
          if (wrappers.has(result)) {
            result = wrappers.get(result);
          } else {
            wrappers.set(result, result = Object.assign(result.finally(() => {
              if (this.cache === result)
                this.absorb();
            }), { destructor: result.destructor || (() => {}) }));
            const error2 = new Error(`Promise in ${this}`);
            Object.defineProperty(result, "stack", { get: () => error2.stack });
          }
        }
      }
      if (!$mol_promise_like(result)) {
        this.track_cut();
      }
      this.track_off(bu);
      this.put(result);
      return this;
    }
    refresh() {
      this.cursor = $mol_wire_cursor.stale;
      this.fresh();
    }
    sync() {
      if (!$mol_wire_fiber2.warm) {
        return this.result();
      }
      this.promote();
      this.fresh();
      if (this.cache instanceof Error) {
        return $mol_fail_hidden(this.cache);
      }
      if ($mol_promise_like(this.cache)) {
        return $mol_fail_hidden(this.cache);
      }
      return this.cache;
    }
    async async_raw() {
      while (true) {
        this.fresh();
        if (this.cache instanceof Error) {
          $mol_fail_hidden(this.cache);
        }
        if (!$mol_promise_like(this.cache))
          return this.cache;
        await Promise.race([this.cache, this.step()]);
        if (!$mol_promise_like(this.cache))
          return this.cache;
        if (this.cursor === $mol_wire_cursor.final) {
          await new Promise(() => {});
        }
      }
    }
    async() {
      const promise = this.async_raw();
      if (!promise.destructor)
        promise.destructor = () => this.destructor();
      return promise;
    }
    step() {
      return new Promise((done) => {
        const sub = new $mol_wire_pub_sub;
        const prev = sub.track_on();
        sub.track_next(this);
        sub.track_off(prev);
        sub.absorb = () => {
          done(null);
          setTimeout(() => sub.destructor());
        };
      });
    }
    destructor() {
      super.destructor();
      if (!$mol_owning_check(this, this.cache))
        return;
      try {
        this.cache.destructor();
      } catch (result) {
        if ($mol_promise_like(result)) {
          const error = new Error(`Promise in ${this}.destructor()`);
          Object.defineProperty(result, "stack", { get: () => error.stack });
        }
        $mol_fail_hidden(result);
      }
    }
  }
  $2.$mol_wire_fiber = $mol_wire_fiber2;
})($ || ($ = {}));
var $;
(function($2) {
  $2.$mol_compare_deep_cache = new WeakMap;
  function $mol_compare_deep2(left, right) {
    if (Object.is(left, right))
      return true;
    if (left === null)
      return false;
    if (right === null)
      return false;
    if (typeof left !== "object")
      return false;
    if (typeof right !== "object")
      return false;
    const left_proto = Reflect.getPrototypeOf(left);
    const right_proto = Reflect.getPrototypeOf(right);
    if (left_proto !== right_proto)
      return false;
    if (left instanceof Boolean)
      return Object.is(left.valueOf(), right["valueOf"]());
    if (left instanceof Number)
      return Object.is(left.valueOf(), right["valueOf"]());
    if (left instanceof String)
      return Object.is(left.valueOf(), right["valueOf"]());
    if (left instanceof Date)
      return Object.is(left.valueOf(), right["valueOf"]());
    if (left instanceof RegExp)
      return left.source === right.source && left.flags === right.flags;
    if (left instanceof Error)
      return left.message === right.message && left.stack === right.stack;
    let left_cache = $2.$mol_compare_deep_cache.get(left);
    if (left_cache) {
      const right_cache = left_cache.get(right);
      if (typeof right_cache === "boolean")
        return right_cache;
    } else {
      left_cache = new WeakMap;
      $2.$mol_compare_deep_cache.set(left, left_cache);
    }
    left_cache.set(right, true);
    let result;
    try {
      if (!left_proto)
        result = compare_pojo(left, right);
      else if (!Reflect.getPrototypeOf(left_proto))
        result = compare_pojo(left, right);
      else if (Symbol.toPrimitive in left)
        result = compare_primitive(left, right);
      else if (Array.isArray(left))
        result = compare_array(left, right);
      else if (left instanceof Set)
        result = compare_set(left, right);
      else if (left instanceof Map)
        result = compare_map(left, right);
      else if (ArrayBuffer.isView(left))
        result = compare_buffer(left, right);
      else if (Symbol.iterator in left)
        result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
      else
        result = false;
    } finally {
      left_cache.set(right, result);
    }
    return result;
  }
  $2.$mol_compare_deep = $mol_compare_deep2;
  function compare_array(left, right) {
    const len = left.length;
    if (len !== right.length)
      return false;
    for (let i = 0;i < len; ++i) {
      if (!$mol_compare_deep2(left[i], right[i]))
        return false;
    }
    return true;
  }
  function compare_buffer(left, right) {
    const len = left.byteLength;
    if (len !== right.byteLength)
      return false;
    if (left instanceof DataView)
      return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
    for (let i = 0;i < len; ++i) {
      if (left[i] !== right[i])
        return false;
    }
    return true;
  }
  function compare_iterator(left, right) {
    while (true) {
      const left_next = left.next();
      const right_next = right.next();
      if (left_next.done !== right_next.done)
        return false;
      if (left_next.done)
        break;
      if (!$mol_compare_deep2(left_next.value, right_next.value))
        return false;
    }
    return true;
  }
  function compare_set(left, right) {
    if (left.size !== right.size)
      return false;
    return compare_iterator(left.values(), right.values());
  }
  function compare_map(left, right) {
    if (left.size !== right.size)
      return false;
    return compare_iterator(left.keys(), right.keys()) && compare_iterator(left.values(), right.values());
  }
  function compare_pojo(left, right) {
    const left_keys = Object.getOwnPropertyNames(left);
    const right_keys = Object.getOwnPropertyNames(right);
    if (!compare_array(left_keys, right_keys))
      return false;
    for (let key of left_keys) {
      if (!$mol_compare_deep2(left[key], right[key]))
        return false;
    }
    const left_syms = Object.getOwnPropertySymbols(left);
    const right_syms = Object.getOwnPropertySymbols(right);
    if (!compare_array(left_syms, right_syms))
      return false;
    for (let key of left_syms) {
      if (!$mol_compare_deep2(left[key], right[key]))
        return false;
    }
    return true;
  }
  function compare_primitive(left, right) {
    return Object.is(left[Symbol.toPrimitive]("default"), right[Symbol.toPrimitive]("default"));
  }
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_log3_area_lazy(event) {
    const self2 = this;
    const stack = self2.$mol_log3_stack;
    const deep = stack.length;
    let logged = false;
    stack.push(() => {
      logged = true;
      self2.$mol_log3_area.call(self2, event);
    });
    return () => {
      if (logged)
        self2.console.groupEnd();
      if (stack.length > deep)
        stack.length = deep;
    };
  }
  $2.$mol_log3_area_lazy = $mol_log3_area_lazy;
  $2.$mol_log3_stack = [];
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_log3_web_make(level, color) {
    return function $mol_log3_logger(event) {
      const pending = this.$mol_log3_stack.pop();
      if (pending)
        pending();
      let tpl = "%c";
      const chunks = Object.entries(event);
      for (let i = 0;i < chunks.length; ++i) {
        tpl += typeof chunks[i][1] === "string" ? `%s: %s
` : `%s: %o
`;
      }
      const style = `color:${color};font-weight:bolder`;
      this.console[level](tpl.trim(), style, ...[].concat(...chunks));
      const self2 = this;
      return () => self2.console.groupEnd();
    };
  }
  $2.$mol_log3_web_make = $mol_log3_web_make;
  $2.$mol_log3_come = $mol_log3_web_make("info", "royalblue");
  $2.$mol_log3_done = $mol_log3_web_make("info", "forestgreen");
  $2.$mol_log3_fail = $mol_log3_web_make("error", "orangered");
  $2.$mol_log3_warn = $mol_log3_web_make("warn", "goldenrod");
  $2.$mol_log3_rise = $mol_log3_web_make("log", "magenta");
  $2.$mol_log3_area = $mol_log3_web_make("group", "cyan");
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_wire_task2 extends $mol_wire_fiber {
    static getter(task) {
      return function $mol_wire_task_get(host, args) {
        const sub = $mol_wire_auto();
        const existen = sub?.track_next();
        reuse:
          if (existen) {
            if (!existen.temp)
              break reuse;
            if (existen.host !== host)
              break reuse;
            if (existen.task !== task)
              break reuse;
            if (!$mol_compare_deep(existen.args, args))
              break reuse;
            return existen;
          }
        const key = (host?.[Symbol.toStringTag] ?? host) + ("." + task.name + "<#>");
        const next = new $mol_wire_task2(key, task, host, args);
        if (existen?.temp) {
          $$.$mol_log3_warn({
            place: "$mol_wire_task",
            message: `Non idempotency`,
            sub,
            pubs: [...sub?.pub_list ?? [], existen],
            next,
            hint: "Ignore it"
          });
        }
        return next;
      };
    }
    get temp() {
      return true;
    }
    complete() {
      if ($mol_promise_like(this.cache))
        return;
      this.destructor();
    }
    put(next) {
      const prev = this.cache;
      this.cache = next;
      if ($mol_promise_like(next)) {
        this.cursor = $mol_wire_cursor.fresh;
        if (next !== prev)
          this.emit();
        if ($mol_owning_catch(this, next)) {
          try {
            next[Symbol.toStringTag] = this[Symbol.toStringTag];
          } catch {
            Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
          }
        }
        return next;
      }
      this.cursor = $mol_wire_cursor.final;
      if (this.sub_empty)
        this.destructor();
      else if (next !== prev)
        this.emit();
      return next;
    }
  }
  $2.$mol_wire_task = $mol_wire_task2;
})($ || ($ = {}));
var $;
(function($2) {
  $2.$mol_key_store = new WeakMap;
  const TypedArray = Object.getPrototypeOf(Uint8Array);
  function $mol_key2(value) {
    if (typeof value === "bigint")
      return value.toString() + "n";
    if (typeof value === "symbol")
      return value.description;
    if (!value)
      return JSON.stringify(value);
    if (typeof value !== "object" && typeof value !== "function")
      return JSON.stringify(value);
    return JSON.stringify(value, (field, value2) => {
      if (typeof value2 === "bigint")
        return value2.toString() + "n";
      if (typeof value2 === "symbol")
        return value2.description;
      if (!value2)
        return value2;
      if (typeof value2 !== "object" && typeof value2 !== "function")
        return value2;
      if (Array.isArray(value2))
        return value2;
      const proto = Reflect.getPrototypeOf(value2);
      if (!proto)
        return value2;
      if (Reflect.getPrototypeOf(proto) === null)
        return value2;
      if ("toJSON" in value2)
        return value2;
      if (value2 instanceof RegExp)
        return value2.toString();
      if (value2 instanceof TypedArray)
        return [...value2];
      let key = $2.$mol_key_store.get(value2);
      if (key)
        return key;
      key = $mol_guid();
      $2.$mol_key_store.set(value2, key);
      return key;
    });
  }
  $2.$mol_key = $mol_key2;
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_after_frame2 extends $mol_object2 {
    task;
    static _promise = null;
    static get promise() {
      if (this._promise)
        return this._promise;
      return this._promise = new Promise((done) => {
        const complete = () => {
          this._promise = null;
          done();
        };
        if (typeof requestAnimationFrame === "function") {
          requestAnimationFrame(complete);
        } else {
          setTimeout(complete, 16);
        }
      });
    }
    cancelled = false;
    promise;
    constructor(task) {
      super();
      this.task = task;
      this.promise = $mol_after_frame2.promise.then(() => {
        if (this.cancelled)
          return;
        task();
      });
    }
    destructor() {
      this.cancelled = true;
    }
  }
  $2.$mol_after_frame = $mol_after_frame2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_method2(host, field, descr) {
    if (!descr)
      descr = Reflect.getOwnPropertyDescriptor(host, field);
    const orig = descr?.value ?? host[field];
    const sup = Reflect.getPrototypeOf(host);
    if (typeof sup[field] === "function") {
      Object.defineProperty(orig, "name", { value: sup[field].name });
    }
    const temp = $mol_wire_task.getter(orig);
    const value = function(...args) {
      const fiber = temp(this ?? null, args);
      return fiber.sync();
    };
    Object.defineProperty(value, "name", { value: orig.name + " " });
    Object.assign(value, { orig });
    const descr2 = { ...descr, value };
    Reflect.defineProperty(host, field, descr2);
    return descr2;
  }
  $2.$mol_wire_method = $mol_wire_method2;
})($ || ($ = {}));
var $;
(function($2) {
  const catched = new WeakMap;
  function $mol_fail_catch2(error) {
    if (typeof error !== "object")
      return false;
    if ($mol_promise_like(error))
      $mol_fail_hidden(error);
    if (catched.get(error))
      return false;
    catched.set(error, true);
    return true;
  }
  $2.$mol_fail_catch = $mol_fail_catch2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_fail_log2(error) {
    if ($mol_promise_like(error))
      return false;
    if (!$mol_fail_catch(error))
      return false;
    console.error(error);
    return true;
  }
  $2.$mol_fail_log = $mol_fail_log2;
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_wire_atom2 extends $mol_wire_fiber {
    static solo(host, task) {
      const field = task.name + "()";
      const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
      if (existen)
        return existen;
      const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
      const key = prefix + ("." + task.name + "<>");
      const fiber = new $mol_wire_atom2(key, task, host, []);
      (host ?? task)[field] = fiber;
      return fiber;
    }
    static plex(host, task, key) {
      const field = task.name + "()";
      let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
      const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
      const key_str = $mol_key(key);
      if (dict) {
        const existen = dict.get(key_str);
        if (existen)
          return existen;
      } else {
        dict = (host ?? task)[field] = new Map;
      }
      const id = prefix + ("." + task.name) + ("<" + key_str.replace(/^"|"$/g, "'") + ">");
      const fiber = new $mol_wire_atom2(id, task, host, [key]);
      dict.set(key_str, fiber);
      return fiber;
    }
    static watching = new Set;
    static watcher = null;
    static watch() {
      $mol_wire_atom2.watcher = new $mol_after_frame($mol_wire_atom2.watch);
      for (const atom of $mol_wire_atom2.watching) {
        if (atom.cursor === $mol_wire_cursor.final) {
          $mol_wire_atom2.watching.delete(atom);
        } else {
          atom.cursor = $mol_wire_cursor.stale;
          atom.fresh();
        }
      }
    }
    watch() {
      if (!$mol_wire_atom2.watcher) {
        $mol_wire_atom2.watcher = new $mol_after_frame($mol_wire_atom2.watch);
      }
      $mol_wire_atom2.watching.add(this);
    }
    resync(args) {
      return this.put(this.task.call(this.host, ...args));
    }
    once() {
      return this.sync();
    }
    channel() {
      return Object.assign((next) => {
        if (next !== undefined)
          return this.resync([...this.args, next]);
        if (!$mol_wire_fiber.warm)
          return this.result();
        if ($mol_wire_auto()?.temp) {
          return this.once();
        } else {
          return this.sync();
        }
      }, { atom: this });
    }
    destructor() {
      super.destructor();
      if (this.pub_from === 0) {
        (this.host ?? this.task)[this.field()] = null;
      } else {
        (this.host ?? this.task)[this.field()].delete($mol_key(this.args[0]));
      }
    }
    put(next) {
      const prev = this.cache;
      update:
        if (next !== prev) {
          try {
            if ($mol_compare_deep(prev, next))
              break update;
          } catch (error) {
            $mol_fail_log(error);
          }
          if ($mol_owning_check(this, prev)) {
            prev.destructor();
          }
          if ($mol_owning_catch(this, next)) {
            try {
              next[Symbol.toStringTag] = this[Symbol.toStringTag];
            } catch {
              Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
            }
          }
          if (!this.sub_empty)
            this.emit();
        }
      this.cache = next;
      this.cursor = $mol_wire_cursor.fresh;
      if ($mol_promise_like(next))
        return next;
      this.complete_pubs();
      return next;
    }
  }
  __decorate([
    $mol_wire_method
  ], $mol_wire_atom2.prototype, "resync", null);
  __decorate([
    $mol_wire_method
  ], $mol_wire_atom2.prototype, "once", null);
  $2.$mol_wire_atom = $mol_wire_atom2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_probe2(task, def) {
    const warm = $mol_wire_fiber.warm;
    try {
      $mol_wire_fiber.warm = false;
      const res = task();
      if (res === undefined)
        return def;
      return res;
    } finally {
      $mol_wire_fiber.warm = warm;
    }
  }
  $2.$mol_wire_probe = $mol_wire_probe2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_solid() {
    let current = $mol_wire_auto();
    if (current.temp)
      current = current.host;
    if (current.reap !== nothing) {
      current?.sub_on(sub, sub.data.length);
    }
    current.reap = nothing;
  }
  $2.$mol_wire_solid = $mol_wire_solid;
  const nothing = () => {};
  const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_watch() {
    const atom = $mol_wire_auto();
    if (atom instanceof $mol_wire_atom) {
      atom.watch();
    } else {
      $mol_fail(new Error("Atom is required for watching"));
    }
  }
  $2.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));
var $;
(function($2) {
  const factories = new WeakMap;
  function factory(val) {
    let make = factories.get(val);
    if (make)
      return make;
    make = $mol_func_name_from((...args) => new val(...args), val);
    factories.set(val, make);
    return make;
  }
  const getters = new WeakMap;
  function get_prop(host, field) {
    let props = getters.get(host);
    let get_val = props?.[field];
    if (get_val)
      return get_val;
    get_val = (next) => {
      if (next !== undefined)
        host[field] = next;
      return host[field];
    };
    Object.defineProperty(get_val, "name", { value: field });
    if (!props) {
      props = {};
      getters.set(host, props);
    }
    props[field] = get_val;
    return get_val;
  }
  function $mol_wire_sync(obj) {
    return new Proxy(obj, {
      get(obj2, field) {
        let val = obj2[field];
        const temp = $mol_wire_task.getter(typeof val === "function" ? val : get_prop(obj2, field));
        if (typeof val !== "function")
          return temp(obj2, []).sync();
        return function $mol_wire_sync(...args) {
          const fiber = temp(obj2, args);
          return fiber.sync();
        };
      },
      set(obj2, field, next) {
        const temp = $mol_wire_task.getter(get_prop(obj2, field));
        temp(obj2, [next]).sync();
        return true;
      },
      construct(obj2, args) {
        const temp = $mol_wire_task.getter(factory(obj2));
        return temp(obj2, args).sync();
      },
      apply(obj2, self2, args) {
        const temp = $mol_wire_task.getter(obj2);
        return temp(self2, args).sync();
      }
    });
  }
  $2.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_async(obj) {
    let fiber;
    const temp = $mol_wire_task.getter(obj);
    return new Proxy(obj, {
      get(obj2, field) {
        const val = obj2[field];
        if (typeof val !== "function")
          return val;
        let fiber2;
        const temp2 = $mol_wire_task.getter(val);
        return function $mol_wire_async(...args) {
          fiber2?.destructor();
          fiber2 = temp2(obj2, args);
          return fiber2.async();
        };
      },
      apply(obj2, self2, args) {
        fiber?.destructor();
        fiber = temp(self2, args);
        return fiber.async();
      }
    });
  }
  $2.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_race(...tasks) {
    const results = tasks.map((task) => {
      try {
        return task();
      } catch (error2) {
        return error2;
      }
    });
    const promises = results.filter((res) => $mol_promise_like(res));
    if (promises.length)
      $mol_fail(Promise.race(promises));
    const error = results.find((res) => res instanceof Error);
    if (error)
      $mol_fail(error);
    return results;
  }
  $2.$mol_wire_race = $mol_wire_race;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_solo2(host, field, descr) {
    if (!descr)
      descr = Reflect.getOwnPropertyDescriptor(host, field);
    const orig = descr?.value ?? host[field];
    const sup = Reflect.getPrototypeOf(host);
    if (typeof sup[field] === "function") {
      Object.defineProperty(orig, "name", { value: sup[field].name });
    }
    const descr2 = {
      ...descr,
      value: function(...args) {
        let atom = $mol_wire_atom.solo(this, orig);
        if (args.length === 0 || args[0] === undefined) {
          if (!$mol_wire_fiber.warm)
            return atom.result();
          if ($mol_wire_auto()?.temp) {
            return atom.once();
          } else {
            return atom.sync();
          }
        }
        return atom.resync(args);
      }
    };
    Reflect.defineProperty(descr2.value, "name", { value: orig.name + " " });
    Reflect.defineProperty(descr2.value, "length", { value: orig.length });
    Object.assign(descr2.value, { orig });
    Reflect.defineProperty(host, field, descr2);
    return descr2;
  }
  $2.$mol_wire_solo = $mol_wire_solo2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_plex2(host, field, descr) {
    if (!descr)
      descr = Reflect.getOwnPropertyDescriptor(host, field);
    const orig = descr?.value ?? host[field];
    const sup = Reflect.getPrototypeOf(host);
    if (typeof sup[field] === "function") {
      Object.defineProperty(orig, "name", { value: sup[field].name });
    }
    const descr2 = {
      ...descr,
      value: function(...args) {
        let atom = $mol_wire_atom.plex(this, orig, args[0]);
        if (args.length === 1 || args[1] === undefined) {
          if (!$mol_wire_fiber.warm)
            return atom.result();
          if ($mol_wire_auto()?.temp) {
            return atom.once();
          } else {
            return atom.sync();
          }
        }
        return atom.resync(args);
      }
    };
    Reflect.defineProperty(descr2.value, "name", { value: orig.name + " " });
    Reflect.defineProperty(descr2.value, "length", { value: orig.length });
    Object.assign(descr2.value, { orig });
    Reflect.defineProperty(host, field, descr2);
    return descr2;
  }
  $2.$mol_wire_plex = $mol_wire_plex2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_const2(value) {
    const getter = () => value;
    getter["()"] = value;
    getter[Symbol.toStringTag] = value;
    getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, "()=> ", $mol_dev_format_auto(value));
    return getter;
  }
  $2.$mol_const = $mol_const2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_field(host, field, descr) {
    if (!descr)
      descr = Reflect.getOwnPropertyDescriptor(host, field);
    const _get = descr?.get || $mol_const(descr?.value);
    const _set = descr?.set || function(next) {
      $mol_wire_atom.solo(this, _get).put(next);
    };
    const sup = Reflect.getPrototypeOf(host);
    const sup_descr = Reflect.getOwnPropertyDescriptor(sup, field);
    Object.defineProperty(_get, "name", { value: sup_descr?.get?.name ?? field });
    Object.defineProperty(_set, "name", { value: sup_descr?.set?.name ?? field });
    function get() {
      return $mol_wire_atom.solo(this, _get).sync();
    }
    const temp = $mol_wire_task.getter(_set);
    function set(next) {
      temp(this, [next]).sync();
    }
    Object.defineProperty(get, "name", { value: _get.name + "$" });
    Object.defineProperty(set, "name", { value: _set.name + "@" });
    Object.assign(get, { orig: _get });
    Object.assign(set, { orig: _set });
    const { value, writable, ...descr2 } = { ...descr, get, set };
    Reflect.defineProperty(host, field, descr2);
    return descr2;
  }
  $2.$mol_wire_field = $mol_wire_field;
})($ || ($ = {}));
var $;
(function($_1) {
  let $$2;
  (function($$3) {
    let $2;
  })($$2 = $_1.$$ || ($_1.$$ = {}));
  $_1.$mol_object_field = Symbol("$mol_object_field");

  class $mol_object3 extends $mol_object2 {
    static make(config) {
      return super.create((obj) => {
        for (let key in config)
          obj[key] = config[key];
      });
    }
  }
  $_1.$mol_object = $mol_object3;
})($ || ($ = {}));
var $;
(function($2) {
  $2.$mol_mem = $mol_wire_solo;
  $2.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_after_timeout2 extends $mol_object2 {
    delay;
    task;
    id;
    constructor(delay, task) {
      super();
      this.delay = delay;
      this.task = task;
      this.id = setTimeout(task, delay);
    }
    destructor() {
      clearTimeout(this.id);
    }
  }
  $2.$mol_after_timeout = $mol_after_timeout2;
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_state_time2 extends $mol_object {
    static task(precision, reset) {
      if (precision) {
        return new $mol_after_timeout(precision, () => this.task(precision, null));
      } else {
        return new $mol_after_frame(() => this.task(precision, null));
      }
    }
    static now(precision) {
      this.task(precision);
      return Date.now();
    }
  }
  __decorate([
    $mol_mem_key
  ], $mol_state_time2, "task", null);
  __decorate([
    $mol_mem_key
  ], $mol_state_time2, "now", null);
  $2.$mol_state_time = $mol_state_time2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_easing(next) {
    const atom = $mol_wire_auto();
    if (!(atom instanceof $mol_wire_atom))
      $mol_fail(new Error("Allowed only inside atom"));
    const prev = atom.result() ?? next;
    if (typeof prev !== "number")
      return next;
    const current = (prev * 2 + next) / 3;
    const diff = Math.abs(current - next);
    if (diff < 1)
      return next;
    $mol_state_time.now(0);
    return current;
  }
  $2.$mol_wire_easing = $mol_wire_easing;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_patch(obj) {
    for (const field of Reflect.ownKeys(obj)) {
      const descr = Reflect.getOwnPropertyDescriptor(obj, field);
      if (!descr.configurable)
        continue;
      if (!descr.get)
        continue;
      const get = descr.get ?? (() => descr.value);
      const set = descr.set ?? ((next) => descr.value = next);
      Reflect.defineProperty(obj, field, {
        configurable: true,
        enumerable: descr.enumerable,
        get() {
          const atom = $mol_wire_atom.solo(obj, get);
          atom.watch();
          return atom.sync();
        },
        set(next) {
          const atom = $mol_wire_atom.solo(obj, get);
          set.call(this, next);
          atom.refresh();
        }
      });
    }
  }
  $2.$mol_wire_patch = $mol_wire_patch;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wire_let(host) {
    for (const field of Object.keys(host)) {
      host[field] = new $mol_wire_atom(field, host[field], host).channel();
    }
    return host;
  }
  $2.$mol_wire_let = $mol_wire_let;
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_wire_set extends Set {
    pub = new $mol_wire_pub;
    has(value) {
      this.pub.promote();
      return super.has(value);
    }
    entries() {
      this.pub.promote();
      return super.entries();
    }
    keys() {
      this.pub.promote();
      return super.keys();
    }
    values() {
      this.pub.promote();
      return super.values();
    }
    forEach(task, self2) {
      this.pub.promote();
      super.forEach(task, self2);
    }
    [Symbol.iterator]() {
      this.pub.promote();
      return super[Symbol.iterator]();
    }
    get size() {
      this.pub.promote();
      return super.size;
    }
    add(value) {
      if (super.has(value))
        return this;
      super.add(value);
      this.pub.emit();
      return this;
    }
    delete(value) {
      const res = super.delete(value);
      if (res)
        this.pub.emit();
      return res;
    }
    clear() {
      if (!super.size)
        return;
      super.clear();
      this.pub.emit();
    }
    item(val, next) {
      if (next === undefined)
        return this.has(val);
      if (next)
        this.add(val);
      else
        this.delete(val);
      return next;
    }
  }
  $2.$mol_wire_set = $mol_wire_set;
})($ || ($ = {}));
var $;
(function($2) {
  const pubs = new WeakMap;
  function $mol_wire_proxy_pub(id, target) {
    let pub = pubs.get(target);
    if (!pub)
      pubs.set(target, pub = new $mol_wire_pub(id));
    return pub;
  }
  $2.$mol_wire_proxy_pub = $mol_wire_proxy_pub;
  function $mol_wire_proxy(id, target) {
    if (!target)
      return target;
    const type = typeof target;
    if (type !== "object" && type !== "function")
      return target;
    return new Proxy(target, {
      get(target2, property) {
        $mol_wire_proxy_pub(id, target2).promote();
        const suffix = "." + (typeof property === "symbol" ? property.description : property);
        return $mol_wire_proxy(id + suffix, Reflect.get(target2, property));
      },
      getOwnPropertyDescriptor(target2, property) {
        $mol_wire_proxy_pub(id, target2).promote();
        return Reflect.getOwnPropertyDescriptor(target2, property);
      },
      ownKeys(target2) {
        $mol_wire_proxy_pub(id, target2).promote();
        return Reflect.ownKeys(target2);
      },
      has(target2, property) {
        $mol_wire_proxy_pub(id, target2).promote();
        return Reflect.has(target2, property);
      },
      getPrototypeOf(target2) {
        $mol_wire_proxy_pub(id, target2).promote();
        return $mol_wire_proxy(id, Reflect.getPrototypeOf(target2));
      },
      isExtensible(target2) {
        $mol_wire_proxy_pub(id, target2).promote();
        return Reflect.isExtensible(target2);
      },
      set(target2, property, next) {
        const pub = pubs.get(target2);
        if (pub) {
          const prev = Reflect.get(target2, property);
          if ($mol_compare_deep(prev, next))
            return true;
          pub.emit();
        }
        return Reflect.set(target2, property, next);
      },
      defineProperty(target2, property, attributes) {
        pubs.get(target2)?.emit();
        return Reflect.defineProperty(target2, property, attributes);
      },
      deleteProperty(target2, property) {
        pubs.get(target2)?.emit();
        return Reflect.deleteProperty(target2, property);
      },
      setPrototypeOf(target2, proto) {
        pubs.get(target2)?.emit();
        return Reflect.setPrototypeOf(target2, proto);
      },
      preventExtensions(target2) {
        pubs.get(target2)?.emit();
        return Reflect.preventExtensions(target2);
      }
    });
  }
  $2.$mol_wire_proxy = $mol_wire_proxy;
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_wire_dict extends Map {
    pub = new $mol_wire_pub;
    has(key) {
      this.pub.promote();
      return super.has(key);
    }
    get(key) {
      this.pub.promote();
      return super.get(key);
    }
    entries() {
      this.pub.promote();
      return super.entries();
    }
    keys() {
      this.pub.promote();
      return super.keys();
    }
    values() {
      this.pub.promote();
      return super.values();
    }
    forEach(task, self2) {
      this.pub.promote();
      super.forEach(task, self2);
    }
    [Symbol.iterator]() {
      this.pub.promote();
      return super[Symbol.iterator]();
    }
    get size() {
      this.pub.promote();
      return super.size;
    }
    set(key, value) {
      if (super.get(key) === value)
        return this;
      super.set(key, value);
      this.pub?.emit();
      return this;
    }
    delete(key) {
      const res = super.delete(key);
      if (res)
        this.pub.emit();
      return res;
    }
    clear() {
      if (!super.size)
        return;
      super.clear();
      this.pub.emit();
    }
    item(key, next) {
      if (next === undefined)
        return this.get(key) ?? null;
      if (next === null)
        this.delete(key);
      else
        this.set(key, next);
      return next;
    }
  }
  $2.$mol_wire_dict = $mol_wire_dict;
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_promise2 extends Promise {
    done;
    fail;
    constructor(executor) {
      let done;
      let fail;
      super((d, f) => {
        done = d;
        fail = f;
        executor?.(d, f);
      });
      this.done = done;
      this.fail = fail;
    }
  }
  $2.$mol_promise = $mol_promise2;
})($ || ($ = {}));
var $;
(function($2) {
  function $mol_wait_timeout_async(timeout) {
    const promise = new $mol_promise;
    const task = new this.$mol_after_timeout(timeout, () => promise.done());
    return Object.assign(promise, {
      destructor: () => task.destructor()
    });
  }
  $2.$mol_wait_timeout_async = $mol_wait_timeout_async;
  function $mol_wait_timeout(timeout) {
    return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
  }
  $2.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));
var $;
(function($2) {

  class $mol_wire_log extends $mol_object2 {
    static watch(task) {
      return task;
    }
    static track(fiber) {
      const prev = $mol_wire_probe(() => this.track(fiber));
      let next;
      try {
        next = fiber.sync();
      } finally {
        for (const pub of fiber.pub_list) {
          if (pub instanceof $mol_wire_fiber) {
            this.track(pub);
          }
        }
      }
      if (fiber.host === this)
        return next;
      if ($mol_compare_deep(prev, next)) {
        this.$.$mol_log3_rise({
          message: "\uD83D\uDCA7 Same",
          place: fiber
        });
      } else if (prev !== undefined) {
        this.$.$mol_log3_rise({
          message: "\uD83D\uDD25 Next",
          place: fiber,
          prev
        });
      }
      return next;
    }
    static active() {
      try {
        this.watch()?.();
      } catch (error) {
        $mol_fail_log(error);
      } finally {
        for (const pub of $mol_wire_auto().pub_list) {
          if (pub instanceof $mol_wire_fiber) {
            this.track(pub);
          }
        }
      }
    }
  }
  __decorate([
    $mol_mem
  ], $mol_wire_log, "watch", null);
  __decorate([
    $mol_mem_key
  ], $mol_wire_log, "track", null);
  __decorate([
    $mol_mem
  ], $mol_wire_log, "active", null);
  $2.$mol_wire_log = $mol_wire_log;
})($ || ($ = {}));
var web_default = $;

// node_modules/mol_wire_dom/web.mjs
var $node2 = $node2 || {};
(function(module) {
  var exports = module.exports = this;
  function require2(id) {
    return $node2[id.replace(/^.\//, "../")];
  }
  Error.stackTraceLimit = 50;
  var $2;
  (function($3) {})($2 || ($2 = {}));
  module.exports = $2;
  $node2["../mam.ts"] = $node2["../mam.ts"] = module.exports;
}).call({}, {});
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1;i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $2 = typeof module_web === "object" ? module_web["export" + "s"] = globalThis : globalThis;
$2.$$ = $2;
var $2;
(function($3) {
  function $mol_guid2(length = 8, exists = () => false) {
    for (;; ) {
      let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
      if (exists(id))
        continue;
      return id;
    }
  }
  $3.$mol_guid = $mol_guid2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  function $mol_fail2(error) {
    throw error;
  }
  $3.$mol_fail = $mol_fail2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  let $mol_wire_cursor2;
  (function($mol_wire_cursor3) {
    $mol_wire_cursor3[$mol_wire_cursor3["stale"] = -1] = "stale";
    $mol_wire_cursor3[$mol_wire_cursor3["doubt"] = -2] = "doubt";
    $mol_wire_cursor3[$mol_wire_cursor3["fresh"] = -3] = "fresh";
    $mol_wire_cursor3[$mol_wire_cursor3["final"] = -4] = "final";
  })($mol_wire_cursor2 = $3.$mol_wire_cursor || ($3.$mol_wire_cursor = {}));
})($2 || ($2 = {}));
var $2;
(function($3) {

  class $mol_wire_pub2 extends Object {
    constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
      super();
      this[Symbol.toStringTag] = id;
    }
    [Symbol.toStringTag];
    data = [];
    static get [Symbol.species]() {
      return Array;
    }
    sub_from = 0;
    get sub_list() {
      const res = [];
      for (let i = this.sub_from;i < this.data.length; i += 2) {
        res.push(this.data[i]);
      }
      return res;
    }
    get sub_empty() {
      return this.sub_from === this.data.length;
    }
    sub_on(sub, pub_pos) {
      const pos = this.data.length;
      this.data.push(sub, pub_pos);
      return pos;
    }
    sub_off(sub_pos) {
      if (!(sub_pos < this.data.length)) {
        $mol_fail(new Error(`Wrong pos ${sub_pos}`));
      }
      const end = this.data.length - 2;
      if (sub_pos !== end) {
        this.peer_move(end, sub_pos);
      }
      this.data.length = end;
      if (end === this.sub_from)
        this.reap();
    }
    reap() {}
    promote() {
      $mol_wire_auto()?.track_next(this);
    }
    fresh() {}
    complete() {}
    get incompleted() {
      return false;
    }
    emit(quant = $mol_wire_cursor.stale) {
      for (let i = this.sub_from;i < this.data.length; i += 2) {
        this.data[i].absorb(quant, this.data[i + 1]);
      }
    }
    peer_move(from_pos, to_pos) {
      const peer = this.data[from_pos];
      const self_pos = this.data[from_pos + 1];
      this.data[to_pos] = peer;
      this.data[to_pos + 1] = self_pos;
      peer.peer_repos(self_pos, to_pos);
    }
    peer_repos(peer_pos, self_pos) {
      this.data[peer_pos + 1] = self_pos;
    }
  }
  $3.$mol_wire_pub = $mol_wire_pub2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  $3.$mol_wire_auto_sub = null;
  function $mol_wire_auto2(next = $3.$mol_wire_auto_sub) {
    return $3.$mol_wire_auto_sub = next;
  }
  $3.$mol_wire_auto = $mol_wire_auto2;
  $3.$mol_wire_affected = [];
})($2 || ($2 = {}));
var $2;
(function($3) {
  $3["devtoolsFormatters"] ||= [];
  function $mol_dev_format_register(config) {
    $3["devtoolsFormatters"].push(config);
  }
  $3.$mol_dev_format_register = $mol_dev_format_register;
  $3.$mol_dev_format_head = Symbol("$mol_dev_format_head");
  $3.$mol_dev_format_body = Symbol("$mol_dev_format_body");
  $mol_dev_format_register({
    header: (val, config = false) => {
      if (config)
        return null;
      if (!val)
        return null;
      if ($3.$mol_dev_format_head in val) {
        try {
          return val[$3.$mol_dev_format_head]();
        } catch (error) {
          return $3.$mol_dev_format_accent($mol_dev_format_native2(val), "\uD83D\uDCA8", $mol_dev_format_native2(error), "");
        }
      }
      if (typeof val === "function") {
        return $mol_dev_format_native2(val);
      }
      if (Symbol.toStringTag in val) {
        return $mol_dev_format_native2(val);
      }
      return null;
    },
    hasBody: (val) => val[$3.$mol_dev_format_body],
    body: (val) => val[$3.$mol_dev_format_body]()
  });
  function $mol_dev_format_native2(obj) {
    if (typeof obj === "undefined")
      return $3.$mol_dev_format_shade("undefined");
    return [
      "object",
      {
        object: obj,
        config: true
      }
    ];
  }
  $3.$mol_dev_format_native = $mol_dev_format_native2;
  function $mol_dev_format_auto2(obj) {
    if (obj == null)
      return $3.$mol_dev_format_shade(String(obj));
    return [
      "object",
      {
        object: obj,
        config: false
      }
    ];
  }
  $3.$mol_dev_format_auto = $mol_dev_format_auto2;
  function $mol_dev_format_element(element, style, ...content) {
    const styles = [];
    for (let key in style)
      styles.push(`${key} : ${style[key]}`);
    return [
      element,
      {
        style: styles.join(" ; ")
      },
      ...content
    ];
  }
  $3.$mol_dev_format_element = $mol_dev_format_element;
  function $mol_dev_format_span2(style, ...content) {
    return $mol_dev_format_element("span", {
      ...style
    }, ...content);
  }
  $3.$mol_dev_format_span = $mol_dev_format_span2;
  $3.$mol_dev_format_div = $mol_dev_format_element.bind(null, "div");
  $3.$mol_dev_format_ol = $mol_dev_format_element.bind(null, "ol");
  $3.$mol_dev_format_li = $mol_dev_format_element.bind(null, "li");
  $3.$mol_dev_format_table = $mol_dev_format_element.bind(null, "table");
  $3.$mol_dev_format_tr = $mol_dev_format_element.bind(null, "tr");
  $3.$mol_dev_format_td = $mol_dev_format_element.bind(null, "td");
  $3.$mol_dev_format_accent = $mol_dev_format_span2.bind(null, {
    color: "magenta"
  });
  $3.$mol_dev_format_strong = $mol_dev_format_span2.bind(null, {
    "font-weight": "bold"
  });
  $3.$mol_dev_format_string = $mol_dev_format_span2.bind(null, {
    color: "green"
  });
  $3.$mol_dev_format_shade = $mol_dev_format_span2.bind(null, {
    color: "gray"
  });
  $3.$mol_dev_format_indent = $3.$mol_dev_format_div.bind(null, {
    "margin-left": "13px"
  });
})($2 || ($2 = {}));
var $2;
(function($3) {

  class $mol_wire_pub_sub2 extends $mol_wire_pub {
    pub_from = 0;
    cursor = $mol_wire_cursor.stale;
    get temp() {
      return false;
    }
    get pub_list() {
      const res = [];
      const max = this.cursor >= 0 ? this.cursor : this.sub_from;
      for (let i = this.pub_from;i < max; i += 2) {
        if (this.data[i])
          res.push(this.data[i]);
      }
      return res;
    }
    track_on() {
      this.cursor = this.pub_from;
      const sub = $mol_wire_auto();
      $mol_wire_auto(this);
      return sub;
    }
    promote() {
      if (this.cursor >= this.pub_from) {
        $mol_fail(new Error("Circular subscription"));
      }
      super.promote();
    }
    track_next(pub) {
      if (this.cursor < 0)
        $mol_fail(new Error("Promo to non begun sub"));
      if (this.cursor < this.sub_from) {
        const next = this.data[this.cursor];
        if (pub === undefined)
          return next ?? null;
        if (next === pub) {
          this.cursor += 2;
          return next;
        }
        if (next) {
          if (this.sub_from < this.data.length) {
            this.peer_move(this.sub_from, this.data.length);
          }
          this.peer_move(this.cursor, this.sub_from);
          this.sub_from += 2;
        }
      } else {
        if (pub === undefined)
          return null;
        if (this.sub_from < this.data.length) {
          this.peer_move(this.sub_from, this.data.length);
        }
        this.sub_from += 2;
      }
      this.data[this.cursor] = pub;
      this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
      this.cursor += 2;
      return pub;
    }
    track_off(sub) {
      $mol_wire_auto(sub);
      if (this.cursor < 0) {
        $mol_fail(new Error("End of non begun sub"));
      }
      for (let cursor = this.pub_from;cursor < this.cursor; cursor += 2) {
        const pub = this.data[cursor];
        pub.fresh();
      }
      this.cursor = $mol_wire_cursor.fresh;
    }
    pub_off(sub_pos) {
      this.data[sub_pos] = undefined;
      this.data[sub_pos + 1] = undefined;
    }
    destructor() {
      for (let cursor = this.data.length - 2;cursor >= this.sub_from; cursor -= 2) {
        const sub = this.data[cursor];
        const pos = this.data[cursor + 1];
        sub.pub_off(pos);
      }
      this.data.length = this.sub_from;
      this.cursor = this.pub_from;
      this.track_cut();
      this.cursor = $mol_wire_cursor.final;
    }
    track_cut() {
      if (this.cursor < this.pub_from) {
        $mol_fail(new Error("Cut of non begun sub"));
      }
      let end = this.data.length;
      for (let cursor = this.cursor;cursor < this.sub_from; cursor += 2) {
        const pub = this.data[cursor];
        pub?.sub_off(this.data[cursor + 1]);
        end -= 2;
        if (this.sub_from <= end)
          this.peer_move(end, cursor);
      }
      this.data.length = end;
      this.sub_from = this.cursor;
    }
    complete() {}
    complete_pubs() {
      const limit = this.cursor < 0 ? this.sub_from : this.cursor;
      for (let cursor = this.pub_from;cursor < limit; cursor += 2) {
        const pub = this.data[cursor];
        if (pub?.incompleted)
          return;
      }
      for (let cursor = this.pub_from;cursor < limit; cursor += 2) {
        const pub = this.data[cursor];
        pub?.complete();
      }
    }
    absorb(quant = $mol_wire_cursor.stale, pos = -1) {
      if (this.cursor === $mol_wire_cursor.final)
        return;
      if (this.cursor >= quant)
        return;
      this.cursor = quant;
      this.emit($mol_wire_cursor.doubt);
    }
    [$mol_dev_format_head]() {
      return $mol_dev_format_native(this);
    }
    get pub_empty() {
      return this.sub_from === this.pub_from;
    }
  }
  $3.$mol_wire_pub_sub = $mol_wire_pub_sub2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  $3.$mol_ambient_ref = Symbol("$mol_ambient_ref");
  function $mol_ambient(overrides) {
    return Object.setPrototypeOf(overrides, this || $3);
  }
  $3.$mol_ambient = $mol_ambient;
})($2 || ($2 = {}));
var $2;
(function($3) {
  const instances = new WeakSet;
  function $mol_delegate2(proto, target) {
    const proxy = new Proxy(proto, {
      get: (_, field) => {
        const obj = target();
        let val = Reflect.get(obj, field);
        if (typeof val === "function") {
          val = val.bind(obj);
        }
        return val;
      },
      has: (_, field) => Reflect.has(target(), field),
      set: (_, field, value) => Reflect.set(target(), field, value),
      getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
      ownKeys: () => Reflect.ownKeys(target()),
      getPrototypeOf: () => Reflect.getPrototypeOf(target()),
      setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
      isExtensible: () => Reflect.isExtensible(target()),
      preventExtensions: () => Reflect.preventExtensions(target()),
      apply: (_, self2, args) => Reflect.apply(target(), self2, args),
      construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
      defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
      deleteProperty: (_, field) => Reflect.deleteProperty(target(), field)
    });
    instances.add(proxy);
    return proxy;
  }
  $3.$mol_delegate = $mol_delegate2;
  Reflect.defineProperty($mol_delegate2, Symbol.hasInstance, {
    value: (obj) => instances.has(obj)
  });
})($2 || ($2 = {}));
var $2;
(function($3) {
  $3.$mol_owning_map = new WeakMap;
  function $mol_owning_allow(having) {
    try {
      if (!having)
        return false;
      if (typeof having !== "object" && typeof having !== "function")
        return false;
      if (having instanceof $mol_delegate)
        return false;
      if (typeof having["destructor"] !== "function")
        return false;
      return true;
    } catch {
      return false;
    }
  }
  $3.$mol_owning_allow = $mol_owning_allow;
  function $mol_owning_get2(having, Owner) {
    if (!$mol_owning_allow(having))
      return null;
    while (true) {
      const owner = $3.$mol_owning_map.get(having);
      if (!owner)
        return owner;
      if (!Owner)
        return owner;
      if (owner instanceof Owner)
        return owner;
      having = owner;
    }
  }
  $3.$mol_owning_get = $mol_owning_get2;
  function $mol_owning_check2(owner, having) {
    if (!$mol_owning_allow(having))
      return false;
    if ($3.$mol_owning_map.get(having) !== owner)
      return false;
    return true;
  }
  $3.$mol_owning_check = $mol_owning_check2;
  function $mol_owning_catch2(owner, having) {
    if (!$mol_owning_allow(having))
      return false;
    if ($3.$mol_owning_map.get(having))
      return false;
    $3.$mol_owning_map.set(having, owner);
    return true;
  }
  $3.$mol_owning_catch = $mol_owning_catch2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  function $mol_fail_hidden2(error) {
    throw error;
  }
  $3.$mol_fail_hidden = $mol_fail_hidden2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  const named = new WeakSet;
  function $mol_func_name(func) {
    let name = func.name;
    if (name?.length > 1)
      return name;
    if (named.has(func))
      return name;
    for (let key in this) {
      try {
        if (this[key] !== func)
          continue;
        name = key;
        Object.defineProperty(func, "name", { value: name });
        break;
      } catch {}
    }
    named.add(func);
    return name;
  }
  $3.$mol_func_name = $mol_func_name;
  function $mol_func_name_from2(target, source) {
    Object.defineProperty(target, "name", { value: source.name });
    return target;
  }
  $3.$mol_func_name_from = $mol_func_name_from2;
})($2 || ($2 = {}));
var $2;
(function($3) {

  class $mol_object22 {
    static $ = $3;
    [Symbol.toStringTag];
    [$mol_ambient_ref] = null;
    get $() {
      if (this[$mol_ambient_ref])
        return this[$mol_ambient_ref];
      const owner = $mol_owning_get(this);
      return this[$mol_ambient_ref] = owner?.$ || $mol_object22.$;
    }
    set $(next) {
      if (this[$mol_ambient_ref])
        $mol_fail_hidden(new Error("Context already defined"));
      this[$mol_ambient_ref] = next;
    }
    static create(init) {
      const obj = new this;
      if (init)
        init(obj);
      return obj;
    }
    static [Symbol.toPrimitive]() {
      return this.toString();
    }
    static toString() {
      return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
    }
    static toJSON() {
      return this.toString();
    }
    destructor() {}
    static destructor() {}
    toString() {
      return this[Symbol.toStringTag] || this.constructor.name + "<>";
    }
  }
  $3.$mol_object2 = $mol_object22;
})($2 || ($2 = {}));
var $2;
(function($3) {

  class $mol_after_tick2 extends $mol_object2 {
    task;
    static promise = null;
    cancelled = false;
    constructor(task) {
      super();
      this.task = task;
      if (!$mol_after_tick2.promise)
        $mol_after_tick2.promise = Promise.resolve().then(() => {
          $mol_after_tick2.promise = null;
        });
      $mol_after_tick2.promise.then(() => {
        if (this.cancelled)
          return;
        task();
      });
    }
    destructor() {
      this.cancelled = true;
    }
  }
  $3.$mol_after_tick = $mol_after_tick2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  function $mol_promise_like2(val) {
    try {
      return val && typeof val === "object" && "then" in val && typeof val.then === "function";
    } catch {
      return false;
    }
  }
  $3.$mol_promise_like = $mol_promise_like2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  const wrappers = new WeakMap;

  class $mol_wire_fiber2 extends $mol_wire_pub_sub {
    task;
    host;
    static warm = true;
    static planning = new Set;
    static reaping = new Set;
    static plan_task = null;
    static plan() {
      if (this.plan_task)
        return;
      this.plan_task = new $mol_after_tick(() => {
        try {
          this.sync();
        } finally {
          $mol_wire_fiber2.plan_task = null;
        }
      });
    }
    static sync() {
      while (this.planning.size) {
        for (const fiber of this.planning) {
          this.planning.delete(fiber);
          if (fiber.cursor >= 0)
            continue;
          if (fiber.cursor === $mol_wire_cursor.final)
            continue;
          fiber.fresh();
        }
      }
      while (this.reaping.size) {
        const fibers = this.reaping;
        this.reaping = new Set;
        for (const fiber of fibers) {
          if (!fiber.sub_empty)
            continue;
          fiber.destructor();
        }
      }
    }
    cache = undefined;
    get args() {
      return this.data.slice(0, this.pub_from);
    }
    result() {
      if ($mol_promise_like(this.cache))
        return;
      if (this.cache instanceof Error)
        return;
      return this.cache;
    }
    get incompleted() {
      return $mol_promise_like(this.cache);
    }
    field() {
      return this.task.name + "()";
    }
    constructor(id, task, host, args) {
      super(id);
      this.task = task;
      this.host = host;
      if (args)
        this.data.push(...args);
      this.pub_from = this.sub_from = args?.length ?? 0;
    }
    plan() {
      $mol_wire_fiber2.planning.add(this);
      $mol_wire_fiber2.plan();
      return this;
    }
    reap() {
      $mol_wire_fiber2.reaping.add(this);
      $mol_wire_fiber2.plan();
    }
    toString() {
      return this[Symbol.toStringTag];
    }
    toJSON() {
      return this[Symbol.toStringTag];
    }
    [$mol_dev_format_head]() {
      const cursor = {
        [$mol_wire_cursor.stale]: "\uD83D\uDD34",
        [$mol_wire_cursor.doubt]: "\uD83D\uDFE1",
        [$mol_wire_cursor.fresh]: "\uD83D\uDFE2",
        [$mol_wire_cursor.final]: "\uD83D\uDD35"
      }[this.cursor] ?? this.cursor.toString();
      return $mol_dev_format_div({}, $mol_owning_check(this, this.cache) ? $mol_dev_format_auto({
        [$mol_dev_format_head]: () => $mol_dev_format_shade(cursor),
        [$mol_dev_format_body]: () => $mol_dev_format_native(this)
      }) : $mol_dev_format_shade($mol_dev_format_native(this), cursor), $mol_dev_format_auto(this.cache));
    }
    get $() {
      return (this.host ?? this.task)["$"];
    }
    emit(quant = $mol_wire_cursor.stale) {
      if (this.sub_empty)
        this.plan();
      else
        super.emit(quant);
    }
    fresh() {
      if (this.cursor === $mol_wire_cursor.fresh)
        return;
      if (this.cursor === $mol_wire_cursor.final)
        return;
      check:
        if (this.cursor === $mol_wire_cursor.doubt) {
          for (let i = this.pub_from;i < this.sub_from; i += 2) {
            this.data[i]?.fresh();
            if (this.cursor !== $mol_wire_cursor.doubt)
              break check;
          }
          this.cursor = $mol_wire_cursor.fresh;
          return;
        }
      const bu = this.track_on();
      let result;
      try {
        switch (this.pub_from) {
          case 0:
            result = this.task.call(this.host);
            break;
          case 1:
            result = this.task.call(this.host, this.data[0]);
            break;
          default:
            result = this.task.call(this.host, ...this.args);
            break;
        }
        if ($mol_promise_like(result)) {
          if (wrappers.has(result)) {
            result = wrappers.get(result).then((a) => a);
          } else {
            const put = (res) => {
              if (this.cache === result)
                this.put(res);
              return res;
            };
            wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => {}) }));
            wrappers.set(result, result);
            const error = new Error(`Promise in ${this}`);
            Object.defineProperty(result, "stack", { get: () => error.stack });
          }
        }
      } catch (error) {
        if (error instanceof Error || $mol_promise_like(error)) {
          result = error;
        } else {
          result = new Error(String(error), { cause: error });
        }
        if ($mol_promise_like(result)) {
          if (wrappers.has(result)) {
            result = wrappers.get(result);
          } else {
            wrappers.set(result, result = Object.assign(result.finally(() => {
              if (this.cache === result)
                this.absorb();
            }), { destructor: result.destructor || (() => {}) }));
            const error2 = new Error(`Promise in ${this}`);
            Object.defineProperty(result, "stack", { get: () => error2.stack });
          }
        }
      }
      if (!$mol_promise_like(result)) {
        this.track_cut();
      }
      this.track_off(bu);
      this.put(result);
      return this;
    }
    refresh() {
      this.cursor = $mol_wire_cursor.stale;
      this.fresh();
    }
    sync() {
      if (!$mol_wire_fiber2.warm) {
        return this.result();
      }
      this.promote();
      this.fresh();
      if (this.cache instanceof Error) {
        return $mol_fail_hidden(this.cache);
      }
      if ($mol_promise_like(this.cache)) {
        return $mol_fail_hidden(this.cache);
      }
      return this.cache;
    }
    async async_raw() {
      while (true) {
        this.fresh();
        if (this.cache instanceof Error) {
          $mol_fail_hidden(this.cache);
        }
        if (!$mol_promise_like(this.cache))
          return this.cache;
        await Promise.race([this.cache, this.step()]);
        if (!$mol_promise_like(this.cache))
          return this.cache;
        if (this.cursor === $mol_wire_cursor.final) {
          await new Promise(() => {});
        }
      }
    }
    async() {
      const promise = this.async_raw();
      if (!promise.destructor)
        promise.destructor = () => this.destructor();
      return promise;
    }
    step() {
      return new Promise((done) => {
        const sub = new $mol_wire_pub_sub;
        const prev = sub.track_on();
        sub.track_next(this);
        sub.track_off(prev);
        sub.absorb = () => {
          done(null);
          setTimeout(() => sub.destructor());
        };
      });
    }
    destructor() {
      super.destructor();
      if (!$mol_owning_check(this, this.cache))
        return;
      try {
        this.cache.destructor();
      } catch (result) {
        if ($mol_promise_like(result)) {
          const error = new Error(`Promise in ${this}.destructor()`);
          Object.defineProperty(result, "stack", { get: () => error.stack });
        }
        $mol_fail_hidden(result);
      }
    }
  }
  $3.$mol_wire_fiber = $mol_wire_fiber2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  $3.$mol_key_store = new WeakMap;
  const TypedArray = Object.getPrototypeOf(Uint8Array);
  function $mol_key2(value) {
    if (typeof value === "bigint")
      return value.toString() + "n";
    if (typeof value === "symbol")
      return value.description;
    if (!value)
      return JSON.stringify(value);
    if (typeof value !== "object" && typeof value !== "function")
      return JSON.stringify(value);
    return JSON.stringify(value, (field, value2) => {
      if (typeof value2 === "bigint")
        return value2.toString() + "n";
      if (typeof value2 === "symbol")
        return value2.description;
      if (!value2)
        return value2;
      if (typeof value2 !== "object" && typeof value2 !== "function")
        return value2;
      if (Array.isArray(value2))
        return value2;
      const proto = Reflect.getPrototypeOf(value2);
      if (!proto)
        return value2;
      if (Reflect.getPrototypeOf(proto) === null)
        return value2;
      if ("toJSON" in value2)
        return value2;
      if (value2 instanceof RegExp)
        return value2.toString();
      if (value2 instanceof TypedArray)
        return [...value2];
      let key = $3.$mol_key_store.get(value2);
      if (key)
        return key;
      key = $mol_guid();
      $3.$mol_key_store.set(value2, key);
      return key;
    });
  }
  $3.$mol_key = $mol_key2;
})($2 || ($2 = {}));
var $2;
(function($3) {

  class $mol_after_frame2 extends $mol_object2 {
    task;
    static _promise = null;
    static get promise() {
      if (this._promise)
        return this._promise;
      return this._promise = new Promise((done) => {
        const complete = () => {
          this._promise = null;
          done();
        };
        if (typeof requestAnimationFrame === "function") {
          requestAnimationFrame(complete);
        } else {
          setTimeout(complete, 16);
        }
      });
    }
    cancelled = false;
    promise;
    constructor(task) {
      super();
      this.task = task;
      this.promise = $mol_after_frame2.promise.then(() => {
        if (this.cancelled)
          return;
        task();
      });
    }
    destructor() {
      this.cancelled = true;
    }
  }
  $3.$mol_after_frame = $mol_after_frame2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  $3.$mol_compare_deep_cache = new WeakMap;
  function $mol_compare_deep2(left, right) {
    if (Object.is(left, right))
      return true;
    if (left === null)
      return false;
    if (right === null)
      return false;
    if (typeof left !== "object")
      return false;
    if (typeof right !== "object")
      return false;
    const left_proto = Reflect.getPrototypeOf(left);
    const right_proto = Reflect.getPrototypeOf(right);
    if (left_proto !== right_proto)
      return false;
    if (left instanceof Boolean)
      return Object.is(left.valueOf(), right["valueOf"]());
    if (left instanceof Number)
      return Object.is(left.valueOf(), right["valueOf"]());
    if (left instanceof String)
      return Object.is(left.valueOf(), right["valueOf"]());
    if (left instanceof Date)
      return Object.is(left.valueOf(), right["valueOf"]());
    if (left instanceof RegExp)
      return left.source === right.source && left.flags === right.flags;
    if (left instanceof Error)
      return left.message === right.message && left.stack === right.stack;
    let left_cache = $3.$mol_compare_deep_cache.get(left);
    if (left_cache) {
      const right_cache = left_cache.get(right);
      if (typeof right_cache === "boolean")
        return right_cache;
    } else {
      left_cache = new WeakMap;
      $3.$mol_compare_deep_cache.set(left, left_cache);
    }
    left_cache.set(right, true);
    let result;
    try {
      if (!left_proto)
        result = compare_pojo(left, right);
      else if (!Reflect.getPrototypeOf(left_proto))
        result = compare_pojo(left, right);
      else if (Symbol.toPrimitive in left)
        result = compare_primitive(left, right);
      else if (Array.isArray(left))
        result = compare_array(left, right);
      else if (left instanceof Set)
        result = compare_set(left, right);
      else if (left instanceof Map)
        result = compare_map(left, right);
      else if (ArrayBuffer.isView(left))
        result = compare_buffer(left, right);
      else if (Symbol.iterator in left)
        result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
      else
        result = false;
    } finally {
      left_cache.set(right, result);
    }
    return result;
  }
  $3.$mol_compare_deep = $mol_compare_deep2;
  function compare_array(left, right) {
    const len = left.length;
    if (len !== right.length)
      return false;
    for (let i = 0;i < len; ++i) {
      if (!$mol_compare_deep2(left[i], right[i]))
        return false;
    }
    return true;
  }
  function compare_buffer(left, right) {
    const len = left.byteLength;
    if (len !== right.byteLength)
      return false;
    if (left instanceof DataView)
      return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
    for (let i = 0;i < len; ++i) {
      if (left[i] !== right[i])
        return false;
    }
    return true;
  }
  function compare_iterator(left, right) {
    while (true) {
      const left_next = left.next();
      const right_next = right.next();
      if (left_next.done !== right_next.done)
        return false;
      if (left_next.done)
        break;
      if (!$mol_compare_deep2(left_next.value, right_next.value))
        return false;
    }
    return true;
  }
  function compare_set(left, right) {
    if (left.size !== right.size)
      return false;
    return compare_iterator(left.values(), right.values());
  }
  function compare_map(left, right) {
    if (left.size !== right.size)
      return false;
    return compare_iterator(left.keys(), right.keys()) && compare_iterator(left.values(), right.values());
  }
  function compare_pojo(left, right) {
    const left_keys = Object.getOwnPropertyNames(left);
    const right_keys = Object.getOwnPropertyNames(right);
    if (!compare_array(left_keys, right_keys))
      return false;
    for (let key of left_keys) {
      if (!$mol_compare_deep2(left[key], right[key]))
        return false;
    }
    const left_syms = Object.getOwnPropertySymbols(left);
    const right_syms = Object.getOwnPropertySymbols(right);
    if (!compare_array(left_syms, right_syms))
      return false;
    for (let key of left_syms) {
      if (!$mol_compare_deep2(left[key], right[key]))
        return false;
    }
    return true;
  }
  function compare_primitive(left, right) {
    return Object.is(left[Symbol.toPrimitive]("default"), right[Symbol.toPrimitive]("default"));
  }
})($2 || ($2 = {}));
var $2;
(function($3) {
  function $mol_log3_area_lazy(event) {
    const self2 = this;
    const stack = self2.$mol_log3_stack;
    const deep = stack.length;
    let logged = false;
    stack.push(() => {
      logged = true;
      self2.$mol_log3_area.call(self2, event);
    });
    return () => {
      if (logged)
        self2.console.groupEnd();
      if (stack.length > deep)
        stack.length = deep;
    };
  }
  $3.$mol_log3_area_lazy = $mol_log3_area_lazy;
  $3.$mol_log3_stack = [];
})($2 || ($2 = {}));
var $2;
(function($3) {
  function $mol_log3_web_make(level, color) {
    return function $mol_log3_logger(event) {
      const pending = this.$mol_log3_stack.pop();
      if (pending)
        pending();
      let tpl = "%c";
      const chunks = Object.entries(event);
      for (let i = 0;i < chunks.length; ++i) {
        tpl += typeof chunks[i][1] === "string" ? `%s: %s
` : `%s: %o
`;
      }
      const style = `color:${color};font-weight:bolder`;
      this.console[level](tpl.trim(), style, ...[].concat(...chunks));
      const self2 = this;
      return () => self2.console.groupEnd();
    };
  }
  $3.$mol_log3_web_make = $mol_log3_web_make;
  $3.$mol_log3_come = $mol_log3_web_make("info", "royalblue");
  $3.$mol_log3_done = $mol_log3_web_make("info", "forestgreen");
  $3.$mol_log3_fail = $mol_log3_web_make("error", "orangered");
  $3.$mol_log3_warn = $mol_log3_web_make("warn", "goldenrod");
  $3.$mol_log3_rise = $mol_log3_web_make("log", "magenta");
  $3.$mol_log3_area = $mol_log3_web_make("group", "cyan");
})($2 || ($2 = {}));
var $2;
(function($3) {

  class $mol_wire_task2 extends $mol_wire_fiber {
    static getter(task) {
      return function $mol_wire_task_get(host, args) {
        const sub = $mol_wire_auto();
        const existen = sub?.track_next();
        reuse:
          if (existen) {
            if (!existen.temp)
              break reuse;
            if (existen.host !== host)
              break reuse;
            if (existen.task !== task)
              break reuse;
            if (!$mol_compare_deep(existen.args, args))
              break reuse;
            return existen;
          }
        const key = (host?.[Symbol.toStringTag] ?? host) + ("." + task.name + "<#>");
        const next = new $mol_wire_task2(key, task, host, args);
        if (existen?.temp) {
          $$.$mol_log3_warn({
            place: "$mol_wire_task",
            message: `Non idempotency`,
            sub,
            pubs: [...sub?.pub_list ?? [], existen],
            next,
            hint: "Ignore it"
          });
        }
        return next;
      };
    }
    get temp() {
      return true;
    }
    complete() {
      if ($mol_promise_like(this.cache))
        return;
      this.destructor();
    }
    put(next) {
      const prev = this.cache;
      this.cache = next;
      if ($mol_promise_like(next)) {
        this.cursor = $mol_wire_cursor.fresh;
        if (next !== prev)
          this.emit();
        if ($mol_owning_catch(this, next)) {
          try {
            next[Symbol.toStringTag] = this[Symbol.toStringTag];
          } catch {
            Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
          }
        }
        return next;
      }
      this.cursor = $mol_wire_cursor.final;
      if (this.sub_empty)
        this.destructor();
      else if (next !== prev)
        this.emit();
      return next;
    }
  }
  $3.$mol_wire_task = $mol_wire_task2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  function $mol_wire_method2(host, field, descr) {
    if (!descr)
      descr = Reflect.getOwnPropertyDescriptor(host, field);
    const orig = descr?.value ?? host[field];
    const sup = Reflect.getPrototypeOf(host);
    if (typeof sup[field] === "function") {
      Object.defineProperty(orig, "name", { value: sup[field].name });
    }
    const temp = $mol_wire_task.getter(orig);
    const value = function(...args) {
      const fiber = temp(this ?? null, args);
      return fiber.sync();
    };
    Object.defineProperty(value, "name", { value: orig.name + " " });
    Object.assign(value, { orig });
    const descr2 = { ...descr, value };
    Reflect.defineProperty(host, field, descr2);
    return descr2;
  }
  $3.$mol_wire_method = $mol_wire_method2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  const catched = new WeakMap;
  function $mol_fail_catch2(error) {
    if (typeof error !== "object")
      return false;
    if ($mol_promise_like(error))
      $mol_fail_hidden(error);
    if (catched.get(error))
      return false;
    catched.set(error, true);
    return true;
  }
  $3.$mol_fail_catch = $mol_fail_catch2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  function $mol_fail_log2(error) {
    if ($mol_promise_like(error))
      return false;
    if (!$mol_fail_catch(error))
      return false;
    console.error(error);
    return true;
  }
  $3.$mol_fail_log = $mol_fail_log2;
})($2 || ($2 = {}));
var $2;
(function($3) {

  class $mol_wire_atom2 extends $mol_wire_fiber {
    static solo(host, task) {
      const field = task.name + "()";
      const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
      if (existen)
        return existen;
      const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
      const key = prefix + ("." + task.name + "<>");
      const fiber = new $mol_wire_atom2(key, task, host, []);
      (host ?? task)[field] = fiber;
      return fiber;
    }
    static plex(host, task, key) {
      const field = task.name + "()";
      let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
      const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
      const key_str = $mol_key(key);
      if (dict) {
        const existen = dict.get(key_str);
        if (existen)
          return existen;
      } else {
        dict = (host ?? task)[field] = new Map;
      }
      const id = prefix + ("." + task.name) + ("<" + key_str.replace(/^"|"$/g, "'") + ">");
      const fiber = new $mol_wire_atom2(id, task, host, [key]);
      dict.set(key_str, fiber);
      return fiber;
    }
    static watching = new Set;
    static watcher = null;
    static watch() {
      $mol_wire_atom2.watcher = new $mol_after_frame($mol_wire_atom2.watch);
      for (const atom of $mol_wire_atom2.watching) {
        if (atom.cursor === $mol_wire_cursor.final) {
          $mol_wire_atom2.watching.delete(atom);
        } else {
          atom.cursor = $mol_wire_cursor.stale;
          atom.fresh();
        }
      }
    }
    watch() {
      if (!$mol_wire_atom2.watcher) {
        $mol_wire_atom2.watcher = new $mol_after_frame($mol_wire_atom2.watch);
      }
      $mol_wire_atom2.watching.add(this);
    }
    resync(args) {
      return this.put(this.task.call(this.host, ...args));
    }
    once() {
      return this.sync();
    }
    channel() {
      return Object.assign((next) => {
        if (next !== undefined)
          return this.resync([...this.args, next]);
        if (!$mol_wire_fiber.warm)
          return this.result();
        if ($mol_wire_auto()?.temp) {
          return this.once();
        } else {
          return this.sync();
        }
      }, { atom: this });
    }
    destructor() {
      super.destructor();
      if (this.pub_from === 0) {
        (this.host ?? this.task)[this.field()] = null;
      } else {
        (this.host ?? this.task)[this.field()].delete($mol_key(this.args[0]));
      }
    }
    put(next) {
      const prev = this.cache;
      update:
        if (next !== prev) {
          try {
            if ($mol_compare_deep(prev, next))
              break update;
          } catch (error) {
            $mol_fail_log(error);
          }
          if ($mol_owning_check(this, prev)) {
            prev.destructor();
          }
          if ($mol_owning_catch(this, next)) {
            try {
              next[Symbol.toStringTag] = this[Symbol.toStringTag];
            } catch {
              Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
            }
          }
          if (!this.sub_empty)
            this.emit();
        }
      this.cache = next;
      this.cursor = $mol_wire_cursor.fresh;
      if ($mol_promise_like(next))
        return next;
      this.complete_pubs();
      return next;
    }
  }
  __decorate2([
    $mol_wire_method
  ], $mol_wire_atom2.prototype, "resync", null);
  __decorate2([
    $mol_wire_method
  ], $mol_wire_atom2.prototype, "once", null);
  $3.$mol_wire_atom = $mol_wire_atom2;
})($2 || ($2 = {}));
var $2;
(function($3) {})($2 || ($2 = {}));
var $2;
(function($3) {
  $3.$mol_dom_context = self;
})($2 || ($2 = {}));
var $2;
(function($3) {
  $3.$mol_dom = $mol_dom_context;
})($2 || ($2 = {}));
var $2;
(function($3) {
  function $mol_dom_render_children2(el, childNodes) {
    const node_set = new Set(childNodes);
    let nextNode = el.firstChild;
    for (let view of childNodes) {
      if (view == null)
        continue;
      if (view instanceof $mol_dom_context.Node) {
        while (true) {
          if (!nextNode) {
            el.appendChild(view);
            break;
          }
          if (nextNode == view) {
            nextNode = nextNode.nextSibling;
            break;
          } else {
            if (node_set.has(nextNode)) {
              el.insertBefore(view, nextNode);
              break;
            } else {
              const nn = nextNode.nextSibling;
              el.removeChild(nextNode);
              nextNode = nn;
            }
          }
        }
      } else {
        if (nextNode && nextNode.nodeName === "#text") {
          const str = String(view);
          if (nextNode.nodeValue !== str)
            nextNode.nodeValue = str;
          nextNode = nextNode.nextSibling;
        } else {
          const textNode = $mol_dom_context.document.createTextNode(String(view));
          el.insertBefore(textNode, nextNode);
        }
      }
    }
    while (nextNode) {
      const currNode = nextNode;
      nextNode = currNode.nextSibling;
      el.removeChild(currNode);
    }
  }
  $3.$mol_dom_render_children = $mol_dom_render_children2;
})($2 || ($2 = {}));
var $2;
(function($3) {
  function $mol_wire_patch(obj) {
    for (const field of Reflect.ownKeys(obj)) {
      const descr = Reflect.getOwnPropertyDescriptor(obj, field);
      if (!descr.configurable)
        continue;
      if (!descr.get)
        continue;
      const get = descr.get ?? (() => descr.value);
      const set = descr.set ?? ((next) => descr.value = next);
      Reflect.defineProperty(obj, field, {
        configurable: true,
        enumerable: descr.enumerable,
        get() {
          const atom = $mol_wire_atom.solo(obj, get);
          atom.watch();
          return atom.sync();
        },
        set(next) {
          const atom = $mol_wire_atom.solo(obj, get);
          set.call(this, next);
          atom.refresh();
        }
      });
    }
  }
  $3.$mol_wire_patch = $mol_wire_patch;
})($2 || ($2 = {}));
var $2;
(function($3) {
  function lookup_descr(obj, field) {
    const descr = Reflect.getOwnPropertyDescriptor(obj, field);
    if (descr)
      return descr;
    const proto = Reflect.getPrototypeOf(obj);
    if (proto)
      return lookup_descr(proto, field);
    return null;
  }
  $3.lookup_descr = lookup_descr;
  function reproperty(el, field) {
    const descr = lookup_descr(Reflect.getPrototypeOf(el), field);
    let task = Reflect.getOwnPropertyDescriptor(el, field)?.get;
    const atom = new $mol_wire_atom(el.id + "." + field, function(next) {
      let res = task?.() ?? next;
      if (res === undefined)
        return descr.get.call(this);
      descr.set.call(this, res);
      return res;
    }, el, []);
    Object.defineProperty(el, field, {
      configurable: true,
      get: () => atom.sync(),
      set: (next) => {
        if (typeof next === "function") {
          task = next;
          atom.absorb();
          atom.fresh();
        } else {
          if (atom.cache === next)
            return;
          atom.resync([next]);
        }
      }
    });
    if (task)
      atom.fresh();
    return () => atom.absorb();
  }
  function restyle(el) {
    const style = el.style;
    let task = (next) => next;
    const atom = new $mol_wire_atom(el.id + ".style", function(next) {
      const res = task(next);
      if (res === undefined)
        return style;
      for (const key in res) {
        style[key] = res[key] ?? "";
      }
      return style;
    }, el, []);
    Object.defineProperty(el, "style", {
      configurable: true,
      get: () => atom.sync(),
      set: (next) => {
        if (typeof next === "function") {
          task = next;
          atom.absorb();
          atom.fresh();
        } else {
          atom.resync([next]);
        }
      }
    });
    return () => atom.absorb();
  }
  function rekids(el) {
    const kids = el.childNodes;
    let task = (next) => next;
    const atom = new $mol_wire_atom(el.id + ".childNodes", function(next) {
      const res = task(next);
      if (res === undefined)
        return kids;
      for (const kid of res)
        if (kid instanceof Element)
          $mol_wire_dom(kid);
      $mol_dom_render_children(this, res);
      return kids;
    }, el, []);
    Object.defineProperty(el, "childNodes", {
      configurable: true,
      get: () => atom.sync(),
      set: (next) => {
        if (typeof next === "function") {
          task = next;
          atom.absorb();
          atom.fresh();
        } else {
          atom.resync([next]);
        }
      }
    });
    return () => atom.absorb();
  }
  function redefine(field, getter) {
    $mol_wire_dom(this)[field] = getter;
  }
  function $mol_wire_dom(el) {
    if (el.__defineGetter__ === redefine)
      return el;
    for (const kid of el.children)
      $mol_wire_dom(kid);
    if (el instanceof HTMLInputElement)
      el.addEventListener("input", reproperty(el, "value"));
    if (el instanceof HTMLInputElement)
      el.addEventListener("change", reproperty(el, "checked"));
    if (el instanceof HTMLElement)
      el.addEventListener("DOMSubtreeModified", reproperty(el, "innerText"));
    if (el instanceof HTMLElement)
      el.addEventListener("DOMSubtreeModified", reproperty(el, "innerHTML"));
    if (el instanceof HTMLElement)
      el.addEventListener("DOMSubtreeModified", reproperty(el, "outerHTML"));
    if (el instanceof HTMLElement)
      restyle(el);
    el.addEventListener("DOMSubtreeModified", reproperty(el, "textContent"));
    el.addEventListener("DOMSubtreeModified", rekids(el));
    el.__defineGetter__ = redefine;
    return el;
  }
  $3.$mol_wire_dom = $mol_wire_dom;
})($2 || ($2 = {}));
var web_default2 = $2;

// src/components/view/view.ts
function $mol_dom_render_fields(el, fields) {
  for (let key in fields) {
    const val = fields[key];
    if (val === undefined)
      continue;
    if (val === el[key])
      continue;
    el[key] = val;
  }
}
function $mol_dom_render_attributes(el, attrs) {
  for (let name in attrs) {
    let val = attrs[name];
    if (val === undefined) {
      continue;
    } else if (val === null || val === false) {
      if (!el.hasAttribute(name))
        continue;
      el.removeAttribute(name);
    } else {
      const str = String(val);
      if (el.getAttribute(name) === str)
        continue;
      el.setAttribute(name, str);
    }
  }
}

class mox_view extends web_default.$mol_object {
  static Root(id) {
    return new this;
  }
  dom_id() {
    return this.toString().replace(/</g, "(").replace(/>/g, ")").replaceAll(/"/g, "'");
  }
  dom_name() {
    return "div";
  }
  dom_node_external(next) {
    const node = next ?? web_default2.document.createElementNS("http://www.w3.org/1999/xhtml", this.dom_name());
    const id = this.dom_id();
    node.setAttribute("id", id);
    node.toString = web_default.$mol_const("<#" + id + ">");
    return node;
  }
  dom_node(next) {
    web_default.$mol_wire_solid();
    const node = this.dom_node_external(next);
    $mol_dom_render_attributes(node, this.attr_static());
    return node;
  }
  autorun() {
    try {
      this.dom_tree();
    } catch (error) {
      web_default.$mol_fail_log(error);
    }
  }
  auto() {
    return null;
  }
  dom_node_actual() {
    const node = this.dom_node();
    return node;
  }
  render() {
    const node = this.dom_node_actual();
    const sub = this.sub();
    if (!sub)
      return;
    const nodes = sub.map((child) => {
      if (child == null)
        return null;
      return child instanceof mox_view ? child.dom_node() : child instanceof window.Node ? child : String(child);
    });
    web_default2.$mol_dom_render_children(node, nodes);
    for (const el of sub)
      if (el && typeof el === "object" && "dom_tree" in el)
        el["dom_tree"]();
    $mol_dom_render_fields(node, this.field());
  }
  dom_tree(next) {
    const node = this.dom_node(next);
    render:
      try {
        $mol_dom_render_attributes(node, { mox_view_error: null });
        try {
          this.render();
        } finally {}
      } catch (error) {
        console.error(`Error rendering view ${this.constructor.name}:`, error);
      }
    try {
      this.auto();
    } catch (error) {
      confirm(`Error in auto() method of ${this.constructor.name}: ${error}`);
    }
    return node;
  }
  sub() {
    return [];
  }
  attr_static() {
    let attrs = {};
    for (let name of this.view_names())
      attrs[name.replace(/\$/g, "").replace(/^(?=\d)/, "_").toLowerCase()] = "";
    return attrs;
  }
  static view_classes() {
    const proto = this.prototype;
    let current = proto;
    const classes = [];
    while (current) {
      if (current.constructor.name !== classes.at(-1)?.name) {
        classes.push(current.constructor);
      }
      if (!(current instanceof mox_view))
        break;
      current = Object.getPrototypeOf(current);
    }
    return classes;
  }
  static _view_names;
  static view_names(suffix) {
    let cache = Reflect.getOwnPropertyDescriptor(this, "_view_names")?.value;
    if (!cache)
      cache = this._view_names = new Map;
    const cached = cache.get(suffix);
    if (cached)
      return cached;
    const names = [];
    const suffix2 = "_" + suffix[0].toLowerCase() + suffix.substring(1);
    for (const Class of this.view_classes()) {
      if (suffix in Class.prototype)
        names.push(this.$.$mol_func_name(Class) + suffix2);
      else
        break;
    }
    cache.set(suffix, names);
    return names;
  }
  view_names_owned() {
    const names = [];
    let owner = web_default.$mol_owning_get(this);
    if (!(owner?.host instanceof mox_view))
      return names;
    const suffix = owner.task.name.trim();
    const suffix2 = "_" + suffix[0].toLowerCase() + suffix.substring(1);
    names.push(...owner.host.constructor.view_names(suffix));
    for (let prefix of owner.host.view_names_owned()) {
      names.push(prefix + suffix2);
    }
    return names;
  }
  view_names() {
    const names = new Set;
    for (let name of this.view_names_owned())
      names.add(name);
    for (let Class of this.constructor.view_classes()) {
      const name = this.$.$mol_func_name(Class);
      if (name)
        names.add(name);
    }
    return names;
  }
  field() {
    return {};
  }
  event() {
    return {};
  }
  event_async() {
    return { ...web_default.$mol_wire_async(this.event()) };
  }
  plugins() {
    return [];
  }
  static autobind() {
    const nodes = document.querySelectorAll('[mox_root]:not([mox_root=""])');
    for (let i = nodes.length - 1;i >= 0; --i) {
      const name = nodes.item(i).getAttribute("mox_root");
      const View = window[name];
      if (!View) {
        console.error(`Can not attach view. Class not found: ${name}`);
        continue;
      }
      const view = View.Root(i);
      view.dom_node(nodes.item(i));
      view.autorun();
    }
  }
  destructor() {
    const node = web_default.$mol_wire_probe(() => this.dom_node());
    if (!node)
      return;
    const events = web_default.$mol_wire_probe(() => this.event_async());
    if (!events)
      return;
    for (let event_name in events) {
      node.removeEventListener(event_name, events[event_name]);
    }
  }
}
__legacyDecorateClassTS([
  web_default.$mol_wire_method,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view.prototype, "dom_id", null);
__legacyDecorateClassTS([
  web_default.$mol_wire_method,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view.prototype, "dom_name", null);
__legacyDecorateClassTS([
  web_default.$mol_mem,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", [
    typeof Element === "undefined" ? Object : Element
  ]),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view.prototype, "dom_node", null);
__legacyDecorateClassTS([
  web_default.$mol_wire_solo,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view.prototype, "autorun", null);
__legacyDecorateClassTS([
  web_default.$mol_wire_solo,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view.prototype, "dom_node_actual", null);
__legacyDecorateClassTS([
  web_default.$mol_wire_solo,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view.prototype, "render", null);
__legacyDecorateClassTS([
  web_default.$mol_wire_solo,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", [
    typeof Element === "undefined" ? Object : Element
  ]),
  __legacyMetadataTS("design:returntype", typeof Element === "undefined" ? Object : Element)
], mox_view.prototype, "dom_tree", null);
__legacyDecorateClassTS([
  web_default.$mol_wire_method,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view.prototype, "view_names_owned", null);
__legacyDecorateClassTS([
  web_default.$mol_wire_method,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view.prototype, "view_names", null);
__legacyDecorateClassTS([
  web_default.$mol_wire_solo,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view.prototype, "event_async", null);
__legacyDecorateClassTS([
  web_default.$mol_mem_key,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", [
    Number
  ]),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view, "Root", null);
__legacyDecorateClassTS([
  web_default.$mol_wire_method,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], mox_view, "view_classes", null);

// src/components/app/app.ts
class Account extends Object {
}

class Appp extends Object {
  account(id) {
    return new Account(id);
  }
}
__legacyDecorateClassTS([
  web_default.$mol_wire_plex,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", [
    Number
  ]),
  __legacyMetadataTS("design:returntype", undefined)
], Appp.prototype, "account", null);

class Logo extends mox_view {
  sub() {
    return [
      "Logo Component"
    ];
  }
}

class Sidebar extends mox_view {
  Logo() {
    const logo = new Logo;
    return logo;
  }
  sub() {
    return [
      this.Logo()
    ];
  }
}
__legacyDecorateClassTS([
  web_default.$mol_wire_solo,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], Sidebar.prototype, "Logo", null);

class App extends mox_view {
  Sidebar() {
    const sidebar = new Sidebar;
    return sidebar;
  }
  sub() {
    return [
      "Hello, World!",
      this.Sidebar()
    ];
  }
  static [Symbol.toStringTag] = "App";
}
__legacyDecorateClassTS([
  web_default.$mol_wire_solo,
  __legacyMetadataTS("design:type", Function),
  __legacyMetadataTS("design:paramtypes", []),
  __legacyMetadataTS("design:returntype", undefined)
], App.prototype, "Sidebar", null);

// src/web.ts
window["App"] = App;
document?.addEventListener("DOMContentLoaded", () => App.autobind(), { once: true });
var appp = new Appp;
