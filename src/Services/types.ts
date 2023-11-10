export type Condition =
  | {
      equal: string;
    }
  | {
      like: string;
    }
  | { in: string };
