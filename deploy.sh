#!/bin/bash

# 赛博朋克毛玻璃风格部署脚本

echo "🚀 开始部署到GitHub Pages..."

# 1. 生成静态文件
echo "📦 生成静态文件..."
hexo clean && hexo generate

# 2. 确保CSS和JS文件被包含
echo "🔧 检查CSS和JS文件..."
if [ -f "public/css/cyberpunk-glass.css" ]; then
    echo "✅ CSS文件已生成"
else
    echo "❌ CSS文件未找到"
    exit 1
fi

if [ -f "public/js/cyberpunk-effects.js" ]; then
    echo "✅ JS文件已生成"
else
    echo "❌ JS文件未找到"
    exit 1
fi

# 3. 手动添加CSS引用到HTML文件
echo "🔧 添加CSS引用到HTML文件..."
sed -i 's|<link rel="stylesheet" href="/css/index.css">|<link rel="stylesheet" href="/css/index.css">\n<link rel="stylesheet" href="/css/cyberpunk-glass.css">|' public/index.html

# 4. 提交更改
echo "📝 提交更改..."
git add .
git commit -m "Add cyberpunk glass morphism theme with neon effects"

# 5. 推送到GitHub
echo "🚀 推送到GitHub..."
git push origin main

# 6. 部署到GitHub Pages
echo "🌐 部署到GitHub Pages..."
hexo deploy

echo "✅ 部署完成！"
echo "🌐 您的网站将在几分钟后可用："
echo "   https://lianghanqiang003.github.io"
echo ""
echo "🎨 赛博朋克特效包括："
echo "   - 毛玻璃背景效果"
echo "   - 霓虹灯文字发光"
echo "   - 动态背景动画"
echo "   - 鼠标跟随光标"
echo "   - 点击烟花特效"
echo "   - 键盘涟漪效果"
echo ""
echo "🎮 交互提示："
echo "   - 鼠标悬停查看霓虹效果"
echo "   - 点击页面触发烟花特效"
echo "   - 按空格键创建涟漪效果"
echo "   - 滚动页面体验视差效果"