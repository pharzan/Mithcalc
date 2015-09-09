
var calc={
    vm:{
        inpt: m.prop(""),
        inputs:[],
        counter:0,
        answer:0,
        ans:m.prop(0)

    },
    controller: function () {
        this.buttons=[
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [0]
        ];
        this.operators=[['+'],['-'],['/'],['*'],['='],['C']],
        this.vm;

    },
    newAns:function () {
        if(calc.vm.answer){
         //$('.ans').append(calc.vm.answer+'</br>');
            m('.ans',m.withAttr('value',calc.vm.answer))
        }
    },
    newval: function (val) {
        calc.vm.inpt(calc.vm.inpt()+val.toString());
        console.log(typeof (calc.vm.inpt()))


    },

    operate: function (op) {
            var vm = calc.vm;
            if(parseInt(vm.inpt())){
            vm.inputs.push(parseInt(vm.inpt()))

            }
            if(vm.answer){vm.inputs.push(vm.answer)}


            vm.counter++;
            switch(op.toString()) {
                case '+':
                    vm.inpt('');
                    vm.answer=vm.inputs[vm.inputs.length-2]+vm.inputs[vm.inputs.length-1]
                    //console.log('add');
                    break;
                case '-':
                    //console.log('subtract');
                    vm.inpt('');
                    vm.answer=vm.inputs[vm.inputs.length-2]-vm.inputs[vm.inputs.length-1]
                    break;
                case '/':
                    //console.log('divide');
                    vm.inpt('');
                    vm.answer=vm.inputs[vm.inputs.length-2]/vm.inputs[vm.inputs.length-1]
                    break;
                case '*':
                    vm.inpt('');
                    vm.answer=vm.inputs[vm.inputs.length-2]*vm.inputs[vm.inputs.length-1]
                    //console.log('multiply');
                    break;
                case '=':

                    break;
                case 'c':

                    break;
                default:
            }






        console.log('counter: ',vm.counter,'inputs: ',vm.inputs);
        console.info('counter: ',vm.inputs[vm.inputs.length-2]+op+vm.inputs[vm.inputs.length-1],'=',vm.answer);





    },

    view: function (ctrl) {

                    return m('div',[
                                    m('input',{value:calc.vm.inpt(),
                                                onchange:m.withAttr('value',calc.vm.inpt())
                                    }),
                                    m('span','= '+calc.vm.ans()),
                                    m('table',[
                                                ctrl.buttons.map(function(row){

                                                    return m('tr',row.map(function(number) {
                                                            return m('td.btn.btn-default', {
                                                                onclick: function () {
                                                                    calc.newval(number),
                                                                    console.log('clicked', number);
                                                                }
                                                            }, number);
                                                        })
                                                    )
                                                    })

                                                ]
                                    ),
                        m('span',ctrl.operators.map(function (op) {
                            return m('button.btn.btn-default',{onclick: function () {

                                                    calc.operate(op)

                                                    if(calc.vm.answer){
                                                        calc.vm.ans(calc.vm.answer)}

                                                }},op)

                        }))
                        ]


                    );
    }
};

m.mount(document.getElementById('calc'),calc);
