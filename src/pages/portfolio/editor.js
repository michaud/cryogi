import { useState } from 'react';

import { useAuth } from '@contexts/AuthProvider';

const Editor = () => {

    const { userData } = useAuth();
    const [PTI, setPTI] = useState();

    const getData = async () => {

        // const user = userData.user;
        // const pti = await user.publicTypeIndex;
        // setPTI(pti.value);
    };
    
    getData();

    return (
        <div>
        editor:
        { PTI }
        </div>
    )
};

export default Editor;
