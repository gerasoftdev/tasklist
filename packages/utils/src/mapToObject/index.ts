export const mapToObject = <T, V>(
  array: T[],
  callback: (item: T) => { key: string; value: V },
) =>
  array.reduce<Record<string, V>>((obj, item) => {
    const { key, value } = callback(item);

    return { ...obj, [key]: value };
  }, {});
