import React from 'react';

export function withStyle(WrappedComponent: any, classname: string) {
    return class extends React.Component<any, any> {
        public render() {
            return (
                <div id={classname} className={classname}>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    };
}
