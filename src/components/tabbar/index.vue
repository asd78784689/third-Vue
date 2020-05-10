<!-- 底部导航条 -->
<template>
    <div class="g-tabbar">
        <router-link class="g-tabbar-item" to="/home">
            <div class="icon home"></div>
            <span>首页</span>
        </router-link>
        <router-link class="g-tabbar-item" to="/order">
            <div class="icon order"></div>
            <span>订单</span>
        </router-link>
        <router-link class="g-tabbar-item" to="/my">
            <div class="icon my"></div>
            <span>我的</span>
        </router-link>
    </div>
</template>

<script>
    
    export default{
        data(){
            return{
                
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import "~@/assets/scss/variables";
    @import "~@/assets/scss/mixins";
    
    .g-tabbar{
        display: flex;
        width: 100%;
        height: $tabbar-height;
        border-top: 1px solid #b6b6b6;
        background-color: rgba(246,246,246,.95);

        &-item{
            flex: 1;
            @include flex-center(column);
            
            img{
                width: 24px;
                margin-bottom:4px;
            }
        }
        .icon{
            margin-bottom: 5px;
            width: 24px;
            height: 24px;
            background-size: cover;
        }
        .home{
            background-image:url('./img/homeIcon.png');
        }
        .order{
            background-image:url('./img/orderIcon.png');
        }
        .my{
            background-image:url('./img/myIcon.png');
        }
    }
    .router-link-active{
        color:#000;

        .home{
            background-image:url('./img/homeIconActive.png');
        }
        .order{
            background-image:url('./img/orderIconActive.png');
        }
        .my{
            background-image:url('./img/myIconActive.png');
        }
    }
</style>