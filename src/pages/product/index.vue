<!--  product 页面 -->
<template>
    <transition name="product" appear>
        <div class="product">
            <product-header></product-header>
            <product-nav></product-nav>
            <product-menu></product-menu>

            <!-- 嵌套children子路由时候 跳转的接受区域 -->
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    import productHeader from './header';
    import productNav from './nav';
    import productMenu from './menu';

    export default{
        name:'home-product',
        data(){
            return{
                
            }
        },
        methods:{
            
        },
        components:{
            'product-header':productHeader,
            'product-nav':productNav,
            'product-menu':productMenu
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .product{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1200;
        width: 100%;
        height: 100%;
        background-color: #fff;
        overflow: hidden;
    }
    
    .product{
        // 动画效果
        &-enter-active,&-leave-active{
            transition: all .3s;
        }
        // 显->隐藏的最终阶段 和 隐藏->显开始时 的状态为 
        &-enter,&-leave-to{
            transform: translate3d(100%,0,0);
        }
    }
</style>