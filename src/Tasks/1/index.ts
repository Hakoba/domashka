interface mathStruct {
  round(someFloat: number): number;
}

class Procent {
  //  возвращает значение  заданного процента pr от суммы sum
  static countPr(sum: number, pr: number): number {
    const result = (pr * sum) / 100;
    return result;
  }
  //  возвращает значение  итоговой суммы с учетом заданного процента pr от суммы sum
  static countSum(sum: number, pr: number): number {
    const margin = Procent.countPr(sum, pr);
    const sumWithPercent = margin + sum;
    return sumWithPercent;
  }
  //  возвращает   округленное до ближайшего целого значение  итоговой суммы с учетом заданного процента pr от суммы sum
  static countSumTrunc(
    sum: number,
    pr: number,
    roundSource: mathStruct = Math
  ): number {
    const sumWithPercent = Procent.countSum(sum, pr);
    return roundSource.round(sumWithPercent);
  }
}
class Controller {
  name: string;
  percent: number;
  _totalPrice: number;
  constructor(name: string, percent: number) {
    this.name = name;
    this.percent = percent;
    this._totalPrice = 0;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }
  set totalPrice(value: number) {
    this._totalPrice = Procent.countSumTrunc(value, this.percent);
  }
}

export { Procent, Controller };
