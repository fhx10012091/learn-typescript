class Animal {
    // 字段 − 字段是类里面声明的变量。字段表示对象的有关数据。
    name: string;
    static kind: string[] = ['hello', 'nice']
    static isAnimal(a){
        return a instanceof Animal
    }
    constructor(name: string) {
        this.name = name
    }
    run() {
        return `${this.name} is running`
    }
}
const snake = new Animal('fang')
console.log(snake.run())
console.log(Animal.kind)
console.log(Animal.isAnimal(snake))
class Dog extends Animal {
    bark() {
        return `${this.name} is barking`
    }
}
const dog = new Dog('Tony')
console.log(dog.bark())
class Cat extends Animal {
    constructor(name: string){
        super(name)
        console.log(this.name)
    }
    run( ){
        return 'Meow, ' + super.run() 
        // 因为调用父类的方法与子类方法重复，所以使用super调用，否则使用this
    }
}

const cat = new Cat('maomao')
console.log(cat.run())

interface Radio {
    switchRedio(): void; // 使用了该接口的类必须有该方法，否则报错
}
interface Battery{
    switchRedio(): void;
    checkBatteryStatus();
}
class Car implements Radio{
    switchRedio() {

    }
}
class Cellphone implements Battery{
    switchRedio(){

    }
    checkBatteryStatus(){

    }
}