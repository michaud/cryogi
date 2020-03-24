import React, {
    useState,
    useEffect
} from 'react';

import portfolio from '@constants/portfolio-namespace';
import paths from '@constants/paths';
import saveListResourse from '@services/saveListResourse';

import PortfolioForm from '@components/portfolio/PortfolioForm';
import PortfolioList from '@components/portfolio/PortfolioList';

import { GridContainer } from '@styled/layout.style';
import Switch from '@components/util/Switch';

const ManagePortfolios = ({ portfolios, label, selected, onSelect, onSave }) => {

    const handleSelectPortfolio = (portfolio) => onSelect(portfolio);
    const handleSavePortfolio = (portfolio) => onSave(portfolio);

    return (
        <div className="c-box">
            <h2>{ label }</h2>
            <Switch has={ portfolios.length > 0 }>
                <>
                    <GridContainer cols="1fr 1fr">
                        <PortfolioList
                            label="Porfolios"
                            items={ portfolios }
                            onSelect={ handleSelectPortfolio }/>
                        <PortfolioForm
                            label="Add portfolio"
                            item={ selected && selected.item }
                            onSave={ handleSavePortfolio }/>
                    </GridContainer>
                </>
                <>
                    <PortfolioForm
                        label="Add portfolio"
                        onSave={ handleSavePortfolio }/>
                </>
            </Switch>
        </div>
    );
};

export default ManagePortfolios;
