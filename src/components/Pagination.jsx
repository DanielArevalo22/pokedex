export default function Pagination({ next, prev, onPageChange, page }) {
    return (
        <div className="flex justify-center items-center space-x-4 mt-6 mb-3">
            <button
                disabled={!prev}
                onClick={() => onPageChange(prev, page - 1)}
                className={`px-4 py-2 rounded-lg shadow-sm ${prev
                        ? "bg-indigo-500 text-white hover:bg-indigo-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                Prev
            </button>

            <button
                disabled={!next}
                onClick={() => onPageChange(next, page + 1)}
                className={`px-4 py-2 rounded-lg shadow-sm ${next
                        ? "bg-indigo-500 text-white hover:bg-indigo-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                Next
            </button>
        </div>
    );
}
