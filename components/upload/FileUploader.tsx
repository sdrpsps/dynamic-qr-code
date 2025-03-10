"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { useGlobalStore } from "@/stores/globalStore";
import { useRef, useState } from "react";
import FilePreview from "./FilePreview";
import { UploadIcon } from "lucide-react";

export default function FileUploader() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadUrl, setUploadUrl, editingQRCode } = useGlobalStore();

  const uploadFile = async (file: File) => {
    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || "application/octet-stream",
        }),
      });

      if (!res.ok) {
        throw new Error("获取上传URL失败");
      }

      const { uploadUrl, fileUrl } = await res.json();

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progressPercent = Math.round((event.loaded * 100) / event.total);
            setProgress(progressPercent);
          }
        };

        xhr.upload.onload = () => {
          resolve(null);
        };

        xhr.upload.onerror = () => {
          reject(new Error("上传失败"));
        };

        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
        xhr.send(file);
      });

      setUploading(false);
      setProgress(0);
      toast({
        title: "上传成功",
        description: "文件已上传",
      });

      return fileUrl;
    } catch (error) {
      setUploading(false);
      setProgress(0);
      console.error("上传错误:", error);
      toast({
        title: "上传失败",
        description: error instanceof Error ? error.message : "请重试",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = await uploadFile(file);
    if (fileUrl) {
      setUploadUrl(fileUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-items-center p-6 border-2 border-dashed rounded-lg dark:border-gray-600 dark:bg-gray-800">
      <div className="flex flex-col items-center gap-4 w-full">
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <Button
          className="bg-blue-500 text-white w-full dark:bg-blue-700 dark:text-gray-200"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <UploadIcon />
          {uploading ? "上传中..." : `${editingQRCode ? "更新" : "上传"}文件`}
        </Button>

        {uploading && (
          <div className="w-full space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-gray-500 text-center">{progress}%</p>
          </div>
        )}

        {uploadUrl && <FilePreview url={uploadUrl} />}
      </div>
    </div>
  );
}
