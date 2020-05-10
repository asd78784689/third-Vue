<!-- 滚动组件 -->
<template>
    <swiper :options='swiperOption' ref='swiper' :key='keyId'>
        <swiper-slide>
            <slot></slot>
        </swiper-slide>
        <!-- <swiper-slide><div>&nbsp;</div></swiper-slide> -->
        <div class="swiper-pagination" slot='pagination' v-if='pagination'></div>
        <div class="swiper-scrollbar" slot='scrollbar' v-if='scrollbar'></div>

    </swiper>
</template>

<script>
    import {swiper,swiperSlide} from 'vue-awesome-swiper';

    export default{
        name:"MeScroll",
        data(){
            return{
                keyId:Math.random(),
                swiperOption:{
                    direction:this.direction,       //滑动方式
                    slidesPerView:'auto',        //容器同时显示数量!!!!!
                    freeMode: true,  // 自由模式 不限制滚动距离
                    setWrapperSize:true, //  设置swiper下的wrapper容器对应的高度
                    pagination:{            //分页器
                        el:this.pagination?'.swiper-pagination':null
                    },
                    scrollbar:{            //分页器
                        el:this.scrollbar?'.swiper-scrollbar':null,
                        hide:true
                    },
                    on:{
                        sliderMove:this.scroll,
                        touchEnd:this.touchEnd
                    }
                }
            }
        },
        methods:{
            scroll(){
                const swiper = this.$refs.swiper.swiper;
                if(swiper.isEnd){
                    //到达底部
                    if(!this.pullUp) return;
                    const isPullUp = Math.abs(swiper.translate) + swiper.height - 100 > parseInt(swiper.$wrapperEl.css('height'));
                    if(isPullUp){
                        //触发emit 让外部接受后去使用更新content
                        // this.$emit('pull-up');
                    }
                }
            },
            touchEnd(){
                const swiper = this.$refs.swiper.swiper;
                if(this.pulling) return;
                if(swiper.isEnd){
                    //到达底部
                    if(!this.pullUp) return;
                    this.pulling = true;
                    swiper.allowTouchMove = false;
                    swiper.setTransition(swiper.params.speed);
                    swiper.setTranslate(-(parseInt(swiper.$wrapperEl.css('height'))+100-swiper.height));
                    swiper.params.virtualTranslate = true; //定住不回弹
                    this.$emit('pull-up',this.pullUpEnd);
                }
            },
            pullUpEnd(){
                const swiper = this.$refs.swiper.swiper;
                this.pulling = false;
                swiper.allowTouchMove = true;
                swiper.params.virtualTranslate = false; //回弹
            },
            updateSwiper(){
                // console.log(23); 
                this.$refs.swiper.swiper.update();
            }
        },
        props:{
            data:{
                type:Array,
                default(){return [];}
            },
            direction:{
                type:String,
                default:'vertical',
                // 对传入值进行检测
                validator(value){
                    return ['horizontal','vertical'].indexOf(value) > -1;
                }
            },
            pullUp:{
                type:Boolean,
                default:false
            },
            pagination:{
                type:Boolean,
                default:false
            },
            scrollbar:{
                type:Boolean,
                default:true
            }
        },
        components:{
            swiper,swiperSlide
        },
        watch:{
            data(newArray){
                if(newArray.length ===0) return;
                this.keyId = Math.random();
            }
        }
    }
</script>

<style scoped lang='scss'>
    //父元素container的高度是可视区域的宽高
    .swiper-container{
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .swiper-slide{
        height: auto;
    }

</style>