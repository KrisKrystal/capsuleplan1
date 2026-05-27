# 太空房网站部署到GitHub Pages指南

## 方法一：通过GitHub网站直接上传（推荐，无需安装任何工具）

### 步骤1：创建GitHub仓库

1. 打开浏览器，访问 https://github.com
2. 登录您的GitHub账号（如果没有，请先注册）
3. 点击右上角的 **+** 按钮，选择 **New repository**
4. 填写仓库信息：
   - **Repository name**: `space-house-website`
   - **Description**: 太空房官方网站 - 移动装配式健康建筑
   - **Visibility**: Public（公开）
   - 勾选 **Add a README file**
5. 点击 **Create repository**

### 步骤2：上传网站文件

1. 在新创建的仓库页面，点击 **Add file** 按钮
2. 选择 **Upload files**
3. 将以下文件和文件夹拖拽到上传区域：
   ```
   space-house-website/
   ├── index.html
   ├── design.html
   ├── css/
   │   ├── style.css
   │   └── design.css
   ├── js/
   │   ├── main.js
   │   └── design.js
   ```
4. 在 **Commit changes** 部分填写：
   - **Commit message**: `Initial commit: Add website files`
5. 点击 **Commit changes**

### 步骤3：启用GitHub Pages

1. 在仓库页面，点击顶部的 **Settings** 标签
2. 在左侧菜单中，点击 **Pages**
3. 在 **Source** 部分：
   - **Branch**: 选择 `main` 或 `master`
   - **Folder**: 选择 `/(root)`
4. 点击 **Save**
5. 等待几分钟，页面会显示您的网站链接：
   - `https://yourusername.github.io/space-house-website/`

### 步骤4：验证部署

1. 打开浏览器，访问显示的链接
2. 确认网站正常显示

---

## 方法二：使用Git命令行（适合有Git经验的用户）

### 前提条件
- 安装Git: https://git-scm.com/download/win
- 配置GitHub账号

### 部署步骤

1. 打开命令提示符或PowerShell

2. 进入项目目录：
   ```bash
   cd "C:\Users\17616\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a16a3a2b0576757738ee21e\space-house-website"
   ```

3. 初始化Git仓库：
   ```bash
   git init
   ```

4. 添加所有文件：
   ```bash
   git add .
   ```

5. 提交代码：
   ```bash
   git commit -m "Initial commit: Add space house website"
   ```

6. 添加远程仓库（替换yourusername为您的GitHub用户名）：
   ```bash
   git remote add origin https://github.com/yourusername/space-house-website.git
   ```

7. 推送到GitHub：
   ```bash
   git branch -M main
   git push -u origin main
   ```

8. 在GitHub仓库设置中启用Pages（同方法一）

---

## 方法三：使用GitHub Desktop（图形界面）

### 步骤1：安装GitHub Desktop
1. 下载：https://desktop.github.com/
2. 安装并登录GitHub账号

### 步骤2：创建本地仓库
1. 打开GitHub Desktop
2. 点击 **File** > **New repository**
3. **Name**: `space-house-website`
4. **Local path**: 选择项目文件夹
5. 点击 **Create repository**

### 步骤3：提交并推送
1. 在GitHub Desktop中，您会看到所有文件变更
2. 填写提交信息：`Initial commit`
3. 点击 **Commit to main**
4. 点击 **Publish repository**
5. 选择 **GitHub.com** 并确认

### 步骤4：启用Pages
- 同方法一

---

## 部署后的网站结构

部署成功后，您的网站将有以下URL：

- **首页**: `https://yourusername.github.io/space-house-website/`
- **产品选购页**: `https://yourusername.github.io/space-house-website/design.html`

---

## 自定义域名（可选）

如果您有自己的域名，可以配置自定义域名：

1. 在仓库的 **Settings** > **Pages** 中
2. 找到 **Custom domain** 部分
3. 输入您的域名，如 `www.spacehouse.com`
4. 点击 **Save**
5. 在您的域名DNS设置中添加CNAME记录指向 `yourusername.github.io`

---

## 更新网站

### 方法一：通过GitHub网站
1. 进入仓库
2. 找到要修改的文件
3. 点击文件，然后点击右上角的 **Edit** 按钮
4. 修改内容
5. 填写提交信息，点击 **Commit changes**

### 方法二：通过Git命令
```bash
git add .
git commit -m "Update website"
git push origin main
```

---

## 常见问题

### Q: 网站显示404错误？
A: 请检查：
- GitHub Pages是否已启用
- 仓库是否为Public
- index.html是否在根目录

### Q: 样式或图片不显示？
A: 检查文件路径是否正确，GitHub Pages区分大小写

### Q: 如何删除仓库？
A: 进入仓库 **Settings** > **Danger Zone** > **Delete this repository**

---

## 需要帮助？

- GitHub Pages文档：https://docs.github.com/en/pages
- 联系支持：https://support.github.com/
