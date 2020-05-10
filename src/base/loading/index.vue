<!-- loading加载中组件 -->
<template>
    <div class="mine-loading" :class="{'mine-loading-inline':inline}">
        <!-- indicator 图标 inline单行 -->
        <span class="mine-loading-indicator" v-if="indicator === 'on'">
            <slot><img src="./loading.gif" alt=""></slot>
        </span>
        <span class="mine-loading-text" v-if='text'>{{text}}</span>
    </div>
</template>

<script>
    
    export default{
        name:'MyLoading',
        data(){
            return{

            }
        },
        props:{
            indicator:{
                type:String,
                default:"on",
                validator(value){
                    return ['on','off'].indexOf(value) > -1;
                }
            },
            text:{
                type:String,
                default:'加载中'
            },
            inline:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '~@/assets/scss/mixins';

    .mine-loading{
        @include flex-center(column);
        width: 100%;
        height: 100%;

        &.mine-loading-inline{
            flex-direction: row;

            .mine-loading-text{
                margin-top:0;
                margin-left:1px;
            }
        }

        &-text{
            margin-top:1px;
            margin-left:0;
        }
    }

</style>