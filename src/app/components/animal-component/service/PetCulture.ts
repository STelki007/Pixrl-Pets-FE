import {PetCultureInterface} from '@components/animal-component/service/PetCultureInterface';

export class PetCulture {

   static chicken (): PetCultureInterface {
    return {
      country: "Japan",
      flag: "🇯🇵",
      description: "Aus Japan – eine zen-ruhige Henne mit Vorliebe für Haikus. Meditiert im Morgengrauen und bringt selbst Füchse zum Nachdenken.",
      traits: ["höflich", "poetisch", "präzise"],
      greeting: "Konnichiwa!",
      favoriteFood: "Reis",
      hobby: "Haikus schreiben"
    };
  }

  static pig (): PetCultureInterface{
    return {
      country: "USA (Texas)",
      flag: "🇺🇸",
      description: "Aus Texas – ein Stand-up-Schwein mit BBQ im Herzen und Pointen im Blut. Spricht schneller als es kaut und kennt jede Comedy-Bühne zwischen Houston und Dallas.",
      traits: ["laut", "witzig", "gesellig"],
      greeting: "Howdy!",
      favoriteFood: "Rippchen mit BBQ-Sauce",
      hobby: "Stand-Up-Comedy"
  };
  }

  static cow (): PetCultureInterface{
    return {
      country: "Russland",
      flag: "🇷🇺",
      description: "Aus Russland – eine nachdenkliche Kuh mit Dostojewski im Herzen. Sie spricht selten, aber wenn, dann über das Leben, das Leiden – und die wahre Bedeutung von Gras.",
      traits: ["philosophisch", "melancholisch", "tiefgründig"],
      greeting: "Zdravstvuyte!",
      favoriteFood: "Heu mit Wodka-Duft",
      hobby: "Russische Literatur lesen"
    };
  }

  static sheep (): PetCultureInterface{
    return {
      country: "England",
      flag: "🇬🇧",
      description: "Aus England – eine Schaf-Dame mit Teetasse in der Hufe, Oxford-Akzent und scharfem Verstand. Ihr sarkastischer Smalltalk ist legendär – besonders beim Stricken.",
      traits: ["charmant", "ironisch", "intelligent"],
      greeting: "Good day, dear!",
      favoriteFood: "Crumpets mit Minzgelee",
      hobby: "Tee trinken & stricken"
  };
  }
}

