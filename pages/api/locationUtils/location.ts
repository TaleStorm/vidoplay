import { config } from "./config"

export default (location, agent:string) => {
    console.log(location)
    let allow = false
    for (let allowedAgent of config.allowedAgents) {
        if (agent.match(new RegExp(allowedAgent))) {
          allow = true  
        }
    }
    if (allow) return allow
    const country = config.codes.find(country => country === location.country)
    if (!country) {
        return false
    }
    if (country === "RU" || country === "UA") {
      const city = config.cities.find(city => city.city_name === location.city)
      if (city) {
          return false
      }
    }
    return true
}