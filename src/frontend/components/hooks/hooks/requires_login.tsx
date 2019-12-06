import React from 'react';

const aux = (props: any) => props.children;
export default aux;

export function requiresLogin(WrappedComponent: any, FallbackComponent?: any) {
    return class extends React.Component<any, any> {
        public render() {
            const fallback = FallbackComponent ? <FallbackComponent {...this.props} /> : null;
            if (this.props.userdata && this.props.userdata.id > 0) {
                return <WrappedComponent {...this.props} />;
            }
            return fallback;
        }
    };
}