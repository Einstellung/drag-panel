type StateTransferFunction = (...args: Array<any>) => void

export class StateMachine<
  S extends number,
  A extends number
> {
  private state: S
  private transferTable: Map<S, Map<A, [StateTransferFunction, S]>>
  constructor(initialState: S) {
    this.state = initialState
    this.transferTable = new Map()
  }

  private addTransfer(from: S, to: S, action: A, fn: StateTransferFunction) {
    if(!this.transferTable.has(from)) {
      this.transferTable.set(from, new Map())
    }

    const adjTable = this.transferTable.get(from)
    adjTable?.set(action, [fn, to])
  }
 
  public register = (
    from: S | S[],
    to: S,
    action: A,
    fn: StateTransferFunction
  ) => {
    if(Array.isArray(from)) {
      from.forEach(f => {
        this.addTransfer(f, to, action, fn)
      })
    } else {
      this.addTransfer(from, to, action, fn)
    }
  }

  public dispatch(action: A, ...data: any[]) {
    const adjTable = this.transferTable.get(this.state)

    const transfer = adjTable?.get(action)
    if(!transfer) {
      return false
    }

    const [fn, nextS] = transfer
    fn(...data)
    this.state = nextS

    while(this.dispatch(0 as A, ...data))

    return true
  }
}