export function capitalizeFirstLetter(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

export function dataFilter(arrayFilterList: string[], filterType: string) {
  if (Array.isArray(filterType)) {
    return arrayFilterList.length === 0
      ? true
      : filterType.some((item) => arrayFilterList.includes(item));
  } else {
    return arrayFilterList.length === 0
      ? true
      : arrayFilterList.includes(filterType);
  }
}

export function handleFilter(
  value: string,
  setFilter: React.Dispatch<React.SetStateAction<string[]>>
) {
  value
    ? setFilter((filter) => [...filter, value])
    : setFilter((filterContent) => filterContent.filter((e) => e !== value));
}

export function removeItemFromArray(array: string[], item: string) {
  return array.filter((i) => i !== item);
}

// Get the ordinal suffix for a number eg: 1st, 2nd, 3rd, 4th, etc
export const getOrdinalSuffix = (n: number): string => {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  return n + (suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]);
};
