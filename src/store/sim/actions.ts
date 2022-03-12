import { ActionTypes } from "../actionTypes";
import { Config, SimulatorActionTypes, Card } from "./types";
import { parse } from "csv-parse/lib/sync";

export const editCondition = (condition: string): SimulatorActionTypes => {
  return {
    type: ActionTypes.editCondition,
    condition: condition,
  };
};

export const editNumberToDraw = (n: number): SimulatorActionTypes => {
  return {
    type: ActionTypes.editNumberToDraw,
    number: n,
  };
};

export const editCards = (csv: string): SimulatorActionTypes => {
  let x: string[][] = parse(csv, {
    columns: false,
    skip_empty_lines: true,
  });
  return {
    type: ActionTypes.editDeckCards,
    cards: mapToCards(x),
  };
};

function mapToCards(csv: string[][]): Card[] {
  let m = new Map<string, number>();
  for (const row of csv) {
    if (row.length < 2) {
      continue;
    }
    let name = row[0];
    let number = parseInt(row[1]);
    if (isNaN(number) || !isFinite(number)) {
      continue;
    }
    let n = m.get(name) ?? 0;
    if (m.has(row[0])) {
      m.set(row[0], n + number);
    } else {
      m.set(row[0], number);
    }
  }
  return Array.from(m).map((v, i) => ({ name: v[0], number: v[1] }));
}

export const editDeckNumber = (n: number): SimulatorActionTypes => {
  return {
    type: ActionTypes.editDeckNumber,
    number: isNaN(n) || !isFinite(n) ? 0 : n,
  };
};

export const simulate = (): SimulatorActionTypes => {
  return {
    type: ActionTypes.run,
  };
};
