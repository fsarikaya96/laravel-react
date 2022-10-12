import React, {Component} from 'react';
import axios from "axios";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            title: '',
            error: '',
            completed: '',
        }
        this.onTodoChange = this.onTodoChange.bind(this)
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    /**
     * Insert Items
     * @param e
     * @returns {Promise<void>}
     */
    saveItem = async (e) => {

        e.preventDefault();
        const _this = this;
        await axios.post('api/items', this.state).then(async (res) => {
            _this.setState({
                items: [..._this.state.items, res.data.message],
                title: '',
                error: '',
            });
        }).catch(function (e) {
            _this.setState({
                error: e.response.data.errorMessage
            });

        });
    }

    /**
     * Item Lists
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const res = await axios.get('api/items');
        if (res.data.success === true) {
            this.setState({
                    items: res.data.message
                }
            )
        }
    }

    /**
     * Item Delete
     * @param e
     * @param id
     * @returns {Promise<void>}
     */
    itemDelete = async (e, id) => {
        const deleteBtn = e.currentTarget;
        const res = await axios.delete(`api/items/${id}`)
        if (res.data.success === true) {
            deleteBtn.closest("div").remove();
        }
    }

    /**
     * Item Update Button
     * @param e
     * @param id
     * @returns {Promise<void>}
     */
    itemUpdate = async (e, id) => {
        const findItemInItems = this.state.items.find((item) => item.id === id)
        const res = await axios.put(`api/items/${id}`, findItemInItems);
        console.log(res.data.message);
    }

    /**
     * Change Input Value
     * @param id
     * @param value
     */
    onTodoChange(id, value) {
        const findItemInItems = this.state.items.find((item) => item.id === id)
        findItemInItems.title = value

        this.setState({
            items: this.state.items
        });

    }

    /**
     * Item Change Completed
     * @param id
     * @param checked
     * @returns {Promise<void>}
     */
    async onTodoChangeCompleted(id, checked) {
        const findItemInItems = this.state.items.find((item) => item.id === id)
        findItemInItems.completed = checked === true ? 1 : 0;
        const res = await axios.put(`api/items/${id}`, findItemInItems);
        console.log(res.data.message);

        this.setState({
            items: this.state.items
        });
    }

    render() {
        const {items} = this.state;
        return (
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={this.saveItem}>
                            <label htmlFor="">Yapılacakları Yazınız..</label>
                            <div className="input-group">
                                <input type="text" name="title" onChange={this.handleInput} value={this.state.title}
                                       className="form-control"/>

                                <button className="btn btn-primary">Ekle</button>
                            </div>
                            <span className="text-danger">{this.state.error.title}</span>
                        </form>

                        {
                            <div className="card mt-2">
                                <div className="card-body">
                                    {items.map(item => (
                                        <div style={{display: "flex"}} key={item.id}>
                                            <input type="checkbox"
                                                   onChange={e => this.onTodoChangeCompleted(item.id, e.target.checked)}
                                                   checked={item.completed}
                                            />
                                            <input type="text" className="form-control mb-2 editInputs" value={item.title}
                                                   onChange={e => this.onTodoChange(item.id, e.target.value)}/>
                                            <button type="button" style={{margin: "10px"}}
                                                    onClick={(e) => this.itemUpdate(e, item.id)}
                                                    className="btn btn-success btn-sm">Güncelle
                                            </button>
                                            <button type="button" style={{margin: "10px"}}
                                                    onClick={(e) => this.itemDelete(e, item.id)}
                                                    className="btn btn-danger btn-sm">Sil
                                            </button>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
