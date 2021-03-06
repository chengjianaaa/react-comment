import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Star extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        // 获取 star 数量，并取余5（最多5个star）
        let star = this.props.star || 0;
        star = star % 5;

        return (
            <div className="star-container">
                {[1,2,3,4,5].map((item,index)=>{
                    let lightClass = star > item ? 'light' : '';
                    return <i key={index} className={'icon-star ' + lightClass} />
                })}
            </div>
        )
    }
}

export default Star