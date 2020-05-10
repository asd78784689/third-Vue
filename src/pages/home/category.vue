<!-- category -->
<template>
    <div class="me-category">
        <ul class="category">
            <li class="category-item" v-for="(item,index) in items">
                <img :src="item.url" alt="">
                <p>{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getCategoryItem} from '@/api/category.js';

    export default{
        name:"HomeCategory",
        data(){
            return{
                items:[]
            }
        },
        methods:{
            getCategory(){
                getCategoryItem().then(data=>{
                    this.items = data.slice(0,8);
                })
            }
        },
        created(){
            this.getCategory();
        }
    }
</script>

<style scoped lang='scss'>
    .me-category{
        margin-top: 2.4rem;
    }
    .category{
        // padding-top: 120px;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        &-item{
            width: 25%;
            justify-content: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 15px;

            img{
                width: 44px;
                margin-bottom: 5px;
            }
        }
    }
    
</style>