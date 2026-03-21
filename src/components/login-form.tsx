import { Eye, EyeOff, RectangleEllipsis, Smile } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import React, { useState } from "react";
import type { AuthenticationMode } from "@/types/authentication.type";
import type { LoginInput } from "@/validations/authentication.schema";
import { useTranslation } from "react-i18next";



interface LoginFormProps {
  formData: LoginInput;
  errors?: Partial<Record<keyof LoginInput, string[]>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  handleAuthType: (auth: AuthenticationMode) => void;
  isSubmitting?: boolean;
}

export function LoginForm({
  formData,
  errors = {},
  handleChange,
  handleSubmit,
  handleAuthType,
  isSubmitting,
}: LoginFormProps) {
  const { t } = useTranslation();

  const [isPasswordViewable, SetIsPasswordViewable] = useState<Boolean>(false);

  const handlePasswordViewability = () => {
    SetIsPasswordViewable(!isPasswordViewable);
  };

  const displayErrors = (fieldName: keyof LoginInput) => {
    return errors?.[fieldName]?.map((error, index) => (
      <FieldError className="flex-col justify-center">
        <div key={index}>{error}</div>
      </FieldError>
    ));
  };

  return (
    <Card className="w-9/12 lg:w-6/12">
      <CardHeader>
        <CardTitle className="heading3">
          {t("authentication.login.title")}
        </CardTitle>
        <CardDescription>
          {t("authentication.login.description")}
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            size="lg"
            className="heading4"
            onClick={() => handleAuthType("register")}
          >
            {t("authentication.login.actionButton")}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          id="registrationForm"
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>
                    {t("authentication.login.emailLabel")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder={`${t("authentication.login.emailLabel")}...`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                    />
                    <InputGroupAddon>
                      <Smile />
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.email && displayErrors("email")}
                </Field>
                <Field>
                  <FieldLabel>
                    {t("authentication.login.passwordLabel")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder={`${t("authentication.login.passwordLabel")}...`}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      aria-invalid={!!errors.password}
                      type={isPasswordViewable ? "text" : "password"}
                    />
                    <InputGroupAddon>
                      <RectangleEllipsis />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <Button
                        variant="ghost"
                        onClick={handlePasswordViewability}
                      >
                        {isPasswordViewable ? <Eye /> : <EyeOff />}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.password && displayErrors("password")}
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className=" flex-col justify-end gap-4 pt-6">
        <Button
          className="w-full"
          size="lg"
          type="submit"
          disabled={isSubmitting}
          form="registrationForm"
          onClick={handleSubmit}
        >
          {isSubmitting
            ? t("authentication.login.submitting")
            : t("authentication.login.submit")}
        </Button>
        <Button className="w-full" size="lg" variant="secondary">
          {t("authentication.login.passwordless")}
        </Button>
      </CardFooter>
    </Card>
  );
}
