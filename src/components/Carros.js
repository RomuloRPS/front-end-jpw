import React from 'react'
import Axios from 'axios'
import ListaCarro from './ListaCarro'
import FormularioCarro from './FormularioCarro'
import NavBar from './NavBar'

export default class Carros extends React.Component{
   
    constructor(props){
        super(props)

        this.API_URL = "http://localhost:8080/carro"

        this.state = {
            "carros": [],
            "carro": {"marca": "", "modelo": "", "cor": ""},
            "selecionado": null,
            "search": "",
            "message": ""
        }
    }

    selectCarro = (carro) => {
        if(this.state.selecionado === carro){
            this.setState({
                'selecionado': null
            })
        } else {
            this.setState({
                'selecionado': carro
            })
            this.render()
        }
    }

    addCarro = (carro) => {
        var requisicao = Axios.post(this.API_URL, carro)
        requisicao.then((resposta) => {
            if(resposta.status === 200){
                this.getAllCarros()
            }
        })
        requisicao.catch((error) => {
            this.setState({
                "message": "(400) Dados inválidos "
            })
        })
        
    }

    componentDidMount = () => {
        this.getAllCarros()
    }

    getAllCarros = () => {

        var url = this.API_URL
        if(url !== "") {
            url = url + "?marca=" + this.state.search
        }
        var requisicao = Axios.get(url)
        requisicao.then((resposta) => {
            this.setState({
                "carros": resposta.data
            })
        })
    }

    getACarro = (carroId) => {
        var requisicao = Axios.get(this.API_URL + '/' + carroId)
        
        requisicao.then((resposta) => {
            this.setState({
                "carro": resposta.data
            })
        })
    }

    deleteCarro = (carroId) => {
        var requisicao = Axios.delete(this.API_URL + '/' + carroId)

        if(this.state.selecionado !== null && this.state.selecionado._id === carroId) {
            this.setState({
                "selecionado": null
            })
        }

        requisicao.then((resposta) => {
            if(resposta.status === 200){
                this.getAllCarros()
            }
        })

        
    }

    putCarro = (carro) => {
        if(this.state.selecionado){
            var requisicao = Axios.put(this.API_URL + '/' + this.state.selecionado._id, carro)
            requisicao.then((resposta) => {
                if(resposta.status === 200){
                    this.setState({"selecionado": null})
                    this.getAllCarros()
                }
            })
        }
    }

    handleSearch = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render(){
        return <div>
        <NavBar></NavBar>
        <div className="container" style={{width: '50%'}}>
            <h1 style={{textAlign: 'center'}}>Carros</h1>
            <div className="row">
                <h2>Formulario</h2>
                {this.state.message !== ""? 
                <div class="col-md-12 alert alert-danger" role="alert">
                    {this.state.message}
                </div>
                : null }
                
                <div className="col-md-12">
                    <section>
                        <FormularioCarro
                            carros={this.state.carros}
                            selecionado={this.state.selecionado}
                            add={this.addCarro}
                            put={this.putCarro}>
                        </FormularioCarro>
                    </section>
                </div>
            </div>
            <div className="row" style={{"margin-top" : "30px"}}>
                <h2>Carros:</h2>
                
                <div className="col-md-12">
                    <label for="search">Filtro Carro:</label>
                    <input style={{"width" : "200px"}} className="form-control" type="text" name="search" id="search" onChange={this.handleSearch} value={this.state.search}></input>
                    <button style={{"margin-top" : "10px", marginBottom: '10px'}} type="button" className="btn btn-primary" onClick={this.getAllCarros}>Atualizar</button>
                    <section>
                        <ListaCarro
                            carro={this.state.carro}
                            getACarro={this.getACarro}
                            carros={this.state.carros}
                            select={this.selectCarro}
                            delete={this.deleteCarro}>
                        </ListaCarro>
                    </section>
                </div>
            </div>
        </div>
        </div>
        
    }

}