import React, { useEffect, useState } from 'react';
import {Card, Col, Container, Row}from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import { API_URL } from '../configuration';
import style from './style.module.scss'
import getSymbolFromCurrency from 'currency-symbol-map';
const ViewList = () => {
    const {id} = useParams();
    const [data,setData] = useState()
    useEffect(()=>{
        const getData =async ()=>{
            const response = await fetch(API_URL+'/view?id='+id, {     //url
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
    },[id])
    return (  
        <Container fluid className="mt-3">
            <Row>
                <Col md={9}>
                        {
                            data&&
                            <Card className="shadow p-3 mb-5 bg-white rounded">
                                <h2>{data.Company}</h2>
                                <div style={{
                                    display : "inline-block"
                                }}>
                                    <a href={data.url} target="_blank" rel="noreferrer" style={{marginRight: 10}}>{data.url}</a>
                                    <a href={"https://www.bseindia.com/stock-share-price/"+data.bseUrl} target="_blank" rel="noreferrer">BSE:{data.bse}</a>
                                </div>
                                <div className={style.box}>
                                    <div className={style.items}>
                                        <span>market Cap</span>
                                        <span>{getSymbolFromCurrency('INR')}{data.MarketCap}Cr</span>
                                    </div>
                                    <div className={style.items}>
                                        <span>Current Price</span>
                                        <span>{getSymbolFromCurrency('INR')}{data.price}</span>
                                    </div>
                                    <div className={style.items}>
                                        <span>Stock P/E</span>
                                        <span>{data.Stock}</span>
                                    </div>
                                    <div className={style.items}>
                                        <span>Dividend Yield</span>
                                        <span>{data.divident} %</span>
                                    </div>
                                    <div className={style.items}>
                                        <span>ROCE</span>
                                        <span>{data.roce}%</span>
                                    </div>
                                    <div className={style.items}>
                                        <span>ROE</span>
                                        <span>{data.roe}</span>
                                    </div>
                                    <div className={style.items}>
                                        <span>Equity</span>
                                        <span>{data.MarketCap}%</span>
                                    </div>
                                    <div className={style.items}>
                                        <span>EPS</span>
                                        <span>{getSymbolFromCurrency('INR')}{data.eps}%</span>
                                    </div>

                                    <div className={style.items}>
                                        <span>Debt</span>
                                        <span>{getSymbolFromCurrency('INR')}{data.Debt}%</span>
                                    </div>
                                </div>
                            </Card>
                        }
                
                </Col>
            </Row>
        </Container>
    );
}
 
export default ViewList;