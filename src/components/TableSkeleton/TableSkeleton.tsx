
const TableSkeleton: React.FC = () => {
  return (
    <div data-testid="event-table-skeleton" className="overflow-x-auto rounded-lg container-shadow animate-pulse">
      <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
        <thead className="bg-gray-500">
          <tr>
            <th className="py-1 px-1 lg:px-4 text-left hidden sm:table-cell">
              <div className="h-6 w-20 bg-gray-400 rounded"></div>
            </th>
            <th className="py-1 px-1 lg:px-4 text-left">
              <div className="h-6 w-20 bg-gray-400 rounded"></div>
            </th>
            <th className="py-1 px-1 lg:px-4 text-left hidden sm:table-cell">
              <div className="h-6 w-20 bg-gray-400 rounded"></div>
            </th>
            <th className="py-1 px-1 lg:px-4 text-left hidden lg:table-cell">
              <div className="h-6 w-20 bg-gray-400 rounded"></div>
            </th>
            <th className="py-1 px-1 lg:px-4 text-left hidden lg:table-cell">
              <div className="h-6 w-20 bg-gray-400 rounded"></div>
            </th>
            <th className="py-1 px-1 lg:px-4 text-left">
              <div className="h-6 w-20 bg-gray-400 rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(20)].map((_, index) => (
            <tr key={index} className="border-t border-gray-400">
              <td className="py-1 px-1 lg:px-4 hidden sm:table-cell">
                <div className="h-6 w-6 bg-gray-400 rounded"></div>
              </td>
              <td className="py-1 px-1 lg:px-4">
                <div className="h-6 w-40 bg-gray-400 rounded"></div>
              </td>
              <td className="py-1 px-1 lg:px-4 hidden sm:table-cell">
                <div className="h-6 w-20 bg-gray-400 rounded"></div>
              </td>
              <td className="py-1 px-1 lg:px-4 hidden lg:table-cell">
                <div className="h-6 w-24 bg-gray-400 rounded"></div>
              </td>
              <td className="py-1 px-1 lg:px-4 hidden lg:table-cell">
                <div className="h-6 w-24 bg-gray-400 rounded"></div>
              </td>
              <td className="py-1 px-1 lg:px-4">
                <div className="flex gap-4">
                  <div className="h-6 w-6 bg-gray-400 rounded"></div>
                  <div className="h-6 w-6 bg-gray-400 rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;