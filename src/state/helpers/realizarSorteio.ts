import shuffle from "just-shuffle"

export function realizarSorteio(participantes: string[]) {

  const totalDeParticipantes = participantes.length
  const participantesEmbaralhados = shuffle(participantes)
  const resultadoDosParesDeParticipantes = new Map<string, string>()

  for (let index = 0; index < totalDeParticipantes; index++) {
    const indiceDoAmigo = index === (totalDeParticipantes - 1) ? 0 : index + 1
    resultadoDosParesDeParticipantes.set(participantesEmbaralhados[index], participantesEmbaralhados[indiceDoAmigo])
  }
  return resultadoDosParesDeParticipantes
}