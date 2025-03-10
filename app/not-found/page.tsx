import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <h2 className="text-4xl font-bold mb-4">404 - 页面未找到</h2>
      <p className="text-gray-600 mb-8">抱歉，您访问的页面不存在</p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
}
