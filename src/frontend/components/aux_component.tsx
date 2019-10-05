import React from 'react';

const aux = (props: any) => props.children;
export default aux;

export function withStyle(WrappedComponent: any, classname: string) {
    return class extends React.Component<any, any> {
        public render() {
            return (
                <div className={classname}>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    };
}

export function requiresLogin(WrappedComponent: any) {
    return class extends React.Component<any, any> {
        public render() {
            return this.props.userdata ? <WrappedComponent {...this.props} /> : null;
        }
    };
}
