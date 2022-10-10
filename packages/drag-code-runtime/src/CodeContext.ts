import { Page } from "@drag/meta"
import { CodeNodeProxy } from "./CodeNodeProxy"

export class CodeContext {

  private page: Page
  constructor(page: Page) {
    this.page = page
  }

  select(name: string) {
    if(!name) {
      return null
    }

    for (let p of this.page.getPageNode().bfs()) {
      if(p.getPassProps().get("name") === name) {
        return new CodeNodeProxy(p)
      }
    }

    return null
  }
}