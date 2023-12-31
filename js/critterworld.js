document.addEventListener("DOMContentLoaded", (event) => {
  displayCritters();
});

const display = document.querySelector("#display-data");

const nameList = [
  "000.00_Mason", 
  "001.00_Jube",
  "002.00_Skeep",
  "003.00_Koota"
];

const fetchSingle = async (url) => {
  const fetch_data = fetch(url);
  const result = await (await fetch_data).json().catch((error) => {
    throw error;
  });
  return result;
};

const fetchCritters = async () => {
  const baseUrl =
    "https://raw.githubusercontent.com/HannahFantasia/HannahFantasia-Site/main/critterworld/critters/";

  const results = await Promise.all(
    nameList.map(async (name) => {
      const curUrl = `${baseUrl}${name}/${name}.json`;

      try {
        const critter = await fetchSingle(curUrl);
        return critter;
      } catch (error) {
      }
    })
  );

  const critterObjectsValid = results.filter(
    (critter) => typeof critter !== "undefined"
  );
  return critterObjectsValid;
};

const setHTMLCollectionCSS = (collection, css) => {
  Array.from(collection).forEach((element) => {
    element.style.cssText = css;
  });
};

const refreshCSS = (critters) => {
  display.style.cssText = "display: flex; flex-wrap: wrap;";
  critters.forEach((critter) => {
    const currentClass = `container_${critter.Id}`;
    const containers = document.getElementsByClassName(currentClass);
    Array.from(containers).forEach((container) => {
      const { Color } = critter.Attributes;

      container.style.cssText = `
      border: 10px ridge #ccc;
      border-radius: 10px;
      transition: transform 0.3s, background 1s; /* Adjusted duration for the background animation */
      position: relative;
      cursor: pointer;
      margin: 2px;
      position: relative;
      background: ${Color}; /* Set background color */
  `;
  
  container.addEventListener("mouseover", () => {
      container.style.transform = "scale(1.05)";
  });
  
  container.addEventListener("mouseout", () => {
      container.style.transform = "rotate(0deg)";
  });

      container.addEventListener("mouseover", () => {
        container.style.transform = "scale(1.05";
      });

      container.addEventListener("mouseout", () => {
        container.style.transform = "rotate(0deg)";
      });
      

      const avatars = container.getElementsByClassName("avatar");
      setHTMLCollectionCSS(avatars, `
        border-collapse: separate;
        width: 100%;
        bottom: 30px;
      `);

      const textElements = container.querySelectorAll(".name");
      setHTMLCollectionCSS(textElements, `
        font-family: 'Press Start 2P', cursive;
        color: #fff;
        font-size: 14px;
        position: absolute;
        bottom: 5px;
        left: 5px;
        margin: 0;
        width: 90%;
        text-align: left;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; /* Black outline */
        z-index: 1;
      `);

      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 22.5px;
        background: ${Color};
        z-index: 0;
      `;
      

      container.appendChild(bar);

      container.addEventListener("click", () => {
        showModal(critter, Color);
      });
    });
  });
};

const showModal = (critter, color) => {
  const modal = document.createElement("div");
  modal.style.cssText = `
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  `;

  const modalContent = document.createElement("div");
  modalContent.style.cssText = `
    background-color: ${color};
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 10px;
  `;

  modal.appendChild(modalContent);

  const { Name, Age, Attributes, ImageInfo } = critter;
  const { Species, Occupation, Personality, Description, Story } = Attributes;
  const { Portrait } = ImageInfo;

  modalContent.innerHTML += `
    <img src="${Portrait}" alt="A pose of a ${Species}" style="margin-bottom: 10px;">
    <p style="margin-bottom: 5px;">Name: ${Name}</p>
    <p style="margin-bottom: 5px;">Species: ${Species}</p>
    <p style="margin-bottom: 5px;">Age: ${Age}</p>
    <p style="margin-bottom: 5px;">Occupation: ${Occupation}</p>
    <p style="margin-bottom: 5px;">Personality: ${Personality}</p>
    <p style="margin-bottom: 5px;">Description: ${Description}</p>
    <p style="margin-bottom: 5px;">Story: ${Story}</p>
  `;

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  document.body.appendChild(modal);
};


const displayCritters = async () => {
  const critters = await fetchCritters();
  const dataDisplay = critters
    .map((critter) => `
        <div class=container_${critter.Id}>
          <ul style="list-style-type: none; padding: 0; margin: 0;">
            <li class=name style="font-family: 'Press Start 2P', cursive; color: #fff; font-size: 14px; margin-bottom: 5px;">${critter.Name}</li>
            <li class=avatar><img src="${critter.ImageInfo.Avatar}" alt="They are a ${critter.Attributes.Species}"></li>
          </ul>
        </div>
      `)
    .join("");

  display.innerHTML = dataDisplay;
  refreshCSS(critters);
};