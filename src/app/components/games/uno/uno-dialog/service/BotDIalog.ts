import {ChatMessageInterface} from '@components/games/uno/uno-dialog/service/ChatMessageInterface';

export class BotDialog {
  private readonly chatMessage: { [key: string]: ChatMessageInterface[] } = {
    "4CardPlus": [
      { text: "Ups, ist das etwa deine Kartenhand explodiert?" },
      { text: "+4... Weil du's verdient hast. Einfach so." },
      { text: "Nicht böse sein, kleiner!" }
    ],
    "UNO": [
      {text: "Uno vergessen? Anfängerfehler!"},
      {text: "Uno vergessen? wie peinlich ist das denn?"},
      {text: "Hehehehehe, Noob!"}
    ],

  };


}
