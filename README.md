<div align="center">
<h1>ddd-cashbook</h1>
</div>
<p align="center">
DDD记账本
</p>
<p align="center">
  <img src="https://img.shields.io/github/stars/DingDangDog/ddd-cashbook" />
  <img src="https://img.shields.io/github/forks/DingDangDog/ddd-cashbook" />
  <img src="https://img.shields.io/github/issues/DingDangDog/ddd-cashbook?color=important" />
  <img src="https://img.shields.io/badge/license-MIT-yellow.svg" />
</p>

## 必读建议

1. 项目提供[演示系统](#演示系统)，不是正式系统，建议不要记录真实数据！原因就不多说了。
2. 建议想要使用此项目的朋友们私有化部署，不要在公网公开使用！保护好隐私！
3. 建议仅作为个人或家庭记账工具使用，商用或其他使用不受约束，出现任何问题概不负责！
4. PS：赚钱的老板不介意的话可以打赏一下哦😁TODO：后续补充打赏方式

## 概念说明

- **账本**：本系统的用户级概念，必须打开（登录）账本才能记录、查看流水。
- **钥匙**：每个账本的密码，用于打开账本。
- **流水**：每一笔支出记录即是一个流水。

## 主要功能

### 基本功能

- [x]  新增账本
- [x]  记录流水（增删改查）
- [x]  导入导出流水

### 拓展功能

- [x]  主题切换：黑/白
- [x]  每日流水趋势曲线
- [ ]  流水统计图表
- [ ]  流水分类统计
- [x]  初步实现docker部署


## 演示系统

- 请以PC端打开，目前未适配其他终端。
- 演示地址：[cash.oldmoon.top](http://cash.oldmoon.top/)
- 演示账本钥匙：`fScrX9FwtiE`

## 私有部署

### Windows

> 请拉取源码自行编译运行，后续可能会简化

### Linux

> 请拉取源码自行打包部署，后续可能会简化

### Docker

> 初步实现docker镜像，后续可能会简化

- books：https://hub.docker.com/repository/docker/dingdangdog/cashbook-books

```shell
docker pull dingdangdog/cashbook-books
```

- server：https://hub.docker.com/repository/docker/dingdangdog/cashbook-server

```shell
docker pull dingdangdog/cashbook-server
```

## 截图展示


### 前置说明

- 按照使用流程进行截图；
- 以下可能不是最新页面，随时可能会更新；

### 打开系统

![image-20221112131210537](./images/image-20221112131210537.png)

### 创建账本

![image-20221112131319276](./images/image-20221112131319276.png)

![image-20221112131331581](./images/image-20221112131331581.png)

### 打开账本

![image-20221112132743032](./images/image-20221112132743032.png)

![image-20221112132803357](./images/image-20221112132803357.png)

### 新增流水

![image-20221112131654823](./images/image-20221112131654823.png)

![image-20221112131707572](./images/image-20221112131707572.png)

### 修改删除

- 修改删除均只能针对单条流水，在每条流水的操作列，很简单，暂不截图。

### 导入导出

#### 导入

![image-20221112133030143](./images/image-20221112133030143.png)

![image-20221112133113748](./images/image-20221112133113748.png)

#### 导出

- 导出当前账本的全部流水

![image-20221112133203696](./images/image-20221112133203696.png)

### 关闭账本

![image-20221112132014203](./images/image-20221112132014203.png)

- 关闭成功，自动重新加载

![image-20221112132040563](./images/image-20221112132040563.png)

