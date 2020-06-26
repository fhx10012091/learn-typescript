# Typescript

全局安装typescript `npm install -g typescript`

+ typescript 文件后缀名以`.ts`结尾
+ 把`ts`文件转为`js`文件，使用命令行 `tsc ..ts`

定义类型

```js
// 原始数据类型
let isDone: boolean = false
let age: number = 20
let binaryNumber: number = 0b1111 // 二进制写法
let firstName: string = 'N.S.N'
let message: string = `hello ${firstName}, age is ${age}`
let u: undefined = undefined
let n: null = null
let num: number = undefined // undefined是所有类型的子类型
```

```js
// 类型不确定
let notSure: any = 1
notSure = 'maybe it is a string'
notSure = true
notSure.myname
notSure.getName() 
```

联合类型 `let numberOrString: number | string = 245`

数组定义类型

+ `let arrOfNumbers: number[] = [1,5,6,7]`  数组内的值类型必须都是number，否则报错

+ `let arrOfNumber: Array<number> = [1,65,6,6,5]` 泛型

+ 元祖(Tuple)类型：也是属于数组类型中的一种

   元组类型指可以给数组中的每一个位置的元素指定类型，指定的类型与数组中的元素位置一一对应 

  `let user: [string, number] = ['N.S.N', 20] // 位置要与指定类型对应起来` 

Interface 接口（ ***行为和动作的规范，对批量方法进行约束*** ）

+ 对对象的形状（shape）进行描述
+ 对类（class） 进行抽象
+ Duck Typing （鸭子类型）

```typescript
// 像一个规范契约，规定了一个对象应该长成什么样
interface Person{
    readonly id: number; // 只读属性 不可修改
    name: string;
    age?: number // ? 代表可选属性
}
let fang: Person = {
    id: 1234,
    name: 'N.S.N',
    age: 20
}
```

函数是一等公民： 函数和其他类型的对象一样，都平等，可以作为参数，可以返回，对象属性，数组值，可以改变，可以赋值给其他变量

```typescript
function add(x: number, y: number, z?: number): number{
    return x + y + z
}
const add = function(x: number, y: number, z?: number): number{
    return x + y + z
}
const add2: (x: number, y: number, z?: number)=>number = add
```

```typescript
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
console.log(Animal.kind) // 静态属性
console.log(Animal.isAnimal(snake)) // 静态方法
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
```

修饰符 public private protected（子类能够继承，但对实例来说是私有的）

+ **public** :公有 在当前类里面、 子类 、类外面都可以访问
+ **protected**：保护类型 在当前类里面、子类里面可以访问 ，在类外部没法访问
+ **private** ：私有 在当前类里面可以访问，子类、类外部都没法访问 

+ **readonly**  : 只读  在当前类里面、 子类 、类外面都可以访问 但不能修改
+ **static** : 静态方法、 类可以访问 、实例无法访问

类与接口

```typescript
// 一种契约，能够约束内容
interface Radio {
    name: string; // 也可以定义属性
    switchRedio(): void; // 使用了该接口的类必须有该方法，否则报错
}
interface Battery{
    switchRedio(): void;
    checkBatteryStatus();
}
class Car implements Radio{
    name: string;
    switchRedio() {

    }
}
class Cellphone implements Battery{
    switchRedio(){

    }
    checkBatteryStatus(){

    }
}
```

枚举 enum

```typescript
const enum direction { // 常量枚举
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Right",
}
console.log(direction.Up) // 'Up'
const value = 'Up'
if(value === direction.Up){
    console.log('go up')
}
```

泛型 generics :  在定义函数、接口或者类的时候，不预先指定具体的类型，而是在使用的时候再指定类型。提高可重用性。 （可以看成是一个占位符）

```typescript
function echo<T>(arg: T): T {
    return arg
}
const result = echo('str')
function wrap<T, U>(tuple: [T, U]): [U, T]{
    return [tuple[1], tuple[0]]
}
const result2 = wrap(['str', 123])
```

```typescript
// 约束泛型
interface IWithLength {
    length: number
}
// 只要传入的参数里面有length属性就可以
function echoWithLength<T extends IWithLength>(arg: T): T{
    console.log(arg.length)
    return arg
}
echoWithLength('str')
echoWithLength({length: 14})
```

```typescript
// 类
class Queue<T> {
    private data = []
    push(item: T){
        return this.data.push(item)
    }
    pop(): T{
        return this.data.shift()
    }
}

const queue = new Queue<string>()
console.log(queue.push('ff'))
console.log(queue.pop().split(''))
```

```typescript
// 接口
interface KeyPair<T, U>{
    key: T,
    value: U
}
let kp1: KeyPair<number, string> = {
    key: 12,
    value: 'fhx'
}
let kp1: KeyPair<string, boolean> = {
    key: 'fang',
    value: true
}
```

```typescript
let arr: number[] = [1,23,3]
let arr: Array<number> = [1,6,6]
```

```typescript
// 函数
interface IPlus<T> {
    (a: T, b: T): T
}
function plus(a: number, b: number): number{
    return a + b
}

let p: IPlus<number> = plus
```

函数别名

```typescript
type sumType = (x: number, y: number) => number
function sum(x: number, y: number): number{
    return x + y
}
const sum2: sumType = sum

type NameResolver = () => string // 不是箭头函数 ，箭头后面只是函数的返回值
type NumberOrResolver = string | NameResolver // 联合类型
function getName(a: NumberOrResolver): string{
    if(typeof a === 'string'){
        return a
    }else{
        return a()
    }
}
```

类型断言

```typescript
function getLength(input: number | string): number{
    // const str = input as string  
    // if(str.length){
    //     return str.length
    // }else{
    //     const number = input as number
    //     return number.toString().length
    // }
    if((<string>input).length){
        return (<string>input).length
    }else{
        return (<number>input).toString().length
    }
}
```

声明文件

+ declare var jQuery  = (selector: string) => any























































