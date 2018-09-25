import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

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
  bottomText = [
    '* За даними звіту ТОВ «Софтінформ» за грудень 2017, червень 2018',
    '*Харченко Н. В., Бабак О. Я., Фомін П. Д. та ін. Гастроезофагеальна рефлюксна хвороба: Адаптована клінічна настанова, заснована на доказах. - К., 2013. – 31 с. ',
    '* Ткач С.М., Практична гастроентерологія для лікарів загальної практики. - К., 2017, с. 5-32',
    '*За даними Державного реєстру лікарських засобів та інструкцій для медичного застосування препаратів станом на 28.09.2018.',
    '1. Мандель К. Г., Дегги Б. П., Броди Д. А., Джейкоби Г. И ./АЛЬГИНАТ-РАФТОВЫЕ СОСТАВЫ В ЛЕЧЕНИИ ИЗЖОГИ И КИСЛОТНОГО РЕФЛЮКСА. ОБЗОР ЛИТЕРАТУРЫ../ Экспериментальная и клиническая гастроентерология №4, 2008, - 64-77 с. 2. Клінічна фармакологія : Підручник для студентів і лікарів / [Абдуєва Ф. М., Бичкова О. Ю., Бондаренко І. О. та ін.]; за загальною редакцією М. І. Яблучанського та В. М. Савченка. – Х. : ХНУ імені В. Н. Каразіна, 2011. – 67 с. ', '', 
    '*Відповідно до інструкції для медичного застосування лікарського засобу ГАВІСКОН® ФОРТЕ М’ЯТНА СУСПЕНЗІЯ',
    '*Відповідно до інструкції для медичного застосування лікарського засобу ГАВІСКОН® М’ЯТНА СУСПЕНЗІЯ, ГАВІСКОН® ФОРТЕ М’ЯТНА СУСПЕНЗІЯ, ГАВІСКОН®ПОДВІЙНОЇ ДІЇ','*Відповідно до інструкції для медичного застосування лікарського засобу ГАВІСКОН® ФОРТЕ М’ЯТНА СУСПЕНЗІЯ'
  ];

  questionId = 1;
  showQuestionResults = false;

  questions = [
    {
      question: "Яка швидкість настання ефекту?",
      radioLeft: "question-1-l",
      radioRight: "question-1-r",
      isLeftChecked: false,
      isRightChecked: false,
      numOfQuestion: 1,
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
      radioLeft: "question-2-l",
      radioRight: "question-2-r",
      isLeftChecked: false,
      isRightChecked: false,
      numOfQuestion: 2,
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
      radioLeft: "question-3-l",
      radioRight: "question-3-r",
      isLeftChecked: false,
      isRightChecked: false,
      numOfQuestion: 3,
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
      radioLeft: "question-4-l",
      radioRight: "question-4-r",
      isLeftChecked: false,
      isRightChecked: false,
      numOfQuestion: 4,
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

  questionsResults = {
    leftSidePts: 0,
    rightSidePts: 0
  }

  constructor(public navCtrl: NavController, private platform: Platform) {
  }

  changeSlide(way) {
    if((this.currentSlide <= 1 && way == 'prev') || (this.currentSlide >= this.countOfSlides && way == 'next')) return null;
    if((this.currentSlide >= this.countOfSlides && way == 'gotoFirst')) {
      this.currentSlide = 1;
      this.isFirst = this.currentSlide == 1 ? true : false;
      this.isLast = this.currentSlide == this.countOfSlides ? true : false;
      this.leftOffset = (this.currentSlide - 1) * this.widthOfScreen;
    } else {
      way == 'next' ? this.currentSlide++ : this.currentSlide--;
      this.isFirst = this.currentSlide == 1 ? true : false;
      this.isLast = this.currentSlide == this.countOfSlides ? true : false;
      this.leftOffset = (this.currentSlide - 1) * this.widthOfScreen;
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

  changeQuestionId(e, arg1, arg2) {
    let leftPoint = 0;
    let rightPoint = 0;
    if(arg1) leftPoint += parseFloat(e.target.value);
    if(arg2) rightPoint += parseFloat(e.target.value);
    if(arg1 && arg2) {
      this.questionId += 1;
      this.questionsResults.leftSidePts += leftPoint;
      this.questionsResults.rightSidePts += rightPoint;
    }
    if(this.questionId > this.questions.length) this.showQuestionResults = true;
  }

}
