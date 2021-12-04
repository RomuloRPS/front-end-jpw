import React from 'react'

export default class FormularioComputador extends React.Component{

    constructor(props){
        super(props)
        if(this.props.selecionado){
            this.state = {
                "nome": this.props.selecionado.nome,
                "valor": this.props.selecionado.valor,
                "alterado": true
            }
        } else {
            this.state = {
                "nome": "",
                "valor": 0,
                "alterado": false
            }
        }
    }

    refreshData(){
        
        if(this.props.selecionado){
            this.setState({
                "nome": this.props.selecionado.nome,
                "valor": this.props.selecionado.valor,
                "alterado": true
            })
        }
        else {
            this.setState({
                "alterado": false
            })
        }
    }

    setComputador = () => {
        if(this.props.selecionado == null) {
            this.props.add({
                "nome": this.state.nome,
                "valor": this.state.valor
            })
        }
        else {
            this.props.put({
                "nome": this.state.nome,
                "valor": this.state.valor
            })
        }

        this.setState({
            "alterado": false,
            "nome": "",
            "valor": 0
        })
    }

    handleInput = (event) => {
        this.setState({
            "alterado": true,
            [event.target.id]: event.target.value
        })
    }

    render() {
        var selecionado = this.props.selecionado ? this.props.selecionado._id : null
        var name = ""
        if(selecionado) {
            name = "Atualizar"
            if(!this.state.alterado) {
                this.refreshData()
            }
        }
        else {
            name = "Inserir"
            if(this.state.alterado) {
                this.refreshData()
            }
        }
        return(
            <div>
                <div>{selecionado}</div>
                <form>
                    <div className="form-group">
                        <label for="nome">Nome:</label>
                        <br></br>
                        <input  className="form-control" type="text" name="nome" id="nome" onChange={this.handleInput} value={this.state.nome}></input>
                    </div>
                    <div className="form-group">
                        <label for="valor">Valor:</label>
                        <br></br>
                        <input className="form-control" type="number" name="valor" id="valor" onChange={this.handleInput} value={this.state.valor}></input>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.setComputador}>{name}</button>
                </form>
            </div>
        )
    }
}