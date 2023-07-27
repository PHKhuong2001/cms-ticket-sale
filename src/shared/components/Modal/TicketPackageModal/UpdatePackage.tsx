import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Typography,
  Select,
  TimePicker,
} from "antd";
import {
  FieldTimeOutlined,
  CalendarOutlined,
  EditFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "~/app/hooks";
import {
  getPackageById,
  updatePackageFireBase,
} from "~/features/ticket/ticketSlice";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";
import { parseTimeToTimePickerValue, slitString } from "~/shared/helpers";
import moment from "moment";
import { DataPackage } from "~/shared/interfaces";

function TicketPackageModal({ idPackage }: { idPackage: string }) {
  const { Title } = Typography;
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [checkedBox, setCheckedBox] = useState<string[]>([]);
  const [combo, setCombo] = useState<string>("");
  const [comboTicket, setComboTickets] = useState<string>("");
  const packageObject = useSelector(
    (state: RootState) => state.ticket.packageUpdate
  );
  const [formUpdate, setFormUpdatePackage] = useState<DataPackage>({
    key: "",
    stt: 0,
    maGoi: "",
    tenGoiVe: "",
    ngayApDung: "",
    ngayHetHan: "",
    giaVe: "",
    combo: "",
    tinhTrang: "",
    actions: "",
  });
  const [inputNamePackage, setInputNamePackage] = useState("");
  useEffect(() => {
    setFormUpdatePackage(packageObject);
    setInputNamePackage(packageObject.tenGoiVe);
  }, [packageObject]);

  const handlerCheckBox = (value: string) => {
    const isCheckboxChecked = checkedBox.includes(value);
    let checkboxList = [];
    setCheckedBox((prev) => {
      if (isCheckboxChecked) {
        checkboxList = checkedBox.filter((item) => item !== value);
      } else {
        checkboxList = [...prev, value];
      }
      return checkboxList;
    });
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormUpdatePackage((prev) => ({ ...prev, tenGoiVe: event.target.value }));
  };

  const handleChangeSelectStatus = (value: string) => {
    setFormUpdatePackage((prev) => ({ ...prev, tinhTrang: value }));
  };
  const showModal = () => {
    dispatch(getPackageById(idPackage));
    setVisible(true);
  };

  const handleOk = () => {
    dispatch(updatePackageFireBase({ ...formUpdate }));
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        onClick={showModal}
        style={{
          cursor: "pointer",
          border: "none",
          color: "#ff993c",
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        <EditFilled /> cập nhật
      </Button>
      <Modal
        title={
          <Title
            style={{
              fontSize: 24,
              margin: "0 0 10px 0",
              textAlign: "center",
            }}
          >
            Cập nhật thông tin gói vé
          </Title>
        }
        open={visible}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        width={630}
        footer={false}
      >
        {/* Nội dung của Modal */}
        <Col>
          <Row style={{ marginBottom: 15 }}>
            <Col span={12}>
              <Title
                style={{ fontSize: 16, margin: "0 0 5px 0", fontWeight: 500 }}
              >
                Tên gói vé*
              </Title>
              <Input
                placeholder="Nhập tên gói vé"
                onChange={handleInputChange}
                style={{ width: "70%" }}
                value={inputNamePackage}
              />
            </Col>
            <Col span={12}>
              <Title
                style={{ fontSize: 16, margin: "0 0 5px 0", fontWeight: 500 }}
              >
                Tên sự kiện
              </Title>
              <Input
                placeholder="Nhập tên gói vé"
                onChange={handleInputChange}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>

          {/* Thêm ngày  */}
          <Row style={{ marginBottom: 15 }}>
            <Col span={12}>
              <Row>
                <Title
                  style={{ fontSize: 14, margin: "0 0 5px 0", fontWeight: 500 }}
                >
                  Ngày áp dụng
                </Title>
              </Row>
              <Row>
                <Col span={10}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    suffixIcon={<CalendarOutlined />}
                    style={{ width: "90%" }}
                    placeholder="dd/mm/yyyy"
                    value={dayjs(
                      moment(
                        formUpdate.ngayApDung.split(" ")[0],
                        "DD/MM/YYYY"
                      ).format("YYYY-MM-DD")
                    )}
                  />
                </Col>
                <Col span={10}>
                  <TimePicker
                    format="hh:mm:ss"
                    suffixIcon={<FieldTimeOutlined />}
                    style={{ width: "90%" }}
                    placeholder="hh:mm:ss"
                    value={parseTimeToTimePickerValue(
                      formUpdate.ngayApDung.split(" ")[1]
                    )}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Title
                  style={{ fontSize: 14, margin: "0 0 5px 0", fontWeight: 500 }}
                >
                  Ngày hết hạn
                </Title>
              </Row>
              <Row>
                <Col span={10}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    suffixIcon={<CalendarOutlined />}
                    style={{ width: "90%" }}
                    placeholder="dd/mm/yyyy"
                    value={dayjs(
                      moment(
                        formUpdate.ngayHetHan.split(" ")[0],
                        "DD/MM/YYYY"
                      ).format("YYYY-MM-DD")
                    )}
                  />
                </Col>
                <Col span={10}>
                  <DatePicker
                    format="hh:mm:ss"
                    suffixIcon={<FieldTimeOutlined />}
                    showTime={false}
                    style={{ width: "90%" }}
                    placeholder="hh:mm:ss"
                    value={parseTimeToTimePickerValue(
                      formUpdate.ngayHetHan.split(" ")[1]
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Thêm giá vé  */}
          <Row style={{ marginBottom: 15 }}>
            <Col span={24}>
              <Title
                style={{ fontSize: 14, margin: "0 0 5px 0", fontWeight: 500 }}
              >
                Giá vé áp dụng
              </Title>
              <Row style={{ marginBottom: "6px" }}>
                <Col span={24}>
                  <Checkbox
                    style={{ lineHeight: "32px", borderColor: "#27AEF9" }}
                    checked={checkedBox.includes("vé lẻ")}
                    onClick={() => handlerCheckBox("vé lẻ")}
                  >
                    Vé lẻ (vnđ/vé) với giá
                  </Checkbox>
                  <Input
                    placeholder=""
                    onChange={(e) =>
                      setFormUpdatePackage((prev) => ({
                        ...prev,
                        giaVe: e.target.value,
                      }))
                    }
                    value={formUpdate.giaVe}
                    disabled={!checkedBox.includes("vé lẻ")}
                    style={{
                      width: "20%",
                      border: "none",
                      background: "#F1F4F8",
                      marginRight: "7px",
                    }}
                  />
                  <span>/ vé</span>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Checkbox
                    style={{ lineHeight: "32px", borderColor: "#27AEF9" }}
                  >
                    Combo vé với giá
                  </Checkbox>
                  <Input
                    placeholder=""
                    value={slitString(formUpdate.combo).first || ""}
                    onChange={(e) =>
                      setFormUpdatePackage((prev) => ({
                        ...prev,
                        combo: e.target.value,
                      }))
                    }
                    style={{
                      width: "20%",
                      border: "none",
                      background: "#F1F4F8",
                      marginRight: "7px",
                    }}
                  />
                  <span
                    style={{
                      marginRight: "7px",
                    }}
                  >
                    /
                  </span>
                  <Input
                    placeholder=""
                    onChange={(e) =>
                      setFormUpdatePackage((prev) => ({
                        ...prev,
                        key: e.target.value,
                      }))
                    }
                    value={slitString(formUpdate.combo).second || ""}
                    style={{
                      width: "10%",
                      border: "none",
                      background: "#F1F4F8",
                      marginRight: "7px",
                    }}
                  />
                  <span>vé</span>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Thêm tình trạng  */}
          <Row style={{ marginBottom: 15 }}>
            <Col span={24}>
              <Title
                style={{ fontSize: 16, margin: "0 0 5px 0", fontWeight: 500 }}
              >
                Tình trạng
              </Title>
              <Select
                defaultValue="Đang áp dụng"
                value={formUpdate.tinhTrang}
                style={{ width: 150 }}
                onChange={handleChangeSelectStatus}
                options={[
                  { value: "Đang áp dụng", label: "Đang áp dụng" },
                  { value: "Tắt", label: "Tắt" },
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col
              span={24}
              style={{
                fontSize: 13,
                color: "#1E0D03",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              <span style={{ color: "#FD5959", marginRight: 3 }}>*</span>
              là thông tin bắt buộc
            </Col>
          </Row>
          {/* Hành động nút bấm  */}
          <Row>
            <Col
              span={24}
              style={{ gap: "20px", display: "flex", justifyContent: "center" }}
            >
              <Button onClick={handleCancel} className="buttonFilterReset">
                Huỷ
              </Button>
              <Button onClick={handleOk} className="buttonReset">
                Lưu
              </Button>
            </Col>
          </Row>
        </Col>
        {/* Nội dung của Modal */}
      </Modal>
    </div>
  );
}

export default TicketPackageModal;
