import { riskColor } from '@/utils/colorScaleDroptout'
import { impactColumn } from "@/utils/impactColumn"
import StudentButtonCellRenderer from '@/components/StudentButtonCellRenderer.vue'

export default {
  components: {
    StudentButtonCellRenderer
  },

  suppressRowTransform: true,
  tooltipShowDelay: 200,
  tooltipHideDelay: 2000,
  suppressColumnVirtualisation: true,

  defaultColDef: {
    minWidth: 160,
    sortable: true,
    filter: true,
    resizable: true
  },

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
    impactColumn('CIDADE_ORIGEM', 'Cidade de Origem', { minWidth: 180, headerTooltip: 'Cidade de Origem' }),
    impactColumn('RACA_COR', 'Raça/Cor', { minWidth: 140, headerTooltip: 'Raça/Cor' }),
    impactColumn('SEXO', 'Sexo', { minWidth: 110, headerTooltip: 'Sexo' }),
    impactColumn('ENSINO_MEDIO', 'Ensino Médio', { minWidth: 180, headerTooltip: 'Ensino Médio' }),
    impactColumn('COTAS', 'Cotas', { minWidth: 120, headerTooltip: 'Cotas' }),
    impactColumn('TIPO_INGRESSO', 'Tipo de Ingresso', { minWidth: 180, headerTooltip: 'Tipo de Ingresso' }),
    impactColumn('SITUACAO', 'Situação', { minWidth: 140, headerTooltip: 'Situação' }),
    impactColumn('AVG_NOTA', 'Nota Média', { minWidth: 130, headerTooltip: 'Nota Média' }),
    impactColumn('MAX_NOTA', 'Nota Máxima', { minWidth: 140, headerTooltip: 'Nota Máxima' }),
    impactColumn('MIN_NOTA', 'Nota Mínima', { minWidth: 140, headerTooltip: 'Nota Mínima' }),
    impactColumn('MEDIAN_NOTA', 'Nota Mediana', { minWidth: 150, headerTooltip: 'Nota Mediana' }),
    impactColumn('AVG_FREQUENCIA', 'Frequência Média (%)', { minWidth: 180, headerTooltip: 'Frequência Média (%)' }),
    impactColumn('MAX_FREQUENCIA', 'Frequência Máxima (%)', { minWidth: 190, headerTooltip: 'Frequência Máxima (%)' }),
    impactColumn('MIN_FREQUENCIA', 'Frequência Mínima (%)', { minWidth: 190, headerTooltip: 'Frequência Mínima (%)' }),
    impactColumn('MEDIAN_FREQUENCIA', 'Frequência Mediana (%)', { minWidth: 190, headerTooltip: 'Frequência Mediana (%)' }),
    impactColumn('PERC_REPROVACAO', 'Percentual de Reprovação (%)', { minWidth: 220, headerTooltip: 'Percentual de Reprovação (%)' }),
    impactColumn('PERC_EXAMES', 'Percentual de Exames (%)', { minWidth: 190, headerTooltip: 'Percentual de Exames (%)' }),
    impactColumn('QTD_DISCIPLINAS', 'Quantidade de Disciplinas', { minWidth: 210, headerTooltip: 'Quantidade de Disciplinas Cursadas' }),
    impactColumn('ANO_NASCIMENTO', 'Ano de Nascimento', { minWidth: 160, headerTooltip: 'Ano de Nascimento' }),
    impactColumn('MES_NASCIMENTO', 'Mês de Nascimento', { minWidth: 160, headerTooltip: 'Mês de Nascimento' }),
    impactColumn('IDADE_MATRICULA', 'Idade na Matrícula', { minWidth: 170, headerTooltip: 'Idade Quando se Matriculou' }),
    impactColumn('DISTANCIA_CAMPUS', 'Distância do Câmpus', { minWidth: 180, headerTooltip: 'Distância do Câmpus' }),
    {
      field: 'EVASAO',
      headerName: 'Risco de Evasão (%)',
      pinned: 'right',
      width: 180,
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
  ]
}