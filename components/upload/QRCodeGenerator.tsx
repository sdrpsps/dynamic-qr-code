"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/stores/globalStore";
import { createQRCode, updateQRCode } from "@/app/actions/qrcode";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { FileCheck2Icon, XIcon } from "lucide-react";

export default function QRCodeGenerator() {
  const [qrName, setQrName] = useState("");
  const [qrcodeUrl, setQrcodeUrl] = useState("");
  const {
    uploadUrl,
    setUploadUrl,
    editingQRCode,
    setEditingQRCode,
    setShouldRefreshList,
  } = useGlobalStore();

  useEffect(() => {
    if (editingQRCode) {
      setQrName(editingQRCode.name);
      generateQRCodePreview(editingQRCode.shortCode);
    } else {
      setQrName("");
      setQrcodeUrl("");
    }
  }, [editingQRCode]);

  const generateQRCodePreview = async (shortCode: string) => {
    const qrcodeDataUrl = await fetch(`/api/qrcode-image/${shortCode}`)
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob));

    setQrcodeUrl(qrcodeDataUrl);
  };

  const handleSubmit = async () => {
    if (!uploadUrl) {
      alert("请先上传");
      return;
    }

    try {
      let result;
      if (editingQRCode) {
        // 更新现有二维码的映射关系和名称
        result = await updateQRCode(editingQRCode.id, {
          name: qrName,
          uploadUrl: uploadUrl, // 更新为新的 URL
        });

        if (result.success) {
          setUploadUrl("");
          setEditingQRCode(null);
          setShouldRefreshList(true);
          toast({
            title: "更新成功",
            description: "链接或名称已更新",
          });
        }
      } else {
        // 创建新二维码
        result = await createQRCode(qrName, uploadUrl);
        if (result.success && result.data) {
          await generateQRCodePreview(result.data.shortCode);
          setUploadUrl("");
          setShouldRefreshList(true);
          toast({
            title: "创建成功",
            description: "二维码已生成",
          });
        }
      }

      if (!result.success) {
        throw new Error(result.error);
      }

      setQrName("");
      setUploadUrl("");
    } catch (error) {
      console.error("操作失败:", error);
      toast({
        title: "操作失败",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-6 border-2 border-dashed rounded-lg dark:border-gray-600 dark:bg-gray-800">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={qrName}
          onChange={(e) => setQrName(e.target.value)}
          placeholder="输入二维码名称"
          className="flex-1 px-4 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <Button
          onClick={handleSubmit}
          disabled={!uploadUrl}
          className="bg-green-500 text-white dark:bg-green-700"
        >
          <FileCheck2Icon />
          {editingQRCode ? "更新链接" : "生成二维码"}
        </Button>
        {editingQRCode && (
          <Button
            variant="outline"
            onClick={() => {
              setUploadUrl("");
              setEditingQRCode(null);
            }}
          >
            <XIcon />
            取消
          </Button>
        )}
      </div>
      {qrcodeUrl && (
        <div className="text-center space-y-2">
          <Image
            src={qrcodeUrl}
            alt="二维码预览"
            width={256}
            height={256}
            className="mx-auto"
          />
          {editingQRCode && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              二维码保持不变，仅更新链接或名称
            </p>
          )}
        </div>
      )}
    </div>
  );
}
