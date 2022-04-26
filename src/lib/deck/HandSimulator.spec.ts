import { Deck } from "./Deck";
import { HandSimulator } from "./HandSimulator";

test("9 / 40 ", () => {
  let cards = [
    { name: "x", number: 3 },
    { name: "y", number: 3 },
    { name: "z", number: 3 },
  ];
  let deck = new Deck(40, cards);
  let sim = new HandSimulator(deck);
  let got = sim.compute(5, `"x" >= 1 | "y" >= 1 | "z" >= 1`);
  expect(got).toBeGreaterThan(0.7417);
  expect(got).toBeLessThan(0.7418);
});

test("9 / 40 even if shuffled", () => {
  let cards = [
    { name: "x", number: 3 },
    { name: "y", number: 3 },
    { name: "z", number: 3 },
  ];
  let deck = new Deck(40, cards);
  deck.shuffle();
  let sim = new HandSimulator(deck);
  let got = sim.compute(5, `"x" >= 1 | "y" >= 1 | "z" >= 1`);
  expect(got).toBeGreaterThan(0.7417);
  expect(got).toBeLessThan(0.7418);
});

test("金謙で必ず引ける", () => {
  let cards = [{ name: "金謙", number: 7 }];
  let deck = new Deck(9, cards);
  let sim = new HandSimulator(deck);
  let got = sim.compute(3, `"金謙" >= 1`);
  expect(got).toBe(1);
});

test("金謙で多分引ける", () => {
  let cards = [{ name: "金謙", number: 6 }];
  let deck = new Deck(9, cards);
  let sim = new HandSimulator(deck);
  let got = sim.compute(3, `"金謙" >= 1`);
  expect(got).toBeGreaterThan(0.98);
  expect(got).toBeLessThan(0.99);
});

test("金謙の実践例", () => {
  let cards = [
    { name: "金謙", number: 3 },
    { name: "フラクトール", number: 3 },
    { name: "レスキューキャット", number: 3 },
    { name: "炎舞－「天キ」", number: 3 },
  ];
  let deck = new Deck(40, cards);
  let sim = new HandSimulator(deck);
  let got = sim.compute(
    5,
    `"フラクトール" >= 1 | "レスキューキャット" >= 1 | "炎舞－「天キ」" >= 1 `
  );
  expect(got).toBeGreaterThan(0.83);
  expect(got).toBeLessThan(0.84);
});

test("Drytron", () => {
  let deck = new Deck(40, [
    { name: "バンα", number: 3 },
    { name: "アルζ", number: 3 },
    { name: "エルγ", number: 1 },
    { name: "ルタδ", number: 1 },
    { name: "弁天", number: 3 },
    { name: "神巫", number: 3 },
    { name: "極超の竜輝巧", number: 3 },
    { name: "エマージェンシー・サイバー", number: 3 },
  ]);
  let hand = new HandSimulator(deck);
  let got = hand.compute(
    5,
    `
  ("バンα" >= 1 & "アルζ" >= 1) |
  ("極超の竜輝巧" >= 1 & "アルζ" >= 1) | ("エマージェンシー・サイバー" >= 1 & "アルζ" >= 1) |
  ("バンα" >= 1 & "極超の竜輝巧" >= 1) | ("バンα" >= 1 & "エマージェンシー・サイバー" >= 1) |
  
  ("バンα" >= 1 & "エルγ" >= 1) | 
  ("極超の竜輝巧" >= 1 & "エルγ" >= 1) | ("エマージェンシー・サイバー" >= 1 & "エルγ" >= 1) | 

  ("バンα" >= 1 & "ルタδ" >= 1) | 
  ("極超の竜輝巧" >= 1 & "ルタδ" >= 1) | ("エマージェンシー・サイバー" >= 1 & "ルタδ" >= 1) | 
  
  ("アルζ" >= 1 & "エルγ" >= 1) | 
  ("極超の竜輝巧" >= 1 & "エルγ" >= 1) | ("エマージェンシー・サイバー" >= 1 & "エルγ" >= 1) | 
  ("アルζ" >= 1 & "極超の竜輝巧" >= 1) | ("アルζ" >= 1 & "エマージェンシー・サイバー" >= 1) | 
  
  ("エルγ" >= 1 & "ルタδ" >= 1) | 
  ("極超の竜輝巧" >= 1 & "ルタδ" >= 1) | ("エマージェンシー・サイバー" >= 1 & "ルタδ" >= 1) | 

  ("バンα" >= 1 & "弁天" >= 1) |
  ("極超の竜輝巧" >= 1 & "弁天" >= 1) | ("エマージェンシー・サイバー" >= 1 & "弁天" >= 1) | 
  
  ("アルζ" >= 1 & "弁天" >= 1) | 
  
  ("アルζ" >= 1 & "神巫" >= 1) |
  ("極超の竜輝巧" >= 1 & "神巫" >= 1) | ("エマージェンシー・サイバー" >= 1 & "神巫" >= 1)
  `
  );
  expect(got).toBeGreaterThan(0.6956);
  expect(got).toBeLessThan(0.6957);
});
