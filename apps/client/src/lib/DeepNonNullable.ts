export type DeepNonNullable<T> = T extends null | undefined
  ? never
  : T extends object
  ? {
      [K in keyof T]: DeepNonNullable<T[K]>;
    }
  : T;
