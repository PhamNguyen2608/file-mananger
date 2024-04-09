import AdminLayout from "@/layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
interface Image {
  public_id: string;
  resource_type: string;
  created_at: string;
  folder: string;
  url: string;
}

const Styles = styled.div`
  display: block;
  overflow-x: auto;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [folders, setFolders] = useState<{ id: string; name: string }[]>([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Public ID",
        accessor: "public_id" as const,
      },
      {
        Header: "Loại tệp tải lên",
        accessor: "resource_type" as const,
        Cell: ({ value }: { value: string }) => {
          let displayText = value;
          if (value === "image") {
            displayText = "Ảnh";
          } else if (value === "raw") {
            displayText = "Thư mục";
          }
          return <span>{displayText}</span>;
        },
      },

      {
        Header: "Ngày nộp",
        accessor: "created_at" as const,
        Cell: ({ value }: { value: string }) => {
          const date = new Date(value);
          const formattedDate = date.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });
          return <span>{formattedDate}</span>;
        },
      },
      {
        Header: "Tên chi hội",
        accessor: "folder" as const,
      },
      {
        Header: "Ảnh hoặc tệp",
        accessor: "url" as const,
        Cell: ({ row }: { row: { original: Image } }) => (
          <a href={row.original.url} target="_blank" rel="noopener noreferrer">
            {row.original.resource_type === "raw" ? "Xem tệp" : "Xem ảnh"}
          </a>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch("https://bao-cao-ooukqogq3-phamnguyen2608s-projects.vercel.app/api/folders");
        if (!response.ok) throw new Error("Failed to fetch folders");
        const data = await response.json();
        console.log("data: ", data);
        setFolders(data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, []);

  const fetchImages = async (folderName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://bao-cao-ooukqogq3-phamnguyen2608s-projects.vercel.app/api/folders/${encodeURIComponent(folderName)}`
      );
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      console.log("data: ", data);
      setImages(data);
    } catch (error) {
      console.error(error);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: images });

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    fetchImages(searchTerm.trim());
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="mb-4 flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nhập tên chi hội"
            className="border p-2 flex-1"
          />
          <button
            onClick={handleSearch}
            className="ml-2 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-150"
          >
            Tìm kiếm
          </button>
        </div>
        <div>
          <select
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 p-2 border bg-white rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Chọn Chi Hội" 
          >
            <option value="">Chọn Chi Hội</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.name}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div>Đang tìm kiếm chi hội...</div>
          ) : (
            <Styles>
              <table {...getTableProps()} style={{ margin: "20px" }}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
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
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Styles>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
