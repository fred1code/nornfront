import React, {Component} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Cookies from "universal-cookie";
import '../css/Menu.css';
import qs from "qs";
import axios from "axios";

const cookies = new Cookies();

var rows = [];
var valores;
class Menu extends Component {
    cerrarSesion = () => {
        cookies.remove('jwt', {path: "/"});
        window.location.href = "/";
    }

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
    };

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
                rows = response.data.body;
                console.log(this.imprimir());
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