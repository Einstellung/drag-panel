import { CodeEventType } from "@drag/meta"

import { CodeNodeProxy } from "./CodeNodeProxy"

export type CodeRunntime = {
  type: CodeEventType,
  node: CodeNodeProxy
}

export type CodeEventHandler = (e?: CodeRunntime) => void