import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula';

import { VideoPlayer ,VideoOptions } from '@ionic-native/video-player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentSlide: number = 1;
  countOfSlides: number = 11;
  leftOffset: number = 0;
  isFirst: boolean = this.currentSlide == 1 ? true: false;
  isLast: boolean = this.currentSlide == this.countOfSlides ? true: false;
  widthOfScreen = this.platform.width();
  countOfAnswers = 8;
  writeAnswers = 0;
  showZeroSlide = false;
  bottomText = [
    // Slide 1
    {
      show: false,
      text: '*А02А - Антациди та А02В - Засоби для лікування пептичної виразки та гастроезофагеальної рефлюксної хвороби. **За даними Системи дослідження фармацевтичного ринку “Pharmxplorer” за 2016 – 1 півріччя 2018 років.',
    },
    // Slide 2
    {
      show: false,
      text: '*Харченко Н. В., Бабак О. Я., Фомін П. Д. та ін. Гастроезофагеальна рефлюксна хвороба: Адаптована клінічна настанова, заснована на доказах. - К., 2013. – 31 с.'
    },    
    // Sllide 3
    {
      show: false,
      text: '* Ткач С.М., Практична гастроентерологія для лікарів загальної практики. - К., 2017, с. 5-32'
    },
    // Slide 4
    {
      show: false,
      text: '*За даними Державного реєстру лікарських засобів та інструкцій для медичного застосування препаратів станом на 28.09.2018.'
    },
    // Slide 5
    {
      show: false,
      text: '1. Мандель К. Г., Дегги Б. П., Броди Д. А., Джейкоби Г. И ./АЛЬГИНАТ-РАФТОВЫЕ СОСТАВЫ В ЛЕЧЕНИИ ИЗЖОГИ И КИСЛОТНОГО РЕФЛЮКСА. ОБЗОР ЛИТЕРАТУРЫ../ Экспериментальная и клиническая гастроентерология №4, 2008, - 64-77 с. 2. Клінічна фармакологія : Підручник для студентів і лікарів / [Абдуєва Ф. М., Бичкова О. Ю., Бондаренко І. О. та ін.]; за загальною редакцією М. І. Яблучанського та В. М. Савченка. – Х. : ХНУ імені В. Н. Каразіна, 2011. – 67 с. '
    },
    // Slide 6
    {
      show: false,
      text: ''
    },
    // Slide 6 questions
    {
      show: false,
      text: ''
    },
    // Slide 7 
    {
      show: false,
      text: '*Відповідно до інструкції для медичного застосування лікарського засобу ГАВІСКОН® ФОРТЕ М’ЯТНА СУСПЕНЗІЯ'
    },
    // Slide 8
    {
      show: false,
      text: '*Відповідно до інструкції для медичного застосування лікарського засобу ГАВІСКОН® М’ЯТНА СУСПЕНЗІЯ, ГАВІСКОН® ФОРТЕ М’ЯТНА СУСПЕНЗІЯ, ГАВІСКОН®ПОДВІЙНОЇ ДІЇ'
    },
    // Slide 9
    {
      show: false,
      text: ''
    },
    // Slide 10
    {
      show: false,
      text: ''
    }
  ];

  currentQuestionNum = 0;
  leftAnswer = 0;
  rightAnswer = 0;
  leftSumAnswer = 0;
  rightSumAnswer = 0;
  showQuestionResults = false;

  questions = [
    {
      question: "Яка швидкість настання ефекту?",
      questionDesc: [
        {
          desc: "Повільно"
        },
        {
          desc: "Середня швидкість"
        },
        {
          desc: "Швидко"
        }
      ],
      leftAnswers: [
        {
          answer: "1"
        },
        {
          answer: "2"
        },
        {
          answer: "3"
        }
      ],
      rightAnswers: [
        {
          answer: "1"
        },
        {
          answer: "2"
        },
        {
          answer: "3"
        }
      ]
    },
    {
      question: "Чи впливає на соляну кислоту в шлунку?",
      questionDesc: [
        {
          desc: "Впливає"
        },
        {
          desc: "Не впливає"
        }
      ],
      leftAnswers: [
        {
          answer: "1"
        },
        {
          answer: "2"
        }
      ],
      rightAnswers: [
        {
          answer: "1"
        },
        {
          answer: "2"
        }
      ]
    },
    {
      question: "Яка тривалість дії?",
      questionDesc: [
        {
          desc: "Короткотривалий ефект "
        },
        {
          desc: "Довготривалий ефект"
        }
      ],
      leftAnswers: [
        {
          answer: "1"
        },
        {
          answer: "2"
        }
      ],
      rightAnswers: [
        {
          answer: "1"
        },
        {
          answer: "2"
        }
      ]
    },
    {
      question: "Чи наявний антирефлюксний ефект?",
      questionDesc: [
        {
          desc: "Не запобігає повторним рефлюксам"
        },
        {
          desc: "Запобігає повторним рефлюксам"
        }
      ],
      leftAnswers: [
        {
          answer: "1"
        },
        {
          answer: "2"
        }
      ],
      rightAnswers: [
        {
          answer: "1"
        },
        {
          answer: "2"
        }
      ]
    }
  ];

  videoOpts : VideoOptions ;
  constructor(public navCtrl: NavController, private platform: Platform, private dragulaService: DragulaService, private videoPlayer : VideoPlayer) {
    this.dragulaService.createGroup('COPYABLE', {
      copy: (el, source) => {
        let allowToCopy = true;
        if(source.id === 'last') allowToCopy = false;
        return allowToCopy;
      },
      accepts: (el, target, source, sibling) => {
        return target.tagName === 'TD';
      }
    });

    
  }

  changeSlide(way) {
    if(this.currentSlide == 7 && this.showQuestionResults == false && this.currentQuestionNum >= 0) {
      if(way == 'next') {
        ++this.currentQuestionNum;
        this.leftSumAnswer += +this.leftAnswer;
        this.rightSumAnswer += +this.rightAnswer;
        this.leftAnswer = 0;
        this.rightAnswer = 0;
      } else if(way == 'prev') {
        this.currentSlide--;
      }        
      if(this.currentQuestionNum >= this.questions.length) this.showQuestionResults = true;
    } else {
      if((this.currentSlide <= 1 && way == 'prev') || (this.currentSlide >= this.countOfSlides && way == 'next')) return null;
      if((this.currentSlide >= this.countOfSlides && way == 'gotoFirst')) {
        this.currentSlide = 1;
        this.isFirst = this.currentSlide == 1 ? true : false;
        this.isLast = this.currentSlide == this.countOfSlides ? true : false;
        this.leftOffset = (this.currentSlide - 1) * this.widthOfScreen;
        this.countOfAnswers = 8;
        this.writeAnswers = 0;
        this.currentQuestionNum = 0;
        this.showQuestionResults = false;
        this.showZeroSlide = false;
        this.leftSumAnswer = 0;
        this.rightSumAnswer = 0;      
        for(let i=0; i<this.bottomText.length; i++) {
          this.bottomText[i].show = false;
        }

        let td = document.querySelectorAll('.drop-cell');
        for(let i=0;i<td.length; i++) {
          td[i].innerHTML = '';
        }

        let active = document.querySelectorAll('.active');
        for(let i=0;i<active.length; i++) {
          active[i].classList.remove('active');
        }

        let wrong = document.querySelectorAll('.wrong');
        for(let i=0;i<wrong.length; i++) {
          wrong[i].classList.remove('wrong');
        }

        let fliped = document.querySelectorAll('.fliped');
        for(let i=0;i<fliped.length; i++) {
          fliped[i].classList.remove('fliped');
        }

        let selected = document.querySelectorAll('.selected');
        for(let i=0;i<selected.length; i++) {
          selected[i].classList.remove('selected');
        }

        let radio = document.querySelectorAll('.btn-radio');
        for(let i=0; i < radio.length; i++) {
          radio[i].remove();
        }
      } else {
        way == 'next' ? this.currentSlide++ : this.currentSlide--;
        this.isFirst = this.currentSlide == 1 ? true : false;
        this.isLast = this.currentSlide == this.countOfSlides ? true : false;
        this.leftOffset = (this.currentSlide - 1) * this.widthOfScreen;
      }
    }
  }

  toggleActiveClass(e, cl) {
    const hasClass = e.target.classList.contains(cl);
    if(hasClass) {
      e.target.classList.remove(cl);
      if(cl == 'active') this.writeAnswers--;
    } else {
      e.target.classList.add(cl);
      if(cl == 'active') this.writeAnswers++;
    }
  }

  playVideo(){
    this.videoOpts = {volume : 1.0};
    this.videoPlayer.play('file:///storage/emulated/legacy/Download/pregnant.mp4').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });    
  }
  stopPlayingVideo(){
    this.videoPlayer.close();
  }

}
