import Vue from 'vue'
import Vuex from 'vuex'
import db from './apis/firebase.js'
import router from './router.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPlayer:'',
    rooms:[]
  },
  mutations: {
    SetPlayer(state, username){
      state.currentPlayer= username
    },
    setRooms(state, rooms){
      state.rooms= rooms
    }
  },
  actions: {
    createRoom(context, payload){
        db.collection('rooms')
          .add({
            name: payload,
            players: [{ name: localStorage.username, score: 0 }],
            winner: '',
            createdAt: new Date(),
          })
          .then((docs) => {
            console.log(docs)
            console.log(docs._key.path.segments[1])
            localStorage.setItem('idRoom', docs._key.path.segments[1])
            router.push(`/waiting/${docs._key.path.segments[1]}`)
            context.dispatch('getAllRooms')
          })
          .catch((err) => {
            console.log(err)
        })
    },
    
    getAllRooms(context){
      db.collection('rooms')
        .orderBy('createdAt')
        .onSnapshot((docs) => {
          let rooms = []

          docs.forEach(el => {
            let info = el.data()
            info.id = el.id
            rooms.push(info)
          });
          context.commit('setRooms', rooms)
        }, (error) => {
          console.log('error get all rooms')
          console.log(error)
      })
    },

    joinRoom(context, roomId){
      let newPlayers = []
      let room = context.state.rooms.find(room => room.id === roomId)
      newPlayers = room.players

      if (newPlayers.length < 3) {
        newPlayers.push({ name: context.state.currentPlayer, score: 0 })
        db.collection('rooms')
          .doc(roomId)
          .update({
            players: newPlayers,
          })
          .then(() => {
            context.dispatch('getAllRooms')
            console.log(roomId,'ini room')
            router.push(`/waiting/${roomId}`)
          })
          .catch((err) => {
            console.log(err)
          })
        } else {
          alert('Maaf Room Ini Sudah Penuh');
        } 
    },

    updateData(context,payload){
      db.collection('rooms')
        .doc(payload.id).update({
          players: payload.data,
        })
        .then(() => {
          
          context.dispatch('getAllRoom')
        })
        .catch((error) => {
          console.log('error update data')
          console.error(error);
        });
    }
  }
})
