<!-- home 页面 -->
<template>
    <div class="home">
        <div class="g-header-container">
            <me-scroll :pagination='pagination' :direction='direction' :pullUp='pullUp' ref='mySwiper' @pull-up='pullToRefresh'>
                <home-header></home-header>
                <img src="https://app.nihaoshijie.com.cn/upload/bannertemp.e8a6fa63.jpg" class="header-img" alt="">
                <home-category></home-category>
                <home-content ref='content'></home-content>
            </me-scroll>
        </div>
        <!-- 嵌套children子路由时候 跳转的接受区域 -->
        <router-view></router-view>
    </div>
</template>

<script>
    import HomeHeader from './header';
    import HomeCategory from './category';
    import HomeContent from './content';
    import MeScroll from '@/base/scroll';
    import {swiperSlide} from 'vue-awesome-swiper';

    export default{
        data(){
            return{
                direction:'vertical',
                pagination:false,
                pullUp:true,
                items:[]
            }
        },
        components:{
            'home-header':HomeHeader,
            'me-scroll':MeScroll,
            swiperSlide,
            'home-category':HomeCategory,
            'home-content':HomeContent
        },
        methods:{
            pullToRefresh(end){
                // 上拉
                this.$refs.content.update().then(()=>{
                    end();
                    setTimeout(()=>{
                        // 异步执行更新 防止渲染未结束就进行了更新
                        this.$refs.mySwiper.updateSwiper();
                    },100);
                    
                });
            },
            
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';

    .home{
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color:#fff;
    }
    .g-header-container{
        height: 100%;
    }
    .header-img{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    
</style>