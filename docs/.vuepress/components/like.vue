<template>
  <div class="like">
    <button class='like-toggle basic3' v-bind:class="{'like-active':isActive}" @click="like">{{ text }}</button>
    <span class='tips' v-bind:class = "{'hidden':isHidden}">{{likeTips}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '♥',
      likeTips:'You like this!',
      isActive:false,
      isHidden:true,
    }
  },
  methods:{
    like:function(){
      if(!this.isActive){
        this.isActive = true
        this.isHidden = false
      }else{
        this.isActive = false
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
.like-toggle {
    transition: all 0.3s linear;
    outline: none;
    box-shadow: none;
    border: none;
    width: 40px;
    height: 30px;
    font-size: 1.3em;
    border-radius: 100px;
}
.like-toggle.basic3 {
    border: none;
    width: 30px;
    height: 30px;
    font-size: 1.3em;
    border-radius: 100px;
    background: #438cca;
    color: #fff;
    margin-bottom: 10px;
}
.like-toggle.basic3:not(.like-active):hover {
    background: #f26c4f;
    transform: rotate(90deg);
}
.like-active.basic3 {
    background: #7cc576;
    transform: rotate(-180deg);
}
.tips{
  font-weight:bold;
}
</style>
