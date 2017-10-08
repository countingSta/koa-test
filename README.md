# koa-test
基于koa框架的联系人管理系统
需求：实现一个具体登录注册功能，同时能够增删联系人的电话簿系统。
技术栈： 前端： React + Backbone + webpack + nodewebkit 后端： Koa + mongoose + mysql + es6/es7
目录设计
/server app.js -------- 
入口文件 models -------- 数据库模型 
controllers --------- 完成逻辑处理的控制器
utils --------- 封装的工具类 
routes --------- 路由 configs -------- 配置文件 
package.json --------- 项目所需依赖 
好的目录设计有利于后期的维护，有规有矩，自己看起来也清爽许多。路由部分必须和控制器分开，这样能做控制器只需关心实现该有的业务逻辑。
项目启动 启动服务器 cd到根目录，执行：npm install npm run start
