export interface PlayerBotResponse {
  id: number;
  player: string;
  bot: string[];
}

export interface UnoChatInterface {
  id: string;
  responses: PlayerBotResponse[];
}
