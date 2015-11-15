const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('material-ui/lib/svg-icon');

export default React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M9,18V15H5V11H9V8L14,13M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"/>
            </SvgIcon>
        );
    }
});