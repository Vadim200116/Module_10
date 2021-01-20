//минимальное и максимальное значения из поля ввода
let inputMin; 
let inputMax; 
//обработанные минимальное и максимальное значения  
let minValue;
let maxValue;

let answerNumber; //предполагаемый ответ
let answerWord; //фраза для ответа
let orderNumber; //счетчик количества вопросов
let gameRun; //флаг начала и конца программы

document.getElementById('game').style.display="none"; //панель игры,скрыта до ввода данных

//функция преобразующая цифровую запись числа в буквенную, если на это требуется не более 20 символов
function toWord(){
    let units=['','один','два','три','четыре','пять','шесть','семь','восемь','девять','десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'];
    let tens=['','','двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'];
    let hundreds=['','сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот'];
    if (answerNumber==0){
        answerWord='нуль';
        return;
    }
    const hundredsNum=Math.floor(Math.abs(answerNumber)/ 100);
    const tensNum=Math.floor((Math.abs(answerNumber)-100*hundredsNum)/10);
    const unitsNum=Math.abs(answerNumber)-100*hundredsNum-10*tensNum;
    if (Math.abs(answerNumber)<=19){
        answerWord=units[Math.abs(answerNumber)];
    }else{
        answerWord=hundreds[hundredsNum]+' '+tens[tensNum]+' '+units[unitsNum];
    }
    if (answerNumber<0)
        answerWord='минус '+answerWord;

    if (answerWord.length>20)
        answerWord=answerNumber;
    

}

//функция проверки максимального и минимального значений, введенных пользователем, на валидность
function valueCheck(){
    inputMin=parseInt(document.forms['formStart'].elements['inp_minValue'].value);
    inputMax=parseInt(document.forms['formStart'].elements['inp_maxValue'].value);
    minValue=inputMin || 0;
    maxValue=inputMax || 0;
    if(isNaN(inputMin))
        minValue=-999;
    if(isNaN(inputMax))
        maxValue=999;
    minValue=((minValue<-999 || minValue>999)?-999 : minValue);
    maxValue=((maxValue<-999 || maxValue>999)? 999 : maxValue);
    if (minValue>maxValue) {
        const temp=minValue;
        minValue=maxValue;
        maxValue=temp;
    }
}

//обработчик нажатия на кнопку Начала игры 
document.getElementById('btnStart').addEventListener('click',function () {
    document.getElementById('formStart').style.display="none";
    document.getElementById('game').style.display="inline";
     valueCheck();
     document.forms['formStart'].elements['inp_minValue'].value='';
     document.forms['formStart'].elements['inp_maxValue'].value='';
     answerNumber  = Math.floor((minValue + maxValue) / 2);
     orderNumber = 1;
     gameRun = true;
     toWord();
     orderNumberField.innerText = orderNumber;
     answerField.innerText = `Вы загадали число ${answerWord }?`;  
})

//обработчик нажатия на кнопку Меньше
document.getElementById('btnLess').addEventListener('click',function (){
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random()*2);
            switch (phraseRandom) {
                case 0:
                    answerField.innerText=`Вы загадали неправильное число!\n\u{1F914}`;
                    break;
                
                case 1:
                    answerField.innerText=`Я сдаюсь..\n\u{1F92F}`;
                    break;

                case 2:
                    answerField.innerText=`Слишком сложно для меня..\n\u{1F622}`;
                    break;

                default:
                    break;
            }
        gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const questionRandom = Math.round( Math.random()*2);
            toWord();
            switch (questionRandom){
                case 0:
                    answerField.innerText = `Мне кажется, что это число ${answerWord }?`;
                    break;
                
                case 1:
                    answerField.innerText=`Как на счет числа ${answerWord }?`;
                    break;

                case 2:
                    answerField.innerText=`А что если вы загадали ${answerWord }?`;
                    break;

                default:
                    break;
            }
        }
    }
});

//обработчик нажатия на кнопку Больше 
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random()*2);
            switch (phraseRandom) {
                case 0:
                    answerField.innerText=`Вы загадали неправильное число!\n\u{1F914}`;
                    break;
                
                case 1:
                    answerField.innerText=`Я сдаюсь..\n\u{1F92F}`;
                    break;

                case 2:
                    answerField.innerText=`Слишком сложно для меня..\n\u{1F622}`;
                    break;

                default:
                    break;
            }
        gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const questionRandom = Math.round( Math.random()*2);
            toWord();
            switch (questionRandom) {
                case 0:
                    answerField.innerText = `Мне кажется, что это число ${answerWord }?`;
                    break;
                
                case 1:
                    answerField.innerText=`Как на счет числа ${answerWord }?`;
                    break;

                case 2:
                    answerField.innerText=`А что если вы загадали ${answerWord }?`;
                    break;

                default:
                    break;
            }
        }
    }
})

//обработчик нажатия на кнопку Верно 
document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        orderNumberField.innerText = orderNumber;
        toWord();
        const answerRandom = Math.round( Math.random()*2);
            switch (answerRandom) {
                case 0:
                    answerField.innerText = `Я всегда угадываю\n\u{1F60E}`
                    break;
                
                case 1:
                    answerField.innerText=`Я надеюсь, что вы во мне не сомневались\n\u{1F609}`;
                    break;

                case 2:
                    answerField.innerText=`Ежику понятно, что это ${answerWord }\n\u{1f605}`;
                    break;

                default:
                    break;
            }
        gameRun = false;
    }
})

//обработчик нажатия на кнопку Заново 
document.getElementById('btnRetry').addEventListener('click', function () {
    document.getElementById('formStart').style.display="inline";
    document.getElementById('game').style.display="none";
})