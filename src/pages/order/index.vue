<!-- order页面 -->
<template>
    <div class="order">
        <div class="g-header-container">
            <me-scroll :pagination='pagination' :direction='direction' :pullUp='pullUp' ref='mySwiper' @pull-up='pullToRefresh'>
                <order-header></order-header>
                <div class="order-wrap">
                    <div class="order-item" v-for='(item,index) in items' :key='index'>
                        <div class="order-item-inner">
                            <img :src="item.poi_pic" alt="" class="item-img">
                            <div class="item-right">
                                <div class="item-top">
                                    <p class="order-name one-line">{{item.poi_name}}</p>
                                    <div class="arrow"></div>
                                    <div class="order-state">{{item.status_description}}</div>
                                </div>
                                <div class="item-bottom">
                                    <div class="product-item" v-for='item2 in (item.product_list )'>
                                        {{item2.product_name}}
                                        <div class="p-count">X{{item2.product_count}}</div>
                                    </div>
                                    <div class="product-item">
                                        <span>...</span>
                                        <div class="p-total-count">
                                            总计{{item.product_count}}个菜，实付
                                            <span class="total-price">￥{{item.total}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="evaluation cf">
                            <div class="evaluation-btn" v-for="item3 in item.button_list">{{item3.title}}</div>
                        </div>
                    </div>
                </div>
            </me-scroll>
        </div>
    </div>
</template>

<script>
    import OrderHeader from './header';
    import MeScroll from '@/base/scroll';
    import {getOrderContent} from '@/api/orderContent.js';
    
    export default{
        data(){
            return{
                direction:'vertical',
                pagination:false,
                pullUp:true,
                items:[],
                thisNum:1,
                totalNum:3
            }
        },
        components:{
            'me-scroll':MeScroll,
            'order-header':OrderHeader
        },
        methods:{
            getContent(){
                getOrderContent().then(data=>{
                    console.log(data);
                    if(this.thisNum !== this.totalNum){
                        this.items = this.items.concat(data.digestlist);
                        console.log(this.items);
                        this.thisNum++;
                    }else{
                        console.log('加载完成');
                    }
                    return Promise.resolve();
                })
            },
            update(){
                this.getContent();
                return Promise.resolve();
            },
            pullToRefresh(end){
                this.update().then(()=>{
                    end();
                    setTimeout(()=>{
                        // 异步执行更新 防止渲染未结束就进行了更新
                        this.$refs.mySwiper.updateSwiper();
                    },100);
                    
                });
            }
        },
        created(){
            this.getContent();
        }
    }
</script>

<style lang='scss' scoped>
    @import '~@/assets/scss/mixins';

    .order{
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color:#fff;
    }
    .g-header-container{
        height: 100%;
    }

    .order-wrap{
        padding-bottom: 55px;
        .order-item{
            border-top: 12px solid #efefef;
            .order-item-inner{
                display: flex;
                padding-bottom: 15px;
                border-bottom: 1px solid #e0e0e0;

                .item-img{
                    width: 37.5px;
                    height: 37.5px;
                    margin-top:7px;
                    margin-left: 15px;
                    display: block;
                    border-radius: 50%;
                }
                .item-right{
                    flex: 1;
                    margin-left: 14px;
                    font-size: 14px;

                    .item-top{
                        height: 48px;
                        padding-top: 2px;
                        display: flex;
                        align-items: center;
                        border-bottom: 1px solid #e0e0e0;

                        .order-name{
                            font-weight: 600;
                            width: 168px;
                            height: 15px;
                            font-size: 15px;
                        }
                        .one-line{
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .arrow{
                            width: 6.5px;
                            height: 6.5px;
                            border: 1px solid #999;
                            border-width: 1px 1px 0 0 ;
                            transform: rotate(45deg);
                        }
                        .order-state{
                            font-size: 13px;
                            color: #999;
                            margin-left: 55px;
                        }
                    }
                    .item-bottom{
                        font-size: 13px;
                        color: #666;
                        margin-top: 11px;
                        .product-item{
                            font-size: 14px;
                            color: #666;
                            margin-top: 11px;
                        }
                        .p-count{
                            float: right;
                            margin-right: 14px;
                        }
                        .p-total-count{
                            float: right;
                            margin-right: 14px;
                            font-size: 13px;
                            .total-price{
                                font-size: 14px;
                                color: #151515;
                                margin-left: 1.5px;
                                letter-spacing:1px;
                            }
                        }
                    }
                }
            }
            .evaluation{
                padding-top: 9px;
                padding-bottom: 9px;
                .evaluation-btn{
                    float: right;
                    margin-right: 9.375px;
                    width: 93px;
                    height: 30px;
                    background-color: #ffd161;
                    text-align: center;
                    line-height: 30px;
                    color: #6B450a;
                    font-size: 14px;
                }
            }
            .cf{
                &::before,&::after{
                    content: '';
                    display: table;
                }
                &::after{
                    clear:both;
                }
            }
        }
    }
</style>