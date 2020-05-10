<!--  product-header 组件 -->
<template>
    <div class="header">
        <me-navbar :title='title'>
            <div slot='left'>
                <span class="icon-back" @click="goBack"><</span>
            </div>
        </me-navbar>
    </div>
</template>

<script>
    import MeNavBar from '@/base/navbar';

    export default{
        name:'productHeader',
        data(){
            return{
                title:'深圳麦当劳前海二餐厅'
            }
        },
        methods:{
            goBack(){
                // 返回上一级
                this.$router.back();
            }

        },
        components:{
            'me-navbar':MeNavBar
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .header{
        border-bottom: 1px solid #b2b2b2;
    }

    .icon-back{
        font-size: 24px;
    }
    
</style>