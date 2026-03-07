import { useForm } from "./use-form.hook";
import {
  type RegisterInput,
  RegisterSchema,
} from "@/validations/authentication.schema";
import { useState } from "react";
import { treeifyError } from "zod";
import type { RegisterResponse } from "@/interfaces/authentication.interface";
import { AuthenticationService } from "@/services/authentication.service";
import { toast } from "sonner";
import { setAuthMode, setUnconfirmedEmail } from "@/store/authentication.slice";
import { useAppDispatch } from "@/store/hooks";

export function useRegister() {
  const dispatch = useAppDispatch()
  const {
    values,
    handleInputChange,
    isSubmitting,
    setIsSubmitting
  } = useForm<RegisterInput>({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [registerFormErrors, setRegisterFormErrors] = useState<
    Partial<Record<keyof RegisterInput, string[]>>
  >({});

  const handleRegister = async () => {
    setIsSubmitting(true);
    const result = RegisterSchema.safeParse(values);
    if (!result.success) {
      const tree = treeifyError(result.error);
      const fieldErrors: Partial<Record<keyof RegisterInput, string[]>> = {
        name: tree.properties?.name?.errors,
        surname: tree.properties?.surname?.errors,
        email: tree.properties?.email?.errors,
        password: tree.properties?.password?.errors,
      };
      setIsSubmitting(false);
      return setRegisterFormErrors(fieldErrors);
    }

    try {
      const registerResponse: RegisterResponse =
        await AuthenticationService.register(values);

      dispatch(setUnconfirmedEmail(values.email));
      setIsSubmitting(false);
      toast.success("Registration Successful!", {
        description: registerResponse.userConfirmed
          ? "Welcome home!"
          : "You just need to confirm your account and you will be all set!.",
      });
      
      if (!registerResponse.userConfirmed) {
        dispatch(setAuthMode("confirmUser"));
      } else {
        dispatch(setAuthMode("confirmUser"));
      }
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error("Registration Failed!", {
        description: error.message
        
      });
      console.log(error);
    }
  };

  return {
    registerFormData: values,
    registerFormErrors,
    onRegisterChange: handleInputChange,
    onRegisterSubmit: handleRegister,
    isRegisterSubmitting: isSubmitting,
  };
}
