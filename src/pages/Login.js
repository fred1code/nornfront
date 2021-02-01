import React, {Component} from "react";
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import  qs from 'qs';

const loginUrl = "http://localhost:8000/api/user/login";
class Login extends Component {
    state = {
        form: {
            email: '',
            password: ''
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    iniciarSesion = async () => {
let data = qs.stringify({
    'json': '{"email":"'+this.state.form.email+'","password":"'+this.state.form.password+'","getToken":""}'
});
        await axios.post(loginUrl, data)
            .then(reponse => {
                console.log(reponse.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text"
                               className="form-control"
                               name="email"
                               onChange={this.handleChange}/>
                        <br/>
                        <label>Password:</label>
                        <input type="password"
                               className="form-control"
                               name="password"
                               onChange={this.handleChange}/>
                        <br/>
                        <button className="btn btn-primary" onClick={() => this.iniciarSesion()}> Login</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default Login;