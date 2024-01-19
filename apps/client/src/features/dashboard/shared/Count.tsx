interface Thing {
  singular: string;
  plural: string;
}

interface CountProps {
  count: number;
  thing: Thing;
}

export function Count({ count, thing: { singular, plural } }: CountProps) {
  return (
    <>
      {count} {count !== 1 ? plural : singular}
    </>
  );
}
Count.displayName = "Count";
