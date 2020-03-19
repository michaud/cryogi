import React from 'react';

const PortfolioList = ({ items = [], label }) => {
    return (
        <div style={{ margin: '.5rem 2rem 1rem 2rem' }}>
            <h2>{ label }</h2>
            {
                items.map((portfolio, idx) => <div key={ idx }>{ portfolio.item.portfolioName.value }</div>)
            }
        </div>
    );
};

export default PortfolioList;
