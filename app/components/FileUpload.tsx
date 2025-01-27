"use client";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

import { useState } from "react";



export default function FileUpload ({onSuccess}: {
    onSuccess: (res: IKUploadResponse) => void
}) {

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onError = (err: {message: string}) => {
        setError(err.message);
        setUploading(false);        
    }
    const handleSuccess = (res: IKUploadResponse) => {
        setUploading(false);
        setError(null);
        onSuccess(res);
    }

    const handleStartUpload = () => {
        setUploading(true);
        setError(null);
    };




    return (
        <div className="space-y-2">
            <IKUpload 
              fileName="product-image.png" 
              onError={onError} 
              onSuccess={handleSuccess}
              onUploadStart={handleStartUpload} 
              validateFile={(file: File) => {
                const validTypes = ["image/jpeg", "image/png", "image/webp"];
                if (!validTypes.includes(file.type)) {
                    setError("Only images are allowed");
                    return false;
                }

                if (file.size > 1024 * 1024 * 5) {
                    setError("File size should be less than 5MB");
                    return false;
                }

                return true;
              }}
            />    
        </div>
    )
}