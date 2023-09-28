import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../state/hooks/useListaDeParticipantes';
import { useResultadoSorteio } from '../state/hooks/useResultadoSorteio';
import Sorteio from './Sorteio';

jest.mock('../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})
jest.mock('../state/hooks/useResultadoSorteio', () => {
  return {
    useResultadoSorteio: jest.fn()
  }
})

describe('página de sorteio', () => {
  const participantes = ['Ana Catarina', 'Maria Josefina', 'Miriam Guilhermina']
  const resultado = new Map([
    ['Ana Catarina', 'Maria Josefina'],
    ['Maria Josefina', 'Miriam Guilhermina'],
    ['Ana Catarina', 'Miriam Guilhermina']
  ])
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
  })
  beforeEach(() => {
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
  })
  test('todos os participantes devem exibir seu amigo secreto', () => {
    render(<RecoilRoot><Sorteio /></RecoilRoot>)
    const opcoes = screen.queryAllByRole('option')
    expect(opcoes).toHaveLength(participantes.length + 1) //vem com uma option extra por padrão
  })
  test('o amigo secreto é exibido quando solicitado', () => {
    render(<RecoilRoot><Sorteio /></RecoilRoot>)
    const select = screen.getByPlaceholderText('Selecione o seu nome')
    fireEvent.change(select, {
      target: {
        value: participantes[0]
      }
    })
    const botao = screen.getByRole('button')
    fireEvent.click(botao)
    const amigoSecreto = screen.getByRole('alert')
    expect(amigoSecreto).toBeInTheDocument()
  })
})