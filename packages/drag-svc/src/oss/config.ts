import OSS from "ali-oss"

export const client = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: "LTAI5t7ZSi7XpJnXZ4ACwJse",
  accessKeySecret: "FriiHLEucGlDU8Xf8n2Mu01jLGsKcT",
  bucket: "code-project-save"
})