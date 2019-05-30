import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, message } from 'antd';

storiesOf('Button', module)
    .add('primary', () => <Button type="primary">Primary</Button>)
    .add('default', () => <Button>Default</Button>);

storiesOf('Message', module)
    .add('success', () => <Button onClick={() => message.success('success')}>Success</Button>)
    .add('error', () => <Button onClick={() => message.error('error')}>Error</Button>);
