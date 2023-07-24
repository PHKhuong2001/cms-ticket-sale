import { Button } from "antd";
import { useSelector } from "react-redux";
import { useAppDispatch } from "~/app/hooks";
import { RootState } from "~/app/store";
import { dataList } from "~/config";
import { updateStatusToSettled } from "~/features/ticket/ticketSlice";
import { DataCheck } from "~/shared/interfaces";

function ButtonCheck() {
  const dispatch = useAppDispatch();
  const dataCheck = useSelector((state: RootState) => state.ticket.data);
  const newTicketNumberList = dataCheck.map((item) => {
    return item.soVe;
  });
  const dataHaveCheck = (dataCheck as DataCheck[]).every(
    (e: DataCheck) => e.doiSoat === "Đã đối soát"
  );
  const handlerButtonCheck = () => {
    console.log(newTicketNumberList);
    dispatch(
      updateStatusToSettled({
        ticketNumbers: newTicketNumberList,
        dataList: dataList,
      })
    )
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  return (
    <>
      {dataHaveCheck ? (
        <Button
          style={{ borderColor: "#FF993C" }}
          className="buttonFilterReset"
        >
          xuất file(.csv)
        </Button>
      ) : (
        <Button className="buttonReset" onClick={handlerButtonCheck}>
          Chốt đối soát
        </Button>
      )}
    </>
  );
}

export default ButtonCheck;
