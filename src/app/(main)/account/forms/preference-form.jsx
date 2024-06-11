"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { MailPlus, Trash2Icon } from "lucide-react"
import { Label } from "@/components/ui/label"


// This can come from your database or API.
const defaultValues = {
  bio: "I own a computer.",
  accounts: [
    { value: "john@gmail.com" },
    { value: "doe@gmail.com" },
  ],
}

export function PreferencesForm() {

  return (
    <>
         
          <Select>
            <Label>I would like to receive:</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 rollup</SelectItem>
              <SelectItem value="2">2 rollups</SelectItem>
              <SelectItem value="3">3 rollups</SelectItem>
              <SelectItem value="4">4 rollups</SelectItem>
              <SelectItem value="5">5 rollups</SelectItem>
              <SelectItem value="6">6 rollups</SelectItem>
              <SelectItem value="7">7 rollups</SelectItem>
              <SelectItem value="8">8 rollups</SelectItem>
              <SelectItem value="9">9 rollups</SelectItem>
              <SelectItem value="10">10 rollups</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <Label className="!mt-6 inline-block">Every:</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
         <Button type="submit" >Update profile</Button>
    </>
  )}
