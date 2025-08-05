/**
 * Graph database. Native implementation.
 * 
 * Edge is a link between Nodes.
 * Each Node has a set of Edges, which are links to other Nodes.
 * Node - Edge - Node
 *
 * Query start from some Node. You cannot just select some nodes, you need to traverse the graph from particular node.
 * Each node has ID, which is used to verify the node.
 * Normaly each query start from node type User
 *
 * Each node has operations, like view fields, view some of the fields, update some field, or even only increment field mycounter, or only double field mypoints if this field less then 100 and node has parent with id=5.
 * Each operation is a method of Node class.
 * Each operation has permission, which is a method of Node class too, it return link boolean and based on edges.
 * Each Node has owner link by default and it is linked to itself. Owner can do anything with node.
 * Node is the composition of Data, Operations and Permissions. This means that all of this entities describe separately.
 * Each field in Data is a composition of Value and Actions. It has basic actions - read, set, delete, has, exists.
 *
 * Пример1:
 * Каждый пользователь может создать Пост если у него положительный баланс.
 * Каждый Пост имеет текст и краткое описание.
 * Краткое описание могут видеть только подписчики пользователя.
 * Текст могут видеть только подписчики пользователя, которые подписаны на пользователя больше 1 месяца и оплатили подписку.
 * "Оплатили подписку" - имеют положительный баланс.
 * Пользователь может подписаться на другого пользователя, если у него положительный баланс.
 * 
 */


import $mol_wire_lib from 'mol_wire_lib'

type Id = string;
class Base extends Object {

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
class Vertex extends Base {

  _links :$mol_wire_lib.$mol_wire_dict<Id, Vertex> = new $mol_wire_lib.$mol_wire_dict<Id, Vertex>();

  links(){
    return this._links 
  }

}
class MoxDB {
  private nodes: Map<Id, Vertex> = new Map();
  
}

