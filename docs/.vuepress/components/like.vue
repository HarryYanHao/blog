<template>
  <div class="like">
    <div><span @click='like'><vi-icon  :viIconName="icon"></vi-icon></span></div>
    <span class='tips' v-bind:class = "{'hidden':isHidden}">{{likeTips}}</span>
  </div>
</template>

<script>
import './js/iconfont.js'
import Icon from '../../../src/icon.vue'
export default {
  components:{
     'vi-icon':Icon
  },
  data () {
    return {
      likeTips:'You like this!',
      icon:'xin',
      isHidden:true,
    }
  },
  methods:{
    like:function(){
      if(this.icon == 'xin'){
        this.icon = 'xinaixin'
        this.isHidden = false
      }else{
        this.icon = 'xin'
        this.isHidden = true
      }
      
    }
  }
}
</script>
<style type="text/css">
.hidden {
    font-size: 0;
    font-weight:bold;
}
.like{
  margin: 1em 0;
  text-align: center;
}
.tips{
  font-weight:bold;
}
</style>
