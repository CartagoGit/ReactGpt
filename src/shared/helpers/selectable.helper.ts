import type { ISelectOption } from "../interfaces/index.interfaces";

export const arrayToSelectable = <T extends string>(
  array: readonly T[],
  options?: {
    capitalizeLabels?: boolean;
  }
): {
  objectSelectables: Record<T, ISelectOption>;
  listSelectables: ISelectOption[];
} => {
  const { capitalizeLabels = false } = options || {};
  let objectSelectables: Record<T, ISelectOption> = {} as any;

  const listSelectables: ISelectOption[] = array.map((element, index) => {
    if (capitalizeLabels)
      element = `${element.charAt(0).toUpperCase()}${element.slice(1)}` as T;
    const option = { label: element, id: index };
    objectSelectables[element as T] = option;
    return option;
  });

  return { objectSelectables, listSelectables };
};
