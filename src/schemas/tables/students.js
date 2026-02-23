import { riskColor } from "@/utils/colorScaleDroptout"
import { impactColumn } from "@/utils/impactColumn"

export default {
  usesRowSpan: true,
  gridOptions: {
    suppressSizeToFit: true,
    alwaysShowHorizontalScroll: true
  },
  columns: [
    {
      field: 'ID_ALUNO_GRADUACAO',
      headerName: 'ID',
      width: 110,
      pinned: 'left',
      rowSpan: p => p.data?._rowType === 'data' ? 2 : 1,
      valueGetter: p =>
        p.data?._rowType === 'impact' ? null : p.data?.ID_ALUNO_GRADUACAO,
      cellRenderer: 'StudentButtonCellRenderer'
    }
    ,

    impactColumn('CIDADE_ORIGEM', 'Cidade de Origem', { headerTooltip: 'Cidade de Origem' }),
    impactColumn('RACA_COR', 'Raça/Cor', { headerTooltip: 'Raça/Cor' }),
    impactColumn('SEXO', 'Sexo', { headerTooltip: 'Sexo' }),
    impactColumn('ENSINO_MEDIO', 'Ensino Médio', { headerTooltip: 'Ensino Médio' }),
    impactColumn('COTAS', 'Cotas', { headerTooltip: 'Cotas' }),
    impactColumn('TIPO_INGRESSO', 'Tipo de Ingresso', { headerTooltip: 'Tipo de Ingresso' }),
    impactColumn('SITUACAO', 'Situação', { headerTooltip: 'Situação' }),
    impactColumn('AVG_NOTA', 'Nota Média', { headerTooltip: 'Nota Média' }),
    impactColumn('MAX_NOTA', 'Nota Máxima', { headerTooltip: 'Nota Máxima' }),
    impactColumn('MIN_NOTA', 'Nota Mínima', { headerTooltip: 'Nota Mínima' }),
    impactColumn('MEDIAN_NOTA', 'Nota Mediana', { headerTooltip: 'Nota Mediana' }),
    impactColumn('AVG_FREQUENCIA', 'Frequência Média (%)', { headerTooltip: 'Frequência Média (%)' }),
    impactColumn('MAX_FREQUENCIA', 'Frequência Máxima (%)', { headerTooltip: 'Frequência Máxima (%)' }),
    impactColumn('MIN_FREQUENCIA', 'Frequência Mínima (%)', { headerTooltip: 'Frequência Mínima (%)' }),
    impactColumn('MEDIAN_FREQUENCIA', 'Frequência Mediana (%)', { headerTooltip: 'Frequência Mediana (%)' }),
    impactColumn('PERC_REPROVACAO', 'Percentual de Reprovação (%)', { headerTooltip: 'Percentual de Reprovação (%)' }),
    impactColumn('PERC_EXAMES', 'Percentual de Exames (%)', { headerTooltip: 'Percentual de Exames (%)' }),
    impactColumn('QTD_DISCIPLINAS', 'Quantidade de Disciplinas', { headerTooltip: 'Quantidade de Disciplinas' }),
    impactColumn('ANO_NASCIMENTO', 'Ano de Nascimento', { headerTooltip: 'Ano de Nascimento' }),
    impactColumn('MES_NASCIMENTO', 'Mês de Nascimento', { headerTooltip: 'Mês de Nascimento' }),
    impactColumn('IDADE_MATRICULA', 'Idade na Matrícula', { headerTooltip: 'Idade na Matrícula' }),
    impactColumn('DISTANCIA_CAMPUS', 'Distância do Câmpus', { headerTooltip: 'Distância do Câmpus' }),

    {
      field: 'EVASAO',
      headerName: 'Risco de evasão',
      headerTooltip: 'Probabilidade do Aluno Evadir',
      pinned: 'right',
      width: 120,
      rowSpan: p => p.data?._rowType === 'data' ? 2 : 1,
      valueGetter: p =>
        p.data?._rowType === 'impact' ? null : p.data?.EVASAO,
      cellStyle(p) {
        if (p.value == null) return null
        return { backgroundColor: riskColor(p.value) }
      }
    }
  ]
}
