<!--  productNav 组件 -->
<template>
    <div class="nav">
        <router-link :to="{name:'home-product'}" class="nav-item">
            <span>点菜</span>
        </router-link>
        <router-link :to="{name:'product-comment'}" class="nav-item">
            <span>评价</span>
        </router-link>
        <router-link :to="{name:'product-restanurant'}" class="nav-item">
            <span>商家</span>
        </router-link>
    </div>
</template>

<script>

    export default{
        name:'productNav',
        data(){
            return{
                
            }
        },
        methods:{
            
        },
        components:{
            
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .nav{
        width: 100%;
        height: 43px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
        .nav-item{
            flex: 1;
            display: block;
            height: 100%;
            text-align:center;
            line-height: 43px;
            font-size: 16px;
        }
        .router-link-exact-active{
            position: relative;

            &::before{
                content: '';
                display: block;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -25px;
                width: 50px;
                height: 2px;
                background-color: pink;
            }
        }
    }
</style>