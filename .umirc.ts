import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", redirect: "/editTable" }, // 添加重定向路由
    { path: "/editTable", component: "editTable" },
    { path: "/echart", component: "index" },
    { path: "/reg", component: "Reg" },
    { path: "/tableSearch", component: "TableSearch"},
    { path: "/recent", component: "Recent" }
  ],
  npmClient: "pnpm",
});
