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
  created(){
      this.$nextTick(function () {
        this.is_terminal = navigator.userAgent.match(/(iPhone|iPod|Androids|ios)/i)
      })
      
      const path = this.$page.path
      if(path == '/technical/vuepress.html'){
        this.items = [{'url':'/nippon.jpeg'},{'url':'/nippon.jpeg'},{'url':'/nippon.jpeg'}]
      }
      if(path == '/article/change.html'){
        this.items = [{'url':'/change_banner1.jpg'},{'url':'/change_banner2.jpg'},{'url':'/change_banner3.jpg'},{'url':'/change_banner4.jpg'},{'url':'/change_banner5.jpg'}]
      }
      if(path == '/article/nippon.html'){
        this.items = [{'url':'/nippon_banner1.jpg'},{'url':'/nippon_banner2.jpg'},{'url':'/nippon_banner3.jpg'},{'url':'/nippon_banner4.jpg'},{'url':'/nippon_banner5.jpg'},{'url':'/nippon_banner6.jpg'}]
      }
    }
}
</script>


