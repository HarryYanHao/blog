<template>
  <swipe v-if="is_terminal" :items="items"></swipe>
  <carousel v-else carousel :items="items"></carousel>
</template>

<script>
import Carousel from '../../../src/carousel.vue'
import Swipe from '../../../src/swipe.vue'
export default{
  components:{
    'carousel':Carousel,
    'swipe':Swipe
  },
 data() {
      return {
        items:[],
        is_terminal:true,
      }
    },
  mounted(){
      this.$nextTick(function () {
        this.is_terminal = navigator.userAgent.match(/(iPhone|iPod|Androids|ios)/i)
      })
      
      const path = this.$page.path
      if(path == '/technical/vuepress.html'){
        this.items = [{'url':'/nippon.jpeg'},{'url':'/nippon.jpeg'},{'url':'/nippon.jpeg'}]
      }
      if(path == '/article/change.html'){
        this.items = [{'url':'/nippon.jpeg'},{'url':'/nippon1.jpg'},{'url':'/tbskc.png'}]
      }
    }
}
</script>


