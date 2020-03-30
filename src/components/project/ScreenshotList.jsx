import React, { useState } from 'react';

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

const ScreenshotList = ({ items, onSelect, label }) => {

    const [selected, setSelected] = useState();

    const classes = useStyles();

    const handleSelect = value => () => {

        setSelected(state => {

            if (state && state.iri === value.iri) {

                onSelect && onSelect();

                return undefined;
            }

            onSelect && onSelect(value);

            return value;
        });
    };

    return (
        <div className="c-box">
            <Paper className={ classes.paper }>
                <List dense component="div" role="list">
                    { items.map((shot, idx) => {

                        const labelId = `transfer-list-item-${idx}-label`;

                        return (
                            <ListItem
                                key={ idx }
                                selected={ selected ? selected.iri === shot.iri ? true : false : false }
                                role="listitem"
                                button
                                onClick={ handleSelect(shot) }>
                                <ListItemText id={ labelId } primary={ shot.shortScreenshotDescription.value } />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <HighlightOffIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    }) }
                    <ListItem />
                </List>
            </Paper>
        </div>
    );
};

export default ScreenshotList;
