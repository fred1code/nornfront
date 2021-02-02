import React, {Component} from "react";
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import qs from 'qs';
import Cookies from "universal-cookie";

const loginUrl = "http://localhost:8000/api/user/login";
const cookies = new Cookies();

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
            'json': '{"email":"' + this.state.form.email + '","password":"' + this.state.form.password + '","getToken":""}'
        });
        await axios.post(loginUrl, data)
            .then(response => {
                return response.data;
            })
            .then(response => {
                if (response.length > 0) {
                    cookies.set('jwt', response, {path: "/"})
                    alert('Bienvenido');
                    window.location.href = "./menu";
                } else {
                    alert('usuario o  password incorrectos');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        if (cookies.get('jwt')) {
            window.location.href = "./menu";
        }
    }

    render() {
        return (
            <div className="containerPrincipal border border-primary">
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