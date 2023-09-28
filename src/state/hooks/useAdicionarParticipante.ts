import { erroState, listaParticipantesState } from './../atom';
import { useRecoilValue, useSetRecoilState } from "recoil"


export const useAdicionarParticipante = () => {
  const setLista = useSetRecoilState(listaParticipantesState)
  const lista = useRecoilValue(listaParticipantesState)
  const setErro = useSetRecoilState(erroState)

  return (nomeDoParticipante: string) => {
    if (lista.includes(nomeDoParticipante)) {
      setErro('Nomes duplicado não são permitidos!')
      setTimeout(() => {
        setErro('')
      }, 5000)
      return
    }
    return setLista(listaAntiga => [...listaAntiga, nomeDoParticipante])
  }
}