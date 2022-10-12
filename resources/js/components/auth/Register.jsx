import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert";

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        passwordAgain: '',
        error_list: [],

    };

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    registerSubmit = async (e) => {
        e.preventDefault();
        const _this = this;

        await axios.post('api/register', this.state).then(async (res) => {
            console.log(res.data.message);
            await swal({
                title: "Başarılı",
                text: "Kayıt Başarılı : " + res.data.message.user.name,
                icon: "success",
                button: "Tamam",
            });
            _this.setState({
                name: '',
                email: '',
                password: '',
            });
            navigation.navigate('/login');

        }).catch(function (e) {
            _this.setState({
                error_list: e.response.data.errorMessage
            });

        });
    }

    render() {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Kayıt Ol</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">İsim Soyisim</label>
                                        <input type="text" onChange={this.handleInput} value={this.state.name}
                                               name="name" className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">E-Mail</label>
                                        <input type="email" onChange={this.handleInput} value={this.state.email}
                                               name="email"
                                               className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Parola</label>
                                        <input type="password" onChange={this.handleInput} value={this.state.password}
                                               name="password" className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Parola (Tekrarı)</label>
                                        <input type="password" onChange={this.handleInput}
                                               value={this.state.passwordAgain}
                                               name="passwordAgain" className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.passwordAgain}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Kayıt Ol</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;

