const expenses = [
    // dummy expenses for testing when needed
    // {
    //     name: "Item 1",
    //     description: "Description here",
    //     amount: 90,
    //     type: "F&B",
    //     showDetail: false,
    //     categoryClicked: false,
    //     id: 1
    // },
    // {
    //     name: "Item 2",
    //     description: "Description here",
    //     amount: 10,
    //     type: "Shopping",
    //     showDetail: false,
    //     categoryClicked: false,
    //     id: 2
    // },
    // {
    //     name: "Item 3",
    //     description: "Description here",
    //     amount: 50,
    //     type: "Leisure",
    //     showDetail: false,
    //     categoryClicked: false,
    //     id: 3
    // },
    // {
    //     name: "Item 4",
    //     description: "Description here",
    //     amount: 35,
    //     type: "Leisure",
    //     showDetail: false,
    //     categoryClicked: false,
    //     id: 4
    // }
];

const itemCounter = expenses.length;


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

];

const app = new Vue({
    el: '.expense-table',
    data: {
        title: 'Expense Tracker',
        expensesList: expenses,
        addExpenseButton: 'Add Expense',
        expenseSummaryButton: 'Summary',
        idBeingEditted: null
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
        },
        triggerSummary() {
            categoryBreakdown.summaryTriggered = !categoryBreakdown.summaryTriggered;
            $(".expense-wrapper").css("opacity", "0.2");
            $(".add-btn").css("opacity", "0.2");
            $(".category-wrapper").hide();
            $(".expense-section").hide();
            $(".topnav").hide();
        },
        deleteEntry(index) {
            const answer = confirm("Confirm deletion?");
            if (answer) {
                const categoryToDelete = this.expensesList[index].type;
                const amountToDelete = this.expensesList[index].amount;
                categorySection.deduct(categoryToDelete, amountToDelete);
                this.expensesList.splice(index, 1);
            }
        },
        editEntry(index) {
            const itemToEdit = this.expensesList[index];
            const categoryToDelete = this.expensesList[index].type;
            const amountToDelete = this.expensesList[index].amount;
            this.idBeingEditted = this.expensesList[index].id;
            categorySection.deduct(categoryToDelete, amountToDelete);
            this.expensesList.splice(index, 1);
            form.editMode = true;
            this.triggerForm();
            form.name = itemToEdit.name;
            form.amount = itemToEdit.amount;
            form.description = itemToEdit.description;
            form.type = itemToEdit.type;
        },

    }
});



const form = new Vue({
    el: '#form',
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
        editMode: false
    },
    methods: {
        closeForm() {
            if (this.editMode) {
                const edittedItem = {
                    name: this.name,
                    description: this.description,
                    amount: parseFloat(this.amount),
                    type: this.type,
                    showDetail: false,
                    categoryClicked: false,
                    id: app.idBeingEditted
                };
                expenses.splice(app.idBeingEditted - 1, 0, edittedItem);
                this.editMode = false;
                app.idBeingEditted = null;
                categorySection.add(this.type, this.amount);
            }
            this.formTriggered = !this.formTriggered;
            $(".expense-wrapper").css("opacity", "1");
            $(".add-btn").css("opacity", "1");
            $(".expense-section").show();
            $(".topnav").show();
            if (window.matchMedia("only screen and (min-width: 769px)").matches) {
                $(".category-wrapper").show();
            }
        },

        isIncomplete() {
            return (this.amount == "" || this.type == "")
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
                if (this.editMode) {
                    const edittedItem = {
                        name: this.name,
                        description: this.description,
                        amount: parseFloat(this.amount),
                        type: this.type,
                        showDetail: false,
                        categoryClicked: false,
                        id: app.idBeingEditted
                    };
                    expenses.splice(app.idBeingEditted - 1, 0, edittedItem);
                    this.editMode = false;
                    app.idBeingEditted = null;
                } else {
                    const newItem = {
                        name: this.name,
                        description: this.description,
                        amount: parseFloat(this.amount),
                        type: this.type,
                        showDetail: false,
                        categoryClicked: false
                    };
                    expenses.push(newItem);
                };                
                categorySection.add(this.type, this.amount);
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
        totalHeader: "Total"
    },
    computed: {
        totalSpending() {
            let final = 0;
            for (let i = 0; i < app.expensesList.length; i++) {
                final += app.expensesList[i].amount;
            }
            return final;
        }
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


const categoryBreakdown = new Vue({
    el: '#category-breakdown',
    data: {
        summaryTriggered: false,
        title: "Expenditure Summary",
        cross: "X",
        close: "Close",
        categories: categories,
        income: null
    },
    computed: {
        savings() {
            return this.income - categorySection.totalSpending; 
        },
        percentageOfIncome() {
            return 100*(this.savings/this.income);
        }
    },
    methods: {
        closeForm() {
            this.summaryTriggered = !this.summaryTriggered;
            $(".expense-wrapper").css("opacity", "1");
            $(".add-btn").css("opacity", "1");
            $(".expense-section").show();
            $(".topnav").show();
            if (window.matchMedia("only screen and (min-width: 769px)").matches) {
                $(".category-wrapper").show();
            }
        }
    }
});


            