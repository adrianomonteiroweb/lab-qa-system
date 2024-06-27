import { useState } from "react";
import { useRouter } from "next/router";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        router.push({
          pathname: "/dashboard",
          query: { data: JSON.stringify(result.samples) },
        });
      } else {
        alert("Failed to upload file");
      }
    }
  };

  return (
    <div>
      <h1>Upload CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
