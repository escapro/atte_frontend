import React, { Component } from 'react';
import { connect } from 'react-redux';

class Employees extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            employees: [],
            new_employee: {
                username: '',
                first_name: '',
                last_name: '',
                password: ''
            }
        }

        this.username = React.createRef();
        this.first_name = React.createRef();
        this.last_name = React.createRef();
        this.password = React.createRef();

    }

    componentDidMount() {
       this.getEmployees()
    }

    getEmployees() {
        this.props.adapter.employee('get')
        .then((result) => {
            this.setState({
                employees: result.data,
                loading: false
            })
        })
    }

    handleChanges(field, value) {
        this.setState(prevState => ({
            new_employee: {
                ...prevState.new_employee,
                [field]: value
            }
        }))
    }

    createEmployee() {
        this.props.adapter.employee('create', this.state.new_employee)
            .then((result) => {
                this.username.current.value = null
                this.first_name.current.value = null
                this.last_name.current.value = null
                this.password.current.value = null

                this.getEmployees()
            })
    }

    render() {
        return (
            <div className="cashbox-settings">
                <div className="setting-section">
                    <div className="setting-section__item">
                        <div className="setting-section__item-title">Сотрудники: </div>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Логин</th>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th></th>
                            </tr>
                            {
                                this.state.employees.map((employee) => {
                                    return (
                                        <tr>
                                            <td>{employee.id}</td>
                                            <td>{employee.user.username}</td>
                                            <td>{employee.user.first_name}</td>
                                            <td>{employee.user.last_name}</td>
                                            <td>
                                                <button>✎</button>
                                                <button>🗑</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td></td>
                                <td><input ref={this.username} onChange={(value) => this.handleChanges('username', value.target.value)} type="text" /></td>
                                <td><input ref={this.first_name} onChange={(value) => this.handleChanges('first_name', value.target.value)} type="text" /></td>
                                <td><input ref={this.last_name} onChange={(value) => this.handleChanges('last_name', value.target.value)} type="text" /></td>
                                <td><input placeholder="пароль" ref={this.password} onChange={(value) => this.handleChanges('password', value.target.value)} type="text" /></td>
                                <td><button onClick={() => this.createEmployee()}>✔</button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(Employees)