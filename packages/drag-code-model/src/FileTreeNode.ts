import { FileNodeJSON, FileType } from "./types";

export class FileTreeNode {
  private type: FileType
  private fileName: string

  private children: FileTreeNode[] = []

  private content?: string
  private url?: string

  private dirty = false

  constructor(type: FileType, fileName: string) {
    this.type = type
    this.fileName = fileName
  }

  public getType() {
    return this.type
  }

  public setType(type: FileType) {  
    this.type = type 
  }

  public getFileName() {
    return this.fileName
  }

  public setFileName(fileName: string) {
    this.fileName = fileName
  }

  public getUrl() { 
    return this.url 
  }
  
  public setUrl(url: string) { 
    this.url = url 
  }

  public getContent() { 
    return this.content || "" 
  }


  public setContent(content: string) { 
    if(this.content !== content) {
      this.dirty = true
    }
    this.content = content 
  }

  public getChildren() { 
    return this.children 
  }

  public isDirty() {
    return this.dirty
  }

  public static FromJSON(obj: FileNodeJSON) {
    const node = new FileTreeNode(obj.type, obj.fileName)
    node.url = obj.url
    node.children = obj.children?.map(x => FileTreeNode.FromJSON(x)) || []
    return node
  }

  public toJSON(): FileNodeJSON {
    return {
      type: this.type,
      fileName: this.fileName,
      url: this.url || "",
      children: this.children.map(x => x.toJSON()) || []
    }
  }

  public add(fNode: FileTreeNode) {
    this.children.push(fNode)
  }

  public *find(predicate: (item: FileTreeNode) => boolean)
  : Generator<FileTreeNode> {
    if(predicate(this)) {
      yield this
    }

    for (let child of this.children) {
      yield *child.find(predicate)
    }
  }

  public saved() {
    this.dirty = false
  }
}