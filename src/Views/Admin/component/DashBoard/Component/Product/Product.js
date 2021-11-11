import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { getDatabase, ref, onValue} from "firebase/database";
import { Card, Table, Button, Container, Row } from 'react-bootstrap';
import './product.css'
import { useHistory } from 'react-router-dom';
Product.propTypes = {
    success: PropTypes.bool,
};

function Product(props) {
    const history = useHistory();
    // const [typeProducts, setTypeProducts] = useState();
    // const [data, setData] = useState();
    const db = getDatabase();
    // useEffect(()=>{
    //     const list_product = ref(db, 'Product');
    //     onValue(list_product, (snapshot) => {
    //         const data = snapshot.val();
    //         if(data){
    //             let html_string = []
    //             for(const type in data){
    //                 html_string.push(<p className="type">{type}</p>)
    //                 for(const model in data[type]){
    //                     for(const id_product in data[type][model]){
    //                         html_string.push(
    //                             <Card className="product-cart justify-content-md-center" style={{ width: '14rem', height: '14rem' }}>
    //                             <Card.Img variant="top" src="holder.js/100px180" />
    //                             <Card.Body>
    //                                 <Card.Title>{data[type][model][id_product].name}</Card.Title>
    //                                 <Card.Text>Price: {data[type][model][id_product].price}</Card.Text>
    //                                 <Button variant="primary">Chi tiết</Button>
    //                             </Card.Body>
    //                             </Card>
    //                         )

    //                     }
    //                 }
    //                 html_string.push(<Card style={{ width: '14rem', height: '14rem' }}>
    //                 <Button onClick={addProduct} style={{width: '100%', height: '100%'}} variant="light">
    //                 {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    //                 Add Product
    //                 </Button>
    //             </Card>)
    //             }
    //             setHtmls(html_string)
    //             // console.log(html_string)
    //         }
    //     });
    
       
    // },[db])

    
    function addProduct(){
        history.push("/DashBoard/Product/AddProduct")
    }
    // console.log(products);
    return (
        <>
            {/* <div className="container">
                <div className="row">
                {
                    htmls && htmls.map((x)=>{
                        return x
                    })
                }
                </div>
            
            </div> */}
            

            <Card style={{ width: '14rem', height: '14rem' }}>
                <Button onClick={addProduct} style={{width: '100%', height: '100%'}} variant="light">
                <Card.Img variant="top" src="holder.js/100px180" />
                Add Product
                </Button>
            </Card>
        </>
        
        
    );
}

export default Product;