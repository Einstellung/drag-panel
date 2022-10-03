export class Rect {
  left:number
  top:number
  width : number
  height : number

  constructor(left : number, top : number, width : number, height:number){
    this.left = left 
    this.top = top 
    this.width = width
    this.height = height
  }

  private right() : number{
    return this.left + this.width
  }

  private bottom() : number{
    return this.top + this.height
  }

  private boundX(x : number){
    return this.left <= x && this.right() >= x
  }

  private boundY(y : number) : boolean{
    return this.top <= y && this.bottom() >= y 
  }

  /**
   * (x,y) 坐标是否在rect盒子里面
   * @param x 
   * @param y 
   */
  bound(x : number, y : number) : boolean{
    return this.boundX(x) && this.boundY(y)
  }

  centerX() {
    return this.left + this.width / 2
  }

  centerY() {
    return this.top + this.height / 2
  }

  static ZERO = new Rect(0, 0, 0, 0)
}
