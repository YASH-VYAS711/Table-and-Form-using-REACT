import React, { useState, useEffect, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../store/studentSlice.js";
const HighlightText = ({ text, query }) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-yellow-300">{part}</span>
    ) : (
      part
    )
  );
};

const StudentTable = ({ students,searchTerm,onEdit }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    setCurrentPage(0); // Reset to the first page when searchTerm changes
  }, [searchTerm]);

  const pageCount = Math.ceil(students.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    return students.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);
  }, [students, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };
  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "First Name", accessorKey: "firstName" },
      { header: "Last Name", accessorKey: "lastName" },
      { header: "Phone", accessorKey: "phone" },
      { header: "Email", accessorKey: "email" },
      { header: "Age", accessorKey: "age" },
      { header: "Gender", accessorKey: "gender" },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => onEdit(row.original)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit]
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="max-w-[1300px] w-[70%] max-h-[700px] min-h-[400px] h-auto flex-grow shadow-md rounded-lg overflow-auto">
        {paginatedData.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500 border-collapse border border-t-4 border-t-sky-600 border-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-3 border border-gray-400">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="bg-white hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => {
                    const value = cell.getValue();
                    const isHighlightable = ["id", "firstName", "lastName", "email", "phone"].includes(cell.column.id);
                    return (
                      <td key={cell.id} className="px-6 py-4 border border-gray-400">
                        {cell.column.id === "actions" ? (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        ) : isHighlightable ? (
                          <HighlightText text={String(value)} query={searchTerm} />
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 text-lg py-4">
            {searchTerm ? "No students found." : "No students added yet."}
          </p>
        )}
      </div>
      {pageCount > 1 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
          <ReactPaginate
            previousLabel={<span className="w-full h-full flex items-center justify-center">Previous</span>}
            nextLabel={<span className="w-full h-full flex items-center justify-center">Next</span>}
            breakLabel={<span className="w-full h-full flex items-center justify-center">...</span>}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            forcePage={currentPage}
            containerClassName="flex mt-4 space-x-2"
            pageClassName="w-10 h-10 flex items-center justify-center bg-blue-200 border rounded hover:bg-gray-300 cursor-pointer select-none"
            pageLinkClassName="w-full h-full flex items-center justify-center"
            activeClassName="bg-blue-500 text-white"
            previousClassName="w-20 h-10 flex items-center justify-center bg-blue-100 border rounded hover:bg-gray-300 cursor-pointer select-none"
            previousLinkClassName="w-full h-full flex items-center justify-center"
            nextClassName="w-20 h-10 flex items-center justify-center border bg-blue-100 rounded hover:bg-gray-300 cursor-pointer select-none"
            nextLinkClassName="w-full h-full flex items-center justify-center"
            breakClassName="w-10 h-10 flex items-center justify-center cursor-pointer select-none"
            breakLinkClassName="w-full h-full flex items-center justify-center"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default StudentTable;