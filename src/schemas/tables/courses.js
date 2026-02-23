import StudentButtonCellRenderer from "@/components/StudentButtonCellRenderer.vue"
import { riskColor } from "@/utils/colorScaleDroptout"
import { impactColumn } from "@/utils/impactColumn"

export default {
  columns: [
    { field: 'name', headerName: 'tables.general.name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'unity', headerName: 'tables.general.unity' },
    { field: 'campus', headerName: 'tables.general.campus' },
    { field: 'type', headerName: 'tables.courses.type' },
    { field: 'period', headerName: 'tables.courses.period' },
    {
      field: 'evasion',
      headerName: 'tables.general.evasion',
      valueFormatter: p => `${p.value}%`,
      cellStyle: params =>
        typeof params.value === 'number'
          ? { backgroundColor: riskColor(params.value) }
          : null
    }
  ],

  subtable: {
    mode: 'masterDetail',

    detailGridOptions: {
      components: {
        StudentButtonCellRenderer
      },

      suppressRowTransform: true,
      tooltipShowDelay: 200,
      tooltipHideDelay: 2000,
      suppressColumnVirtualisation: true,

      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
        resizable: true
      },

      columnDefs: [
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
        }
        ,
        impactColumn(
          'CIDADE_ORIGEM',
          'Cidade de Origem',
          { headerTooltip: 'Cidade de Origem' }),
        impactColumn(
          'RACA_COR',
          'Raça/Cor',
          { headerTooltip: 'Raça/Cor' }),
        impactColumn(
          'SEXO',
          'Sexo',
          { headerTooltip: 'Sexo' }),
        impactColumn(
          'ENSINO_MEDIO',
          'Ensino Médio',
          { headerTooltip: 'Ensino Médio' }),
        impactColumn(
          'COTAS',
          'Cotas',
          { headerTooltip: 'Cotas' }),
        impactColumn(
          'TIPO_INGRESSO',
          'Tipo de Ingresso',
          { headerTooltip: 'Tipo de Ingresso' }),
        impactColumn(
          'SITUACAO',
          'Situação',
          { headerTooltip: 'Situação' }),
        impactColumn(
          'AVG_NOTA',
          'Nota Média',
          { headerTooltip: 'Nota Média' }),
        impactColumn(
          'MAX_NOTA',
          'Nota Máxima',
          { headerTooltip: 'Nota Máxima' }),
        impactColumn(
          'MIN_NOTA',
          'Nota Mínima',
          { headerTooltip: 'Nota Mínima' }),
        impactColumn(
          'MEDIAN_NOTA',
          'Nota Mediana',
          { headerTooltip: 'Nota Mediana' }),
        impactColumn(
          'AVG_FREQUENCIA',
          'Frequência Média (%)',
          { headerTooltip: 'Frequência Média (%)' }
        ),
        impactColumn(
          'MAX_FREQUENCIA',
          'Frequência Máxima (%)',
          { headerTooltip: 'Frequência Máxima (%)' }
        ),
        impactColumn(
          'MIN_FREQUENCIA',
          'Frequência Mínima (%)',
          { headerTooltip: 'Frequência Mínima (%)' }
        ),
        impactColumn(
          'MEDIAN_FREQUENCIA',
          'Frequência Mediana (%)',
          { headerTooltip: 'Frequência Mediana (%)' }
        ),
        impactColumn(
          'PERC_REPROVACAO',
          'Percentual de Reprovação (%)',
          { headerTooltip: 'Percentual de Reprovação (%)' }
        ),
        impactColumn(
          'PERC_EXAMES',
          'Percentual de Exames (%)',
          { headerTooltip: 'Percentual de Exames (%)' }
        ),
        impactColumn(
          'QTD_DISCIPLINAS',
          'Quantidade de Disciplinas',
          { headerTooltip: 'Quantidade de Disciplinas Cursadas' }
        ),
        impactColumn(
          'ANO_NASCIMENTO',
          'Ano de Nascimento',
          { headerTooltip: 'Ano de Nascimento' }),
        impactColumn(
          'MES_NASCIMENTO',
          'Mês de Nascimento',
          { headerTooltip: 'Mês de Nascimento' }),
        impactColumn(
          'IDADE_MATRICULA',
          'Idade na Matrícula',
          { headerTooltip: 'Idade Quando se Matriculou' }),
        impactColumn(
          'DISTANCIA_CAMPUS',
          'Distância do Câmpus',
          { headerTooltip: 'Distância do Câmpus' }),
        {
          field: 'EVASAO',
          headerName: 'Risco de Evasão (%)',
          headerTooltip: 'Probabilidade do Aluno Evadir',
          pinned: 'right',
          width: 160,
          rowSpan: params => params.data._rowType === 'data' ? 2 : 1,
          valueFormatter: params =>
            params.data._rowType === 'data' ? `${params.value}%` : '',
          cellStyle: params =>
            params.data._rowType === 'data'
              ? {
                backgroundColor: riskColor(params.value),
              }
              : null
        }

      ],

      onFirstDataRendered: params => {
        params.api.sizeColumnsToFit()
      }
    },

    getDetailRowData(params) {
      const rows = []

      params.data.children?.forEach(aluno => {
        rows.push({
          ...aluno,
          _rowType: 'data'
        })

        rows.push({
          ...aluno.impact,
          _rowType: 'impact'
        })
      })

      params.successCallback(rows)
    }

  }
}
