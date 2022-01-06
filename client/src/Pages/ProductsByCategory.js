import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Select, Table } from 'semantic-ui-react';

const ProductsByCategory = () => {
  const [catProducts, setCatProducts] = useState([]);
  const [tableCategory, setTableCategory] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    renderProductsByCategory(tableCategory)
}, [tableCategory]);

const normalizeCategories = (data) => {
  const categories = data.map((p) => p.category);
  const categoriesObjectArray = categories.map((c) => {
    return {
      value: c,
      text: c,
      key: c 
    }
  })
  return categoriesObjectArray;
};


  // const mapProductCategory = () => {
  //   return catProducts.filter((p)=>{
  //     if (category == p.category){
  //       setUser(user);
  //       setFirst_name(user.first_name)
  //       setLast_name(user.last_name)
  //       setGender(user.gender)
  //       setAge(user.age)
  //     } else {
  //       setUser("");
  //       setFirst_name("")
  //       setLast_name("")
  //       setGender("");
  //       setAge("");
  //     }
  //   })
  // }

  const normalizeProducts = (data) => {
    let categories = data.map((t) => t.category);
    let uniqueCategories = [...new Set(categories)];
    let noramlizedProducts = uniqueCategories.map((c) => {
      let products = data.filter((p) => p.category === c);
      let productDataSet = products.map((pr) => {
        return {
          product: pr.name,
          price: pr.price,
          description: pr.description,
        };
      });
      return {
        category: products[0].category,
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
      setCatProducts(noramlizedProducts);
    } catch (error) {
      alert("error occurred in getData ");
    }
  };

  const renderProductsByCategory = (category) => {
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
    return catProducts.map((p) => {
      if (p.category == category) {
        return (
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
        )
      }
    })
  //  const renderProducts = (p) => {
  //    console.log(p)
  //     let products = p.products
  //     return (products.map((pr)=> {
  //       return (
  //         <Table.Row>
  //           <Table.Cell>{pr.product}</Table.Cell>
  //           <Table.Cell>{pr.price}</Table.Cell>
  //           <Table.Cell>{pr.description}</Table.Cell> 
  //         </Table.Row>)}
  //     ))}
  //   return catProducts.map((p)=>{
  //     return (
  //       <>
  //       <h2>{p.category}</h2>

  //       <Table celled>
  //         <Table.Header>
  //           <Table.Row>
  //             <Table.HeaderCell width={6}>Product</Table.HeaderCell>
  //             <Table.HeaderCell width={2}>Price</Table.HeaderCell>
  //             <Table.HeaderCell width={8}>Description</Table.HeaderCell>
  //           </Table.Row>
  //         </Table.Header>

  //           {renderProducts(p)}
  //           </Table>
  //           </>
  //         )
  //       })
      }
        


  return (
    <div>
      <h1>products by category</h1>
      {catProducts && <Form>
        <Form.Select
        label="Choose A Category"
        name="categoryOptions"
        value={tableCategory}
        options={normalizeCategories(catProducts)}
        onChange={
          (e, {value}) => setTableCategory(value)}
        />
        </Form>}
        <hr/>
       {tableCategory && renderProductsByCategory(tableCategory)}
    </div>
  );
};
export default ProductsByCategory;