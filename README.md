<p align="center">
  <img src="https://y.gtimg.cn/music/photo_new/T053M000004Amlfr4OcARI.jpg" alt="Logo" width="256" height="192">
  <h1 align="center">动态二维码生成工具 - 轻松管理您的二维码</h1>
</p>

<p align="center">一个基于 Next.js 开发的动态二维码生成工具，支持二维码的创建、编辑、删除。</p>
<p align="center">使用 S3 兼容的对象存储服务来存储二维码图片，通过 SQLite 数据库管理二维码数据。</p>

<p align="center">
  <a href="#界面">界面</a> •
  <a href="#功能特点">功能特点</a> •
  <a href="#环境变量">环境变量</a> •
  <a href="#数据库">数据库</a> •
  <a href="#部署说明">部署说明</a> •
  <a href="#开发说明">开发说明</a>
</p>

## 界面

![首页](https://y.gtimg.cn/music/photo_new/T053M000000KEX7321MYoR.png)

## 功能特点

- 🚀 快速生成动态二维码
- 📱 响应式界面设计
- ⭐ 深色模式支持
- 📦 Docker 容器化部署

## 环境变量

| 环境变量       | 解析                                    | 是否必须                |
| -------------- | --------------------------------------- | ----------------------- |
| S3_REGION      | S3 区域                                 | 是                      |
| S3_ACCESS_KEY  | S3 ACCESS KEY                           | 是                      |
| S3_SECRET_KEY  | S3 SECRET KEY                           | 是                      |
| S3_BUCKET      | S3 存储桶名称                           | 是                      |
| S3_ENDPOINT    | S3 服务端点                             | 是                      |
| S3_FILE_PREFIX | 文件前缀                                | 否                      |
| S3_DOMAIN      | S3 访问域名                             | 是                      |
| APP_DOMAIN     | 应用主域名                              | 是                      |
| NEXTAUTH_URL   | NextAuth 认证 URL，一般与应用主域名相同 | 是                      |
| AUTH_SECRET    | JWT 密钥                                | 是                      |
| QR_LOGO_URL    | 二维码中间的 LOGO                       | 否                      |
| USER_USERNAME  | 管理员用户名                            | 否（默认：admin）       |
| USER_PASSWORD  | 管理员密码                              | 否（默认：password123） |

## 数据库

自带一个 SQLite 文件作为数据库，数据存储在：`data` 主机目录下的 `sqlite.db` 文件

## 部署说明

### 启动镜像

```shell
docker run -d -p 3000:3000 \
-e S3_REGION=your-region \
-e S3_ACCESS_KEY=your-access-key \
-e S3_SECRET_KEY=your-secret-key \
-e S3_BUCKET=dynamic-qr-code \
-e S3_ENDPOINT=your-endpoint \
-e S3_FILE_PREFIX=dynamic-qr-code \
-e S3_DOMAIN=your-domain \
-e APP_DOMAIN=your-app-domain \
-e NEXTAUTH_URL=your-auth-url \
-e AUTH_SECRET=your-auth-secret \
-e USER_USERNAME=admin \
-e USER_PASSWORD=password123 \
-v $(pwd)/data:/app/data \
--name dynamic-qr-code sdrpsps/dynamic-qr-code
```

### 初始化数据库

首次部署后，访问 `/api/setup` 来初始化数据库，随后即可登录

## 开发说明

1. 克隆项目

```bash
git clone https://github.com/sdrpsps/dynamic-qr-code.git
```

2. 安装依赖

```bash
pnpm install
```

3. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填写相关配置

4. 本地数据库迁移

创建 `data` 文件夹，并执行 `pnpm run db:migrate`

5. 运行开发服务器

```bash
pnpm run dev
```
