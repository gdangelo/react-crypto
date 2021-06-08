const Table = ({ columns = [], rows = [] }) => (
  <table className="w-full">
    <thead className="border-t">
      <tr>
        {columns.map(column => (
          <th
            key={column.id}
            className={`px-4 py-6 cursor-pointer whitespace-nowrap text-${
              column?.align ?? 'center'
            }`}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="border-b">
      {rows.map(row => (
        <tr key={row.id} className="hover:bg-gray-100">
          {columns.map(column => (
            <td
              key={column.id}
              className={`px-4 py-6 whitespace-nowrap border-t text-${
                column?.align ?? 'center'
              }`}
            >
              {column?.renderCell(row)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
