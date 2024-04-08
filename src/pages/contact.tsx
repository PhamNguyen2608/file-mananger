import { useCallback, useState } from 'react';
import { useDropzone} from 'react-dropzone';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
import FormRow from '@/components/FormRow';
import FormLabel from '@/components/FormLabel';
import InputText from '@/components/InputText';
import Button from '@/components/Button';
import  config  from '../config.json';


function Contact() {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;

    file.onload = function() {
      setPreview(file.result);
    }

    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/msword': ['.doc', '.docx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });
  

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  /**
   * handleOnSubmit
   */

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (typeof acceptedFiles[0] === 'undefined') return;

    const formData = new FormData();

    // Sử dụng giá trị từ config.json
    const uploadPreset = config.CLOUDINARY_UPLOAD_PRESET;
    const apiKey = config.CLOUDINARY_API_KEY;
    const cloudName = config.CLOUDINARY_CLOUD_NAME;

    if (!uploadPreset || !apiKey || !cloudName) {
        console.error("Cloudinary configuration is missing!");
        return; // Hoặc xử lý lỗi phù hợp
    }

    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', uploadPreset);

    // Sử dụng đường dẫn URL /auto/upload
    const results = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData
    }).then(r => r.json());

    console.log('results', results);
}

  
  
  

  return (
    <Layout>

      <Container>
        <h1 className="text-6xl font-black text-center text-slate-900 mb-20">
          Contact Us
        </h1>
        
        <form className="max-w-md border border-gray-200 rounded p-6 mx-auto" onSubmit={handleOnSubmit}>
          <FormRow className="mb-5">
            <FormLabel htmlFor="name">Name</FormLabel>
            <InputText id="name" name="name" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputText id="email" name="email" type="email" />
          </FormRow>
          
          <FormRow className="mb-5">
            <FormLabel htmlFor="message">Message</FormLabel>
            <InputText id="message" name="message" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="image">Image</FormLabel>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              }
            </div>
          </FormRow>

          {preview && (
            <p className="mb-5">
              <img src={preview as string} alt="Upload preview" />
            </p>
          )}

          <Button>Submit</Button>
        </form>

      </Container>
    </Layout>
  )
}

export default Contact;
