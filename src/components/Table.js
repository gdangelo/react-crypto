const Table = ({ columns = [], rows = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.label} className="px-4 py-6 border-t">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map(row => (
          <tr key={row.id} className="hover:bg-gray-100">
            {columns.map(column => (
              <td className="px-4 py-6 whitespace-nowrap border-t">
                {column?.renderCell(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
