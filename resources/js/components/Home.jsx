import React, {Component} from 'react';
import axios from "axios";


class Home extends Component {

    constructor(props) {
        super(props);

        const ITEM_STATES = {
            ALL: "",
            COMPLETED: 0,
            UNCOMPLETED: 1
        }

        this.state = {
            items: [],
            error: '',
            title:'',
            search: '',
            showItemsState: ITEM_STATES.ALL,
            currentPage: 1,
            itemsPerPage: 10,
        }

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
            console.log(res.data.message);
            _this.setState({
                items: [res.data.message , ..._this.state.items],
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
        let updatedItems = this.state.items;
        const res = await axios.delete(`api/items/${id}`)
        if (res.data.success === true) {
            updatedItems = updatedItems.filter(items => items.id !== id);
            this.setState({
                items: updatedItems
            });
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
            items: this.state.items,

        });
    }

    /**
     * Filter by Completed & UnCompleted
     * @param status
     * @returns {Promise<void>}
     */
    setFilter = async (status) => {

        let itemStates;

        if (status === "0") {
            itemStates = 0;
        } else if (status === "1") {
            itemStates = 1;
        } else {
            itemStates = "";
        }
        this.setState({
            showItemsState: itemStates,
        });
    }

    /**
     * Paginate
     * @param e
     */
    paginate = (e) => {
        this.setState({'currentPage': e.target.text});
    }

    render() {
        const {items} = this.state;
        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = this.state.items.slice(indexOfFirstItem, indexOfLastItem);
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(items.length / this.state.itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const pages = pageNumbers.map(number => {
            return (
                <li key={number.toString()} className="page-item">
                    <a onClick={this.paginate} href="#" className="page-link">
                        {number}
                    </a>
                </li>
            )
        });

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

                        <div className="row mt-2">
                            <div className="col">
                                <input type="text" name="search" onChange={this.handleInput} value={this.state.search}
                                       className="form-control" placeholder="Ara.."/>
                            </div>
                            <div className="col">
                                <select className="form-select" onChange={e => this.setFilter(e.target.value)}>
                                    <option value="">Hepsi</option>
                                    <option value="1">Tamamlananlar</option>
                                    <option value="0">Tamamlanmayanlar</option>
                                </select>
                            </div>
                        </div>
                        {
                            <div className="card mt-2">
                                <div className="card-body">
                                    {this.state.items.length <= 0 ? <span>İçerik Bulunamadı</span>
                                        : currentItems.filter((val) => {
                                            if (this.state.search === "") {
                                                return val;
                                            } else if (val.title.toLowerCase().includes(this.state.search.toLowerCase())) {
                                                return val;
                                            }

                                        }).filter((val) => {
                                            if (val.completed === this.state.showItemsState) {
                                                return val;
                                            } else if (this.state.showItemsState === "") {
                                                return val;
                                            }
                                        }).map(item => (
                                            <div style={{display: "flex"}} key={item.id}>
                                                <input type="checkbox"
                                                       onChange={e => this.onTodoChangeCompleted(item.id, e.target.checked)}
                                                       checked={item.completed}
                                                />
                                                <input type="text"
                                                       className={item.completed === 1 ? 'line form-control mb-2 editInputs' : 'form-control mb-2 editInputs'}
                                                       value={item.title}
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
                        <nav>
                            <ul className="pagination">
                                {pages}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
