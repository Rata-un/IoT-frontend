// import { useNavigate } from "react-router-dom";
// import Layout from "../components/layout";
// import { Alert, Button, Container, Divider, NumberInput, Textarea, Checkbox } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { useState } from "react";
// import axios, { AxiosError } from "axios";
// import { notifications } from "@mantine/notifications";
// import { Menu } from "../lib/models";
// import { IconAlertTriangleFilled } from "@tabler/icons-react";
// import useSWR from "swr";
// import Loading from "../components/loading";

// export default function OrderCreatePage() {
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [checkedItems, setCheckedItems] = useState<{ [key: string]: number }>({});
//   const [editableItems, setEditableItems] = useState<{ [key: number]: boolean }>({});
//   const { data: menu, error } = useSWR<Menu[]>("/menu");
 
//   const orderCreateForm = useForm({
//     initialValues: {
//       quantity: 0,
//       description: ""
//     },
//     validate: {
//       quantity: (value) =>
//         value < 0 || value > 15 ? "จำนวนต้องอยู่ระหว่าง 0 ถึง 15" : null,
//     },
//   });

//   const handleCheckboxChange = (id: number) => {
//     setCheckedItems((prev) => {
//       if (prev[id]) {
//         const newItems = { ...prev };
//         delete newItems[id];
//         return newItems;
//       }
//       return { ...prev, [id]: 1 };
//     });
//     setEditableItems((prev) => {
//       if (prev[id]) {
//         const newEditableItems = { ...prev };
//         delete newEditableItems[id];
//         return newEditableItems;
//       }
//       return { ...prev, [id]: true };
//     });
//   };

//   const handleQuantityChange = (id: number, value: number | string | null) => {
//     if (value !== null && value !== undefined) {
//       const numericValue = typeof value === "string" ? parseInt(value, 10) : value;
//       setCheckedItems((prev) => ({ ...prev, [id]: numericValue }));
//     }
//   };

//   const calculateTotalPrice = () => {
//     if (!menu) return 0;
//     return Object.entries(checkedItems).reduce((total, [id, quantity]) => {
//       const menuItem = menu.find(item => item.id === parseInt(id));
//       return total + (menuItem ? menuItem.price * quantity : 0);
//     }, 0);
//   };
  
//   const handleSubmit = async (values: typeof orderCreateForm.values) => {
//     try {
//       setIsProcessing(true);
//       const orderItems = Object.entries(checkedItems).map(([id, quantity]) => {
//         const menuItem = menu?.find(item => item.id === parseInt(id));
//         if (!menuItem) {
//           throw new Error(`Menu item with id ${id} not found`);
//         }
//         return {
//           menuId: parseInt(id),
//           quantity,
//           price: menuItem.price
//         };
//       });
      
//       const order = {
//         description: values.description,
//         orderItems: orderItems,
//       };
//       const response = await axios.post(`/orders`, order);
//       notifications.show({
//         title: "ทำรายการสำเร็จ",
//         message: "รายการของท่านได้รับการเพิ่มเรียบร้อยแล้ว",
//         color: "teal",
//       });
//       navigate(`/orders/${response.data.id}`);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         if (error.response?.status === 422) {
//           notifications.show({
//             title: "ข้อมูลไม่ถูกต้อง",
//             message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
//             color: "red",
//           });
//         } else if (error.response?.status || 500 >= 500) {
//           notifications.show({
//             title: "เกิดข้อผิดพลาดบางอย่าง",
//             message: "กรุณาลองใหม่อีกครั้ง",
//             color: "red",
//           });
//         }
//       } else {
//         notifications.show({
//           title: "เกิดข้อผิดพลาดบางอย่าง",
//           message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
//           color: "red",
//         });
//       }
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <>
//       <Layout>
//         <Container className="my-8">
//           <h1 className="text-2xl text-center mb-6">สั่งเครื่องดื่ม</h1>
//           <section>
//             {!menu && !error && <Loading />}
//             {error && (
//               <Alert
//                 color="red"
//                 title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
//                 icon={<IconAlertTriangleFilled />}
//               >
//                 {error.message}
//               </Alert>
//             )}
//             <form onSubmit={orderCreateForm.onSubmit(handleSubmit)} className="flex flex-col space-y-8 justify-center">
//                 {menu?.map((menu) => (
//                   <div key={menu.id} className="flex flex-row space-x-6">
//                     <Checkbox
//                       label={menu.name}
//                       size="md"
//                       onChange={() => handleCheckboxChange(menu.id)}
//                     />
//                       <>
//                         <p>จำนวน</p>
//                         <NumberInput
//                           min={1}
//                           max={15}
//                           disabled={!editableItems[menu.id]}
//                           value={checkedItems[menu.id]}
//                           onChange={(value) => handleQuantityChange(menu.id, value)}
//                         />
//                         <p>แก้ว ราคา {menu.price * (checkedItems[menu.id] || 1)} บาท
//                         </p>
//                       </>
//                   </div>
//                 ))}

