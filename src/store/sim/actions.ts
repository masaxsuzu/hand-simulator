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
  return {
    type: ActionTypes.editDeckCards,
    csv: csv
  };
};

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
