import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({ product }) => {
    const { img, name, price, quantity } = product;
    return (
        <div className='review-item'>
            <div className='review-info'>
                <img src={img} alt="" />
                <h5>{name}</h5>
                <p>price:{price}</p>
                <p>Quantity:{quantity}</p>
            </div>
            <div>

            </div>

        </div>
    );
};

export default ReviewItem;