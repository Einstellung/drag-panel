import { Readable } from "stream";
import { client } from "./config";

export async function putStream(fileName: string, content: string) {
  console.log("fileName ", fileName)
  const stream = new Readable({
    encoding: "utf-8"
  })
  stream.push(content)
  stream.push(null)

  const result = await client.putStream(fileName, stream)
  return result
}