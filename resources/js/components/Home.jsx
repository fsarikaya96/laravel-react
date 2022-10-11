import React, {Component} from "react";

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <label htmlFor="">Yapılacakları Yazınız..</label>
                        <div className="input-group">
                            <input type="text" className="form-control"/>
                            <button className="btn btn-primary">Kaydet</button>
                        </div>
                        <div className="card-body mt-2">
                            <h3>test</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
