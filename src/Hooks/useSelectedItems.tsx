import { useCallback, useMemo, useState } from "react";

export default function useSelectedItems<T>(
  origin: T[],
  options?: { keyExtractor?: (item: T) => string | number }
) {
  const [selectedItems, setSelectedItems] = useState<
    Record<number | string, T>
  >({});

  const itemKey = useCallback(
    (item: T) => {
      if (options?.keyExtractor) {
        return options.keyExtractor(item);
      }
      // @ts-ignore
      return item.id || "";
    },
    [options?.keyExtractor]
  );

  const toggleItem = useCallback(
    (item: T) => {
      console.log("heheheh");

      const isSelected = !!selectedItems[itemKey(item)];
      if (isSelected) {
        delete selectedItems[itemKey(item)];
      } else {
        selectedItems[itemKey(item)] = item;
      }
      setSelectedItems({ ...selectedItems });
    },
    [itemKey, selectedItems]
  );

  const handleItemSelect = useCallback(
    (item: T) => () => toggleItem(item),
    [toggleItem]
  );

  const isItemSelected = useCallback(
    (item: T) => !!selectedItems[itemKey(item)],
    [itemKey, selectedItems]
  );

  const selectAll = useCallback(() => {
    setSelectedItems(
      origin.reduce((acc: any, item: T) => {
        acc[itemKey(item)] = item;
        return acc;
      }, {})
    );
  }, [itemKey, origin]);

  const isAllSelected = useMemo(
    () => Object.keys(selectedItems).length === origin.length,
    [selectedItems, origin]
  );

  const toggleSelectAll = useCallback(() => {
    if (!isAllSelected) {
      selectAll();
    } else {
      setSelectedItems({});
    }
  }, [isAllSelected, selectAll]);

  const clearSelectedItems = useCallback(() => {
    setSelectedItems({});
  }, []);

  return {
    selectedItems,
    setSelectedItems,
    toggleItem,
    handleItemSelect,
    isItemSelected,
    selectAll,
    isAllSelected,
    toggleSelectAll,
    clearSelectedItems,
  };
}
