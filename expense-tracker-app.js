const expenses = [
    {
        name: "Item 1",
        description: "Description here",
        amount: "$90",
        type: "F&B",
        showDetail: false,
        categoryClicked: false
    },
    {
        name: "Item 2",
        description: "Description here",
        amount: "$10",
        type: "Shopping",
        showDetail: false,
        categoryClicked: false
    },
    {
        name: "Item 3",
        description: "Description here",
        amount: "$50",
        type: "Leisure",
        showDetail: false,
        categoryClicked: false
    },
    {
        name: "Item 4",
        description: "Description here",
        amount: "$35",
        type: "Leisure",
        showDetail: false,
        categoryClicked: false
    }
];

const categories = [
    {
        name: "F&B",
        spending: 0,
        color: "red"
    },
    {
        name: "Leisure",
        spending: 0,
        color: "blue"
    },
    {
        name: "Shopping",
        spending: 0,
        color: "yellow" 
    },
    {
        name: "Others",
        spending: 0,
        color: "green"
    },
    {
        name: "Total",
        spending: 0,
        color: "black"
    }
];

const app = new Vue({
    el: '.expense-table',
    data: {
        title: 'Expense Tracker',
        expensesList: expenses,
        content: 'Add Expense'
    },
    methods: {
        toggleDetails(expense) {
            expense.showDetail = !expense.showDetail;     
        },
        triggerForm() {
            form.formTriggered = !form.formTriggered;
            $(".expense-wrapper").css("opacity", "0.2");
            $(".add-btn").css("opacity", "0.2");
            $(".category-wrapper").hide();
            $(".expense-section").hide();
            $(".topnav").hide();
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
            $(".category-wrapper").show();
            $(".expense-section").show();
            $(".topnav").show();
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
                    showDetail: false,
                    categoryClicked: false
                };
                for (let i = 0; i < categorySection.categoriesList.length; i++) {
                    console.log(categorySection.categoriesList[i].name);
                    if (categorySection.categoriesList[i].name == this.type) {
                        categorySection.add(this.type, this.amount);
                    }
                } 
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

const categorySection = new Vue({
    el: '.category-wrapper',
    data: {
        categoriesList: categories,
    },
    methods: {
        add(category, amount) {
            for (let i = 0; i < this.categoriesList.length; i++) {
                if (this.categoriesList[i].name == category) {
                    this.categoriesList[i].spending += parseFloat(amount);
                }
            }
        },

        deduct(category, amount) {
            for (let i = 0; i < this.categoriesList.length; i++) {
                if (this.categoriesList[i].name == category) {
                    this.categoriesList[i].spending -= parseFloat(amount);
                }
            }
        },

        focusCategory(event) {
            const list = app.expensesList;
            for (let i = 0; i < list.length; i++) {
                list[i].categoryClicked = false;
                if (event.target.className == list[i].type) {
                    list[i].categoryClicked = true;
                }
            }
        }
    }
}) 