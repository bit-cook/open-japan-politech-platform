interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseHref: string;
  className?: string;
}

export function Pagination({ currentPage, totalPages, baseHref, className = "" }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const getHref = (page: number) => {
    const separator = baseHref.includes("?") ? "&" : "?";
    return `${baseHref}${separator}page=${page}`;
  };

  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`}>
      {currentPage > 1 && (
        <a
          href={getHref(currentPage - 1)}
          className="rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100"
        >
          前へ
        </a>
      )}
      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-gray-400">
            ...
          </span>
        ) : (
          <a
            key={page}
            href={getHref(page)}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              page === currentPage ? "bg-blue-600 text-white font-medium" : "hover:bg-gray-100"
            }`}
          >
            {page}
          </a>
        ),
      )}
      {currentPage < totalPages && (
        <a
          href={getHref(currentPage + 1)}
          className="rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100"
        >
          次へ
        </a>
      )}
    </nav>
  );
}
