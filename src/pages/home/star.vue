<template>
    <div class="star-score">
        <div class="star fullstar" v-for='n in starNum'></div>
        <div class="star halfstar" v-for='n in halfNum'></div>
        <div class="star graystar" v-for='n in grayNum'></div>
    </div>
</template>
<script>
    
    export default{
        name:'HomeStar',
        data(){
            return{
                starNum:0,
                grayNum:0,
                halfNum:0
            }
        },
        props:{
            score:{
                type:Number,
            }
        },
        created(){
            this.getStarScore();
        },
        methods:{
            getStarScore(){
                // console.log(this.score);
                this.starNum = Math.floor(this.score);
                this.halfNum = (this.score - this.starNum) > 0.5 ? 1: 0;
                this.grayNum = 5 - this.starNum - this.halfNum ;
            }
        }
    }
</script>

<style scoped lang='scss'>
    .item-score{
        float: left;

        .star{
            width: 9px;
            height: 9px;
            float: left;
            background-size: cover;
        }
        .fullstar{
            background-image: url("./img/starScore/fullstar.png");
        }
        .graystar{
            background-image: url("./img/starScore/graystar.png");
        }
        .halfstar{
            background-image: url("./img/starScore/halfstar.png");
        }
    }
</style>