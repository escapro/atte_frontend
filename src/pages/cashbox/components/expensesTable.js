import React, { Component } from 'react';
import '../../../assets/style.css'
import '../cashbox.css'
import { connect } from 'react-redux';

class ExpensesTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            expenses: []
        }

        this.addExpense = this.addExpense.bind(this);

        this.shiftType = React.createRef();
        this.expenseCategory = React.createRef();
        this.time = React.createRef();
        this.who = React.createRef();
        this.whom = React.createRef();
        this.sum = React.createRef();
        this.comment = React.createRef();
    }

    componentDidMount() {
        this.getExpenses()
    }

    getExpenses() {
        this.props.adapter.expenses('list')
            .then((result) => {
                this.setState({
                    expenses: result.data
                })
            })
    }
    
    formSubmit(event) {
        event.preventDefault()
    }

    addExpense() {

        let data = {}
        let error = false

        data['shift_type'] = this.shiftType.current.value
        data['expense_category'] = this.expenseCategory.current.value
        data['time'] = this.time.current.value
        data['who'] = this.who.current.value
        data['whom'] = this.whom.current.value
        data['sum'] = this.sum.current.value
        data['comment'] = this.comment.current.value

        if(data['time'] == '') {
            alert('Укажите время')
            error = true
        }
        if(data['who'] == '') {
            alert('Укажите кто отдал деньги')
            error = true
        }
        if(data['whom'] == '') {
            alert('Укажите кто взял деньги')
            error = true
        }
        if(data['sum'] == '') {
            alert('Укажите сумму денег')
            error = true
        }

        if(error) return

        this.props.adapter.expenses('create', data)
            .then((result) => {
                this.getExpenses()
                this.time.current.value = ''
                this.who.current.value = ''
                this.whom.current.value = ''
                this.sum.current.value = ''
                this.comment.current.value = ''
            })
    }

    render() {
        return (
            <div className="table" style={{ width: '100%' }}>
                <div className="table-header" style={{ padding: 15 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Тип смены</span>
                        <span>Время</span>
                        <span>Кто</span>
                        <span>Кому</span>
                        <span>Сумма</span>
                        <span>Категория</span>
                        <span>-------------</span>
                    </div>
                </div>
                <form className="table-column-title" onSubmit={this.formSubmit}>
                    <div className="table-column-title-item">
                        <select ref={this.shiftType}>
                            {
                                this.props.shifts.map((shift) => {
                                    return <option key={shift.id} value={shift.id}>{shift.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="table-column-title-item">
                        <input type='time' ref={this.time} />
                    </div>
                    <div className="table-column-title-item">
                        <input ref={this.who} />
                    </div>
                    <div className="table-column-title-item">
                        <input ref={this.whom} />
                    </div>
                    <div className="table-column-title-item">
                        <input type='number' ref={this.sum} />
                    </div>
                    <div className="table-column-title-item">
                        <select ref={this.expenseCategory}>
                            {
                                this.props.expenseCategories.map((eCats) => {
                                    return <option key={eCats.id} value={eCats.id}>{eCats.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="table-column-title-item">
                        <input ref={this.comment}/> <button onClick={this.addExpense}>+</button>
                    </div>
                </form>
                <div className="table-body">
                    {
                        this.state.expenses.map((exp) => {
                            return <div className="table-body-row" key={exp.id}>
                                <div className="table-body-row-item">
                                    <span>{exp.shift_type.name}</span>
                                </div>
                                <div className="table-body-row-item">
                                    <span>{exp.time}</span>
                                </div>
                                <div className="table-body-row-item">
                                    <span>{exp.who}</span>
                                </div>
                                <div className="table-body-row-item">
                                    <span>{exp.whom}</span>
                                </div>
                                <div className="table-body-row-item">
                                    <span>{exp.sum}</span>
                                </div>
                                <div className="table-body-row-item">
                                    <span>{exp.expense_category.name}</span>
                                </div>
                                <div className="table-body-row-item">
                                    <span>{exp.comment}</span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(ExpensesTable)