import { AtSign, Eye, EyeOff, RectangleEllipsis, Smile } from "lucide-react";
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
import { useState, type ChangeEvent, type MouseEventHandler } from "react";
import type { AuthenticationMode } from "@/types/authentication.type";
import type { RegisterInput } from "@/validations/authentication.schema";
import { useTranslation } from "react-i18next";

interface RegistrationForm {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface RegistrationFormProps {
  formData: RegistrationForm;
  errors?: Partial<Record<keyof RegistrationForm, string[]>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  handleAuthType: (e: AuthenticationMode) => void;
  isSubmitting?: boolean;
}

export function RegistrationForm({
  formData,
  errors = {},
  handleChange,
  handleSubmit,
  handleAuthType,
  isSubmitting,
}: RegistrationFormProps) {
  const { t } = useTranslation();
  const [isPasswordViewable, SetIsPasswordViewable] = useState<Boolean>(false);
  const handlePasswordViewability = () => {
    SetIsPasswordViewable(!isPasswordViewable);
  };

  const displayErrors = (fieldName: keyof RegisterInput) => {
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
          {t("authentication.register.title")}
        </CardTitle>
        <CardDescription>
          {t("authentication.register.description")}
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            size="lg"
            className="heading4"
            onClick={() => handleAuthType("login")}
          >
            {t("authentication.register.actionButton")}
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
                    {t("authentication.register.nameLabel")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder={`${t("authentication.register.nameLabel")}...`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                    />
                    <InputGroupAddon>
                      <Smile />
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.name && displayErrors("name")}
                </Field>
                <Field>
                  <FieldLabel>
                    {t("authentication.register.surnameLabel")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder={`${t("authentication.register.surnameLabel")}...`}
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      aria-invalid={!!errors.surname}
                    />
                    <InputGroupAddon>
                      <Smile />
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.surname && displayErrors("surname")}
                </Field>
                <Field>
                  <FieldLabel>
                    {t("authentication.register.emailLabel")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder={`${t("authentication.register.emailLabel")}...`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      type="email"
                    />
                    <InputGroupAddon>
                      <AtSign />
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.email && displayErrors("email")}
                </Field>
                <Field>
                  <FieldLabel>
                    {t("authentication.register.passwordLabel")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder={`${t("authentication.register.passwordLabel")}...`}
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
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting
            ? t("authentication.register.submitting")
            : t("authentication.register.submit")}
        </Button>
      </CardFooter>
    </Card>
  );
}
