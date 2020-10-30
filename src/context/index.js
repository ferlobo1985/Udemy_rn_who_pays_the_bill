import React, { Component } from 'react';
import Toast from 'react-native-toast-message';

const MyContext = React.createContext();

class MyProvider extends Component {
    state = {
        stage:1,
        players:['Lisa','Mike','Miles'],
        result:''
    }

    addPlayerHandler = (name) => {
        this.setState((prevState, props)=>({
            players:[
                ...prevState.players,
                name
            ]
        }))
    }

    removePlayerHandler = (idx) => {
        let newArray = this.state.players;
        newArray.splice(idx,1);
        this.setState({players:newArray})
    }

    nextHandler = () => {
        const {players} = this.state;

        if(players.length < 2){
            Toast.show({
                type:'error',
                text1: 'Sorry',
                text2: 'you need at least 2 players',
                position:'bottom'
              });
        } else {
            this.setState({
                stage:2
            },()=>{
                this.generateLooser()
            })
        }
    }

    generateLooser = () => {
        const {players} = this.state;
        this.setState({
            result: players[Math.floor(Math.random()*players.length)]
        })
    }


    resetGame = () => {
        this.setState({
            stage:1,
            players:[],
            result:''
        })
    }

    render(){
        return(
            <>
                <MyContext.Provider
                    value={{
                        state: this.state,
                        addPlayer: this.addPlayerHandler,
                        removePLayer: this.removePlayerHandler,
                        next: this.nextHandler,
                        getNewLooser: this.generateLooser,
                        resetGame: this.resetGame
                    }}
                >
                    {this.props.children}
                </MyContext.Provider>
            </>
        )
    }
}

export {
    MyContext,
    MyProvider
}