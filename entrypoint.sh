echo "===================================================="
echo "--------------欢迎使用 cashbook 记账本--------------"
echo "--GitHub：https://github.com/DingDangDog/cashbook"
echo "--QQ交流群：874014173"
echo "--联系邮箱：dddogx@qq.com"
echo "**提示：建议私有部署，不要将服务暴露在公网！**"
echo "===================================================="

nginx -c /var/lib/nginx/nginx.conf
cd /usr/cashbook/server/dist && node main.js