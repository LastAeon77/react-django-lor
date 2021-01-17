import axios from "axios";
import React, { Component } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    Link,
} from "react-router-dom";
const BUCKETNAME = "http://aeonmoon.herokuapp.com/static/"

class DeckSingle extends Component {
    constructor() {
        super();
        this.state = {
            deckData: [],
            currentOffice: ""
        }
    }
    componentDidMount() {
        let topicId = window.location.href.split('/').pop()
        axios.get(`/lor/api/deck/${topicId}`).then(res => this.setState({ deckData : res })).catch(err => console.log(err));
    }
    render() {
        const { data } = this.state.deckData
        const outputcards = (arrayOfCards) => arrayOfCards?.map((singleCard) => (
            <li>{singleCard.card_id} x {singleCard.card_count}</li>
        )
        )
        const outputCardImages = (cardImages,arrayOfCards) => {
            // cardImages = cards
            //arrayOfCards = card_count
            let list_of_card_images = []
            for (const cardImg of cardImages){
                for(const cardName of arrayOfCards){
                    if(cardName?.card_id === cardImg?.Name){
                        for(let i=0;i<cardName?.card_count;i++)
                        {
                            console?.log(cardName?.card_count)
                            list_of_card_images?.push(<img src={`${BUCKETNAME}${cardImg?.ImgPath}`} width="200" height="auto"/>)
                        }
                    }
                }

            }
            return list_of_card_images
        }
        
        const dataExists = (thedata) => {
            if (thedata == null) {
                return <p>-</p>
            }
            else {
                return <p>{thedata}</p>
            }
        }
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1><b>{data?.name}</b></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Recommended Floor:</p>
                            <p> {dataExists(data?.Recc_Floor)}</p>
                        </Col>
                        <Col >
                            <p>Recommended Page:</p>
                            <p> {dataExists(data?.Recc_Page)}</p>
                        </Col>
                        <Col>
                            <p>Recommended Rank:</p>
                            <p> {dataExists(data?.Recc_Rank)}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>Creator: {data?.creator}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3> Cards: </h3>
                            <ol>
                                {outputcards(data?.card_count)}
                            </ol>
                        </Col>
                        <Col>{data && outputCardImages(data?.cards,data?.card_count)}</Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

export default class DeckHome extends Component {
    constructor() {
        super();
        this.state = {
            deckList: [],
            currentItem: 0
        }
    }
    componentDidMount() {
        axios.get("/lor/api/deck/")
            .then(res => { this.setState({ deckList: res.data }) })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <DeckHomeRoute deckList={this.state.deckList} />
            </div>
        )
    }
}

function DeckHomeRoute({ deckList }) {
    let { path, url } = useRouteMatch();
    const createDeckList = deckList.map((c) =>
        <tr>
            <td>{c.id}</td>
            <td><Link to={`${url}/${c.id}`} >
                {c.name}
            </Link ></td>
            <td>{c.creator}</td>
            <td>{c.Recc_Rank}</td>
        </tr>
    )

    return (
        <>
            <Switch>
                <Route exact path={path}>
                    <h1>List of Community Created Decks</h1>
                    <Table striped bordered hover size="la" variant="dark">
                        <thead>
                            <tr>
                                <th>id #</th>
                                <th>Name</th>
                                <th>Creator</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {createDeckList}
                        </tbody>
                    </Table>
                </Route>
                <Route path={`${path}/:topicId`} component={DeckSingle} />
            </Switch>
        </>
    )
}