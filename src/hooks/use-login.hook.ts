import type { LoginResponse } from "@/interfaces/authentication.interface";
import { AuthenticationService } from "@/services/authentication.service";
import { setUser } from "@/store/authentication.slice";
import {
  createLoginSchema,
  type LoginInput,
} from "@/validations/authentication.schema";
import { useState } from "react";
import { toast } from "sonner";
import { treeifyError } from "zod";
import { useForm } from "./use-form.hook";
import { useAppDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";

export function useLogin() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { values, handleInputChange, isSubmitting, setIsSubmitting } =
    useForm<LoginInput>({
      email: "",
      password: "",
    });

  const [loginFormErrors, setLoginFormErrors] = useState<
    Partial<Record<keyof LoginInput, string[]>>
  >({});

  const handleLogin = async () => {
    setIsSubmitting(true);
    const LoginSchema = createLoginSchema(t);
    const result = LoginSchema.safeParse(values);
    if (!result.success) {
      setIsSubmitting(false);
      const tree = treeifyError(result.error);

      const fieldErrors: Partial<Record<keyof LoginInput, string[]>> = {
        email: tree.properties?.email?.errors,
        password: tree.properties?.password?.errors,
      };

      return setLoginFormErrors(fieldErrors);
    }

    try {
      const loginResponse: LoginResponse =
        await AuthenticationService.login(values);

      dispatch(
        setUser({
          cognitoId: loginResponse.cognitoId,
          name: loginResponse.name,
          surname: loginResponse.surname,
          email: loginResponse.surname,
        }),
      );
      setIsSubmitting(false);
      toast.success(t("authentication.login.success.message"), {
        description: t("authentication.login.success.description", {
          name: loginResponse.name,
        }),
      });
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error(t("authentication.login.error"), {
        description: error.message,
      });
      console.log(error);
    }
  };

  return {
    loginFormData: values,
    loginFormErrors,
    onLoginChange: handleInputChange,
    onLoginSubmit: handleLogin,
    isLoginSubmitting: isSubmitting,
  };
}
