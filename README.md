# Hprt-UI

## 介绍

汉印 ui 组件库

## 目录结构介绍

```
hprt-ui
├─ docs // 文档
├─ example // 使用示例，用于组件功能测试
├─ package.json
├─ packages // 组件库
│  └─ utils // 组件库 - 通用方法
├─ pnpm-workspace.yaml // pnpm 工作区
└─ README.md // 项目文档

```

## pnpm workspace 介绍及使用方法

### 什么是 pnpm workspace？

**pnpm workspace** 是 pnpm 提供的一种工具，用于管理 monorepo 中的多个包。通过 workspace，您可以在一个仓库中管理多个子项目（比如多个 npm 包）。这种结构非常适用于大型项目，其中包含多个组件、库或者微服务等子模块。pnpm workspace 可以让你在这些子模块之间共享依赖，并且减少重复的依赖安装。

### pnpm workspace 目录结构

在 `pnpm` 中，workspace 是通过在根目录的 `pnpm-workspace.yaml` 文件中配置的。该文件指明了哪些文件夹应该作为工作区的一部分。通常来说，工作区的根目录是项目的根目录，而所有子包（子项目）都位于 `packages` 或类似的文件夹中。

### 如何配置 pnpm workspace

1. **创建 `pnpm-workspace.yaml` 文件**

   在项目根目录下创建一个 `pnpm-workspace.yaml` 文件，来告诉 pnpm 哪些文件夹属于工作区。在该文件中列出所有工作区的文件夹路径。

   示例 `pnpm-workspace.yaml` 文件：

   ```yaml
   packages:
     - 'packages/*'
     - 'docs'
     - 'example'
   ```

   这意味着 packages 下的所有子文件夹、docs 文件夹和 example 文件夹都属于 workspace。

### 2. 在每个子包中配置 `package.json`

每个子项目（子包）都需要一个 `package.json` 文件来定义它自己的依赖、版本和其他元数据。
在这个 package.json 文件中，你可以定义以下内容：

- **name**: 包的名称，用于标识这个子包。通常以`@项目名称/包名称`来命名，避免命名冲突
- **version**: 子包的版本号。
- **main**: 入口文件，指定子包的主要模块，通常是一个 JavaScript 文件。
- **scripts**: 子包中的脚本命令，可以在此处定义如测试、构建等命令。
- **dependencies**: 子包所需的依赖包，可以是外部依赖或其他工作区内的包。
- **devDependencies**: 子包的开发依赖，通常包括构建工具、测试工具等。
- **peerDependencies**: 与其它包兼容的依赖，指明这个包需要哪些外部包支持。

例如，在 `utils` 包中，你的 `package.json` 文件可以如下所示：

```json
{
  "name": "@hprt-ui/utils",
  "version": "1.0.2",
  "description": "",
  "main": "dist/utils.cjs.js",
  "module": "dist/utils.es.js",
  "browser": "dist/utils.umd.js",
  "types": "dist/types/index.d.ts",
  "files": ["dist/"],
  "scripts": {
    "build": "vite build"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@rollup/plugin-typescript": "^12.1.2",
    "typescript": "^5.7.3",
    "vite": "^6.1.0",
    "vite-plugin-dts": "^4.5.0"
  }
}
```

### 使用工作区管理依赖

1. **安装依赖**

为整个工作区安装依赖

```bash
pnpm install -w <package-name>
```

只为 `docs` 包安装依赖

```bash
pnpm install --filter docs  <package-name>
```

2. **运行指定子包的脚本**

在 `pnpm workspace` 中，可以使用 `pnpm` 的 `--filter` 标志来执行某个子包中的脚本命令。例如，如果你想运行 `docs` 子包中 `docs:build` 脚本，你可以使用以下命令：

```bash
pnpm --filter docs run docs:build
```

3. **跨包依赖**

如果某个包需要依赖其他工作区内的包，可以在其 `package.json` 中直接引用其他包的名称。例如，`example` 包可以依赖 `utils` 包：

```json
"dependencies": {
  "@hprt-ui/utils": "workspace:^"
}

```

此时，`pnpm` 会自动解析并安装 `@hprt-ui/utils` 包，无需手动安装。

## 文档编写

docs 基于 [vitepress](https://vitejs.cn/vitepress/) 开发，当开发完一个子包后，需要在 `docs` 下编辑文档。当 `docs` 下的改动提交到 `github` 后，会自动编译，并发布。

在线文档地址：https://han-yin-hprt.github.io/hprt-ui/
