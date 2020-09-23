import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { ListItemSecondaryAction } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
    },
    paper: {
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

const PortfolioList = ({ items = [], onSelect, selected, label }) => {

    const [selectedPortfolio, setSelectedPortfolio] = useState();
    
    const classes = useStyles();

    useEffect(() => {

        let isCancel = false;

        const update = () => {

            if(!isCancel) {

                setSelectedPortfolio(selected);
            }
        }

        update();

        return () => { isCancel = true };

    }, [selected])

    const handleSelect = value => () => {

        setSelectedPortfolio(state => {

            if(state && state.iri === value.iri) {

                onSelect && onSelect();
                
                return undefined;
            }

            onSelect && onSelect(value);

            return value;
        });
    };

    return (
        <div>
            <Paper className={ classes.paper }>
                <List dense component="div" role="list">
                    { items.map((value, idx) => (
                        <ListItem
                            key={ idx }
                            selected={ selectedPortfolio ? selectedPortfolio.iri === value.iri ? true : false : false }
                            role="listitem"
                            button
                            onClick={ handleSelect(value) }>
                            <ListItemText
                                id={ `transfer-list-item-${idx}-label` }
                                primary={ value.portfolioName.value }/>
                        </ListItem>
                    )) }
                    <ListItem />
                </List>
            </Paper>
        </div>
    );
};

export default PortfolioList;
