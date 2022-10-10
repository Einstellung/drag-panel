#### example1
```ts
async function run(){
  console.log('hello')
}
export default run
```

#### example2
```ts
async function run(ctx: any){
    const node = ctx.select("btn")
    node.on("click", () => {
        console.log('hello')
    })
}
export default run
```

#### example3
```ts
async function run(ctx: any){
    const btn = ctx.select("btn")
    const txt = ctx.select("txt")
    btn.on("click", () => {
        txt.memory("你好！")
    })
}
export default run
```