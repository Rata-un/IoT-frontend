import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/orders.jpg";
import useSWR, { mutate } from "swr";
import Loading from "../components/loading";
import { Alert, Table, Button } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { Order } from "../lib/models";
import axios from "axios";

export default function OrdersPage() {
  const { data: orders, error } = useSWR<Order[]>("/orders");

  const handleDelete = async (orderId: number) => {
    try {
      await axios.delete(`/orders/${orderId}`);
      mutate("/orders");
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  const rows = orders?.flatMap(order => 
    order.order_items.map((item, index) => (
      <Table.Tr key={`${order.id}-${index}`} >
        {index === 0 && (
          <>
            <Table.Td rowSpan={order.order_items.length} className="text-center">{order.id}</Table.Td>
            <Table.Td rowSpan={order.order_items.length} className="text-center">{order.date && 
            new Date(new Date(order.date).getTime() + 7 * 60 * 60 * 1000).toLocaleString()}</Table.Td>
          </>
        )}
        <Table.Td >{item.menu.name}</Table.Td>
        <Table.Td className="text-center">{item.quantity}</Table.Td>
        {index === 0 && (
          <>
            <Table.Td rowSpan={order.order_items.length} className="text-center">{order.total_price}</Table.Td>
            <Table.Td rowSpan={order.order_items.length} >{order.description || '-'}</Table.Td>
            <Table.Td rowSpan={order.order_items.length} className="text-center">
              <Button color="red" onClick={() => handleDelete(order.id)}>Delete</Button>
            </Table.Td>
          </>
        )}
      </Table.Tr>
    ))
  );

  const ths = (
    <Table.Tr >
      <Table.Th className="content-center">เลขที่ใบเสร็จ</Table.Th>
      <Table.Th>วันเวลาที่ออกใบเสร็จ</Table.Th>
      <Table.Th>รายการที่สั่ง</Table.Th>
      <Table.Th>จำนวน</Table.Th>
      <Table.Th>ราคาทั้งหมด</Table.Th>
      <Table.Th>หมายเหตุ</Table.Th>
      <Table.Th>การจัดการ</Table.Th>
    </Table.Tr>
  );

  return (
    <Layout>
      <section
        className="h-[350px] w-full text-white bg-cover bg-blend-multiply flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <div className="backdrop-blur-sm p-8 bg-black/20 rounded-xl">
          <h1 className="text-5xl mb-4">รายการที่สั่ง</h1>
          <h2>รายการที่สั่งทั้งหมด</h2>
        </div>
      </section>
      <section className="container mx-auto py-8 p-4 ">
        {!orders && !error && <Loading />}
        {error && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {error.message}
          </Alert>
        )}
        {orders && (
          <Table withTableBorder withColumnBorders>
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </section>
    </Layout>
  );
}
