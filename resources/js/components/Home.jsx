import React, {Component} from 'react';
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            name: '',
            error: '',
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
                name: '',
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

    render() {
        const {items} = this.state;

        return (
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={this.saveItem}>
                            <label htmlFor="">Yapılacakları Yazınız..</label>
                            <div className="input-group">
                                <input type="text" name="name" onChange={this.handleInput} value={this.state.name}
                                       className="form-control"/>

                                <button className="btn btn-primary">Ekle</button>
                            </div>
                            <span className="text-danger">{this.state.error.name}</span>
                        </form>

                        {
                            <div className="card mt-2">
                                <div className="card-body">
                                    {items.map(item => (
                                        <div key={item.id}>
                                            <span>{item.name}</span>
                                            <button type="button" onClick={(e) => this.itemDelete(e, item.id)}
                                                    className="btn btn-danger btn-sm float-end">Sil
                                            </button>
                                            <hr/>
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
