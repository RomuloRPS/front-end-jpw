import React from 'react'
import Axios from 'axios'
import ListaComputador from './ListaComputador'
import FormularioComputador from './FormularioComputador'
import NavBar from './NavBar'
  
export default class Computadores extends React.Component{


    
    constructor(props){
        super(props)

        this.API_URL = "http://localhost:8080/computador"

        this.state = {
            "computadores": [],
            "computador": {"nome": "", "valor": 0},
            "selecionado": null,
            "search": "",
            "message": ""
        }
    }

    selectComputador = (computador) => {
        if(this.state.selecionado === computador){
            this.setState({
                'selecionado': null
            })
        } else {
            this.setState({
                'selecionado': computador
            })
            this.render()
        }
    }

    addComputador = (computador) => {
        var requisicao = Axios.post(this.API_URL, computador)
        requisicao.then((resposta) => {
            if(resposta.status === 200){
                this.getAllComputadores()
            }
        })
        requisicao.catch((error) => {
            this.setState({
                "message": "(400) Dados inválidos"
            })
        })
    }

    componentDidMount = () => {
        this.getAllComputadores()
    }

    getAllComputadores = () => {

        var url = this.API_URL
        if(url !== "") {
            url = url + "?nome=" + this.state.search
        }
        var requisicao = Axios.get(url)
        requisicao.then((resposta) => {
            this.setState({
                "computadores": resposta.data
            })
        })
    }

    getAComputador = (computadorId) => {
        var requisicao = Axios.get(this.API_URL + '/' + computadorId)
        
        requisicao.then((resposta) => {
            this.setState({
                "computador": resposta.data
            })
        })
    }

    deleteComputador = (computadorId) => {
        var requisicao = Axios.delete(this.API_URL + '/' + computadorId)

        if(this.state.selecionado !== null && this.state.selecionado._id === computadorId) {
            this.setState({
                "selecionado": null
            })
        }

        requisicao.then((resposta) => {
            if(resposta.status === 200){
                this.getAllComputadores()
            }
        })

        
    }

    putComputador = (computador) => {
        if(this.state.selecionado){
            var requisicao = Axios.put(this.API_URL + '/' + this.state.selecionado._id, computador)
            requisicao.then((resposta) => {
                if(resposta.status === 200){
                    this.setState({"selecionado": null})
                    this.getAllComputadores()
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
            <h1 style={{textAlign: 'center'}}>Computadores</h1>
            <div className="row">
                <h2>Formulario</h2>
                {this.state.message !== ""? 
                <div class="col-md-12 alert alert-danger" role="alert">
                    {this.state.message}
                </div>
                : null }
                <div className="col-md-12">
                    <section>
                        <FormularioComputador
                            computadores={this.state.computadores}
                            selecionado={this.state.selecionado}
                            add={this.addComputador}
                            put={this.putComputador}>
                        </FormularioComputador>
                    </section>
                </div>
            </div>
            <div className="row" style={{"margin-top" : "30px"}}>
                <h2>Computadores:</h2>
                
                <div className="col-md-12">
                    <label for="search">Filtro Nome:</label>
                    <input style={{"width" : "200px"}} className="form-control" type="text" name="search" id="search" onChange={this.handleSearch} value={this.state.search}></input>
                    <button style={{"margin-top" : "10px", marginBottom: '10px'}} type="button" className="btn btn-primary" onClick={this.getAllComputadores}>Atualizar</button>
                    <section>
                        <ListaComputador
                            computador={this.state.computador}
                            getAComputador={this.getAComputador}
                            computadores={this.state.computadores}
                            select={this.selectComputador}
                            delete={this.deleteComputador}>
                        </ListaComputador>
                    </section>
                </div>
            </div>
        </div>
            
        </div>
    }

}