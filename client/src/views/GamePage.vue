<template>
    <div class="gamepage">
        <div id="imagegame">
            <br>
            <!-- src="../assets/piring/1.png" -->
            <img :src="setImagePoint" alt="FOOD" width="400" height="400" id="img_to_flip"><br>
            <button @click="generateIndex" type="button" class="btn btn-primary">start</button>
            <h2>{{question}} </h2>
            <form @submit.prevent="userAnswer">
                <div class="form-group">
                    <input v-model="answer" type="text" class="form-control" id="answerPlayer" aria-describedby="answerPlayer" placeholder="Your Answer . . .">
                </div>
            </form>
            <h4>{{userpoint}}</h4>
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

export default {
  data () {
    return {
      question: '',
      questionOut: '',
      answer: '',
      index: [],
      savequestion: '',
      userpoint: 8,
      questions: [
        'gulai',
        'bakso',
        'papeda',
        'pecel',
        'sate kelinci',
        'perkedel',
        'kepiting',
        'chicken',
        'meatball',
        'noodle',
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
      setImagePoint: ''
    }
  },
  created () {
    this.setImage()
  },
  components: {
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, imgwinner, imgwinner1, imgwinner2, imgwinner3
  },
  methods: {
    generateIndex () {
      if (this.userpoint < 10) {
        let random = Math.floor(Math.random() * 15)
        this.savequestion = this.questions[random]
        console.log(this.savequestion)
        this.question = this.questionRandom(this.questions[random])
        this.questionOut = this.question
      } else {
        this.question = 'Game Over'
        return (function () { // function expression closure to contain variables
          var i = 0
          var pics = [ imgwinner, imgwinner1, imgwinner2, imgwinner3 ]
          var el = document.getElementById('img_to_flip') // el doesn't change
          function toggle () {
            el.src = pics[i] // set the image
            i = (i + 1) % pics.length // update the counter
          }
          setInterval(toggle, 500)
        })() // invoke the function expression
      }
    },
    questionRandom (value) {
      let word = value.split('')
      let randomWord = ''
      for (let i = 0; i < word.length; i++) {
        let random = Math.floor(Math.random() * word.length)
        randomWord += word[random]
        word.splice(random, 1)
        i -= 1
      }
      return randomWord
    },
    userAnswer () {
      if (this.answer === this.savequestion) {
        console.log('yeay sama')
        this.userpoint++
        this.setImage()
        this.answer = ''
        this.generateIndex()
      } else {
        console.log('ngga sama')
        this.userpoint--
        this.setImage()
        this.answer = ''
        this.generateIndex()
      }
    },
    setImage () {
      if (this.userpoint === 0 || this.userpoint < 1) {
        this.setImagePoint = this.image[0]
      } else if (this.userpoint === 1) {
        this.setImagePoint = this.image[1]
      } else if (this.userpoint === 2) {
        this.setImagePoint = this.image[2]
      } else if (this.userpoint === 3) {
        this.setImagePoint = this.image[3]
      } else if (this.userpoint === 4) {
        this.setImagePoint = this.image[4]
      } else if (this.userpoint === 5) {
        this.setImagePoint = this.image[5]
      } else if (this.userpoint === 6) {
        this.setImagePoint = this.image[6]
      } else if (this.userpoint === 7) {
        this.setImagePoint = this.image[7]
      } else if (this.userpoint === 8) {
        this.setImagePoint = this.image[8]
      } else if (this.userpoint === 9) {
        this.setImagePoint = this.image[9]
      } else if (this.userpoint === 10) {
        this.setImagePoint = this.image[10]
      }
    },
    getPoint () {

    }
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
