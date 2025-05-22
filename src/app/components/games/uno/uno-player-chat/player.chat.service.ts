import { Injectable } from '@angular/core';
import { UnoChatInterface } from '@components/games/uno/uno-player-chat/UnoChatInterface';

@Injectable({
  providedIn: 'root',
})
export class PlayerChatService {
  private botMoves: UnoChatInterface[] = [
    {
      id: '+4',
      responses: [
        {
          id: 1,
          player: "Glück gehabt.",
          bot: [
            "Glück ist was für Anfänger. Ich kalkuliere.",
            "Wenn du das für Glück hältst, hast du mein Spiel noch nicht verstanden."
          ]
        },
        {
          id: 2,
          player: "So ein mieser +4 Move...",
          bot: [
            "Vier Karten? Das war kaltblütige Präzision.",
            "Ich spiele nicht aufs Glück – ich spiele aufs Ergebnis."
          ]
        }
      ]
    },
    {
      id: '+2',
      responses: [
        {
          id: 1,
          player: "2 Karten Plus? Was für ein ekelhafter Move.",
          bot: [
            "Manche nennen es ekelhaft, ich nenne es effektiv.",
            "Tut weh? Dann war’s genau der richtige Zug."
          ]
        },
        {
          id: 2,
          player: "Du bist echt skrupellos.",
          bot: [
            "Ich spiele nicht nett – ich spiele zum Gewinnen.",
            "Nenn es, wie du willst – Hauptsache, es wirkt."
          ]
        }
      ]
    },
    {
      id: 'skip',
      responses: [
        {
          id: 1,
          player: "Anfängerfehler.",
          bot: [
            "Fehler? Ich nenne es Dominanz.",
            "Ich mach die Regeln, du spielst mit."
          ]
        },
        {
          id: 2,
          player: "Unfair!",
          bot: [
            "Das Leben ist unfair. Gewöhn dich dran.",
            "Unfair ist nur, wenn ich verliere – und das passiert selten."
          ]
        }
      ]
    },
    {
      id: 'colorChange',
      responses: [
        {
          id: 1,
          player: "Das passt genau zu meiner Hand.",
          bot: [
            "Natürlich tut es das. Ich spiele auch für dich mit.",
            "Das war Teil meiner Berechnung."
          ]
        },
        {
          id: 2,
          player: "Danke, das hilft mir sogar.",
          bot: [
            "Freu dich nicht zu früh. Ich hab noch mehr auf Lager.",
            "Das war nur der Anfang – der Rest trifft härter."
          ]
        },
        {
          id: 3,
          player: "Die Farbe? Ernsthaft?",
          bot: [
            "Ich kontrolliere das Spielfeld – inklusive deiner Hand.",
            "Manchmal trifft es die Falschen. Pech gehabt."
          ]
        }
      ]
    },
    {
      id: 'reverse',
      responses: [
        {
          id: 1,
          player: "Das bringt alles durcheinander.",
          bot: [
            "Genau das macht mich gefährlich.",
            "Ich drehe nicht nur die Richtung – ich drehe das Spiel."
          ]
        },
        {
          id: 2,
          player: "Jetzt wird’s chaotisch.",
          bot: [
            "Willkommen im Chaos – ich regiere hier.",
            "Unordnung ist meine Komfortzone."
          ]
        }
      ]
    }
  ];

  getBotMoves(): UnoChatInterface[] {
    return this.botMoves;
  }

  getPlayerMoves(): string[] {
    return this.botMoves
      .flatMap(move => move.responses)
      .map(response => response.player);
  }

  getMoveIdByPlayerResponse(playerMessage: string): string | undefined {
    const match = this.botMoves.find(move =>
      move.responses.some(response => response.player === playerMessage)
    );

    return match?.id;
  }

  getBotResponse(responseId: string, playerMessage: string): string | null {
    const cardResponses = this.botMoves.find(move => move.id === responseId);
    if (!cardResponses) return null;

    const matchedResponse = cardResponses.responses.find(
      response => response.player.toLowerCase() === playerMessage.toLowerCase()
    );

    if (!matchedResponse || matchedResponse.bot.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * matchedResponse.bot.length);
    return matchedResponse.bot[randomIndex];
  }

}
