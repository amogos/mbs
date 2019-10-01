import React from 'react';

const aux = (props: any) => props.children;
export default aux;

export function withStyle(WrappedComponent: any, classname: string) {
    return class extends React.Component {
        public render() {
            return (
                <div className={classname}>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    };
}
