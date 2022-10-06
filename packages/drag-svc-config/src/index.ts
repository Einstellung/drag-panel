import devConfig from "./config.dev"
import prodConfig from "./config.prod"

console.log("[svc-config]", process.env.NODE_ENV)
const svcURLConfig = 
  process.env.NODE_ENV === "production"
    ? prodConfig
    : devConfig

export default svcURLConfig