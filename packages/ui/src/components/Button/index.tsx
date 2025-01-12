/* eslint-disable react/button-has-type -- it is safe to assume it will be of allowed types */
import type { ButtonHTMLAttributes, FC } from 'react';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  type = 'button',
  ...props
}) => <button type={type} {...props} />;
