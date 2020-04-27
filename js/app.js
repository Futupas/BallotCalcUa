'use strict';

let data = [{
    id: 1,
    weight: 1.0,
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, fugiat?'
},{
    id: 2,
    weight: 1.0,
    question: 'Vel tempora, consequuntur dolorum accusantium autem odio quae suscipit? Nemo.'
},{
    id: 3,
    weight: 1.0,
    question: 'Ducimus quae provident consequuntur assumenda et eligendi eum dignissimos quia.'
},{
    id: 4,
    weight: 1.0,
    question: 'Illo dolorem veritatis cupiditate labore aliquid saepe accusamus vitae deserunt?'
},{
    id: 5,
    weight: 1.0,
    question: 'Dignissimos, odit itaque ipsam eos sunt inventore deserunt et dolorem.'
}]

buildDiv(data);
function buildDiv(data) {
    for (const question of data) {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('question');

        let h3 = document.createElement('h3');
        h3.innerHTML = 'Питання ' + question.id + ': ' + question.question;
        mainDiv.appendChild(h3);

        let input = document.createElement('input');
        input.name = question.id;
        input.value = 'null';
        input.style.display = 'none';
        mainDiv.appendChild(input);

        let btnGroupRow =  document.createElement('div');
        btnGroupRow.classList.add('row');
        let btnGroupCol = document.createElement('div');
        btnGroupCol.classList.add('col-xs-12', 'text-center');
        let btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group', 'btn-group-lg');
        btnGroupCol.appendChild(btnGroup);
        btnGroupRow.appendChild(btnGroupCol);
        mainDiv.appendChild(btnGroupRow);

        let btnMin2 = document.createElement('button');
        btnMin2.classList.add('btn', 'btn-danger');
        btnMin2.innerText='-2';
        btnMin2.input = input;
        btnMin2.type = 'button';
        btnMin2.onclick = function (e) {
            this.input.value = -2;
            for (const btn of this.parentNode.childNodes) {
                btn.classList.remove('active');
                this.classList.add('active')
            }
        }
        btnGroup.appendChild(btnMin2);

        let btnMin1 = document.createElement('button');
        btnMin1.classList.add('btn', 'btn-danger');
        btnMin1.innerText='-1';
        btnMin1.input = input;
        btnMin1.type = 'button';
        btnMin1.onclick = function (e) {
            this.input.value = -1;
            for (const btn of this.parentNode.childNodes) {
                btn.classList.remove('active');
                this.classList.add('active')
            }
        }
        btnGroup.appendChild(btnMin1);

        let btn0 = document.createElement('button');
        btn0.classList.add('btn', 'btn-default');
        btn0.innerText='0';
        btn0.input = input;
        btn0.type = 'button';
        btn0.onclick = function (e) {
            this.input.value = 0;
            for (const btn of this.parentNode.childNodes) {
                btn.classList.remove('active');
                this.classList.add('active')
            }
        }
        btnGroup.appendChild(btn0);

        let btn1 = document.createElement('button');
        btn1.classList.add('btn', 'btn-success');
        btn1.innerText='1';
        btn1.input = input;
        btn1.type = 'button';
        btn1.onclick = function (e) {
            this.input.value = 1;
            for (const btn of this.parentNode.childNodes) {
                btn.classList.remove('active');
                this.classList.add('active')
            }
        }
        btnGroup.appendChild(btn1);

        let btn2 = document.createElement('button');
        btn2.classList.add('btn', 'btn-success');
        btn2.innerText='2';
        btn2.input = input;
        btn2.type = 'button';
        btn2.onclick = function (e) {
            this.input.value = 2;
            for (const btn of this.parentNode.childNodes) {
                btn.classList.remove('active');
                this.classList.add('active')
            }
        }
        btnGroup.appendChild(btn2);


        document.getElementById('questions_container').appendChild(mainDiv);
    }


    let submitDiv = document.createElement('div');
    let submit = document.createElement('button');
    submit.type = 'submit';
    submit.innerHTML = 'See result';
    submit.classList.add('btn', 'btn-lg', 'btn-success');
    submit.style.width = '100%';
    submitDiv.appendChild(submit);
    document.getElementById('questions_container').appendChild(submitDiv);
}
