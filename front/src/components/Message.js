import React from 'react';

const Message = ({ header, content, type }) => (
  <div>
    {(() => {
      switch (type) {
        case 'error':
          return (
            <div>
              <i className="huge exclamation triangle icon red"></i>
              <div className="content">
                <div className="header">Oops! Something went wrong.</div>
                <p>There is no content in this page.</p>
              </div>
            </div>
          );
        case 'success':
          return (
            <div>
              <i className="huge thumbs up outline icon"></i>
              <div className="content">
                <div className="header">Success!!</div>
                <p>The product is added to your store.</p>
              </div>
            </div>
          );
        default:
          return (
            <div>
              <i className="huge icon info"></i>
              <div className="content">
                <div className="header">There is no product in your store!</div>
                <p>Please add the product to your store.</p>
              </div>
            </div>
          );
      }
    })()}
  </div>
);

export default Message;
