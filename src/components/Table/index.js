import React, { useEffect, useState } from 'react'
import { currencyFormat } from '../../utils/functions'
import { loadData, handleLimits } from './action'
import { TotalsContainer, FilterContainer } from './styles'

import Paginate from '../Paginate'
import LimitPage from '../LimitPage'
import ToogleColumn from '../ToogleColumn'
import Columns from './columns'

export default function Table() {
  const [products, setProducts] = useState([])
  const [colunms, setColunms] = useState(Columns)
  const [totalCount, setTotalCount] = useState(0)
  const [limit, setLimit] = useState(5)
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1) 

  useEffect(() => {
    loadData({ currentPage, limit, totalCount, setTotalCount, setPages, setProducts})
  },[currentPage, limit, totalCount])

  return (
    <div className="container">
      <h3>Tabela de Produtos</h3>

      <br />

      <FilterContainer>
        <ToogleColumn options={Columns} setColunms={setColunms}/>
        <LimitPage handleLimits={e => handleLimits(e, { setLimit, setCurrentPage })} />
      </FilterContainer>


      <br />

      <table className="table table-bordered">
        <thead>
          <tr>            
            {colunms && colunms.map(item => item.value ? <th key={item.value}>{item.label}</th> : '')}
          </tr>
        </thead>
        <tbody>
          {products && products.map(item => {
            return (
              <tr key={item.id}>
                {colunms.map(itemCol => {                  
                  return (
                    <td>
                      {itemCol.value == 'price' ? currencyFormat(item[itemCol.value]) : item[itemCol.value]}
                    </td>
                  )
                })}               
              </tr>          
          )})}
        </tbody>
      </table>

      <TotalsContainer>Total de Paginas: {currentPage} de {totalCount}</TotalsContainer>

      <Paginate pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}
