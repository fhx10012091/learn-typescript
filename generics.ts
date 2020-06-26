function echo<T>(arg: T): T {
    return arg
}
const result = echo('str')
function wrap<T, U>(tuple: [T, U]): [U, T]{
    return [tuple[1], tuple[0]]
}
const result2 = wrap(['str', 123])

function echoWithArr<T>(arg: T[]): T[]{
    console.log(arg.length)
    return arg
}
echoWithArr([1,2,6])

interface IWithLength {
    length: number
}
// 只要传入的参数里面有length属性就可以
function echoWithLength<T extends IWithLength>(arg: T): T{
    console.log(arg.length)
    return arg
}
echoWithLength([])

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

