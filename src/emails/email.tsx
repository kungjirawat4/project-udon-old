import { Button, Html } from '@react-email/components';
import * as React from 'react';

export function Email(props: any) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}
