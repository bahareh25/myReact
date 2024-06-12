import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

const CustomBootstrapTable = ({ KeyField, columns, data, page, sizePerPage, onTableChange, totalSize,rowStyle }) => (
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
              keyField={KeyField}
              data={ data }
              columns={ columns }
              rowStyle={rowStyle}
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
