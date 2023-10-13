import { TURNS } from "../constants";
export type Turn = typeof TURNS[keyof typeof TURNS];
export type Board = (Turn | null)[];
