'use strict';

document.addEventListener('DOMContentLoaded', (e) => {
    (async function() {
        let response = await fetch('/questions.json');
        if (response.ok) {
            let json = await response.json();
            builQuestions(json);
        } else {
            alert('unable to load questions');
        }
    })();
});


function builQuestions(data) {
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
        btnMin2.classList.add('btn', 'btn-danger', 'answer-btn');
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
        btnMin1.classList.add('btn', 'btn-danger', 'answer-btn');
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
        btn0.classList.add('btn', 'btn-default', 'answer-btn');
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
        btn1.classList.add('btn', 'btn-success', 'answer-btn');
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
        btn2.classList.add('btn', 'btn-success', 'answer-btn');
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

document.getElementById('mainform').onsubmit = function(e) {
    let inputs = document.querySelectorAll('#mainform input[name]');
    for (const input of inputs) {
        if (input.value !== '-2' && input.value !== '-1' && input.value !== '0' && input.value !== '1' && input.value !== '2') {
            // console.log(input.parentElement.getBoundingClientRect().top + window.scrollY);
            alert('answer all questions');
            // document.documentElement.scrollTo({top: input.parentElement.offsetTop, left: 0, behavior: 'smooth'});
            input.parentElement.scrollIntoView({ behavior: 'smooth' });
            return false;
        }
    }
    return true;
}
