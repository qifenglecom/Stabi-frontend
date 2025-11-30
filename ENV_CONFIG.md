# 环境配置说明

## 📁 环境文件

### 本地开发：`.env.local`
```bash
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_DEFAULT_CHAIN_ID=11155111
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Stabi
```

### 生产环境：`.env.production`
```bash
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_DEFAULT_CHAIN_ID=42161
NEXT_PUBLIC_SITE_URL=https://stabi.io
NEXT_PUBLIC_APP_NAME=Stabi
```

## 🚀 使用方式

### 本地开发
1. 创建 `.env.local` 文件（已在 .gitignore，不会提交）
2. 复制上面的开发环境配置
3. 运行 `npm run dev`
4. 自动连接到 Sepolia 测试网

### Vercel 部署
1. **不要**把 `.env.production` 提交到 Git
2. 在 Vercel 项目设置中配置环境变量：
   - Project Settings → Environment Variables
   - 添加上面生产环境的所有变量
   - 环境选择：Production
3. 部署后自动连接到 Arbitrum 主网

## 🔧 环境变量说明

| 变量名 | 说明 | 开发环境 | 生产环境 |
|--------|------|----------|----------|
| `NEXT_PUBLIC_ENV` | 环境标识 | development | production |
| `NEXT_PUBLIC_DEFAULT_CHAIN_ID` | 默认链ID | 11155111 (Sepolia) | 42161 (Arbitrum) |
| `NEXT_PUBLIC_SITE_URL` | 网站地址 | http://localhost:3000 | https://stabi.io |
| `NEXT_PUBLIC_APP_NAME` | 应用名称 | Stabi | Stabi |

## 📝 链ID对照

- `11155111` - Sepolia 测试网
- `42161` - Arbitrum One 主网
- `421614` - Arbitrum Sepolia 测试网（如需要）

## ⚠️ 注意事项

1. `.env.local` 只在本地生效，不会被 Git 追踪
2. `.env.production` 不要提交到 Git，在 Vercel 上配置
3. 所有环境变量必须以 `NEXT_PUBLIC_` 开头才能在浏览器访问
4. 修改环境变量后需要重启开发服务器
