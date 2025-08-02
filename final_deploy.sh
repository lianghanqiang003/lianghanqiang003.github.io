#!/bin/bash

echo "🎉 开始最终部署到GitHub Pages..."

# 1. 确保所有文件都已生成
echo "📦 检查生成的文件..."
if [ -f "public/css/cyberpunk-glass.css" ] && [ -f "public/js/cyberpunk-effects.js" ]; then
    echo "✅ 所有文件已生成"
else
    echo "❌ 文件未找到，重新生成..."
    hexo clean && hexo generate
fi

# 2. 确保CSS引用已添加
echo "🔧 确保CSS引用已添加..."
if grep -q "cyberpunk-glass.css" public/index.html; then
    echo "✅ CSS引用已存在"
else
    echo "🔧 添加CSS引用..."
    sed -i 's|<link rel="stylesheet" href="/css/index.css">|<link rel="stylesheet" href="/css/index.css">\n<link rel="stylesheet" href="/css/cyberpunk-glass.css">|' public/index.html
fi

# 3. 确保JS引用已添加
echo "🔧 确保JS引用已添加..."
if grep -q "cyberpunk-effects.js" public/index.html; then
    echo "✅ JS引用已存在"
else
    echo "❌ JS引用未找到"
fi

# 4. 提交所有更改
echo "📝 提交更改..."
git add .
git commit -m "🚀 Deploy cyberpunk glass morphism theme with neon effects and dynamic backgrounds"

# 5. 推送到GitHub
echo "🚀 推送到GitHub..."
git push origin main

# 6. 部署到GitHub Pages
echo "🌐 部署到GitHub Pages..."
hexo deploy

echo ""
echo "🎉 部署完成！"
echo "🌐 您的网站将在几分钟后可用："
echo "   https://lianghanqiang003.github.io"
echo ""
echo "🎨 赛博朋克特效包括："
echo "   - 🌊 毛玻璃背景效果"
echo "   - 💡 霓虹灯文字发光"
echo "   - ✨ 动态背景动画"
echo "   - 🖱️ 鼠标跟随光标"
echo "   - 🎆 点击烟花特效"
echo "   - ⌨️ 键盘涟漪效果"
echo "   - 📺 扫描线效果"
echo ""
echo "🎮 交互提示："
echo "   - 鼠标悬停查看霓虹效果"
echo "   - 点击页面触发烟花特效"
echo "   - 按空格键创建涟漪效果"
echo "   - 滚动页面体验视差效果"
echo ""
echo "⏰ 请等待几分钟让GitHub Pages更新..."