const expenses = [];

const categories = ["F&B", "Leisure", "Shopping", "Others"];


const app = new Vue({
    el: '.expense-table',
    data: {
        title: 'Expense Tracker',
        expensesList: expenses
    },
    methods: {
        toggleDetails(expense) {
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
        triggerForm() {
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
        name: '',
        amount: '',
        description: '',
        type: '',
        categories: categories,

    },
    methods: {
        closeForm() {      
            this.formTriggered = !this.formTriggered;
            $(".expense-wrapper").css("opacity", "1");
            $(".add-btn").css("opacity", "1");
        },

        isIncomplete() {
            return (this.name == "" || this.description == "" || this.amount == "" || this.type == "")
        }, 
        
        isNotNumber(ele) {
            return isNaN(ele);
        },

        didNotSelectCategory() {
            return !this.type;
        },
        
        addNewExpense() {

            if (this.didNotSelectCategory()) {
                alert("You did not select a category!");
            } else if (this.isIncomplete()) {
                alert("The form is incomplete.");
                return;
            } else if (this.isNotNumber(this.amount)) {
                alert("Your expense amount is invalid!");
            } else {
                const newItem = {
                    name: this.name,
                    description: this.description,
                    amount: "$" + this.amount,
                    type: this.type,
                    showDetail: false
                };
                expenses.push(newItem);
                this.name = "";
                this.description = "";
                this.amount = "";
                this.type = "";
                this.closeForm();
            }
        },
    }
});