import { Button, Modal } from "antd";
import { useState } from "react";
import { FilterIcon } from "../../Icons";

function TicketManageModal() {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button icon={<FilterIcon width="13" height="13" />} onClick={showModal}>
        Lọc vé
      </Button>
      <Modal
        title="Add Item"
        open={visible}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Nội dung của Modal */}
        <p>This is the modal content.</p>
      </Modal>
    </div>
  );
}

export default TicketManageModal;
