import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { PAGE_PRODUCTS } from "../../app/constant";

export default function Pagination({
  page,
  setPage,
  handlePagination,
  totalPages,
}) {
  const totalPage = Math.ceil(totalPages / PAGE_PRODUCTS);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => handlePagination(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Previous
        </div>
        <div
          onClick={() => handlePagination(page < totalPage ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Next
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 ">
            Showing
            <span className="font-medium m-1">
              {(page - 1) * PAGE_PRODUCTS + 1}
            </span>
            to{" "}
            <span className="font-medium m-1">
              {/* {page * PAGE_PRODUCTS > totalPages
                  ? totalPages
                  : page * PAGE_PRODUCTS} */}
              {Math.min(page * PAGE_PRODUCTS, totalPages)}
            </span>
            of <span className="font-medium">{totalPages}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm cursor-pointer"
            aria-label="Pagination"
          >
            <div
              onClick={() => handlePagination(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {Array.from({ length: totalPage }).map((element, index) => (
              <div
                key={index}
                onClick={() => handlePagination(index + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-indigo-700 text-white"
                    : "text-gray-600"
                } px-4 py-2 text-sm font-semibold cursor:pointer text-greay-300 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 `}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={() =>
                handlePagination(page < totalPage ? page + 1 : page)
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
