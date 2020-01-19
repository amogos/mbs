import React from 'react';

export function requiresCondition(WrappedComponent: any, Condition: (props: any) => boolean, FallbackComponent?: any) {
    return class extends React.Component<any, any> {
        public render() {
            if (Condition(this.props)) {
                return <WrappedComponent {...this.props} />;
            } else {
                return FallbackComponent ? <FallbackComponent /> : null;
            }
        }
    };
}
