import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useExpensesApi } from "../api/client.js";
import { useNavigate } from "react-router-dom";

export default function UploadCsvPage() {
   const { uploadCsv } = useExpensesApi();
   const [file, setFile] = useState<File | null>(null);
   const [status, setStatus] = useState<string | null>(null);

   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!file) return;

      try {
         setStatus("Uploading...");
         await uploadCsv(file);
         navigate(`/app/expenses`, { replace: true });
      } catch (err) {
         console.error(err);
         setStatus("Upload failed");
      }
   };

   return (
      <Stack spacing={3} sx={{ p: 3, maxWidth: 400 }}>
         <Typography variant="h5">Upload CSV</Typography>

         <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
               <Button variant="outlined" component="label">
                  Choose CSV File
                  <input
                     type="file"
                     accept=".csv"
                     hidden
                     onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;
                        setFile(selected);
                     }}
                  />
               </Button>

               {file && (
                  <Typography variant="body2" color="text.secondary">
                     Selected: {file.name}
                  </Typography>
               )}

               <Button type="submit" variant="contained" disabled={!file}>
                  Upload
               </Button>
            </Stack>
         </form>

         {status && (
            <Typography variant="body2" color="text.secondary">
               {status}
            </Typography>
         )}
      </Stack>
   );
}
