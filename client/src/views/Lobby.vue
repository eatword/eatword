<template>
<div id="backgroundImg">
  <div class="container">
     <p class="text-right" style="padding-top: 10px;">Create or join room to get started.</p>
    <!-- Button trigger modal -->
    <div class="text-right" style="margin-left: 10px;">
      <button
        type="button"
        class="btn green ml-2"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        <img
          src="../assets/online (3).png"
          height="100px"
        >
      </button>
    </div>
  </div>
  <!-- modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
         <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">RoomName:</label>
              <input type="text" class="form-control" id="recipient-name" v-model="roomName">
            </div>
          </form>
        </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal"></button>
            <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="createRoom">Submit</button>
          </div>
        </div>
      </div>
    </div>
   <div class="container" style="font-family: 'Indie Flower', cursive;">
      <div class="row align-self-start" style="padding-top: 150px;">
        <div class="col-md-4" v-for="(room,index) in rooms" :key="index">
         <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="../assets/online (2).png" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h4 class="card-title" style="color: black;">{{room.name}}</h4>
                  <h4 class="card-title" style="color: black;"> {{room.players.length}}/3</h4>
                  <a href="#" class="btn disabled" v-if="rooms.players >= 3"> Full</a>
                  <a href="#" class="btn blue mt-2" v-else @click.prevent="joinRoom(room.id)">Click here to Join</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      roomName: ''
    }
  },
  created () {
    this.$store.dispatch('getAllRooms')
    console.log(this.rooms)
  },
  computed: {
    ...mapState(['rooms'])
  },
  methods: {
    createRoom () {
      // console.log('asd')
      $('#exampleModalCenter').modal('hide')
      this.$store.dispatch('createRoom', this.roomName)
      localStorage.setItem('room', this.roomName)
    },
    joinRoom (id) {
      this.$store.dispatch('joinRoom', id)
    }

  }
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
