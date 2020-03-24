import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

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

const PortfolioList = ({ items = [], onSelect, label }) => {

    const classes = useStyles();

    const [selected, setSelected] = useState();

    const handleSelect = value => () => {

        setSelected(state => {

            if(state && state.item.iri === value.item.iri) {

                onSelect && onSelect();
                
                return undefined;
            }

            onSelect && onSelect(value);

            return value;
        });
    };

    return (
        <Paper className={ classes.paper }>
            <List dense component="div" role="list">
                { items.map(value => {
                    
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem
                            key={ value }
                            selected={ selected ? selected.item.iri === value.item.iri ? true : false : false }
                            role="listitem"
                            button
                            onClick={ handleSelect(value) }>
                            <ListItemText id={ labelId } primary={ value.item.portfolioName.value } />
                        </ListItem>
                    );
                }) }
                <ListItem />
            </List>
        </Paper>

        // <div>
        //     <h2>{ label }</h2>
        //     {
        //         items.map((portfolio, idx) => <div key={ idx }>{ portfolio.item.portfolioName.value }</div>)
        //     }
        // </div>
    );
};

export default PortfolioList;
