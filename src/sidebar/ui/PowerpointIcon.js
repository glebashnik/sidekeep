const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('material-ui/lib/svg-icon');

export default React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M 14 3 L 23 3 L 23 20 L 14 20 L 14 18 L 21 18 L 21 17 L 14 17 L 14 16 L 21 16 L 21 15 L 14 15 L 14 12 C 14 12 15.375 13 17 13 C 21.5938 13 21 9 21 9 L 17 9 L 17 5 L 14 6 L 14 3 ZM 4 6 L 6 6 C 6 6 10 5.8438 10 9 C 10 11.9375 6 12 6 12 L 6 15 L 4 15 L 4 6 ZM 12 0 L 0.0012 2.1449 L 0.0012 20.8605 L 12 23 L 14 23 L 14 21 L 24 21 L 24 2 L 14 2 L 14 0 L 12 0 Z" fill="#d24625"/>
                <path d="M 18 4 C 19.8949 4.0856 21.8991 6.1466 22 8 C 20.803 8.0134 19.197 8 18 8 C 18 6.8286 17.9945 5.1687 18 4 L 18 4 Z" fill="#d24625"/>
                <path d="M 6 8 C 6 8 8 7.7188 8 9 C 8 10.2516 6 10 6 10 L 6 8 Z" fill="#d24625"/>
            </SvgIcon>
        );
    }
});
