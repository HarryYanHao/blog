<template>
  <el-carousel :height="elHeight + 'px'"  @change="carouselChange">
      <el-carousel-item v-for="item in items" >
        <el-image style = "width:100%":src="item.url" :fit = "fits" ref="imgRef" @load="imgLoad"></el-image>
      </el-carousel-item>
    </el-carousel>
</template>

<script>
 export default {
    data() {
      return {
        fits: 'fill',
        elHeight:0,
      }
    },
    props:{
        items:{
            type: Array
        }
    },
    methods:{
      carouselChange:function(i){
        this.elHeight = this.$refs.imgRef[i].$el.clientHeight
      },
      imgLoad(){
        this.$nextTick(function () {
        console.log(this.$refs.imgRef[0].$el.clientHeight)
        this.elHeight = this.$refs.imgRef[0].$el.clientHeight
      })
      }
    },
    mounted(){
      const that = this
      window.addEventListener('resize',function(){
        that.elHeight = that.$refs.imgRef[0].$el.clientHeight
      })   
    }
  }
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

