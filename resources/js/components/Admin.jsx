import React, {Component} from "react";
import axios from "axios";

class Admin extends Component {
    constructor(props) {
        super(props);

        const ITEM_STATES = {
            ALL: "",
            COMPLETED: 0,
            UNCOMPLETED: 1
        }
        this.state = {
            items: [],
            users: [],
            loading: true,
            showStateUsers:"",
            showStateItems: ITEM_STATES.ALL,
        }
    }


    /**
     * Item Lists
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const resItems = await axios.get('api/items/admin');
        if (resItems.data.success === true) {
            this.setState({
                    items: resItems.data.message,
                    loading: false
                }
            )
        }
        const resUser = await axios.get('api/items/users');
        if (resUser.data.success === true) {
            this.setState({
                    users: resUser.data.message,
                }
            )
        }
    }

    setFilterUser = async (e) => {

        this.setState({
            showStateUsers : e
        });
    }

    setFilter = async (e) => {
        console.log(e);
        let itemStates;

        if (e === "0") {
            itemStates = 0;
        } else if (e === "1") {
            itemStates = 1;
        } else {
            itemStates = "";
        }
        this.setState({
            showStateItems: itemStates,
        });
    }

    render() {
        // Users with Items
        let item_HTMLTABLE = "";
        if (this.state.loading) {
            item_HTMLTABLE = <tr>
                <td colSpan="5"><h4>Lütfen Bekleyiniz..</h4></td>
            </tr>
        } else {
            item_HTMLTABLE =
                this.state.items.filter((val) => {
                    if (this.state.showStateUsers == "" ) {
                        return val;
                    }else if (this.state.showStateUsers == val.user_id){
                        return val;
                    }
                }).filter((val) => {
                    if (val.completed === this.state.showStateItems) {
                        return val;
                    } else if (this.state.showStateItems === "") {
                        return val;
                    }
                }).map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.user.name}</td>
                            <td>{item.title}</td>
                            <td>{item.completed === 1 ? 'Tamamlandı' : 'Tamamlanmadı'}</td>
                            <td>{item.created_at}</td>
                        </tr>
                    );
                });
        }
        // Users without Admin

        let user_option = this.state.users.map((user, index) => {
            return (
                <option key={index} value={user.id}>{user.name}</option>
            )
        });
        return (
            <div className="col-md-12 mt-3">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <h4> Kullanıcılar</h4>
                            <div className="col">
                                <label htmlFor="">Kullanıcı Seç</label>
                                <select className="form-select" onChange={e => this.setFilterUser(e.target.value)}>
                                    <option value="">Hepsi</option>
                                    {user_option}
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="">Durum Seç</label>
                                <select className="form-select" onChange={e => this.setFilter(e.target.value)}>
                                    <option value="">Hepsi</option>
                                    <option value="1">Tamamlananlar</option>
                                    <option value="0">Tamamlanmayanlar</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>İsim Soyisim</th>
                                <th>İçerik</th>
                                <th>Durum</th>
                                <th>Oluşturulma Tarihi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {item_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;
