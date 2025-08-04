import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const visiblePages = getVisiblePages();
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* First page */}
      {showFirstLast && currentPage > Math.ceil(maxVisiblePages / 2) + 1 && (
        <>
          <Button
            variant="outline"
            onClick={() => onPageChange(1)}
            className="h-10 w-10 p-0"
          >
            1
          </Button>
          {currentPage > Math.ceil(maxVisiblePages / 2) + 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Previous button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className="h-10 w-10 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          onClick={() => onPageChange(page)}
          className="h-10 w-10 p-0"
        >
          {page}
        </Button>
      ))}

      {/* Next button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="h-10 w-10 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last page */}
      {showFirstLast &&
        currentPage < totalPages - Math.floor(maxVisiblePages / 2) && (
          <>
            {currentPage < totalPages - Math.floor(maxVisiblePages / 2) - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <Button
              variant="outline"
              onClick={() => onPageChange(totalPages)}
              className="h-10 w-10 p-0"
            >
              {totalPages}
            </Button>
          </>
        )}
    </div>
  );
};

export default Pagination;
