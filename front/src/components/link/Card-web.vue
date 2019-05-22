<template>
    <div style="background:#eee;">
        <Card class="card" :bordered="false">
            <h3 slot="title"><a :href="website.url" target="_blank"><Icon type="md-link" />{{website.title}}</a></h3>
            <p>由{{website.user}}分享</p>
            <img :src="website.cover" :alt="website.title">
            <p>{{website.info}}</p>
            <p><a :href="website.url" target="_blank">{{website.url}}</a></p>
            <p id="icons">
                <span><Icon type="md-calendar" /><Time :time="time" type="date" /></span>
                <span><Icon type="md-eye" />{{website.view}}</span>
                <span><Icon type="ios-bookmark" />{{website.likes}}</span>
            </p>
        </Card>
    </div>
</template>
<script>
    export default {
        props:['website'],
        data(){
            return {
                time:this.website.c_date
            }
        }
    }
</script>

<style scoped>
.card{
    position: relative;
    height: 300px;
    margin-bottom: 30px;
}
#icons i{  
    margin-top: -3px;
    margin-right: 5px;
}
i{
    margin-right: 5px; 
}
#icons{
    position: absolute;
    bottom: 10px;
}
#icons span{
    margin-right: 5px;
}
img{
    display: block;
    margin: 30px auto;
    width: 32px;
    height: 32px;
}

p{
    text-align: center;
}

</style>
