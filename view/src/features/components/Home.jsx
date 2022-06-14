import React, {useEffect, useState} from 'react'
import { getProducts } from '../../utils/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Row, Container} from 'react-bootstrap';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  const fetchProducts = async () =>{
  
    
      const res = await getProducts();
      if (res.error) {
          setError(res.error.name);
      }
      console.log("This is the data"+res);
      setProducts(res);
      console.log(error);
      
  }

  useEffect( () =>{
      fetchProducts();
  },[]);


  return (
    <Container>
      <Row>
      {products.map((items, index)=>{
      return (
          <Card style={{maxWidth: '22rem'}} >
          <Card.Img src={items.image_url} />
            <Card.Body>
              <Card.Title>{items.item_name}</Card.Title>
              <Card.Text>{items.description}</Card.Text>
            </Card.Body>
          <Card.Footer>{items.price+"Ft"}</Card.Footer>
        </Card>
        )
    })}
      </Row>
    </Container>
  )
}

