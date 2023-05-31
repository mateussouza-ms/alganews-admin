import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Tabs,
  Upload,
  notification,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import ImageCrop from "antd-img-crop";
import { MaskedInput } from "antd-mask-input";
import locale from "antd/es/date-picker/locale/pt_BR";
import { FileService, User, UserService } from "ms-alganews-sdk";
import { CustomError } from "ms-alganews-sdk/dist/CustomError";

const profiles = {
  EDITOR: "Editor",
  ASSISTANT: "Assistente",
  MANGER: "Gerente",
};

export function UserForm() {
  const [avatar, setAvatar] = useState("");
  const [activeTab, setActiveTab] = useState<"personalData" | "bankAccount">(
    "personalData"
  );

  const [form] = Form.useForm<User.Input>();

  const handleAvatarUpload = useCallback(
    async (file: File) => {
      const avatarSource = await FileService.upload(file);
      setAvatar(avatarSource);
    },
    [FileService]
  );

  const handleSubmit = useCallback(
    async (user: User.Input) => {
      const userDTO: User.Input = {
        ...user,
        phone: user.phone.replace(/\D/g, ""),
        taxpayerId: user.taxpayerId.replace(/\D/g, ""),
      };

      try {
        await UserService.insertNewUser(userDTO);
        notification.success({
          message: "Sucesso",
          description: "Usuário salvo com sucesso!",
        });
      } catch (error) {
        console.log("error:", error);
        if (error instanceof CustomError) {
          if (error.data?.objects) {
            form.setFields(
              error.data.objects.map((err) => {
                const name = (err.name || "")
                  .split(/(\.|\[|\])/gi)
                  .filter((value) => ![".", "[", "]", ""].includes(value))
                  .map((value) =>
                    isNaN(Number(value)) ? value : Number(value)
                  );

                return {
                  name,
                  errors: [err.userMessage],
                };
              })
            );
          } else {
            notification.error({
              message: error.message,
              description:
                error.data?.detail === error.message
                  ? null
                  : error.data?.detail === "Network Error"
                  ? "Erro de conexão"
                  : error.data?.detail,
            });
          }
        } else {
          notification.error({
            message: "Houve um erro",
          });
        }
      }
    },
    [UserService, notification]
  );

  useEffect(() => {
    form.setFieldsValue({ avatarUrl: avatar });
  }, [avatar]);

  return (
    <Form
      layout="vertical"
      autoComplete="off"
      onFinish={handleSubmit}
      form={form}
      onFinishFailed={(fields) => {
        let bankAccountErrors = 0;
        let personalDataErrors = 0;

        fields.errorFields.forEach((errorField) => {
          if (
            errorField.name.includes("location") ||
            errorField.name.includes("skills") ||
            errorField.name.includes("phone") ||
            errorField.name.includes("taxpayerId") ||
            errorField.name.includes("pricePerWord")
          ) {
            personalDataErrors++;
          }

          if (errorField.name.includes("bankAccount")) {
            bankAccountErrors++;
          }
        });

        if (personalDataErrors > bankAccountErrors) {
          setActiveTab("personalData");
          return;
        }

        if (bankAccountErrors > personalDataErrors) {
          setActiveTab("bankAccount");
          return;
        }
      }}
    >
      <Row gutter={24} align={"middle"}>
        <Col lg={4}>
          <ImageCrop rotationSlider cropShape="round" showGrid aspect={1}>
            <Upload
              maxCount={1}
              onRemove={() => setAvatar("")}
              beforeUpload={(file) => {
                handleAvatarUpload(file);
                return false;
              }}
            >
              <Avatar
                style={{ cursor: "pointer" }}
                icon={<UserOutlined />}
                size={128}
                src={avatar}
              />
            </Upload>
          </ImageCrop>
          <Form.Item
            name={"avatarUrl"}
            hidden
            rules={[{ type: "url", message: "Deve ser uma URL válida" }]}
          >
            <Input hidden />
          </Form.Item>
        </Col>
        <Col lg={10}>
          <Form.Item
            label="Nome"
            name={"name"}
            rules={[
              { required: true, message: "Campo obrigatório" },
              { max: 255, message: "O tamanho máximo é de ${max} caracteres" },
            ]}
          >
            <Input placeholder="Ex.: João Silva" />
          </Form.Item>
          <Form.Item
            label="Data de nascimento"
            name={"birthdate"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              locale={locale}
            />
          </Form.Item>
        </Col>
        <Col lg={10}>
          <Form.Item
            label="Bio"
            name={"bio"}
            rules={[
              { required: true, message: "Campo obrigatório" },
              { max: 255, message: "O tamanho máximo é de ${max} caracteres" },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Divider />
        </Col>
        <Col lg={12}>
          <Form.Item
            label="Perfil"
            name={"role"}
            rules={[
              { required: true, message: "Campo obrigatório" },
              {
                type: "enum",
                enum: Object.keys(profiles),
                message:
                  "${label} precisa ser " +
                  Object.values(profiles).toString().replaceAll(",", ", "),
              },
            ]}
          >
            <Select
              placeholder="Selecione um perfil"
              options={Object.entries(profiles).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item
            label="E-mail"
            name={"email"}
            rules={[
              { required: true, message: "Campo obrigatório" },
              { max: 255, message: "O tamanho máximo é de ${max} caracteres" },
            ]}
          >
            <Input type="email" placeholder="Ex.: contato@joaosilva.com " />
          </Form.Item>
        </Col>

        <Col lg={24}>
          <Divider />
        </Col>

        <Col lg={24}>
          <Tabs
            defaultActiveKey="personalData"
            activeKey={activeTab}
            onChange={(tab) => setActiveTab(tab as any)}
            items={[
              {
                label: "Dados Pessoais",
                key: "personalData",
                forceRender: true,
                children: (
                  <Row gutter={24}>
                    <Col lg={8}>
                      <Form.Item
                        label="País"
                        name={["location", "country"]}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                          {
                            max: 50,
                            message: "O tamanho máximo é de ${max} caracteres",
                          },
                        ]}
                      >
                        <Input placeholder="Ex.: Brasil" />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        label="Estado"
                        name={["location", "state"]}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                          {
                            max: 50,
                            message: "O tamanho máximo é de ${max} caracteres",
                          },
                        ]}
                      >
                        <Input placeholder="Ex.: Goiás" />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        label="Cidade"
                        name={["location", "city"]}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                          {
                            max: 255,
                            message: "O tamanho máximo é de ${max} caracteres",
                          },
                        ]}
                      >
                        <Input placeholder="Ex.: Luziânia" />
                      </Form.Item>
                    </Col>

                    <Col lg={8}>
                      <Form.Item
                        label="Telefone"
                        name={"phone"}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                          {
                            max: 20,
                            message: "O tamanho máximo é de ${max} caracteres",
                          },
                        ]}
                      >
                        <MaskedInput
                          mask="(00) 00000-0000"
                          placeholder="(61) 99999-9999"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        label="CPF"
                        name={"taxpayerId"}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                          {
                            max: 14,
                            message: "O tamanho máximo é de ${max} caracteres",
                          },
                        ]}
                      >
                        <MaskedInput
                          mask={"000.000.000-00"}
                          placeholder="111.222.333-44"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        label="Preço por palavra"
                        name={"pricePerWord"}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                        ]}
                      >
                        <Input placeholder="0" />
                      </Form.Item>
                    </Col>

                    {[1, 2, 3].map((_, index) => (
                      <React.Fragment key={`skill_${index}`}>
                        <Col lg={6}>
                          <Form.Item
                            label="Habilidade"
                            name={["skills", index, "name"]}
                            rules={[
                              { required: true, message: "Campo obrigatório" },
                            ]}
                          >
                            <Input placeholder="Ex.: JavaScript" />
                          </Form.Item>
                        </Col>
                        <Col lg={2}>
                          <Form.Item
                            label="%"
                            name={["skills", index, "percentage"]}
                            rules={[
                              { required: true, message: "" },
                              {
                                validator: async (field, value) => {
                                  if (isNaN(Number(value))) {
                                    throw "Somente números";
                                  }
                                  if (Number(value) > 100) {
                                    throw "Máximo é 100";
                                  }
                                  if (Number(value) < 0) {
                                    throw "Mínimo é 0";
                                  }
                                },
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </React.Fragment>
                    ))}
                  </Row>
                ),
              },
              {
                label: "Dados Bancários",
                key: "bankAccount",
                forceRender: true,
                children: (
                  <Row gutter={24}>
                    <Col lg={8}>
                      <Form.Item
                        label="Instituição"
                        name={["bankAccount", "bankCode"]}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                          {
                            max: 3,
                            message: "O tamanho máximo é de ${max} caracteres",
                          },
                          {
                            min: 3,
                            message: "O tamanho mínimo é de ${min} caracteres",
                          },
                        ]}
                      >
                        <Input placeholder="260" />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        label="Agência"
                        name={["bankAccount", "agency"]}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                          {
                            min: 1,
                            message: "O tamanho mínimo é de ${min} caracteres",
                          },
                          {
                            max: 10,
                            message: "O tamanho máximo é de ${max} caracteres",
                          },
                        ]}
                      >
                        <Input placeholder="0001" />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        label="Conta (sem dígito)"
                        name={["bankAccount", "number"]}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                          {
                            min: 1,
                            message: "O tamanho mínimo é de ${min} caracteres",
                          },
                          {
                            max: 20,
                            message: "O tamanho máximo é de ${max} caracteres",
                          },
                        ]}
                      >
                        <Input placeholder="123456" />
                      </Form.Item>
                    </Col>

                    <Col lg={8}>
                      <Form.Item
                        label="Dígito da conta"
                        name={["bankAccount", "digit"]}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                          {
                            min: 1,
                            message: "O tamanho mínimo é de ${min} caracteres",
                          },
                          {
                            max: 1,
                            message: "O tamanho máximo é de ${max} caracteres",
                          },
                        ]}
                      >
                        <Input placeholder="1" />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item
                        label="Tipo de conta"
                        name={["bankAccount", "type"]}
                        rules={[
                          { required: true, message: "Campo obrigatório" },
                        ]}
                      >
                        <Select
                          placeholder="Selecione o tipo de conta"
                          options={[
                            { value: "SAVING", label: "Conta poupança" },
                            { value: "CHECKING", label: "Conta corrente" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ),
              },
            ]}
          />
        </Col>
      </Row>
      <Col lg={24}>
        <Row justify={"end"}>
          <Button type="primary" htmlType="submit">
            Cadastrar usuário
          </Button>
        </Row>
      </Col>
    </Form>
  );
}
