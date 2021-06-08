import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const iconClass =
  'w-6 h-6 flex-shrink-0 opacity-50 hover:opacity-100 cursor-pointer';

const numberClass = active =>
  `py-1 px-3 rounded-md cursor-pointer ${
    active ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
  }`;

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => null,
}) => {
  const goToPrev = () => onPageChange(currentPage - 1);
  const goToNext = () => onPageChange(currentPage + 1);
  const goToPage = i => onPageChange(i);

  const renderNumber = i => {
    return (
      <span
        key={i}
        className={numberClass(currentPage === i)}
        onClick={() => goToPage(i)}
      >
        {i}
      </span>
    );
  };

  const renderDots = key => (
    <span key={key} className="py-1 px-3">
      ...
    </span>
  );

  const generatePages = (delta = 2) => {
    let pages = [],
      left = currentPage - delta,
      right = currentPage + delta,
      prev;

    // First page + dots
    pages.push(renderNumber(1));
    if (left - 1 > 1) {
      pages.push(renderDots(2));
    }
    // Generate middle pages + dots
    for (let i = left; i <= right; i++) {
      if (i < totalPages && i > 1) {
        pages.push(renderNumber(i));
        prev = i;
      }
    }
    // Last page + dots
    if (totalPages - prev > 1) {
      pages.push(renderDots(prev + 1));
    }
    pages.push(renderNumber(totalPages));

    return pages;
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Previous page */}
      <ChevronLeftIcon className={iconClass} onClick={goToPrev} />
      {/* Middle pages */}
      {currentPage >= 1 && totalPages >= currentPage ? generatePages() : null}
      {/* Next page */}
      <ChevronRightIcon className={iconClass} onClick={goToNext} />
    </div>
  );
};

export default Pagination;
