import api from "@/lib/api"

const ExpenseApi = {
    addExpense: data => {
        return api.post(`expense/save`, data)
    },
    editExpense: (id, data) => {
        return api.put(`expense/updateExpense/${id}`, data)
    },
    getByIdExpense: id => {
        return api.get(`expense/getExpenseById/${id}`)
    },
    getAllExpense: (page, length) => {
        return api.get(`expense/getAllExpenses?page=${page}&limit=${length}`)
    },
    deleteExpense: id => {
        return api.delete(`expense/deleteExpense/${id}`)
    },

    expenseCSVList: (formData) => {
        return api.post(`expense/importExpenses`, formData)
      },

    expenseListFilters: data => {
        const search = data?.search ?? ''
        return api.get(
            `expense/getAllExpenses?search=${search}`
        )
    },

}

export default ExpenseApi
