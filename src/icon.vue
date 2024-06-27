<template>
    <svg class="iconfront">
        <use :xlink:href="`#icon-${viIconName}`"></use>
    </svg> 
</template>
<script>
export default {
    name:'ViIcon',
    props:{
        viIconName:{
            type: String
        }
    }
}
</script>   
<style>
.iconfront {
  width: 2.0em;
  height: 2.0em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
