import { getQRCodeByShortCode } from "@/app/actions/qrcode";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const shortCode = (await params).shortCode;

  const qrcode = await getQRCodeByShortCode(shortCode);

  if (qrcode) {
    return NextResponse.json({ url: qrcode.uploadUrl });
  }

  return NextResponse.json({ url: null});
}
