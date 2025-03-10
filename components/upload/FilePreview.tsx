import { FileIcon } from "lucide-react";
import { useMemo } from "react";

interface FilePreviewProps {
  url: string;
}

export default function FilePreview({ url }: FilePreviewProps) {
  const fileType = useMemo(() => {
    const extension = url.split(".").pop()?.toLowerCase() || "";
    return {
      isImage: /^(jpg|jpeg|png|gif|webp|bmp|svg)$/.test(extension),
      isVideo: /^(mp4|webm|ogg|mov|avi)$/.test(extension),
      isAudio: /^(mp3|wav|ogg|m4a|aac)$/.test(extension),
      isPdf: extension === "pdf",
      name: url.split("/").pop() || "",
    };
  }, [url]);

  if (fileType.isImage) {
    return (
      <div className="w-full max-w-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt="图片预览"
          className="w-full max-h-[500px] rounded-lg"
        />
      </div>
    );
  }

  if (fileType.isVideo) {
    return (
      <div className="w-full max-w-md">
        <video src={url} controls className="w-full max-h-[500px] rounded-lg" />
      </div>
    );
  }

  if (fileType.isAudio) {
    return (
      <div className="w-full max-w-md">
        <audio src={url} controls className="w-full" />
      </div>
    );
  }

  if (fileType.isPdf) {
    return (
      <div className="w-full max-w-md">
        <iframe src={url} className="w-full h-[500px] rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-4 border rounded-lg">
      <FileIcon className="w-6 h-6 text-gray-500" />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {fileType.name}
      </a>
    </div>
  );
}
