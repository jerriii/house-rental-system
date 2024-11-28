import { useState, useEffect } from "react";

const useUniqueDataFilter = (
  data: Record<string, unknown>[],
  filterString: string
) => {
  const [filteredData, setFilteredData] = useState<string[]>([]);

  useEffect(() => {
    // Create a Set to store unique affiliations
    const uniqueAffiliations: Set<string> = new Set();

    // Map through allCourses and add unique affiliations to the Set
    data.forEach((element) => {
      if (Array.isArray(element[filterString])) {
        // If it's an array, add its values to the Set
        element[filterString].forEach((value) => {
          uniqueAffiliations.add(value);
        });
      } else {
        // If it's not an array, assume it's a single value and add it to the Set
        uniqueAffiliations.add(element[filterString] as string);
      }
    });

    // Convert the Set back to an array and update the state
    setFilteredData(Array.from(uniqueAffiliations));
  }, [data, filterString]);

  return [filteredData];
};

export default useUniqueDataFilter;
