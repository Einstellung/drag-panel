async function run(ctx: any){
    const btn = ctx.select("btn")
    const txt = ctx.select("txt")
    btn.on("click", () => {
        txt.memory("你好！")
    })
}
export default run