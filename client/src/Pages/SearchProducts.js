import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Select, Table } from 'semantic-ui-react';

const SearchProducts = () => {
  const [products, setProducts] = useState([]);
  const [buyers, setBuyers] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [buyerCategories, setBuyerCategories] = useState(null);
  const [buyerPriceLimit, setBuyerPriceLimit] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getProducts();
  }, [selectedBuyer]);

const getProducts = async () => {
  try {
    let res = await axios.get("/api/products");
    // let noramlizedProducts = normalizeProducts(res.data);
    setProducts(res.data);
    console.log(selectedBuyer)
    console.log(products)
    console.log(res.data)
    
  } catch (error) {
    alert("error occurred in getProducts ");
  }
};

  const normalizeBuyers = (data) => {
    const buyerNames = data.map((b) => {
      return {
        value: b.name,
        text: b.name,
        key: b.id 
      }
    })
    return buyerNames;
  };

  const getData = async () => {
    try {
      let resBuyers = await axios.get("/api/buyers");
      // let noramlizedProducts = normalizeProducts(res.data);
      setBuyers(resBuyers.data);
      // let res = await axios.get("/api/products");
      // setProducts(res.data);
      console.log('price:',buyerPriceLimit)
      
    } catch (error) {
      alert("error occurred in getData ");
    }
  };

  const normalizeBuyerData = (buyerdata) => {
    try {
      // let noramlizedProducts = normalizeProducts(res.data);
      setBuyerCategories(buyerdata.desired_categories);
      // console.log('categories',buyerCategories)
      setBuyerPriceLimit(buyerdata.max_price)
      // console.log('price:',buyerPriceLimit)
      
    } catch (error) {
      alert("error occurred in normalizeBuyerData ");
    }
  };

  const createBuyerInfo = (data) => {
    console.log(data)
    if (data) {
    setSelectedBuyer(data)

    let buyerData = buyers.find((b)=>(data == b.name))
    normalizeBuyerData(buyerData)}
  }

  const renderProductsWithinPrice = () => {
    let buyerProducts = products.filter((p) => (p.price <= buyerPriceLimit))
    return buyerProducts
      }
        
    const renderProductsByCategory = () => {

      let priceSortedProducts = renderProductsWithinPrice()
      console.log(priceSortedProducts)
      
      const renderProducts = (c)=> {
        console.log(c)
        let sortedProducts = priceSortedProducts.filter( p => p.category == c) 
        console.log(sortedProducts)
        return sortedProducts.map((p)=>{
        return (
          <Table.Row>
           <Table.Cell>{p.name}</Table.Cell>
           <Table.Cell>{p.price}</Table.Cell>
           <Table.Cell>{p.description}</Table.Cell> 
           <Table.Cell>{p.sellerName}</Table.Cell> 
           <Table.Cell>{p.email}</Table.Cell> 
         </Table.Row>
    )})}
      let productsByCategory = buyerCategories.map((c) => { return (
        
        <>
        <h2>{c}</h2>
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Product</Table.HeaderCell>
            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
            <Table.HeaderCell width={4}>Description</Table.HeaderCell>
            <Table.HeaderCell width={2}>Seller</Table.HeaderCell>
            <Table.HeaderCell width={4}>Contact Seller</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {renderProducts(c)}
          </Table>
          </>
        )
    })
      if (buyerCategories.length === 0){
        return "This buyer has no desired categories"
      }
      return productsByCategory
    }

  return (
    <div>
      <h1>Search Products Using My Saved Preferences</h1>
      {buyers && <Form>
        <Form.Select
        label="Who Are You?"
        name="buyerOptions"
        value={selectedBuyer}
        options={normalizeBuyers(buyers)}
        onChange={
          (e, {value}) => createBuyerInfo(value)}
        />
        </Form>}
        <hr/>
       {buyerCategories && renderProductsByCategory()}
    </div>
  );
};
export default SearchProducts;