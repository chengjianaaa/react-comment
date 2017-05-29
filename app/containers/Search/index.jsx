import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../components/SearchHeader'; 
import SearchList from './subPage/list';
class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const params = this.props.params;
        return (
            <div> 
                <SearchHeader keyword={params.keyword} />
                <SearchList  keyword={params.keyword} category={params.category} />
            </div> 
        )
    }
}

export default Search