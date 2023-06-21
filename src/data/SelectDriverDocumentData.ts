interface SelectDriverDocumentDataProps {
  label: string
  value: string
}

export const SelectDriverDocumentData: SelectDriverDocumentDataProps[] = [
  {
    label: 'ACC - Autorização para Conduzir Ciclomotor',
    value: 'ACC',
  },

  {
    label: 'A - Motos',
    value: 'A',
  },

  {
    label: 'B - Carros e veiculos de carga leve',
    value: 'B',
  },

  {
    label: 'C - Caminhões pequenos e outros veículos',
    value: 'C',
  },

  {
    label: 'D - Ônibus e microônibus com mais de 8 lugares para passageiros',
    value: 'D',
  },
  {
    label:
      'E - Todos os veículos das categorias B,C e D, além de veículos com reboque ',
    value: 'E',
  },
]
