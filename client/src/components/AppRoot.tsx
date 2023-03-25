import React, {useState} from 'react';



export const AppContext = React.createContext<null|any>(null);

export default function AppRoot() {

    // State variables to keep track of the app state globally
    const [test, setTest] = useState(false)


    // Functions to update the states
    function template () {
        setTest(true);
    }


    const appContextValue = {
        template,
        test
    }
    

}