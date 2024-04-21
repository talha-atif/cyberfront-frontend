import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";

function LogsTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch Docker logs data from the Express API using Axios
    axios
      .get("http://localhost:5000/docker/logs")
      .then((response) => {
        setLogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Docker logs:", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const data = React.useMemo(() => logs, [logs]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Attack Type",
        accessor: "attackName",
      },
      {
        Header: "Target",
        accessor: "target",
      },
      {
        Header: "Team",
        accessor: "team",
      },
      {
        Header: "Success/Failure",
        accessor: (row) => (row.success === true ? "Success" : "Failure"),
      },
      {
        Header: "Date Time",
        accessor: (row) => `${row.date} ${row.time}`,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <main className="flex flex-col px-4 mt-4 w-full text-lg font-bold max-w-[960px] text-neutral-900 max-md:max-w-full">
      <h2 className="tracking-tighter whitespace-nowrap text-neutral-900 w-[960px] max-md:pr-5">
        System Logs
      </h2>
      <section className="flex flex-col py-px mt-5 text-sm leading-5 bg-white rounded-xl border border-solid border-zinc-200 text-slate-500 max-md:max-w-full overflow-y-auto h-[400px]">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-3 font-medium bg-white text-neutral-900 justify-start"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-t border-gray-200">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="px-4 py-3">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default LogsTable;
