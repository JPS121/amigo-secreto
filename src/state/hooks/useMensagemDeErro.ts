import { erroState } from './../atom';
import { useRecoilState } from "recoil"

export const useMensagemDeErro = () => {
  const mensagem = useRecoilState(erroState)
  return mensagem;
}