//                 <Textarea
//                   label="รายละเอียดเพิ่มเติ่ม"
//                   placeholder="หวานน้อย เพิ่มวิป"
//                   size="md"
//                   {...orderCreateForm.getInputProps("description")}
//                 />

//                 <p className="text-2xl text-red-600 font-semibold">ราคารวมทั้งหมด: {calculateTotalPrice()} บาท</p>

//                 <Divider />
//               <div className="flex justify-center">
//                 <Button type="submit" size="md" loading={isProcessing}>
//                   สั่งเครื่องดื่ม
//                 </Button>
//               </div>
//             </form>
//           </section>
//         </Container>
//       </Layout>
//     </>
//   );
// }
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { Alert, Button, Container, Divider, NumberInput, Textarea, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Menu } from "../lib/models";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import useSWR from "swr";
import Loading from "../components/loading";

export default function OrderCreatePage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: number }>({});
  const [editableItems, setEditableItems] = useState<{ [key: number]: boolean }>({});
  const { data: menu, error } = useSWR<Menu[]>("/menu");
  const [formError, setFormError] = useState<string | null>(null);

  const orderCreateForm = useForm({
    initialValues: {
      quantity: 0,
      description: ""
    },
    validate: {
      quantity: (value) =>
        value < 0 || value > 15 ? "จำนวนต้องอยู่ระหว่าง 0 ถึง 15" : null,
    },
  });

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => {
      if (prev[id]) {
        const newItems = { ...prev };
        delete newItems[id];
        return newItems;
      }
      return { ...prev, [id]: 1 };
    });
    setEditableItems((prev) => {
      if (prev[id]) {
        const newEditableItems = { ...prev };
        delete newEditableItems[id];
        return newEditableItems;
      }
      return { ...prev, [id]: true };
    });
  };

  const handleQuantityChange = (id: number, value: number | string | null) => {
    if (value !== null && value !== undefined) {
      const numericValue = typeof value === "string" ? parseInt(value, 10) : value;
      setCheckedItems((prev) => ({ ...prev, [id]: numericValue }));
    }
  };

  const calculateTotalPrice = () => {
    if (!menu) return 0;
    return Object.entries(checkedItems).reduce((total, [id, quantity]) => {
      const menuItem = menu.find(item => item.id === parseInt(id));
      return total + (menuItem ? menuItem.price * quantity : 0);
    }, 0);
  };
  
  const handleSubmit = async (values: typeof orderCreateForm.values) => {
    if (Object.keys(checkedItems).length === 0) {
      setFormError("ต้องเลือกอย่างน้อย 1 เมนู");
      notifications.show({
        title: "ทำรายการไม่สำเร็จ",
        message: "ต้องเลือกอย่างน้อย 1 เมนู",
        color: "red",
      });
      return;
    }
    setFormError(null);
    try {
      setIsProcessing(true);
      const orderItems = Object.entries(checkedItems).map(([id, quantity]) => {
        const menuItem = menu?.find(item => item.id === parseInt(id));
        if (!menuItem) {
          throw new Error(`Menu item with id ${id} not found`);
        }
        return {
          menuId: parseInt(id),
          quantity,
          price: menuItem.price
        };
      });
      
      const order = {
        description: values.description,
        orderItems: orderItems,
      };
      const response = await axios.post(`/orders`, order);
      notifications.show({
        title: "ทำรายการสำเร็จ",
        message: "รายการของท่านได้รับการเพิ่มเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/orders/${response.data.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          notifications.show({
            title: "ข้อมูลไม่ถูกต้อง",
            message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Layout>
        <Container className="my-8">
          <h1 className="text-2xl text-center mb-6">สั่งเครื่องดื่ม</h1>
          <section>
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
            <form onSubmit={orderCreateForm.onSubmit(handleSubmit)} className="flex flex-col space-y-8 justify-center">
                {menu?.map((menu) => (
                  <div key={menu.id} className="flex flex-row space-x-6">
                    <Checkbox
                      label={menu.name}
                      size="md"
                      onChange={() => handleCheckboxChange(menu.id)}
                    />
                      <>
                        <p>จำนวน</p>
                        <NumberInput
                          min={1}
                          max={15}
                          disabled={!editableItems[menu.id]}
                          value={checkedItems[menu.id]}
                          onChange={(value) => handleQuantityChange(menu.id, value)}
                        />
                        <p>แก้ว ราคา {menu.price * (checkedItems[menu.id] || 1)} บาท
                        </p>
                      </>
                  </div>
                ))}

                <Textarea
                  label="รายละเอียดเพิ่มเติ่ม"
                  placeholder="หวานน้อย เพิ่มวิป"
                  size="md"
                  {...orderCreateForm.getInputProps("description")}
                />

                <p className="text-2xl text-red-600 font-semibold">ราคารวมทั้งหมด: {calculateTotalPrice()} บาท</p>

                <Divider />
              <div className="flex justify-center">
                <Button type="submit" size="md" loading={isProcessing}>
                  สั่งเครื่องดื่ม
                </Button>
              </div>
            </form>
          </section>
        </Container>
      </Layout>
    </>
  );
}

