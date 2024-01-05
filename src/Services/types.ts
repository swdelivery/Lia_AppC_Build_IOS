export type Condition =
  | {
      equal: string | string[];
    }
  | {
      notEqual: string | string[];
    }
  | {
      like: string;
    }
  | { in: string[] }
  | { notIn: string[] }
  | {
      object: {
        [key: string]: Condition;
      };
    };
