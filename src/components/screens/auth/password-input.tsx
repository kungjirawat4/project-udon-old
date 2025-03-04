/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import * as React from 'react';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { cn } from '@/libs/utils';

export type PasswordInputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  // eslint-disable-next-line unused-imports/no-unused-vars
  ({ className, type = 'password', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </span>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
