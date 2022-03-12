import { Action } from "redux";

import { ActionTypes } from "../actionTypes";

export type Config = {
  numberToDraw: number;
  condition: string;
  cards: Card[];
  totalCardCount: number;
};

export interface Card {
  name: string;
  number: number;
}

interface EditConfig extends Action {
  type: typeof ActionTypes.editCondition;
  condition: string;
}
interface EditNumberToDraw extends Action {
  type: typeof ActionTypes.editNumberToDraw;
  number: number;
}

interface EditCardsAction extends Action {
  type: typeof ActionTypes.editDeckCards;
  cards: Card[];
}
interface EditDeckNumberAction extends Action {
  type: typeof ActionTypes.editDeckNumber;
  number: number;
}

interface RunSimulationAction extends Action {
  type: typeof ActionTypes.run;
}
export type SimulatorActionTypes =
  | EditConfig
  | EditNumberToDraw
  | EditCardsAction
  | EditDeckNumberAction
  | RunSimulationAction;
