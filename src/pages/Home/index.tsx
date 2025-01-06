import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui";
import AddModal from "./components/add-modal";
import AddModalTab from "./components/addTable";
import { useState } from "react";

const data = [
  { name: "Иван", age: 28 },
  { name: "Анна", age: 24 },
  { name: "Петр", age: 30 },
];

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTab, setIsModalOpenTab] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalTab = () => setIsModalOpenTab(true);
  const closeModalTab = () => setIsModalOpenTab(false);

  return (
    <>
      <Tabs defaultValue="Ombor" className="w-full">
        <TabsList className="bg-slate-100 min-h-[50px] mt-7 ml-4 ">
          <TabsTrigger
            value="Ombor"
            className="p-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Ombor
          </TabsTrigger>
          <TabsTrigger
            className="p-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
            value="Bo'limga kerakli malumotlar"
          >
            Bo'limga kerakli malumotlar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Ombor">
          <div className="w-[97%] mx-auto mt-[70px]  px-6 py-6  rounded-md shadow-md ">
            <div className=" rounded-md">
              <div className="flex justify-between">
                <Button
                  onClick={openModal}
                  className="bg-sky-600 text-white mb-4"
                >
                  Shtatka qo'shish
                </Button>
                <Button
                  onClick={openModalTab}
                  className="bg-red-600 text-white mb-4"
                >
                  tablitsaga qo'shish
                </Button>
              </div>
              <Table className="border ">
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Возраст</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.age}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Итого</TableCell>
                    <TableCell>{data.length}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <AddModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              title="Modal Title"
              content={<p>This is the content of the modal.</p>}
              footerContent={<button onClick={closeModal}>Close</button>}
            />
            <AddModalTab
              isOpen={isModalOpenTab}
              onRequestClose={closeModalTab}
              title="Modal Title"
              content={<p>This is the content of the modal.</p>}
              footerContent={<button onClick={closeModalTab}>Close</button>}
            />
          </div>
        </TabsContent>
        <TabsContent value="Bo'limga kerakli malumotlar">
          <div className="ml-[20px] mt-[30px]">
            <Select>
              <SelectTrigger className="max-w-[700px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-md">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-[97%] mx-auto mt-[20px]  px-6 py-6  rounded-md shadow-md ">
            <div className=" rounded-md">
              <div className="flex justify-end">
                <Button
                  onClick={openModalTab}
                  className="bg-red-600 text-white mb-4"
                >
                  tablitsaga qo'shish
                </Button>
              </div>
              <Table className="border ">
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Возраст</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.age}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Итого</TableCell>
                    <TableCell>{data.length}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <AddModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              title="Modal Title"
              content={<p>This is the content of the modal.</p>}
              footerContent={<button onClick={closeModal}>Close</button>}
            />
            <AddModalTab
              isOpen={isModalOpenTab}
              onRequestClose={closeModalTab}
              title="Modal Title"
              content={<p>This is the content of the modal.</p>}
              footerContent={<button onClick={closeModalTab}>Close</button>}
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Home;
