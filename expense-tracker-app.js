const expenses = [
    {
        name: 'Lunch',
        description: 'ate chicken chop',
        type: 'F&B',
        amount: '$6.50',
        showDetail: false
    },
    {
        name: 'Teo Heng',
        description: 'talk cock sing song',
        type: 'Leisure',
        amount: '$14',
        showDetail: false
    },
    {
        name: 'Arcade',
        description: 'Cow Play Cow Moo',
        type: 'Leisure',
        amount: '$20',
        showDetail: false
    }
]


const app = new Vue({
    el: '.expense-table',
    data: {
        title: 'Expense Tracker',
        expensesList: expenses
    },
    methods: {
        toggleDetails: function(expense) {
            expense.showDetail = !expense.showDetail;     
        }
    }
});


const addExpenseButton = new Vue({
    el: '.add-btn',
    data: {
        content: 'Add Expense'
    },
    methods: {
        triggerForm: function() {
            form.formTriggered = !form.formTriggered;
            $(".expense-wrapper").css("opacity", "0.2");
            $(".add-btn").css("opacity", "0.2");
        }
    }
});


const form = new Vue({
    el: '.form',
    data: {
        formTriggered: false,
        title: "Add New Expense",
        cross: "X",
        save: "Save",
    },
    methods: {
        closeForm: function() {      
            form.formTriggered = !form.formTriggered;
            $(".expense-wrapper").css("opacity", "1");
            $(".add-btn").css("opacity", "1");
        },
        addNewExpense: function() {
            const newItem = $('.form').serializeArray();
            console.log(newItem);
            alert(newItem);
        }
    }
});