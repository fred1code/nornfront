import React, {Component, useState} from 'react';
import Cookies from "universal-cookie";
import '../css/Menu.css';
import qs from "qs";
import axios from "axios";
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const cookies = new Cookies();

//var rows = [] = useState(0);
var valores;

class Menu extends Component {
    cerrarSesion = () => {
        cookies.remove('jwt', {path: "/"});
        window.location.href = "/";
    }
    /*
       imprimir () {
             rows.map((row)=>{
                 let tpl = `<tr component="th" scope="row">
                                <th scope="row">${row.id}</th>
                                <td>${row.name}</td>
                                <td>${row.email}</td>
                                <td>${row.birthday}</td>
                                <td>${row.phone}</td>
                                <td>${row.sex}</td>
                                <td>${row.profile}</td>
                            </tr> `;
                valores= valores+tpl;
             });
            console.log(valores);
        };*/

    getData = async () => {
        var config = {
            method: 'get',
            url: 'http://localhost:8000/api/user/all',
            headers: {
                'Authorization': '"' + cookies.get("jwt") + '"',
            }
        }
        await axios(config)
            .then(response => {
               // rows = response.data;
                return response.data;

            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        if (!cookies.get('jwt')) {
            window.location.href = "./";
        }
    }


    render() {
        console.log(cookies.get('jwt'));
        console.log(this.getData().data);
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand">
                        <img src={process.env.PUBLIC_URL + '/logo192.png'} width="30" height="30" alt=""/>
                    </a>
                    <label onClick={() => this.getData()}>nombre</label>
                    <a className="log" onClick={() => this.cerrarSesion()}>
                        logout
                    </a>
                </nav>

                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">sex</th>
                        <th scope="col">phone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {valores}
                    </tbody>
                </table>


            </div>
        );
    }
}

export default Menu;