import { useMemo } from "react";
import { useSearchParams } from "react-router";

type Filter = {
  state?: string;
  sort_column?: string;
  sort_direction?: "asc" | "desc";
  limit?: number;
  page?: number;
}

const useFilters = () => {
  const [searchParams,setSearchParams] = useSearchParams();

  const filters:Filter = useMemo(() => ({
    state: searchParams.get("state") || "all",
    sort_column: searchParams.get("sort_column") || "add_time",
    sort_direction: (searchParams.get("sort_direction") as "asc" | "desc") || "desc",
    limit: parseInt(searchParams.get("limit") || "10"),
    page: parseInt(searchParams.get("page") || "1"),
  }), [searchParams]); // ✅ Solo cambiará si `searchParams` cambia

  const updateFilters=(newFilters:Partial<Filter>)=>{
    const updatedParams = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, String(value));
      }
    });

    setSearchParams(updatedParams);
  }

  return { filters, updateFilters };
}
export default useFilters;