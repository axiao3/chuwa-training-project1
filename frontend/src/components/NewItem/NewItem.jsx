/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import style from "./style.module.css";

export default function NewItem(props) {
  // console.log("props: ", props);

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
    <div className={style.app_container}>
      <p className={style.app_title}>{props.title}</p>
      <form 
        className={style.app_form}
        onSubmit={(e) =>
          props.onSubmit(e, name, description, category, price, quantity, link)
        }
      >
        <div>
          <label htmlFor="product_name" className={style.app_label}>Product Name</label>
          <input
            className={style.app_input}
            type="text"
            id="product_name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="product_description" className={style.app_label}>Product Description</label>
          <textarea
            className={style.app_textarea}
            rows="5"
            id="product_description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className={style.app_flex_row_1}>
          <div>
            <label htmlFor="category" className={style.app_label}>Category</label>
            <select className={style.app_select}
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">--choose an option--</option>
              <option value="Home & DIY">Home & DIY</option>
              <option value="Devices & Electronics">
                Devices & Electronics
              </option>
              <option value="Kids & Baby">Kids & Baby</option>
              <option value="Sports & Fanshop">Sports & Fanshop</option>
              <option value="Groceries & Stores">Groceries & Stores</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className={style.app_label}>Price</label>
            <input
              className={style.app_input}
              type="text"
              id="price"
              value={price}
              onChange={handlePriceChange}
              required
            />
          </div>
        </div>
        <div className={style.app_flex_row_2}>
          <div>
            <label htmlFor="quantity" className={style.app_label}>In Stock Quantity</label>
            <input
              className={style.app_input}
              type="text"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className={style.app_label}>Add Image Link</label>
            <div className={style.button_holder}>
              <input
                className={style.app_input}
                type="text"
                id="image"
                value={link}
                onChange={handleLinkChange}
              />
              <button className={style.app_upload_button} onClick={handleUpload}>Upload</button>
            </div>
          </div>
        </div>

        <div className={style.app_img_container}>
          <img className={style.app_img_preview} src={imagePreview} />
          {!isPreview ? <p className={style.app_img_text}>Image Preview!</p> : null}
        </div>

        <div className={style.submit_button_container}>
          <button className={style.app_submit_button} type="submit">
            {props.button}
          </button>
          {props.title === "Edit Product" ? <button className={style.app_delete_button} type="button" onClick={props.onClick}>
            Delete
          </button> : null}
        </div>
      </form>
    </div>
  );
}
