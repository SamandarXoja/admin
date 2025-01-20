import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui";
import React from "react";

function ContractAdd({ setOpenAddContract }) {
  function backMain() {
    setOpenAddContract(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold"> ContractAdd</h3>
        <Button onClick={backMain} className="bg-red-600 text-white">
          Ortga
        </Button>
      </div>

      <div className=" flex flex-wrap gap-3 mt-5">
        <Input className="max-w-[400px] h-[50px]" placeholder="docDate" />
        <Input className="max-w-[400px] h-[50px]" placeholder="docNum" />
        <Input className="max-w-[400px] h-[50px]" placeholder="docDateLast" />
        <Input className="max-w-[400px] h-[50px]" placeholder="consulted" />
        <Input className="max-w-[400px] h-[50px]" placeholder="description" />
        <Input className="max-w-[400px] h-[50px]" placeholder="totalPrice" />
        <Input className="max-w-[400px] h-[50px]" placeholder="givenPrice" />
        <Input className="max-w-[400px] h-[50px]" placeholder="residuePrice" />
        <Input className="max-w-[400px] h-[50px]" placeholder="price" />
        <Input className="max-w-[400px] h-[50px]" placeholder="quantity" />
        <Input className="max-w-[400px] h-[50px]" placeholder="qqs" />
        <Input className="max-w-[400px] h-[50px]" placeholder="totalPrice" />
        <Input className="max-w-[400px] h-[50px]" placeholder="otherTaxes" />
      </div>

      <div className="flex flex-wrap gap-3 mt-5">
        <Select>
          <SelectTrigger className="max-w-[400px] h-[50px]">
            <SelectValue placeholder="Tanglang" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md">
            <SelectItem>d</SelectItem>
            <SelectItem>f</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="max-w-[400px] h-[50px]">
            <SelectValue placeholder="Tanglang" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md">
            <SelectItem>d</SelectItem>
            <SelectItem>f</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="max-w-[400px] h-[50px]">
            <SelectValue placeholder="Tanglang" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md">
            <SelectItem>d</SelectItem>
            <SelectItem>f</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="max-w-[400px] h-[50px]">
            <SelectValue placeholder="Tanglang" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md">
            <SelectItem>d</SelectItem>
            <SelectItem>f</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default ContractAdd;
