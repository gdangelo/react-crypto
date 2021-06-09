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
                className={`bg-gray-50 px-2 py-4 sm:px-4 text-sm sm:text-base whitespace-nowrap font-semibold capitalize ${
                  column?.align === 'right'
                    ? 'text-right'
                    : column?.align === 'left'
                    ? 'text-left'
                    : 'center'
                } ${index === 0 ? 'sticky sm:static left-0 z-10' : ''}`}
              >
                {column.label}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className="border-b">
        {rows.map(row => (
          <tr key={row.id} className="group">
            {columns
              ?.filter(column => !column.hidden)
              ?.map((column, index) => (
                <td
                  key={column.id}
                  className={`bg-gray-50 group-hover:bg-gray-100 border-t px-2 py-4 sm:px-4 sm:py-4 ${
                    column?.align === 'right'
                      ? 'text-right'
                      : column?.align === 'left'
                      ? 'text-left'
                      : 'center'
                  } ${index === 0 ? 'sticky left-0 z-10 sm:static' : ''}`}
                >
                  {column?.renderCell(row)}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
