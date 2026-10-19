# Personal Page

一个零依赖的个人作品集与简历站点，包含首页、作品列表、项目详情、可打印简历和 404 页面。

## 本地预览

```bash
npm run dev
```

然后打开 `http://localhost:4173`。也可以直接双击 `index.html` 预览，但建议使用本地服务器以获得一致体验。

## 修改内容

所有个人信息、项目、经历、技能和联系方式都在 `assets/data.js` 中。看到 `林一`、`hello@example.com`、`+86 138 0000 0000` 等内容时，请替换成你自己的信息。

常用位置：

- `site`：姓名、职位、简介、邮箱、社交链接、统计数字。
- `projects`：项目列表与详情页内容，`featured: true` 的项目会出现在首页。
- `experience`：工作经历，简历页会自动读取。
- `education`、`skills`、`awards`：简历页中的教育、技能和奖项。
- `assets/styles.css`：颜色、字体、间距、动效和打印样式。

更新姓名与职位后，建议同步修改各 HTML 的 `<title>`、`meta description`，以及 `index.html` 里的 JSON-LD 结构化数据，便于搜索引擎识别。

## 页面结构

- `index.html`：个人主页与精选作品。
- `projects.html`：全部作品与分类筛选。
- `project.html?id=项目id`：项目详情页。
- `resume.html`：可直接打印或保存为 PDF 的简历。
- `404.html`：未找到页面。

## 部署

这是纯静态站点，不需要构建。可以直接部署到 GitHub Pages、Netlify、Vercel 或任意静态文件服务器。部署时上传整个项目目录即可。

GitHub Pages 的一个简单做法：把代码推送到仓库，在 Settings → Pages 中选择部署分支和根目录。
