import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ProductStore from "../../store/ProductStore.js";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton.jsx";

const Products = () => {
    const { ListByRemark, ListByRemarkRequest } = ProductStore();

    // Fetch default "new" products when page loads
    useEffect(() => {
        ListByRemarkRequest("new");
    }, []);

    // Reusable render function
    const renderProducts = (list) => {
        if (list === null) return <ProductsSkeleton />;
        return (
            <div className="container">
                <div className="row">
                    {list.map((item, idx) => {
                        let price = <p>Price: ${item["price"]}</p>;
                        if (item["discount"] === true) {
                            price = (
                                <p>
                                    Price: <strike>${item["price"]}</strike> ${item["discountPrice"]}
                                </p>
                            );
                        }
                        return (
                            <div key={idx} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                <Link to="" className="card shadow-sm h-100 rounded-3 bg-white">
                                    <img className="w-100 rounded-top-2" src="" alt={item["title"]} />
                                    <div className="card-body">
                                        <p className="bodySmal text-secondary my-1">{item["title"]}</p>
                                        <p className="bodyMedium text-dark my-1">{price}</p>
                                        <StarRatings
                                            rating={parseFloat(item["star"])}
                                            starRatedColor="red"
                                            starDimension="15px"
                                            starSpacing="2px"
                                        />
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="section">
            <div className="container-fluid py-5 bg-light">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
                    <span className="bodySmal mb-3 text-center">
            Explore a World of Choices Across Our Most Popular
          </span>
                    <div className="col-12">
                        <div>
                            {/* Tabs */}
                            <ul
                                className="nav nav-pills p-3 justify-content-center mb-3"
                                id="pills-tab"
                                role="tablist"
                            >
                                {["new", "trending", "popular", "top", "special"].map((remark, i) => (
                                    <li className="nav-item" role="presentation" key={remark}>
                                        <button
                                            onClick={() => ListByRemarkRequest(remark)}
                                            className={`nav-link ${i === 0 ? "active" : ""}`}
                                            data-bs-toggle="pill"
                                            data-bs-target={`#pills-${remark}`}
                                            type="button"
                                            role="tab"
                                        >
                                            {remark.charAt(0).toUpperCase() + remark.slice(1)}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Tab contents */}
                            <div className="tab-content" id="pills-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="pills-new"
                                    role="tabpanel"
                                >
                                    {renderProducts(ListByRemark.new)}
                                </div>
                                <div className="tab-pane fade" id="pills-trending" role="tabpanel">
                                    {renderProducts(ListByRemark.trending)}
                                </div>
                                <div className="tab-pane fade" id="pills-popular" role="tabpanel">
                                    {renderProducts(ListByRemark.popular)}
                                </div>
                                <div className="tab-pane fade" id="pills-top" role="tabpanel">
                                    {renderProducts(ListByRemark.top)}
                                </div>
                                <div className="tab-pane fade" id="pills-special" role="tabpanel">
                                    {renderProducts(ListByRemark.special)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
