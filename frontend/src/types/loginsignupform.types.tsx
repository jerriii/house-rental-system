import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { UserRole } from "./auth.types";
import React from "react";

export type Inputs = {
  _id?: string;
  name: string;
  image: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  role: UserRole;
};

export type FieldError = {
  name?: {
    message: string;
  };
  email?: {
    message: string;
  };
  password?: {
    message: string;
  };
  phone?: {
    message: string;
  };
  address?: {
    message: string;
  };
  role?: {
    message: string;
  };
};

export type LoginSignupProps = {
  formSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errors?: FieldError;
  register: UseFormRegister<Inputs>;
  setValue?: UseFormSetValue<Inputs>;
  trigger?: UseFormTrigger<Inputs>;
  watch?: UseFormWatch<Inputs>;
  loading?: boolean;
};
