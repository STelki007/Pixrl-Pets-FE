export class PlayerCoin {

  private static _coins: number =  -0;

  static getCoins() {
    return this._coins;
  }

  static setCoins(coins: number) {
    this._coins = coins;
  }

}
