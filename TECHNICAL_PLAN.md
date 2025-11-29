# Stabi 技术实现方案（Technical Plan）

## 1. 总体概览

- **产品定位**：面向小白和普通 DeFi 用户的稳定币收益层（USDC / USDT / BUSD），提供一键存入、自动复投、策略分层、收益与风险可视化。
- **整体架构**：前端 Web DApp + 后端（可选轻服务层）+ 智能合约（Vault & Strategy）+ 第三方协议（Aave / Compound / Curve / Yearn 等）+ 数据与预言机服务。
- **首期目标**：
  - 实现单链（例如：以太坊主网或某 L2）的稳定币 Vault + 三个策略池（稳健 / 平衡 / 激进）。
  - 提供最小可用的前端 DApp：存入、提现、查看收益与资金分布。

> 本文档将作为后续开发和评审的技术蓝图，优先保证可落地与可迭代性，而非一次性定死所有细节。

---

## 2. 系统架构设计

### 2.1 架构组成

- **前端 DApp**
  - 技术栈：React / Next.js（SSR 可选）+ wagmi / viem + TailwindCSS。
  - 职责：钱包连接、交易发起、数据展示（APY、历史收益、资金分布、风险提示）。

- **智能合约层**
  - `Vault` 合约：负责用户存取款、份额计算、收益计入、费用扣除。
  - `Strategy` 合约：对接具体协议（Aave、Compound、Curve、Yearn）并执行存取、复投、rebalancing。
  - `Router / Controller` 合约：管理多个策略、配置权重、执行资金分配和动态调整。
  - `FeeManager`（可合并在 Vault / Controller 中）：管理管理费与绩效费逻辑。

- **后端 / 服务层（可选，首版可弱化）**
  - 提供聚合数据 API：如历史收益曲线、策略表现统计、风险指标缓存等。
  - 可使用 Node.js + 简单 REST API 或 serverless 方案。

- **第三方依赖**
  - 蓝筹协议：Aave / Compound / Curve / Yearn 等。
  - 价格与预言机：Chainlink 或协议自身价格接口。

### 2.2 数据流（资金流 & 信息流）

- **资金流**
  1. 用户将稳定币（USDC / USDT / BUSD）存入对应策略池的 `Vault`。
  2. `Vault` 通过 `Router/Strategy` 将资金分配至底层协议（Aave / Compound / Curve / Yearn）。
  3. 底层协议产生收益（利息 / 奖励 Token），由 `Strategy` 定期执行复投操作。
  4. 用户提现时，根据其持有份额与当前 Vault 总资产计算可得稳定币数量（扣除相关费用）。

- **信息流**
  - 合约内可直接读取的：总资产、总份额、单份额价值（价格）、费用参数等。
  - 前端 / 服务层计算的：APY、历史收益曲线、协议分布、策略历史表现与波动。

---

## 3. 智能合约设计

### 3.1 合约模块划分

- **Vault 合约（per 策略池或多池共享）**
  - 功能：
    - `deposit(token, amount)`：存款，按当前份额价格铸造份额 Token（类似 yToken）。
    - `withdraw(shares)`：赎回，按当前份额价格返回对应数量的基础稳定币。
    - 记录总资产、总份额、管理费和绩效费的累计计提。
  - 关键数据：
    - `totalAssets`：Vault 管理的总资产（包括尚在策略中的资产估值）。
    - `totalShares`：已发行份额总量。
    - `managementFeeRate`、`performanceFeeRate`：费率参数。

- **Strategy 合约**
  - 与具体协议强绑定：`AaveStrategy`、`CompoundStrategy`、`CurveStrategy`、`YearnStrategy` 等。
  - 功能：
    - `invest(amount)`：将资金投入底层协议。
    - `withdraw(amount)`：从底层协议赎回资金。
    - `harvest()`：收集收益（利息、奖励 Token），可选择卖出为稳定币并复投。
    - `estimatedTotalAssets()`：返回策略当前资产估值，用于 Vault 计算总资产。

- **Router / Controller 合约**
  - 功能：
    - 管理某策略池下多个 Strategy 及其配置权重（稳健 / 平衡 / 激进）。
    - 提供 `rebalance()` 接口，在满足策略条件时调整资金分布。

- **FeeManager / 费用逻辑**
  - 费用类型：
    - 管理费（Management Fee）：按年化费率，对管理资产计提。
    - 绩效费（Performance Fee）：对超过基准收益部分收取比例费用。
  - 实现方式（候选）：
    - 在 `harvest` 或 `rebalance` 时结算，并调整 Vault 的 share 价格或向 feeRecipient 铸造份额。

### 3.2 关键设计决策（后续细化）

