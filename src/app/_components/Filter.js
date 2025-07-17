"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  console.log(searchParams)
  return (
    <div className="flex border-primary-800 justify-around w-[20rem] border-[0.01rem] p-1">
      <button
        className={`hover:bg-primary-900 px-4 py-1 ${
          searchParams.get("capacity") == "all" ? "bg-primary-900" : ""
        }`}
        onClick={() => handleFilter("all")}
      >
        All
      </button>
      <button
        className={`hover:bg-primary-900 px-4 py-1 ${
          searchParams.get("capacity") == "small" ? "bg-primary-900" : ""
        }`}
        onClick={() => handleFilter("small")}
      >
        Small
      </button>
      <button
        className={`hover:bg-primary-900 px-4 py-1 ${
          searchParams.get("capacity") == "medium" ? "bg-primary-900" : ""
        }`}
        onClick={() => handleFilter("medium")}
      >
        Medium
      </button>
      <button
        className={`hover:bg-primary-900 px-4 py-1 ${
          searchParams.get("capacity") == "full" ? "bg-primary-900" : ""
        }`}
        onClick={() => handleFilter("full")}
      >
        Full
      </button>
    </div>
  );
}

export default Filter;
