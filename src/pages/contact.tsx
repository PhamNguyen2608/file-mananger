import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import Layout from "@/components/Layout";
import Container from "@/components/Container";
import FormRow from "@/components/FormRow";
import FormLabel from "@/components/FormLabel";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import config from "../config.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    if (acceptedFiles[0] && acceptedFiles[0] instanceof Blob) {
      file.readAsDataURL(acceptedFiles[0]);
    } else {
      console.error("The dropped file is not a Blob.");
    }
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".png", ".svg", ".gif"],
        "application/msword": [".doc", ".docx"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/vnd.ms-excel": [".xls", ".xlsx"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
      },
    });

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  /**
   * handleOnSubmit
   */

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (typeof acceptedFiles[0] === "undefined") {
      toast.error("No file selected!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    // Lấy giá trị mã cán bộ từ form
    const staffId = (document.getElementById("staffId") as HTMLInputElement)
      .value;

    // Kiểm tra cấu hình Cloudinary
    const uploadPreset = config.CLOUDINARY_UPLOAD_PRESET;
    const apiKey = config.CLOUDINARY_API_KEY;
    const cloudName = config.CLOUDINARY_CLOUD_NAME;

    if (!uploadPreset || !apiKey || !cloudName || !staffId) {
      console.error("Missing Cloudinary configuration or staff ID!");
      return; // Hoặc xử lý lỗi phù hợp
    }

    // Cấu hình folder dựa trên mã cán bộ
    formData.append("file", acceptedFiles[0]);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", staffId); // Đặt tên folder là mã cán bộ

    // Thực hiện upload
    try {
      const results = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      // Khi upload thành công
      toast.success("Nộp báo cáo thành công!");
      console.log("results", results);
      setIsLoading(false);
    } catch (error) {
      // Khi upload thất bại
      toast.error("Nộp báo cáo thất bại!");
      console.error("Upload error:", error);
    }
  }

  return (
    <Layout>
      <Container>
        <h1 className="text-6xl font-black text-center text-slate-900 mb-20">
          NỘP BÁO CÁO
        </h1>
        {isLoading && (
          <div className="overlay">
            <div className="spinner"></div>
          </div>
        )}

        <form
          className="max-w-md border border-gray-200 rounded p-6 mx-auto"
          onSubmit={handleOnSubmit}
        >
          <FormRow className="mb-5">
            <FormLabel htmlFor="staffId">Mã Cán Bộ</FormLabel>
            <InputText id="staffId" name="staffId" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="name">Tên Cán Bộ</FormLabel>
            <InputText id="name" name="name" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="email">Địa chỉ email</FormLabel>
            <InputText id="email" name="email" type="email" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="message">Lời nhắn</FormLabel>
            <InputText id="message" name="message" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="image">Ảnh hoặc tệp tin(Word,Excel)</FormLabel>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Kéo thả ảnh hoặc tệp tin vào đây ...</p>
              ) : (
                <p>Kéo 'n' thả một số tệp vào đây hoặc nhấp để chọn tệp</p>
              )}
            </div>
          </FormRow>

          {preview && (
            <p className="mb-5">
              <img src={preview as string} alt="Upload preview" />
            </p>
          )}

          <Button>Nộp báo cáo</Button>
        </form>
        <ToastContainer />
      </Container>
    </Layout>
  );
}

export default Contact;
