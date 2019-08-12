import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'


const URL = 'http://localhost:3003/api/todos'
export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }
        this.RegisterEvents();
        this.refresh()
    }
    RegisterEvents() {
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleAdd() {
        const _description = this.state.description
        axios.post(URL, {
            description: _description
        }).then(response => {
            this.refresh()
        }).catch(error => {
            console.log(error.response)
        });
    }
    handleSearch() {
        this.refresh(this.state.description)
    }

    handleClear() {
        this.refresh()
    }


    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp =>
                this.setState({
                    ...this.state,
                    description,
                    list: resp.data
                }))
    }
    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(response => { this.refresh(this.state.description) })
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(response => { this.refresh(this.state.description) })
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(response => { this.refresh(this.state.description) })
    }
    handleChange(e) {
        this.setState(
            {
                ...this.state,
                description: e.target.value
            })
    }

    render() {
        return (
            <div>
                <PageHeader name='tarefas' small='cadastro'></PageHeader>
                <TodoForm
                    handleChange={this.handleChange}
                    description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <TodoList
                    list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending} />
            </div>
        )
    }
}