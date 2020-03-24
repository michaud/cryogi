import styled from 'styled-components';

export const FlexContainer = styled.div`
    display: flex;
    align-items: ${props => props.center ? "center" : props.alignitems ? props.alignitems : "flex-start"};
    flex-direction: ${props => props.vertical ? "column" : "row"};
    flex: ${props => props.flex ? props.flex : "0"};
`;

export const FieldContainer = styled.div`
    margin-bottom: 1.5rem;
`;

export const FlexItem = styled.div`
    flex:${props => props.narrow ? "0" : "1"};
    align-items: ${props => props.alignitems ? props.alignitems : "normal"};
`;
export const FlexItemLabel = styled.div`
    min-width: 7rem;
    padding-right: 1rem;
`;
export const FlexItemValue = styled.div`
    flex: 1;
    align-items: ${props => props.alignitems ? props.alignitems : "normal"};
`;
export const FlexItemData = styled.div`
    flex-direction: ${props => props.vertical ? "column" : "row"};
    flex: 1;
    align-items: ${props => props.alignitems ? props.alignitems : "normal"};
`;
export const FlexItemTools = styled.div`flex: 0;`;

export const FlexItemRight = styled.div`
    flex: 1;
    text-align: right;
`;

export const FlexToolLeft = styled.div`
    flex: 0;
    text-align: left;
`;

export const FlexToolRight = styled.div`
    flex: 0;
    text-align: right;
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: ${ props => props.cols ? props.cols : '1fr' };
    grid-template-rows: repeat(auto-fill, ${ props => props.rowHeight ? props.rowHeight : 'auto' });
    gap: 2rem;

    @media (min-width: 600px) {
        grid-template-columns: ${ props => props.cols ? props.cols : '1fr 1fr' };
    }

    @media (min-width: 900px) {
        grid-template-columns: ${ props => props.cols ? props.cols : '1fr 1fr 1fr' };
    }
`;
