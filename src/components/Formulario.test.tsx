import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { RecoilRoot } from 'recoil'
import Formulario from './Formulario'

//Jest

test('quando o input estiver vazio, novos participantes não podem ser adicionados', () => {
  render(<RecoilRoot> <Formulario /> </RecoilRoot>)
  //encontrar o input no DOM
  const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
  //encontrar o botão no DOM
  const button = screen.getByRole('button')
  //garantir que o input esteja no documento
  expect(input).toBeInTheDocument()
  //garantir que o botão esteja desabilitado
  expect(button).toBeDisabled()
})

test('quando o input estiver preenchido, novo participante deve ser adicionado', () => {
  render(<RecoilRoot> <Formulario /> </RecoilRoot>)
  //encontrar o input no DOM
  const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
  //encontrar o botão no DOM
  const button = screen.getByRole('button')
  //inserir um valor no input
  fireEvent.change(input, { target: { value: 'Ana Catarina' } })
  //clicar no botão adicionar
  fireEvent.click(button)
  //garantir que o input esteja com foco
  expect(input).toHaveFocus()
  //garantir que o input não tenha um valor
  expect(input).toHaveValue('')
})

test('na lista não pode ter nome duplicado', () => {
  render(<RecoilRoot> <Formulario /> </RecoilRoot>)
  //encontrar o input no DOM
  const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
  //encontrar o botão no DOM
  const button = screen.getByRole('button')
  //inserir um valor no input
  fireEvent.change(input, { target: { value: 'Ana Catarina' } })
  //clicar no botão adicionar
  fireEvent.click(button)
  //inserir um valor duplicado no input
  fireEvent.change(input, { target: { value: 'Ana Catarina' } })
  //clicar no botão adicionar
  fireEvent.click(button)
  //encontrar o Alert
  const mensagemDeErro = screen.getByRole('alert')
  //garantir que a mensagem de erro exista
  expect(mensagemDeErro.textContent).toBe('Nomes duplicado não são permitidos!')
})

test('a mensagem de erro deverá sumir após os timers', () => {
  jest.useFakeTimers()
  render(<RecoilRoot> <Formulario /> </RecoilRoot>)
  //encontrar o input no DOM
  const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
  //encontrar o botão no DOM
  const button = screen.getByRole('button')
  //inserir um valor no input
  fireEvent.change(input, { target: { value: 'Ana Catarina' } })
  //clicar no botão adicionar
  fireEvent.click(button)
  //inserir um valor duplicado no input
  fireEvent.change(input, { target: { value: 'Ana Catarina' } })
  //clicar no botão adicionar
  fireEvent.click(button)
  //encontrar o Alert
  let mensagemDeErro = screen.queryByRole('alert')
  //garantir que a mensagem de erro exista
  expect(mensagemDeErro).toBeInTheDocument()
  act(() => {
    jest.runAllTimers()
  });
  //tentar encontrar a mensagem de erro
  mensagemDeErro = screen.queryByRole('alert')
  //garantir que a mensagem sumiu
  expect(mensagemDeErro).toBeEmpty()
})