- 单一 Vault 是否管理多策略，还是每个策略池一个独立 Vault。
- 份额 Token 是否可转让、是否兼容 ERC-4626 标准。
- 重平衡与 harvest 调用频率：由 Keeper / Bot 调用、还是由用户操作顺带触发。
- 权限与治理：谁可以调整费率、策略权重、添加或移除策略。

### 3.3 MVP 实现约束（Arbitrum + USDC + Aave v3）

- **首发链**：Arbitrum One。
- **首发资产**：USDC（后续再扩展 USDT / 其他稳定币）。
- **首发协议**：Aave v3（Arbitrum 上的 USDC 市场）。

**Vault（MVP）主要接口：**

- `deposit(uint256 assets, address receiver)`：存入 USDC，按当前 share 价格铸造份额。
- `withdraw(uint256 assets, address receiver, address owner)`：按资产数量赎回。
- `redeem(uint256 shares, address receiver, address owner)`：按份额赎回。
- `totalAssets()`：返回 Vault 当前总资产（USDC 余额 + 策略资产估值）。
- `convertToShares(uint256 assets)` / `convertToAssets(uint256 shares)`：份额与资产互转工具函数。
- 管理接口（后续治理使用）：`setStrategy(IStrategy newStrategy)`。

**AaveStrategy（MVP）主要接口：**

- `invest(uint256 amount)`：从 Vault 接收 USDC，并通过 `aavePool.supply` 存入 Aave v3 USDC 池。
- `withdrawToVault(uint256 amount)`：从 Aave 赎回 USDC，转回 Vault。
- `estimatedTotalAssets()`：返回当前策略中资产的 USDC 估值（aToken 余额 * 兑换比例）。
- `harvest()`：收集利息收益（MVP 可先简化为仅更新统计，不做复杂激励处理）。

权限约束：

- `AaveStrategy` 的关键函数（`invest`、`withdrawToVault` 等）仅允许绑定的 `Vault` 调用（`onlyVault`）。
- 所有协议地址、代币地址（USDC、Aave Pool、aToken）通过构造函数传入，支持同一套逻辑多链部署。

### 3.4 为什么不直接去 Aave，而是通过 Vault / Stabi？

- **体验与抽象层**：
  - 用户只看到「存入 USDC 赚利息」，不需要理解 Aave 的 Pool、aToken、健康因子等概念。
  - Vault 输出标准化的 ERC-4626 份额 Token（如 `stUSDC`），方便在其他 DeFi 协议中作为抵押物或组合资产使用。

- **策略与路由能力（未来扩展）**：
  - MVP 阶段只接 Aave v3，但 Vault/Strategy 架构允许后续无缝接入多协议（Aave / Compound / Curve / Yearn 等）。
  - 用户始终持有同一份额 Token，底层资金可以在多个协议之间动态路由与再平衡，享受「策略升级」，而无需自己频繁迁移仓位。

- **成本与运营优势**：
  - 多个用户的存取款可以在策略层做「批量操作」与时间聚合，摊薄单用户的 Gas 成本。
  - 可以在运营层集中做风险监控（协议风险事件、APY 变化、单一协议敞口限制），为用户提供更简单的风险心智模型。

- **风险与教育价值**：
  - 通过前端与文案，将复杂的协议风险抽象成「稳健 / 平衡 / 激进」等易懂标签，并结合 Vault 的风险控制（限额、暂停、rebalancing 策略）给出更可理解的产品体验。
  - 对最终用户来说，信任对象从「某个具体协议」升级为「一套可审计、可迭代的 Vault + 策略体系」。

---

## 4. 策略池设计（稳健 / 平衡 / 激进）

### 4.1 稳健策略池

- 主投标的：Aave / Compound 等蓝筹借贷协议。
- 特点：
  - 资本安全性高，APY 相对稳定。
  - 不参与高波动 LP 或高风险激励。

### 4.2 平衡策略池

- 主投标的：Aave + Curve 稳定币 LP 组合。
- 特点：
  - 一部分资金在借贷协议，另一部分在 Curve 稳定池获取 LP 收益 + 交易手续费。
  - 收益与风险均适中。

### 4.3 激进策略池

- 主投标的：Yearn Vault 或复合策略（如 Curve LP + 激励农场）。
- 特点：
  - 追求更高 APY，接受更高策略复杂度与波动。
  - 需要更强的风险提示和限额控制。

### 4.4 策略动态调整

- 基于下列信号：
  - 各协议实时 / 平滑后的 APY。
  - 协议风险事件（暂停、清算率异常升高等）。
- 策略执行：
  - 定期或条件触发的 `rebalance` 调用。
  - 限制单次调仓比例与频率，避免高 gas 消耗和收益侵蚀。

---

