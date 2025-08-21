class nObject {
	[Symbol.toStringTag]!: string
	public static create< Instance >(
			this : new( init? : ( instance : any )=> void )=> Instance ,
			init:CallableFunction | null = null
		) : Instance {
			const obj = new this
			if( init ) init( obj )
			return obj
		}
		
		static [ Symbol.toPrimitive ]() {
			return this.toString()
		}
		
		static toString() {
			return ( this as any )[ Symbol.toStringTag ]
		}
		
		static toJSON() {
			return this.toString()
		}
		
		destructor() { }
		static destructor() { }
		
		//[ Symbol.toPrimitive ]( hint: string ) {
		//	return hint === 'number' ? this.valueOf() : this.toString()
		//}
		
		toString(): string {
			return this[ Symbol.toStringTag ] || this.constructor.name + '<>'
		}
		
}
class Pub extends nObject {
	override [ Symbol.toStringTag ]!: string
	 
	constructor(
		readonly id: string
	) {
		super();
		this[Symbol.toStringTag] = id
	}
}

class PubSub extends Pub {
	 
	 
}

class Fiber extends PubSub {
	// Fiber может использоваться для управления асинхронными задачами
	// и реактивным программированием, например, для отслеживания изменений состояния
	override destructor() {
		super.destructor()
	}
	constructor(
		id: string,
		target: any,
		method: any,
		args?:  any[]
	) {
		super(id)
	}
}
class Atom extends Fiber {
	static create(target: any, method: any, args: any[] = []) {
		const field = method.name + '()'
		const prefix = (target as any)?.[ Symbol.toStringTag ] ?? ( target instanceof Function ? target.name : target )
		const key = prefix + ( '.' + method.name + '<>' )

		const fiber = new Atom( key, target, method, args )
		;( target as any ?? method )[ field ] = fiber
		 
	}
	override destructor() {
		super.destructor()
	}
}


function wire<Args extends any[]>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: Args) => any>) {
	//console.log(target, propertyKey, descriptor)
	const originalMethod = descriptor.value!; // ! означает что мы уверены что value не undefined
	//console.log('1',originalMethod.length	)
	
	const wrappedDescriptor = {
		...descriptor,
		value: function (this: any, ...args: any[]) {
			const atom = Atom.create(this, originalMethod, args);
			console.log(`[wire] ${propertyKey} called`, args);

			
			return originalMethod.apply(this, args as Args);
		}
	}



	// Восстанавливаем оригинальные свойства
	//console.log('2',originalMethod.length	)
	Object.defineProperty(wrappedDescriptor.value, 'name', { value: originalMethod.name, configurable: true });
	Object.defineProperty(wrappedDescriptor.value, 'length', { value: originalMethod.length, configurable: true });

	// Сохраняем оригинальную функцию в свойство originalMethod
	//Object.assign(wrappedMethod, { originalMethod: originalMethod })


	// Заменить метод в объекте на новый
	Reflect.defineProperty(target, propertyKey, wrappedDescriptor);

	return wrappedDescriptor;
}

// Новый класс с использованием Fiber
class Job  extends nObject{


	@wire
	f1(id?: string) {
		console.log('🟦 ReactiveJob.f1 called with:', id);
		return this.f2((id + '-f1'));
	}

	@wire
	f2(id: string) {
		console.log('🟦 ReactiveJob.f2 called with:', id);
		return this.f3() * 2; // зависит от atom
	}

	@wire
	f3() {
		console.log('🟦 ReactiveJob.f3 called');
		return 42;
	}

	 
}
const j1 = new Job();
j1[Symbol.toStringTag] = 'JobInstance';
//console.log(j1.f1)
console.log(j1.f1('test'));
console.log(j1.f1('test'));

console.log(j1)


// ===== ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ =====

