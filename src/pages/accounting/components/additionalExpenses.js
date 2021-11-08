import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdditionalExpenses extends Component {

    constructor(props) {
        super(props)

        this.new_expense = {
            date: null,
            additional_expense_category: null,
            name: null,
            sum: null,
            calculation_formula: null
        }

        this.state = {
            additioanl_expense_categories: [],
            new_expense: this.new_expense
        }

        this.category = React.createRef();
        this.name = React.createRef();
        this.date = React.createRef();
        this.value = React.createRef();
        this.formula = React.createRef();
    }

    componentDidMount() {
        this.getAdditionalExpensesCategory()
    }

    getAdditionalExpensesCategory() {
        this.props.adapter.additionalExpenseCategory('get')
            .then((result) => {
                this.setState({
                    additioanl_expense_categories: result.data
                })
            })
    }

    handleChanges(field, value) {
        console.log(value);
        this.setState(prevState => ({
            new_expense: {
                ...prevState.new_expense,
                [field]: value
            }
        }))
    }

    createAdditionalExpense() {
        // console.log(this.state.new_expense);
        this.props.adapter.additionalExpense('post', this.state.new_expense)
            .then((result) => {
                this.category.current.value = 0
                this.name.current.value = null
                this.date.current.value = null
                this.value.current.value = null
                this.formula.current.value = null

                this.props.updateAccountingData()

                this.setState({
                    new_expense: this.new_expense
                })
            })
    }

    render() {
        return (
            <div className="cashbox-settings">
                <div className="setting-section overflow-auto">
                    <div className="setting-section__item">
                        <div className="setting-section__item-title">Дополнительные расходы: </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Дата</th>
                                    <th>Значение</th>
                                    <th>Формула</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.expenses.additional.data.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{value.name}</td>
                                                <td>{value.date}</td>
                                                <td>{value.sum != null ? value.sum : "#ОШИБКА!"}</td>
                                                <td>{value.formula}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td>
                                        <select ref={this.category} onChange={(e) => this.handleChanges('additional_expense_category', e.target.value)}>
                                            {this.state.additioanl_expense_categories.map((value, index) => {
                                                return (
                                                    <option key={index} value={value.id}>{value.name}</option>
                                                )
                                            })}
                                            <option value="0">Свой вариант</option>
                                        </select>
                                        <input ref={this.name} onChange={(e) => this.handleChanges('name', e.target.value)} type="text" />
                                    </td>
                                    <td><input ref={this.date} onChange={(e) => this.handleChanges('date', e.target.value)} type="date" /></td>
                                    <td><input ref={this.value} onChange={(e) => this.handleChanges('sum', e.target.value)} type="text" /></td>
                                    <td><input ref={this.formula} onChange={(e) => this.handleChanges('calculation_formula', e.target.value)} type="text" /></td>
                                    <td><button onClick={() => this.createAdditionalExpense()}>✔</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(AdditionalExpenses)