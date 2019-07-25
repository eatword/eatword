<template>
  <div id="backgroundImg">
   <div class="container" style="padding-left:250px;">
      <div class="row justify-content-center" style="padding-top: 400px;">
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
      </div>
      <div class="row">
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
      </div>
      <div class="row ">
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#backgroundImg{
  background-image: url('../assets/1.png');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  height: 100vh;
  background-size: auto;
}



</style>
