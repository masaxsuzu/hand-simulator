import { Deck } from "../../lib/deck/Deck";
import { HandSimulator } from "../../lib/deck/HandSimulator";
import { ActionTypes } from "../actionTypes";
import { Card, Config, SimulatorActionTypes } from "./types";

export interface State {
  result: string;
  numberToDraw: number;
  condition: string;
  cards: Card[];
  totalCardCount: number;
}
const initialState: State = {
  numberToDraw: 5,
  condition: `'カード1' <= 3`,
  cards: [
    {
      name: "カード1",
      number: 3,
    },
  ],
  totalCardCount: 40,
  result: "未実行",
};

export const simulatorReducer = (
  state = initialState,
  action: SimulatorActionTypes
): State => {
  switch (action.type) {
    case ActionTypes.editCondition:
      return {
        ...state,
        condition: action.condition,
      };
    case ActionTypes.editNumberToDraw:
      return {
        ...state,
        numberToDraw: action.number,
      };
    case ActionTypes.editDeckCards:
      return {
        ...state,
        cards: action.cards,
      };
    case ActionTypes.editDeckNumber:
      return {
        ...state,
        totalCardCount: action.number,
      };
    case ActionTypes.run:
      try {
        const deck = new Deck(state.totalCardCount, state.cards);
        const sim = new HandSimulator(deck);

        const ret = sim.compute(state.numberToDraw, state.condition);
        console.log(ret);
        return {
          ...state,
          result: `初手が条件に合致する確率は${(ret * 100).toPrecision(
            5
          )}%です。`,
        };
      } catch (e) {
        return {
          ...state,
          result: `${e}`,
        };
      }
    default:
      return {
        ...state,
      };
  }
};
