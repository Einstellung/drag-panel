import { putStream } from "./oss/OSSMethod";
import OSS from "ali-oss";

export interface OSSResult {
  name: string,
  res: OSS.NormalSuccessResponse,
  url: string
}

export async function uploadOSS(fileName: string, content: string) {
  const result = await putStream(fileName, content)
  const { name, url } = result as OSSResult
  return { name, url }
}