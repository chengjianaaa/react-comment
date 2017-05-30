## 附近商家评价APP

## 项目下载

```
git clone git@github.com:helios741/react-comment.git
```

## 项目启动

```
cd react-comment;
npm start
```
然后打开另一个命令行开启模拟后台服务

```
cd ../;
node ./mock/server
```



## 使用技术
react + react-router + react-redux

## 项目目录

- app
	+ actions 包含了redux所有的action(通过action改变state)
	+ components 所有的展示组件
	+ config 所有的配置文件
	+ constants 所有的常亮
	+ constainers 所有的处理组件 
	+ fetch 代替ajax的
	+ reducers 包含了redex中的所有reducer(规则)
	+ router 路由的配置
	+ static 所有的静态文件
	+ store 创建管理state的store
	+ util 所有的工具组件
	+ index.jsx 项目的入口文件
	+ inde.tmpl.html 展示模板
- docs
	+ angualr-react.md 用完react之后和angualr的对比
	+ readme.md  做工程之前要思考的问题
	+ react-life.md 对react生命周期的总结
	+ react-content.md 对react的基础知识的总结
- mock 
	+ 模拟的后台数据

## 好文推荐
- [redux中文网](http://cn.redux.js.org/)
- [前端组件化的认识](http://chping.website/2016/11/04/%E5%89%8D%E7%AB%AF%E7%BB%84%E4%BB%B6%E5%8C%96%E7%9A%84%E8%AE%A4%E8%AF%86前端组件化的认识/)
- [组件化的兴衰](https://github.com/xufei/blog/issues/3)
- [介绍前端blog](https://github.com/chping2125/blog)
- [React虚拟DOM浅析](http://www.alloyteam.com/2015/10/react-virtual-analysis-of-the-dom/)
- [对mvc，mvp，mvvm的理解](https://www.zhihu.com/question/20148405)
- [和上面差不多](http://www.cnblogs.com/indream/p/3602348.html)
- [angular和react的对比](http://www.reqianduan.com/3003.html)
- [分析angular和react](http://www.alloyteam.com/2015/05/关于angular和react/)
- [angular和react的适用场景](https://www.zhihu.com/question/23444167)