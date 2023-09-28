import { useSetRecoilState } from 'recoil';
import { useListaDeParticipantes } from './useListaDeParticipantes';
import { resultadoAmigoSecreto } from '../atom';
import { realizarSorteio } from '../helpers/realizarSorteio';

export const useSorteador = () => {

  const setResultado = useSetRecoilState(resultadoAmigoSecreto)
  const participantes = useListaDeParticipantes()

  return () => {
    const resultado = realizarSorteio(participantes)
    setResultado(resultado)
  }
}