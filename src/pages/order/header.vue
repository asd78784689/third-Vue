
<template>
    <me-navbar :title='title' class='header'></me-navbar>
</template>

<script>
    import MeNavBar from '@/base/navbar';

    export default{
        name:'OrderHeader',
        data(){
            return{
               title:'订单'
            }
        },
        components:{
            'me-navbar':MeNavBar
        }
    }
</script>

<style scoped lang='scss'>
    .header{
        border-bottom:1px solid #b2b2b2;
    }
    
</style>