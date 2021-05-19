import React, { useEffect, useState } from 'react';
import {Container,Row,Col ,Card,Button} from 'react-bootstrap';
import { API_URL } from '../configuration';
import getSymbolFromCurrency from 'currency-symbol-map';
import {Link} from 'react-router-dom';
const Home = () => {
    const [data,setData] = useState([]);
    useEffect( ()=>{
        const getData =async ()=>{
            const response = await fetch(API_URL+'/getList', {     //url
                method: 'GET',                 //method
                headers : {                     //passing header 
                    'Accept'        : 'application/json',
                    'Content-Type'  : 'application/json',
                }
            })
            const result = await response.json();
            if(result.status){
                setData(result.data)
            }
            
        }
        getData()
    },[]);
    return (
        <Container fluid className="mt-4">
            <Row>
                {
                    data.map((item,index)=>(
                        <Col md={3} key={index}>
                            <Card  className="shadow p-3 mb-5 bg-white rounded">
                                <Card.Img variant="top" width="100%" height={200} src={item.Image} />
                                <Card.Header>{item.Company}</Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        <div>
                                            <span>
                                                MarketCaps
                                            </span>
                                            <span className="text-right" style={{
                                                position : "absolute",
                                                right:15
                                            }}>
                                                price
                                            </span>
                                        </div>
                                        <div>
                                            <span>
                                                {getSymbolFromCurrency('INR')}{item.MarketCap}cr</span>
                                            <span className="text-right" style={{
                                                position : "absolute",
                                                right:15,
                                                color : "green",
                                                fontWeight : "bold"
                                            }}>
                                                {getSymbolFromCurrency('INR')}{item.price}</span>

                                        </div>
                                    </Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                    <span>Stock P/E : {item.Stock}</span>
                                    <Button variant="outline-primary" style={{
                                        float : "right"
                                    }}>
                                       <Link to={"/view/"+item.id}>
                                        view
                                       </Link> 
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
      );
}
 
export default Home;