class imageInfo {
    constructor(avatar, banner){
      this.Avatar = avatar;
      this.Banner = banner;
    }
  }
  
  class attributes {
    constructor(color, species, occupation, personality, description){
      this.Color = color;
      this.Species = species;
      this.Occupation = occupation;
      this.Personality = personality;
      this.Description = description;
    }
  };
  
  class baseCritter{
    constructor(name, age, attributes, image_info){
      this.Name = name;
      this.Age = age;
      this.Attributes = attributes;
      this.ImageInfo = image_info;
    }
  };
  
  async function loadFileAndPrintToConsole(url) {
    try {
      const response = await fetch(url);
      const data = await response.text();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  
loadFileAndPrintToConsole('/./critters/000.00_Mason/000.00_Mason.json');