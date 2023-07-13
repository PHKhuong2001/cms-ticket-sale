import { Table, Pagination } from "antd";
import { useEffect, useState } from "react";
import { DataCheck, DataManageMent } from "~/shared/interfaces";
import {
  columnsOffCheckFamily,
  columnsOffCheckEvent,
} from "~/view/page/TicketCheck/DataCheck";
import {
  columnsOffManageEvent,
  columnsOffManageFamily,
} from "~/view/page/TicketManagement/DataManagement";

const pageSizeOptions = ["5", "6", "7", "8", "10", "20"]; // Các tùy chọn số lượng hàng trên mỗi trang
interface TableProps {
  ticketType?: string;
  data: DataManageMent[] | DataCheck[];
  packageName?: string;
}

const TableComponent = ({ ticketType, data, packageName }: TableProps) => {
  const [pageSize, setPageSize] = useState<any>(() => {
    return ticketType === "ticketCheck"
      ? parseInt(pageSizeOptions[1], 10)
      : parseInt(pageSizeOptions[1], 10);
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setCurrentData(data.slice(startIndex, endIndex));
    setTotalData(data.length);
  }, [currentPage, pageSize, ticketType, data]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const rowClassName = (record: any, index: any) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  const columns = () => {
    switch (ticketType) {
      case "ticketCheck":
        return packageName === "event"
          ? columnsOffCheckEvent
          : columnsOffCheckFamily;
      case "ticketManage":
        return packageName === "event"
          ? columnsOffManageEvent
          : columnsOffManageFamily;
    }
  };

  return (
    <>
      <Table
        dataSource={currentData}
        columns={columns()}
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
