<template>
    <div class="row">
        <div class="col-sm-5 offset-sm-3">
            <h1>You are on room : {{currentRoom.name}}</h1>
            <div v-for="(player, index) in currentRoom.players" :key="index" class="card">
                <div class="card-body">
                    {{player.name}} is ready
                </div>
            </div>
            <button v-if="currentRoom.players[0].name == user" type="button" class="btn btn-warning" @click="start">Start!</button>
        </div>
    </div>
</template>

<script>
import db from '@/apis/firebase.js'
export default {
  data () {
    return {
      currentRoom: {},
      user: localStorage.username
    }
  },
  methods: {
    start () {
      db.collection('rooms')
        .doc(this.$route.params.id).update({
          isReady: true
        })
        .then(() => {
          console.log('start playing')
        })
        .catch((error) => {
          console.log('error start game')
          console.error(error)
        })
    }
  },
  created () {
    db.collection('rooms')
      .doc(this.$route.params.id)
      .onSnapshot(
        (doc) => {
          this.currentRoom = doc.data()
          if (this.currentRoom.isReady == true) {
            console.log('masuk ke gamennya')
            this.$router.push(`/game/${this.$route.params.id}`)
          }
        },
        (error) => {
          console.log('error masuk ke game')
          console.log(error)
        })
  }

}
</script>

<style>

</style>
