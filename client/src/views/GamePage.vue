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
            <button @click="generateIndex" type="button" class="btn btn-primary">start</button>
            <button @click="hint" type="button" class="btn btn-primary">hint</button>
            <h2>{{question}} </h2>
            <form @submit.prevent="userAnswer">
                <div class="form-group">
                    <input v-model="answer" type="text" class="form-control" id="answerPlayer" aria-describedby="answerPlayer" placeholder="Your Answer . . .">
                </div>
            </form>
            <div class="row" style="text-align:center;font-size: 80px; font-family: 'Orbitron', sans-serif; color: red">
                <div class="col">
                    <p>{{roomData.players[0].score}}</p>
                </div>
                <div class="col">
                    <p>{{roomData.players[1].score}}</p>
                </div>
                <div class="col">
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
            page: '',
            question: '',
            questionOut: '',
            answer: '',
            index: 0,
            savequestion: '',
            userpoint: 0,
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
                    'aku sayang kamu'],
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
                'ILOVEYOU'
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
            this.page = ''
            if(this.userpoint < 10){
                let random = Math.floor(Math.random()*15) 
                this.savequestion = this.questions[random]
                this.index = random
                console.log(this.savequestion)
                this.question = this.questionRandom(this.questions[random])
                this.questionOut = this.question
            }else{
                this.question = 'Game Over'
                return (function() {     // function expression closure to contain variables
                    var i = 0;
                    var pics = [ imgwinner,imgwinner1,imgwinner2,imgwinner3 ];
                    var el = document.getElementById('img_to_flip');  // el doesn't change
                    function toggle() {
                        el.src = pics[i];           // set the image
                        i = (i + 1) % pics.length;  // update the counter
                    }
                    setInterval(toggle, 500);
                })();             // invoke the function expression
            }
        },
        hint(){
            this.page = 'hint'
            console.log('masuk hint', this.savequestion.split(' ').join(''))
            let hintWord = this.savequestion.split(' ').join('')
            const indexes = this.imageHint[this.index]
            if(indexes == '' || indexes == 'ILOVEYOU'){
                return (function() {     // function expression closure to contain variables
                    var i = 0;
                    var pics = [ one, two, three, four ];
                    var el = document.getElementById('img_hint');  // el doesn't change
                    function toggle() {
                        el.src = pics[i];           // set the image
                        i = (i + 1) % pics.length;  // update the counter
                    }
                    setInterval(toggle, 500);
                })(); 
                // this.page = ''
            }else{
                this.setImageHint = this.imageHint[this.index]
                // this.page = ''
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
            this.page = ''
            if(this.answer === this.savequestion){
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
                                id:this.$route.params.id,
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

                    this.generateIndex()
                    this.setImage()
                    this.answer = ''
                    this.index = ''

            }else{
                console.log('ngga sama')
                this.question='Your answer is wrong!'
                this.generateIndex()
                this.setImage()
                this.index  = ''
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
                this.setImagePoint = this.image[0]
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
        getPoint(){

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
          this.roomData = doc.data()
          let playerList = doc.data().players
          console.log(this.roomData)
          playerList.forEach((element) => {
              if(element.score >= 10){
                let pemenang = element.name
                Swal(`Game is Over, the winner is ${pemenang}`);
                localStorage.clear()
                this.$router.push('/')
              }
          })
        },
        err => {
          console.log(err);
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
</style>
