import { useState } from 'react';

import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import { useAppData } from '@contexts/AppDataProvider';

import PortfolioForm from '@components/portfolio/PortfolioForm';
import PortfolioList from '@components/portfolio/PortfolioList';
import Switch from '@components/util/Switch';

const ManagePortfolios = ({ portfolios, label, selected, onSelect, onDelete, onSave }) => {

    const [showAdd, setShowAdd] = useState(false);
    const { portfolioDataIsLoading } = useAppData();

    const handleSelectPortfolio = (portfolio) => onSelect(portfolio);
    const handleDeletePortfolio = (portfolio) => onDelete && onDelete(portfolio);
    const handleSavePortfolio = (portfolio) => onSave(portfolio);
    const handleShowAdd = () => setShowAdd(state => !state);

    const hasPortfolios = portfolios.length > 0;

    return (
        <div className="c-panel c-panel--atlas">
            <h3 className="c-tool-header">
                <span>{ label }</span>
                <span>
                    { hasPortfolios
                        ? <IconButton aria-label="edit"
                            onClick={ handleShowAdd }>
                            { !showAdd
                                ? <AddCircleIcon fontSize="large" style={ { color: 'rgb(0, 143, 0)' } } />
                                : <CancelIcon fontSize="large" style={ { color: 'rgb(0, 143, 0)' } } />
                            }
                            </IconButton>
                        : null
                    }
                </span>
            </h3>
            <div className="l-elbow">
            <PortfolioList
                label="Porfolios"
                items={ portfolios }
                onSelect={ handleSelectPortfolio }/>
            </div>
            <Switch has={ portfolios.length === 0 || showAdd || selected }>
                { !portfolioDataIsLoading && <div className="l-elbow"><PortfolioForm
                    label={ `${ selected ? 'Save' : 'Add'} portfolio` }
                    item={ selected }
                    onSave={ handleSavePortfolio }
                    onDelete={ handleDeletePortfolio }/></div>
                }
            </Switch>
        </div>
    );
};

export default ManagePortfolios;
