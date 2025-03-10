import { NextResponse } from "next/server";
import QRCode from 'qrcode';
import sharp from 'sharp';

// logo 缓存
let logoBuffer: Buffer | null = null;

async function getLogoBuffer() {
  if (logoBuffer) return logoBuffer;
  
  const logoUrl = process.env.QR_LOGO_URL;
  if (!logoUrl) return null;

  try {
    // 从远程获取 logo
    const res = await fetch(logoUrl);
    if (!res.ok) throw new Error('Failed to fetch logo');
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 处理 logo 图片
    logoBuffer = await sharp(buffer)
      .resize(100, 100, {
        fit: 'inside',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toBuffer();
    
    return logoBuffer;
  } catch (error) {
    console.error('Logo 处理失败:', error);
    return null;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const shortCode = (await params).shortCode;
    const shortUrl = `${process.env.APP_DOMAIN}/s/${shortCode}`;

    // 生成二维码
    const qrBuffer = await QRCode.toBuffer(shortUrl, {
      errorCorrectionLevel: 'H',
      width: 400,
      margin: 1,
    });

    // 获取处理后的 logo
    const logo = await getLogoBuffer();

    // 如果有 logo 则合成图片，否则直接返回二维码
    if (logo) {
      const qrWithLogo = await sharp(qrBuffer)
        .composite([
          {
            input: logo,
            gravity: 'center',
          }
        ])
        .png()
        .toBuffer();

      return new NextResponse(qrWithLogo, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new NextResponse(qrBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("生成二维码图片失败:", error);
    return new NextResponse(null, { status: 500 });
  }
}
