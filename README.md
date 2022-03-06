# 电子同学录

## 准备工作

1. 修改 `.env.template` 文件名为 `.env`
2. 按照注释修改

## 安装

```sh
# 安装所有依赖
pnpm install
# 初始化SQLite数据库
npx prisma db push
```

## 启动

```sh
# 开发
pnpm run dev
# 部署
pnpm run build
pnpm run start
```
