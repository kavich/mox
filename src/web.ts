
function wire<Args extends any[]>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: Args) => any>) {
	//console.log(target, propertyKey, descriptor)
	const originalMethod = descriptor.value!; // ! означает что мы уверены что value не undefined

	const wrappedMethod = {
		...originalMethod,
		value: function (this: any, ...args: any[]) {
			// Можно добавить логику отслеживания вызова, кеширования, зависимости и т.д.
			console.log(`[wire] ${propertyKey} called`);
			return originalMethod.apply(this, args as Args);
		}
	}



	// Восстанавливаем оригинальные свойства
	Object.defineProperty(wrappedMethod, 'name', { value: originalMethod.name, configurable: true });
	Object.defineProperty(wrappedMethod, 'length', { value: originalMethod.length, configurable: true });

	// Сохраняем оригинальную функцию в свойство originalMethod
	//Object.assign( wrappedMethod, {   originalMethod } )


	// Заменить метод в объекте на новый
	//Reflect.defineProperty(target, propertyKey, wrappedMethod);

	return wrappedMethod;
}

// Новый класс с использованием Fiber
class Job {


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
//console.log(j1.f1)
console.log(j1.f1('test'));
console.log(j1.f1('test'));

console.log(j1)


// ===== ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ =====

