import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import ajPanwitImage from "../assets/images/aj-panwit.jpg";
import coffeeImage from "../assets/images/coffee-1.jpg";
import IOT1 from "../assets/images/IOT1.jpg";
import IOT2 from "../assets/images/IOT2.jpg";
import IOT3 from "../assets/images/IOT3.jpg";

export default function HomePage() {
  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">ยินดีต้อนรับสู่ IoT Library & Cafe</h1>
        <h2>ร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน</h2>
      </section>

      <section className="container mx-auto py-8 px-4 lg:px-10">
        <h1>เกี่ยวกับเรา</h1>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
          <p className="text-left col-span-2">
            IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น ก่อตั้งขึ้นโดย
            ผศ.ดร. ปานวิทย์ ธุวะนุติ ซึ่งเป็นอาจารย์ในวิชา Internet of Things และนายกฤตณัฏฐ์
            ศิริพรนพคุณ เป็นผู้ช่วยสอนในหัวข้อ FastAPI และ React ในวิชานี้
          </p>
          <div className="flex justify-center">
            <img src={ajPanwitImage} alt="Panwit Tuwanut" className="h-full w-80 lg:w-96 object-cover" />
          </div>
        </div>
        <div className="flex flex-row  gap-4">
          <div className="flex flex-col">
            <p className="mt-8 col-span-2 my-6">
              ปัจจุบันคาเฟ่ และห้องสมุดของเรา อยู่ในช่วงการดูแลของ
              น.ส.รตา อุณหะ รหัสประจำตัวพนักงาน 65070195 ซึ่งมีบริการที่หลากหลายดังนี้ <br/>
              <b>1.การจัดสัมนาและเวิร์คช็อป: </b> IoT Library & Cafe มีการจัดสัมมนาและเวิร์คช็อปเกี่ยวกับเทคโนโลยี IoT และการพัฒนาเว็บด้วย FastAPI และ React เป็นประจำ ซึ่งให้โอกาสในการเรียนรู้และแลกเปลี่ยนความรู้กับผู้เชี่ยวชาญหรือเพื่อนๆ ที่มีความสนใจเหมือนกัน <br/>
              <b>2.การให้คำปรึกษา : </b> อาจารย์ปานวิทย์และทีมงานของเราพร้อมที่จะให้คำปรึกษาและแนะแนวทางในการพัฒนาโปรเจค IoT และการใช้งาน FastAPI และ React ไม่ว่าจะเป็นการออกแบบระบบ การแก้ไขปัญหา หรือการพัฒนาโค้ด<br/>
              <b>3.ห้องสมุดและพื้นที่ทำงาน : </b> เรามีห้องสมุดที่มีหนังสือและวารสารเกี่ยวกับ IoT และเทคโนโลยีอื่นๆ ให้คุณได้ค้นคว้า นอกจากนี้ยังมีพื้นที่ทำงานที่สะดวกสบาย มีไวไฟฟรี และบรรยากาศที่เป็นกันเองเหมาะสำหรับการนั่งทำงานหรืออ่านหนังสือ <br/>
              <b>4.บริการกาแฟและเครื่องดื่ม : </b> นอกจากความรู้และการพัฒนาทักษะแล้ว เราก็ยังมีบริการกาแฟและเครื่องดื่มที่หลากหลายให้คุณได้เพลิดเพลิน ทั้งกาแฟสด น้ำผลไม้ ที่ทำจากวัตถุดิบคุณภาพ <br/>
              <b>5.กิจกรรมสำหรับเยาวชน:</b> เพื่อส่งเสริมการเรียนรู้และการสร้างสรรค์ในเด็กและเยาวชน เรามีกิจกรรมและโครงการพิเศษสำหรับเด็กๆ เช่น คลาสการเขียนโค้ดสำหรับเด็ก และการเรียนรู้พื้นฐานเกี่ยวกับ IoT
            </p>
            <div className="flex flex-col justify-center lg:flex-row space-x-8 space-y-3">
              <img src={IOT1} alt="IOT" className="h-full w-full lg:w-96 object-cover" />
              <img src={IOT2} alt="IOT" className="h-full w-full lg:w-96 object-cover" />
              <img src={IOT3} alt="IOT" className="h-full w-full lg:w-96 object-cover" />
            </div>
          </div>
          
        </div>
      </section>

      <section className="w-full flex justify-center">
        <img src={coffeeImage} alt="Coffee" className="w-full" />
      </section>
    </Layout>
  );
}
