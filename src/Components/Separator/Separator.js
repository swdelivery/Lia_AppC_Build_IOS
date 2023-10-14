import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

export default class Separator extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { style, height, color, width, line } = this.props;
        const lineStyle = {};
        if (line) {
            lineStyle.height = 1;
            // lineStyle.backgroundColor = GlobalStore.color.neutral5;
            lineStyle.backgroundColor = color;
        }

        return (
            <View style={[ { height, width }, { backgroundColor: color }, lineStyle, style ]}/>
        );
    }
}

Separator.defaultProps = {
    style: {},
    color: '',
};

Separator.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    color: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    line: PropTypes.bool,
};
