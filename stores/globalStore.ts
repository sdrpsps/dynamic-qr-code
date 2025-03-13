import { create } from "zustand";
import type { QRCode } from "@/lib/db/schema";

interface GlobalStore {
  uploadUrl: string;
  setUploadUrl: (url: string) => void;
  editingQRCode: QRCode | null;
  setEditingQRCode: (qrcode: QRCode | null) => void;
  shouldRefreshList: boolean;
  setShouldRefreshList: (should: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  uploadUrl: "",
  setUploadUrl: (url) => set({ uploadUrl: url }),
  editingQRCode: null,
  setEditingQRCode: (qrcode) => set({ editingQRCode: qrcode }),
  shouldRefreshList: false,
  setShouldRefreshList: (should) => set({ shouldRefreshList: should }),
}));
