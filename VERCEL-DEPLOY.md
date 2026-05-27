# 太空房网站 - Vercel 部署指南

## 方法一：通过 Vercel 网站直接部署（推荐，无需安装工具）

### 步骤 1：准备项目文件

确保您的项目文件夹包含以下文件：

```
space-house-website/
├── index.html          (首页)
├── design.html         (产品选购页)
├── vercel.json         (Vercel配置文件)
├── css/
│   ├── style.css       (首页样式)
│   └── design.css      (选购页样式)
└── js/
    ├── main.js         (首页交互)
    └── design.js       (选购页交互)
```

### 步骤 2：压缩项目文件

1. 选中 `space-house-website` 文件夹内的所有文件
2. 右键点击 → **发送到** → **压缩(zipped)文件夹**
3. 生成 `space-house-website.zip` 文件

### 步骤 3：在 Vercel 上部署

1. **访问 Vercel**
   - 打开浏览器，访问 https://vercel.com
   - 点击 **Sign Up** 注册账号（可以使用 GitHub/Google 账号快速登录）

2. **导入项目**
   - 登录后，点击 **Add New Project**
   - 选择 **Import Git Repository** 下方的 **Continue with Template**
   - 或者点击左侧的 **Upload** 选项

3. **上传文件**
   - 将压缩包 `space-house-website.zip` 拖拽到上传区域
   - 或者点击 **Browse** 选择文件

4. **配置项目**
   - **Project Name**: `space-house-website`（或您喜欢的名称）
   - **Framework Preset**: 选择 **Other**（纯静态网站）
   - **Root Directory**: `./`（根目录）

5. **部署**
   - 点击 **Deploy** 按钮
   - 等待约 1-2 分钟完成部署

6. **查看结果**
   - 部署成功后，会显示 **Congratulations!** 页面
   - 点击 **Visit** 查看您的网站
   - 网站地址格式：`https://space-house-website-xxxxx.vercel.app`

---

## 方法二：使用 Vercel CLI（命令行方式）

### 前提条件

- 安装 Node.js: https://nodejs.org/ (推荐 LTS 版本)

### 安装 Vercel CLI

```bash
npm install -g vercel
```

### 部署步骤

1. **打开命令提示符或 PowerShell**

2. **进入项目目录**
   ```bash
   cd "C:\Users\17616\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a16a3a2b0576757738ee21e\space-house-website"
   ```

3. **登录 Vercel**
   ```bash
   vercel login
   ```
   - 按提示在浏览器中完成登录

4. **部署项目**
   ```bash
   vercel
   ```

5. **跟随提示**
   - **Set up and deploy "~\space-house-website"?** → 输入 `Y`
   - **Which scope do you want to deploy to?** → 选择您的账号
   - **Link to existing project?** → 输入 `N`（创建新项目）
   - **What's your project name?** → 输入 `space-house-website`
   - **In which directory is your code located?** → 按回车（当前目录）

6. **等待部署完成**
   - 部署成功后，会显示网站链接
   - 例如：`https://space-house-website-xxxxx.vercel.app`

---

## 方法三：通过 GitHub 集成部署（推荐用于持续更新）

### 步骤 1：将代码推送到 GitHub

参考 `DEPLOY-GUIDE.md` 中的 GitHub 部署步骤

### 步骤 2：在 Vercel 中导入 GitHub 仓库

1. **访问 Vercel**
   - 打开 https://vercel.com 并登录

2. **新建项目**
   - 点击 **Add New Project**
   - 选择 **Import Git Repository**

3. **授权 GitHub**
   - 点击 **Install Vercel for GitHub**
   - 授权 Vercel 访问您的 GitHub 仓库

4. **选择仓库**
   - 在列表中找到 `space-house-website` 仓库
   - 点击 **Import**

5. **配置项目**
   - **Project Name**: `space-house-website`
   - **Framework Preset**: 选择 **Other**
   - 其他保持默认

6. **部署**
   - 点击 **Deploy**
   - 等待部署完成

### 自动部署优势

- 每次推送到 GitHub 主分支，Vercel 会自动重新部署
- 支持预览部署（Pull Request 会自动生成预览链接）

---

## 部署后的网站地址

部署成功后，您将获得以下网址：

- **生产环境**: `https://space-house-website-xxxxx.vercel.app`
- **首页**: `https://space-house-website-xxxxx.vercel.app/`
- **产品选购页**: `https://space-house-website-xxxxx.vercel.app/design.html`

---

## 自定义域名（可选）

### 添加自定义域名

1. **进入项目设置**
   - 在 Vercel 仪表板中，点击您的项目
   - 选择 **Settings** → **Domains**

2. **添加域名**
   - 在 **Domains** 部分，输入您的域名（如 `www.spacehouse.com`）
   - 点击 **Add**

3. **配置 DNS**
   - 根据 Vercel 提供的说明，在您的域名服务商处添加 DNS 记录
   - 通常需要添加一条 **CNAME** 记录指向 `cname.vercel-dns.com`

4. **等待生效**
   - DNS 生效通常需要几分钟到几小时
   - Vercel 会自动配置 HTTPS 证书

---

## 更新网站

### 方法 A：重新上传（方法一）

1. 修改本地文件
2. 重新压缩为 zip 文件
3. 在 Vercel 项目页面点击 **Redeploy**
4. 上传新的 zip 文件

### 方法 B：命令行更新（方法二）

```bash
cd "C:\Users\17616\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a16a3a2b0576757738ee21e\space-house-website"
vercel --prod
```

### 方法 C：Git 自动更新（方法三）

```bash
git add .
git commit -m "Update website"
git push origin main
```
- Vercel 会自动检测并重新部署

---

## 环境变量（高级）

如果需要在网站中使用环境变量：

1. 在 Vercel 项目设置中，选择 **Settings** → **Environment Variables**
2. 添加变量名和值
3. 在代码中通过 `process.env.VARIABLE_NAME` 访问

---

## 常见问题

### Q: 部署失败，显示 "Build Failed"？

**A**: 
- 检查 `vercel.json` 配置是否正确
- 确保所有文件路径正确
- 查看构建日志获取详细错误信息

### Q: 网站显示 404 错误？

**A**:
- 检查 `index.html` 是否在根目录
- 确认 `vercel.json` 中的路由配置正确
- 检查文件名大小写（Vercel 区分大小写）

### Q: CSS/JS 文件加载失败？

**A**:
- 检查文件路径是否正确
- 确认相对路径使用正确（如 `./css/style.css`）
- 清除浏览器缓存后重试

### Q: 如何查看部署日志？

**A**:
- 在 Vercel 仪表板中，点击项目
- 选择 **Deployments** 标签
- 点击具体的部署记录查看日志

### Q: 如何回滚到之前的版本？

**A**:
- 在 Vercel 仪表板中，进入项目
- 选择 **Deployments**
- 找到要回滚的版本，点击右侧的三个点
- 选择 **Promote to Production**

---

## Vercel 优势

- **全球 CDN**: 自动分发到全球节点，访问速度快
- **自动 HTTPS**: 免费 SSL 证书，自动续期
- **预览部署**: 每次提交自动生成预览链接
- **无服务器函数**: 支持 API 路由（如需后端功能）
- **分析统计**: 内置网站访问分析
- **团队协作**: 支持多人协作开发

---

## 需要帮助？

- Vercel 文档: https://vercel.com/docs
- Vercel 支持: https://vercel.com/help
- 社区论坛: https://github.com/vercel/vercel/discussions
