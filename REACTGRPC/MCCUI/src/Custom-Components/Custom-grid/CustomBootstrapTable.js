import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

const CustomBootstrapTable = ({ columns, data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <PaginationProvider
      pagination={
        paginationFactory({
          custom: true,
          page,
          sizePerPage,
          totalSize
        })
      }
    >
      {
        ({
          paginationProps,
          paginationTableProps
        }) => (
          <div>
            <BootstrapTable
              remote
              keyField="id"
              data={ data }
              columns={ columns }
              onTableChange={ onTableChange }
              { ...paginationTableProps }
            />
            <div className="mt-2">
              <PaginationListStandalone
                { ...paginationProps }
              />
            </div>
          </div>
        )
      }
    </PaginationProvider>
  </div>
);

export default CustomBootstrapTable
