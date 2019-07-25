<template>
  <div id="home">
    <div class="row">
      <div class="col-sm-4 offset-4">
        <h4 id="user-label">Username:</h4>
          <form @submit.prevent="login">
            <div class="form-group">
              <input v-model="username" type="text" class="form-control" id="username" placeholder="Place Input Your Username">
            </div>
          </form>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'home',
  data(){
    return {
      username:''
    }
  },
  methods:{
    login(){
      localStorage.setItem('username',this.username)
      this.$store.commit('SetPlayer', this.username)
      this.$store.dispatch('getAllRooms')
      this.username = ''
      this.$router.push('/lobby')
    }
  },
  components: {
    
  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    background-image: url('../assets/2.png');
    background-size: cover;
    background-repeat: no-repeat;

  }

  #user-label{
    margin-top: 85%;
    margin-left: 5%
  }
</style>

