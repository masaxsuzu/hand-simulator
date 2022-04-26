import { Expression } from "../mini-query-lang/Ast";
import { parse } from "../mini-query-lang/Parser";
import { Deck } from "./Deck";

export class HandSimulator {
  constructor(private deck: Deck) {}

  public compute(init: number, query: string): number {
    let expr = parse(query);
    if (
      init > 5 ||
      this.deck.cards.length > 40 ||
      this.deck.cards.includes("金謙")
    ) {
      return this.simulate(init, expr);
    } else {
      let patterns = this.deck.getAllCombinations(init);
      return this.countMatchedPatterns(expr, patterns);
    }
  }

  public simulate(init: number, expr: Expression): number {
    let matched = 0;
    for (let index = 0; index < 658008; index++) {
      this.deck.shuffle();
      if (this.draw(init, expr)) {
        matched++;
      }
    }
    return matched / 658008;
  }

  private draw(init: number, expr: Expression): boolean {
    let cards = this.deck.draw(init);
    let pattern = this.toMap(cards);

    if (expr.eval(pattern)) {
      return true;
    }
    if (cards.includes("金謙")) {
      let additional6 = this.deck.draw(6);
      let additionalPatterns = additional6.map((x) => {
        let c = Array.from(cards);
        c.push(x);
        return c;
      });
      return this.countMatchedPatterns(expr, additionalPatterns) != 0;
    } else {
      return expr.eval(pattern);
    }
  }

  private countMatchedPatterns(expr: Expression, patterns: string[][]): number {
    let all = patterns.length;
    let matched = 0;
    for (const pattern of patterns) {
      var m = this.toMap(pattern);
      if (expr.eval(m)) {
        matched++;
      }
    }
    return matched / all;
  }

  private toMap(pattern: string[]) {
    var m = new Map<string, number>();
    for (const card of this.deck.cards) {
      let n = m.get(card);
      if (n === undefined) {
        m.set(card, 0);
        n = 0;
      }
    }
    for (const p of pattern) {
      let n = m.get(p);
      if (n === undefined) {
        m.set(p, 0);
        n = 0;
      }
      m.set(p, n + 1);
    }
    return m;
  }
}
