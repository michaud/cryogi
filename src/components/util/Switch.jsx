const Switch = ({ has, children }) => {

    if(!children) return null;
    if(!Array.isArray(children) || children.length < 2) return has ? children : null;
    if(children.length > 2) console.log('more than two to choose from, using the first two')

    const [hasChild, notChild] = children;

    if(hasChild && notChild) {
        
        if(has) return hasChild;
        
        return notChild;
    }

    return null;
};

export default Switch;
