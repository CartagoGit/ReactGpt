import { arrayToSelectable } from "../../shared/helpers/index.helpers";

export const voices = [
  "alloy",
  "echo",
  "fable",
  "onyx",
  "nova",
  "shimmer",
] as const;

export const {
  listSelectables: voicesListSelectables,
  objectSelectables: voicesSelectables,
} = arrayToSelectable(voices, { capitalizeLabels: true });
