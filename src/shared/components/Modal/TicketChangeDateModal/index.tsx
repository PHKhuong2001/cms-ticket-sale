import { Button, Col, DatePicker, Form, Modal, Row, Typography } from "antd";
import { ActionIcon } from "../../Icons";
import { CalendarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "~/app/hooks";
import {
  getTicketByNumber,
  updateDateByTicketNumber,
} from "~/features/ticket/ticketSlice";
import { usePathUrl } from "~/config";
import { handlerPackages } from "~/shared/helpers";
import { tickets } from "~/view/page/TicketManagement";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";
import dayjs from "dayjs";
import moment from "moment";

type Dayjs = import("dayjs").Dayjs;
interface PropsChangeDateModal {
  ticketNumber: string;
}
function TicketChangeDateModal({ ticketNumber }: PropsChangeDateModal) {
  const ticket = useSelector((state: RootState) => state.ticket.ticketUpdate);
  const { Title } = Typography;
  const [dateValue, setDateValue] = useState<Dayjs | null | undefined>(
    ticket.hanSudung
      ? dayjs(moment(ticket.hanSudung, "DD/MM/YYYY").format("YYYY-MM-DD"))
      : undefined
  );

  useEffect(() => {
    setDateValue(
      ticket.hanSudung
        ? dayjs(moment(ticket.hanSudung, "DD/MM/YYYY").format("YYYY-MM-DD"))
        : undefined
    );
  }, [ticket.hanSudung]);

  const currentTime = moment().format("hh:mm:ss");

  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const pathUrl = usePathUrl();

  const showModal = () => {
    dispatch(
      getTicketByNumber({
        packageName: handlerPackages(pathUrl || "", tickets),
        ticketNumber: ticketNumber,
      })
    );
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlerSubmitFilter = () => {
    // Thêm các query parameters vào URLSearchParams
    dispatch(
      updateDateByTicketNumber({
        ticketNumber: ticket?.soVe,
        newExpiration: `${dateValue?.format("DD/MM/YYYY")} ${currentTime} `,
      })
    )
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log("Eror: ", e);
      });
    return false;
  };

  return (
    <div>
      <span onClick={showModal}>
        <ActionIcon width="1rem" height="1rem" />
      </span>

      <Modal
        title={
          <Title
            style={{ fontSize: 24, margin: "0 0 10px 0", textAlign: "center" }}
          >
            Đổi ngày sử dụng vé
          </Title>
        }
        open={visible}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        width={530}
        footer={false}
      >
        <Form onFinish={handlerSubmitFilter}>
          <Col span={24}>
            <Row style={{ margin: "0 0 10px 0" }}>
              <Col span={6}>
                <Title
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Số vé
                </Title>
              </Col>
              <Col span={18}>
                <Title
                  style={{
                    fontSize: 14,

                    fontWeight: 400,
                  }}
                >
                  {ticket?.soVe}
                </Title>
              </Col>
            </Row>
            <Row style={{ margin: "0 0 10px 0" }}>
              <Col span={6}>
                <Title
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Số vé
                </Title>
              </Col>
              <Col span={18}>
                <Title
                  style={{
                    fontSize: 14,

                    fontWeight: 400,
                  }}
                >
                  {`Vé cổng - ${
                    ticket?.tenSuKien ? "Gói sự kiện" : "Gói gia đình"
                  }`}
                </Title>
              </Col>
            </Row>
            <Row style={{ margin: "0 0 10px 0" }}>
              <Col span={6}>
                <Title
                  style={{
                    fontSize: 14,

                    fontWeight: 400,
                  }}
                >
                  Tên sự kiện
                </Title>
              </Col>
              <Col span={18}>
                <Title
                  style={{
                    fontSize: 14,

                    fontWeight: 400,
                  }}
                >
                  {ticket?.tenSuKien}
                </Title>
              </Col>
            </Row>
            <Row style={{ margin: "0 0 10px 0" }}>
              <Col span={6}>
                <Title
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  Hạn sử dụng
                </Title>
              </Col>
              <Col span={18}>
                <DatePicker
                  suffixIcon={<CalendarOutlined />}
                  showToday={false}
                  value={dateValue}
                  format="DD/MM/YYYY"
                  style={{ width: "40%" }}
                  onChange={(date: any, dateString: any) => {
                    setDateValue(date);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col
                span={24}
                style={{
                  gap: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => setVisible(false)}
                  className="buttonFilterReset"
                >
                  Huỷ
                </Button>
                <Button
                  className="buttonReset"
                  htmlType="submit"
                  onClick={() => setVisible(false)}
                >
                  Lưu
                </Button>
              </Col>
            </Row>
          </Col>
        </Form>
      </Modal>
    </div>
  );
}

export default TicketChangeDateModal;
