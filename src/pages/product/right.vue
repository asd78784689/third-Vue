<!--  product 页面 -->
<template>
    <div class="right-inner">
        <p class="right-title">{{title}}</p>
        <me-scroll ref='mySwiper'>
            <div class="right-list">
                <me-loading v-if='loading' class='loading'></me-loading>
                <div class="right-list-inner" v-else>
                    <div class="menu-item" v-for='(item,index) in thisConArr' :key='index' :data-id='index'>
                        <img v-lazy="item.picture" alt="" class="img">
                        <div class="menu-item-right">
                            <p class="item-title">{{item.name}}</p>
                            <p class="item-desc">{{item.description}}</p>
                            <p class="item-zan">{{item.praise_content}}</p>
                            <p class="item-price">￥{{item.min_price}}<span class="unit">{{item.unit}}</span></p>
                        </div>
                        <div class="select-content">
                            <div class="minus" @click='minusClick'></div>
                            <div class="count">{{item.status}}</div>
                            <div class="plus" @click='plusClick'></div>
                        </div>
                    </div>
                </div>
            </div>
        </me-scroll>
    </div>
</template>

<script>
    import MeScroll from '@/base/scroll'; 
    import MyLoading from '@/base/loading';
    import {getMenuContent} from '@/api/menu.js';
    export default{
        name:'MenuRight',
        data(){
            return{
                thisConArr:[],
                title:'热销',
                loading:true
            }
        },
        methods:{
            getContent(){
                // console.log(dataArr);
                setTimeout(()=>{
                    this.$refs.mySwiper.updateSwiper();
                });
            },
            minusClick(e){
                // console.log('minus');
                // 点击后 通过父元素查找到该项位于items中的下标
                //用下标找到dataArr中相应的item 改变其中的status属性 然后还要
                //通过$emit发送出去
                //然后在menu中接收到并更新dataArr
                let thisNum = e.target.parentNode.parentNode.getAttribute('data-id');
                if(this.dataArr[this.itemId].spus[thisNum].status === 0) return;
                this.dataArr[this.itemId].spus[thisNum].status -= 1;
                // console.log(this.dataArr);
                this.$emit('changeArr',this.dataArr);
            },
            plusClick(e){
                // 点击就+1 并返回数据
                // console.log('plus');
                // console.log(e.target.parentNode.parentNode.getAttribute('data-id'));
                let thisNum = e.target.parentNode.parentNode.getAttribute('data-id');
                this.dataArr[this.itemId].spus[thisNum].status += 1;
                // console.log(this.dataArr);
                this.$emit('changeArr',this.dataArr);
            }
        },
        created(){
            this.getContent();
        },
        watch:{
            // 监听
            itemId(val){
                this.itemId = val;
                // console.log(this.itemId);
                this.loading = true;
                this.title = this.dataArr[this.itemId].name;
                this.thisConArr = this.dataArr[this.itemId].spus;
                setTimeout(()=>{
                    this.loading = false;
                },1000);
            },
            dataArr(arr){
                this.dataArr = arr;
                // console.log(this.dataArr);
                this.loading = true;
                this.title = this.dataArr[this.itemId].name;
                this.thisConArr = this.dataArr[this.itemId].spus;
                setTimeout(()=>{
                    this.loading = false;
                },1000);
            }
        },
        components:{
            'me-scroll':MeScroll,
            'me-loading':MyLoading
        },
        props:{
            dataArr:{
                type:Array,
                default:[]
            },
            itemId:{
                default:'0'
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .loading{
        margin-top: 10px;
    }

    .right-title{
        font-size: 12px;
        color: #333;
        margin-top: 9px;
        padding-left: 4px;
        border-left: 2px solid #ffd161;
    }
    .right-inner{
        height: 100%;
    }

    .right-list{
        height: 100%;
    }
    .right-list-inner{
        font-size: 14px;
        padding-bottom: 100px;
    }
    .menu-item{
        padding-top: 23px;
        padding-bottom: 23px;
        display: flex;
        border-bottom: 1px solid #f0f0f0;
        position: relative;

        .img{
            width: 58px;
            height: 58px;
            margin-right: 9px;
        }
        .menu-item-right{
            flex: 1;
        }
        .item-title{
            font-size: 14px;
            color: #2f2f2f;
        }
        .item-desc,.item-zan{
            color: #a9a9a9;
            font-size: 12px;
            margin-top: 5px;
            padding-right: 3.75px;
        }
        .item-desc{
            line-height: 18px;
        }
        .item-price{
            color: #fe4d3d;
            margin-top: 9px;
            font-size: 16px;
            .unit{
                color: #a9a9a9;
                font-size: 12px;
            }
        }
        .select-content{
            position: absolute;
            right: 12px;
            bottom: 18px;
            display: flex;

            .minus,.plus{
                width: 23px;
                height: 23px;
                background-size: cover;
            }
            .minus{
                background-image: url('./img/minus.png');
            }
            .plus{
                background-image: url('./img/plus.png');
            }
            .count{
                font-size: 13px;
                color: #2f2f2f;
                width: 23px;
                height: 23px;
                line-height:23px;
                margin-left: 2px;
                margin-right:2px;
                text-align: center;
            }
        }
    }

</style>