<template>
    <div class="gamepage">
        {{roomData.players[0].score}}
        <div id="imagegame">
            <br>
            <!-- src="../assets/piring/1.png" -->
            <img v-if="page == ''" :src="setImagePoint" alt="FOOD" width="400" height="400" id="img_to_flip"><br>
            <div v-if="page == 'hint'" class="container row">
                <div class="col-sm-5">
                    <img :src="setImagePoint" alt="FOOD" width="400" height="400" id="img_to_flip"><br>
                </div>
                <div class="col-sm-5">
                     <img :src="setImageHint" alt="FOODHINT" width="400" height="400" id="img_hint"><br>
                </div>
            </div>
            <div class="container answerScore" style="margin-right: 10%;">
                <div class="row">
                    <div class="col-sm-6 offset-2">
                        <button @click="generateIndex" type="button" class="btn btn-primary">SKIP</button>
                        <h2>{{question}} |  <b>{{answerWrong}}</b></h2><br>
                        <form @submit.prevent="userAnswer">
                            <div class="form-group">
                                <input v-model="answer" type="text" class="form-control" id="answerPlayer" style="width: 500px;" aria-describedby="answerPlayer" placeholder="Your Answer . . .">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row" style="text-align:center;font-size: 80px; color: white;">
                    <div class="col">
                        <h5>{{roomData.players[0].name}}</h5>
                        <p>{{roomData.players[0].score}}</p>
                    </div>
                    <div class="col">
                        <h5>{{roomData.players[1].name}}</h5>
                        <p>{{roomData.players[1].score}}</p>
                    </div>
                    <div class="col">
                        <h5>{{roomData.players[2].name}}</h5>
                        <p>{{roomData.players[2].score}}</p>
                    </div>
                    <div class="col">
                        <p></p>
                    </div>
                    <div class="col">
                        <p></p>
                    </div>
                </div>
            </div>
            <audio controls autoplay loop hidden>
                <source src="https://storage.cloud.google.com/hacktiv-image/Lil%20Dicky%20-%20Earth%20(Lyrics).mp3" type="audio/mpeg">
            </audio>
        </div>
    </div>
