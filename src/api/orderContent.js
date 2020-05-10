import axios from 'axios';

export const getOrderContent = ()=>{
    return axios.get('../../static/orders.json')
                .then(res=>{
                    if(res.data.code == 0){
                        return res.data.data;
                    }
                    throw new Error('没有');
                })
                .catch(err=>{
                    if(err){console.log(err);}
                })
}