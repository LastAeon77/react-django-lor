import axios from "axios";
import React, { Component } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    Link,
    useParams,
} from "react-router-dom";
const BUCKETNAME = "http://aeonmoon.herokuapp.com/static/"
class CardSingle extends Component {
    constructor() {
        super();
        this.state = {
            cardData: [],
            currentOffice: ""
        }
    }
    componentDidMount() {
        let topicId = window.location.href.split('/').pop()
        axios.get(`/lor/api/card/${topicId}`).then(res => this.setState({ cardData: res })).catch(err => console.log(err));
    }
    render() {
        const { data } = this.state.cardData
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1><b>{data?.Name}</b></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <img src={`${BUCKETNAME}${data?.ImgPath}`} />
                        </Col>
                        <Col></Col>
                        <Col>
                            <p>Rarity: {data?.Rarity}</p>
                            <p>Rank: {data?.office.Rank}</p>
                            <p>Guest: {data?.office.Name}<img src={`${BUCKETNAME}${data?.office.ImgPath}`} height='200px'/></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Dice #</th>
                                        <th>Damage Rolls</th>
                                        <th>Dice Type</th>
                                        <th>Dice Effect</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>{data?.Roll1}</td>
                                        <td>{data?.Type1}</td>
                                        <td>{data?.Eff1}</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>{data?.Roll2}</td>
                                        <td>{data?.Type2}</td>
                                        <td>{data?.Eff2}</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>{data?.Roll3}</td>
                                        <td>{data?.Type3}</td>
                                        <td>{data?.Eff3}</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>{data?.Roll4}</td>
                                        <td>{data?.Type4}</td>
                                        <td>{data?.Eff4}</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

export default class CardHome extends Component {
    constructor() {
        super();
        this.state = {
            cardList: [],
            officeList: [],
            currentItem: 0
        }
    }
    componentDidMount() {
        axios.get("/lor/api/card/")
            .then(res => { this.setState({ cardList: res.data }) })
            .catch(err => console.log(err))
        axios.get("/lor/api/office/")
            .then(res => { this.setState({ officeList: res.data }) })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <CardHomeRoute cardList={this.state.cardList} officeList={this.state.officeList} />
            </div>
        )
    }
}

function CardHomeRoute({ cardList, officeList }) {
    let { path, url } = useRouteMatch();
    const createCardList = (officeName) => {
        var cardInOffice = cardList.filter(card => card.office.Name === officeName);
        return cardInOffice.map((c) =>
            <li><Link to={`${url}/${c.id}`} >
                {c.Name}
            </Link ></li >
        )
    }

    const createList = officeList.map((item) => (
        <>
            <h3>{item.Name}</h3>
            <ul>
                {createCardList(item.Name)}
            </ul>
        </>
    )
    )
    return (
        <>
            <Switch>
                <Route exact path={path}>
                    {createList}
                </Route>
                <Route path={`${path}/:topicId`} component={CardSingle} />
            </Switch>
        </>
    )
}