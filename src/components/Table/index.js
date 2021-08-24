import React, { useEffect, useState } from 'react'
import { currencyFormat } from '../../utils/functions'
import { loadData, handleLimits } from './action'
import { TotalsContainer } from './styles'

import Paginate from '../Paginate'
import LimitPage from '../LimitPage'

export default function Table() {
  const [products, setProducts] = useState([])
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

      <LimitPage handleLimits={e => handleLimits(e, { setLimit, setCurrentPage })} />

      <br />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {products && products.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{currencyFormat(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <TotalsContainer>Total de Paginas: {currentPage} de {totalCount}</TotalsContainer>

      <Paginate pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}
