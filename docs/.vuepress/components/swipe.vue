<template>
  <swipe :items="items"></swipe>
</template>

<script>
import Swipe from '../../../src/swipe.vue'
export default{
  components:{
    'swipe':Swipe
  },
 data() {
      return {
        items:[]
      }
    },
  mounted(){
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


