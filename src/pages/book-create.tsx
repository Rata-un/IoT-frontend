import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { Button, Checkbox, Container, Divider, NumberInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Book } from "../lib/models";
import { Textarea } from '@mantine/core';

export default function BookCreatePage() {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const bookCreateForm = useForm({
    initialValues: {
      title: "",
      author: "",
      year: 2024,
      is_published: false,
      detail: "",
      synopsis: "",
      category: "",
      image: ""
    },

    validate: {
      title: isNotEmpty("กรุณาระบุชื่อหนังสือ"),
      author: isNotEmpty("กรุณาระบุชื่อผู้แต่ง"),
      year: isNotEmpty("กรุณาระบุปีที่พิมพ์หนังสือ"),
      detail: isNotEmpty("กรุณาระบุรายละเอียดหนังสือ"),
      synopsis: isNotEmpty("กรุณาระบุเรื่องย่อ"),
      category: isNotEmpty("กรุณาระบุประเภท"),
    },
  });

  const handleSubmit = async (values: typeof bookCreateForm.values) => {
    try {
      setIsProcessing(true);
      const response = await axios.post<Book>(`/books`, values);
      notifications.show({
        title: "เพิ่มข้อมูลหนังสือสำเร็จ",
        message: "ข้อมูลหนังสือได้รับการเพิ่มเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/books/${response.data.id}`);
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
        <Container className="mt-8">
          <h1 className="text-xl text-center mb-2">เพิ่มหนังสือในระบบ</h1>
          <form onSubmit={bookCreateForm.onSubmit(handleSubmit)} className="space-y-8">
            <TextInput
              label="ชื่อหนังสือ"
              placeholder="ชื่อหนังสือ"
              {...bookCreateForm.getInputProps("title")}
            />

            <TextInput
              label="ชื่อผู้แต่ง"
              placeholder="ชื่อผู้แต่ง"
              {...bookCreateForm.getInputProps("author")}
            />

            <NumberInput
              label="ปีที่พิมพ์"
              placeholder="ปีที่พิมพ์"
              min={1900}
              max={new Date().getFullYear() + 1}
              {...bookCreateForm.getInputProps("year")}
            />

            <Textarea
              label="รายละเอียดหนังสือ"
              placeholder="รายละเอียดหนังสือ"
              maxRows={4}
              {...bookCreateForm.getInputProps("detail")}
            />
            <Textarea
              label="เรื่องย่อ"
              placeholder="เรื่องย่อ"
              maxRows={8}
              {...bookCreateForm.getInputProps("synopsis")}
            />

            <TextInput
              label="หมวดหมู่หนังสือ"
              placeholder="มังงะ, สืบสวน, สยองขวัญ"
              radius="md"
              description="ใช้ , เพื่อคั่นในแต่ละหมวดหมู่"
              {...bookCreateForm.getInputProps("category")}
            />

            <TextInput
              label="URL ภาพปกหนังสือ"
              placeholder="https://ookbeeaudio.s3-ap-southeast-1.amazonaws.com/coverImage/7092/Teenager-in-Painful-new.jpg"
              radius="md"
              {...bookCreateForm.getInputProps("bookimage")}
            />
            
            <Checkbox
              label="เผยแพร่"
              {...bookCreateForm.getInputProps("is_published", {
                type: "checkbox",
              })}
            />

            <Divider />

            <Button type="submit" loading={isProcessing}>
              บันทึกข้อมูล
            </Button>
          </form>
        </Container>
      </Layout>
    </>
  );
}
