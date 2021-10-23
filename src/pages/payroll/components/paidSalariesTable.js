import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import 'moment/locale/ru';

class PaidSalariesTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            paidSalaries: [],
            employees: [],
            new_salary: {
                employee: '',
                sum: '',
                date: '',
                comment: '',
            }
        }

        this.new_sum = React.createRef();
        this.new_date = React.createRef();
        this.new_comment = React.createRef();
    }

    componentDidMount() {
        this.getEmployees()
        this.getPaidSalaries()
    }

    getEmployees() {
        this.props.adapter.employee('get')
            .then(result => {
                this.setState({
                    employees: result.data,
                })
            })
    }

    createPayment() {
        this.props.adapter.paidSalary('create', this.state.new_salary)
            .then((result) => {
                this.new_sum.current.value = null
                this.new_date.current.value = null
                this.new_comment.current.value = null

                document.location.reload()
            })
    }

    getPaidSalaries() {
        this.props.adapter.paidSalary('get')
            .then(result => {
                this.setState({
                    paidSalaries: result.data,
                    loading: false
                })
            })
    }

    handleChanges(field, value) {
        this.setState(prevState => ({
            new_salary: {
                ...prevState.new_salary,
                [field]: value
            }
        }))
    }

    render() {
        return (
            <div className="paidSalaries-table">
                {
                    !this.state.loading ?
                        <table>
                            <thead>
                                <tr>
                                    <th>Кому</th>
                                    <th>Сумма</th>
                                    <th>Дата</th>
                                    <th>Комментарий</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.paidSalaries.map((value, ind) => {
                                        moment.locale('ru')
                                        return (
                                            <tr>
                                                <td>{value.employee.user.first_name}</td>
                                                <td>{value.sum}</td>
                                                <td>{moment(value.date).format('D MMMM H:mm')}</td>
                                                <td>{value.comment}</td>
                                                <td>
                                                    <button>✎</button>
                                                    <button>🗑</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td>
                                        <select onChange={(e) => this.handleChanges('employee', parseInt(e.target.selectedIndex))}>
                                            <option value='0'>Выберите сотрудника</option>
                                            {
                                                this.state.employees.map(value =>
                                                    <option value={value.id}>{value.user.first_name}</option>
                                                )}
                                        </select>
                                    </td>
                                    <td><input ref={this.new_sum} onChange={(value) => this.handleChanges('sum', value.target.value)} type="number" min="1" step="any"  /></td>
                                    <td><input ref={this.new_date} onChange={(value) => this.handleChanges('date', value.target.value)} type="date" /></td>
                                    <td><input ref={this.new_comment} onChange={(value) => this.handleChanges('comment', value.target.value)} type="text" /></td>
                                    <td><button onClick={() => this.createPayment()}>✔</button></td>
                                </tr>
                            </tbody>
                        </table>
                        : null
                }
            </div>
        )
    }
}

export default connect((state) => state)(PaidSalariesTable)