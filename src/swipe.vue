<template>
  <mt-swipe :auto="5000" @change = "handleChange"  v-bind:style = "{'height': elHeight + 'px' }">
  <mt-swipe-item v-for = "item in items"><el-image style = "width:100%":src="item.url"  ref="imgRef" @load="imgLoad"></el-image></mt-swipe-item>
</mt-swipe>
</template>

<script>

export default{
  data(){
    return {
      elHeight:0
    }
  },
   props:{
        items:{
            type: Array
        }
    },
  methods:{
      imgLoad(msg){
          console.log(msg.path[4])
          this.$nextTick(function () {
            console.log(this.$refs.imgRef[0].$el.clientHeight)
            this.elHeight = this.$refs.imgRef[0].$el.clientHeight
        })
      },
      handleChange(i) {
        this.elHeight = this.$refs.imgRef[i].$el.clientHeight
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

</style>


