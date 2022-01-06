import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from 'semantic-ui-react';

const ProductsBySeller = () => {
  const [sellerProducts, setSellerProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const normalizeProducts = (data) => {
    let sellerIds = data.map((s) => s.seller_id);
    let uniqueSellerIds = [...new Set(sellerIds)];
    let noramlizedProducts = uniqueSellerIds.map((id) => {
      let products = data.filter((p) => p.seller_id === id);
      let productDataSet = products.map((pr) => {
        return {
          product: pr.name,
          price: pr.price,
          description: pr.description,
        };
      });
      return {
        sellerName: products[0].sellername,
        email: products[0].email,
        products: productDataSet,
      };
    });
    return noramlizedProducts;
  };

  const getData = async () => {
    try {
      let res = await axios.get("/api/products");
      console.log(res.data);
      let noramlizedProducts = normalizeProducts(res.data);
      setSellerProducts(noramlizedProducts);
    } catch (error) {
      alert("error occurred in getData ");
    }
  };

  const renderProductsBySeller = () => {
   const renderProducts = (p) => {
     console.log(p)
      let products = p.products
      return (products.map((pr)=> {
        return (
          <Table.Row>
            <Table.Cell>{pr.product}</Table.Cell>
            <Table.Cell>{pr.price}</Table.Cell>
            <Table.Cell>{pr.description}</Table.Cell> 
          </Table.Row>)}
      ))}
    return sellerProducts.map((p)=>{
      return (
        <>
        <h2>{p.sellerName}</h2>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>Product</Table.HeaderCell>
              <Table.HeaderCell width={2}>Price</Table.HeaderCell>
              <Table.HeaderCell width={8}>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

            {renderProducts(p)}
            </Table>
            </>
          )
        })
      }

  return (
    <div>
      <h1>products by seller</h1>
          {renderProductsBySeller()}
      <p>{JSON.stringify(sellerProducts)}</p>
    </div>
  );
};

export default ProductsBySeller;
