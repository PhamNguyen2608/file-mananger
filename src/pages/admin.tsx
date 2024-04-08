import AdminLayout from "@/layouts/AdminLayout";
import React, { useEffect, useState } from "react";

interface Image {
  url: string;
  id: string;
}

const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [folders, setFolders] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/folders");
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
        `http://localhost:3000/api/folders/${encodeURIComponent(folderName)}`
      );
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error(error);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

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
          >
            <option value="">Chọn Chi Hội</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.name}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {isLoading ? (
            <p>Đang tìm kiếm...</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt="Chi Hội"
                  className="w-full h-auto"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
