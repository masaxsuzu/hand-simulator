import { Card } from "./Card";

export class Deck {
  private current: number;
  public cards: string[];
  constructor(n: number, cards: Card[]) {
    this.current = 0;
    this.cards = [];
    let x =
      cards.length > 0 ? cards.map((x) => x.number).reduce((a, b) => a + b) : 0;
    let rest = n - x;
    if (x > n) {
      rest = 0;
    }
    for (const card of cards) {
      for (let i = 0; i < card.number; i++) {
        this.cards.push(card.name);
      }
    }
    for (let i = 0; i < rest; i++) {
      this.cards.push("");
    }
  }

  public getAllCombinations(n: number) {
    return combinations(this.cards, n);
  }

  public shuffle() {
    let arr = this.cards;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.cards = arr;
    this.current = 0;
  }
  public draw(n: number): string[] {
    let list: string[] = [];
    const cards = Array.from(
      this.cards.map((v, i) => i).filter((i) => i >= this.current)
    );
    for (let index = 0; index < cards.length; index++) {
      if (index < n) {
        list.push(this.cards[this.current + index]);
      } else {
        this.current += index;
        break;
      }
    }
    return list;
  }
}

function combinations<T>(set: T[], k: number): T[][] {
  var i, j, combs, head, tailcombs;

  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > set.length || k <= 0) {
    return [];
  }

  // K-sized set has only one K-sized subset.
  if (k == set.length) {
    return [set];
  }

  // There is N 1-sized subsets in a N-sized set.
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = combinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}
