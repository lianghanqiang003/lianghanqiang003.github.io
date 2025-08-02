# 🚀 GitHub Pages 部署指南

## 📋 部署步骤

### 1. 确保文件已准备就绪

您的赛博朋克毛玻璃风格文件已经创建完成：

- ✅ `source/css/cyberpunk-glass.css` - 毛玻璃赛博朋克样式
- ✅ `source/js/cyberpunk-effects.js` - 赛博朋克特效脚本
- ✅ `_config.yml` - 已配置部署设置
- ✅ `_config.butterfly.yml` - 已启用赛博朋克特效

### 2. 手动部署步骤

#### 步骤 1: 生成静态文件
```bash
hexo clean && hexo generate
```

#### 步骤 2: 检查生成的文件
```bash
ls -la public/css/cyberpunk-glass.css
ls -la public/js/cyberpunk-effects.js
```

#### 步骤 3: 手动添加CSS引用（如果需要）
如果生成的HTML文件中没有包含CSS引用，请手动添加：

```bash
# 在 public/index.html 中添加CSS引用
sed -i 's|<link rel="stylesheet" href="/css/index.css">|<link rel="stylesheet" href="/css/index.css">\n<link rel="stylesheet" href="/css/cyberpunk-glass.css">|' public/index.html
```

#### 步骤 4: 提交更改
```bash
git add .
git commit -m "Add cyberpunk glass morphism theme with neon effects"
```

#### 步骤 5: 推送到GitHub
```bash
git push origin main
```

#### 步骤 6: 部署到GitHub Pages
```bash
hexo deploy
```

### 3. 使用自动部署脚本

或者，您可以直接运行部署脚本：

```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔧 故障排除

### 问题 1: 部署失败
**解决方案**: 检查GitHub仓库设置
1. 确保仓库名称为 `lianghanqiang003.github.io`
2. 确保在GitHub设置中启用了GitHub Pages
3. 确保选择了正确的分支（main）

### 问题 2: 样式没有生效
**解决方案**: 检查文件路径
1. 确保CSS文件在 `public/css/` 目录中
2. 确保JS文件在 `public/js/` 目录中
3. 检查HTML文件中的引用路径

### 问题 3: 特效不工作
**解决方案**: 检查浏览器兼容性
1. 使用现代浏览器（Chrome、Firefox、Safari）
2. 确保启用了JavaScript
3. 检查浏览器控制台是否有错误

## 🌐 访问您的网站

部署成功后，您的网站将在以下地址可用：

**https://lianghanqiang003.github.io**

## 🎨 验证特效

部署完成后，您应该能看到：

1. **毛玻璃效果** - 所有卡片都有毛玻璃背景
2. **霓虹灯效果** - 文字和边框都有霓虹发光
3. **动态背景** - 多层渐变和移动网格线
4. **交互特效** - 鼠标跟随、点击烟花、键盘涟漪

## 🎮 交互测试

- **鼠标悬停** - 查看霓虹灯效果
- **点击页面** - 触发烟花特效
- **按空格键** - 创建涟漪效果
- **滚动页面** - 体验视差效果

## 📱 移动端支持

您的网站已经针对移动端进行了优化：

- ✅ 响应式设计
- ✅ 触摸友好的交互效果
- ✅ 移动端优化的毛玻璃效果
- ✅ 自适应网格背景

## 🔄 更新部署

如果您修改了样式或内容，请重新运行部署：

```bash
hexo clean && hexo generate && hexo deploy
```

## 📞 技术支持

如果遇到问题，请检查：

1. **GitHub Pages设置** - 确保启用了GitHub Pages
2. **分支设置** - 确保使用main分支
3. **文件路径** - 确保所有文件都在正确位置
4. **浏览器缓存** - 清除浏览器缓存后重新访问

---

*祝您部署顺利！🎉*