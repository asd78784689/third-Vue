import axios from 'axios';
//axios获取category数据
export const getCategoryItem = ()=>{
    return axios.get('../../static/head.json')
                .then(res=>{
                    if(res.data.code == 0){
                        return res.data.data.primary_filter;
                    }
                    return res;
                })
                .catch(err=>{
                    if(err){console.log(err)}
                })
}