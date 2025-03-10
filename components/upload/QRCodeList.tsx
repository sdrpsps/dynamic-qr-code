"use client";

import { deleteQRCode, getAllQRCodes } from "@/app/actions/qrcode";
import { Button } from "@/components/ui/button";
import type { QRCode as QRCodeType } from "@/db/schema";
import { toast } from "@/hooks/use-toast";
import { useGlobalStore } from "@/stores/globalStore";
import { DownloadIcon, FilePenLineIcon, Loader, Trash2Icon } from "lucide-react";
import Image from "next/image";
import QRCode from "qrcode";
import { useCallback, useEffect, useState } from "react";

export default function QRCodeList() {
  const [qrcodes, setQrcodes] = useState<QRCodeType[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    setUploadUrl,
    setEditingQRCode,
    shouldRefreshList,
    setShouldRefreshList,
  } = useGlobalStore();

  const loadQRCodes = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAllQRCodes();
      if (result.success && result.data) {
        setQrcodes(result.data as QRCodeType[]);
      }
    } catch (error) {
      console.error("加载二维码列表失败:", error);
      toast({
        title: "加载失败",
        description: "获取二维码列表失败",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      if (shouldRefreshList) {
        setShouldRefreshList(false);
      }
    }
  }, [shouldRefreshList, setShouldRefreshList]);

  useEffect(() => {
    if (shouldRefreshList) {
      loadQRCodes();
    }
  }, [shouldRefreshList, loadQRCodes]);

  useEffect(() => {
    loadQRCodes();
  }, [loadQRCodes]);

  const handleEdit = (qrcode: QRCodeType) => {
    setEditingQRCode(qrcode);
    setUploadUrl(qrcode.uploadUrl);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const downloadQRCode = async (qrcode: QRCodeType) => {
    const shortUrl = `${window.location.origin}/s/${qrcode.shortCode}`;
    const qrcodeDataUrl = await QRCode.toDataURL(shortUrl, {
      width: 400,
      margin: 2,
    });

    const link = document.createElement("a");
    link.download = `${qrcode.name}.png`;
    link.href = qrcodeDataUrl;
    link.click();
  };

  const handleDelete = async (id: number) => {
    try {
      toast({
        title: "删除成功",
        description: "二维码已删除",
      });
      const result = await deleteQRCode(id);
      if (result.success) {
        setQrcodes((codes) => codes.filter((code) => code.id !== id));
        toast({
          title: "删除成功",
          description: "二维码已删除",
        });
      }
    } catch {
      toast({
        title: "删除失败",
        description: "删除二维码失败",
      });
    }
  };

  return (
    <div className="flex flex-col p-6 border-2 border-dashed rounded-lg space-y-4 dark:border-gray-600 dark:bg-gray-800">
      <h2 className="text-xl font-semibold">二维码列表</h2>
      {loading && (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      )}
      {qrcodes.length === 0 ? (
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">暂无二维码</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {qrcodes.map((qr) => (
            <div key={qr.id} className="p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700">
              <div className="w-full aspect-square bg-gray-100 dark:bg-gray-600 mb-4">
                <Image
                  src={`/api/qrcode-image/${qr.shortCode}`}
                  alt={qr.name}
                  width={256}
                  height={256}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex justify-between items-center mb-2">
                <p className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                  {qr.name}
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(qr)}
                >
                  <FilePenLineIcon />
                  编辑
                </Button>
              </div>

              <div className="flex justify-between mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadQRCode(qr)}
                >
                  <DownloadIcon />
                  下载
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(qr.id)}
                >
                  <Trash2Icon />
                  删除
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
