import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/drinks.jpg";
import useSWR from "swr";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Menu } from "../lib/models";

export default function MenuPage() {
  const { data: menu, error } = useSWR<Menu[]>("/menu");

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <div className="backdrop-blur-sm p-8 bg-black/20 rounded-xl">
            <h1 className="text-5xl mb-4">เมนูเครื่องดื่ม</h1>
            <h2>รายการเครื่องดื่มแสนอร่อยทั้งหมด</h2>
          </div>
          
        </section>
        <section className="container mx-auto py-8">
          <div className="flex justify-between mb-4">
            <h1>เมนูเครื่องดื่ม</h1>

            <Button
              component={Link}
              leftSection={<IconPlus />}
              to="/orders/create"
              size="s"
              variant="primary"
              className="flex items-center space-x-2"
            >
              สั่งเครื่องดื่ม
            </Button>

            <Button
              component={Link}
              leftSection={<IconPlus />}
              to="/menu/create"
              size="s"
              variant="primary"
              className="flex items-center space-x-2"
            >
              เพิ่มเมนู
            </Button>
          </div>

          {!menu && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menu?.map((menu) => (
              <div className="border border-solid border-neutral-200" key={menu.id}>
                <img
                  src={menu.menuImage}
                  alt="https://placehold.co/150x200"
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold line-clamp-2">{menu.name}</h2>
                  <p className="text-lg  text-neutral-500">ราคา {menu.price} บาท</p>
                </div>

                <div className="flex justify-end px-4 pb-2">
                  <Button component={Link} to={`/menu/${menu.id}/edit`} size="md" variant="default">
                    แก้ไขข้อมูล
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
