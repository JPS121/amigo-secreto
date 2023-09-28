import { render } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Configuracao from './Configuracao';

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavigate
  }
})

describe('pagina de configuração', () => {
  test('deve ser renderizada', () => {
    const { container } = render(
      <RecoilRoot>
        <Configuracao />
      </RecoilRoot>)

    expect(container).toMatchSnapshot()
  })
})