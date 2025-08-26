import api from "@/lib/api"

const ExpenseCategoryApi = {
    addExpenseCategory: data => {
        return api.post(`expenseCategory/save`, data)
    },
    editExpenseCategory: (id, data) => {
        return api.put(`expenseCategory/updateExpenseCategory/${id}`, data)
    },
    getByIdExpenseCategory: id => {
        return api.get(`expenseCategory/getExpenseCategoryById/${id}`)
    },
    getAllExpenseCategory: (page, length) => {
        return api.get(`expenseCategory/getAllExpenseCategory?page=${page}&limit=${length}`)
    },
    getAllCategoryforOption: () => {
        return api.get(`expenseCategory/getAllExpenseCategory`)
    },

    deleteExpenseCategory: id => {
        return api.delete(`expenseCategory/deleteExpenseCategory/${id}`)
    },
    getAllExpenseCategoryByType: (type) => {
        return api.get(`expenseCategory/getAllExpenseCategory?parentId=${type}`)
    },


    ExpenseCategoryListFilters: data => {
        const search = data?.search ?? ''
        return api.get(
            `expenseCategory/getAllExpenseCategory?name=${search}`
        )
    },

}

export default ExpenseCategoryApi