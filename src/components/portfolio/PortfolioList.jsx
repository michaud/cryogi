import React from 'react';

const PortfolioList = ({ items = [], label }) => {
    return (
        <div>
            <h2>{ label }</h2>
            {
                items.map((portfolio, idx) => <div key={ idx }>{ portfolio.item.portfolioName.value }</div>)
            }
        </div>
    );
};

export default PortfolioList;
