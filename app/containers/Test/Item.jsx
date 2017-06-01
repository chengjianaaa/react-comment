import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './containers/App';
import todoApp from './reducers';

let store = createStore(todoApp);
class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log('constructor');
    }
	    
    render() {
    	
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
    

}

export default Item