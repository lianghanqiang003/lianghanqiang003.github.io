---
title: Wordpress ssl 无线重定向
date: 2023-11-13 23:42:51
tags:
---
背景
1、docker 部署的wordpress
2、nginx 转发docker 服务
3、网站域名添加ssl证书后使用https 作为站点url

现象:
访问地址不断302，导致重定向次数过多访问页面失败


解决方案: 
``` BASH
docker exec -it container_id /bin/bash
cd /var/www/html
vim wp-config.php 
```


添加以下代码
``` PHP
$_SERVER['HTTPS'] = 'on';
define('FORCE_SSL_LOGIN', true);
define('FORCE_SSL_ADMIN', true);
```