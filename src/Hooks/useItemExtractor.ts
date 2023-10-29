import useSavedCallback from "./useSavedCallback";

export default function useItemExtractor<T>(
  key: (item: T, index?: number) => string,
  title: (item: T) => string = () => ""
) {
  const keyExtractor = useSavedCallback(key);

  const titleExtractor = useSavedCallback(title);

  return {
    keyExtractor: keyExtractor.current,
    titleExtractor: titleExtractor.current,
  };
}
