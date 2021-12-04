import React from 'react'

export default class FormularioCarro extends React.Component{

    constructor(props){
        super(props)
        if(this.props.selecionado){
            this.state = {
                "marca": this.props.selecionado.marca,
                "modelo": this.props.selecionado.modelo,
                "cor": this.props.selecionado.cor,
                "alterado": true
            }
        } else {
            this.state = {
                "marca": "",
                "modelo": "",
                "cor": "",
                "alterado": false
            }
        }
    }

    refreshData(){
        
        if(this.props.selecionado){
            this.setState({
                "marca": this.props.selecionado.marca,
                "modelo": this.props.selecionado.modelo,
                "cor": this.props.selecionado.cor,
                "alterado": true
            })
        }
        else {
            this.setState({
                "alterado": false
            })
        }
    }

    setCarro = () => {
        if(this.props.selecionado == null) {
            this.props.add({
                "marca": this.state.marca,
                "modelo": this.state.modelo,
                "cor": this.state.cor,
            })
        }
        else {
            this.props.put({
                "marca": this.state.marca,
                "modelo": this.state.modelo,
                "cor": this.state.cor,
            })
        }

        this.setState({
            "alterado": false,
            "marca": "",
            "modelo": "",
            "cor": "",
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
                        <label for="marca">Marca:</label>
                        <br></br>
                        <input  className="form-control" type="text" name="marca" id="marca" onChange={this.handleInput} value={this.state.marca}></input>
                    </div>

                    <div className="form-group">
                        <label for="modelo">Modelo:</label>
                        <br></br>
                        <input  className="form-control" type="text" name="modelo" id="modelo" onChange={this.handleInput} value={this.state.modelo}></input>
                    </div>
                    <div className="form-group">
                        <label for="streamming">Cor:</label>
                        <br></br>
                        <input  className="form-control" type="text" name="cor" id="cor" onChange={this.handleInput} value={this.state.cor}></input>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.setCarro}>{name}</button>
                </form>
            </div>
        )
    }
}