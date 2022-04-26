import * as React from "react";
import {
  TextField,
  Text,
  Label,
  SelectionMode,
  IColumn,
  DefaultButton,
  PrimaryButton,
} from "@fluentui/react";
import { Stack, IStackProps, IStackStyles } from "@fluentui/react/lib/Stack";
import { DetailsList } from "@fluentui/react";
import { useSelector, useDispatch, connect } from "react-redux";
import { RootState } from "../../store";
import { Card } from "../../store/sim/types";
import {
  editCards,
  editDeckNumber,
  editCondition,
  editNumberToDraw,
  simulate,
} from "../../store/sim/actions";

const stackStyles: Partial<IStackStyles> = { root: { minWidth: "350px" } };
const stackTokens = { childrenGap: 50 };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: "350px" } },
};

const columns: IColumn[] = [
  {
    key: "name",
    name: "カード名",
    fieldName: "name",
    minWidth: 100,
  },
  {
    key: "number",
    name: "カード枚数",
    fieldName: "number",
    minWidth: 100,
  },
];

interface IDocument {
  key: string;
  name: string;
  value: string;
  number: number;
}

const HomeComponent = (props: {
  array: IDocument[];
  csv: string;
  totalCardCount: string;
  condition: string;
  numberToDraw: string;
  result: string;
}) => {
  const dispatch = useDispatch();
  const localState = { csv: props.csv, condition: props.condition };

  const [csvFormat, setCSV] = React.useState(localState.csv);
  const [condition, setCondition] = React.useState(localState.condition);

  const onCardsChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const x = newValue ?? "";
    setCSV(x);
  };

  const onConditionChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const x = newValue ?? "";
    setCondition(x);
  };

  const onTotalCardNumberChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    let x = newValue ?? "0";
    dispatch(editDeckNumber(parseInt(x)));
  };

  const onCardNumberToDrawChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    let x = newValue ?? "0";
    dispatch(editNumberToDraw(parseInt(x)));
  };

  const onCardsValidation = (error: any, value: any) => {
    dispatch(editCards(value as string));
  };

  const onConditionValidation = (error: any, value: any) => {
    dispatch(editCondition(value as string));
  };

  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Stack {...columnProps}>
        <TextField
          placeholder=""
          value={props.totalCardCount}
          onChange={onTotalCardNumberChange}
          label="デッキ総数"
          autoAdjustHeight
        />
        <TextField
          placeholder=""
          value={props.numberToDraw}
          onChange={onCardNumberToDrawChange}
          label="初手枚数"
          autoAdjustHeight
        />
        <TextField
          placeholder=""
          value={csvFormat}
          validateOnFocusOut={true}
          onNotifyValidationResult={onCardsValidation}
          onChange={onCardsChange}
          label="カードリスト"
          multiline
          autoAdjustHeight
        />
        <TextField
          placeholder=""
          value={condition}
          validateOnFocusOut={true}
          onNotifyValidationResult={onConditionValidation}
          onChange={onConditionChange}
          label="条件"
          multiline
          autoAdjustHeight
        />
        <Stack.Item>
          <PrimaryButton
            width={50}
            text="実行"
            onClick={(e) => {
              dispatch(simulate());
            }}
          ></PrimaryButton>
        </Stack.Item>
      </Stack>
      <Stack {...columnProps}>
        <Label>結果</Label>
        <DetailsList
          columns={columns}
          selectionMode={SelectionMode.none}
          items={props.array}
        ></DetailsList>
        <Text>{props.result}</Text>
      </Stack>
    </Stack>
  );
};

export const Home = connect(mapStateToProps)(HomeComponent);

function mapStateToProps(state: RootState) {
  return {
    array: toRows(state.sim.cards),
    csv: toCSV(state.sim.cards),
    totalCardCount: state.sim.totalCardCount.toString(),
    condition: state.sim.condition,
    numberToDraw: state.sim.numberToDraw.toString(),
    result: state.sim.result,
  };
}

function toRows(cards: Card[]) {
  return cards.map((c, i) => {
    return {
      key: `${i}`,
      name: c.name,
      value: c.name,
      number: c.number,
    };
  });
}

function toCSV(cards: Card[]) {
  return cards.map((x) => `"${x.name}","${x.number}"`).join("\n");
}
