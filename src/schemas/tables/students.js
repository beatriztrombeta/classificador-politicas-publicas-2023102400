import { riskColor } from '@/utils/colorScaleDroptout'
import { impactColumn } from "@/utils/impactColumn"

export default {
  columns: [
    {
      field: 'ID_ALUNO_GRADUACAO',
      headerName: 'ID',
      pinned: 'left',
      width: 120,
      cellRenderer: 'StudentButtonCellRenderer',
      rowSpan: params => params.data._rowType === 'data' ? 2 : 1,
      cellClassRules: {
        'cell-span': params => params.data._rowType === 'data'
      }
    },
    impactColumn('CIDADE_ORIGEM', 'Cidade de Origem'),
    impactColumn('RACA_COR', 'Raça/Cor'),
    impactColumn('SEXO', 'Sexo'),
    impactColumn('ENSINO_MEDIO', 'Ensino Médio'),
    impactColumn('COTAS', 'Cotas'),
    impactColumn('TIPO_INGRESSO', 'Tipo de Ingresso'),
    impactColumn('SITUACAO', 'Situação'),
    impactColumn('AVG_NOTA', 'Nota Média'),
    impactColumn('MAX_NOTA', 'Nota Máxima'),
    impactColumn('MIN_NOTA', 'Nota Mínima'),
    impactColumn('MEDIAN_NOTA', 'Nota Mediana'),
    impactColumn('AVG_FREQUENCIA', 'Frequência Média (%)'),
    impactColumn('MAX_FREQUENCIA', 'Frequência Máxima (%)'),
    impactColumn('MIN_FREQUENCIA', 'Frequência Mínima (%)'),
    impactColumn('MEDIAN_FREQUENCIA', 'Frequência Mediana (%)'),
    impactColumn('PERC_REPROVACAO', 'Percentual Reprovação (%)'),
    impactColumn('PERC_EXAMES', 'Percentual Exames (%)'),
    impactColumn('QTD_DISCIPLINAS', 'Qtd. Disciplinas'),
    impactColumn('ANO_NASCIMENTO', 'Ano Nascimento'),
    impactColumn('MES_NASCIMENTO', 'Mês Nascimento'),
    impactColumn('IDADE_MATRICULA', 'Idade Matrícula'),
    impactColumn('DISTANCIA_CAMPUS', 'Distância Câmpus'),
    {
      field: 'EVASAO',
      headerName: 'Risco de Evasão (%)',
      pinned: 'right',
      width: 160,
      rowSpan: params => params.data._rowType === 'data' ? 2 : 1,
      valueFormatter: params =>
        params.data._rowType === 'data' && typeof params.value === 'number'
          ? `${params.value}%`
          : '',
      cellStyle: params =>
        params.data._rowType === 'data' && typeof params.value === 'number'
          ? { backgroundColor: riskColor(params.value) }
          : null
    }
  ],
  onFirstDataRendered: params => {
    params.api.sizeColumnsToFit()
  }
}