# 电子同学录

## 开发和部署

### 修改配置文件

1. 修改 `.env.template` 文件名为 `.env`
2. 按照注释修改

### 检查环境

此项目采用node.js构建，并使用pnpm管理软件包。如果你未安装任何环境，请参考[pnpm官网教程](https://pnpm.io/zh/installation)。

如果您已安装了npm或yarn，您可以使用以下命令快速安装pnpm：

```sh
# npm
npm install pnpm
# yarn
yarn install pnpm
```

### 安装

```sh
pnpm i
```

### 启动

```sh
# 开发
pnpm run dev
# 部署
pnpm run build
pnpm run start
```

## 鸣谢

此项目由 [Justin](https://github.com/jsun969) 开发并捐赠给[YGeeker](https://github.com/ygeeker)，并由[YGeeker](https://github.com/ygeeker)团队负责后期维护。