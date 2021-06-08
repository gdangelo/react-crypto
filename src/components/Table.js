const Table = ({ columns = [], rows = [] }) => (
  <div className="overflow-x-scroll sm:overflow-x-auto">
    <table className="w-full">
      <thead className="border-t">
        <tr>
          {columns
            ?.filter(column => !column.hidden)
            ?.map((column, index) => (
              <th
                key={column.id}
                className={`bg-white px-2 py-4 sm:px-4 sm:py-6 text-sm sm:text-base cursor-pointer whitespace-nowrap text-${
                  column?.align ?? 'center'
                } ${index === 0 ? 'sticky left-0 z-10 sm:static' : ''}`}
              >
                {column.label}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className="border-b">
        {rows.map(row => (
          <tr key={row.id} className="hover:bg-gray-100">
            {columns
              ?.filter(column => !column.hidden)
              ?.map((column, index) => (
                <td
                  key={column.id}
                  className={`bg-white border-t text-${
                    column?.align ?? 'center'
                  } ${index === 0 ? 'sticky left-0 z-10 sm:static' : ''}`}
                >
                  <div className={`px-2 py-4 sm:px-4 sm:py-6`}>
                    {column?.renderCell(row)}
                  </div>
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
