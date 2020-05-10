import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: ()=> import('@/pages/home/index'), //懒加载 当页面被访问时才进行加载其代码
      children:[{
          path: 'product',
          name: 'home-product',
          component: ()=> import('@/pages/product/index'),
          children:[{
            path: 'comment',
            name: 'product-comment',
            component: ()=> import('@/pages/comment/index'),
          },{
            path: 'restanurant',
            name: 'product-restanurant',
            component: ()=> import('@/pages/restanurant/index'),
          }]
      }]
    },
    {
      path: '/order',
      name: 'order',
      component: ()=> import('@/pages/order/index'), //懒加载 当页面被访问时才进行加载其代码
    
    },
    {
      path: '/my',
      name: 'my',
      component: ()=> import('@/pages/my/index'), //懒加载 当页面被访问时才进行加载其代码
    
    },
    // {
    //   path: 'product',
    //   name: 'home-product',
    //   component: ()=> import('@/pages/product/index')
    // },
    {
      path: '*',
      redirect:'/home',  //通配符 当前面的所有路由匹配失败时就跳转它
    }
  ]
})
