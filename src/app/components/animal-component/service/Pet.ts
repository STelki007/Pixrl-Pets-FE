import {PetStats} from '@components/animal-component/service/PetStats';

export class Pet {
  private readonly imagePath: string = "";
  private readonly animationCss: any = {};

  /**
   * Creates an animal
   *
   * imagePath and animation css are chosen based on the type
   * @param id reference id to the backend animal
   * @param userId reference id to the backend user
   * @param name name given by the user
   * @param type animal type
   * @param hunger current hunger
   */
  constructor(private id: number,
              private userId: string,
              private name: string,
              private type: PetType,
              private stats?: PetStats,
              private hunger?: number) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.type = type;
    this.hunger = hunger;
    this.imagePath = this.getImagePathByAnimal(this.type);
    this.animationCss = this.getAnimationCssByAnimal(this.type);
    if (stats != null) {
      this.stats = stats;
    }
  }

  public getImagePath(): string {
    return this.imagePath;
  }

  public getAnimationCss() {
    return this.animationCss;
  }

  public getName(): string {
    return this.name;
  }

  public getStats(): PetStats | undefined {
    return this.stats;
  }

  /**
   * This method saves all the animal image paths for easy use and change
   * @param animal AnimalType
   * @private
   */
  private getImagePathByAnimal(animal: PetType): string {
    switch (animal) {
      case PetType.chicken:
        return "Chicken/Chicken_01.png"
      case PetType.cow:
        return "Cow/Cow_01.png"
      case PetType.pig:
        return "Pig/Pig_01.png"
      case PetType.sheep:
        return "Sheep/Sheep_01.png"
      default:
        throw new Error(animal + " sprite sheet is not registered in the mapping method");
    }
  }

  public setAnimation(animation: PetAnimation){
    if(!this.animationCss.animations[Pet.petAnimationToString(animation)])
      throw new Error("Pet doesnt have animation '" + animation + "'\n" + this);
    this.getAnimationCss().current = this.animationCss.animations[Pet.petAnimationToString(animation)];
  }

  public static petAnimationToString( animation: PetAnimation):string{
    switch(animation){
      case PetAnimation.static:
        return "static"
      case PetAnimation.idle:
        return "idle";
      case PetAnimation.eat:
        return "eat";
      case PetAnimation.walk:
        return "walk";
    }
  }




  /**
   * This method saves the css for the image and animations,
   * due to different animation lengths or sprite sheet sizes those might need to be adjusted.
   *
   * The actual CSS class definitions are within the styles.css
   * @param animal
   * @private
   */
  private getAnimationCssByAnimal(animal: PetType): any {
    let animationCss: any = {
      image: "pixel-image-default",           //sprite sheet size has to be: 256 * 256
      icon: "pixel-icon-default",
      current: "animate-sprite-default-idle",
      animations: {
        static: "",
        idle: "animate-sprite-default-idle",  // 2 frames
        walk: "animate-sprite-default-walk",  // 8 frames
        eat: "animate-sprite-default-eat"     // 8 frames
      }
    };

    //replace specific css for exceptions
    switch (animal) {
      case PetType.chicken:
        animationCss.animations.walk = "animate-sprite-chicken-walk"
        break;
      case PetType.pig:
        animationCss.image = "pixel-image-pig";
        animationCss.animations.eat = "animate-sprite-pig-eat"
        break;
      case PetType.cow:
        animationCss.image = "pixel-image-cow";
        break;
      case PetType.sheep:
        animationCss.image = "pixel-image-sheep";
        break;
    }
    return animationCss;
  }

  /**
   * Get an animals for testing purposes.
   * No need for a backend connection!
   * @param animal
   */
  public static getTestAnimal(animal: PetType): Pet {
    switch (animal) {
      case PetType.chicken:
        return new Pet(0, "", "Chicken", PetType.chicken, {
          hunger: 10,
          weight: 10,
          socialSkill: 10,
          strengthSpeed: 10,
          humor: 10,
          curiosity: 10,
          tiredness: 10,
          intelligence: 10,
          confidence: 10,
          stamina: 10,
          dexterity: 10,
          affection: 10,
          moneyProduction: 10,
          hateful: 0,
        }, 100);
      case PetType.cow:
        return new Pet(0, "", "Cow", PetType.cow, {
          hunger: 10,
          weight: 10,
          socialSkill: 10,
          strengthSpeed: 10,
          humor: 10,
          curiosity: 10,
          tiredness: 10,
          intelligence: 10,
          confidence: 10,
          stamina: 10,
          dexterity: 10,
          affection: 10,
          moneyProduction: 10,
          hateful: 0,
        }, 100);
      case PetType.pig:
        return new Pet(0, "", "Pig", PetType.pig, {
          hunger: 10,
          weight: 10,
          socialSkill: 10,
          strengthSpeed: 10,
          humor: 10,
          curiosity: 10,
          tiredness: 10,
          intelligence: 10,
          confidence: 10,
          stamina: 10,
          dexterity: 10,
          affection: 10,
          moneyProduction: 10,
          hateful: 0,
        }, 100);
      case PetType.sheep:
        return new Pet(0, "", "Sheep", PetType.sheep, {
          hunger: 10,
          weight: 10,
          socialSkill: 10,
          strengthSpeed: 10,
          humor: 10,
          curiosity: 10,
          tiredness: 10,
          intelligence: 10,
          confidence: 10,
          stamina: 10,
          dexterity: 10,
          affection: 10,
          moneyProduction: 10,
          hateful: 0,
        }, 100);
      default:
        throw new Error(animal + " animal not defined in the getTestAnimal() method");
    }
  }
}

/**
 * enum of all animal types
 */
export enum PetType {
  none, chicken, cow, pig, sheep
}

/**
 * enum of all animations
 */
export enum PetAnimation{
  idle,walk,eat, static
}
