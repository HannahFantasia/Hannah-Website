let critter_objects = []
const base_url = "https://raw.githubusercontent.com/HannahFantasia/HannahFantasia-Site/main/critterworld/critters/"
const name_list = [
      "000.00_Mason",
      "001.00_Jube"
    ]

const fetchSingle = async (url) => {
    const strdata = fetch(url)
    const result = (await strdata).json()
    return result
  }
  
  const fetchCritters = async () => {

    name_list.forEach((name)=> {
      const cur_url = `${base_url}${name}/${name}.json`
  
      fetchSingle(cur_url).then((critter) => {
        critter_objects.push(critter)
      })
      .catch((error) => {
        console.log(error)
      })
  
    })
  
    return critter_objects
  }
  
  fetchCritters()
  console.log(critter_objects);