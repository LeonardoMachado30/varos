// src/components/Table.tsx
export default function Table({
  data,
  columns,
}: {
  data?: any[];
  columns: any[];
}) {
  const _columns = columns || [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#131313] text-white text-left border-2 border-[#222729]">
            {_columns.map((column) => (
              <th
                key={column.key}
                className={`py-10 px-4 rounded-tl-lg ${column.className}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, index) => (
              <tr
                key={index}
                className="bg-[#131516] transition border-2 border-[#222729]"
              >
                {_columns.map((col) => (
                  <td className="py-10 px-4" key={col.key}>
                    {(() => {
                      const value = (row as any)[col.key];
                      if (value instanceof Date) {
                        const day = value.getDate().toString().padStart(2, "0");
                        const month = (value.getMonth() + 1)
                          .toString()
                          .padStart(2, "0");
                        const year = value.getFullYear();
                        return `${day}/${month}/${year}`;
                      }
                      return value ?? "-";
                    })()}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
