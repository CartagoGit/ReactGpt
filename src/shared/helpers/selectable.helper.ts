import type { ISelectOption } from "../interfaces/index.interfaces";

export const arrayToSelectable = <T extends string>(
  array: readonly T[]
): {
  objectSelectables: Record<T, ISelectOption>;
  listSelectables: ISelectOption[];
} => {
  let objectSelectables: Record<T, ISelectOption> = {} as any;

  const listSelectables: ISelectOption[] = array.map((element, index) => {
    const option = { label: element, id: index };
    objectSelectables[element as T] = option;
    return option;
  });

  return { objectSelectables, listSelectables };
};
