import { Alert, Container, Divider } from "@mantine/core";
import Layout from "../components/layout";
import { useParams } from "react-router-dom";
import { Order } from "../lib/models";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled} from "@tabler/icons-react";

export default function OrderByIdPage() {
  const { orderID } = useParams();
  const { data: order, isLoading, error } = useSWR<Order>(`/orders/${orderID}`);

  return (
    <>
      <Layout>
        <Container className="mt-4 text-center">
          {isLoading && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          {!!order && (
            <>
              <h1 className="text-3xl">Order No. {order.id}</h1>
              <p className="text-xl mt-2">ใบเสร็จรับเงิน IOT Cafe</p>
              <p className="text-lg">วันเวลาออกใบเสร็จ {order.date && 
                new Date(new Date(order.date).getTime() + 7 * 60 * 60 * 1000).toLocaleString()}</p>
              <Divider className="mt-4" />
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex flex-row text-lg space-x-8 text-center">
                    <p className="flex-1">{item.menu.name}</p>
                    <p className="flex-1">{item.quantity}</p>
                    <p className="flex-1">{item.menu.price * item.quantity} บาท</p>
                  </div>
                ))}
              <Divider className="mt-4" />
              <p className="text-xl mt-4">ราคารวมทั้งหมด {order.total_price} บาท</p>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
