/**
 * Created by Farzan on 9/8/2015.
 * Calculator using the Mithril js library
 * This is my first try to create a calculator and get the hang of
 * using Mithril functions and methods.
 * I've also used Wolframs API through a php code to evaluate and
 * return the response using Mithrils Ajax method
 */
var calc = {
    vm:
    {
        inpt: m.prop(""),
        inputs: [],
        counter: 0,
        answer: 0,
        wolfromarray: [],
        ans: m.prop(0)


    },
    // the controllers scope and the above definitions scope are different
    controller: function()
    {

        this.buttons = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [0]
        ],

            this.operators = [
                ['+'],
                ['-'],
                ['/'],
                ['*'],
                ['='],
                ['C']
            ],

            this.signs = [
                ['fa fa-plus'],
                ['fa fa-minus'],
                ['fa fa-times'],
                ['fa fa-devide']
            ],

            this.vm;
    },

    /* A function to send an Ajax request to the php file sendrequest.php
     *  The file gets the input boxes value and operates on it
     *  then it returns the respnse
     */
    sendrequest: function()
    {
        //console.log(calc.vm.inpt());
        m.request(
            {
                method: "GET",
                background: true,
                url: "sendrequest.php",
                dataType: "text",
                data:
                {
                    str: calc.vm.inpt()
                }
            })
            .then(function(response)
            {
                //var obj=JSON.parse(response);

                response.forEach(function(line, idx)
                {

                    calc.vm.wolfromarray[idx] = response[idx];
                    m.redraw();
                    //console.log(calc.vm.wolfromarray)
                })


            })
    },
    /* The newval() function adds a new charecter to the previous character set in
     *  the input box. In Mithril m.prop() is a getter/setter function with which
     *  you can set a value by using as a function and the value in the parantheses
     *  will be set to the variable so, cal.vm.inpt('hello world') will set calc.vm.inpt's
     *  value to the string of 'hello world' with out the quotes .
     */
    newval: function(val)
    {
        calc.vm.inpt(calc.vm.inpt() + val.toString());
    },

    operate: function(op)
    {
        var vm = calc.vm;
        if (parseInt(vm.inpt()))
        {
            vm.inputs.push(parseInt(vm.inpt()))

        }
        if (vm.answer)
        {
            vm.inputs.push(vm.answer)
        }


        vm.counter++;
        switch (op.toString())
        {
            case '+':
                vm.inpt('');
                vm.answer = vm.inputs[vm.inputs.length - 2] + vm.inputs[vm.inputs.length - 1]
                //console.log('add');
                break;
            case '-':
                //console.log('subtract');
                vm.inpt('');
                vm.answer = vm.inputs[vm.inputs.length - 2] - vm.inputs[vm.inputs.length - 1]
                break;
            case '/':
                //console.log('divide');
                vm.inpt('');
                vm.answer = vm.inputs[vm.inputs.length - 2] / vm.inputs[vm.inputs.length - 1]
                break;
            case '*':
                vm.inpt('');
                vm.answer = vm.inputs[vm.inputs.length - 2] * vm.inputs[vm.inputs.length - 1]
                //console.log('multiply');
                break;
            case '=':

                break;
            case 'c':

                break;
            default:
        }
        console.log('counter: ', vm.counter, 'inputs: ', vm.inputs);
        console.info('counter: ', vm.inputs[vm.inputs.length - 2] + op + vm.inputs[vm.inputs.length - 1], '=', vm.answer);
    },

    view: function(ctrl)
    {

        return m('div.col-md-8', [
            m('input',
                {
                    value: calc.vm.inpt(),
                    onchange: function(e)
                    {
                        console.log(calc.vm.inpt(e.target['value']))
                    }
                }),

            m('table', [
                ctrl.buttons.map(function(row)
                {

                    return m('tr', row.map(function(number)
                    {
                        return m('td.btn.btn-default',
                            {
                                onclick: function()
                                {
                                    calc.newval(number),
                                        console.log('clicked', number);
                                }
                            }, number);
                    }))
                })

            ]),

            m('div', ctrl.operators.map(function(op)
                {

                    return m('button.btn.btn-primary',
                        {

                            onclick: function()
                            {
                                calc.operate(op)
                                if (calc.vm.answer)
                                {
                                    calc.vm.ans(calc.vm.answer)
                                }
                            }
                        }, op)
                }),
                m('div.wolfram.btn.btn-warning',
                    {
                        onclick: function()
                        {
                            console.log('talk to server')
                            console.info(calc.vm.inpt());
                            calc.sendrequest();
                        }
                    }, 'WolfromAlpha')
            )
        ], m('div.col-md-4', calc.vm.wolfromarray.map(function(content, index)
        {
            var retval;
            if (content.match('http'))
            {
                retval = m('img[src="' + content + '"]');
            }
            else retval = content + '\r\n';
            return retval
        })))


    }
}


m.mount(document.getElementById('row'), calc);
