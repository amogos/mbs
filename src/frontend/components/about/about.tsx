import React from 'react';
import { Aux, withStyle } from '../hooks/hooks';
import { Divider } from 'antd';
const AboutComponent = () => {
    return (
        <Aux>
            <Divider />
            <div>Help Status Blog Careers</div>
            <div>Privacy Terms About</div>
        </Aux>
    );
};

export default withStyle(AboutComponent, 'about_component');
