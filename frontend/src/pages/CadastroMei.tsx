import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { MeiUpgrade } from "../store/Login/Login.actions";

import { AxiosError } from "axios";

import CenterTagComponent from "../components/CenterTag";
import FormComponent from "../components/Form";
import InputTextComponent from "../components/InputText";
import SimpleButtonComponent from "../components/SimpleButton";
import ModalComponent from "../components/Modal";

import { MeiDto, api } from "../api/api";

function CadastroMeiPage() {
  const loginData = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalState, setModalState] = useState({
    open: false,
    message: "",
    navigate: false,
  });

  const [cnpj, setCnpj] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");

  if (!loginData || loginData.user.isMei) {
    navigate("/");
    return <></>;
  }

  function handleSubmit() {
    const data: MeiDto = {
      cnpj,
      nomeFantasia,
      razaoSocial,
    };

    api
      .post(`/users/${loginData?.user.id}/mei`, data)
      .then(() => {
        setModalState({
          open: true,
          message: "Conta atualizada com sucesso para MEI!",
          navigate: true,
        });
        dispatch(MeiUpgrade());
      })
      .catch((e: AxiosError) => {
        setModalState({
          open: true,
          message: e.response?.data?.error,
          navigate: false,
        });
      });
  }

  function handleCloseModal() {
    if (modalState.navigate) navigate("/");

    setModalState({
      open: false,
      message: "",
      navigate: false,
    });
  }

  return (
    <>
      <CenterTagComponent>
        <FormComponent className="mt-10" onSubmit={handleSubmit}>
          <h1 className="text-3xl">
            <b>Cadastro MEI</b>
          </h1>
          <InputTextComponent label="CNPJ:" onChange={setCnpj} />
          <InputTextComponent
            label="Nome fantasia:"
            onChange={setNomeFantasia}
          />
          <InputTextComponent
            label="Razão social:"
            className="mb-4"
            onChange={setRazaoSocial}
          />
          <CenterTagComponent>
            <SimpleButtonComponent type="submit">Salvar</SimpleButtonComponent>
          </CenterTagComponent>
        </FormComponent>
      </CenterTagComponent>
      <ModalComponent state={modalState.open} onClose={handleCloseModal}>
        {modalState.message}
      </ModalComponent>
    </>
  );
}

export default CadastroMeiPage;
