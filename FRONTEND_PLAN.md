# Stabi 前端 DApp 规划

## 1. 产品目标

- 面向普通 DeFi 用户和小白用户，提供「一键存入稳定币赚利息」的简单入口。
- 将复杂的协议（Aave / Compound / Curve / Yearn 等）隐藏在策略层，前端只暴露「稳健 / 平衡 / 激进」等易理解的选择。
- 提供清晰的资产与收益视图：当前资产、历史收益、底层协议分布、风险提示。

## 2. 技术栈与约束

- 框架：Next.js + React（使用 App Router + `src/` 目录）。
- 语言：TypeScript。
- Web3：wagmi + viem，用于钱包连接和合约交互。
- UI：TailwindCSS，后续可引入组件库（如 shadcn/ui）。
- 部署：优先考虑 Vercel / Netlify 等静态托管。

## 3. MVP 范围

### 3.1 核心功能

- 钱包连接与网络切换（支持 Arbitrum 等链）。
- 单一 Vault / 策略池的：
  - 存入 USDC。
  - 提现 / 赎回。
  - 查看当前持仓与收益（估值）。

### 3.2 页面结构（初版）

- 首页 / Dashboard：
  - 显示总资产、净收益、当前 APY 概览。
  - 显示主要策略池入口（稳健 / 平衡 / 激进）。
- 策略池列表页：
  - 展示各池的预期收益、风险标签、简要说明。
- 策略池详情页：
  - 显示用户在该池的资产、历史收益概要、底层协议分布。
  - 包含「存入 / 提现」操作入口。

## 4. 与合约层的对接

- 使用 viem/wagmi 读取 Vault 与 Strategy 的关键数据：
  - totalAssets / totalShares / sharePrice。
  - 用户份额、可赎回资产数量。
- 通过前端计算：
  - 近似 APY（基于 sharePrice 在时间窗口内的变化）。
  - 协议分布（根据各 Strategy 的 estimatedTotalAssets）。

## 5. 迭代路线

1. **MVP 阶段**
   - 打通钱包连接 + 单 Vault 存入/提现 + 基础资产展示。
   - 前端仅提供一个「稳健策略池」入口，对接当前合约 MVP（例如 Aave v3 USDC）。

2. **功能扩展阶段**
   - 增加平衡 / 激进策略池，支持多池切换与列表展示。
   - 加入更丰富的数据可视化（收益曲线、协议分布图等）。

3. **体验与教育增强**
   - 增加风险说明模块，用简洁语言解释底层协议与策略风险。
   - 优化交互细节（加载状态、错误提示、交易进度反馈等）。

4. **后续方向**
   - 多链支持：在前端抽象链配置，方便后续扩展到更多 L2 或主网。
   - 更复杂策略配置与个性化偏好（例如风险滑块、自动再平衡偏好等）。

## 6. 部署约定（Vercel）

- 不使用自定义 Node.js 服务器，不在项目中引入 `express` / `http.createServer` 这类手动启动服务的代码。
- 所有后端逻辑统一通过 Next.js `app` 路由（如 `route.ts`）或 Server Components 来实现，方便映射到 Vercel Functions。
- 环境变量约定：
  - 本地使用 `.env.local`，该文件不提交到 Git。
  - 线上通过 Vercel Dashboard 配置同名环境变量，代码通过 `process.env.*` 访问。
- 保持默认构建命令：`npm run build` 调用 `next build`，不做自定义构建脚本。
- 避免在客户端组件中使用 Node-only 能力（如 `fs`、`path` 等），需要时放到 Server Components 或 API Route 中。