</template>
<script>
import img1 from '../assets/piring/1.png'
import img2 from '../assets/piring/15.png'
import img3 from '../assets/piring/14.png'
import img4 from '../assets/piring/13.png'
import img5 from '../assets/piring/12.png'
import img6 from '../assets/piring/11.png'
import img7 from '../assets/piring/10.png'
import img8 from '../assets/piring/9.png'
import img9 from '../assets/piring/8.png'
import img10 from '../assets/piring/7.png'
import imgwinner from '../assets/piring2/2.png'
import imgwinner1 from '../assets/piring2/3.png'
import imgwinner2 from '../assets/piring2/4.png'
import imgwinner3 from '../assets/piring2/5.png'
// image hint
import gulai from '../assets/animasi/34.png'
import meatball from '../assets/animasi/37.png'
import papeda from '../assets/animasi/35.png'
import kepiting from '../assets/animasi/28.png'
import indomiegoreng from '../assets/animasi/29.png'
import mozarella from '../assets/animasi/30.png'
import perkedel from '../assets/animasi/31.png'
import sopiga from '../assets/animasi/32.png'
import sopayam from '../assets/animasi/33.png'
import abonsapi from '../assets/animasi/38.png'
import nasipadang from '../assets/animasi/36.png'
import pecel from '../assets/animasi/online.png'
//no image
import one from '../assets/noimage/21.png'
import two from '../assets/noimage/22.png'
import three from '../assets/noimage/23.png'
import four from '../assets/noimage/24.png'
//db
import db from '../apis/firebase.js';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    data(){
        return {
            roomData: {},
            page: 'hint',
            question: '',
            answerWrong:'',
            questionOut: '',
            answer: '',
            index: 0,
            savequestion: '',
            userpoint: 0,
            userWiner: '',
            image: [
                img1,
                img2,
                img3,
                img4,
                img5,
                img6,
                img7,
                img8,
                img9,
                img10,
                imgwinner,
                imgwinner1,
                imgwinner2,
                imgwinner3
            ],
            questions: [
                    'gulai',
                    'bakso',
                    'papeda',
                    'pecel',
                    'perkedel',
                    'kepiting',
                    'chicken',
                    'meatball',
                    'noodle',
                    'mozarella',
                    'sop iga',
                    'mie ayam',
                    'nasi padang',
                    'indomie goreng',
                    'sop ayam',
                    'abon sapi',
                    'fried chicken'],
            setImagePoint: '',
            imageHint:[
                gulai, 
                meatball, 
                papeda, 
                pecel,
                perkedel, 
                kepiting, 
                '',
                meatball,
                '',
                mozarella, 
                sopiga,
                '', 
                nasipadang,
                indomiegoreng, 
                sopayam, 
                abonsapi, 
                ''
            ],
            setImageHint: ''
        }
    },
    created(){
        this.generateIndex()
        this.setImage()
    },
    components:{
        img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,imgwinner,imgwinner1,imgwinner2,imgwinner3,
        gulai, 
        meatball, 
        papeda, 
        kepiting, 
        indomiegoreng, 
        mozarella, 
        perkedel, 
        sopiga, 
        sopayam, 
        abonsapi, 
        nasipadang, 
        pecel,
        one, two, three, four
    },
    methods:{
        generateIndex(){
            this.answerWrong = ''
            if(this.userpoint <= 10){
                let random = Math.floor(Math.random()*this.questions.length) 
                this.savequestion = this.questions[random]
                this.index = random
                this.hint(random)
                // this.setImageHint = this.imageHint[random]
                console.log(this.savequestion)
                this.question = this.questionRandom(this.questions[random])
                this.questionOut = this.question
            }
            else{
                // get the winner
                this.page = ''
                this.roomData.forEach(el => {
                    console.log(el, 'generate index')
                })
                this.question = `Game Over the winner is ${this.userWiner}`
                return (function() {     // function expression closure to contain variables
                    var i = 0;
                    var  img= [ imgwinner,imgwinner1,imgwinner2,imgwinner3 ];
                    var el = document.getElementById('img_to_flip');  // el doesn't change
                    function toggle() {
                        el.src = [i];           // set the image
                        i = (i + 1) % img.length;  // update the counter
                    }
                    setInterval(toggle, 250);
                })();             // invoke the function expression
            }
        },
        hint(index){
            const indexes = this.imageHint[index]
            if(indexes == ''){
                this.setImageHint = this.imageHint[index]
                this.answerWrong = 'Maaf dipikir sendiri yaaaaa '
                this.index = ''
            }else{
                this.answerWrong = ''
                this.setImageHint = this.imageHint[index]
                this.index = ''
            }
            
        },
        questionRandom(value){
            let word= value.split('')
            let randomWord= ''
            for(let i = 0; i < word.length; i++){
            let random = Math.floor(Math.random() * word.length)
                randomWord += word[random]
                word.splice(random, 1)
                i -= 1
            }
            return randomWord
        },
        userAnswer(){
            this.index = ''
            if(this.answer === this.savequestion){
                this.generateIndex()
                this.setImage()
                this.answer = ''
                this.index = ''
                db.collection('rooms')
                  .doc(this.$route.params.id).get()
                  .then((doc) => {
                        if (doc.exists) {
                            const data = []
                            this.userpoint++                        
                            let playerList = doc.data().players
                            playerList.forEach(element => {
                                if(element.name == localStorage.getItem('username')){
                                    this.setImage()                    
                                    element.score += 1
                                }
                                data.push(element)
                            });
                            this.$store.dispatch('updateData',{
                                id: this.$route.params.id,
                                data
                            })
                        } 
                        else {
                            console.log("No such document!");
                        }
                    })
                .catch(function(error) {
                  console.log("Error getting document:", error);
                });
            }else{
                console.log('ngga sama')
                this.answerWrong = 'Your answer is wrong!'
                this.generateIndex()
                this.setImage()
                this.userpoint -= 2
                db.collection('rooms')
                  .doc(this.$route.params.id).get()
                  .then((doc) => {
                    if(doc.exists){
                      const data = []
                      let playerList = doc.data().players
                      playerList.forEach((element) => {
                        if(element.name == localStorage.getItem('username')){
                          element.score -= 2
                        }
                        data.push(element)
                      }) 
                        this.$store.dispatch('updateData',{
                        id:this.$route.params.id,
                        data
                      })
                    }
                  })
            }
        },
        setImage(){
            if(this.userpoint === 0 || this.userpoint < 1){
                this.setImagePoint = this.image[1]
            }else if(this.userpoint === 1){
                this.setImagePoint = this.image[1]
            }else if(this.userpoint === 2){
                this.setImagePoint = this.image[2]
            }else if(this.userpoint === 3){
                this.setImagePoint = this.image[3]
            }else if(this.userpoint === 4){
                this.setImagePoint = this.image[4]
            }else if(this.userpoint === 5){
                this.setImagePoint = this.image[5]
            }else if(this.userpoint === 6){
                this.setImagePoint = this.image[6]
            }else if(this.userpoint === 7){
                this.setImagePoint = this.image[7]
            }else if(this.userpoint === 8){
                this.setImagePoint = this.image[8]
            }else if(this.userpoint === 9){
                this.setImagePoint = this.image[9]
            }else if(this.userpoint === 10){
                this.setImagePoint = this.image[10]
            }
        },
        theUserWinner(){
            db.collection("rooms")
            .doc(this.$route.params.id)
            .onSnapshot(
                doc => {
                this.roomData = doc.data()
                let playerList = doc.data().players
                let theWinner = ''
                console.log(this.roomData)
                playerList.forEach((element) => {
                    console.log(element.name, 'elname')
                    if(element.score == 10){
                        this.userWiner = element.name
                        let pemenang = element.name
                        theWinner = pemenang
                        return (function() {     // function expression closure to contain variables
                            var i = 0;
                            var  img = [ imgwinner,imgwinner1,imgwinner2,imgwinner3 ];
                            var el = document.getElementById('img_to_flip');  // el doesn't change
                            function toggle() {
                                el.src = [i];           // set the image
                                i = (i + 1) % img.length;  // update the counter
                            }
                            setInterval(toggle, 250);
                        })();  
                        Swal.fire({
                        title: 'Are you sure?',
                        text: `Game is Over, the winner is ${theWinner}`,
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK !'
                        }).then((result) => {
                        if (result.value) {
                            localStorage.clear()
                            this.$router.push('/')
                        }
                        })
                        // Swal.fire(`Game is Over, the winner is ${theWinner}`);
                        this.question = ` Game Over The winner is ${theWinner}`
                    }
                })
                },
                err => {
                console.log(err);
                }
            );
        }
    },
    computed:{
         ...mapState(['rooms'])
    },
    mounted(){
    db.collection("rooms")
      .doc(this.$route.params.id)
      .onSnapshot(
        doc => {
            console.log('masuk mounted ---')
          this.roomData = doc.data()
          console.log(this.roomData, ' ------ ')
          let playerList = doc.data().players
          console.log(playerList)
          playerList.forEach((element) => {
              if(element.score >= 10){
                let pemenang = element.name
                //  return (function() {     // function expression closure to contain variables
                //     var i = 0;
                //     var img = [ imgwinner,imgwinner1,imgwinner2,imgwinner3 ];
                //     var el = document.getElementById('img_to_flip');  // el doesn't change
                //     function toggle() {
                //         el.src = [i];           // set the image
                //         i = (i + 1) % img.length;  // update the counter
                //     }
                //     setInterval(toggle, 250);
                // })();  
                Swal.fire({
                        title: 'Game Over !!',
                        text: `The Winner is ${pemenang}`,
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK !'
                        }).then((result) => {
                            if (result.value) {
                                localStorage.clear()
                                this.$router.push('/')
                            }
                        })
                // localStorage.clear()
                // this.$router.push('/')
              }
          })
        },
        err => {
          console.log(err,'errrrorr dinis');
        }
      );
  }
}
</script>
<style>
    body{
        background-image: url('../assets/eatword.png');
        background-size: 110%;
    }
    #imagegame{
        padding-top: 100px;
    }
    h2, h4{
        color: aliceblue;
    }
    .answerScore {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
