<!--  product 页面 -->
<template>
    <div class="menu">
        <!-- 通过点击left的选项 传递相应的data数据 让right进行渲染 -->
        <div class="left">
            <me-scroll :pagination='pagination' :direction='direction' ref='mySwiper'>
                <div class="left-bar-inner" ref='myBar'>
                    <div class="left-item" v-for="(item,index) in foodArr" :key="index" @click='leftClick' :data-id='index'>
                        <div class="item-text">
                            <img :src="item.icon" class="item-icon" alt="" v-if='item.icon'>
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </me-scroll>
        </div>
        <div class="right">
            <menu-right :dataArr='foodArr' :itemId='ActiveId' @changeArr='changeFoodArr'></menu-right>
        </div>
        <div class='cart'>
            <menu-cart :dataArr='foodArr2' @showcart='showMask' @changeArr='changeFoodArr2'></menu-cart>
        </div>
        <div class="mask" v-show='showCar'></div>
    </div>
</template>

<script>
    import MeScroll from '@/base/scroll'; 
    import {getMenuContent} from '@/api/menu.js';
    import MenuRight from './right';
    import MenuCart from './cart';
    export default{
        name:'productMenu',
        data(){
            return{
                direction:'vertical',
                pagination:false,
                showCar:false,
                foodArr:[],
                foodArr2:[],
                ActiveId:0
            }
        },
        methods:{
            getMenu(){
                getMenuContent().then(data=>{
                    console.log(data);
                    // 保存数据
                    this.foodArr = data.food_spu_tags;
                    setTimeout(()=>{
                        this.$refs.mySwiper.updateSwiper();
                        this.init();
                    });
                })
            },
            leftClick(e){
                // 点击触发切换事件
                // console.log(e.target.classList.contains('item-text'));
                let childArrs;
                let thisItem;
                if(e.target.classList.contains('item-text')){
                    thisItem = e.target.parentNode;
                    childArrs = e.target.parentNode.parentNode.childNodes;
                }else{
                    thisItem = e.target;
                    childArrs = e.target.parentNode.childNodes;
                }
                childArrs.forEach((item,index)=>{
                    item.classList.remove('active');
                });
                thisItem.classList.add('active');
                // console.log(thisItem.getAttribute('data-id'));
                this.ActiveId = thisItem.getAttribute('data-id');
                // console.log(typeof this.ActiveId);
            },
            init(){
                // console.log(this.$refs.myBar.firstChild);
                this.$refs.myBar.firstChild.click();
            },
            changeFoodArr(arr){
                //暂时解决不了同一个foodArr 清空时候再赋值会出现报错
                //right接收改动的arr
                this.foodArr = arr;
                // console.log(this.foodArr);
                // 由于数组内层才有改动 防止watch监听失败就先传空的再用异步传一次
                this.foodArr2 = [];
                setTimeout(()=>{
                    this.foodArr2 = arr;
                })
                // console.log(this.foodArr2);
            },
            changeFoodArr2(arr){
                //cart接收改动的arr
                this.foodArr2 = arr;
                // console.log(this.foodArr);
                // 由于数组内层才有改动 防止watch监听失败就先传空的再用异步传一次
                // right 组件用空数组返回会有报错
                // this.foodArr = [];
                setTimeout(()=>{
                    this.foodArr = arr;
                })
                // console.log(this.foodArr2);
            },
            showMask(sh){
                //显示遮罩
                this.showCar = sh;
            }
        },
        created(){
            this.getMenu();
        },
        components:{
            'me-scroll':MeScroll,
            'menu-right':MenuRight,
            'menu-cart':MenuCart
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .menu{
        height: 100%;
        display: flex;

        .left{
            width: 80px;
            height: 100%;
            overflow: auto;
            background-color: #efefef;

            &-bar-inner{
                padding-bottom: 150px;
            }
            &-item{
                height: 55px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #bfbfbf;
                font-size: 14px;
                text-align: center;
                color: #666;
            }
            .active{
                background-color: #fff;
            }
            .item-text{
                font-size: 14px;
            }
            .item-icon{
                width: 18px;
                height: 18px;
                display: inline-block;
                margin-right: 5px;
            }
        }
        .right{
            flex: 1;
            margin-left: 9px;
            height: 100%;
            overflow:hidden;
        }
        .cart{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 99;
        }
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.7);
        z-index: 90;
    }
</style>