#!/bin/bash

echo "🚀 开始快速部署到GitHub Pages..."

# 1. 生成静态文件
echo "📦 生成静态文件..."
hexo clean
hexo generate

# 2. 确保CSS和JS文件被包含
echo "🔧 添加CSS引用到HTML文件..."
if [ -f "public/index.html" ]; then
    # 添加CSS引用
    sed -i 's|<link rel="stylesheet" href="/css/index.css">|<link rel="stylesheet" href="/css/index.css">\n<link rel="stylesheet" href="/css/cyberpunk-glass.css">|' public/index.html
    echo "✅ CSS引用已添加"
else
    echo "❌ 未找到index.html文件"
    exit 1
fi

# 3. 提交所有更改
echo "📝 提交更改..."
git add .
git commit -m "Deploy cyberpunk glass morphism theme with neon effects"

# 4. 推送到GitHub
echo "🚀 推送到GitHub..."
git push origin main

# 5. 部署到GitHub Pages
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