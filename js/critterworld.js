document.addEventListener("DOMContentLoaded", (event) => {
    displayCritters()
});

const display = document.querySelector("#display-data");

const name_list = [
    "000.00_Mason",
    "001.00_Jube",
  ];

const fetchSingle = async (url) => {
  const fetch_data = fetch(url)
  const result = (await fetch_data).json()
                                   .catch((error) => {throw error})
  return result
}

const fetchCritters = async () => {
  const base_url = "https://raw.githubusercontent.com/HannahFantasia/HannahFantasia-Site/main/critterworld/critters/";

  results = name_list.map((name) => {
    const cur_url = `${base_url}${name}/${name}.json`;

    return fetchSingle(cur_url)
      .catch((error) => {
        console.log(`${name} was not found`);
      });
  });

  critter_objects = await Promise.all(results);
  critter_objects_valid = critter_objects.filter((critter) => typeof critter !== "undefined");
  return critter_objects_valid;
}

const setHTMLCollectionCSS = (collection, css) => {
  Array.from(collection).forEach((element) => {
    element.style.cssText = css
  })
}

const refreshCSS = (critters) => {
  critters.forEach((critter) => {
    const current_class = `container_${critter.Id}`
    const Containers = document.getElementsByClassName(current_class)
    Array.from(Containers).forEach((Container) => {
      const { Color } = critter.Attributes
      Container.style.cssText = `background-color: ${Color};`

      const Occupations = Container.getElementsByClassName("occupation")
      setHTMLCollectionCSS(Occupations,`background-color: #0000FF;`)
    })
  })
}
const displayCritters = async () => {
    const critters = await fetchCritters();
    let dataDisplay = critters.map((critter) => {

      const { Name, Id, Age, Attributes, ImageInfo } = critter;
      const { Species, Occupation, Personality, Description } = Attributes;
      const { Avatar} = ImageInfo;
      return `
      <div class=container_${Id}>
        <img class=avatar src="${Avatar}" alt="They are a ${Species}">
        <p class=name>Name: ${Name}</p>
        <p class=species>Species: ${Species}</p>
        <p class=age>Age: ${Age}</p>
        <p class=occupation>Occupation: ${Occupation}</p>
        <p class=personality>Personality: ${Personality}</p>
        <p class=description>: ${Description}</p>
      </div>`;
    }).join("");
  
    display.innerHTML = dataDisplay;
    refreshCSS(critters);
}