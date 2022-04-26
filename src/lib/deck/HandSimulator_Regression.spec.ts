import { Deck } from "./Deck";
import { HandSimulator } from "./HandSimulator";

test("R1", () => {
  let cards = [{ name: "x", number: 1 }];
  let deck = new Deck(5, cards);
  let sim = new HandSimulator(deck);
  let got = sim.compute(2, `"x" < 1`);
  expect(got).toBe(0.6);
});