## 5. 前端 DApp 设计（技术视角）

### 5.1 技术栈与结构

- 技术选型（候选）：
  - 框架：Next.js + React。
  - Web3：wagmi + viem，用于钱包连接和合约交互。
  - UI：TailwindCSS + 组件库（如 Radix/shadcn UI）。

- 基本模块：
  - 钱包连接与网络切换模块。
  - 策略池列表与详情页。
  - 存入 / 提现交互组件。
  - 收益与风险展示组件（图表、协议分布、历史曲线等）。

### 5.2 核心页面与交互

- **首页 / 仪表盘**
  - 总资产、净收益、当前 APY、一键存入入口。

- **策略池列表页**
  - 展示稳健 / 平衡 / 激进三池的：预期 APY、风险等级、历史收益简要。

- **策略池详情页**
  - 显示：
    - 用户在该池的资产与收益。
    - 历史收益曲线。
    - 底层协议资金分布（饼图 / 条形图）。
    - 风险说明与教育内容。

- **存入 / 提现流程**
  - 支持选择 USDC / USDT / BUSD。
  - 存入前的授权（approve）、交易确认、结果提示。
  - 提现时展示预估可得金额、费用与预计到账资产。

---

## 6. 数据与 APY 计算

### 6.1 合约可直接提供的数据

- Vault 层：
  - `totalAssets`、`totalShares`、`sharePrice`（单份额价值）。
  - 用户份额余额、可赎回资产数量。

- Strategy 层：
  - `estimatedTotalAssets()`、最近一次 `harvest` 时间和收益。

### 6.2 前端 / 服务层计算

- 实时 / 近似 APY：
  - 通过一定时间区间内 sharePrice 变化率折算为年化收益。
- 历史收益曲线：
  - 通过周期性快照（如每小时 / 每日）记录 sharePrice 或总资产，用于绘制图表。
- 协议分布与贡献：
  - 通过各 Strategy 的 `estimatedTotalAssets` 比例绘制分布图，并估算贡献收益占比。

---

## 7. 风险与安全设计

### 7.1 协议与策略风险

- 限制单一协议最大敞口（如不超过某一比例）。
- 当底层协议出现严重风险时：
  - 新存款暂停进入相关策略。
  - 优先提供已有用户的赎回通道。

### 7.2 合约安全

- 开发阶段：
  - 尽量复用成熟标准（如 ERC-20、ERC-4626 模板）。
  - 使用 OpenZeppelin 库，减少基础安全坑位。

- 上线前：
  - 安全审计（可分为内部审计 + 第三方审计）。
  - Timelock + Multisig 管理关键参数（费率、策略更换等）。

### 7.3 权限与治理

- 明确列出：
  - Owner / Gov 可以做什么（设置费率、添加/移除策略、更新策略权重）。
  - 普通用户只能存入/提现，不可影响全局配置。

---

## 8. 部署与运维

### 8.1 环境

- 链环境：
  - Testnet（如 Goerli / Sepolia / 各 L2 测试网）用于开发与测试。
  - 主网 / 目标 L2 作为生产环境。

- 前端部署：
  - Vercel / Netlify / 静态托管。

### 8.2 监控与告警（后期可加入）

- 监控指标：
  - Vault 资产变化、APY 突变、Strategy 资产异常波动。
  - 底层协议状态变化（暂停、清算比例飙升等）。

---

## 9. 迭代路线（Roadmap）

1. **MVP 阶段**
   - 单链 + 单币种或少量稳定币。
   - 一个 Vault + 简化版稳健策略池（例如只接 Aave）。
   - 基础前端：存入、提现、基本收益展示。

2. **策略扩展阶段**
   - 增加平衡与激进策略池。
   - 接入 Curve、Yearn 等更多协议。
   - 增加自动 rebalancing 逻辑与 Keeper 机制。

3. **可视化与教育增强**
   - 完整的历史收益曲线、资金分布图、风险标签与教育内容。

4. **多链与高级功能**
   - 多链部署、跨链策略协调（可使用 LayerZero 等跨链基础设施，视需求而定）。
   - 更复杂的策略组合与用户自定义风险偏好。

---

## 10. 接下来要做的事情（实施步骤概览）

1. 确定首发链与最小策略组合（建议：先做单 Vault + 稳健策略 + 单一稳定币）。
2. 细化合约接口与数据结构，编写合约草案（Vault + 简化 Strategy）。
3. 本地编写与测试智能合约（Hardhat / Foundry 等）。
4. 设计前端信息架构与主要页面骨架，并接入基础合约交互。
5. 在测试网部署 MVP，并进行端到端功能测试。
6. 根据测试反馈优化策略逻辑、UI/UX 与风险文案。
