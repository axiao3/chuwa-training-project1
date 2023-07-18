/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./style.module.css";

export default function NewItem(props) {
  const [name, setName] = useState(props.name); // ""
  const [description, setDescription] = useState(props.description); // ""
  const [category, setCategory] = useState(props.category); // "" 
  const [price, setPrice] = useState(props.price); // ""
  const [quantity, setQuantity] = useState(props.quantity); // ""
  const [link, setLink] = useState(props.link); // "http://"
  const [imagePreview, setImagePreview] = useState(props.imagePreview); // "default-image-link"
  const [isPreview, setIsPreview] = useState(props.isPreview); // false

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setImagePreview(link);
    setIsPreview(true);
  };

  return (
    <div className={styles.app_container}>
      {/* <div className={styles.title}>Create Product</div> */}
      <div className={styles.title}>{props.title}</div>
      <form className={styles.form} onSubmit={(e) => props.onSubmit(e, name, description, category, price, quantity, link)}>
        <div>
          <label htmlFor="product_name">Product Name</label>
          <input
            type="text"
            id="product_name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="product_description">Product Description</label>
          <input
            type="text"
            id="product_description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">--choose an option--</option>
              <option value="Home & DIY">Home & DIY</option>
              <option value="Devices & Electronics">Devices & Electronics</option>
              <option value="Kids & Baby">Kids & Baby</option>
              <option value="Sports & Fanshop">Sports & Fanshop</option>
              <option value="Groceries & Stores">Groceries & Stores</option>
            </select>
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={handlePriceChange}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="quantity">In Stock Quantity</label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Add Image Link</label>
            <input
              type="text"
              id="image"
              value={link}
              onChange={handleLinkChange}
            />
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>

        <div className={styles.imagePreview}>
          <img src={imagePreview} />
          {!isPreview ? <p>Image Preview!</p> : null}
        </div>

        <button type="submit" className={styles.submitButton}>
          {/* Add Product */}
          {props.button}
        </button>
      </form>
    </div>
  );
}
