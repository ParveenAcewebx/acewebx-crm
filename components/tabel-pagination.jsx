import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';


export const TablePagination = ({
  totalRecord,
  page,
  setPage,
  length,
  type
}) => {
  const totalPages = Math.ceil(totalRecord / length) || 1;

  const renderPages = () => {
    const pages= [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); // First page

      if (page > 4) pages.push('dots');

      const start = Math.max(2, page - 2);
      const end = Math.min(totalPages - 1, page + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 3) pages.push('dots');

      pages.push(totalPages); // Last page
    }

    return pages.map((item, index) =>
      item === 'dots' ? (
        <PaginationItem key={`dots-${index}`}>
          <span className="px-2 text-gray-500">...</span>
        </PaginationItem>
      ) : (
        <PaginationItem key={item}>
          <PaginationLink
            className={`!rounded border border-color-grey shadow-none 
              hover:!text-black hover:bg-gray-200
              ${item === page ? 'bg-primary text-white' : ''}`}
            isActive={item === page}
            onClick={() => setPage(item, type)} // ← Pass type
          >
            {item}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  return (
    <Pagination className="mt-5 main-pagination">
      <PaginationContent  className="gap-2 cursor-pointer">
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
          onClick={page > 1 ? () => setPage(page - 1, type) : undefined}
            className={
              page === 1
                ? 'pointer-events-none !rounded border border-gray-300 opacity-50'
                : ''
            }
          />
        </PaginationItem>

        {/* Dynamic Pages */}
        {renderPages()}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
              onClick={page < totalPages ? () => setPage(page + 1, type) : undefined}
            className={
              page === totalPages
                ? 'pointer-events-none cursor-pointer !rounded !border border-gray-300 opacity-50 '
                : '!rounded !border border-gray-300'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
