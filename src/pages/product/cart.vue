<!--  cart 组件 -->
<template>
    <div class="shop-cart">
        <div class="choose-content" v-show='showCar'>
            <me-scroll ref='mySwiper'>
                <div class="content-top" >
                    <div class="clear-car" @click='clearCart'>清空购物车</div>
                </div>
                <div class="choose-item" v-for='(item,index) in items' :key='index' :data-parent='item.parentInd' :data-id='item.thisIndex' v-if='item.status'>
                    <div class="item-name">{{item.name}}</div>
                    <div class="price">￥<span class="total">{{item.min_price}}</span></div>
                    <div class="select-content">
                        <div class="minus" @click='minusClick'></div>
                        <div class="count">{{item.status}}</div>
                        <div class="plus" @click='plusClick'></div>
                    </div>
                </div>
            </me-scroll>
        </div>
        <div class="bottom-content">
            <!-- 绑定点击事件 当有商品时进行显示购物车 并传出一个$emit用于让mask显示
            还要让choose-content显示出来 所以要接收data数据进行渲染且同样拥有更改数据的能力 -->
            <div class="shop-icon" @click='showCart'>
                <div class="dot-num" v-show='items.length'>{{items.length}}</div>
            </div>
            <div class="price-content">
                <p class="total-price">
                    ￥<span class="total-price-span">{{allCounts}}</span>
                </p>
                <p class="other-price">另需配送&nbsp;<span class="shipping-fee">9元</span></p>
            </div>
            <div class="submit-btn">去结算</div>
        </div>
    </div>
</template>

