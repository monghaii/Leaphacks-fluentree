import React, { Component } from 'react'
import axios from 'axios'

const CardContext = React.createContext();

export default class CardContext extends Component {
    state = {
        cards: [],
        workCards: [],
        travelCards: [],
        cultureCards: [],
        currentLanguage: "",
        username : "",
        pwd: "12345"
    }

    updateUsername = (newUsername) => {
        this.setState(() => {
            return {
                userName: newUsername
            };
        });
    }

    updateCards = () => {
        for(let i = 0; i < this.state.topics.length; i++) {
            let tempPath = "http://localhost:9000/masterList/" + this.state.username + "/" + this.state.language 
                            + this.state.topics[i];
            
            let toSend = [];
            if(this.state.topics[i] === "Work") {
                toSend = workCards;
            }
            if(this.state.topics[i] === "Culture") {
                toSend = cultureCards;
            }
            if(this.state.topics[i] === "Travel") {
                toSend = cultureCards;
            }
            axios.post(tempPath, toSend)
                .then(response => {
                    console.log(response);                    
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }

    switchLanguage = (newLanguage) => {
        // Clear cards array
        // set currentLanguage to newLanguage
        // iterate through topics and call addCards for each one
        let newCards = [];
        let newWork = [];
        let newTravel = [];
        let newCulture = [];

        for(let i = 0; i < this.state.topics.length; i++) {
            let tempPath = "http://localhost:9000/masterList/" + this.state.username + "/" + newLanguage 
                            + this.state.topics[i];
            axios.get(tempPath)
                .then(response => {
                    console.log(response);
                    newCards.concat(response.data);
                    if(this.state.topics[i] === "Work") {
                        newWork = response.data;
                    }
                    if(this.state.topics[i] === "Culture") {
                        newCulture = response.data;
                    }
                    if(this.state.topics[i] === "Travel") {
                        newTravel = response.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

        this.setState(() => {
            return {
                currentLanguage: newLanguage,
                cards: newCards,
                workCards: newWork,
                travelCards: newTravel,
                cultureCards: newCulture
            };
        });


    }

    switchTopics = (newTopics) => {
        let newCards = [];

        for(let i = 0; i < this.state.topics.length; i++) {
            let tempPath = "http://localhost:9000/masterList/" + this.state.username + "/" + this.state.language 
                            + this.state.topics[i];
            axious.get(tempPath)
                .then(response => {
                    console.log(response);
                    newCards.concat(response.data);
                    if(this.state.topics[i] === "Work") {
                        newWork = response.data;
                    }
                    if(this.state.topics[i] === "Culture") {
                        newCulture = response.data;
                    }
                    if(this.state.topics[i] === "Travel") {
                        newTravel = response.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

        this.setState(() => {
            return {
                topics: newTopics,
                cards: newCards,
                workCards: newWork,
                travelCards: newTravel,
                cultureCards: newCulture
            }
        })
    }

    getCard = (index) => {
        return cards[index];
    }

    updateCard = (newCard, index) => {
        cards[index] = newCard;
    }

    getCardsLength = () => {
        return cards.length;
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};