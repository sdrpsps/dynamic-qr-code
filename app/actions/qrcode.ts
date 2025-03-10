'use server'

import { db } from '@/db'
import { qrcodes } from '@/db/schema'
import { eq } from 'drizzle-orm'

// 生成随机字符串的函数
const generateRandomCode = (length: number = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function createQRCode(name: string, uploadUrl: string) {
  try {
    const shortCode = generateRandomCode()
    
    const [newQRCode] = await db.insert(qrcodes).values({
      shortCode,
      uploadUrl,
      name: name || '未命名二维码',
    }).returning()

    return { success: true, data: newQRCode }
  } catch (error) {
    console.error('创建二维码失败:', error)
    return { success: false, error: '创建二维码失败' }
  }
}

export async function getQRCodeByShortCode(shortCode: string) {
  try {
    const [qrcode] = await db
      .select()
      .from(qrcodes)
      .where(eq(qrcodes.shortCode, shortCode))
      .limit(1)

    return qrcode
  } catch (error) {
    console.error('获取二维码失败:', error)
    return null
  }
}

export async function getAllQRCodes() {
  try {
    const codes = await db
      .select()
      .from(qrcodes)
      .orderBy(qrcodes.createdAt)
      
    return { success: true, data: codes }
  } catch (error) {
    console.error('获取二维码列表失败:', error)
    return { success: false, error: '获取二维码列表失败' }
  }
}

export async function updateQRCode(id: number, data: {
  name?: string
  uploadUrl?: string
}) {
  try {
    const [updated] = await db
      .update(qrcodes)
      .set({ 
        ...data,
        updatedAt: new Date()
      })
      .where(eq(qrcodes.id, id))
      .returning()
    
    return { success: true, data: updated }
  } catch (error) {
    console.error('更新二维码失败:', error)
    return { success: false, error: '更新二维码失败' }
  }
} 

export async function deleteQRCode(id: number) {
  try {
    await db.delete(qrcodes).where(eq(qrcodes.id, id))
    return { success: true }
  } catch (error) {
    console.error('删除二维码失败:', error)
    return { success: false, error: '删除二维码失败' }
  }
}