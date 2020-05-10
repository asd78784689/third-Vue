
<template>
    <me-navbar>
        <div slot='left' class="bar-location">
            <div class="location-icon"></div>
            <div class="location-text">郑州市</div>
        </div>
        <div slot='center' class="search-btn">鸡翅</div>
    </me-navbar>
</template>

<script>
    import MeNavBar from '@/base/navbar';

    export default{
        data(){
            return{

            }
        },
        components:{
            'me-navbar':MeNavBar
        }
    }
</script>

<style scoped lang='scss'>
    
    .bar-location{
        
        margin-left: 60px;
        background-color: rgba(0,0,0,.3);
        width: 88px;
        height: 30px;
        border-radius: 10px;
        display: flex;
        align-items: center;

        .location-icon{
            margin-left:5px;
            width: 14px;
            height: 18px;
            background-image: url('./img/locationIcon.png');
            background-size: cover;
        }
        .location-text{
            color: #fff;
            font-size: 14px;
            margin-left: 7px;
            position: relative;
            &:before{
                content: '';
                display: inline-block;
                position: absolute;
                top: -1px;
                right: -17px;
                width: 15px;
                height: 15px;
                background-image: url('./img/arrowIcon.png');
                background-size: cover;
            }
        }
    }
    .search-btn{
        width: 150px;
        height: 25px;
        background-color: #fff;
        color: #a9a9a9;
        border-radius: 10px;
        text-indent: 25px;
        display: flex;
        align-items: center;
        position: relative;

        &::after{
            content: '';
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 5px;
            margin-top: -7px;
            width: 14px;
            height: 14px;
            background-image: url('./img/searchIcon.png');
            background-size: cover;
        }
    }
</style>