interface SelectDocumentDataProps {
  label: string
  value: string
}

export const SelectDocumentData: SelectDocumentDataProps[] = [
  {
    label: 'CPF - Cadastro de Pessoas Físicas',
    value: 'CPF',
  },

  {
    label: 'RG - Registro Geral',
    value: 'RG',
  },

  {
    label: 'CNH - Carteira Nacional de Habilitação',
    value: 'CNH',
  },

  {
    label: 'CNPJ - Cadastro Nacional de Pessoas Jurídicas',
    value: 'CNPJ',
  },
]
