<!-- content 组件 -->
<template>
    <div class="list-content">
        <h4 class="list-title">
            <span class="title-line"></span>
            <span>附近商家</span>
            <span class="title-line"></span>
        </h4>
        <div class="list-wrap">
            <div class="list-item" v-for="(item,index) in items" :key='index'>
                <router-link class="product-link"
                 :to="{name:'home-product'}">
                    <!-- 通过路由跳转到home下的product详情页 并传入对应点击项的id值 用于渲染 --> 
                    <img v-lazy="item.pic_url" alt="" class="item-img">
                    <div v-if='item.brand_type != 0' class="brand brand-pin">品牌</div>
                    <div v-else class="brand brand-xin">新到</div>
                    <div class="item-info-content">
                        <p class="item-title">{{item.name}}</p>
                        <div class="item-desc cf">
                            <div class="item-score">
                                <home-star :score='item.wm_poi_score'></home-star>
                            </div>
                            <div class="item-count">月售{{item.month_sale_num>999?'999+':item.month_sale_num}}</div>
                            <div class="item-distance">&nbsp;{{item.distance}}</div>
                            <div class="item-time">{{item.mt_delivery_time}}&nbsp;|</div>
                        </div>
                        <div class="item-price">
                            <div class="item-pre-price">{{item.min_price_tip}}</div>
                        </div>
                        <div class="item-others">
                            <div class="other-info" v-for="(item2,index2) in item.discounts2">
                                <img :src="item2.icon_url" class="other-tag">
                                <p class="other-content one-line">{{item2.info}}</p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <my-loading v-if='loading'></my-loading>
    </div>
</template>

<!-- 添加点击事件 跳转到详情页面进行点菜 -->

<script>
    import {getListContent} from '@/api/content.js';
    import HomeStar from './star';
    import MyLoading from '@/base/loading';

    export default{
        data(){
            return{
                items:[],
                startNum:0,
                endNum:8,
                pageSize:0,
                loading:true
            }
        },
        methods:{
            getContent(){
                // 获取内容数据
                getListContent().then(data=>{
                    // console.log(data);
                    this.loading = true;

                    this.pageSize = data.poilist.length;
                    if(this.endNum>this.pageSize) this.endNum = this.pageSize;
                    this.items = this.items.concat(data.poilist.slice(this.startNum,this.endNum));
                    // console.log(this.items);
                    this.startNum = this.endNum;
                    this.endNum += 8;
                    setTimeout(()=>{
                        this.loading = false;
                    },1000);
                    this.$emit('loaded',this.items);
                })
            },
            update(){
                // console.log(1);
                if(this.endNum < this.pageSize){
                    this.getContent();
                }
                return Promise.resolve();
            }
        },
        created(){
            this.getContent();
        },
        components:{
            'home-star':HomeStar,
            'my-loading':MyLoading
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .list-content{
        
        .list-title{
            margin-top: 10px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            text-align: center;
            .title-line{
                width: 20px;
                height: 1px;
                display: inline-block;
                margin-left: 7px;
                margin-right: 7px;
                background: #000;
                margin-bottom: 3px; 
            }
        }
        .list-wrap{
            padding-bottom: 100px;
            .list-item{
                display: flex;
                padding-top: 14px;
                padding-bottom: 14px;
                position: relative;
                margin: 0 10px 0;
                color: #656565;
                
                .product-link{
                    width: 100%;
                    position: relative;
                    display: flex;
                }

                .item-img{
                    width: 80px;
                    height: 60px;
                    border: 1px solid #e4e4e4;
                }
                .brand{
                    position: absolute;
                    top: 0;
                    left: 0;
                    font-size: 12px;
                    padding: 2px;
                    color: #fff;
                }
                .brand-pin{
                    background-color: #ffa627;
                }
                .brand-xin{
                    background-color: #21c56c;
                }
                .cf{
                    &::before{
                        content: '';
                        display: table;
                    }
                    &::after{
                        content: '';
                        display: table;
                        clear: both;
                    }
                }
                .item-info-content{
                    flex: 1;
                    margin-left: 7px;
                    overflow: hidden;

                    .item-title{
                        margin-top: 3px;
                        font-size: 15px;
                        font-weight: 400;
                        color: #333;
                    }
                    .item-desc{
                        margin-top: 12px;
                        font-size: 12px;
                    }
                    .item-count,.item-score{
                        float: left;
                    }
                    .item-count{
                        margin-left: 4.5px;
                    }
                    .item-distance,.item-time{
                        float: right;
                    }
                    .item-price{
                        margin-top: 9px;
                        font-size: 12px;
                        height: 22px;
                    }
                    .other-info{
                        margin-top: 6.5px;
                        font-size: 12px;
                        color: #898989;
                        display: flex;
                    }
                    .other-tag{
                        width: 14px;
                        height: 14px;
                    }
                    .other-content{
                        margin-left: 2.5px;
                        height: 14px;
                        width: 210px;
                        margin-top: 1.5px;
                    }
                    .one-line{
                        @include ellipsis();
                    }

                }
            }
        }
    }
</style>