<script>
    import MeScroll from '@/base/scroll'; 
    export default{
        name:'MenuCart',
        data(){
            return{
                items:[],
                showCar:false,
                allCounts:0
            }
        },
        methods:{
            getContent(arr){
                //对数据进行循环遍历 如果有一个为status就加到一个变量中 并改变数字
                if(arr){
                    // console.log(arr);
                    this.updataCount(arr);
                    // console.log(this.items);
                }
                return Promise.resolve();
            },
            showCart(e){
                // console.log(1);
                this.showCar = !this.showCar;
                this.$emit('showcart',this.showCar);
            },
            minusClick(e){
                // console.log('minus');
                // 点击后 通过父元素查找到该项位于items中的下标data-parent、data-id
                //用下标找到dataArr中相应的item 改变其中的status属性 然后还要
                //通过$emit发送出去
                //然后在menu中接收到并更新dataArr
                let parentNum = e.target.parentNode.parentNode.getAttribute('data-parent');
                let thisNum = e.target.parentNode.parentNode.getAttribute('data-id');
                // if(this.dataArr[this.itemId].spus[thisNum].status === 0) return;
                // 通过绑定的data值将数据中的对应item的status减1
                let thisItem = this.dataArr[parentNum].spus[thisNum];
                thisItem.status -= 1;
                // console.log(this.dataArr);
                //更改this.allCounts 的总价 和 items.length的值
                this.updataCount(this.dataArr);
                // 试试直接通过获取到这个swiper 将wrapper的高度改为与slide相同
                // console.log(this.$refs.mySwiper);
                if(thisItem.status === 0){
                    // 当前项为0个时 因为更新有问题 所以直接强制删减一个item的高
                    let slideHeight = this.$refs.mySwiper.$el.children[0].children[0].scrollHeight;
                    this.$refs.mySwiper.$el.children[0].style.height = (parseInt(slideHeight) - 50)+'px';
                }
                this.$emit('changeArr',this.dataArr);
            },
            plusClick(e){
                // 点击就+1 并返回数据
                // console.log('plus');
                // console.log(e.target.parentNode.parentNode.getAttribute('data-id'));
                let parentNum = e.target.parentNode.parentNode.getAttribute('data-parent');
                let thisNum = e.target.parentNode.parentNode.getAttribute('data-id');
                this.dataArr[parentNum].spus[thisNum].status += 1;
                // console.log(this.dataArr);
                this.allCounts += this.dataArr[parentNum].spus[thisNum].min_price;
                this.$emit('changeArr',this.dataArr);
            },
            clearCart(e){
                //被点击时 清除所有已选项 

                //之后要做的为 1、查看路由懒加载 2、图片懒加载 3、loading加载中组件
                //4、缓存

                console.log(1);
                //清空thisItem 
                this.updataCount(this.dataArr,true);
                // console.log(this.$refs.mySwiper.$el.children[0].children[0].children[0].scrollHeight);
                let slideHeight = this.$refs.mySwiper.$el.children[0].children[0].children[0].scrollHeight;
                // 强制让wrapper的高度设置为一条而已
                this.$refs.mySwiper.$el.children[0].style.height = parseInt(slideHeight)+'px';
            },
            updataCount(arr,clear){
                // 更新
                this.allCounts = 0;
                this.items = [];
                arr.forEach((item,index)=>{
                    item.spus.forEach((item2,index2)=>{
                        if(item2.status != 0){
                            // this.allNums++;
                            // 修改两个属性出来用于获取下标
                            if(clear){
                                //如果选择清除就全清空
                                item2.status = 0;
                            }else{
                                item2.parentInd = index;
                                item2.thisIndex = index2;
                                this.allCounts += (item2.min_price*item2.status);
                                this.items.push(item2);
                            }
                            
                        }
                    })
                });
            }
        },
        created(){
            
        },
        watch:{
            // 解决监听 
            dataArr(arr){
                this.dataArr = arr;
                // console.log(this.dataArr);
                // console.log('watch Arr change');
                this.getContent(arr).then(()=>{
                    setTimeout(()=>{
                        this.$refs.mySwiper.updateSwiper();
                    });
                });
            }
        },
        components:{
            'me-scroll':MeScroll
        },
        props:{
            dataArr:{
                type:Array,
                default:[]
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .swiper-container{
        max-height:93.5vh;
    }

    .shop-cart{
        // height: 100%;
        // position: relative;
    }

    .choose-content{
        background-color: #fff;
        min-height:50px;
        max-height: 93.5vh;
        height: auto;
        overflow:hidden;


        .content-top{
            height: 32px;
            background-color: #f4f4f4;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .clear-car{
                margin-left: 9px;
                margin-right: 8px;
                position: relative;

                &::after{
                    content: '';
                    display: inline-block;
                    position: absolute;
                    top: 1px;
                    left: -14px;
                    width: 12px;
                    height: 12px;
                    background-image: url('./img/clear.jpeg');
                    background-size: cover;
                }
            }
        }
        .choose-item{
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #2f2f2f;
            line-height: 30px;
            padding-top: 9px;
            padding-bottom: 9px;
            border-bottom: 1px solid #ddd;
            height: 50px;

            .item-name{
                flex: 1;
                padding-left: 9px;
            }
            .price{
                margin-left: 4px;
                margin-right: 23px;
            }
            .select-content{
                position: relative;
                margin-right: 7.5px;
                display: flex;

                .minus{
                    background-image: url('./img/minus.png');
                }
                .plus{
                    background-image: url('./img/plus.png');
                }
                .minus,.plus{
                    width: 23px;
                    height: 23px;
                    background-size: cover;
                }
                .count{
                    font-size: 13px;
                    color: #2f2f2f;
                    width: 23px;
                    height: 23px;
                    line-height: 23px;
                    margin-left: 1.8px;
                    margin-right: 1.8px;
                    text-align:center;
                }
            }
        }
    }

    .bottom-content{
        height: 46px;
        display: flex;
        background-color: rgba(51,51,51,.9);

        .shop-icon{
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background-image: url('./img/shop-icon.png');
            background-size: cover;
            position: relative;
            margin-left: 9px;

            .dot-num{
                position: absolute;
                right: 0;
                top: 0;
                background-color: #fb4e44;
                width: 17px;
                height: 17px;
                font-size: 12px;
                color: #fff;
                border: 1px solid #fff;
                border-radius: 50%;
                text-align: center;
                line-height: 14px;
            }
        }
        .price-content{
            flex:1;
            padding-top: 7.5px;
            padding-left: 6.5px;

            .total-price{
                font-size: 18px;
                color: #fff;
            }
            .other-price{
                font-size: 12px;
                color: #999;
                margin-top: 1.8px;
            }
        }
        .submit-btn{
            width: 103px;
            background-color: #ffd161;
            color: #333;
            text-align: center;
            font-size: 14px;
            height: 100%;
            line-height: 46px;
        }
    }
</style>