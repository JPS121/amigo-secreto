import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../state/hooks/useListaDeParticipantes';

import Rodape from './Rodape';

jest.mock('../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavigate
  }
})

const mockSorteador = jest.fn()
jest.mock('../state/hooks/useSorteador', () => {
  return {
    useSorteador: () => mockSorteador
  }
})

describe('quando não existem participantes o suficiente', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })
  test('a brincadeira não pode ser iniciada', () => {
    render(<RecoilRoot><Rodape /></RecoilRoot>)
    const botao = screen.getByRole("button")
    expect(botao).toBeDisabled()
  })
})
describe('quando existem participantes o suficiente', () => {
  const participantes = ['Ana Catarina', 'Maria Guilhermina', 'Adelaide de Jesus']
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
  })
  test('a brincadeira não pode ser iniciada', () => {
    render(<RecoilRoot><Rodape /></RecoilRoot>)
    const botao = screen.getByRole("button")
    expect(botao).not.toBeDisabled()
  })
  test('brincadeira foi iniciada', () => {
    render(<RecoilRoot><Rodape /></RecoilRoot>)
    const botao = screen.getByRole("button")
    fireEvent.click(botao)
    expect(mockNavigate).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/sorteio')
    expect(mockSorteador).toHaveBeenCalledTimes(1)
  })
})
