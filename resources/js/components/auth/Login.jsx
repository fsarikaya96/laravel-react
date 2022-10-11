import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert";

class Login extends Component {
    state = {
        email: '',
        password: '',
        error_list: [],
    };

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    loginSubmit = async (e) => {
        e.preventDefault();
        const _this = this;
        await axios.post('api/login', this.state).then(async (res) => {
            console.log(res.data.message);
            localStorage.setItem('auth_token', res.data.message.token);
            localStorage.setItem('auth_name', res.data.message.name);
            localStorage.setItem('role_as', res.data.message.role_as);
            await swal({
                title: "Başarılı",
                text: "Hoşgeldiniz : " + res.data.message.name,
                icon: "success",
                button: "Tamam",
            });
            _this.setState({
                email: '',
                password: '',
            });
            if (res.data.message.role_as === 1) {
                navigation.navigate('/admin');
            } else {
                navigation.navigate('/');
            }

        }).catch(async function (e) {
            _this.setState({
                error_list: e.response.data.errorMessage
            });
            await swal({
                title: "Başarısız",
                text: e.response.data.errorMessage.notFound ?? 'HATA',
                icon: "error",
                button: "Tamam",
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
                                <h4>Giriş Yap</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.loginSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">E-Mail</label>
                                        <input type="email" name="email" onChange={this.handleInput}
                                               value={this.state.email} className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.email}</span>

                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Parola</label>
                                        <input type="password" name="password" onChange={this.handleInput}
                                               value={this.state.password} className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.password}</span>

                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Giriş Yap</button>
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

export default Login;

