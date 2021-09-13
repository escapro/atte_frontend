import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpenseCategories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            categories: [],
            new_category: {
                name: null,
                is_accounting_expense: false,
            }
        }

        this.name = React.createRef();
        this.is_accounting_expense = React.createRef();

    }

    componentDidMount() {
       this.getExpenseCategories()
    }

    getExpenseCategories() {
        this.props.adapter.expenseCategories('get')
        .then((result) => {
            this.setState({
                categories: result.data,
                loading: false
            })
        })
    }

    handleChanges(field, value) {
        this.setState(prevState => ({
            new_category: {
                ...prevState.new_category,
                [field]: value
            }
        }))
    }

    creatExpenseCategory() {
        this.props.adapter.expenseCategories('post', this.state.new_category)
            .then((result) => {
                this.name.current.value = null
                this.is_accounting_expense.current.value = false

                this.getExpenseCategories()
            })
    }

    render() {
        return (
            <div className="cashbox-settings">
                <div className="setting-section">
                    <div className="setting-section__item">
                        <div className="setting-section__item-title">Категории расходов: </div>
                        <table>
                            <tr>
                                <th>Название</th>
                                <th>Учитывать?</th>
                            </tr>
                            {
                                this.state.categories.map((ec) => {
                                    return (
                                        <tr>
                                            <td>{ec.name}</td>
                                            <td>{ec.is_accounting_expense ? '✔' : '✖'}</td>
                                            <td>
                                                <button>✎</button>
                                                <button>🗑</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <th><input ref={this.name} onChange={(value) => this.handleChanges('name', value.target.value)} type="text" /></th>
                                <th><input ref={this.is_accounting_expense} onChange={(value) => this.handleChanges('is_accounting_expense', value.target.checked)} type="checkbox" /></th>
                                <td><button onClick={() => this.creatExpenseCategory()}>✔</button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(ExpenseCategories)