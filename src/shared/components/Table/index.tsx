import { Table, Pagination } from "antd";
import { useEffect, useState } from "react";
import {
  columnsOffCheck,
  columnsOffManage,
  dataCheck,
  dataManage,
} from "./DataTable";

const pageSizeOptions = ["5", "6", "7", "8", "10", "20"]; // Các tùy chọn số lượng hàng trên mỗi trang

interface TableProps {
  ticketManage?: boolean;
  ticketCheck?: boolean;
  ticketPackage?: boolean;
}

const TableComponent = ({
  ticketCheck,
  ticketManage,
  ticketPackage,
}: TableProps) => {
  const [pageSize, setPageSize] = useState(() => {
    return ticketCheck
      ? parseInt(pageSizeOptions[1], 10)
      : parseInt(pageSizeOptions[1], 10);
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (ticketCheck) {
      setCurrentData(dataCheck.slice(startIndex, endIndex));
      setTotalData(dataCheck.length);
    } else if (ticketManage) {
      setCurrentData(dataManage.slice(startIndex, endIndex));
      setTotalData(dataManage.length);
    }
  }, [currentPage, pageSize, ticketCheck, ticketManage]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const rowClassName = (record: any, index: any) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  const columns = ticketCheck ? columnsOffCheck : columnsOffManage;

  return (
    <>
      <Table
        dataSource={currentData}
        columns={columns}
        pagination={false}
        rowClassName={rowClassName}
        style={{ height: "350px" }}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalData}
        pageSizeOptions={pageSizeOptions}
        onChange={handlePaginationChange}
        style={{ margin: "16px auto 0 auto", textAlign: "center" }}
      />
    </>
  );
};

export default TableComponent;
