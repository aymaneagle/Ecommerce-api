import React, {useEffect} from 'react';
import Layout from "../components/layout/Layout.jsx";
import Slider from "../components/products/Slider.jsx";
import Features from "../components/products/Features.jsx";
import Categories from "../components/products/Categories.jsx";
import Products from "../components/products/Products.jsx";
import Brands from "../components/products/Brands.jsx";

import ProductStore from "../store/ProductStore.js";

const HomePage = () => {
    const {
        BrandListRequest,
        CategoryListRequest,
        SliderListRequest,
        ListByRemarkRequest
    } = ProductStore();

    useEffect(() => {
        (async () => {
            await BrandListRequest();
            await CategoryListRequest();
            await SliderListRequest();
            await ListByRemarkRequest("new")
        })();
    }, [BrandListRequest,CategoryListRequest,SliderListRequest,ListByRemarkRequest]);
    return <Layout>
               <Slider/>
               <Products/>
               <Categories/>
               <Brands/>
               <Features/>
    </Layout>
};

export default HomePage;